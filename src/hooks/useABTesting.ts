import { useState, useEffect } from 'react';
import { useAnalytics } from './useAnalytics';

// Types pour les variants
export type ABVariant = 'A' | 'B';

export type ABTestConfig = {
  testName: string;
  variants: {
    A: any;
    B: any;
  };
  trafficSplit?: number; // Pourcentage pour variant B (default: 50%)
};

// Configuration des tests A/B
export const AB_TESTS = {
  heroTitle: {
    testName: 'hero_title',
    variants: {
      A: "Suis-je hypnotisable ?",
      B: "Découvrez votre potentiel hypnotique"
    },
    trafficSplit: 50
  },
  ctaText: {
    testName: 'cta_text', 
    variants: {
      A: "Test Gratuit",
      B: "Commencer le Test"
    },
    trafficSplit: 50
  },
  testDescription: {
    testName: 'test_description',
    variants: {
      A: "Test de 30 questions pour évaluer votre réceptivité",
      B: "Test de 2 minutes pour révéler vos capacités hypnotiques"
    },
    trafficSplit: 50
  },
  urgencyMessage: {
    testName: 'urgency_message',
    variants: {
      A: null, // Pas de message d'urgence
      B: "🔥 Plus de 1000 personnes ont déjà découvert leur profil cette semaine"
    },
    trafficSplit: 30 // Test plus conservateur
  }
} as const;

export const useABTesting = () => {
  const { trackEvent } = useAnalytics();
  const [userVariants, setUserVariants] = useState<Record<string, ABVariant>>({});

  // Générer un ID utilisateur stable
  const getUserId = (): string => {
    let userId = localStorage.getItem('hypno-user-id');
    if (!userId) {
      userId = 'user_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
      localStorage.setItem('hypno-user-id', userId);
    }
    return userId;
  };

  // Fonction de hachage simple pour assigner les variants de façon stable
  const hashUserId = (userId: string, testName: string): number => {
    let hash = 0;
    const str = userId + testName;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  };

  // Assigner un variant pour un test donné
  const getVariant = (testConfig: ABTestConfig): ABVariant => {
    const userId = getUserId();
    const { testName, trafficSplit = 50 } = testConfig;

    // Vérifier si l'utilisateur a déjà un variant assigné
    const savedVariants = localStorage.getItem('hypno-ab-variants');
    if (savedVariants) {
      const variants = JSON.parse(savedVariants);
      if (variants[testName]) {
        return variants[testName];
      }
    }

    // Assigner un nouveau variant basé sur le hash de l'userId
    const hash = hashUserId(userId, testName);
    const isVariantB = (hash % 100) < trafficSplit;
    const variant: ABVariant = isVariantB ? 'B' : 'A';

    // Sauvegarder le variant
    const existingVariants = savedVariants ? JSON.parse(savedVariants) : {};
    const updatedVariants = { ...existingVariants, [testName]: variant };
    localStorage.setItem('hypno-ab-variants', JSON.stringify(updatedVariants));

    // Tracker l'assignation
    trackEvent('ab_test_assigned', {
      test_name: testName,
      variant: variant,
      user_id: userId
    });

    return variant;
  };

  // Hook pour obtenir la valeur d'un test A/B
  const useABTest = <T>(testConfig: ABTestConfig): T => {
    const variant = getVariant(testConfig);
    return testConfig.variants[variant] as T;
  };

  // Tracker les conversions par variant
  const trackABConversion = (testName: string, conversionType: string, value?: number) => {
    const savedVariants = localStorage.getItem('hypno-ab-variants');
    if (savedVariants) {
      const variants = JSON.parse(savedVariants);
      const variant = variants[testName];
      
      if (variant) {
        trackEvent('ab_test_conversion', {
          test_name: testName,
          variant: variant,
          conversion_type: conversionType,
          value: value || 1
        });
      }
    }
  };

  // Initialiser les variants au montage
  useEffect(() => {
    const variants: Record<string, ABVariant> = {};
    
    Object.values(AB_TESTS).forEach(testConfig => {
      variants[testConfig.testName] = getVariant(testConfig);
    });
    
    setUserVariants(variants);
  }, []);

  return {
    useABTest,
    trackABConversion,
    getUserId,
    userVariants
  };
};