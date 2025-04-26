
import { questions } from '@/utils/questions';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
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
  const sliderValueLabels = ['Pas du tout d\'accord', 'Peu d\'accord', 'Parfois', 'Souvent', 'Tout à fait d\'accord'];
  
  const getCurrentValueLabel = () => {
    return sliderValueLabels[currentSliderValue - 1];
  };

  return (
    <div className="mb-12">
      <ProgressBar 
        currentStep={currentQuestionIndex + 1} 
        totalSteps={questions.length} 
      />
      
      <div className="text-end text-sm font-medium text-hypno-primary mb-2">
        {getCurrentValueLabel()}
      </div>
      
      <div className="space-y-8">
        <div className="text-lg font-medium text-center mb-6">
          {currentQuestion.text}
        </div>
        
        <div className="px-4">
          <Slider
            value={[currentSliderValue]}
            min={1}
            max={5}
            step={1}
            onValueChange={(value) => onAnswerSelect(currentQuestion.id, value[0])}
            className="w-full"
          />
          
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>Pas du tout d'accord</span>
            <span>Tout à fait d'accord</span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end mt-8">
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
