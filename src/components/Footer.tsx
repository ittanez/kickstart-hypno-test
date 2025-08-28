import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Instagram, Calendar } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-hypno-primary to-hypno-accent text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* À propos de HypnoKick */}
          <div>
            <h3 className="text-xl font-bold mb-4">À propos de HypnoKick</h3>
            <p className="text-white/90 mb-4 leading-relaxed">
              Plateforme de test de réceptivité à l'hypnose développée par NovaHypnose. 
              Découvrez votre potentiel hypnotique avec notre test scientifique gratuit 
              et explorez vos canaux sensoriels dominants.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/novahypnose" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white/70 transition-colors"
                aria-label="Suivez NovaHypnose sur Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Navigation rapide */}
          <div>
            <h3 className="text-xl font-bold mb-4">Navigation rapide</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#test" 
                  className="text-white/90 hover:text-white transition-colors"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  Test de réceptivité gratuit
                </a>
              </li>
              <li>
                <a 
                  href="https://novahypnose.fr/#about" 
                  target="_blank"
                  className="text-white/90 hover:text-white transition-colors"
                >
                  À propos de l'hypnothérapeute
                </a>
              </li>
              <li>
                <a 
                  href="https://novahypnose.fr/#applications" 
                  target="_blank"
                  className="text-white/90 hover:text-white transition-colors"
                >
                  Applications de l'hypnose
                </a>
              </li>
              <li>
                <a 
                  href="https://novahypnose.fr/#self-hypnosis" 
                  target="_blank"
                  className="text-white/90 hover:text-white transition-colors"
                >
                  Auto-hypnose
                </a>
              </li>
              <li>
                <a 
                  href="https://novahypnose.fr/#pricing" 
                  target="_blank"
                  className="text-white/90 hover:text-white transition-colors"
                >
                  Tarifs des séances
                </a>
              </li>
              <li>
                <a 
                  href="https://novahypnose.fr/#faq" 
                  target="_blank"
                  className="text-white/90 hover:text-white transition-colors"
                >
                  FAQ Hypnose
                </a>
              </li>
              <li>
                <a 
                  href="https://play.google.com/store/apps/details?id=com.novahypnose.novarespire&pcampaignid=web_share" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
                  title="Télécharger NovaRespire sur Google Play"
                >
                  <img 
                    src="/google-play-badge.svg" 
                    alt="Google Play Badge" 
                    className="h-5 w-auto opacity-90"
                  />
                  NovaRespire - App respiration
                </a>
              </li>
            </ul>
          </div>

          {/* Contact et RDV */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact & Rendez-vous</h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-white/80" />
                <div>
                  <p className="text-white/90">Paris 4ème - Bastille</p>
                  <p className="text-sm text-white/70">Métro Bastille, Saint-Paul</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-white/80" />
                <a 
                  href="tel:0649358089" 
                  className="text-white/90 hover:text-white transition-colors"
                >
                  06 49 35 80 89
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-white/80" />
                <a 
                  href="mailto:contact@novahypnose.fr" 
                  className="text-white/90 hover:text-white transition-colors"
                >
                  contact@novahypnose.fr
                </a>
              </div>
            </div>
            
            <Button 
              asChild
              className="bg-white text-hypno-primary hover:bg-white/90 font-medium"
            >
              <a 
                href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris" 
                target="_blank"
                rel="noopener noreferrer"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Prendre rendez-vous
              </a>
            </Button>
          </div>
        </div>

        {/* Séparateur */}
        <div className="border-t border-white/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-white/80">
              © 2025 HypnoKick par <a 
                href="https://novahypnose.fr" 
                target="_blank" 
                className="hover:text-white transition-colors font-medium"
              >
                NovaHypnose
              </a> - Tous droits réservés
            </div>
            
            <div className="flex space-x-6 text-sm">
              <a 
                href="/privacy-policy" 
                className="text-white/80 hover:text-white transition-colors"
              >
                Politique de confidentialité
              </a>
              <a 
                href="https://novahypnose.fr/mentions-legales" 
                target="_blank"
                className="text-white/80 hover:text-white transition-colors"
              >
                Mentions légales
              </a>
              <a 
                href="https://emergences.novahypnose.fr/" 
                target="_blank"
                className="text-white/80 hover:text-white transition-colors"
              >
                Blog Hypnose
              </a>
            </div>
          </div>
        </div>

        {/* Section SEO supplémentaire */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="text-center">
            <p className="text-sm text-white/70 leading-relaxed">
              <strong>HypnoKick</strong> - Test gratuit pour savoir si vous êtes hypnotisable. 
              Évaluez votre réceptivité à l'hypnose, découvrez vos canaux sensoriels dominants (VAKOG) 
              et explorez votre potentiel hypnotique en quelques minutes. 
              Complétez votre parcours bien-être avec <strong>NovaRespire</strong>, notre application mobile 
              de techniques de respiration et méditation guidée pour la gestion du stress et l'anxiété. 
              Hypnothérapie à Paris avec NovaHypnose.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
