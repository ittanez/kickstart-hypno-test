
export const getExerciseForScore = (score: number): string => {
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
