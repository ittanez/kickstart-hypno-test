import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Cookie, X } from 'lucide-react';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà donné son consentement
    const consent = localStorage.getItem('hypno-cookie-consent');
    if (!consent) {
      // Afficher après 2 secondes pour ne pas gêner l'UX
      const timer = setTimeout(() => setShowConsent(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('hypno-cookie-consent', 'accepted');
    setShowConsent(false);
    
    // Activer GA4 après consentement
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted'
      });
    }
  };

  const handleDecline = () => {
    localStorage.setItem('hypno-cookie-consent', 'declined');
    setShowConsent(false);
    
    // Désactiver GA4
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied'
      });
    }
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 max-w-sm mx-auto">
      <Card className="border-hypno-accent/20 bg-white/95 backdrop-blur-sm shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cookie className="h-5 w-5 text-hypno-accent" />
              <CardTitle className="text-lg">Cookies & Analytics</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDecline}
              className="h-6 w-6 p-0"
              aria-label="Fermer le bandeau cookies"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription className="text-sm">
            Nous utilisons des cookies pour améliorer votre expérience et analyser l'utilisation de notre test d'hypnotisabilité.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex gap-2">
            <Button 
              onClick={handleAccept} 
              size="sm"
              className="flex-1 bg-hypno-accent hover:bg-hypno-primary text-white"
            >
              Accepter
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleDecline}
              className="flex-1"
            >
              Refuser
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            <a href="/privacy-policy" className="underline hover:text-hypno-accent">
              Politique de confidentialité
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CookieConsent;