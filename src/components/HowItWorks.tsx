
import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      title: "Répondez au test",
      description: "Complétez les 24 questions conçues pour évaluer votre réceptivité naturelle à l'hypnose.",
      icon: "📋"
    },
    {
      title: "Laissez votre email",
      description: "Recevez vos résultats personnalisés directement dans votre boîte de réception.",
      icon: "✉️"
    },
    {
      title: "Découvrez vos résultats",
      description: "Obtenez votre score de réceptivité et des conseils adaptés à votre profil.",
      icon: "🔍"
    }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="mb-4">Comment ça marche ?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Un processus simple en trois étapes pour découvrir votre potentiel hypnotique
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="hypno-card text-center h-full flex flex-col">
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-xl mb-3">{step.title}</h3>
              <p className="text-gray-600 flex-grow">{step.description}</p>
              <div className="mt-4 text-hypno-primary font-bold text-xl">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
