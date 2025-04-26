
import { Button } from '@/components/ui/button';

type ResultsStepProps = {
  results: {
    score: number;
    category: string;
    description: string;
    senseDominant: string;
  };
  email?: string;
};

export const ResultsStep = ({ results, email }: ResultsStepProps) => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 hypno-card animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-center">Vos Résultats</h2>
      
      <div className="mb-6 p-6 bg-hypno-primary/10 rounded-lg">
        <div className="text-center">
          <p className="text-lg mb-2">Votre score est</p>
          <p className="text-4xl font-bold text-hypno-primary mb-2">{results.score}/120</p>
          <p className="text-xl font-semibold text-hypno-accent">{results.category}</p>
        </div>
      </div>
      
      <div className="mb-6 p-6 bg-hypno-accent/10 rounded-lg">
        <div className="text-center">
          <p className="text-lg mb-2">Votre canal sensoriel dominant</p>
          <p className="text-2xl font-bold text-hypno-accent">{results.senseDominant}</p>
        </div>
      </div>
      
      <div className="prose max-w-none mb-6">
        <p className="text-gray-700">{results.description}</p>
      </div>
      
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <p className="text-sm text-yellow-700">
          {email ? 
            `Ces résultats ont également été envoyés à votre adresse email: ${email}` :
            "Vos résultats n'ont pas pu être envoyés par email."
          }
        </p>
      </div>
      
      <div className="text-center">
        <Button
          type="button"
          onClick={() => window.location.reload()}
          className="hypno-button"
        >
          Refaire le test
        </Button>
      </div>
    </div>
  );
};
