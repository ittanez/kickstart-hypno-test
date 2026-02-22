
-- Créer la table pour stocker les résultats du quiz Aqua Libre
CREATE TABLE public.quizaqualibre (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  prenom TEXT NOT NULL,
  email TEXT NOT NULL,
  reponses JSONB NOT NULL,
  score_total INTEGER NOT NULL,
  niveau_aquaphobie TEXT NOT NULL,
  message_resultat TEXT NOT NULL,
  sessions_recommandees TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Ajouter Row Level Security (RLS)
ALTER TABLE public.quizaqualibre ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre l'insertion (accessible à tous pour le quiz public)
CREATE POLICY "Allow public insert on quizaqualibre"
  ON public.quizaqualibre
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Politique pour permettre la lecture (seulement pour les administrateurs)
CREATE POLICY "Allow admin read on quizaqualibre"
  ON public.quizaqualibre
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE admin_users.user_id = auth.uid()
    )
  );

-- Trigger pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_quizaqualibre_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_quizaqualibre_updated_at_trigger
  BEFORE UPDATE ON public.quizaqualibre
  FOR EACH ROW
  EXECUTE FUNCTION update_quizaqualibre_updated_at();
