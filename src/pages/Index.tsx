
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
