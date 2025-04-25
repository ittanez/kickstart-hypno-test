
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

    const getLevelContent = (score: number) => {
      if (score >= 24 && score <= 48) {
        return `
          <h3>🔹 Niveau 1 – Réceptivité émergente</h3>
          <p>Vous êtes dans une phase d'exploration. Vous avez besoin de temps, de confiance, ou simplement d'un cadre plus adapté pour accéder à l'état d'hypnose.</p>
          
          <p><strong>Ce que cela signifie :</strong><br>
          Vous possédez les ressources nécessaires pour vivre un état d'hypnose, mais elles ont peut-être besoin d'être apprivoisées en douceur. Il est possible que vous soyez très cérébral, analytique ou simplement prudent, ce qui est parfaitement légitime.</p>
          
          <p><strong>Conseils :</strong></p>
          <ul>
            <li>Commencez par des exercices simples d'auto-hypnose, sans pression de résultat.</li>
            <li>Préférez un accompagnement bienveillant, basé sur la relation de confiance.</li>
            <li>Laissez-vous le droit de ne "rien ressentir" au début : la réceptivité vient souvent en expérimentant sans attente.</li>
          </ul>
          
          <p>🎁 Vous êtes sur le chemin. La graine est là. Il suffit parfois d'un cadre plus sécurisant ou d'un autre langage pour qu'elle s'ouvre.</p>`;
      } else if (score >= 49 && score <= 72) {
        return `
          <h3>🔹 Niveau 2 – Réceptivité modérée et adaptative</h3>
          <p>Vous avez une certaine sensibilité à l'état d'hypnose, surtout lorsque l'environnement est propice et que vous vous sentez en confiance.</p>
          
          <p><strong>Ce que cela signifie :</strong><br>
          Vous entrez probablement déjà dans des états modifiés de conscience dans votre vie quotidienne : rêverie, absorption dans une musique, moment suspendu… Vous avez les prédispositions naturelles, mais vous pouvez encore développer votre réceptivité avec l'aide d'un accompagnement sur mesure.</p>
          
          <p><strong>Conseils :</strong></p>
          <ul>
            <li>La régularité favorise la profondeur des états hypnotiques.</li>
            <li>Apprenez à reconnaître les signes subtils de la transe.</li>
            <li>Explorez différents styles d'induction.</li>
          </ul>
          
          <p>🎁 Vous avez les clés. Il suffit maintenant d'ouvrir la bonne porte.</p>`;
      } else if (score >= 73 && score <= 96) {
        return `
          <h3>🔹 Niveau 3 – Réceptivité naturelle et fluide</h3>
          <p>Vous êtes naturellement réceptif aux suggestions et aux inductions hypnotiques. Votre esprit entre facilement dans des états modifiés de conscience.</p>
          
          <p><strong>Ce que cela signifie :</strong><br>
          Vous êtes probablement sensible aux images mentales, à la musique, à la voix, ou aux émotions. Vous vous laissez guider aisément et pouvez vivre des expériences riches dès les premières séances.</p>
          
          <p><strong>Conseils :</strong></p>
          <ul>
            <li>Expérimentez différentes approches (visualisation, réification, métaphores…)</li>
            <li>Apprenez à ancrer vos états de ressources</li>
            <li>L'hypnose peut devenir pour vous un véritable outil de développement personnel</li>
          </ul>
          
          <p>🎁 Vous êtes comme un instrument déjà accordé. Il ne reste qu'à jouer la bonne musique.</p>`;
      } else {
        return `
          <h3>🔹 Niveau 4 – Réceptivité très élevée / Hypnotisabilité intuitive</h3>
          <p>Vous entrez très rapidement en état d'hypnose. Votre imagination, vos ressentis et votre sensibilité sont de véritables leviers de transformation.</p>
          
          <p><strong>Ce que cela signifie :</strong><br>
          Votre esprit est très réceptif. Vous plongez facilement dans des états profonds, vous ressentez fortement les suggestions et vivez des expériences intérieures très intenses.</p>
          
          <p><strong>Conseils :</strong></p>
          <ul>
            <li>Pratiquez l'auto-hypnose avec structure et éthique</li>
            <li>Travaillez avec des hypnothérapeutes capables d'aller plus loin avec finesse</li>
            <li>Utilisez votre réceptivité pour explorer des problématiques profondes</li>
          </ul>
          
          <p>🎁 Vous êtes un voyageur des états de conscience. Prenez soin de choisir vos destinations.</p>`;
      }
    };

    const htmlContent = `
      <h1>✅ Votre test de réceptivité à l'hypnose : résultats et interprétation</h1>
      
      <p>Merci d'avoir pris le temps de répondre à ce test.</p>
      <p>Il ne s'agit pas d'un diagnostic, ni d'un jugement sur vos capacités.</p>
      <p>Ce test met simplement en lumière votre style actuel de réceptivité, c'est-à-dire comment vous entrez (ou pourriez entrer) en état d'hypnose, dans les conditions qui vous conviennent.</p>

      <h2>Votre score : ${score}/120</h2>
      <h3>Catégorie : ${category}</h3>
      <p>${description}</p>

      ${getLevelContent(score)}

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

      <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ccc;">
        <p>📍 Je suis Alain Zenatti, hypnothérapeute à Paris, spécialisé en hypnose ericksonienne et en auto-hypnose.</p>
        <p>Si vous ressentez l'envie d'aller plus loin, d'approfondir votre réceptivité, ou tout simplement de vivre une première expérience, je serai heureux de vous guider pas à pas dans ce chemin.</p>
        
        <p><strong>Contactez-moi directement :</strong></p>
        <p>
          📩 contact@novahypnose.fr<br>
          🌐 www.novahypnose.fr<br>
          📞 06 49 35 80 89
        </p>
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
