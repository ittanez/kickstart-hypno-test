import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { calculateScore } from '@/utils/calculateScore';
import { supabase } from '@/integrations/supabase/client';
import type { Answer } from '@/utils/calculateScore';
import { questions } from '@/utils/questions';
import { VAKOGAnswer, calculateDominantSense } from '@/utils/vakogQuestions';

export type TestState = 'questions' | 'vakog' | 'email' | 'results';

export const useTestForm = (onComplete: () => void) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [vakogAnswers, setVakogAnswers] = useState<VAKOGAnswer[]>([]);
  const [email, setEmail] = useState('');
  const [gdprConsent, setGdprConsent] = useState(false);
  const [testState, setTestState] = useState<TestState>('questions');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<{
    score: number, 
    category: string, 
    description: string,
    senseDominant: string
  } | null>(null);
  const questionsPerPage = 4;

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

  const handleVakogAnswerChange = (questionId: string, value: number) => {
    setVakogAnswers(prevAnswers => {
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
    const nextIndex = currentQuestionIndex + questionsPerPage;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      setTestState('vakog');
    }
  };

  const handlePreviousQuestion = () => {
    const prevIndex = currentQuestionIndex - questionsPerPage;
    if (prevIndex >= 0) {
      setCurrentQuestionIndex(prevIndex);
    }
  };

  const handleVakogComplete = () => {
    setTestState('email');
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
      const senseDominant = calculateDominantSense(vakogAnswers);
      
      const finalResults = {
        ...result,
        senseDominant
      };
      
      setTestResults(finalResults);
      
      const { error: supabaseError } = await supabase
        .from('quiz_results')
        .insert({
          user_email: email,
          answers: JSON.stringify(answers),
          vakog_answers: JSON.stringify(vakogAnswers),
          total_score: result.score,
          category: result.category,
          sense_dominant: senseDominant,
          recommendations: result.description
        });
      
      if (supabaseError) {
        throw new Error(`Erreur de base de données: ${supabaseError.message}`);
      }
      
      const emailResponse = await supabase.functions.invoke('send-test-results', {
        body: JSON.stringify({
          email,
          score: result.score,
          category: result.category,
          description: result.description,
          senseDominant
        })
      });
      
      if (emailResponse.error) {
        toast({
          title: "Attention",
          description: "Vos résultats ont été calculés mais n'ont pas pu être envoyés par email.",
          variant: "default"
        });
      } else if (emailResponse.data?.status === "warning") {
        toast({
          title: "Attention",
          description: emailResponse.data.message,
          variant: "default"
        });
      } else {
        toast({
          title: "Résultats calculés",
          description: "Vos résultats ont été calculés avec succès !",
        });
      }
      
      setTestState('results');
      onComplete();
      
    } catch (err: any) {
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

  return {
    currentQuestionIndex,
    answers,
    vakogAnswers,
    email,
    gdprConsent,
    testState,
    isSubmitting,
    error,
    testResults,
    handleAnswerSelection,
    handleVakogAnswerChange,
    handleNextQuestion,
    handlePreviousQuestion,
    handleVakogComplete,
    handleSubmit,
    setEmail,
    setGdprConsent,
  };
};
