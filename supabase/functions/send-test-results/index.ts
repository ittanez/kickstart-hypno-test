import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, cache-control, pragma, expires',
};

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
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const responseHeaders = {
      ...corsHeaders,
      'Content-Type': 'application/json',
    };

    const { email, score, category, description, senseDominant } = await req.json();

    if (!email) {
      throw new Error('Email is required');
    }

    const alainZenattiImageUrl = "https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-zenatti-lexperience-dun-hypnotherapeute-parisien.webp";
    const harmoniaImageUrl = "https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/jpg%20(12).webp";
    const hypnoBalladeImageUrl = "https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/jpg%20(11).webp";

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
          <meta charset="UTF-8">
          <title>Bilan Hypnotique</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f9f9f9; padding: 20px;">
        <div style="max-width: 700px; margin: 0 auto; background: #fff; padding: 30px; border-radius: 10px;">
          <h1 style="text-align: center; color: #2c3e50;">Votre Bilan Hypnotique</h1>
          <p style="text-align: center;">Merci pour votre participation ! Voici votre résultat :</p>
          <h2 style="color: #2980b9;">${category}</h2>
          <p><strong>Sens dominant :</strong> ${senseDominant}</p>
          <div>${description}</div>
          <div>${getExerciseForScore(score)}</div>

          <div style="margin-top: 30px; text-align: center;">
            <img src="${alainZenattiImageUrl}" style="width: 100%; max-width: 500px; margin-bottom: 20px; border-radius: 8px;" alt="Alain Zenatti">
            <img src="${harmoniaImageUrl}" style="width: 100%; max-width: 500px; margin-bottom: 20px; border-radius: 8px;" alt="Harmonia">
            <img src="${hypnoBalladeImageUrl}" style="width: 100%; max-width: 500px; margin-bottom: 20px; border-radius: 8px;" alt="Hypno Balade">
          </div>

          <p style="text-align: center; color: #888; font-size: 14px;">© HypnoKick</p>
        </div>
      </body>
      </html>
    `;

    await resend.emails.send({
      from: "HypnoKick <hello@hypnokick.lovable.dev>",
      to: [email],
      subject: "Votre bilan hypnotique personnalisé",
      html: htmlContent,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: responseHeaders,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: corsHeaders,
    });
  }
});
