
import React from 'react';
import { Question } from '@/utils/questions';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type QuestionCardProps = {
  question: Question;
  selectedValue: number | null;
  onChange: (questionId: number, value: number) => void;
};

const QuestionCard = ({ question, selectedValue, onChange }: QuestionCardProps) => {
  return (
    <div className="hypno-card animate-fade-in">
      <h3 className="text-lg md:text-xl mb-4 text-center">{question.text}</h3>
      
      <RadioGroup 
        className="grid gap-4 mt-6"
        value={selectedValue?.toString() || ""} 
        onValueChange={(value) => onChange(question.id, parseInt(value))}
      >
        {question.options.map((option) => (
          <div 
            key={option.value}
            className="flex items-center border border-gray-200 rounded-md p-3 transition-all duration-200 hover:border-hypno-accent cursor-pointer"
          >
            <RadioGroupItem 
              value={option.value.toString()} 
              id={`q${question.id}-option${option.value}`} 
              className="mr-3"
            />
            <Label 
              htmlFor={`q${question.id}-option${option.value}`}
              className="flex-1 cursor-pointer"
            >
              {option.text}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default QuestionCard;
