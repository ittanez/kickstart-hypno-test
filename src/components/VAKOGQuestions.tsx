
import React from 'react';
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
        const currentValue = currentAnswers[question.id];

        return (
          <div key={question.id} className="p-4 bg-white rounded-lg shadow-sm">
            <div className="text-lg font-medium mb-6">
              {question.text}
            </div>
            
            <div className="px-4">
              {/* Échelle numérique 1-5 */}
              <div className="flex justify-center items-center gap-8 mb-4">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    onClick={() => onAnswerChange(question.id, value)}
                    className={`numeric-option w-10 h-10 sm:w-12 sm:h-12 rounded-full text-center transition-all duration-200 font-semibold ${
                      currentValue === value
                        ? 'bg-hypno-primary text-white shadow-lg scale-110'
                        : 'bg-white hover:bg-hypno-primary/10 hover:shadow-md hover:scale-105 border-2 border-gray-200 hover:border-hypno-primary/40 text-gray-700 hover:text-hypno-primary'
                    }`}
                    type="button"
                    aria-label={`Noter ${value} sur 5 - ${valueLabels[value as keyof typeof valueLabels]}`}
                  >
                    {value}
                  </button>
                ))}
              </div>
              
              {/* Labels aux extrémités */}
              <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-6 px-2">
                <span className="text-left max-w-[30%]">Pas du tout d'accord</span>
                <span className="text-right max-w-[30%]">Tout à fait d'accord</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VAKOGQuestions;
