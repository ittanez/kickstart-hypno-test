
import { useState, useCallback } from 'react';
import { questions } from '@/utils/questions';
import { TestState } from './useTestForm';
import { scrollToTop } from '@/utils/scrollUtils';

export const useTestNavigation = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [testState, setTestState] = useState<TestState>('questions');

  const handleNextQuestion = useCallback(() => {
    const questionsPerPage = 10;
    const nextIndex = currentQuestionIndex + questionsPerPage;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
      // Scroll fluide vers le haut
      setTimeout(() => scrollToTop(), 50);
    } else {
      setTestState('vakog');
      // Scroll fluide vers le haut
      setTimeout(() => scrollToTop(), 50);
    }
  }, [currentQuestionIndex]);

  const handlePreviousQuestion = useCallback(() => {
    const questionsPerPage = 10;
    const prevIndex = currentQuestionIndex - questionsPerPage;
    if (prevIndex >= 0) {
      setCurrentQuestionIndex(prevIndex);
      // Scroll fluide vers le haut
      setTimeout(() => scrollToTop(), 50);
    }
  }, [currentQuestionIndex]);

  const handleVakogComplete = useCallback(() => {
    setTestState('email');
    // Scroll fluide vers le haut
    setTimeout(() => scrollToTop(), 50);
  }, []);

  return {
    currentQuestionIndex,
    testState,
    handleNextQuestion,
    handlePreviousQuestion,
    handleVakogComplete,
  };
};
