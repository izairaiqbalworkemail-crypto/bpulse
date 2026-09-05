import { describe, expect, it } from "vitest";
import { lots } from "@/content/lots";
import { LOT_PATTERNS } from "@/content/read-patterns";
import { generateRead } from "./generate";

const PAYROLL = {
  product: "An eight-month payroll build",
  stage: "staging",
  shipWound:
    "We've never deployed to production and nobody left knows how the auth was wired.",
  duration: "months",
  whoBuilt: "left",
  whoBuiltNote: "The developer who wired the auth has left.",
  docsLeft: "Nothing written down.",
  deadline: "Board meeting in five weeks.",
  name: "Sam",
  email: "sam@northline.test",
};

const SCORE_RE =
  /\b(\d{1,3}%|score|severity rating|severity:|confidence:)\b/i;

describe("preliminary read", () => {
  it("quotes their own words", () => {
    const read = generateRead(PAYROLL, "00000000-0000-4000-8000-000000000001");
    expect(read.told).toContain("eight-month payroll");
    expect(read.told).toContain("never deployed");
    expect(read.told).toContain("five weeks");
  });

  it("grounds a staging pattern in real lots only", () => {
    const read = generateRead(PAYROLL, "00000000-0000-4000-8000-000000000001");
    expect(read.pattern).not.toBeNull();
    expect(LOT_PATTERNS.beforeProduction).toContain(read.pattern?.lotSlug);
    expect(lots.some((lot) => lot.slug === read.pattern?.lotSlug)).toBe(true);
    expect(read.pattern?.of).toBe(lots.length);
    expect(read.pattern?.count).toBe(LOT_PATTERNS.beforeProduction.length);
  });

  it("omits the pattern when no lot matches", () => {
    const read = generateRead(
      {
        product: "A paper process we have not software'd",
        stage: "",
        shipWound: "We have not started.",
        duration: "weeks",
        whoBuilt: "still-here",
        deadline: "None",
        name: "Sam",
        email: "sam@test.com",
      },
      "00000000-0000-4000-8000-000000000002",
    );
    expect(read.pattern).toBeNull();
  });

  it("carries what this isn't at full weight", () => {
    const read = generateRead(PAYROLL, "00000000-0000-4000-8000-000000000001");
    expect(read.limits).toMatch(/haven't seen your code/i);
    expect(read.checkLine).toMatch(/\$1,500/);
  });

  it("never invents a score, percentage, or severity", () => {
    const read = generateRead(PAYROLL, "00000000-0000-4000-8000-000000000001");
    const blob = JSON.stringify(read);
    expect(blob).not.toMatch(SCORE_RE);
  });

  it("look-first stays questions, not a diagnosis of unseen code", () => {
    const read = generateRead(PAYROLL, "00000000-0000-4000-8000-000000000001");
    expect(read.lookFirst.length).toBeGreaterThan(0);
    expect(read.lookFirst.join(" ")).not.toMatch(/you must rebuild/i);
  });

  it("every pattern lot exists in the catalogue", () => {
    for (const slug of Object.values(LOT_PATTERNS).flat()) {
      expect(lots.some((lot) => lot.slug === slug)).toBe(true);
    }
  });
});
