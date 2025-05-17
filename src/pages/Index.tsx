
import React, { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import StepsSection from '@/components/StepsSection';
import FAQSection from '@/components/FAQSection';
import TestimonialSection from '@/components/TestimonialSection';
import TestForm from '@/components/TestForm';
import ThankYouMessage from '@/components/ThankYouMessage';
import NavMenu from '@/components/NavMenu';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';

type AppState = 'landing' | 'testing' | 'completed';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('landing');
  
  const handleStartTest = () => {
    setAppState('testing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleTestComplete = () => {
    setAppState('completed');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>HypnoKick - Test de réceptivité à l'hypnose | Hypnothérapeute Paris</title>
        <meta name="description" content="Découvrez votre potentiel hypnotique avec notre test scientifique gratuit. Hypnothérapie Paris pour stress, confiance en soi, sommeil, addictions. Cabinet d'hypnose à Paris." />
        <meta name="keywords" content="hypnothérapeute Paris, hypnose Paris, hypnothérapie Paris, séance hypnose Paris, cabinet hypnose Paris, hypnose confiance en soi Paris, hypnose stress Paris, hypnose anxiété Paris, hypnose arrêt tabac Paris" />
        <meta property="og:title" content="HypnoKick - Test de réceptivité à l'hypnose | Hypnothérapeute Paris" />
        <meta property="og:description" content="Découvrez votre potentiel hypnotique avec notre test scientifique gratuit. Consultations d'hypnose à Paris pour stress, confiance en soi et bien-être." />
        <link rel="canonical" href="https://hypnokick.fr/" />
      </Helmet>
      
      <header className="py-4 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold">
              <span className="text-hypno-primary">Hypno</span>
              <span className="text-hypno-accent">Kick</span>
            </Link>
            <div className="hidden md:flex">
              <NavMenu />
            </div>
            {appState === 'landing' && (
              <button 
                onClick={handleStartTest}
                className="md:hidden text-hypno-primary hover:text-hypno-accent font-medium"
              >
                Démarrer le test
              </button>
            )}
          </div>
          <div className="md:hidden mt-4">
            <NavMenu />
          </div>
        </div>
      </header>
      
      <main className="flex-grow">
        {appState === 'landing' && (
          <>
            <HeroSection onStartTest={handleStartTest} />
            <StepsSection />
            <FAQSection />
            <TestimonialSection />
            <div className="py-16 bg-white">
              <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                  <h2 className="text-3xl font-bold mb-6">Prêt à découvrir votre potentiel hypnotique à Paris ?</h2>
                  <Button 
                    onClick={handleStartTest}
                    className="hypno-button text-lg px-8 py-6 mb-4"
                  >
                    RÉVÉLEZ VOTRE PROFIL MAINTENANT
                  </Button>
                  <p className="text-gray-600">Seulement 2 minutes • Résultats instantanés • 100% gratuit</p>
                  <p className="mt-8 text-gray-700">Déjà plusieurs centaines de personnes à Paris ont découvert leur potentiel hypnotique !</p>
                  <p className="mt-4 text-hypno-primary font-medium">À très vite pour vos résultats !</p>
                  <p className="text-gray-600">L'équipe HypnoKick - Votre hypnothérapeute à Paris</p>
                </div>
              </div>
            </div>
          </>
        )}
        
        {appState === 'testing' && (
          <div className="py-12">
            <div className="container mx-auto">
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
      
      <footer className="py-6 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} HypnoKick | Hypnothérapeute Paris. Tous droits réservés.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://novahypnose.fr/mentions-legales/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 hover:text-hypno-primary"
              >
                Mentions légales
              </a>
              <a 
                href="/privacy-policy"
                className="text-sm text-gray-500 hover:text-hypno-primary"
              >
                Politique de confidentialité
              </a>
              <a 
                href="mailto:contact@novahypnose.fr"
                className="text-sm text-gray-500 hover:text-hypno-primary"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
