
import { lazy, Suspense } from 'react';
import { useTestForm } from '@/hooks/useTestForm';

// Lazy load Framer Motion pour ne pas bloquer l'initial load
const MotionDiv = lazy(() => 
  import('framer-motion').then(module => ({ 
    default: module.motion.div 
  }))
);
const AnimatePresence = lazy(() => 
  import('framer-motion').then(module => ({ 
    default: module.AnimatePresence 
  }))
);

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
      <Suspense fallback={<LoadingSpinner />}>
        <AnimatePresence mode="wait">
          <MotionDiv
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
          </MotionDiv>
        </AnimatePresence>
      </Suspense>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4">
      <Suspense fallback={<LoadingSpinner />}>
        <AnimatePresence mode="wait">
          <MotionDiv
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
          </MotionDiv>
        </AnimatePresence>
      </Suspense>
    </div>
  );
};

export default TestForm;
