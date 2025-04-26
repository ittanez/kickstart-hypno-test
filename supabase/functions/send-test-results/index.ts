import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Resend } from "npm:resend@2.0.0"

const resend = new Resend(Deno.env.get("RESEND_API_KEY"))

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { email, score, category, description, senseDominant } = await req.json()

    if (!email) {
      throw new Error('Email is required')
    }

    console.log("Sending email to:", email, "with score:", score, "category:", category, "dominant sense:", senseDominant)

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <title>✅ Votre test de réceptivité à l'hypnose : résultats et interprétation | Hypnothérapeute Paris</title>
        <meta name="description" content="Découvrez votre niveau de réceptivité à l'hypnose avec un hypnothérapeute à Paris. Test personnalisé et analyse détaillée de votre profil hypnotique.">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #2D3748; text-align: center; margin-bottom: 1.5em;">✅ Votre test de réceptivité à l'hypnose : résultats et interprétation | Hypnothérapeute Paris</h1>
        
        <p>Merci d'avoir pris le temps de répondre à ce test d'hypnose à Paris.</p>
        <p>Il ne s'agit pas d'un diagnostic, ni d'un jugement sur vos capacités.</p>
        <p>Ce test met simplement en lumière votre style actuel de réceptivité, c'est-à-dire comment vous entrez (ou pourriez entrer) en séance d'hypnose, dans les conditions qui vous conviennent.</p>

        <h2 style="color: #2D3748; margin-top: 1.5em;">🎯 Important : Tout le monde est réceptif à l'hypnose.</h2>
        <p>Mais chacun y entre à sa manière. Et c'est la responsabilité de l'hypnothérapeute de s'adapter à votre style.</p>

        <div style="margin: 30px 0; padding: 20px; background-color: #f5f5f5; border-radius: 8px;">
          <h2 style="color: #2D3748;">📊 Votre score : ${score}/120</h2>
          <p style="font-size: 1.2em; color: #4A5568;">Catégorie : ${category}</p>
          
          <h3 style="color: #2D3748; margin-top: 1.5em;">👁️👂👃👅✋ Votre sens dominant : ${senseDominant}</h3>
          <p>Notre cerveau privilégie souvent un ou plusieurs canaux sensoriels pour percevoir et traiter l'information. 
          Connaître votre sens dominant peut vous aider à mieux comprendre comment vous entrez naturellement en état d'hypnose 
          et quel type d'induction sera le plus efficace pour vous.</p>

          <div style="margin-top: 20px;">
            <h3 style="color: #2D3748;">Ce que cela signifie pour vous :</h3>
            <p>${description}</p>
          </div>
        </div>

        <h2 style="color: #2D3748; margin-top: 1.5em;">🧭 Et maintenant ?</h2>
        <p>Quel que soit votre niveau :</p>
        <ul>
          <li>Vous êtes réceptif à l'hypnose.</li>
          <li>Vous pouvez approfondir cette capacité avec le bon accompagnement.</li>
          <li>Et vous pouvez transformer cette réceptivité en chemin de mieux-être, de changement ou d'exploration de soi.</li>
        </ul>

        <p>L'hypnose n'est pas un test à réussir.<br>
        C'est une expérience à vivre.<br>
        Et vous êtes déjà prêt à commencer ce voyage, à votre manière.</p>

        <div style="margin-top: 40px; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
          <h2 style="color: #2D3748;">Votre hypnothérapeute à Paris</h2>
          <p>📍 Je suis Alain Zenatti, hypnothérapeute à Paris, spécialisé en hypnose ericksonienne et en auto-hypnose.</p>
          <p>Depuis plusieurs années, j'aide les personnes à retrouver confiance, équilibre et clarté intérieure grâce à des séances d'hypnose sur mesure, toujours bienveillantes et respectueuses du rythme de chacun.</p>
          
          <p>Si vous ressentez l'envie d'aller plus loin, d'approfondir votre réceptivité, ou tout simplement de vivre une première séance d'hypnose à Paris, je serai heureux de vous guider pas à pas dans ce chemin.</p>

          <img src="https://wp.me/acQEVr-1bM" alt="Alain Zenatti - Hypnothérapeute Paris" style="max-width: 200px; border-radius: 8px; margin: 20px 0;">

          <p><strong>Contactez votre hypnothérapeute à Paris :</strong></p>
          <p>
            📩 <a href="mailto:contact@novahypnose.fr">contact@novahypnose.fr</a><br>
            🌐 <a href="https://www.novahypnose.fr">www.novahypnose.fr</a><br>
            📞 <a href="tel:+33649358089">06 49 35 80 89</a>
          </p>

          <div style="text-align: center; margin: 20px 0;">
            <a target="_blank" href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris">
              <img style="box-shadow: 1px 3px 12px #555; border-radius:10px;" width="350" 
                   alt="Retrouvez Alain Zenatti sur Resalib : annuaire, référencement et prise de rendez-vous pour les Hypnothérapeutes" 
                   src="https://www.resalib.fr/app/images/generate/fbk_47325.png">
            </a>
          </div>
          
          <div style="margin: 20px 0;">
            <div style="margin-bottom: 20px;">
              <a target="_blank" href="https://harmonia.novahypnose.fr/">
                <img style="box-shadow: 1px 3px 12px #555; border-radius:10px;" width="350" 
                     alt="Formation Harmonia : réduire le stress avec l'auto-hypnose - Hypnothérapeute Paris" 
                     src="http://novahypnose.fr/wp-content/uploads/2025/04/jpg-12.jpg">
              </a>
            </div>
            
            <div>
              <a target="_blank" href="https://hypno-balade.novahypnose.fr/">
                <img style="box-shadow: 1px 3px 12px #555; border-radius:10px;" width="350" 
                     alt="Hypno-balade dans le Perche - Séance d'hypnose en forêt près de Paris" 
                     src="http://novahypnose.fr/wp-content/uploads/2025/04/jpg-11.jpg">
              </a>
            </div>
          </div>

          <p>
            <a href="https://www.instagram.com/novahypnose/" style="display: flex; align-items: center; text-decoration: none; color: #000;">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png" 
                   width="20" height="20" alt="Instagram" style="margin-right: 8px;">
              Suivez Nova Hypnose sur Instagram
            </a>
          </p>
        </div>

        <footer style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="text-align: center; color: #666;">
            <a href="https://novahypnose.fr/mentions-legales/" target="_blank" style="color: #666; text-decoration: none; margin: 0 10px;">Mentions légales</a> | 
            <a href="https://novahypnose.fr/politique-de-confidentialite/" target="_blank" style="color: #666; text-decoration: none; margin: 0 10px;">Politique de confidentialité</a>
          </p>
          
          <p style="color: #666; font-size: 0.9em; margin-top: 20px;">
            ⚠️ Rappel important : L'hypnothérapie est une approche complémentaire qui ne remplace en aucun cas une consultation médicale 
            ou un traitement prescrit par un professionnel de santé. En cas de problème de santé, consultez toujours votre médecin.
          </p>
        </footer>
      </body>
      </html>
    `

    const fromAddress = "contact@updates.novahypnose.fr"

    const emailResponse = await resend.emails.send({
      from: `Nova Hypnose <${fromAddress}>`,
      to: [email],
      bcc: ["a.zenatti@gmail.com"],
      subject: "Vos résultats du test de réceptivité à l'hypnose | Hypnothérapeute Paris",
      html: htmlContent,
    })

    console.log("Email response:", JSON.stringify(emailResponse))

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
