
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
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Résultats du test de réceptivité à l'hypnose</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); padding: 30px; margin-bottom: 20px;">
              <h1 style="text-align: center; margin-bottom: 30px; font-size: 28px; border-bottom: 2px solid #3498db; padding-bottom: 10px; color: #2c3e50;">Votre test de réceptivité à l'hypnose</h1>
              
              <div style="text-align: center; margin: 20px 0; font-size: 20px;">
                  <p>Votre score : <span style="font-weight: bold; font-size: 28px; color: #3498db;">${score}/120</span></p>
              </div>
              
              <div style="text-align: center; font-size: 22px; font-weight: bold; color: #2980b9; margin-bottom: 20px;">
                  ${category}
              </div>
              
              <div style="text-align: center; margin: 20px 0;">
                  Votre sens dominant : <strong style="font-size: 20px; color: #2980b9;">${senseDominant}</strong>
              </div>
              
              <p style="font-style: italic; color: #555; margin: 15px 0; font-size: 15px;">
                  Notre cerveau privilégie souvent un ou plusieurs canaux sensoriels pour percevoir et traiter l'information. 
                  Connaître votre sens dominant peut vous aider à mieux comprendre comment vous entrez naturellement en état 
                  d'hypnose et quel type d'induction sera le plus efficace pour vous.
              </p>
              
              <h2 style="font-size: 22px; margin-top: 25px; border-left: 4px solid #3498db; padding-left: 10px; color: #2c3e50;">
                  Ce que cela signifie pour vous :
              </h2>
              
              <div style="background-color: #f5f9fc; border-left: 4px solid #3498db; padding: 15px; margin: 20px 0;">
                  ${description}
              </div>
              
              <p style="text-align: center; font-weight: bold; color: #2c3e50; margin: 20px 0;">
                  🎁 ${getConclusionMessage(score)}
              </p>
              
              <p style="text-align: center; font-style: italic; margin: 30px 0; color: #7f8c8d;">
                  L'hypnose n'est pas un test à réussir, c'est une expérience à vivre.
              </p>
          </div>
          
          <div style="background-color: #f5f9fc; padding: 20px; border-radius: 8px; margin: 30px 0; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
              <h2 style="color: #2c3e50; margin-top: 0;">Votre hypnothérapeute à Paris</h2>
              
              <div style="text-align: center; margin: 20px 0;">
                  <img src="https://wp.me/acQEVr-1bM" 
                       alt="Alain Zenatti - Hypnothérapeute à Paris"
                       style="border-radius: 50%; max-width: 200px; border: 3px solid #3498db;">
              </div>
              
              <p>Je suis Alain Zenatti, hypnothérapeute à Paris, spécialisé en hypnose ericksonienne et en auto-hypnose.</p>
              
              <div style="text-align: center; margin: 20px 0;">
                  <p><strong>Contactez votre hypnothérapeute à Paris :</strong></p>
                  <p>📩 <a href="mailto:contact@novahypnose.fr" style="color: #3498db; text-decoration: none;">contact@novahypnose.fr</a></p>
                  <p>🌐 <a href="https://www.novahypnose.fr" target="_blank" style="color: #3498db; text-decoration: none;">www.novahypnose.fr</a></p>
                  <p>📞 <a href="tel:0649358089" style="color: #3498db; text-decoration: none;">06 49 35 80 89</a></p>
              </div>
              
              <div style="text-align: center; margin: 25px 0;">
                  <a href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris" 
                     target="_blank"
                     style="display: inline-block; background-color: #3498db; color: white; padding: 10px 20px; border-radius: 4px; text-decoration: none; font-weight: bold; margin: 10px; text-align: center; width: 350px; max-width: 100%;">
                      Prendre rendez-vous
                  </a>
              </div>
          </div>

          <div style="text-align: center; margin: 30px 0;">
              <a href="https://www.instagram.com/novahypnose/" 
                 target="_blank"
                 style="display: flex; align-items: center; justify-content: center; gap: 10px; text-decoration: none; color: #333;">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png" 
                       alt="Instagram" 
                       style="width: 24px; height: 24px;">
                  Suivez Nova Hypnose sur Instagram
              </a>
          </div>

          <div style="margin: 30px 0;">
              <a href="https://harmonia.novahypnose.fr/">
                  <img style="width: 100%; max-width: 500px; height: auto; display: block; margin: 20px auto; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" 
                       src="https://novahypnose.fr/wp-content/uploads/2025/04/jpg-12.jpg" 
                       alt="Formation Harmonia">
              </a>
              
              <a href="https://hypno-balade.novahypnose.fr/">
                  <img style="width: 100%; max-width: 500px; height: auto; display: block; margin: 20px auto; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" 
                       src="https://novahypnose.fr/wp-content/uploads/2025/04/jpg-11.jpg" 
                       alt="Hypno-balade dans le Perche">
              </a>
          </div>

          <div style="font-size: 12px; color: #7f8c8d; text-align: center; margin-top: 40px; padding-top: 10px; border-top: 1px solid #ddd;">
              <p>
                  <a href="https://novahypnose.fr/mentions-legales/" style="color: #3498db; text-decoration: none;">Mentions légales</a> | 
                  <a href="https://novahypnose.fr/politique-de-confidentialite/" style="color: #3498db; text-decoration: none;">Politique de confidentialité</a>
              </p>
              
              <p style="background-color: #fff8e1; padding: 10px; border-radius: 5px; border-left: 3px solid #ffc107; margin: 15px 0; font-size: 13px;">
                  ⚠️ Rappel important : L'hypnothérapie est une approche complémentaire qui ne remplace en aucun cas une consultation médicale 
                  ou un traitement prescrit par un professionnel de santé. En cas de problème de santé, consultez toujours votre médecin.
              </p>
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

function getConclusionMessage(score: number): string {
  if (score <= 30) {
    return "Vous êtes sur le chemin. La graine est là. Il suffit parfois d'un cadre plus sécurisant ou d'un autre langage pour qu'elle s'ouvre.";
  } else if (score <= 60) {
    return "Vous avez les clés. Il suffit maintenant d'ouvrir la bonne porte.";
  } else if (score <= 90) {
    return "Vous êtes comme un instrument déjà accordé. Il ne reste qu'à jouer la bonne musique.";
  } else {
    return "Vous êtes un voyageur des états de conscience. Prenez soin de choisir vos destinations.";
  }
}

