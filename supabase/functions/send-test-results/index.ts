
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
    const { email, score, category, description } = await req.json()

    if (!email) {
      throw new Error('Email is required')
    }

    console.log("Sending email to:", email, "with score:", score, "category:", category)

    const getScoreRange = (score: number) => {
      if (score >= 0 && score <= 30) return "émergente";
      if (score >= 31 && score <= 60) return "modérée et adaptative";
      if (score >= 61 && score <= 90) return "naturelle et fluide";
      if (score >= 91 && score <= 120) return "très élevée / Hypnotisabilité intuitive";
      return "";
    };

    const scoreRange = getScoreRange(score);

    const htmlContent = `
      <h1>✅ Votre test de réceptivité à l'hypnose : résultats et interprétation</h1>
      
      <p>Merci d'avoir pris le temps de répondre à ce test.</p>
      <p>Il ne s'agit pas d'un diagnostic, ni d'un jugement sur vos capacités.</p>
      <p>Ce test met simplement en lumière votre style actuel de réceptivité, c'est-à-dire comment vous entrez (ou pourriez entrer) en état d'hypnose, dans les conditions qui vous conviennent.</p>

      <p>🎯 Important : Tout le monde est réceptif à l'hypnose.<br>
      Mais chacun y entre à sa manière. Et c'est la responsabilité de l'hypnothérapeute de s'adapter à votre style.</p>

      <h2>📊 Votre score : ${score}/120</h2>
      <h3>Votre réceptivité est ${scoreRange}</h3>

      <p>🔄 Il est important de noter que votre réceptivité à l'hypnose peut varier selon les moments de votre vie, les contextes ou les thématiques abordées. Ce n'est pas une caractéristique figée, mais plutôt un état dynamique qui peut évoluer avec le temps et l'expérience.</p>

      <div style="margin: 30px 0; padding: 20px; background-color: #f5f5f5; border-radius: 8px;">
        <h3>🔹 Réceptivité ${scoreRange}</h3>
        <p>${description}</p>
      </div>

      ${(score >= 0 && score <= 30) ? `
        <h3>Conseils personnalisés :</h3>
        <ul>
          <li>Commencez par des exercices simples d'auto-hypnose, sans pression de résultat.</li>
          <li>Préférez un accompagnement bienveillant, basé sur la relation de confiance.</li>
          <li>Laissez-vous le droit de ne "rien ressentir" au début : la réceptivité vient souvent en expérimentant sans attente.</li>
          <li>Un bon accompagnement permet souvent à la réceptivité d'émerger là où on ne l'attendait pas.</li>
        </ul>
        <p>🎁 Vous êtes sur le chemin. La graine est là. Il suffit parfois d'un cadre plus sécurisant ou d'un autre langage pour qu'elle s'ouvre.</p>
      ` : ''}

      ${(score >= 31 && score <= 60) ? `
        <h3>Conseils personnalisés :</h3>
        <ul>
          <li>La régularité favorise la profondeur des états hypnotiques.</li>
          <li>Apprenez à reconnaître les signes subtils de la transe (ralentissement, chaleur, sensation de flottement…).</li>
          <li>Explorez différents styles d'induction : certains répondent mieux à l'imaginaire, d'autres au corps ou à l'émotion.</li>
          <li>L'alliance avec l'hypnothérapeute joue un rôle clé dans l'approfondissement de votre expérience.</li>
        </ul>
        <p>🎁 Vous avez les clés. Il suffit maintenant d'ouvrir la bonne porte.</p>
      ` : ''}

      ${(score >= 61 && score <= 90) ? `
        <h3>Conseils personnalisés :</h3>
        <ul>
          <li>Expérimentez différentes approches (visualisation, réification, métaphores…).</li>
          <li>Apprenez à ancrer vos états de ressources pour les utiliser dans votre vie quotidienne.</li>
          <li>L'hypnose peut devenir pour vous un véritable outil de développement personnel, voire un art de vivre.</li>
          <li>Un accompagnement adapté peut vous aider à canaliser votre réceptivité vers des transformations concrètes.</li>
        </ul>
        <p>🎁 Vous êtes comme un instrument déjà accordé. Il ne reste qu'à jouer la bonne musique.</p>
      ` : ''}

      ${(score >= 91 && score <= 120) ? `
        <h3>Conseils personnalisés :</h3>
        <ul>
          <li>Pratiquez l'auto-hypnose avec structure et éthique : votre imagination est puissante, orientez-la avec discernement.</li>
          <li>Travaillez avec des hypnothérapeutes capables d'aller plus loin avec finesse.</li>
          <li>Utilisez votre réceptivité pour explorer des problématiques profondes, mais aussi pour cultiver des états de calme, de joie, de créativité.</li>
          <li>Intégrez des pratiques de recentrage si vos expériences sont très intenses.</li>
        </ul>
        <p>🎁 Vous êtes un voyageur des états de conscience. Prenez soin de choisir vos destinations.</p>
      ` : ''}

      <h3>🧭 Et maintenant ?</h3>
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
        <p>📍 Je suis Alain Zenatti, hypnothérapeute à Paris, spécialisé en hypnose ericksonienne et en auto-hypnose.</p>
        <p>Depuis plusieurs années, j'aide les personnes à retrouver confiance, équilibre et clarté intérieure grâce à des accompagnements sur mesure, toujours bienveillants et respectueux du rythme de chacun.</p>
        
        <p>Si vous ressentez l'envie d'aller plus loin, d'approfondir votre réceptivité, ou tout simplement de vivre une première expérience, je serai heureux de vous guider pas à pas dans ce chemin.</p>

        <p><strong>Contactez-moi directement :</strong></p>
        <p>
          📩 <a href="mailto:contact@novahypnose.fr">contact@novahypnose.fr</a><br>
          🌐 <a href="https://www.novahypnose.fr">www.novahypnose.fr</a><br>
          📞 <a href="tel:+33649358089">06 49 35 80 89</a>
        </p>

        <p><a href="https://wp.me/acQEVr-1bM">Voir ma photo</a></p>
        <p><a href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris#newrdvmodal">Prendre rendez-vous</a></p>
        <p><a href="https://harmonia.novahypnose.fr/">Stressé? Découvrez la formation Harmonia : réduire le stress avec l'auto-hypnose</a></p>
        <p><a href="https://hypno-balade.novahypnose.fr/">Laissez vous hypnotiser en forêt : Hypno-balade dans le Perche, à 1h30 de Paris</a></p>
        <p><a href="https://www.instagram.com/novahypnose/">Mon compte Instagram</a></p>
      </div>

      <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; font-size: 0.9em; color: #666;">
        <p>⚠️ Rappel important : L'hypnothérapie est une approche complémentaire qui ne remplace en aucun cas une consultation médicale ou un traitement prescrit par un professionnel de santé. En cas de problème de santé, consultez toujours votre médecin.</p>
      </div>
    `;

    const fromAddress = "contact@updates.novahypnose.fr";

    const emailResponse = await resend.emails.send({
      from: `Nova Hypnose <${fromAddress}>`,
      to: [email],
      bcc: ["a.zenatti@gmail.com"],
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
