import { describe, expect, it } from "vitest";
import {
  aboutBeliefs,
  aboutCrewLine,
  aboutNot,
  aboutOrigin,
  aboutStart,
  aboutWhat,
  aboutWhere,
  admittedCount,
} from "./about";
import { specialists } from "./specialists";

const EM = /\u2014/;
const NAMED = /toptal|turing|deloitte|mckinsey|accenture|pwc|ey\b/i;

function blob(value: unknown) {
  return JSON.stringify(value);
}

function words(value: string) {
  return value.trim().split(/\s+/).length;
}

describe("about page copy", () => {
  it("says Lahore in the first sentence", () => {
    expect(aboutWhat.heading).toMatch(/Lahore/);
    expect(`${aboutWhat.heading} ${aboutWhat.dek}`).toMatch(/Lahore/);
  });

  it("keeps the opening dek under sixty words", () => {
    expect(words(aboutWhat.dek)).toBeLessThan(60);
    expect(words(aboutWhat.heading)).toBeLessThan(8);
  });

  it("keeps the founder note under 150 words and first person", () => {
    const text = aboutOrigin.body.join(" ");
    expect(words(text)).toBeLessThan(150);
    expect(text.startsWith("I ")).toBe(true);
  });

  it("links every belief to something checkable", () => {
    expect(aboutBeliefs).toHaveLength(4);
    for (const belief of aboutBeliefs) {
      expect(belief.href.startsWith("/")).toBe(true);
      expect(belief.proof.length).toBeGreaterThan(20);
    }
    expect(aboutBeliefs[0]?.href).toBe("/work/deepidv");
    expect(aboutBeliefs[0]?.proof).not.toMatch(/six weeks/i);
    expect(aboutBeliefs[2]?.href).toBe("/demo/handover");
  });

  it("does not invent a gate date or a six-week DeepIDV claim", () => {
    expect(blob({ aboutWhat, aboutBeliefs, aboutOrigin, aboutWhere })).not.toMatch(
      /six weeks|Gate 4 · \d|cleared on/i,
    );
  });

  it("states we are not the cheapest, unhedged", () => {
    expect(aboutNot[2]).toMatch(/We are not the cheapest/);
    expect(aboutNot[2]).toMatch(/\$15 an hour/);
  });

  it("counts the published bench", () => {
    expect(admittedCount).toBe(specialists.length);
    expect(admittedCount).toBe(12);
    expect(aboutCrewLine).toMatch(/Twelve admitted/);
    expect(aboutCrewLine).toMatch(/\/standard|standard is published/);
  });

  it("answers the finance questions without a US time error", () => {
    expect(aboutWhere[0]?.fact).toMatch(/Lahore/);
    expect(aboutWhere[2]?.fact).toBe("UTC+5");
    expect(aboutWhere[2]?.note).toMatch(/nine to thirteen hours ahead of US time/);
    expect(aboutWhere[5]?.fact).toMatch(/W-8BEN/);
  });

  it("starts at the Read and names no competitor", () => {
    expect(aboutStart.href).toBe("/read");
    expect(blob({ aboutWhat, aboutBeliefs, aboutNot, aboutStart })).not.toMatch(NAMED);
    expect(blob({ aboutWhat, aboutBeliefs, aboutOrigin, aboutNot, aboutWhere })).not.toMatch(EM);
  });
});
