
import { useState, useCallback } from 'react';
import { questions } from '@/utils/questions';
import { TestState } from './useTestForm';

export const useTestNavigation = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [testState, setTestState] = useState<TestState>('questions');

  const handleNextQuestion = useCallback(() => {
    const questionsPerPage = 10;
    const nextIndex = currentQuestionIndex + questionsPerPage;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
      // Safely scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setTestState('vakog');
      // Safely scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentQuestionIndex]);

  const handlePreviousQuestion = useCallback(() => {
    const questionsPerPage = 10;
    const prevIndex = currentQuestionIndex - questionsPerPage;
    if (prevIndex >= 0) {
      setCurrentQuestionIndex(prevIndex);
      // Safely scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentQuestionIndex]);

  const handleVakogComplete = useCallback(() => {
    setTestState('email');
    // Safely scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return {
    currentQuestionIndex,
    testState,
    handleNextQuestion,
    handlePreviousQuestion,
    handleVakogComplete,
  };
};
