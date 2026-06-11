import { describe, it, expect } from "vitest";
import {
  calculateDominantSense,
  vakogQuestions,
  type VAKOGAnswer,
} from "../vakogQuestions";

describe("vakogQuestions", () => {
  it("contient 2 questions par sens (10 au total)", () => {
    expect(vakogQuestions).toHaveLength(10);
    for (const type of ["V", "A", "K", "O", "G"] as const) {
      expect(vakogQuestions.filter((q) => q.type === type)).toHaveLength(2);
    }
  });
});

describe("calculateDominantSense", () => {
  const answersFavoring = (type: string, strong = 5, weak = 1): VAKOGAnswer[] =>
    vakogQuestions.map((q) => ({
      questionId: q.id,
      value: q.type === type ? strong : weak,
    }));

  it.each([
    ["V", "Visuel"],
    ["A", "Auditif"],
    ["K", "Kinesthésique"],
    ["O", "Olfactif"],
    ["G", "Gustatif"],
  ])("détecte le sens dominant %s → %s", (type, expected) => {
    expect(calculateDominantSense(answersFavoring(type))).toBe(expected);
  });

  it("retourne Visuel par défaut en cas d'égalité parfaite", () => {
    const answers = vakogQuestions.map((q) => ({
      questionId: q.id,
      value: 3,
    }));
    expect(calculateDominantSense(answers)).toBe("Visuel");
  });

  it("ignore les réponses dont l'identifiant est inconnu", () => {
    const answers: VAKOGAnswer[] = [
      { questionId: "inconnu", value: 5 },
      { questionId: "a1", value: 4 },
    ];
    expect(calculateDominantSense(answers)).toBe("Auditif");
  });
});
