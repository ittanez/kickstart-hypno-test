
import { lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTestForm } from '@/hooks/useTestForm';

const QuestionStep = lazy(() => import('./test/QuestionStep').then(module => ({ default: module.QuestionStep })));
const VAKOGStep = lazy(() => import('./test/VAKOGStep').then(module => ({ default: module.VAKOGStep })));
const EmailStep = lazy(() => import('./test/EmailStep').then(module => ({ default: module.EmailStep })));
const ResultsStep = lazy(() => import('./test/ResultsStep').then(module => ({ default: module.ResultsStep })));

type TestFormProps = {
  onComplete: () => void;
};

const TestForm = ({ onComplete }: TestFormProps) => {
  const {
    currentQuestionIndex,
    testState,
    answers,
    vakogAnswers,
    email,
    gdprConsent,
    isSubmitting,
    error,
    testResults,
    handleAnswerSelection,
    handleVakogAnswerChange,
    handleNextQuestion,
    handlePreviousQuestion,
    handleVakogComplete,
    handleSubmit,
    setEmail,
    setGdprConsent,
  } = useTestForm(onComplete);

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-hypno-primary"></div>
    </div>
  );

  const pageVariants = {
    initial: { opacity: 0, x: 50, scale: 0.95 },
    in: { opacity: 1, x: 0, scale: 1 },
    out: { opacity: 0, x: -50, scale: 0.95 }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.4
  };

  if (testState === 'results' && testResults) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="results"
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          <Suspense fallback={<LoadingSpinner />}>
            <ResultsStep results={testResults} email={email} />
          </Suspense>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={testState}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          <Suspense fallback={<LoadingSpinner />}>
            {testState === 'questions' ? (
              <QuestionStep
                currentQuestionIndex={currentQuestionIndex}
                onAnswerSelect={handleAnswerSelection}
                onNext={handleNextQuestion}
                answers={answers}
              />
            ) : testState === 'vakog' ? (
              <VAKOGStep
                currentAnswers={vakogAnswers.reduce((acc, curr) => {
                  acc[curr.questionId] = curr.value;
                  return acc;
                }, {} as Record<string, number>)}
                onAnswerChange={handleVakogAnswerChange}
                onComplete={handleVakogComplete}
              />
            ) : (
              <EmailStep
                email={email}
                gdprConsent={gdprConsent}
                isSubmitting={isSubmitting}
                error={error}
                onEmailChange={setEmail}
                onGdprChange={setGdprConsent}
                onSubmit={handleSubmit}
              />
            )}
          </Suspense>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TestForm;
