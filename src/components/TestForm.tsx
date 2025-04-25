
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { questions } from '@/utils/questions';
import { Answer, calculateScore } from '@/utils/calculateScore';
import QuestionCard from './QuestionCard';
import ProgressBar from './ProgressBar';

type TestFormProps = {
  onComplete: () => void;
};

type TestState = 'questions' | 'email';

const TestForm = ({ onComplete }: TestFormProps) => {
  // State for managing the current question index
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // State for collecting answers
  const [answers, setAnswers] = useState<Answer[]>([]);
  
  // State for email collection
  const [email, setEmail] = useState('');
  const [gdprConsent, setGdprConsent] = useState(false);
  
  // Current form state (questions or email collection)
  const [testState, setTestState] = useState<TestState>('questions');
  
  // State for handling form submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Current question
  const currentQuestion = questions[currentQuestionIndex];
  
  // Find the selected answer for the current question
  const selectedAnswer = answers.find(answer => answer.questionId === currentQuestion.id);
  
  // Handle answer selection
  const handleAnswerSelection = (questionId: number, value: number) => {
    setAnswers(prevAnswers => {
      const existingAnswerIndex = prevAnswers.findIndex(a => a.questionId === questionId);
      
      if (existingAnswerIndex !== -1) {
        // Update existing answer
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingAnswerIndex] = { questionId, value };
        return updatedAnswers;
      } else {
        // Add new answer
        return [...prevAnswers, { questionId, value }];
      }
    });
  };
  
  // Handle next question
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
      // All questions have been answered, move to email collection
      setTestState('email');
    }
  };
  
  // Handle previous question
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
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
      // Calculate score from answers
      const result = calculateScore(answers);
      
      // In a real app, this would be an API call to submit the data
      // For now, we'll just simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      console.log("Test submitted:", { 
        answers, 
        email, 
        score: result.score,
        category: result.category 
      });
      
      // Success - notify parent component
      onComplete();
    } catch (err) {
      console.error("Error submitting test:", err);
      setError("Une erreur est survenue lors de la soumission du test. Veuillez réessayer.");
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
          
          <QuestionCard 
            question={currentQuestion}
            selectedValue={selectedAnswer?.value || null}
            onChange={handleAnswerSelection}
          />
          
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
