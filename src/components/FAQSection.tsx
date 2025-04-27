import React from 'react';

const FAQSection = () => {
  const faqItems = [
    {
      question: "Comment cette connaissance va m'aider concrètement ?",
      answer: "Imaginez avoir un GPS mental personnalisé ! Connaître votre profil permet à tout hypnothérapeute d'utiliser exactement les techniques qui fonctionnent pour VOUS. Résultat : des séances plus efficaces et des changements plus rapides."
    },
    {
      question: "Est-ce vraiment gratuit ou y a-t-il des frais cachés ?",
      answer: "100% gratuit, zéro engagement. Ce test est notre cadeau pour vous aider à faire le premier pas vers une vie plus épanouie."
    },
    {
      question: "Pourquoi demandez-vous mon email ?",
      answer: "Uniquement pour vous envoyer vos résultats personnalisés et quelques conseils adaptés à votre profil. Pas de spam, promis !"
    },
    {
      question: "Ce test est-il scientifiquement valide ?",
      answer: "Absolument ! Créé avec des experts en hypnothérapie clinique, notre test mesure avec précision votre potentiel hypnotique réel."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          Ce que vous vous demandez peut-être...
        </h2>
        <div className="grid gap-8 max-w-4xl mx-auto">
          {faqItems.map((item, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-3">{item.question}</h3>
              <p className="text-gray-600">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
