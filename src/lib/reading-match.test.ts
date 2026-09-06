import { describe, expect, it } from "vitest";
import { closestReadingLot } from "@/lib/reading-match";

describe("closestReadingLot", () => {
  it("stays silent below two shared signals", () => {
    expect(closestReadingLot(["staging-only"])).toBeNull();
    expect(closestReadingLot(["scope-unbounded", "no-release-owner"])).toBeNull();
  });

  it("names Sully when ownership signals pair", () => {
    const match = closestReadingLot([
      "single-point-knowledge",
      "no-release-owner",
    ]);
    expect(match?.lot.slug).toBe("sully");
    expect(match?.shared).toBe(2);
  });

  it("names DeepIDV when integration signals pair", () => {
    const match = closestReadingLot([
      "third-party-sprawl",
      "scope-unbounded",
    ]);
    expect(match?.lot.slug).toBe("deepidv");
    expect(match?.shared).toBe(2);
  });

  it("names WearMeOut when delivery signals pair", () => {
    const match = closestReadingLot(["staging-only", "no-deploy-path"]);
    expect(match?.lot.slug).toBe("wearmeout");
  });
});
