// src/pages/Index.tsx - Version corrigée
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import TestForm from "@/components/TestForm";
import HeroSection from "@/components/HeroSection"; // Gardons l'existant
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
            "name": "Test de réceptivité à l'hypnose - Suis-je hypnotisable ?",
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
        
        {/* Section ajoutée pour le contenu SEO */}
        <section className="py-8 px-4 bg-white/50">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="hypno-gradient">Suis-je hypnotisable ?</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
              Découvrez votre réceptivité à l'hypnose avec notre test scientifique gratuit. 
              En 5 minutes, évaluez votre potentiel hypnotique et identifiez vos canaux sensoriels dominants.
            </p>

            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 mb-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold mb-4 text-hypno-primary">
                Êtes-vous réceptif à l'hypnose ?
              </h2>
              <p className="text-gray-700 mb-4">
                Contrairement aux idées reçues, <strong>tout le monde est hypnotisable</strong>, mais à des degrés différents :
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="bg-green-50 p-3 rounded">
                  <div className="font-bold text-green-700">20%</div>
                  <div className="text-green-600">Très réceptifs</div>
                </div>
                <div className="bg-blue-50 p-3 rounded">
                  <div className="font-bold text-blue-700">50%</div>
                  <div className="text-blue-600">Réceptifs</div>
                </div>
                <div className="bg-orange-50 p-3 rounded">
                  <div className="font-bold text-orange-700">30%</div>
                  <div className="text-orange-600">Résistance initiale</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <HeroSection onStartTest={handleStartTest} />
        
        {/* Nouveau contenu SEO ajouté */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-4xl">
            <div className="prose max-w-none mb-12">
              <h2 className="text-3xl font-bold mb-6 text-hypno-primary">
                Comment savoir si vous êtes hypnotisable ?
              </h2>
              
              <p className="text-lg text-gray-700 mb-6">
                La question "suis-je hypnotisable ?" est l'une des plus fréquentes en hypnothérapie. 
                La bonne nouvelle ? L'hypnotisabilité est un phénomène naturel que nous expérimentons tous quotidiennement.
              </p>

              <div className="bg-hypno-primary/10 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-semibold mb-4">Signes que vous êtes probablement hypnotisable :</h3>
                <ul className="space-y-2">
                  <li>✓ Vous perdez la notion du temps en regardant un film captivant</li>
                  <li>✓ Vous vous plongez facilement dans un livre</li>
                  <li>✓ Vous rêvassez pendant les trajets en voiture</li>
                  <li>✓ Vous arrivez à visualiser des images dans votre esprit</li>
                  <li>✓ Vous vous laissez porter par la musique</li>
                </ul>
              </div>

              <h3 className="text-2xl font-bold mb-4">Les facteurs qui influencent votre réceptivité</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Facteurs favorables</h4>
                  <ul className="text-green-700 space-y-1">
                    <li>• Capacité d'imagination développée</li>
                    <li>• Facilité de concentration</li>
                    <li>• Ouverture d'esprit</li>
                    <li>• Confiance en soi</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Facteurs temporaires</h4>
                  <ul className="text-blue-700 space-y-1">
                    <li>• Niveau de stress du moment</li>
                    <li>• Environnement de la séance</li>
                    <li>• État de fatigue</li>
                    <li>• Expérience avec l'hypnose</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-4">Notre test de réceptivité à l'hypnose</h3>
              
              <p className="mb-4">
                Notre évaluation HypnoKick combine deux approches scientifiques :
              </p>
              
              <div className="bg-white border-l-4 border-hypno-accent p-4 mb-6">
                <strong>1. Test de suggestibilité (20 questions)</strong><br/>
                Évalue votre capacité à répondre aux suggestions hypnotiques
              </div>
              
              <div className="bg-white border-l-4 border-hypno-secondary p-4 mb-6">
                <strong>2. Analyse VAKOG (10 questions)</strong><br/>
                Identifie vos canaux sensoriels dominants (Visuel, Auditif, Kinesthésique, Olfactif, Gustatif)
              </div>
            </div>

            {/* FAQ optimisée SEO */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-6 text-center">Questions fréquentes sur l'hypnotisabilité</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-lg mb-2">Tout le monde peut-il être hypnotisé ?</h4>
                  <p className="text-gray-700">
                    Oui, l'hypnose est un état naturel. Cependant, le degré de réceptivité varie selon les personnes. 
                    Même les plus résistants peuvent apprendre à entrer en transe avec la bonne approche.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-lg mb-2">Comment améliorer ma réceptivité à l'hypnose ?</h4>
                  <p className="text-gray-700">
                    La pratique de la méditation, la relaxation progressive et les exercices de visualisation 
                    développent naturellement votre capacité hypnotique.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-lg mb-2">Le test est-il vraiment fiable ?</h4>
                  <p className="text-gray-700">
                    Notre test combine des méthodes validées scientifiquement. Il vous donne une excellente 
                    indication de votre profil hypnotique, bien que l'expérience en cabinet reste unique.
                  </p>
                </div>
              </div>
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
