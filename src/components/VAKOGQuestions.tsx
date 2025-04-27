
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
      {vakogQuestions.map((question) => {
        const currentValue = currentAnswers[question.id] ?? 3; // Définir 3 (neutre) comme valeur par défaut

        return (
          <div key={question.id} className="mb-6">
            <p className="text-lg mb-4">{question.text}</p>
            <div className="px-4">
              <div className="flex justify-between mb-4 text-sm text-gray-600">
                {Object.entries(valueLabels).map(([value, label]) => (
                  <button
                    key={value}
                    onClick={() => onAnswerChange(question.id, Number(value))}
                    className={`px-3 py-2 rounded text-center transition-colors ${
                      currentValue === Number(value)
                        ? 'bg-hypno-primary text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="mt-6">
                <Slider
                  value={[currentValue]}
                  min={1}
                  max={5}
                  step={1}
                  onValueChange={(value) => onAnswerChange(question.id, value[0])}
                  className="w-full"
                />
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span>{valueLabels[1]}</span>
                  <span>{valueLabels[5]}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VAKOGQuestions;
