
import { useAnswers } from './useAnswers';
import { useTestNavigation } from './useTestNavigation';
import { useTestSubmission } from './useTestSubmission';

export type TestState = 'questions' | 'vakog' | 'email' | 'results';

export const useTestForm = (onComplete: () => void) => {
  const {
    answers,
    vakogAnswers,
    handleAnswerSelection,
    handleVakogAnswerChange,
  } = useAnswers();

  const {
    currentQuestionIndex,
    testState,
    handleNextQuestion,
    handlePreviousQuestion,
    handleVakogComplete,
  } = useTestNavigation();

  const {
    email,
    gdprConsent,
    isSubmitting,
    error,
    testResults,
    setEmail,
    setGdprConsent,
    handleSubmit,
  } = useTestSubmission();

  const handleFormSubmit = async (e: React.FormEvent) => {
    await handleSubmit(e, answers, vakogAnswers, onComplete);
  };

  return {
    currentQuestionIndex,
    answers,
    vakogAnswers,
    email,
    gdprConsent,
    testState,
    isSubmitting,
    error,
    testResults,
    handleAnswerSelection,
    handleVakogAnswerChange,
    handleNextQuestion,
    handlePreviousQuestion,
    handleVakogComplete,
    handleSubmit: handleFormSubmit,
    setEmail,
    setGdprConsent,
  };
};
