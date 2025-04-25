
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Resend } from "npm:resend@2.0.0"

const resend = new Resend(Deno.env.get("RESEND_API_KEY"))

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { email, score, category, description } = await req.json()

    if (!email) {
      throw new Error('Email is required')
    }

    console.log("Sending email to:", email, "with score:", score, "category:", category)

    // Créez le contenu de l'email
    const htmlContent = `
      <h1>Résultats de votre test de réceptivité à l'hypnose</h1>
      <p>Cher(e) participant(e),</p>
      <h2>Votre score : ${score}/120</h2>
      <h3>Catégorie : ${category}</h3>
      <p>${description}</p>
      <p>Nous espérons que ces résultats vous aideront à mieux comprendre votre potentiel hypnotique.</p>
      <br>
      <p>Cordialement,<br>L'équipe Nova Hypnose</p>
    `;

    const fromAddress = "contact@updates.novahypnose.fr";

    const emailResponse = await resend.emails.send({
      from: `Nova Hypnose <${fromAddress}>`,
      to: [email],
      subject: "Vos résultats du test de réceptivité à l'hypnose",
      html: htmlContent,
    });

    console.log("Email response:", JSON.stringify(emailResponse));

    if (emailResponse.error) {
      console.error("Resend API error:", emailResponse.error);
      
      return new Response(JSON.stringify({
        status: "warning",
        message: "Résultats calculés, mais l'envoi de l'email a échoué. Utilisez l'écran actuel pour voir vos résultats.",
        error: emailResponse.error.message,
        score,
        category,
        description
      }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      })
    }

    return new Response(JSON.stringify({
      status: "success",
      message: "Email envoyé avec succès",
      data: emailResponse
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    })
  } catch (error: any) {
    console.error("Error in send-test-results function:", error)
    return new Response(
      JSON.stringify({ 
        status: "error",
        error: error.message 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    )
  }
})

