
-- Créer la table pour collecter les réponses au quiz de prise de parole
CREATE TABLE public.quiz_prise_parole_responses (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL,
  prenom text NOT NULL,
  nom text,
  reponses jsonb NOT NULL,
  score_total integer NOT NULL,
  niveau_peur text NOT NULL,
  message_resultat text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Ajouter Row Level Security (RLS)
ALTER TABLE public.quiz_prise_parole_responses ENABLE ROW LEVEL SECURITY;

-- Créer une politique pour permettre à tous de voir les données (public)
CREATE POLICY "Tout le monde peut voir les réponses quiz prise parole"
  ON public.quiz_prise_parole_responses
  FOR SELECT
  USING (true);

-- Créer une politique pour permettre à tous d'insérer des données
CREATE POLICY "Tout le monde peut créer des réponses quiz prise parole"
  ON public.quiz_prise_parole_responses
  FOR INSERT
  WITH CHECK (true);

-- Trigger pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_quiz_prise_parole_responses_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_quiz_prise_parole_responses_updated_at
  BEFORE UPDATE ON public.quiz_prise_parole_responses
  FOR EACH ROW
  EXECUTE PROCEDURE update_quiz_prise_parole_responses_updated_at();
