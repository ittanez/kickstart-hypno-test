
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

type EmailStepProps = {
  email: string;
  gdprConsent: boolean;
  isSubmitting: boolean;
  error: string | null;
  onEmailChange: (email: string) => void;
  onGdprChange: (checked: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export const EmailStep = ({
  email,
  gdprConsent,
  isSubmitting,
  error,
  onEmailChange,
  onGdprChange,
  onSubmit,
}: EmailStepProps) => {
  return (
    <form onSubmit={onSubmit} className="hypno-card animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-center">Recevez vos résultats</h2>
      
      <p className="text-gray-600 mb-6 text-center">
        Merci d'avoir complété le test ! Pour recevoir votre score et une analyse personnalisée, 
        veuillez entrer votre adresse email ci-dessous.
      </p>
      
      <div className="mb-6">
        <Label htmlFor="email" className="block mb-2">
          Adresse email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="votre@email.com"
          className="hypno-input"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          required
        />
      </div>
      
      <div className="flex items-start mb-8">
        <Checkbox
          id="gdpr"
          checked={gdprConsent}
          onCheckedChange={(checked) => onGdprChange(checked === true)}
          className="mt-1"
        />
        <Label 
          htmlFor="gdpr" 
          className="ml-2 text-gray-600 text-sm cursor-pointer"
        >
          J'accepte de recevoir mes résultats par email et je confirme avoir pris connaissance de la{" "}
          <a href="#" className="text-hypno-primary hover:underline">
            politique de confidentialité
          </a>
          .
        </Label>
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded mb-6">
          {error}
        </div>
      )}
      
      <div className="flex justify-center">
        <Button
          type="submit"
          className="hypno-button w-full md:w-auto"
          disabled={isSubmitting}
        >
          {isSubmitting ? "En cours..." : "Voir mes résultats"}
        </Button>
      </div>
    </form>
  );
};
