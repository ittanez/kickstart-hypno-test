
import React from 'react';
import { Progress } from "@/components/ui/progress";

type ProgressBarProps = {
  currentStep: number;
  totalSteps: number;
};

const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  // Ensure progress calculation reflects the total number of pages (3)
  const progress = Math.round((currentStep / totalSteps) * 100);
  
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-gray-600 font-medium">Étape {currentStep}/3</span>
        <span className="text-sm font-semibold text-hypno-primary bg-hypno-primary/10 px-2 py-1 rounded-full">
          {progress}%
        </span>
      </div>
      <Progress value={progress} className="h-3 bg-gray-200 shadow-inner" />
      <div className="flex justify-between mt-2 text-xs text-gray-500">
        <span>Questions</span>
        <span>VAKOG</span>
        <span>Résultats</span>
      </div>
    </div>
  );
};

export default ProgressBar;
