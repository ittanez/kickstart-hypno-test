
import { useTestForm } from '@/hooks/useTestForm';
import { QuestionStep } from './test/QuestionStep';
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
    email,
    gdprConsent,
    isSubmitting,
    error,
    testResults,
    handleAnswerSelection,
    handleNextQuestion,
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
