
import React from 'react';

const SEOSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "NovaHypnose - Hypnothérapie à Paris",
    "description": "Cabinet d'hypnothérapie à Paris proposant des séances pour stress, anxiété, confiance en soi, sommeil et addictions. Test gratuit de réceptivité à l'hypnose.",
    "url": "https://novahypnose.fr/",
    "image": "https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/hypnotisable.webp",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Paris 4ème - Bastille",
      "addressLocality": "Paris",
      "postalCode": "75004",
      "addressRegion": "Île-de-France",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "48.8533",
      "longitude": "2.3699"
    },
    "telephone": "+33649358089",
    "email": "contact@novahypnose.fr",
    "priceRange": "€€",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "20:00"
    },
    "sameAs": [
      "https://www.instagram.com/novahypnose/",
      "https://novahypnose.fr/",
      "https://play.google.com/store/apps/details?id=com.novahypnose.novarespire"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services d'hypnothérapie",
      "itemListElement": {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Test de réceptivité à l'hypnose",
          "description": "Test gratuit en 30 questions pour découvrir votre potentiel hypnotique et vos canaux sensoriels VAKOG",
          "url": "https://hypnokick.novahypnose.fr/"
        },
        "price": "0",
        "priceCurrency": "EUR"
      }
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
