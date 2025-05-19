
import React from 'react';
import { Button } from '@/components/ui/button';

type HeroSectionProps = {
  onStartTest: () => void;
};

const HeroSection = ({ onStartTest }: HeroSectionProps) => {
  return (
    <div className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-hypno-light/30 to-white -z-10" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-hypno-accent/10 rounded-full blur-3xl -z-10" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-hypno-primary/10 rounded-full blur-3xl -z-10" />
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="mb-6 text-4xl md:text-5xl font-bold">
              Test d'hypnose gratuit à Paris<br />
              <span className="text-2xl md:text-3xl">Suis-je hypnotisable ? Découvrez-le en 2 minutes</span>
            </h1>
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-hypno-primary mb-4">
                🧠 Test gratuit avec votre hypnothérapeute à Paris : Révélez votre potentiel hypnotique
              </h2>
              <img 
                src="/lovable-uploads/26ce25bb-25a8-4a47-96b2-0d6994c5c0f3.png"
                alt="Découvrez votre potentiel hypnotique avec un hypnothérapeute à Paris"
                className="rounded-lg shadow-lg max-w-2xl mx-auto mb-8"
                width="768"
                height="432"
                loading="eager"
              />
              <p className="text-lg text-gray-700 mb-6">
                Vous vous êtes toujours demandé si l'hypnose pourrait fonctionner sur vous ? Vous cherchez un hypnothérapeute à Paris pour gérer votre stress, anxiété ou améliorer votre confiance en soi ?
              </p>
              <p className="text-lg text-gray-700">
                Notre cabinet d'hypnose à Paris vous propose ce test rapide qui révèle immédiatement votre niveau de réceptivité et comment l'utiliser pour transformer votre quotidien.
              </p>
            </div>
            <Button
              onClick={onStartTest}
              className="hypno-button text-lg px-8 py-6"
            >
              DÉMARRER MON TEST GRATUIT
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
