import { describe, expect, it } from "vitest";
import { applyWoundRead, readWound } from "./read-wound";

const PAYROLL =
  "We built a payroll tool over eight months. It works on staging. We've never deployed to production and nobody left knows how the auth was wired.";

describe("readWound", () => {
  it("reads a stalled repo from the words", () => {
    expect(
      readWound("The last engineer left. The repo stalled at billing."),
    ).toEqual({ situation: "Stalled" });
  });

  it("reads almost-done from staging that will not ship", () => {
    expect(
      readWound("Almost done. Auth will not ship. Staging only."),
    ).toEqual({ situation: "Almost done" });
  });

  it("reads a live fragile product", () => {
    expect(
      readWound("Live, but every deploy keeps breaking checkout."),
    ).toEqual({ situation: "Live, but fragile" });
  });

  it("reads a true idea, not the word idea", () => {
    expect(readWound("Just an idea. Nothing is built.")).toEqual({
      situation: "Just an idea",
    });
    expect(readWound("I have no idea how the auth was wired.")).toEqual({});
  });

  it("does not invent a situation when two readings conflict", () => {
    const read = readWound(PAYROLL);
    expect(read.situation).toBeUndefined();
  });

  it("reads a single stack and ignores fashion noise", () => {
    expect(readWound("Next.js app, stalled at auth.").stack).toBe(
      "Next.js / React",
    );
    expect(
      readWound("Next.js frontend and a Django API, stalled.").stack,
    ).toBeUndefined();
  });

  it("only reads access when the person says it", () => {
    expect(readWound("github.com/you/payroll").access).toBeUndefined();
    expect(readWound("I can give you the repo. Full access.").access).toBe(
      "Full access",
    );
  });

  it("applyWoundRead never overwrites a mark already on the sheet", () => {
    const { answers, filled } = applyWoundRead(
      { situation: "Stalled" },
      { situation: "Almost done", stack: "Next.js / React" },
    );
    expect(answers.situation).toBe("Stalled");
    expect(answers.stack).toBe("Next.js / React");
    expect(filled).toEqual(["stack"]);
  });
});
