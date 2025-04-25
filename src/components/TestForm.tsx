
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { questions } from '@/utils/questions';
import { Answer, calculateScore } from '@/utils/calculateScore';
import { supabase } from '@/integrations/supabase/client';
import { Slider } from '@/components/ui/slider';
import ProgressBar from './ProgressBar';
import { ChevronRight } from 'lucide-react';

type TestFormProps = {
  onComplete: () => void;
};

type TestState = 'questions' | 'email' | 'results';

const TestForm = ({ onComplete }: TestFormProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [email, setEmail] = useState('');
  const [gdprConsent, setGdprConsent] = useState(false);
  const [testState, setTestState] = useState<TestState>('questions');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentSliderValue, setCurrentSliderValue] = useState<number>(3);
  const [testResults, setTestResults] = useState<{score: number, category: string, description: string} | null>(null);
  
  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = answers.find(answer => answer.questionId === currentQuestion.id);
  const progress = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);
  
  const sliderValueLabels = ['Pas du tout d\'accord', 'Peu d\'accord', 'Parfois', 'Souvent', 'Tout à fait d\'accord'];
  
  const handleAnswerSelection = (questionId: number, value: number) => {
    setCurrentSliderValue(value);
    setAnswers(prevAnswers => {
      const existingAnswerIndex = prevAnswers.findIndex(a => a.questionId === questionId);
      
      if (existingAnswerIndex !== -1) {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingAnswerIndex] = { questionId, value };
        return updatedAnswers;
      } else {
        return [...prevAnswers, { questionId, value }];
      }
    });
  };
  
  const handleNextQuestion = () => {
    // Save the current answer if it hasn't been saved yet
    if (!selectedAnswer) {
      handleAnswerSelection(currentQuestion.id, currentSliderValue);
    }
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      // Reset slider value to middle position for the next question
      const nextQuestion = questions[currentQuestionIndex + 1];
      const nextAnswer = answers.find(a => a.questionId === nextQuestion.id);
      setCurrentSliderValue(nextAnswer?.value || 3);
    } else {
      setTestState('email');
    }
  };
  
  const handleSliderChange = (value: number[]) => {
    if (currentQuestion) {
      handleAnswerSelection(currentQuestion.id, value[0]);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email requis",
        description: "Veuillez saisir votre adresse email pour recevoir vos résultats.",
        variant: "destructive"
      });
      return;
    }
    
    if (!gdprConsent) {
      toast({
        title: "Consentement requis",
        description: "Veuillez accepter notre politique de confidentialité pour continuer.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const result = calculateScore(answers);
      setTestResults(result);
      
      // Store results in Supabase - ensure column names match the database
      const { error: supabaseError } = await supabase
        .from('quiz_results')
        .insert({
          user_email: email, // Changed from email to user_email to match DB column
          answers: JSON.stringify(answers),
          total_score: result.score, // Changed from score to total_score
          category: result.category,
          recommendations: result.description // Changed from description to recommendations
        });
      
      if (supabaseError) {
        console.error("Supabase error:", supabaseError);
        throw new Error(`Erreur de base de données: ${supabaseError.message}`);
      }
      
      // Send email via Supabase edge function
      const emailResponse = await supabase.functions.invoke('send-test-results', {
        body: JSON.stringify({
          email,
          score: result.score,
          category: result.category,
          description: result.description
        })
      });
      
      console.log("Email function response:", emailResponse);
      
      if (emailResponse.error) {
        console.error("Email function error:", emailResponse.error);
        toast({
          title: "Attention",
          description: "Vos résultats ont été calculés mais n'ont pas pu être envoyés par email.",
          variant: "warning"
        });
      } else if (emailResponse.data?.status === "warning") {
        toast({
          title: "Attention",
          description: emailResponse.data.message,
          variant: "warning"
        });
      } else {
        toast({
          title: "Résultats calculés",
          description: "Vos résultats ont été calculés avec succès !",
        });
      }
      
      // Afficher les résultats directement dans l'application
      setTestState('results');
      
      // Success - notify parent component
      onComplete();
      
    } catch (err: any) {
      console.error("Error submitting test:", err);
      setError(`Une erreur est survenue lors de la soumission du test: ${err.message || JSON.stringify(err)}`);
      
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const getCurrentValueLabel = () => {
    return sliderValueLabels[currentSliderValue - 1];
  };
  
  // Afficher les résultats directement
  if (testState === 'results' && testResults) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 hypno-card animate-fade-in">
        <h2 className="text-2xl font-bold mb-6 text-center">Vos Résultats</h2>
        
        <div className="mb-6 p-6 bg-hypno-primary/10 rounded-lg">
          <div className="text-center">
            <p className="text-lg mb-2">Votre score est</p>
            <p className="text-4xl font-bold text-hypno-primary mb-2">{testResults.score}/120</p>
            <p className="text-xl font-semibold text-hypno-accent">{testResults.category}</p>
          </div>
        </div>
        
        <div className="prose max-w-none mb-6">
          <p className="text-gray-700">{testResults.description}</p>
        </div>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="text-sm text-yellow-700">
            {email ? 
              `Ces résultats ont également été envoyés à votre adresse email: ${email}` :
              "Vos résultats n'ont pas pu être envoyés par email."
            }
          </p>
        </div>
        
        <div className="text-center">
          <Button
            type="button"
            onClick={() => window.location.reload()}
            className="hypno-button"
          >
            Refaire le test
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-3xl mx-auto px-4">
      {testState === 'questions' ? (
        <div className="mb-12">
          <ProgressBar 
            currentStep={currentQuestionIndex + 1} 
            totalSteps={questions.length} 
          />
          
          <div className="text-end text-sm font-medium text-hypno-primary mb-2">
            {getCurrentValueLabel()}
          </div>
          
          <div className="space-y-8">
            <div className="text-lg font-medium text-center mb-6">
              {currentQuestion.text}
            </div>
            
            <div className="px-4">
              <Slider
                value={[currentSliderValue]}
                min={1}
                max={5}
                step={1}
                onValueChange={handleSliderChange}
                className="w-full"
              />
              
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>Pas du tout d'accord</span>
                <span>Tout à fait d'accord</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-8">
            <Button
              type="button"
              onClick={handleNextQuestion}
              className="hypno-button"
            >
              {currentQuestionIndex < questions.length - 1 ? (
                <>Question suivante <ChevronRight className="ml-1 h-4 w-4" /></>
              ) : (
                "Terminer le test"
              )}
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="hypno-card animate-fade-in">
          <h2 className="text-2xl font-bold mb-6 text-center">Recevez vos résultats</h2>
          
          <p className="text-gray-600 mb-6 text-center">
            Merci d'avoir complété le test ! Pour recevoir votre score et une analyse personnalisée, 
            veuillez entrer votre adresse email ci-dessous.
          </p>
          
          <div className="mb-6">
            <Label htmlFor="email" className="block mb-2">
              Adresse email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="votre@email.com"
              className="hypno-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="flex items-start mb-8">
            <Checkbox
              id="gdpr"
              checked={gdprConsent}
              onCheckedChange={(checked) => setGdprConsent(checked === true)}
              className="mt-1"
            />
            <Label 
              htmlFor="gdpr" 
              className="ml-2 text-gray-600 text-sm cursor-pointer"
            >
              J'accepte de recevoir mes résultats par email et je confirme avoir pris connaissance de la{" "}
              <a href="#" className="text-hypno-primary hover:underline">
                politique de confidentialité
              </a>
              .
            </Label>
          </div>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded mb-6">
              {error}
            </div>
          )}
          
          <div className="flex justify-center">
            <Button
              type="submit"
              className="hypno-button w-full md:w-auto"
              disabled={isSubmitting}
            >
              {isSubmitting ? "En cours..." : "Voir mes résultats"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default TestForm;
