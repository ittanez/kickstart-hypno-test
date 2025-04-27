
import { useState, useCallback } from 'react';
import { Answer } from '@/utils/calculateScore';
import { questions } from '@/utils/questions';
import { VAKOGAnswer } from '@/utils/vakogQuestions';

export const useAnswers = () => {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [vakogAnswers, setVakogAnswers] = useState<VAKOGAnswer[]>([]);

  const handleAnswerSelection = useCallback((questionId: number, value: number) => {
    setAnswers(prevAnswers => {
      const existingAnswerIndex = prevAnswers.findIndex(a => a.questionId === questionId);
      
      if (existingAnswerIndex !== -1) {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingAnswerIndex] = { questionId, value };
        return updatedAnswers;
      } else {
        return [...prevAnswers, { questionId, value }];
      }
    });
  }, []);

  const handleVakogAnswerChange = useCallback((questionId: string, value: number) => {
    setVakogAnswers(prevAnswers => {
      const existingAnswerIndex = prevAnswers.findIndex(a => a.questionId === questionId);
      
      if (existingAnswerIndex !== -1) {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingAnswerIndex] = { questionId, value };
        return updatedAnswers;
      } else {
        return [...prevAnswers, { questionId, value }];
      }
    });
  }, []);

  return {
    answers,
    vakogAnswers,
    handleAnswerSelection,
    handleVakogAnswerChange,
  };
};
