
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { vakogQuestions } from '@/utils/vakogQuestions';

type VAKOGQuestionsProps = {
  onAnswerChange: (questionId: string, value: number) => void;
  currentAnswers: Record<string, number>;
};

const VAKOGQuestions = ({ onAnswerChange, currentAnswers }: VAKOGQuestionsProps) => {
  return (
    <div className="space-y-8">
      {vakogQuestions.map((question) => (
        <div key={question.id} className="mb-6">
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
    </div>
  );
};

export default VAKOGQuestions;
