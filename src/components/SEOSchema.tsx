
import React from 'react';

const SEOSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "HypnoKick - Test de réceptivité à l'hypnose",
    "url": "https://hypnokick.novahypnose.fr/",
    "potentialAction": {
      "@type": "PerformAction",
      "name": "Test d'hypnose gratuit"
    },
    "mainEntity": {
      "@type": "ProfessionalService",
      "name": "HypnoKick - Hypnothérapie à Paris",
      "description": "Cabinet d'hypnothérapie à Paris proposant des séances pour stress, anxiété, confiance en soi, sommeil et addictions.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Paris",
        "addressRegion": "Île-de-France",
        "addressCountry": "FR"
      },
      "telephone": "+33(0)612345678",
      "priceRange": "€€",
      "sameAs": [
        "https://www.instagram.com/novahypnose/",
        "https://novahypnose.fr/"
      ]
    },
    "offers": {
      "@type": "Offer",
      "name": "Test de réceptivité à l'hypnose",
      "description": "Test gratuit pour découvrir votre potentiel hypnotique",
      "price": "0",
      "priceCurrency": "EUR"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default SEOSchema;
