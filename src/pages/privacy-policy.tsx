
import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Politique de Confidentialité</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Collecte des données personnelles</h2>
        <p className="mb-4">Nova Hypnose collecte les données suivantes :</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Adresse email</li>
          <li>Réponses au test de réceptivité à l'hypnose</li>
          <li>Score et résultats du test</li>
          <li>Canal sensoriel dominant (VAKOG)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Utilisation des données</h2>
        <p className="mb-4">Vos données sont utilisées pour :</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Calculer et vous envoyer vos résultats du test</li>
          <li>Améliorer nos services et notre compréhension des profils de réceptivité</li>
          <li>Vous contacter si vous avez donné votre consentement</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Conservation des données</h2>
        <p className="mb-4">
          Vos données sont conservées pendant une durée de 3 ans à compter de votre dernier contact avec nous.
          Après cette période, elles sont anonymisées ou supprimées.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Vos droits</h2>
        <p className="mb-4">Conformément au RGPD, vous disposez des droits suivants :</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Droit d'accès à vos données</li>
          <li>Droit de rectification</li>
          <li>Droit à l'effacement</li>
          <li>Droit à la limitation du traitement</li>
          <li>Droit à la portabilité des données</li>
          <li>Droit d'opposition</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Cookies</h2>
        <p className="mb-4">
          Notre site utilise uniquement des cookies techniques essentiels au fonctionnement du site.
          Aucun cookie publicitaire ou de traçage n'est utilisé.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Sécurité</h2>
        <p className="mb-4">
          Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données,
          notamment le chiffrement des données et l'utilisation de connexions sécurisées.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. Partage des données</h2>
        <p className="mb-4">
          Vos données ne sont jamais vendues à des tiers.
          Elles peuvent être partagées uniquement avec nos sous-traitants techniques
          (hébergeur, service d'envoi d'emails) qui agissent selon nos instructions.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">8. Contact</h2>
        <p className="mb-4">
          Pour exercer vos droits ou pour toute question concernant vos données personnelles,
          contactez-nous à : contact@novahypnose.fr
        </p>
        <p>
          Nova Hypnose<br />
          Alain Zenatti<br />
          Paris, France
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
