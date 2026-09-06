import { describe, expect, it } from "vitest";
import { closeRange, ladder, ladderPrices, money, noDiscount, standingRange } from "./ladder";
import { secondChairCompare, secondChairTiers } from "./second-chair";
import { offer } from "./offer";

const EM = /\u2014/;
const NAMED = /toptal|turing|deloitte|mckinsey|accenture|pwc|ey\b/i;

function blob(value: unknown): string {
  return JSON.stringify(value);
}

describe("pricing ladder", () => {
  it("publishes six rungs in order, with no form required to see a price", () => {
    expect(ladder.map((rung) => rung.id)).toEqual([
      "read",
      "session",
      "check",
      "slice",
      "close",
      "standing",
    ]);
    expect(ladder.every((rung) => rung.price.length > 0 && rung.href.startsWith("/"))).toBe(
      true,
    );
  });

  it("keeps the Read free and the Session and Check credited", () => {
    expect(offer.read.price).toBe(0);
    expect(ladder[0]?.price).toBe("Free");
    expect(ladder[1]?.credit).toMatch(/credited/i);
    expect(ladder[2]?.credit).toMatch(/credited/i);
    expect(offer.session.price).toBe(ladderPrices.session);
    expect(offer.check.price).toBe(ladderPrices.check);
  });

  it("states the First Slice is a beginning", () => {
    expect(offer.slice.price).toBe(7500);
    expect(ladder[3]?.credit).toMatch(/beginning/i);
    expect(offer.slice.description).toMatch(/not a finish/i);
  });

  it("starts Standing at $900 and keeps the Close band", () => {
    expect(ladderPrices.standingMin).toBe(900);
    expect(standingRange).toBe("$900 to $6,000 per month");
    expect(closeRange).toBe("$18,000 to $95,000");
    expect(offer.standing.priceRange).toBe(standingRange);
    expect(offer.close.priceRange).toBe(closeRange);
  });

  it("states the no-discount line in plain words", () => {
    expect(noDiscount).toMatch(/same for everyone/i);
    expect(noDiscount).toMatch(/do not discount/i);
  });

  it("never names a competitor and never uses an em dash", () => {
    expect(blob(ladder)).not.toMatch(NAMED);
    expect(blob(ladder)).not.toMatch(EM);
    expect(noDiscount).not.toMatch(EM);
    expect(money(1500)).toBe("$1,500");
  });
});

describe("Second Chair pricing", () => {
  it("shows five tiers starting at $900, audit buyable alone", () => {
    expect(secondChairTiers.map((tier) => tier.id)).toEqual([
      "handover",
      "on-call",
      "second-chair",
      "team",
      "audit",
    ]);
    expect(secondChairTiers[1]?.price).toBe("$900 per month");
    expect(secondChairTiers[4]?.price).toBe("$4,000");
    expect(secondChairTiers[4]?.price).toContain("4,000");
    expect(secondChairTiers[4]?.body).toMatch(/no subscription/i);
  });

  it("concedes a comparison row and names no competitor", () => {
    expect(secondChairCompare.columns.join(" ")).not.toMatch(NAMED);
    expect(blob(secondChairCompare)).toMatch(/Sometimes/);
    expect(blob(secondChairCompare)).not.toMatch(NAMED);
    expect(blob(secondChairTiers)).not.toMatch(EM);
  });
});
