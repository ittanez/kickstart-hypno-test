-- Sécurité : la table quiz_prise_parole_responses était lisible par tous
-- (SELECT USING (true)), exposant emails, prénoms et noms des participants.
-- On restreint la lecture aux admins ; l'insertion publique reste possible.
BEGIN;

DROP POLICY IF EXISTS "Tout le monde peut voir les réponses quiz prise parole"
  ON public.quiz_prise_parole_responses;

CREATE POLICY "Seuls les admins peuvent lire les réponses quiz prise parole"
  ON public.quiz_prise_parole_responses
  FOR SELECT
  USING (public.is_admin(auth.uid()));

COMMIT;
