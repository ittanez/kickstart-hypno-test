// src/pages/Index.tsx (version optimisée)
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import TestForm from "@/components/TestForm";
import HeroSectionSEO from "@/components/HeroSectionSEO"; // Nouveau composant
import SEOContent from "@/components/SEOContent"; // Nouveau composant
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
        <title>Suis-je hypnotisable ? Test gratuit de réceptivité à l'hypnose | HypnoKick Paris</title>
        <meta name="description" content="Découvrez si vous êtes hypnotisable avec notre test scientifique gratuit en 30 questions. Évaluez votre réceptivité à l'hypnose et vos canaux sensoriels dominants. Hypnothérapeute Paris." />
        <meta name="keywords" content="suis je hypnotisable, test réceptivité hypnose, hypnotisable, réceptif hypnose, test hypnose gratuit, hypnothérapeute Paris" />
        
        {/* Schema markup pour le test */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Quiz",
            "name": "Test de réceptivité à l'hypnose",
            "description": "Découvrez si vous êtes hypnotisable avec notre test scientifique gratuit",
            "author": {
              "@type": "Organization",
              "name": "HypnoKick",
              "url": "https://hypnokick.novahypnose.fr"
            },
            "typicalAgeRange": "18-",
            "educationalLevel": "Adulte",
            "timeRequired": "PT5M",
            "quiz": {
              "@type": "Quiz",
              "about": "Réceptivité à l'hypnose"
            }
          })}
        </script>
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
        <HeroSectionSEO onStartTest={handleStartTest} />
        <SEOContent />
        <StepsSection />
        <HowItWorks />
        <TestimonialSection />
        <FAQSection />
      </div>
    </>
  );
};
