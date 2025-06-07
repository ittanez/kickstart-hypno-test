import React from 'react';
import { Clock, CheckCircle, Brain } from "lucide-react";

interface HeroSectionProps {
  onStartTest: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onStartTest }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          
          {/* Contenu textuel */}
          <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 bg-hypno-accent/10 text-hypno-accent px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Brain className="h-4 w-4" />
                🧠 Test gratuit avec votre hypnothérapeute à Paris : Révélez votre potentiel hypnotique
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-hypno-primary mb-6 leading-tight">
              Suis-je hypnotisable ? Test gratuit à Paris
              <span className="block text-2xl sm:text-3xl lg:text-4xl xl:text-5xl mt-2 text-hypno-accent">
                Découvrez votre réceptivité en 2 minutes
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-2xl mx-auto lg:mx-0">
              <strong>Révélez votre potentiel hypnotique</strong> avec notre test scientifique gratuit développé par un hypnothérapeute à Paris. 
              Analysez votre réceptivité à l'hypnose et découvrez vos canaux sensoriels dominants (VAKOG).
            </p>
            
            {/* Points clés */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 mb-8 max-w-2xl mx-auto lg:mx-0">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">Test basé sur la science hypnotique</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <span className="text-gray-700">Résultats personnalisés immédiats</span>
              </div>
              <div className="flex items-center gap-3">
                <Brain className="h-5 w-5 text-purple-600 flex-shrink-0" />
                <span className="text-gray-700">Analyse VAKOG complète</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-hypno-accent flex-shrink-0" />
                <span className="text-gray-700">Hypnothérapeute certifié Paris</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={onStartTest}
                className="bg-hypno-accent hover:bg-hypno-primary text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-lg"
              >
                🧠 Commencer le test gratuit d'hypnotisabilité
              </button>
              
              <button 
                className="border-2 border-hypno-primary text-hypno-primary hover:bg-hypno-primary hover:text-white px-8 py-4 text-lg font-semibold transition-all duration-300 rounded-lg"
                onClick={() => window.open('https://novahypnose.fr/#about', '_blank')}
              >
                Hypnothérapeute Paris - En savoir plus
              </button>
            </div>
          </div>
          
          {/* Image */}
          <div className="flex-1 order-1 lg:order-2 w-full max-w-md lg:max-w-none mx-auto">
            <div className="relative">
              {/* Image principale */}
              <div className="relative mx-auto w-full max-w-sm lg:max-w-md xl:max-w-lg">
                <img 
                  src="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images//hypnotisable.webp"
                  alt="Hypnothérapeute professionnel à Paris - Test de réceptivité à l'hypnose"
                  className="w-full h-auto rounded-2xl shadow-2xl object-cover aspect-[4/5]"
                  loading="eager"
                />
                
                {/* Overlay décoratif */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-hypno-accent/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-400/20 rounded-full blur-xl"></div>
              </div>
              
              {/* Badge flottant */}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 lg:left-auto lg:right-0 lg:translate-x-0">
                <div className="bg-white rounded-full px-6 py-3 shadow-lg border border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-1">
                      <div className="w-6 h-6 bg-green-400 rounded-full border-2 border-white"></div>
                      <div className="w-6 h-6 bg-blue-400 rounded-full border-2 border-white"></div>
                      <div className="w-6 h-6 bg-purple-400 rounded-full border-2 border-white"></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700">+2000 tests réalisés à Paris</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      
      {/* Formes décoratives */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-200/20 rounded-full blur-3xl"></div>
    </section>
  );
};

export default HeroSection;
