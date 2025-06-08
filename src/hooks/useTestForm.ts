
import { useEffect } from 'react';
import { useAnswers } from './useAnswers';
import { useTestNavigation } from './useTestNavigation';
import { useTestSubmission } from './useTestSubmission';
import { useAutoSave } from './useAutoSave';

export type TestState = 'questions' | 'vakog' | 'email' | 'results';

export const useTestForm = (onComplete: () => void) => {
  const autoSave = useAutoSave();
  
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

  // Auto-save des données
  useEffect(() => {
    autoSave.saveAnswers(answers);
  }, [answers, autoSave]);

  useEffect(() => {
    autoSave.saveVakogAnswers(vakogAnswers);
  }, [vakogAnswers, autoSave]);

  useEffect(() => {
    autoSave.saveEmail(email);
  }, [email, autoSave]);

  useEffect(() => {
    autoSave.saveTestState(testState);
  }, [testState, autoSave]);

  useEffect(() => {
    autoSave.saveCurrentQuestion(currentQuestionIndex);
  }, [currentQuestionIndex, autoSave]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    await handleSubmit(e, answers, vakogAnswers, onComplete);
    // Clear saved data after successful submission
    autoSave.clearSavedData();
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
