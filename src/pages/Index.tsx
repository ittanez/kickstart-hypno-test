
import { useState, useEffect, lazy, Suspense } from "react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { scrollToTop } from "@/utils/scrollUtils";
import MainLayout from "@/components/layout/MainLayout";
import HomePage from "@/components/pages/HomePage";
import FloatingTestButton from "@/components/FloatingTestButton";

// Le mode test (TestForm + framer-motion) et la page de remerciement
// ne sont chargés qu'au moment où l'utilisateur en a besoin
const TestModeLayout = lazy(() => import("@/components/layout/TestModeLayout"));
const ThankYouLayout = lazy(() => import("@/components/layout/ThankYouLayout"));

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
    return (
      <Suspense fallback={null}>
        <ThankYouLayout onBackToHome={handleBackToHome} />
      </Suspense>
    );
  }

  // Mode test
  if (showTest) {
    return (
      <Suspense fallback={null}>
        <TestModeLayout onComplete={handleTestComplete} onBackToHome={handleBackToHome} />
      </Suspense>
    );
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
