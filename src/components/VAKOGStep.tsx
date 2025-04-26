
import React from 'react';
import { Button } from '@/components/ui/button';
import { vakogQuestions } from '@/utils/vakogQuestions';
import { Slider } from '@/components/ui/slider';
import { ChevronRight, ChevronLeft } from 'lucide-react';

type VAKOGStepProps = {
  currentAnswers: Record<string, number>;
  onAnswerChange: (questionId: string, value: number) => void;
  onComplete: () => void;
};

const VAKOGStep = ({ currentAnswers, onAnswerChange, onComplete }: VAKOGStepProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const currentQuestion = vakogQuestions[currentQuestionIndex];
  const sliderValueLabels = ['Pas du tout d\'accord', 'Peu d\'accord', 'Parfois', 'Souvent', 'Tout à fait d\'accord'];
  
  const handleNext = () => {
    if (currentQuestionIndex < vakogQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  
  const handleAnswer = (value: number) => {
    onAnswerChange(currentQuestion.id, value);
    // Automatically go to next question after selecting an answer
    if (currentQuestionIndex < vakogQuestions.length - 1) {
      setTimeout(() => setCurrentQuestionIndex(prev => prev + 1), 300);
    }
  };

  const getCurrentValueLabel = (value: number) => {
    return sliderValueLabels[value - 1] || 'Neutre';
  };
  
  const progress = ((currentQuestionIndex + 1) / vakogQuestions.length) * 100;

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-center mb-6">Identifiez votre canal sensoriel dominant</h2>
      <p className="text-center mb-8">
        Ces questions permettent de déterminer quel sens vous utilisez principalement pour percevoir et traiter l'information.
      </p>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
        <div className="bg-hypno-primary h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
      </div>
      
      <div className="mb-8 p-6 bg-white shadow-md rounded-lg">
        <p className="text-lg mb-6 text-center">{currentQuestion.text}</p>
        
        <div className="text-end text-sm font-medium text-hypno-primary mb-2">
          {currentAnswers[currentQuestion.id] ? getCurrentValueLabel(currentAnswers[currentQuestion.id]) : 'Neutre'}
        </div>
        
        <div className="px-4 mb-6">
          <Slider
            value={[currentAnswers[currentQuestion.id] || 3]}
            min={1}
            max={5}
            step={1}
            onValueChange={(value) => handleAnswer(value[0])}
            className="w-full"
          />
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>Pas du tout d'accord</span>
            <span>Tout à fait d'accord</span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between mt-8">
        <Button
          onClick={handlePrevious}
          className="bg-gray-200 text-gray-800 hover:bg-gray-300"
          disabled={currentQuestionIndex === 0}
        >
          <ChevronLeft className="mr-1 h-4 w-4" /> Question précédente
        </Button>
        
        <Button
          onClick={handleNext}
          className="hypno-button"
        >
          {currentQuestionIndex < vakogQuestions.length - 1 ? (
            <>Question suivante <ChevronRight className="ml-1 h-4 w-4" /></>
          ) : (
            "Continuer"
          )}
        </Button>
      </div>
    </div>
  );
};

export default VAKOGStep;
