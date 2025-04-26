
export type VAKOGQuestion = {
  id: string;
  text: string;
  type: 'V' | 'A' | 'K' | 'O' | 'G';
};

export const vakogQuestions: VAKOGQuestion[] = [
  {
    id: "v1",
    text: "Lorsque vous apprenez quelque chose de nouveau, préférez-vous voir des images ou des schémas ?",
    type: "V"
  },
  {
    id: "a1",
    text: "Êtes-vous particulièrement sensible aux sons et à la musique ?",
    type: "A"
  },
  {
    id: "k1",
    text: "Appréciez-vous particulièrement les sensations physiques comme le toucher ou le mouvement ?",
    type: "K"
  },
  {
    id: "o1",
    text: "Les odeurs évoquent-elles facilement des souvenirs ou des émotions chez vous ?",
    type: "O"
  },
  {
    id: "g1",
    text: "Êtes-vous sensible aux saveurs et aux expériences gustatives ?",
    type: "G"
  }
];

export type VAKOGAnswer = {
  questionId: string;
  value: number;
};

export const calculateDominantSense = (answers: VAKOGAnswer[]): string => {
  const scores = {
    V: 0,
    A: 0,
    K: 0,
    O: 0,
    G: 0
  };

  answers.forEach(answer => {
    const question = vakogQuestions.find(q => q.id === answer.questionId);
    if (question) {
      scores[question.type] += answer.value;
    }
  });

  let dominantSense = 'V';
  let maxScore = scores.V;

  Object.entries(scores).forEach(([sense, score]) => {
    if (score > maxScore) {
      maxScore = score;
      dominantSense = sense;
    }
  });

  const senseMap = {
    V: "Visuel",
    A: "Auditif",
    K: "Kinesthésique",
    O: "Olfactif",
    G: "Gustatif"
  };

  return senseMap[dominantSense as keyof typeof senseMap];
};
