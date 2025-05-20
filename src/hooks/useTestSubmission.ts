
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { calculateScore } from '@/utils/calculateScore';
import { supabase } from '@/integrations/supabase/client';
import { Answer } from '@/utils/calculateScore';
import { VAKOGAnswer, calculateDominantSense } from '@/utils/vakogQuestions';

export const useTestSubmission = () => {
  const [email, setEmail] = useState('');
  const [gdprConsent, setGdprConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<{
    score: number, 
    category: string, 
    description: string,
    senseDominant: string
  } | null>(null);

  const handleSubmit = async (
    e: React.FormEvent,
    answers: Answer[],
    vakogAnswers: VAKOGAnswer[],
    onComplete: () => void
  ) => {
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
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Email invalide",
        description: "Veuillez saisir une adresse email valide.",
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
      
      const sanitizedEmail = email.trim().toLowerCase();
      
      const { error: supabaseError } = await supabase
        .from('quiz_results')
        .insert({
          user_email: sanitizedEmail,
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
      
      // Force refresh of the edge function by adding a timestamp parameter
      const timestamp = new Date().getTime();
      const emailResponse = await supabase.functions.invoke('send-test-results', {
        body: JSON.stringify({
          email: sanitizedEmail,
          score: result.score,
          category: result.category,
          description: result.description,
          senseDominant,
          timestamp // Add timestamp to force cache invalidation
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
    email,
    gdprConsent,
    isSubmitting,
    error,
    testResults,
    setEmail,
    setGdprConsent,
    handleSubmit,
  };
};
