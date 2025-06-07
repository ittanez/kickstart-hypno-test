// src/components/HeroSectionSEO.tsx
import { Button } from "@/components/ui/button";

type HeroSectionSEOProps = {
  onStartTest: () => void;
};

const HeroSectionSEO = ({ onStartTest }: HeroSectionSEOProps) => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="hypno-gradient">Suis-je hypnotisable ?</span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
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

        <Button 
          onClick={onStartTest}
          className="hypno-button text-lg px-8 py-4"
        >
          🧠 Tester ma réceptivité maintenant
        </Button>
        
        <p className="text-sm text-gray-500 mt-4">
          Test gratuit • 30 questions • Résultats immédiats
        </p>
      </div>
    </section>
  );
};
