
import React from 'react';
import { Button } from '@/components/ui/button';
import VAKOGQuestions from '@/components/VAKOGQuestions';
import { vakogQuestions } from '@/utils/vakogQuestions';

type VAKOGStepProps = {
  currentAnswers: Record<string, number>;
  onAnswerChange: (questionId: string, value: number) => void;
  onComplete: () => void;
};

export const VAKOGStep: React.FC<VAKOGStepProps> = ({ 
  currentAnswers, 
  onAnswerChange,
  onComplete 
}) => {
  const handleComplete = () => {
    // Vérifier que toutes les questions ont été répondues
    const allQuestionsAnswered = vakogQuestions.every(q => 
      currentAnswers[q.id] !== undefined
    );
    
    if (allQuestionsAnswered) {
      onComplete();
    } else {
      // Optionnel: ajouter un message d'erreur si toutes les questions ne sont pas répondues
      alert("Veuillez répondre à toutes les questions avant de continuer");
    }
  };

  return (
    <div className="mb-12 py-6 hypno-card animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Découvrez votre canal sensoriel dominant
      </h2>
      
      <p className="mb-8 text-center text-gray-600">
        Ces quelques questions supplémentaires nous permettront d'identifier votre canal sensoriel préférentiel 
        (Visuel, Auditif, Kinesthésique, Olfactif ou Gustatif).
      </p>
      
      <VAKOGQuestions 
        onAnswerChange={onAnswerChange} 
        currentAnswers={currentAnswers} 
      />
      
      <div className="flex justify-end mt-8">
        <Button
          type="button"
          onClick={handleComplete}
          className="hypno-button"
        >
          Continuer
        </Button>
      </div>
    </div>
  );
};
