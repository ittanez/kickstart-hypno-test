
import React from 'react';
import { Check, ArrowLeft } from 'lucide-react';

interface ThankYouMessageProps {
  onBackToHome: () => void;
}

const ThankYouMessage = ({ onBackToHome }: ThankYouMessageProps) => {
  return (
    <div className="hypno-card text-center max-w-xl mx-auto py-12 px-4 animate-fade-in">
      <div className="flex justify-center mb-6">
        <div className="bg-green-100 p-3 rounded-full">
          <Check size={48} className="text-green-600" />
        </div>
      </div>
      
      <h2 className="text-2xl md:text-3xl font-bold mb-4">
        Merci pour votre participation !
      </h2>
      
      <p className="text-lg text-gray-700 mb-6">
        Votre test de réceptivité à l'hypnose a été soumis avec succès. Vos résultats ont été calculés et vous seront envoyés à l'adresse e-mail que vous avez fournie.
      </p>
      
      <p className="text-md text-gray-600 mb-8">
        N'oubliez pas de vérifier votre boîte de réception (et éventuellement vos spams) pour découvrir votre score et des conseils personnalisés.
      </p>
      
      <button
        onClick={onBackToHome}
        className="inline-flex items-center gap-2 bg-hypno-primary text-white px-6 py-3 rounded-lg hover:bg-hypno-secondary transition-colors mb-6"
      >
        <ArrowLeft size={20} />
        Retour à l'accueil
      </button>
      
      <div className="border-t border-gray-200 pt-6">
        <p className="text-sm text-gray-500">
          Si vous avez des questions ou si vous ne recevez pas votre e-mail dans les prochaines minutes, n'hésitez pas à nous contacter.
        </p>
      </div>
    </div>
  );
};

export default ThankYouMessage;
