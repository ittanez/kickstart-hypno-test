import { describe, it, expect } from "vitest";
import { calculateScore, type Answer } from "../calculateScore";

const answersWithTotal = (total: number): Answer[] => [
  { questionId: 1, value: total },
];

describe("calculateScore", () => {
  it("additionne les valeurs de toutes les réponses", () => {
    const answers: Answer[] = [
      { questionId: 1, value: 3 },
      { questionId: 2, value: 5 },
      { questionId: 3, value: 1 },
    ];
    expect(calculateScore(answers).score).toBe(9);
  });

  it("retourne un score minimal de 21 avec 21 réponses à 1", () => {
    const answers: Answer[] = Array.from({ length: 21 }, (_, i) => ({
      questionId: i + 1,
      value: 1,
    }));
    const result = calculateScore(answers);
    expect(result.score).toBe(21);
    expect(result.category).toBe("Réceptivité émergente");
  });

  it("retourne un score maximal de 105 avec 21 réponses à 5", () => {
    const answers: Answer[] = Array.from({ length: 21 }, (_, i) => ({
      questionId: i + 1,
      value: 5,
    }));
    const result = calculateScore(answers);
    expect(result.score).toBe(105);
    expect(result.category).toBe(
      "Réceptivité très élevée / Hypnotisabilité intuitive"
    );
  });

  describe("frontières de catégories", () => {
    it.each([
      [30, "Réceptivité émergente"],
      [31, "Réceptivité modérée et adaptative"],
      [60, "Réceptivité modérée et adaptative"],
      [61, "Réceptivité naturelle et fluide"],
      [90, "Réceptivité naturelle et fluide"],
      [91, "Réceptivité très élevée / Hypnotisabilité intuitive"],
    ])("score %i → %s", (total, expectedCategory) => {
      expect(calculateScore(answersWithTotal(total)).category).toBe(
        expectedCategory
      );
    });
  });

  it("fournit toujours une description non vide", () => {
    for (const total of [21, 45, 75, 100]) {
      expect(
        calculateScore(answersWithTotal(total)).description.length
      ).toBeGreaterThan(0);
    }
  });
});
