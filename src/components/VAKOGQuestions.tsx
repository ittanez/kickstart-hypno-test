
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { vakogQuestions } from '@/utils/vakogQuestions';

type VAKOGQuestionsProps = {
  onAnswerChange: (questionId: string, value: number) => void;
  currentAnswers: Record<string, number>;
};

const VAKOGQuestions = ({ onAnswerChange, currentAnswers }: VAKOGQuestionsProps) => {
  const valueLabels = {
    1: "Pas du tout d'accord",
    2: "Plutôt pas d'accord",
    3: "Neutre",
    4: "Plutôt d'accord",
    5: "Tout à fait d'accord"
  };

  return (
    <div className="space-y-8">
      {vakogQuestions.map((question) => (
        <div key={question.id} className="mb-6">
          <p className="text-lg mb-4">{question.text}</p>
          <div className="px-4">
            <div className="flex justify-between mb-2 text-sm text-gray-600">
              {Object.entries(valueLabels).map(([value, label]) => (
                <button
                  key={value}
                  onClick={() => onAnswerChange(question.id, Number(value))}
                  className={`px-2 py-1 rounded ${
                    currentAnswers[question.id] === Number(value)
                      ? 'bg-hypno-primary text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <Slider
              value={[currentAnswers[question.id] || 3]}
              min={1}
              max={5}
              step={1}
              onValueChange={(value) => onAnswerChange(question.id, value[0])}
              className="w-full"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default VAKOGQuestions;
