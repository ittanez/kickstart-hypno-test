
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import TestForm from "@/components/TestForm";
import HeroSection from "@/components/HeroSection";
import StepsSection from "@/components/StepsSection";
import TestimonialSection from "@/components/TestimonialSection";
import FAQSection from "@/components/FAQSection";
import ThankYouMessage from "@/components/ThankYouMessage";
import HowItWorks from "@/components/HowItWorks";
import SEOSchema from "@/components/SEOSchema";
import NavMenu from "@/components/NavMenu";

const Index = () => {
  const [showTest, setShowTest] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const handleStartTest = () => {
    setShowTest(true);
  };

  const handleTestComplete = () => {
    setShowThankYou(true);
    setShowTest(false);
  };

  const handleBackToHome = () => {
    setShowThankYou(false);
    setShowTest(false);
  };

  if (showThankYou) {
    return <ThankYouMessage onBackToHome={handleBackToHome} />;
  }

  if (showTest) {
    return <TestForm onComplete={handleTestComplete} />;
  }

  return (
    <>
      <Helmet>
        <title>HypnoKick - Test de réceptivité à l'hypnose | Hypnothérapeute Paris</title>
        <meta name="description" content="Découvrez votre potentiel hypnotique avec notre test scientifique gratuit. Consultations d'hypnothérapie à Paris pour stress, anxiété, confiance en soi, sommeil et arrêt du tabac." />
      </Helmet>
      <SEOSchema />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <header className="w-full bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold text-hypno-primary">
              HypnoKick
            </div>
            <NavMenu />
          </div>
        </header>
        <HeroSection onStartTest={handleStartTest} />
        <StepsSection />
        <HowItWorks />
        <TestimonialSection />
        <FAQSection />
      </div>
    </>
  );
};

export default Index;
