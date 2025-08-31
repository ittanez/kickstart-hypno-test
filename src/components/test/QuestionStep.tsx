
import { questions } from '@/utils/questions';
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

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent any default behavior and event propagation
    e.preventDefault();
    e.stopPropagation();
    
    // Call the onNext function directly
    onNext();
  };

  const isPageComplete = pageQuestions.every((question) => {
    const answer = answers.find(a => a.questionId === question.id);
    return answer !== undefined;
  });

  return (
    <div className="mb-12">
      <ProgressBar 
        currentStep={currentPage + 1} 
        totalSteps={3} 
      />
      
      <div className="space-y-8">
        {pageQuestions.map((question, index) => {
          const answer = answers.find(a => a.questionId === question.id);
          const currentValue = answer?.value;
          
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
                      onClick={() => onAnswerSelect(question.id, value)}
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
          onClick={handleNext}
          className="hypno-button"
          disabled={!isPageComplete}
        >
          Suivant <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
