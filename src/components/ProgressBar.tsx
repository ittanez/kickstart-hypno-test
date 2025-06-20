
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
    <div className="w-full mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-500">Page {currentStep}/3</span>
        <span className="text-sm font-medium text-hypno-primary">{progress}%</span>
      </div>
      <Progress value={progress} className="h-2 bg-gray-200" />
    </div>
  );
};

export default ProgressBar;
