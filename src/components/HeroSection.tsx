
import React from 'react';
import { Button } from '@/components/ui/button';

type HeroSectionProps = {
  onStartTest: () => void;
};

const HeroSection = ({ onStartTest }: HeroSectionProps) => {
  return (
    <div className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Element */}
      <div className="absolute inset-0 bg-gradient-to-br from-hypno-light/30 to-white -z-10" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-hypno-accent/10 rounded-full blur-3xl -z-10" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-hypno-primary/10 rounded-full blur-3xl -z-10" />
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="mb-6">
            <span className="hypno-gradient">Testez votre réceptivité</span>
            <br />à l'hypnose
          </h1>
          
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Découvrez votre potentiel hypnotique en répondant à notre test scientifique 
            de 24 questions et recevez une analyse personnalisée de vos résultats.
          </p>
          
          <Button
            onClick={onStartTest}
            className="hypno-button text-lg px-8 py-4"
          >
            Commencer le Test
          </Button>
          
          <p className="mt-4 text-sm text-gray-500">Durée estimée : 5-7 minutes</p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
