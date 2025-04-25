
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
  
  if (totalScore >= 24 && totalScore <= 48) {
    category = "Faible réceptivité";
    description = "Votre réceptivité à l'hypnose semble être relativement faible. Cela ne signifie pas que l'hypnose ne fonctionnera pas pour vous, mais que vous pourriez avoir besoin de plus de séances et d'un hypnothérapeute expérimenté pour observer des résultats.";
  } else if (totalScore >= 49 && totalScore <= 72) {
    category = "Réceptivité modérée";
    description = "Votre réceptivité à l'hypnose est modérée. Avec un peu de pratique et un hypnothérapeute compétent, vous pourriez probablement expérimenter des états hypnotiques légers à modérés et en tirer des bénéfices.";
  } else if (totalScore >= 73 && totalScore <= 96) {
    category = "Réceptivité élevée";
    description = "Votre réceptivité à l'hypnose est élevée. Vous avez probablement de bonnes capacités de concentration et d'imagination qui vous permettent d'entrer facilement dans un état hypnotique.";
  } else {
    category = "Réceptivité très élevée";
    description = "Votre réceptivité à l'hypnose est très élevée. Vous avez probablement d'excellentes capacités naturelles pour entrer dans des états de transe profonds et pouvez en tirer des bénéfices significatifs.";
  }
  
  return {
    score: totalScore,
    category,
    description
  };
};
