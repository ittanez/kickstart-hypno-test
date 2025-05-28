 import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Resend } from "npm:resend@2.0.0"

const resend = new Resend(Deno.env.get("RESEND_API_KEY"))

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, cache-control, pragma, expires',
}

const getExerciseForScore = (score: number): string => {
  if (score <= 30) {
    return `
      <h3 style="color: #2c3e50; margin-top: 20px;">Éveillez votre potentiel dès maintenant :</h3>
      <p>Installez-vous confortablement, fixez un point devant vous pendant 30 secondes, puis fermez les yeux et observez les sensations qui apparaissent. Même subtiles, ces sensations sont les premiers signes de votre capacité à modifier votre état de conscience. Pratiquez 2 minutes par jour pour développer cette sensibilité.</p>
    `;
  } else if (score <= 60) {
    return `
      <h3 style="color: #2c3e50; margin-top: 20px;">Éveillez votre potentiel dès maintenant :</h3>
      <p>Fermez les yeux et imaginez un escalier de 5 marches. Descendez-les lentement en ressentant une détente de plus en plus profonde à chaque pas. Une fois en bas, imaginez une porte qui, une fois ouverte, vous mène à un lieu ressource personnel. Explorez ce lieu 2-3 minutes puis remontez l'escalier. Cet exercice simple vous permet déjà d'accéder à vos ressources intérieures.</p>
    `;
  } else if (score <= 90) {
    return `
      <h3 style="color: #2c3e50; margin-top: 20px;">Éveillez votre potentiel dès maintenant :</h3>
      <p>Fermez les yeux et portez attention à votre respiration. À chaque expiration, répétez mentalement un mot ressource (paix, calme, confiance...). Après 1 minute, imaginez ce mot prenant forme, couleur, texture dans votre corps. Ressentez les effets de cette ressource se diffuser. Cette technique vous permet d'activer directement vos ressources intérieures pour transformer votre quotidien.</p>
    `;
  } else {
    return `
      <h3 style="color: #2c3e50; margin-top: 20px;">Éveillez votre potentiel dès maintenant :</h3>
      <p>Fermez les yeux et imaginez un écran intérieur. Projetez-y une situation où vous aimeriez réagir différemment. Observez-vous d'abord depuis le public, puis entrez dans l'image et ressentez les nouvelles ressources dont vous disposez. Alternez plusieurs fois ces perspectives. Cette technique puissante de recadrage peut rapidement transformer vos schémas limitants.</p>
    `;
  }
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const responseHeaders = {
      ...corsHeaders,
      'Content-Type': 'application/json',
    };

    const { email, score, category, description, senseDominant, timestamp } = await req.json();
    console.log("=== NOUVELLE DEMANDE EMAIL ===");
    console.log("Request received at:", new Date().toISOString());
    console.log("User timestamp:", timestamp);
    console.log("Email:", email);
    console.log("Score:", score);
    console.log("Category:", category);
    console.log("Sens dominant:", senseDominant);

    if (!email) {
      throw new Error('Email is required')
    }

    // Use HTTPS URLs for external images
    const alainZenattiImageUrl = "https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images//alain-zenatti-lexperience-dun-hypnotherapeute-parisien.webp";
    const harmoniaImageUrl = "https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images//jpg%20(12).webp";
    const hypnoBalladeImageUrl = "https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images//jpg%20(11).webp";
    
    console.log("=== URLS DES IMAGES UTILISÉES ===");
    console.log("Alain Zenatti:", alainZenattiImageUrl);
    console.log("Harmonia:", harmoniaImageUrl);
    console.log("Hypno-Balade:", hypnoBalladeImageUrl);

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Résultats du test de réceptivité à l'hypnose</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div class="container" style="background-color: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); padding: 30px; margin-bottom: 20px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <a href="https://hypnokick.lovable.dev" style="text-decoration: none; color: inherit;">
                  <span style="color: #3498db;">Hypno</span><span style="color: #e74c3c;">Kick</span>
                </a>
              </div>

              <h1 style="text-align: center; margin-bottom: 30px; font-size: 28px; border-bottom: 2px solid #3498db; padding-bottom: 10px; color: #2c3e50;">Félicitations ! Voici votre bilan hypnotique, découvrez votre pouvoir qui vous permet de manifester vos plus grands désirs</h1>
              
              <div style="text-align: center; margin: 30px 0; color: #666;">
                <p>Merci d'avoir pris le temps de réaliser ce test ! C'est une première étape importante dans votre voyage vers la transformation personnelle.</p>
              </div>
              
              <div style="background-color: #f5f9fc; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                <p style="text-align: center; font-size: 22px; font-weight: bold; color: #2980b9; margin-bottom: 20px;">
                    ${category}
                </p>
                
                <div style="text-align: center; margin: 20px 0;">
                    Votre sens dominant : <strong style="font-size: 20px; color: #2980b9;">${senseDominant}</strong>
                </div>
              </div>
              
              <div style="background-color: #f5f9fc; border-left: 4px solid #3498db; padding: 15px; margin: 20px 0;">
                  ${description}
              </div>
              
              <div style="background-color: #f8f4ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  ${getExerciseForScore(score)}
              </div>

              <!-- IMAGE PRINCIPALE D'ALAIN ZENATTI -->
              <div style="text-align: center; margin: 30px 0;">
                  <img src="${alainZenattiImageUrl}" 
                       alt="Alain Zenatti - Hypnothérapeute à Paris"
                       style="width: 100%; max-width: 500px; height: auto; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); display: block; margin: 0 auto;">
              </div>

              <div style="background-color: #f5f9fc; padding: 20px; border-radius: 8px; margin: 30px 0;">
                <h2 style="color: #2c3e50; margin-top: 0;">Votre superpouvoir hypnotique, un potentiel illimité qui grandit avec vous</h2>
                <p>Votre capacité hypnotique n'est pas figée – elle fluctue selon votre état physique, émotionnel et votre environnement. Cette variabilité est une force! Elle signifie que vous pouvez développer ce potentiel avec de la pratique, comme un muscle qui se renforce. L'hypnose thérapeutique vous permet d'accéder à des ressources insoupçonnées et de créer des changements précis et durables dans votre vie, qu'il s'agisse de dépasser des peurs, renforcer votre confiance, ou transformer des habitudes. Chaque personne possède sa propre porte d'entrée vers ces états de conscience modifiés – découvrir la vôtre est le premier pas vers une vie plus alignée avec vos aspirations profondes.</p>
              </div>

              <div style="background-color: #f5f9fc; padding: 20px; border-radius: 8px; margin: 30px 0;">
                <h2 style="text-align: center; color: #2c3e50; margin-top: 0; margin-bottom: 20px;">Votre hypnothérapeute à Paris Le Marais Bastille</h2>
                
                <p>📍 Je suis Alain Zenatti, hypnothérapeute à Paris, spécialisé en hypnose ericksonienne et en auto-hypnose.</p>
                
                <p>Depuis plusieurs années, j'aide les personnes à retrouver confiance, équilibre et clarté intérieure grâce à des séances d'hypnose sur mesure, toujours bienveillantes et respectueuses du rythme de chacun.</p>
                
                <p>Si vous ressentez l'envie d'aller plus loin, d'approfondir votre réceptivité, ou tout simplement de vivre une première séance d'hypnose à Paris, je serai heureux de vous guider pas à pas dans ce chemin.</p>
                
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
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
              <a href="https://www.instagram.com/novahypnose/" 
                 target="_blank"
                 style="display: inline-flex; align-items: center; justify-content: center; gap: 10px; text-decoration: none; color: #333;">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png" 
                       alt="Instagram" 
                       style="width: 24px; height: 24px;">
                  Suivez Nova Hypnose sur Instagram
              </a>
          </div>

          <!-- IMAGE HARMONIA -->
          <div style="margin: 30px 0;">
              <div style="text-align: center; margin: 20px 0;">
                  <a href="https://harmonia.novahypnose.fr/" target="_blank">
                      <img style="width: 100%; max-width: 500px; height: auto; display: block; margin: 20px auto; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" 
                           src="${harmoniaImageUrl}" 
                           alt="Formation Harmonia - Cliquez pour en savoir plus">
                  </a>
              </div>
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
              
              <!-- VERSION DE L'EMAIL POUR DEBUG -->
              <p style="font-size: 10px; color: #ccc; margin-top: 20px;">
                  Version: ${new Date().toISOString()} | Score: ${score}
              </p>
          </div>

          <!-- IMAGES ADDITIONNELLES -->
          <div style="margin: 30px 0;">
              <!-- Image Hypno-Balade du Perche -->
              <div style="text-align: center; margin: 20px 0;">
                  <a href="https://novahypnose.fr/hypno-balade/" target="_blank">
                      <img style="width: 100%; max-width: 500px; height: auto; display: block; margin: 20px auto; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" 
                           src="${hypnoBalladeImageUrl}" 
                           alt="Hypno-Balade du Perche">
                  </a>
              </div>
          </div>
      </body>
      </html>
    `
    
    const fromAddress = "contact@updates.novahypnose.fr"

    console.log("=== ENVOI EMAIL EN COURS ===");
    console.log("From:", fromAddress);
    console.log("To:", email);

    const emailResponse = await resend.emails.send({
      from: `Nova Hypnose <${fromAddress}>`,
      to: [email],
      bcc: ["a.zenatti@gmail.com"],
      subject: "Félicitations ! Voici votre bilan hypnotique ! ⬇️✨",
      html: htmlContent,
    });

    console.log("=== RÉPONSE RESEND ===");
    console.log("Email response:", JSON.stringify(emailResponse, null, 2));

    if (emailResponse.error) {
      console.error("=== ERREUR RESEND ===");
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
        headers: responseHeaders,
      })
    }

    console.log("=== EMAIL ENVOYÉ AVEC SUCCÈS ===");
    return new Response(JSON.stringify({
      status: "success",
      message: "Email envoyé avec succès",
      data: emailResponse,
      debug: {
        timestamp: new Date().toISOString(),
        images: {
          alain: alainZenattiImageUrl,
          harmonia: harmoniaImageUrl,
          hypnoBalade: hypnoBalladeImageUrl
        }
      }
    }), {
      status: 200,
      headers: responseHeaders,
    })
  } catch (error: any) {
    console.error("=== ERREUR GÉNÉRALE ===");
    console.error("Error in send-test-results function:", error);
    return new Response(
      JSON.stringify({ 
        status: "error",
        error: error.message,
        timestamp: new Date().toISOString()
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