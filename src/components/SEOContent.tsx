// src/components/SEOContent.tsx
const SEOContent = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        
        {/* Section principale SEO */}
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
  );
};
