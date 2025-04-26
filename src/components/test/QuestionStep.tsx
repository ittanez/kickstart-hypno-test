
import { questions } from '@/utils/questions';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import ProgressBar from '@/components/ProgressBar';

type QuestionStepProps = {
  currentQuestionIndex: number;
  currentSliderValue: number;
  onAnswerSelect: (questionId: number, value: number) => void;
  onNext: () => void;
};

export const QuestionStep = ({
  currentQuestionIndex,
  currentSliderValue,
  onAnswerSelect,
  onNext,
}: QuestionStepProps) => {
  const currentQuestion = questions[currentQuestionIndex];
  const valueLabels = {
    1: "Pas du tout d'accord",
    2: "Plutôt pas d'accord",
    3: "Neutre",
    4: "Plutôt d'accord",
    5: "Tout à fait d'accord"
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      window.history.back();
    }
  };

  const handleAnswerSelect = (value: number) => {
    onAnswerSelect(currentQuestion.id, value);
    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => onNext(), 300);
    }
  };

  return (
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
          <div className="flex justify-between mb-4 text-sm text-gray-600">
            {Object.entries(valueLabels).map(([value, label]) => (
              <button
                key={value}
                onClick={() => handleAnswerSelect(Number(value))}
                className={`px-3 py-2 rounded text-center transition-colors ${
                  currentSliderValue === Number(value)
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
              value={[currentSliderValue]}
              min={1}
              max={5}
              step={1}
              onValueChange={(value) => handleAnswerSelect(value[0])}
              className="w-full"
            />
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>{valueLabels[1]}</span>
              <span>{valueLabels[5]}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between mt-8">
        <Button
          type="button"
          onClick={handlePrevious}
          className="bg-gray-200 text-gray-800 hover:bg-gray-300"
          disabled={currentQuestionIndex === 0}
        >
          <ChevronLeft className="mr-1 h-4 w-4" /> Question précédente
        </Button>
        
        <Button
          type="button"
          onClick={onNext}
          className="hypno-button"
        >
          {currentQuestionIndex < questions.length - 1 ? (
            <>Question suivante <ChevronRight className="ml-1 h-4 w-4" /></>
          ) : (
            "Terminer le test"
          )}
        </Button>
      </div>
    </div>
  );
};
