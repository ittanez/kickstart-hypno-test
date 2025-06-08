import { useEffect } from 'react';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Configuration GA4
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID || 'G-XXXXXXXXXX';

export const useAnalytics = () => {
  useEffect(() => {
    // Charger le script GA4 uniquement en production, de façon différée
    if (typeof window !== 'undefined' && !window.gtag && import.meta.env.PROD) {
      // Délai pour ne pas bloquer le LCP
      const loadGA4 = () => {
        // Initialiser dataLayer
        window.dataLayer = window.dataLayer || [];
        window.gtag = function gtag() {
          window.dataLayer.push(arguments);
        };

        // Configuration initiale
        window.gtag('js', new Date());
        window.gtag('config', GA_MEASUREMENT_ID, {
          page_title: document.title,
          page_location: window.location.href,
        });

        // Charger le script GA4 de façon asynchrone
        const script = document.createElement('script');
        script.async = true;
        script.defer = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        document.head.appendChild(script);
      };

      // Charger après le LCP ou après 3 secondes
      if (document.readyState === 'complete') {
        setTimeout(loadGA4, 1000);
      } else {
        window.addEventListener('load', () => setTimeout(loadGA4, 1000));
      }
    }
  }, []);

  // Fonction pour tracker les événements
  const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
    if (window.gtag && import.meta.env.PROD) {
      window.gtag('event', eventName, {
        event_category: 'HypnoKick',
        event_label: parameters?.label || '',
        value: parameters?.value || 0,
        ...parameters,
      });
    } else if (import.meta.env.DEV) {
      console.log('📊 Analytics Event:', eventName, parameters);
    }
  };

  // Fonction pour tracker les pages
  const trackPageView = (pagePath: string, pageTitle?: string) => {
    if (window.gtag && import.meta.env.PROD) {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: pagePath,
        page_title: pageTitle || document.title,
      });
    } else if (import.meta.env.DEV) {
      console.log('📊 Page View:', pagePath, pageTitle);
    }
  };

  // Événements spécifiques au test d'hypnotisabilité
  const trackTestEvents = {
    // Démarrage du test
    startTest: () => trackEvent('test_started', { 
      event_category: 'Test Journey',
      step: 'start'
    }),

    // Progression dans les questions
    answerQuestion: (questionIndex: number, answer: number) => trackEvent('question_answered', {
      event_category: 'Test Journey',
      step: 'questions',
      question_index: questionIndex,
      answer_value: answer
    }),

    // Complétion section questions
    completeQuestions: (totalAnswers: number) => trackEvent('questions_completed', {
      event_category: 'Test Journey', 
      step: 'questions_done',
      total_answers: totalAnswers
    }),

    // Section VAKOG
    startVAKOG: () => trackEvent('vakog_started', {
      event_category: 'Test Journey',
      step: 'vakog'
    }),

    completeVAKOG: (dominantSense: string) => trackEvent('vakog_completed', {
      event_category: 'Test Journey',
      step: 'vakog_done',
      dominant_sense: dominantSense
    }),

    // Email et soumission
    startEmail: () => trackEvent('email_step_started', {
      event_category: 'Test Journey',
      step: 'email'
    }),

    submitTest: (score: number, category: string) => trackEvent('test_submitted', {
      event_category: 'Test Journey',
      step: 'completed',
      hypno_score: score,
      hypno_category: category,
      value: score
    }),

    // Abandon
    testAbandoned: (step: string, questionIndex?: number) => trackEvent('test_abandoned', {
      event_category: 'Test Journey',
      step: 'abandoned',
      abandon_step: step,
      question_index: questionIndex || 0
    }),

    // Interactions
    clickCTA: (ctaLocation: string) => trackEvent('cta_clicked', {
      event_category: 'User Interaction',
      cta_location: ctaLocation
    }),

    // Erreurs
    testError: (errorType: string, errorMessage: string) => trackEvent('test_error', {
      event_category: 'Errors',
      error_type: errorType,
      error_message: errorMessage
    })
  };

  return {
    trackEvent,
    trackPageView,
    trackTestEvents
  };
};