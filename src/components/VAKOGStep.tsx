
import React from 'react';
import { Button } from '@/components/ui/button';
import { vakogQuestions } from '@/utils/vakogQuestions';
import { Slider } from '@/components/ui/slider';

type VAKOGStepProps = {
  currentAnswers: Record<string, number>;
  onAnswerChange: (questionId: string, value: number) => void;
  onComplete: () => void;
};

const VAKOGStep = ({ currentAnswers, onAnswerChange, onComplete }: VAKOGStepProps) => {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-center mb-6">Identifiez votre canal sensoriel dominant</h2>
      <p className="text-center mb-8">
        Ces questions permettent de déterminer quel sens vous utilisez principalement pour percevoir et traiter l'information.
      </p>
      
      {vakogQuestions.map((question) => (
        <div key={question.id} className="mb-8 p-6 bg-white shadow-md rounded-lg">
          <p className="text-lg mb-4">{question.text}</p>
          <div className="px-4">
            <Slider
              value={[currentAnswers[question.id] || 3]}
              min={1}
              max={5}
              step={1}
              onValueChange={(value) => onAnswerChange(question.id, value[0])}
              className="w-full"
            />
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>Pas du tout d'accord</span>
              <span>Tout à fait d'accord</span>
            </div>
          </div>
        </div>
      ))}
      
      <div className="flex justify-center mt-8">
        <Button
          onClick={onComplete}
          className="hypno-button"
        >
          Continuer
        </Button>
      </div>
    </div>
  );
};

export default VAKOGStep;
