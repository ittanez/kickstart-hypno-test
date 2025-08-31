
export class EmailLogger {
  static logRequest(data: any) {
    console.log("=== NOUVELLE DEMANDE EMAIL ===");
    console.log("Request received at:", new Date().toISOString());
    console.log("User timestamp:", data.timestamp);
    console.log("Email:", data.email);
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
    console.log("To:", email);
  }

  static logEmailResponse(emailResponse: any) {
    console.log("=== RÉPONSE RESEND ===");
    console.log("Email response:", JSON.stringify(emailResponse, null, 2));
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
