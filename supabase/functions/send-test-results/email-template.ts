
import { supabaseUrl } from './config.ts';
import { getExerciseForScore } from './exercises.ts';

const getScoreIntro = (score: number): string => {
  if (score >= 85) {
    return `<div style="background-color: #e8f5e9; border-left: 4px solid #27ae60; padding: 18px 20px; margin: 25px 0; border-radius: 0 8px 8px 0;">
        <p style="margin: 0; color: #1a5c2a; font-size: 15px; line-height: 1.6;">
          <strong>Votre score est exceptionnel.</strong> Vous faites partie des personnes les plus réceptives à l'hypnose thérapeutique — ce qui signifie que les résultats peuvent être rapides et profonds. Si vous avez une problématique en tête, c'est le bon moment pour passer à l'action.
        </p>
      </div>`;
  } else if (score >= 60) {
    return `<div style="background-color: #e3f2fd; border-left: 4px solid #3498db; padding: 18px 20px; margin: 25px 0; border-radius: 0 8px 8px 0;">
        <p style="margin: 0; color: #1a3a5c; font-size: 15px; line-height: 1.6;">
          <strong>Votre profil est très encourageant.</strong> Vous montrez une belle ouverture à l'hypnose. Beaucoup de personnes avec un profil similaire au vôtre ont obtenu des changements durables dès les premières séances.
        </p>
      </div>`;
  } else {
    return `<div style="background-color: #f5f9fc; border-left: 4px solid #95a5a6; padding: 18px 20px; margin: 25px 0; border-radius: 0 8px 8px 0;">
        <p style="margin: 0; color: #555; font-size: 15px; line-height: 1.6;">
          Merci d'avoir pris le temps de réaliser ce test. C'est une première étape importante — la réceptivité hypnotique est une compétence qui se développe, et chaque personne a sa propre porte d'entrée vers le changement.
        </p>
      </div>`;
  }
};

const getScoreTestimonial = (score: number): string => {
  if (score >= 85) {
    return `« Mon entretien découverte avec Alain a tout changé. En 30 minutes, j'ai compris ce qui me bloquait depuis des années. J'ai pris rendez-vous dès le lendemain. » — Camille R., Paris`;
  } else if (score >= 60) {
    return `« Je ne pensais pas que l'hypnose pouvait m'aider. Après mon entretien découverte avec Alain, j'ai compris que c'était exactement ce dont j'avais besoin. » — Sophie M., Paris`;
  } else {
    return `« J'étais sceptique au départ. L'entretien découverte gratuit m'a permis de poser toutes mes questions sans pression. Alain a su me mettre à l'aise immédiatement. » — Thomas B., Paris`;
  }
};

const getUrgencyText = (score: number): string => {
  if (score >= 85) {
    return `Avec un profil comme le vôtre, les places se réservent vite. Je ne propose que quelques entretiens par semaine.`;
  } else {
    return `Je réserve quelques créneaux par semaine pour ces entretiens — les places sont limitées.`;
  }
};

