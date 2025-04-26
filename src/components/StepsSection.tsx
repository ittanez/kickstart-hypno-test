
import React from 'react';
import { FileText, Mail, Check } from 'lucide-react';

const StepsSection = () => {
  const steps = [
    {
      icon: <FileText className="w-8 h-8 text-hypno-primary" />,
      emoji: "🎯",
      title: "Répondez à quelques questions",
      description: "Un questionnaire rapide et scientifique qui révèle votre type de réceptivité unique."
    },
    {
      icon: <Mail className="w-8 h-8 text-hypno-primary" />,
      emoji: "📧",
      title: "Recevez vos résultats",
      description: "Entrez votre email et obtenez instantanément votre profil hypnotique personnel."
    },
    {
      icon: <Check className="w-8 h-8 text-hypno-primary" />,
      emoji: "✨",
      title: "Exploitez votre potentiel",
      description: "Transformez votre connaissance en action pour des résultats concrets et durables."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">
          3 étapes simples pour découvrir votre potentiel hypnotique
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="mb-4 flex justify-center items-center gap-2">
                {step.icon}
                <span className="text-2xl">{step.emoji}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
