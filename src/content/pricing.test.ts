import { describe, expect, it } from "vitest";
import { ladder, noDiscount } from "./ladder";
import {
  pricingExcluded,
  pricingIncluded,
  pricingLadder,
  pricingMatchesLadder,
  pricingQuestions,
  pricingRoute,
  pricingRule,
  pricingStart,
} from "./pricing";

const EM = /\u2014/;
const NAMED = /toptal|turing|deloitte|mckinsey|accenture|pwc|\bey\b/i;

function blob(value: unknown) {
  return JSON.stringify(value);
}

describe("pricing page copy", () => {
  it("publishes all six rungs with no form to see them", () => {
    expect(pricingLadder.map((rung) => rung.id)).toEqual(ladder.map((rung) => rung.id));
    expect(pricingMatchesLadder).toBe(true);
    expect(pricingLadder.every((rung) => rung.price.length > 0 && rung.href.startsWith("/"))).toBe(
      true,
    );
  });

  it("states the no-discount rule", () => {
    expect(pricingRule.statement).toBe(noDiscount);
    expect(pricingRule.statement).toMatch(/same for everyone/);
  });

  it("routes every row to a published rung", () => {
    expect(pricingRoute).toHaveLength(6);
    for (const row of pricingRoute) {
      expect(pricingLadder.some((rung) => rung.href === row.href && rung.name === row.start)).toBe(
        true,
      );
    }
  });

  it("lists what is not included, specifically", () => {
    expect(pricingExcluded[0]?.title).toBe("Design");
    expect(pricingExcluded[1]?.body).toMatch(/eight people/);
    expect(pricingExcluded[2]?.body).toMatch(/The Read is where free ends/);
    expect(pricingIncluded.note).toMatch(/upsell/i);
  });

  it("answers EU price, credit, and the US-studio question without naming a firm", () => {
    expect(pricingQuestions.some((item) => item.q.includes("EU"))).toBe(true);
    expect(pricingQuestions.find((item) => item.q.includes("EU"))?.a).toMatch(/No\./);
    expect(pricingQuestions.some((item) => /credited/i.test(item.q))).toBe(true);
    expect(pricingStart.href).toBe("/read");
    expect(blob({ pricingLadder, pricingQuestions, pricingRule })).not.toMatch(NAMED);
    expect(blob({ pricingLadder, pricingQuestions, pricingExcluded, pricingRule })).not.toMatch(EM);
  });
});
