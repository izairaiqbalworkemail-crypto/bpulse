import { describe, expect, it } from "vitest";
import { checkScript, nextOpen, visibleFields } from "./script";
import { mentionsDeparted, mentionsModel } from "./terms";

describe("check conversation branching", () => {
  it("starts on what they are building", () => {
    const open = nextOpen(checkScript, {});
    expect(open?.name).toBe("product");
  });

  it("demo only asks whether production was attempted", () => {
    const names = visibleFields(checkScript, {
      product: "A payroll tool",
      stage: "demo-only",
    }).map((field) => field.name);
    expect(names).toContain("attemptedProduction");
    expect(names).not.toContain("lastBreak");
  });

  it("live and fragile asks what broke most recently", () => {
    const names = visibleFields(checkScript, {
      product: "A live dashboard",
      stage: "live-fragile",
    }).map((field) => field.name);
    expect(names).toContain("lastBreak");
    expect(names).not.toContain("attemptedProduction");
  });

  it("staging does not add the demo-only branch", () => {
    const names = visibleFields(checkScript, {
      product: "Payroll",
      stage: "staging",
    }).map((field) => field.name);
    expect(names).not.toContain("attemptedProduction");
    expect(names).not.toContain("lastBreak");
  });

  it("a model mention adds the real-data question", () => {
    const names = visibleFields(checkScript, {
      product: "A RAG assistant for support",
      stage: "staging",
      shipWound: "It hallucinates on policy.",
    }).map((field) => field.name);
    expect(names).toContain("modelOnData");
  });

  it("a departed builder adds the documentation question", () => {
    const names = visibleFields(checkScript, {
      product: "Payroll",
      stage: "staging",
      shipWound: "Auth was wired by someone who left.",
      whoBuilt: "still-here",
    }).map((field) => field.name);
    expect(names).toContain("docsLeft");
  });

  it("the left chip adds the documentation question", () => {
    const names = visibleFields(checkScript, {
      product: "Payroll",
      stage: "staging",
      shipWound: "It will not deploy.",
      whoBuilt: "left",
    }).map((field) => field.name);
    expect(names).toContain("docsLeft");
  });

  it("a plain ship wound does not invent model or departed branches", () => {
    const names = visibleFields(checkScript, {
      product: "A marketplace",
      stage: "live-stuck",
      shipWound: "Reviews sit in a queue.",
      whoBuilt: "still-here",
    }).map((field) => field.name);
    expect(names).not.toContain("modelOnData");
    expect(names).not.toContain("docsLeft");
    expect(names).not.toContain("attemptedProduction");
    expect(names).not.toContain("lastBreak");
  });

  it("term dictionary is conservative", () => {
    expect(mentionsModel("a payroll tool on staging")).toBe(false);
    expect(mentionsModel("the model times out")).toBe(true);
    expect(mentionsDeparted("still with us")).toBe(false);
    expect(mentionsDeparted("the contractor disappeared")).toBe(true);
  });

  it("identity is last once the wound is written", () => {
    const open = nextOpen(checkScript, {
      product: "Payroll",
      stage: "staging",
      shipWound: "Never deployed.",
      duration: "months",
      whoBuilt: "still-here",
      deadline: "Board in five weeks.",
    });
    expect(open?.name).toBe("identity");
  });
});
