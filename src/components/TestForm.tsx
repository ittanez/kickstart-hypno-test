
import { useTestForm } from '@/hooks/useTestForm';
import { QuestionStep } from './test/QuestionStep';
import { VAKOGStep } from './test/VAKOGStep';
import { EmailStep } from './test/EmailStep';
import { ResultsStep } from './test/ResultsStep';

type TestFormProps = {
  onComplete: () => void;
};

const TestForm = ({ onComplete }: TestFormProps) => {
  const {
    currentQuestionIndex,
    testState,
    currentSliderValue,
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

  if (testState === 'results' && testResults) {
    return <ResultsStep results={testResults} email={email} />;
  }

  return (
    <div className="max-w-3xl mx-auto px-4">
      {testState === 'questions' ? (
        <QuestionStep
          currentQuestionIndex={currentQuestionIndex}
          currentSliderValue={currentSliderValue}
          onAnswerSelect={handleAnswerSelection}
          onNext={handleNextQuestion}
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
    </div>
  );
};

export default TestForm;
