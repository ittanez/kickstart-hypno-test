
import React, { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import HowItWorks from '@/components/HowItWorks';
import TestForm from '@/components/TestForm';
import ThankYouMessage from '@/components/ThankYouMessage';

// Define the possible states of our application
type AppState = 'landing' | 'testing' | 'completed';

const Index = () => {
  // State for managing the current view
  const [appState, setAppState] = useState<AppState>('landing');
  
  // Handler for starting the test
  const handleStartTest = () => {
    setAppState('testing');
    // Scroll to top when starting the test
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Handler for completing the test
  const handleTestComplete = () => {
    setAppState('completed');
    // Scroll to top when showing results
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="py-4 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold">
              <span className="text-hypno-primary">Hypno</span>
              <span className="text-hypno-accent">Kick</span>
            </div>
            {appState === 'landing' && (
              <button 
                onClick={handleStartTest}
                className="text-hypno-primary hover:text-hypno-accent font-medium"
              >
                Démarrer le test
              </button>
            )}
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-grow">
        {appState === 'landing' && (
          <>
            <HeroSection onStartTest={handleStartTest} />
            <HowItWorks />
            <div className="py-16 bg-white">
              <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                  <h2 className="mb-6">Pourquoi faire ce test ?</h2>
                  <p className="text-lg text-gray-600 mb-8">
                    Comprendre votre réceptivité à l'hypnose vous aide à déterminer 
                    si cette approche peut être efficace pour vous. Que ce soit pour 
                    réduire le stress, améliorer votre sommeil ou atteindre vos objectifs, 
                    ce test vous offre des informations essentielles pour votre développement personnel.
                  </p>
                  <Button 
                    onClick={handleStartTest}
                    className="hypno-button"
                  >
                    Commencer le Test
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
        
        {appState === 'testing' && (
          <div className="py-12">
            <div className="container mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                Test de Réceptivité à l'Hypnose
              </h2>
              <TestForm onComplete={handleTestComplete} />
            </div>
          </div>
        )}
        
        {appState === 'completed' && (
          <div className="py-12">
            <div className="container mx-auto">
              <ThankYouMessage />
            </div>
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="py-6 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-500">
                &copy; {new Date().getFullYear()} HypnoKick. Tous droits réservés.
              </p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-sm text-gray-500 hover:text-hypno-primary">
                Politique de confidentialité
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-hypno-primary">
                Mentions légales
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-hypno-primary">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Make sure to import the Button component
import { Button } from '@/components/ui/button';

export default Index;
