
import React from 'react';
import { Helmet } from "react-helmet-async";
import HeroSection from '@/components/HeroSection';
import StepsSection from '@/components/StepsSection';
import TestimonialSection from '@/components/TestimonialSection';
import FAQSection from '@/components/FAQSection';
import HowItWorks from '@/components/HowItWorks';
import SEOSchema from '@/components/SEOSchema';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import ABTestDashboard from '@/components/ABTestDashboard';

type HomePageProps = {
  onStartTest: () => void;
};

const HomePage = ({ onStartTest }: HomePageProps) => {
  return (
    <>
      <Helmet>
        <title>Test Hypnotisabilité Gratuit Paris | Suis-je hypnotisable ? | HypnoKick</title>
        <meta name="description" content="✅ Test gratuit de réceptivité à l'hypnose par hypnothérapeute certifié à Paris. Découvrez si vous êtes hypnotisable en 2 minutes. Révélez votre potentiel hypnotique et vos canaux VAKOG dominants." />
        <meta name="keywords" content="test hypnotisabilité Paris, suis je hypnotisable, hypnothérapeute Paris, test réceptivité hypnose gratuit, hypnose Paris, révéler potentiel hypnotique" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Preload image LCP critique */}
        <link 
          rel="preload" 
          as="image" 
          href="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/hypnotisable.webp"
          fetchpriority="high"
          type="image/webp"
        />
        
        {/* CSS critique inline pour éviter le blocage */}
        <style>{`
          @font-face {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: url(https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2) format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
          }
          @font-face {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 600;
            font-display: swap;
            src: url(https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hiA.woff2) format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
          }
          @font-face {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 700;
            font-display: swap;
            src: url(https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDifAZ9hiA.woff2) format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
          }
        `}</style>
      </Helmet>
      <SEOSchema />
      
      {/* Hero Section */}
      <HeroSection onStartTest={onStartTest} />
      
      {/* Section SEO - Responsive */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-4xl">
          
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-hypno-primary">
              Test d'hypnotisabilité gratuit à Paris : Comment révéler votre potentiel hypnotique ?
            </h2>
            
            <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
              Vous vous demandez <strong>"suis-je hypnotisable ?"</strong> Notre hypnothérapeute certifié à Paris a développé ce test gratuit pour révéler votre potentiel hypnotique. 
              L'hypnotisabilité est un phénomène naturel que nous expérimentons tous quotidiennement.
            </p>

            <div className="bg-hypno-primary/10 p-4 sm:p-6 rounded-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                Signes que vous êtes probablement hypnotisable :
              </h3>
              <ul className="text-left space-y-2 text-sm sm:text-base">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Vous perdez la notion du temps en regardant un film captivant</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Vous vous plongez facilement dans un livre</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Vous rêvassez pendant les trajets en voiture</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Vous arrivez à visualiser des images dans votre esprit</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Vous vous laissez porter par la musique</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Grille responsive */}
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <div className="bg-green-50 p-4 sm:p-6 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-3 sm:mb-4 text-lg sm:text-xl">
                Facteurs favorables
              </h4>
              <ul className="text-green-700 space-y-2 text-sm sm:text-base">
                <li>• Capacité d'imagination développée</li>
                <li>• Facilité de concentration</li>
                <li>• Ouverture d'esprit</li>
                <li>• Confiance en soi</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 p-4 sm:p-6 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-3 sm:mb-4 text-lg sm:text-xl">
                Notre test évalue
              </h4>
              <ul className="text-blue-700 space-y-2 text-sm sm:text-base">
                <li>• Votre suggestibilité naturelle</li>
                <li>• Vos canaux sensoriels dominants</li>
                <li>• Votre profil hypnotique</li>
                <li>• Vos points forts pour l'hypnose</li>
              </ul>
            </div>
          </div>

          {/* Statistiques responsive */}
          <div className="bg-gray-50 p-6 sm:p-8 rounded-lg">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">
              Statistiques sur l'hypnotisabilité
            </h3>
            
            <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
              <div className="text-center bg-white p-4 rounded-lg">
                <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">20%</div>
                <div className="text-green-700 font-medium text-sm sm:text-base">Très réceptifs</div>
                <div className="text-xs sm:text-sm text-gray-600 mt-2">Entrent rapidement en transe</div>
              </div>
              
              <div className="text-center bg-white p-4 rounded-lg">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">50%</div>
                <div className="text-blue-700 font-medium text-sm sm:text-base">Réceptifs</div>
                <div className="text-xs sm:text-sm text-gray-600 mt-2">Réponse normale à l'hypnose</div>
              </div>
              
              <div className="text-center bg-white p-4 rounded-lg">
                <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-2">30%</div>
                <div className="text-orange-700 font-medium text-sm sm:text-base">Résistance initiale</div>
                <div className="text-xs sm:text-sm text-gray-600 mt-2">Nécessitent plus de temps</div>
              </div>
            </div>
            
            <p className="text-center text-gray-700 text-sm sm:text-base">
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
      <Footer />  

      {/* Cookie Consent */}
      <CookieConsent />
      
      {/* A/B Test Dashboard (Dev mode only) */}
      <ABTestDashboard />
    </>
  );
};

export default HomePage;
