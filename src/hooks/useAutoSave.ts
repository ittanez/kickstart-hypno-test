import { useEffect } from 'react';
import { Answer } from '@/utils/calculateScore';
import { VAKOGAnswer } from '@/utils/vakogQuestions';

const STORAGE_KEYS = {
  ANSWERS: 'hypno-test-answers',
  VAKOG_ANSWERS: 'hypno-test-vakog-answers',
  EMAIL: 'hypno-test-email',
  TEST_STATE: 'hypno-test-state',
  CURRENT_QUESTION: 'hypno-test-current-question'
} as const;

export const useAutoSave = () => {
  const saveAnswers = (answers: Answer[]) => {
    localStorage.setItem(STORAGE_KEYS.ANSWERS, JSON.stringify(answers));
  };

  const saveVakogAnswers = (vakogAnswers: VAKOGAnswer[]) => {
    localStorage.setItem(STORAGE_KEYS.VAKOG_ANSWERS, JSON.stringify(vakogAnswers));
  };

  const saveEmail = (email: string) => {
    localStorage.setItem(STORAGE_KEYS.EMAIL, email);
  };

  const saveTestState = (testState: string) => {
    localStorage.setItem(STORAGE_KEYS.TEST_STATE, testState);
  };

  const saveCurrentQuestion = (questionIndex: number) => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_QUESTION, questionIndex.toString());
  };

  const getSavedAnswers = (): Answer[] => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ANSWERS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  };

  const getSavedVakogAnswers = (): VAKOGAnswer[] => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.VAKOG_ANSWERS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  };

  const getSavedEmail = (): string => {
    return localStorage.getItem(STORAGE_KEYS.EMAIL) || '';
  };

  const getSavedTestState = (): string => {
    return localStorage.getItem(STORAGE_KEYS.TEST_STATE) || 'questions';
  };

  const getSavedCurrentQuestion = (): number => {
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_QUESTION);
    return saved ? parseInt(saved, 10) : 0;
  };

  const clearSavedData = () => {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  };

  const hasSavedData = (): boolean => {
    return localStorage.getItem(STORAGE_KEYS.ANSWERS) !== null;
  };

  return {
    saveAnswers,
    saveVakogAnswers,
    saveEmail,
    saveTestState,
    saveCurrentQuestion,
    getSavedAnswers,
    getSavedVakogAnswers,
    getSavedEmail,
    getSavedTestState,
    getSavedCurrentQuestion,
    clearSavedData,
    hasSavedData
  };
};