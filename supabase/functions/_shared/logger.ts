
// Masque la partie locale de l'email pour limiter les PII dans les logs
const maskEmail = (email: string): string => {
  const [local, domain] = email.split("@");
  if (!domain) return "***";
  return `${local.slice(0, 2)}***@${domain}`;
};

export class EmailLogger {
  static logRequest(data: { email: string; score: number; category: string; senseDominant: string }) {
    console.log("=== NOUVELLE DEMANDE EMAIL ===");
    console.log("Request received at:", new Date().toISOString());
    console.log("Email:", maskEmail(data.email));
    console.log("Score:", data.score);
    console.log("Category:", data.category);
    console.log("Sens dominant:", data.senseDominant);
  }

  static logImages(imageUrls: any) {
    console.log("=== URLS DES IMAGES UTILISÉES ===");
    console.log("Alain Zenatti:", imageUrls.alainZenattiImageUrl);
    console.log("Harmonia:", imageUrls.harmoniaImageUrl);
    console.log("Hypno-Balade:", imageUrls.hypnoBalladeImageUrl);
  }

  static logEmailSending(fromAddress: string, email: string) {
    console.log("=== ENVOI EMAIL EN COURS ===");
    console.log("From:", fromAddress);
    console.log("To:", maskEmail(email));
  }

  static logEmailResponse(emailResponse: { data?: { id?: string } | null; error?: unknown }) {
    console.log("=== RÉPONSE RESEND ===");
    console.log("Email id:", emailResponse.data?.id ?? "(aucun)");
  }

  static logSuccess() {
    console.log("=== EMAIL ENVOYÉ AVEC SUCCÈS ===");
  }

  static logError(error: any) {
    console.error("=== ERREUR GÉNÉRALE ===");
    console.error("Error in send-test-results function:", error);
  }

  static logResendError(error: any) {
    console.error("=== ERREUR RESEND ===");
    console.error("Resend API error:", error);
  }
}
