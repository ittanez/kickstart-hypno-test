import { Resend } from "npm:resend@2.0.0";
import { corsHeaders, fromAddress } from "./config.ts";
import { EmailResponse } from "./types.ts";
import { generateEmailContent } from "./email-template.ts";
import { getImageUrls } from "./image-urls.ts";
import { EmailLogger } from "./logger.ts";
import { getResultForScore } from "./scoring.ts";
import { validateRequest, ValidationError } from "./validation.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const responseHeaders = {
  ...corsHeaders,
  "Content-Type": "application/json",
};

export const handleSendResults = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { email, score, senseDominant } = validateRequest(await req.json());

    // category/description sont dérivés du score côté serveur : aucun
    // contenu fourni par le client n'est interpolé dans le HTML de l'email.
    const { category, description } = getResultForScore(score);

    EmailLogger.logRequest({ email, score, category, senseDominant });

    const imageUrls = getImageUrls();

    const htmlContent = generateEmailContent(
      score,
      category,
      description,
      senseDominant,
      imageUrls.alainZenattiImageUrl,
      imageUrls.harmoniaImageUrl,
      imageUrls.hypnoBalladeImageUrl
    );

    EmailLogger.logEmailSending(fromAddress, email);

    const emailResponse = await resend.emails.send({
      from: `Nova Hypnose <${fromAddress}>`,
      to: [email],
      bcc: ["a.zenatti@gmail.com", "contact@novahypnose.fr"],
      subject: "Votre profil hypnotique est prêt - découvrez votre sens dominant",
      html: htmlContent,
    });

    EmailLogger.logEmailResponse(emailResponse);

    if (emailResponse.error) {
      EmailLogger.logResendError(emailResponse.error);

      return new Response(JSON.stringify({
        status: "warning",
        message: "Résultats calculés, mais l'envoi de l'email a échoué. Utilisez l'écran actuel pour voir vos résultats.",
        score,
        category,
        description
      } as EmailResponse), {
        status: 200,
        headers: responseHeaders,
      });
    }

    EmailLogger.logSuccess();
    return new Response(JSON.stringify({
      status: "success",
      message: "Email envoyé avec succès",
    } as EmailResponse), {
      status: 200,
      headers: responseHeaders,
    });
  } catch (error: unknown) {
    EmailLogger.logError(error);

    if (error instanceof ValidationError) {
      return new Response(JSON.stringify({
        status: "error",
        error: error.message,
      } as EmailResponse), {
        status: 400,
        headers: responseHeaders,
      });
    }

    // Ne pas exposer les détails internes (clés, stack) au client.
    return new Response(JSON.stringify({
      status: "error",
      error: "Une erreur interne est survenue",
    } as EmailResponse), {
      status: 500,
      headers: responseHeaders,
    });
  }
};
