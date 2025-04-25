
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

    const emailResponse = await resend.emails.send({
      from: "HypnoKick <onboarding@resend.dev>",
      to: [email],
      subject: "Vos résultats du test de réceptivité à l'hypnose",
      html: `
        <h1>Résultats de votre test de réceptivité à l'hypnose</h1>
        <p>Cher(e) participant(e),</p>
        <h2>Votre score : ${score}/120</h2>
        <h3>Catégorie : ${category}</h3>
        <p>${description}</p>
        <p>Nous espérons que ces résultats vous aideront à mieux comprendre votre potentiel hypnotique.</p>
        <br>
        <p>Cordialement,<br>L'équipe HypnoKick</p>
      `,
    })

    console.log("Email sent successfully:", emailResponse)

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    })
  } catch (error: any) {
    console.error("Error in send-test-results function:", error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    )
  }
})
