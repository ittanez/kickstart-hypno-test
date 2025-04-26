
export type Answer = {
  questionId: number;
  value: number;
};

/**
 * Calculates the hypnosis receptivity score based on the provided answers.
 * Score range: 24-120 points
 * 
 * Interpretation:
 * 24-48: Low receptivity to hypnosis
 * 49-72: Moderate receptivity to hypnosis
 * 73-96: High receptivity to hypnosis
 * 97-120: Very high receptivity to hypnosis
 */
export const calculateScore = (answers: Answer[]): {
  score: number;
  category: string;
  description: string;
} => {
  // Sum all answer values
  const totalScore = answers.reduce((sum, answer) => sum + answer.value, 0);
  
  // Determine category based on score range
  let category = "";
  let description = "";
  
  if (totalScore <= 30) {
    category = "Réceptivité émergente";
    description = "Vous êtes dans une phase d'exploration. Vous avez besoin de temps, de confiance, ou simplement d'un cadre plus adapté pour accéder à l'état d'hypnose. Vous possédez les ressources nécessaires pour vivre un état d'hypnose, mais elles ont peut-être besoin d'être apprivoisées en douceur. Il est possible que vous soyez très cérébral, analytique ou simplement prudent, ce qui est parfaitement légitime. Conseils : Commencez par des exercices simples d'auto-hypnose, sans pression de résultat. Préférez un accompagnement bienveillant, basé sur la relation de confiance. Laissez-vous le droit de ne \"rien ressentir\" au début : la réceptivité vient souvent en expérimentant sans attente. Un bon accompagnement permet souvent à la réceptivité d'émerger là où on ne l'attendait pas. Vous êtes sur le chemin. La graine est là. Il suffit parfois d'un cadre plus sécurisant ou d'un autre langage pour qu'elle s'ouvre.";
  } else if (totalScore >= 31 && totalScore <= 60) {
    category = "Réceptivité modérée et adaptative";
    description = "Vous avez une certaine sensibilité à l'état d'hypnose, surtout lorsque l'environnement est propice et que vous vous sentez en confiance. Vous entrez probablement déjà dans des états modifiés de conscience dans votre vie quotidienne : rêverie, absorption dans une musique, moment suspendu… Vous avez les prédispositions naturelles, mais vous pouvez encore développer votre réceptivité avec l'aide d'un accompagnement sur mesure. Conseils : La régularité favorise la profondeur des états hypnotiques. Apprenez à reconnaître les signes subtils de la transe (ralentissement, chaleur, sensation de flottement…). Explorez différents styles d'induction : certains répondent mieux à l'imaginaire, d'autres au corps ou à l'émotion. L'alliance avec l'hypnothérapeute joue un rôle clé dans l'approfondissement de votre expérience. Vous avez les clés. Il suffit maintenant d'ouvrir la bonne porte.";
  } else if (totalScore >= 61 && totalScore <= 90) {
    category = "Réceptivité naturelle et fluide";
    description = "Vous êtes naturellement réceptif aux suggestions et aux inductions hypnotiques. Votre esprit entre facilement dans des états modifiés de conscience. Vous êtes probablement sensible aux images mentales, à la musique, à la voix, ou aux émotions. Vous vous laissez guider aisément et pouvez vivre des expériences riches dès les premières séances. Cela ne veut pas dire que tout est facile, mais que vous disposez déjà d'un bon contact avec votre monde intérieur. Conseils : Expérimentez différentes approches (visualisation, réification, métaphores…). Apprenez à ancrer vos états de ressources pour les utiliser dans votre vie quotidienne. L'hypnose peut devenir pour vous un véritable outil de développement personnel, voire un art de vivre. Un accompagnement adapté peut vous aider à canaliser votre réceptivité vers des transformations concrètes. Vous êtes comme un instrument déjà accordé. Il ne reste qu'à jouer la bonne musique.";
  } else {
    category = "Réceptivité très élevée / Hypnotisabilité intuitive";
    description = "Vous entrez très rapidement en état d'hypnose. Votre imagination, vos ressentis et votre sensibilité sont de véritables leviers de transformation. Votre esprit est très réceptif. Vous plongez facilement dans des états profonds, vous ressentez fortement les suggestions et vivez des expériences intérieures très intenses. Vous êtes un excellent candidat à l'auto-hypnose et aux techniques avancées (régression, dissociation, activation symbolique...). Conseils : Pratiquez l'auto-hypnose avec structure et éthique : votre imagination est puissante, orientez-la avec discernement. Travaillez avec des hypnothérapeutes capables d'aller plus loin avec finesse. Utilisez votre réceptivité pour explorer des problématiques profondes, mais aussi pour cultiver des états de calme, de joie, de créativité. Intégrez des pratiques de recentrage si vos expériences sont très intenses. Vous êtes un voyageur des états de conscience. Prenez soin de choisir vos destinations.";
  }
  
  return {
    score: totalScore,
    category,
    description
  };
};
