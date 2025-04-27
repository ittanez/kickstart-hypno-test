
export type Question = {
  id: number;
  text: string;
  options: {
    value: number;
    text: string;
  }[];
};

// Réduit à 20 questions sur la réceptivité à l'hypnose
export const questions: Question[] = [
  {
    id: 1,
    text: "Je suis capable de me concentrer profondément sur une tâche sans être facilement distrait(e).",
    options: [
      { value: 1, text: "Pas du tout d'accord" },
      { value: 2, text: "Plutôt pas d'accord" },
      { value: 3, text: "Neutre" },
      { value: 4, text: "Plutôt d'accord" },
      { value: 5, text: "Tout à fait d'accord" }
    ]
  },
  {
    id: 2,
    text: "Je peux facilement me perdre dans un bon livre ou un film.",
    options: [
      { value: 1, text: "Pas du tout d'accord" },
      { value: 2, text: "Plutôt pas d'accord" },
      { value: 3, text: "Neutre" },
      { value: 4, text: "Plutôt d'accord" },
      { value: 5, text: "Tout à fait d'accord" }
    ]
  },
  {
    id: 3,
    text: "J'ai souvent des rêves très vivaces et détaillés.",
    options: [
      { value: 1, text: "Pas du tout d'accord" },
      { value: 2, text: "Plutôt pas d'accord" },
      { value: 3, text: "Neutre" },
      { value: 4, text: "Plutôt d'accord" },
      { value: 5, text: "Tout à fait d'accord" }
    ]
  },
  {
    id: 4,
    text: "Je suis capable de visualiser des scènes ou des objets avec beaucoup de détails dans mon esprit.",
    options: [
      { value: 1, text: "Pas du tout d'accord" },
      { value: 2, text: "Plutôt pas d'accord" },
      { value: 3, text: "Neutre" },
      { value: 4, text: "Plutôt d'accord" },
      { value: 5, text: "Tout à fait d'accord" }
    ]
  },
  {
    id: 5,
    text: "Je suis généralement ouvert(e) aux nouvelles expériences.",
    options: [
      { value: 1, text: "Pas du tout d'accord" },
      { value: 2, text: "Plutôt pas d'accord" },
      { value: 3, text: "Neutre" },
      { value: 4, text: "Plutôt d'accord" },
      { value: 5, text: "Tout à fait d'accord" }
    ]
  },
  {
    id: 6,
    text: "Je fais confiance facilement aux autres lorsqu'ils me guident.",
    options: [
      { value: 1, text: "Pas du tout d'accord" },
      { value: 2, text: "Plutôt pas d'accord" },
      { value: 3, text: "Neutre" },
      { value: 4, text: "Plutôt d'accord" },
      { value: 5, text: "Tout à fait d'accord" }
    ]
  },
  {
    id: 7,
    text: "Je me laisse souvent emporter par la musique que j'écoute.",
    options: [
      { value: 1, text: "Pas du tout d'accord" },
      { value: 2, text: "Plutôt pas d'accord" },
      { value: 3, text: "Neutre" },
      { value: 4, text: "Plutôt d'accord" },
      { value: 5, text: "Tout à fait d'accord" }
    ]
  },
  {
    id: 8,
    text: "Je peux facilement modifier mon état d'esprit selon la situation.",
    options: [
      { value: 1, text: "Pas du tout d'accord" },
      { value: 2, text: "Plutôt pas d'accord" },
      { value: 3, text: "Neutre" },
      { value: 4, text: "Plutôt d'accord" },
      { value: 5, text: "Tout à fait d'accord" }
    ]
  },
  {
    id: 9,
    text: "Dans certaines situations, je perds la notion du temps.",
    options: [
      { value: 1, text: "Pas du tout d'accord" },
      { value: 2, text: "Plutôt pas d'accord" },
      { value: 3, text: "Neutre" },
      { value: 4, text: "Plutôt d'accord" },
      { value: 5, text: "Tout à fait d'accord" }
    ]
  },
  {
    id: 10,
    text: "Je ressens souvent profondément les émotions suggérées par un film ou une histoire.",
    options: [
      { value: 1, text: "Pas du tout d'accord" },
      { value: 2, text: "Plutôt pas d'accord" },
      { value: 3, text: "Neutre" },
      { value: 4, text: "Plutôt d'accord" },
      { value: 5, text: "Tout à fait d'accord" }
    ]
  },
  {
    id: 11,
    text: "Je suis capable de me détendre profondément lorsque je le souhaite.",
    options: [
      { value: 1, text: "Pas du tout d'accord" },
      { value: 2, text: "Plutôt pas d'accord" },
      { value: 3, text: "Neutre" },
      { value: 4, text: "Plutôt d'accord" },
      { value: 5, text: "Tout à fait d'accord" }
    ]
  },
  {
    id: 12,
    text: "Je me souviens facilement de sensations physiques spécifiques.",
    options: [
      { value: 1, text: "Pas du tout d'accord" },
      { value: 2, text: "Plutôt pas d'accord" },
      { value: 3, text: "Neutre" },
      { value: 4, text: "Plutôt d'accord" },
      { value: 5, text: "Tout à fait d'accord" }
    ]
  },
  {
    id: 13,
    text: "Je peux facilement faire abstraction des distractions extérieures.",
    options: [
      { value: 1, text: "Pas du tout d'accord" },
      { value: 2, text: "Plutôt pas d'accord" },
      { value: 3, text: "Neutre" },
      { value: 4, text: "Plutôt d'accord" },
      { value: 5, text: "Tout à fait d'accord" }
    ]
  },
  {
    id: 14,
    text: "J'aime explorer mes pensées et sensations intérieures.",
    options: [
      { value: 1, text: "Pas du tout d'accord" },
      { value: 2, text: "Plutôt pas d'accord" },
      { value: 3, text: "Neutre" },
      { value: 4, text: "Plutôt d'accord" },
      { value: 5, text: "Tout à fait d'accord" }
    ]
  },
  {
    id: 15,
    text: "Je crois que notre esprit peut influencer notre corps de manière significative.",
    options: [
      { value: 1, text: "Pas du tout d'accord" },
      { value: 2, text: "Plutôt pas d'accord" },
      { value: 3, text: "Neutre" },
      { value: 4, text: "Plutôt d'accord" },
      { value: 5, text: "Tout à fait d'accord" }
    ]
  },
  {
    id: 16,
    text: "Je peux facilement suivre des instructions étape par étape.",
    options: [
      { value: 1, text: "Pas du tout d'accord" },
      { value: 2, text: "Plutôt pas d'accord" },
      { value: 3, text: "Neutre" },
      { value: 4, text: "Plutôt d'accord" },
      { value: 5, text: "Tout à fait d'accord" }
    ]
  },
  {
    id: 17,
    text: "J'ai déjà vécu des moments où je me sentais complètement absorbé(e) par une activité.",
    options: [
      { value: 1, text: "Pas du tout d'accord" },
      { value: 2, text: "Plutôt pas d'accord" },
      { value: 3, text: "Neutre" },
      { value: 4, text: "Plutôt d'accord" },
      { value: 5, text: "Tout à fait d'accord" }
    ]
  },
  {
    id: 18,
    text: "Je m'adapte facilement à différentes méthodes de relaxation.",
    options: [
      { value: 1, text: "Pas du tout d'accord" },
      { value: 2, text: "Plutôt pas d'accord" },
      { value: 3, text: "Neutre" },
      { value: 4, text: "Plutôt d'accord" },
      { value: 5, text: "Tout à fait d'accord" }
    ]
  },
  {
    id: 19,
    text: "J'aime les expériences qui sollicitent mon imagination.",
    options: [
      { value: 1, text: "Pas du tout d'accord" },
      { value: 2, text: "Plutôt pas d'accord" },
      { value: 3, text: "Neutre" },
      { value: 4, text: "Plutôt d'accord" },
      { value: 5, text: "Tout à fait d'accord" }
    ]
  },
  {
    id: 20,
    text: "Je fais confiance à mon intuition.",
    options: [
      { value: 1, text: "Pas du tout d'accord" },
      { value: 2, text: "Plutôt pas d'accord" },
      { value: 3, text: "Neutre" },
      { value: 4, text: "Plutôt d'accord" },
      { value: 5, text: "Tout à fait d'accord" }
    ]
  }
];
