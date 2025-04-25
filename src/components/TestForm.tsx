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
import QuestionCard from './QuestionCard';
import ProgressBar from './ProgressBar';

type TestFormProps = {
  onComplete: () => void;
};

type TestState = 'questions' | 'email';

const TestForm = ({ onComplete }: TestFormProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [email, setEmail] = useState('');
  const [gdprConsent, setGdprConsent] = useState(false);
  const [testState, setTestState] = useState<TestState>('questions');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = answers.find(answer => answer.questionId === currentQuestion.id);
  
  const handleAnswerSelection = (questionId: number, value: number) => {
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
    if (!selectedAnswer) {
      toast({
        title: "Veuillez sélectionner une réponse",
        description: "Vous devez choisir une option pour continuer.",
        variant: "destructive"
      });
      return;
    }
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      setTestState('email');
    }
  };
  
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
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
      
      // Store results in Supabase
      const { error: supabaseError } = await supabase
        .from('quiz_results')
        .insert({
          email: email,
          answers: JSON.stringify(answers),
          score: result.score,
          category: result.category
        });
      
      if (supabaseError) throw supabaseError;
      
      // Send email via Supabase edge function
      const emailResponse = await supabase.functions.invoke('send-test-results', {
        body: JSON.stringify({
          email,
          score: result.score,
          category: result.category,
          description: result.description
        })
      });
      
      console.log("Test submitted:", { 
        answers, 
        email, 
        score: result.score,
        category: result.category 
      });
      
      // Success - notify parent component
      onComplete();
      
      toast({
        title: "Résultats envoyés !",
        description: "Vos résultats ont été envoyés par email.",
      });
    } catch (err) {
      console.error("Error submitting test:", err);
      setError("Une erreur est survenue lors de la soumission du test. Veuillez réessayer.");
      
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto px-4">
      {testState === 'questions' ? (
        <div className="mb-12">
          <ProgressBar 
            currentStep={currentQuestionIndex + 1} 
            totalSteps={questions.length} 
          />
          
          <div className="space-y-8">
            <div className="text-lg font-medium text-center mb-6">
              {currentQuestion.text}
            </div>
            
            <div className="px-4">
              <Slider
                defaultValue={[selectedAnswer?.value || 3]}
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
          
          <div className="flex justify-between mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Question précédente
            </Button>
            
            <Button
              type="button"
              onClick={handleNextQuestion}
              className="hypno-button"
            >
              {currentQuestionIndex < questions.length - 1 ? "Question suivante" : "Terminer le test"}
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
