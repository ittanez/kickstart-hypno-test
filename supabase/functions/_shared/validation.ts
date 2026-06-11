// Validation stricte des entrées : seuls email, score et senseDominant
// sont acceptés du client. category/description sont recalculés serveur.

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LENGTH = 254;

// Score théorique : 21 questions × 1-5 points = 21 à 105.
// Bornes larges pour tolérer une évolution du questionnaire.
const MIN_SCORE = 0;
const MAX_SCORE = 200;

export const ALLOWED_SENSES = [
  "Visuel",
  "Auditif",
  "Kinesthésique",
  "Olfactif",
  "Gustatif",
] as const;

export type DominantSense = (typeof ALLOWED_SENSES)[number];

export interface ValidatedRequest {
  email: string;
  score: number;
  senseDominant: DominantSense;
}

export class ValidationError extends Error {}

export const validateRequest = (body: unknown): ValidatedRequest => {
  if (typeof body !== "object" || body === null) {
    throw new ValidationError("Corps de requête invalide");
  }

  const { email, score, senseDominant } = body as Record<string, unknown>;

  if (
    typeof email !== "string" ||
    email.length > MAX_EMAIL_LENGTH ||
    !EMAIL_REGEX.test(email.trim())
  ) {
    throw new ValidationError("Adresse email invalide");
  }

  // Number("") vaut 0 : ne convertir que les chaînes non vides
  const numericScore =
    typeof score === "string" && score.trim() !== "" ? Number(score) : score;
  if (
    typeof numericScore !== "number" ||
    !Number.isFinite(numericScore) ||
    numericScore < MIN_SCORE ||
    numericScore > MAX_SCORE
  ) {
    throw new ValidationError("Score invalide");
  }

  const sense = ALLOWED_SENSES.find((s) => s === senseDominant);
  if (!sense) {
    throw new ValidationError("Sens dominant invalide");
  }

  return {
    email: email.trim().toLowerCase(),
    score: Math.round(numericScore),
    senseDominant: sense,
  };
};
