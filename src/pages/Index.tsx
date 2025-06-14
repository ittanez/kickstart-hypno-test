
import { useState, useEffect } from "react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { scrollToTop } from "@/utils/scrollUtils";
import MainLayout from "@/components/layout/MainLayout";
import TestModeLayout from "@/components/layout/TestModeLayout";
import ThankYouLayout from "@/components/layout/ThankYouLayout";
import HomePage from "@/components/pages/HomePage";
import FloatingTestButton from "@/components/FloatingTestButton";

const Index = () => {
  const [showTest, setShowTest] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const { trackTestEvents, trackPageView } = useAnalytics();

  // Track page view
  useEffect(() => {
    trackPageView('/', 'HypnoKick - Test d\'Hypnotisabilité Gratuit');
  }, []);

  // Afficher le bouton flottant après avoir scrollé
  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingButton(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleStartTest = () => {
    trackTestEvents.clickCTA('hero_button');
    setShowTest(true);
    // Scroll vers le haut pour commencer le test
    setTimeout(() => scrollToTop(), 100);
  };

  const handleTestComplete = () => {
    setShowThankYou(true);
    setShowTest(false);
    // Scroll vers le haut pour voir les résultats
    setTimeout(() => scrollToTop(), 100);
  };

  const handleBackToHome = () => {
    setShowThankYou(false);
    setShowTest(false);
    // Scroll vers le haut pour retourner à l'accueil
    setTimeout(() => scrollToTop(), 100);
  };

  const handleFloatingButtonClick = () => {
    trackTestEvents.clickCTA('floating_button');
    setShowTest(true);
    setTimeout(() => scrollToTop(), 100);
  };

  // Page de remerciement
  if (showThankYou) {
    return <ThankYouLayout onBackToHome={handleBackToHome} />;
  }

  // Mode test
  if (showTest) {
    return <TestModeLayout onComplete={handleTestComplete} onBackToHome={handleBackToHome} />;
  }

  // Page d'accueil
  return (
    <MainLayout onLogoClick={handleBackToHome}>
      <HomePage onStartTest={handleStartTest} />
      
      {/* Bouton flottant pour commencer le test */}
      <FloatingTestButton 
        show={showFloatingButton && !showTest && !showThankYou}
        onClick={handleFloatingButtonClick}
      />
    </MainLayout>
  );
};

export default Index;
