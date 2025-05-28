
import { supabaseUrl } from './config.ts';
import { getExerciseForScore } from './exercises.ts';

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
        <title>Résultats du test de réceptivité à l'hypnose</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div class="container" style="background-color: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); padding: 30px; margin-bottom: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <a href="https://hypnokick.novahypnose.fr" style="text-decoration: none; color: inherit;">
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
        
        <!-- LES 3 IMAGES EN BAS DU MAIL -->
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

        <!-- IMAGE ALAIN ZENATTI -->
        <div style="text-align: center; margin: 30px 0;">
            <img src="${alainZenattiImageUrl}" 
                 alt="Alain Zenatti - Hypnothérapeute à Paris"
                 style="width: 200px;   height: auto; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); display: block; margin: 0 auto;">
        </div>

        <!-- IMAGE FORMATION HARMONIA -->
        <div style="text-align: center; margin: 30px 0;">
            <a href="https://harmonia.novahypnose.fr/" target="_blank">
                <img src="${harmoniaImageUrl}" 
                     alt="Formation Harmonia - Réduire le stress avec l'auto-hypnose"
                     style="width: 200px;   height: auto; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); display: block; margin: 0 auto;">
            </a>
        </div>

        <!-- IMAGE HYPNO-BALADE DU PERCHE -->
        <div style="text-align: center; margin: 30px 0;">
            <a href="https://novahypnose.fr/hypno-balade/" target="_blank">
                <img src="${hypnoBalladeImageUrl}" 
                     alt="Hypno-Balade du Perche"
                     style="width: 200px;   height: auto; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); display: block; margin: 0 auto;">
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
            
            <!-- VERSION DE L'EMAIL POUR DEBUG -->
            <p style="font-size: 10px; color: #ccc; margin-top: 20px;">
                Version: ${new Date().toISOString()} | Score: ${score}
            </p>
        </div>
    </body>
    </html>
  `;
};
