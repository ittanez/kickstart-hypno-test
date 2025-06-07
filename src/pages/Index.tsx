 // src/pages/Index.tsx - Version corrigée et simplifiée
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
        <title>Suis-je hypnotisable ? Test gratuit de réceptivité à l'hypnose | HypnoKick Paris</title>
        <meta name="description" content="Découvrez si vous êtes hypnotisable avec notre test scientifique gratuit en 30 questions. Évaluez votre réceptivité à l'hypnose et vos canaux sensoriels dominants. Hypnothérapeute Paris." />
        <meta name="keywords" content="suis je hypnotisable, test réceptivité hypnose, hypnotisable, réceptif hypnose, test hypnose gratuit, hypnothérapeute Paris" />
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
        
        {/* Section SEO ajoutée APRÈS HeroSection */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-4xl">
            
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-6 text-hypno-primary">
                Comment savoir si vous êtes hypnotisable ?
              </h2>
              
              <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
                La question "suis-je hypnotisable ?" est l'une des plus fréquentes en hypnothérapie. 
                La bonne nouvelle ? L'hypnotisabilité est un phénomène naturel que nous expérimentons tous quotidiennement.
              </p>

              <div className="bg-hypno-primary/10 p-6 rounded-lg mb-8 max-w-2xl mx-auto">
                <h3 className="text-xl font-semibold mb-4">Signes que vous êtes probablement hypnotisable :</h3>
                <ul className="text-left space-y-2">
                  <li>✓ Vous perdez la notion du temps en regardant un film captivant</li>
                  <li>✓ Vous vous plongez facilement dans un livre</li>
                  <li>✓ Vous rêvassez pendant les trajets en voiture</li>
                  <li>✓ Vous arrivez à visualiser des images dans votre esprit</li>
                  <li>✓ Vous vous laissez porter par la musique</li>
                </ul>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-4 text-xl">Facteurs favorables</h4>
                <ul className="text-green-700 space-y-2">
                  <li>• Capacité d'imagination développée</li>
                  <li>• Facilité de concentration</li>
                  <li>• Ouverture d'esprit</li>
                  <li>• Confiance en soi</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-4 text-xl">Notre test évalue</h4>
                <ul className="text-blue-700 space-y-2">
                  <li>• Votre suggestibilité naturelle</li>
                  <li>• Vos canaux sensoriels dominants</li>
                  <li>• Votre profil hypnotique</li>
                  <li>• Vos points forts pour l'hypnose</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-6 text-center">Statistiques sur l'hypnotisabilité</h3>
              
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="text-center bg-white p-4 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 mb-2">20%</div>
                  <div className="text-green-700 font-medium">Très réceptifs</div>
                  <div className="text-sm text-gray-600 mt-2">Entrent rapidement en transe</div>
                </div>
                
                <div className="text-center bg-white p-4 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">50%</div>
                  <div className="text-blue-700 font-medium">Réceptifs</div>
                  <div className="text-sm text-gray-600 mt-2">Réponse normale à l'hypnose</div>
                </div>
                
                <div className="text-center bg-white p-4 rounded-lg">
                  <div className="text-3xl font-bold text-orange-600 mb-2">30%</div>
                  <div className="text-orange-700 font-medium">Résistance initiale</div>
                  <div className="text-sm text-gray-600 mt-2">Nécessitent plus de temps</div>
                </div>
              </div>
              
              <p className="text-center text-gray-700">
                <strong>Bonne nouvelle :</strong> Même avec une résistance initiale, 
                l'hypnose reste efficace avec la bonne approche !
              </p>
            </div>
          </div>
        </section>
        
        <StepsSection />
        <HowItWorks />
        <TestimonialSection />
        <FAQSection />
      </div>
    </>
  );
};

export default Index;