export const generateEmailContent = (
  score: number,
  category: string,
  description: string,
  senseDominant: string,
  alainZenattiImageUrl: string,
  harmoniaImageUrl: string,
  hypnoBalladeImageUrl: string
): string => {
  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Votre bilan hypnotique personnalisé</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <!-- PREHEADER TEXT (visible dans la boîte de réception) -->
        <div style="display:none;font-size:1px;color:#f9f9f9;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
            Votre sens dominant est ${senseDominant} - découvrez votre potentiel hypnotique et un exercice personnalisé
        </div>

        <div class="container" style="background-color: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); padding: 30px; margin-bottom: 20px;">
            <!-- En-tête avec lien Nova Hypnose -->
            <div style="text-align: center; margin-bottom: 15px; padding: 10px 0;">
              <a href="https://www.novahypnose.fr?utm_source=email&utm_medium=hypnokick&utm_campaign=resultats" target="_blank" style="text-decoration: none; color: #3498db; font-size: 14px;">
                novahypnose.fr
              </a>
            </div>

            <div style="text-align: center; margin-bottom: 30px;">
              <a href="https://hypnokick.novahypnose.fr?utm_source=email&utm_medium=hypnokick&utm_campaign=resultats" style="text-decoration: none; color: inherit;">
                <span style="color: #3498db;">Hypno</span><span style="color: #e74c3c;">Kick</span>
              </a>
            </div>

            <h1 style="text-align: center; margin-bottom: 30px; font-size: 26px; border-bottom: 2px solid #3498db; padding-bottom: 10px; color: #2c3e50;">Voici votre bilan hypnotique personnalisé</h1>

            ${getScoreIntro(score)}

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

            <div style="background-color: #f5f9fc; padding: 20px; border-radius: 8px; margin: 30px 0;">
              <h2 style="color: #2c3e50; margin-top: 0;">Votre superpouvoir hypnotique, un potentiel illimité qui grandit avec vous</h2>
              <p style="color: #555; line-height: 1.7;">Votre capacité hypnotique n'est pas figée – elle fluctue selon votre état physique, émotionnel et votre environnement. Cette variabilité est une force ! Elle signifie que vous pouvez développer ce potentiel avec de la pratique, comme un muscle qui se renforce. L'hypnose thérapeutique vous permet d'accéder à des ressources insoupçonnées et de créer des changements précis et durables dans votre vie, qu'il s'agisse de dépasser des peurs, renforcer votre confiance, ou transformer des habitudes. Chaque personne possède sa propre porte d'entrée vers ces états de conscience modifiés – découvrir la vôtre est le premier pas vers une vie plus alignée avec vos aspirations profondes.</p>
            </div>

            <div style="background-color: #f5f9fc; padding: 20px; border-radius: 8px; margin: 30px 0;">
              <h2 style="text-align: center; color: #2c3e50; margin-top: 0; margin-bottom: 20px;">Votre hypnothérapeute à Paris Le Marais Bastille</h2>

              <p>Je suis Alain Zenatti, hypnothérapeute à Paris, spécialisé en hypnose ericksonienne et en auto-hypnose.</p>

              <p>Depuis plusieurs années, j'aide les personnes à retrouver confiance, équilibre et clarté intérieure grâce à des séances d'hypnose sur mesure, toujours bienveillantes et respectueuses du rythme de chacun.</p>

              <p>Si vous ressentez l'envie d'aller plus loin, d'approfondir votre réceptivité, ou tout simplement de vivre une première séance d'hypnose à Paris, je serai heureux de vous guider pas à pas dans ce chemin.</p>

              <!-- CTA PRINCIPAL : ENTRETIEN DÉCOUVERTE -->
              <div style="background-color: #eaf6ff; border: 2px solid #3498db; border-radius: 8px; padding: 25px; margin: 25px 0; text-align: center;">
                  <p style="font-size: 17px; color: #2c3e50; margin-top: 0;">
                      <strong>Je propose un entretien découverte de 30 minutes, gratuit et sans engagement</strong>, pour voir si l'hypnose peut vous aider.
                  </p>
                  <p style="font-size: 13px; color: #666; margin-bottom: 15px; font-style: italic;">
                      ${getUrgencyText(score)}
                  </p>
                  <a href="https://calendly.com/zenatti/rdvtelephonique?utm_source=email&utm_medium=hypnokick&utm_campaign=resultats"
                     target="_blank"
                     style="display: inline-block; background-color: #27ae60; color: white; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 16px;">
                      Réserver mon entretien découverte gratuit
                  </a>
                  <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #d0e6f6;">
                      <p style="font-size: 13px; color: #555; font-style: italic; margin: 0;">
                          ${getScoreTestimonial(score)}
                      </p>
                  </div>
              </div>

              <div style="text-align: center; margin: 20px 0;">
                  <p><strong>Contactez votre hypnothérapeute à Paris :</strong></p>
                  <p><a href="mailto:contact@novahypnose.fr" style="color: #3498db; text-decoration: none;">contact@novahypnose.fr</a></p>
                  <p><a href="https://www.novahypnose.fr?utm_source=email&utm_medium=hypnokick&utm_campaign=resultats" target="_blank" style="color: #3498db; text-decoration: none;">www.novahypnose.fr</a></p>
                  <p><a href="tel:0649358089" style="color: #3498db; text-decoration: none;">06 49 35 80 89</a></p>
                  <p style="margin-top: 10px;"><a href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris?utm_source=email&utm_medium=hypnokick&utm_campaign=resultats"
                     target="_blank" style="color: #3498db; text-decoration: none; font-size: 13px;">Voir les disponibilités sur Resalib</a></p>
              </div>
            </div>
        </div>

        <!-- NOVA RESPIRE APP PROMOTION -->
        <div style="background-color: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); padding: 30px; margin: 20px 0; text-align: center;">
            <h3 style="color: #2c3e50; margin-top: 0; margin-bottom: 20px; font-size: 20px;">NovaRespire - Votre compagnon anti-stress au quotidien</h3>

            <p style="color: #666; margin-bottom: 25px; line-height: 1.6;">
                Découvrez NovaRespire, l'application créée par Alain Zenatti. Des techniques de relaxation guidées pour gérer le stress, améliorer le sommeil, renforcer la confiance et cultiver votre bien-être au quotidien.
            </p>

            <div style="margin: 20px 0;">
                <a href="https://play.google.com/store/apps/details?id=com.novahypnose.novarespire&pcampaignid=web_share&utm_source=email&utm_medium=hypnokick&utm_campaign=resultats"
                   target="_blank"
                   style="display: inline-block; text-decoration: none;">
                    <img src="https://play.google.com/intl/en_us/badges/static/images/badges/fr_badge_web_generic.png"
                         alt="Disponible sur Google Play"
                         style="height: 60px; width: auto;">
                </a>
            </div>
        </div>

        <!-- SÉANCE HYPNOSE EN IMAGE -->
        <div style="text-align: center; margin: 20px 0;">
            <a href="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/SEANCEHYPNOSE.webp"
               target="_blank"
               style="text-decoration: none; color: #3498db; font-size: 14px;">
                → À quoi ressemble une séance d'hypnose en image
            </a>
        </div>

        <!-- RÉSEAUX SOCIAUX -->
        <table style="margin: 20px auto; border-collapse: collapse;">
          <tr>
            <td style="padding: 0 16px; text-align: center; vertical-align: middle;">
              <a href="https://www.instagram.com/novahypnose/" target="_blank"
                 style="text-decoration: none; color: #333; font-size: 14px;">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png"
                     alt="Instagram" style="width: 22px; height: 22px; vertical-align: middle; margin-right: 6px;">
                Suivez Nova Hypnose sur Instagram
              </a>
            </td>
            <td style="padding: 0 16px; text-align: center; vertical-align: middle; border-left: 1px solid #ddd;">
              <a href="https://www.linkedin.com/in/zenatti/?utm_source=email&utm_medium=hypnokick&utm_campaign=resultats"
                 target="_blank" style="text-decoration: none; color: #333; font-size: 14px;">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/800px-LinkedIn_logo_initials.png"
                     alt="LinkedIn" style="width: 22px; height: 22px; vertical-align: middle; margin-right: 6px; border-radius: 4px;">
                Retrouvez Alain sur LinkedIn
              </a>
            </td>
          </tr>
        </table>

        <!-- FOOTER -->
        <div style="font-size: 12px; color: #7f8c8d; text-align: center; margin-top: 40px; padding-top: 10px; border-top: 1px solid #ddd;">
            <p>
                <a href="https://novahypnose.fr/mentions-legales/" style="color: #3498db; text-decoration: none;">Mentions légales</a> |
                <a href="https://novahypnose.fr/politique-de-confidentialite/" style="color: #3498db; text-decoration: none;">Politique de confidentialité</a> |
                <a href="mailto:contact@novahypnose.fr?subject=D%C3%A9sinscription%20emails%20HypnoKick" style="color: #3498db; text-decoration: none;">Se désinscrire</a>
            </p>

            <p style="background-color: #fff8e1; padding: 10px; border-radius: 5px; border-left: 3px solid #ffc107; margin: 15px 0; font-size: 13px;">
                Rappel important : L'hypnothérapie est une approche complémentaire qui ne remplace en aucun cas une consultation médicale
                ou un traitement prescrit par un professionnel de santé. En cas de problème de santé, consultez toujours votre médecin.
            </p>

            <p style="color: #bbb; font-size: 11px; margin-top: 10px;">
                Vous recevez cet email car vous avez réalisé le test HypnoKick sur hypnokick.novahypnose.fr
            </p>
        </div>
    </body>
    </html>
  `;
};
