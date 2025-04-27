import { questions } from '@/utils/questions';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import ProgressBar from '@/components/ProgressBar';
import { Answer } from '@/utils/calculateScore';

type QuestionStepProps = {
  currentQuestionIndex: number;
  onAnswerSelect: (questionId: number, value: number) => void;
  onNext: () => void;
  answers: Answer[];
};

export const QuestionStep = ({
  currentQuestionIndex,
  onAnswerSelect,
  onNext,
  answers,
}: QuestionStepProps) => {
  const questionsPerPage = 10;
  const currentPage = Math.floor(currentQuestionIndex / questionsPerPage);
  const startIndex = currentPage * questionsPerPage;
  const pageQuestions = questions.slice(startIndex, startIndex + questionsPerPage);
  
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

  const isPageComplete = pageQuestions.every((question) => {
    const answer = answers.find(a => a.questionId === question.id);
    return answer !== undefined;
  });

  return (
    <div className="mb-12">
      <ProgressBar 
        currentStep={currentPage + 1} 
        totalSteps={Math.ceil(questions.length / questionsPerPage)} 
      />
      
      <div className="space-y-8">
        {pageQuestions.map((question, index) => {
          const answer = answers.find(a => a.questionId === question.id);
          const currentValue = answer ? answer.value : 3; // Default to 3 (neutral) if no answer
          
          return (
            <div key={question.id} className="p-4 bg-white rounded-lg shadow-sm">
              <div className="text-lg font-medium mb-6">
                {question.text}
              </div>
              
              <div className="px-4">
                <div className="flex justify-between mb-4 text-sm text-gray-600">
                  {Object.entries(valueLabels).map(([value, label]) => (
                    <button
                      key={value}
                      onClick={() => onAnswerSelect(question.id, Number(value))}
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
                    onValueChange={(value) => onAnswerSelect(question.id, value[0])}
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
      
      <div className="flex justify-between mt-8">
        <Button
          type="button"
          onClick={handlePrevious}
          className="bg-gray-200 text-gray-800 hover:bg-gray-300"
          disabled={currentPage === 0}
        >
          <ChevronLeft className="mr-1 h-4 w-4" /> Page précédente
        </Button>
        
        <Button
          type="button"
          onClick={onNext}
          className="hypno-button"
          disabled={!isPageComplete}
        >
          Suivant <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
