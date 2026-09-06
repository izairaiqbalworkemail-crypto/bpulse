import { describe, expect, it } from "vitest";
import { checkHrefFromReading, parseCheckCase } from "@/lib/check-case";

describe("parseCheckCase", () => {
  it("falls back to generic when no signals are passed", () => {
    const view = parseCheckCase({});
    expect(view.kind).toBe("generic");
    expect(view.lines).toEqual([]);
    expect(view.closest).toBeNull();
  });

  it("ignores unknown signal ids", () => {
    const view = parseCheckCase({ signals: "staging-only,not-a-signal" });
    expect(view.kind).toBe("personal");
    expect(view.lines.map((line) => line.id)).toEqual(["staging-only"]);
    expect(view.lines[0]?.said).toBeNull();
  });

  it("quotes only the words in the query string", () => {
    const view = parseCheckCase({
      signals: "staging-only,auth-undocumented",
      "staging-only": "it works on staging",
    });
    expect(view.lines[0]?.said).toBe("it works on staging");
    expect(view.lines[1]?.said).toBeNull();
  });

  it("names WearMeOut when both delivery signals are passed", () => {
    const view = parseCheckCase({
      signals: "staging-only,no-deploy-path",
      "staging-only": "It only runs on staging",
    });
    expect(view.closest?.lot.slug).toBe("wearmeout");
    expect(view.closest?.shared).toBe(2);
  });
});

describe("checkHrefFromReading", () => {
  it("passes selected labels verbatim", () => {
    const href = checkHrefFromReading([
      { signal: "staging-only", label: "It only runs on staging" },
    ]);
    const url = new URL(href, "https://bpulse.example");
    expect(url.searchParams.get("signals")).toBe("staging-only");
    expect(url.searchParams.get("staging-only")).toBe("It only runs on staging");
  });
});
