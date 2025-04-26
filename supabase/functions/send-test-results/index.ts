
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
      <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; margin: 0; padding: 0;">
        <div style="max-width: 800px; margin: 0 auto; padding: 30px; background-color: #f8f9fa; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #5a4a9e; font-size: 28px; margin-bottom: 15px;">Votre test de réceptivité à l'hypnose</h1>
            
            <div style="display: inline-block; background-color: #5a4a9e; color: white; padding: 10px 20px; border-radius: 30px; font-size: 22px; margin-bottom: 20px;">
              Votre score : ${score}/120
            </div>
            
            <h2 style="color: #5a4a9e; font-size: 24px; margin: 20px 0; padding-bottom: 10px; border-bottom: 2px solid #e0e0e0;">
              Catégorie : ${category}
            </h2>
            
            <div style="background-color: #f0ecff; padding: 15px; border-radius: 10px; text-align: center; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #5a4a9e;">
                <span style="font-size: 24px;">👁️ 👂 👃 👅 ✋</span><br>
                Votre sens dominant : <span style="font-weight: bold; color: #5a4a9e;">${senseDominant}</span>
              </h3>
              <p style="text-align: left; font-style: italic; color: #555;">
                Notre cerveau privilégie souvent un ou plusieurs canaux sensoriels pour percevoir et traiter l'information. 
                Connaître votre sens dominant peut vous aider à mieux comprendre comment vous entrez naturellement en état 
                d'hypnose et quel type d'induction sera le plus efficace pour vous.
              </p>
            </div>
          </div>
          
          <div style="background-color: white; padding: 25px; border-radius: 10px; box-shadow: 0 3px 10px rgba(0,0,0,0.05);">
            <h3 style="color: #5a4a9e; font-size: 20px; border-left: 4px solid #5a4a9e; padding-left: 15px;">
              Ce que cela signifie pour vous :
            </h3>
            
            <p style="line-height: 1.6; text-align: justify;">
              ${description}
            </p>
            
            <div style="text-align: center; margin-top: 30px; font-style: italic; color: #5a4a9e;">
              <p>🎯 L'hypnose n'est pas un test à réussir, c'est une expérience à vivre.</p>
            </div>
          </div>

          <div style="margin-top: 40px;">
            <h2 style="color: #5a4a9e; text-align: center;">Votre hypnothérapeute à Paris</h2>
            
            <div style="text-align: center; margin: 20px 0;">
              <img src="https://wp.me/acQEVr-1bM" alt="Alain Zenatti - Hypnothérapeute Paris" 
                   style="max-width: 200px; border-radius: 8px; margin: 0 auto;">
            </div>

            <p style="text-align: center;">
              <strong>Contactez votre hypnothérapeute à Paris :</strong><br>
              📩 <a href="mailto:contact@novahypnose.fr" style="color: #5a4a9e;">contact@novahypnose.fr</a><br>
              🌐 <a href="https://www.novahypnose.fr" style="color: #5a4a9e;">www.novahypnose.fr</a><br>
              📞 <a href="tel:+33649358089" style="color: #5a4a9e;">06 49 35 80 89</a>
            </p>

            <div style="text-align: center; margin: 20px auto;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <a href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris" 
                       target="_blank" 
                       style="display: inline-block; background-color: #5a4a9e; color: white; text-decoration: none; padding: 12px 25px; border-radius: 30px; font-weight: bold; margin: 10px;">
                      Prendre rendez-vous
                    </a>
                  </td>
                </tr>
              </table>
            </div>

            <div style="text-align: center; margin: 20px auto;">
              <a href="https://www.instagram.com/novahypnose/" 
                 style="display: flex; align-items: center; text-decoration: none; color: #000; justify-content: center; margin: 0 auto; width: fit-content;">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png" 
                     width="20" height="20" alt="Instagram" style="margin-right: 8px;">
                Suivez Nova Hypnose sur Instagram
              </a>
            </div>

            <div style="margin: 20px auto; text-align: center;">
              <a href="https://harmonia.novahypnose.fr/">
                <img style="box-shadow: 1px 3px 12px #555; border-radius:10px; margin: 10px auto; display: block;" 
                     width="350" 
                     alt="Formation Harmonia : réduire le stress avec l'auto-hypnose - Hypnothérapeute Paris" 
                     src="https://novahypnose.fr/wp-content/uploads/2025/04/jpg-12.jpg">
              </a>
              
              <a href="https://hypno-balade.novahypnose.fr/">
                <img style="box-shadow: 1px 3px 12px #555; border-radius:10px; margin: 10px auto; display: block;" 
                     width="350" 
                     alt="Hypno-balade dans le Perche - Séance d'hypnose en forêt près de Paris" 
                     src="https://novahypnose.fr/wp-content/uploads/2025/04/jpg-11.jpg">
              </a>
            </div>

            <p style="text-align: center; margin-top: 20px;">
              <a href="https://novahypnose.fr/mentions-legales/" 
                 target="_blank" 
                 style="color: #666; text-decoration: none; margin: 0 10px;">Mentions légales</a> | 
              <a href="https://novahypnose.fr/politique-de-confidentialite/" 
                 target="_blank" 
                 style="color: #666; text-decoration: none; margin: 0 10px;">Politique de confidentialité</a>
            </p>
            
            <p style="color: #666; font-size: 0.9em; margin-top: 20px; text-align: center;">
              ⚠️ Rappel important : L'hypnothérapie est une approche complémentaire qui ne remplace en aucun cas une consultation médicale 
              ou un traitement prescrit par un professionnel de santé. En cas de problème de santé, consultez toujours votre médecin.
            </p>
          </div>
        </div>
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
