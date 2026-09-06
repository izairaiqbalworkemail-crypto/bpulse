import { describe, expect, it } from "vitest";
import { lots } from "./lots";
import { LOT_PATTERNS } from "./read-patterns";
import { readAfter, readOffer, readSpecimen, readWhy } from "./read";

const EM = /\u2014/;
const NAMED = /toptal|turing|deloitte|mckinsey|accenture|pwc|ey\b/i;

function blob(value: unknown) {
  return JSON.stringify(value);
}

describe("read page copy", () => {
  it("promises no pitch and no second follow-up", () => {
    expect(readOffer.pledge).toMatch(/No pitch inside it/);
    expect(readAfter.pledge).toMatch(/We will not follow up twice/);
  });

  it("shows a complete specimen, not a description of one", () => {
    expect(readSpecimen.told.body.length).toBeGreaterThan(40);
    expect(readSpecimen.means.body).toContain(
      `${LOT_PATTERNS.beforeProduction.length} of the ${lots.length}`,
    );
    expect(readSpecimen.look.items).toHaveLength(3);
    expect(readSpecimen.not.body).toMatch(/have not seen your code/);
    expect(readSpecimen.means.href).toBe("/work/deepidv");
  });

  it("explains why it is free", () => {
    expect(readWhy.body).toMatch(/most people who read one do not need us/);
    expect(readWhy.next).toMatch(/the Check/);
  });

  it("names no competitor and uses no em dash", () => {
    expect(blob({ readOffer, readWhy, readAfter, readSpecimen })).not.toMatch(NAMED);
    expect(blob({ readOffer, readWhy, readAfter, readSpecimen })).not.toMatch(EM);
  });
});
