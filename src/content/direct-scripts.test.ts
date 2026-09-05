import { describe, expect, it } from "vitest";
import { specialists } from "./specialists";
import {
  aboutDirectScript,
  askedByFor,
  directScripts,
  everySpecialistHasAScript,
} from "./direct-scripts";
import { nextOpen, visibleFields } from "@/lib/conversation/script";

describe("direct question sets", () => {
  it("gives every specialist a real script", () => {
    expect(everySpecialistHasAScript()).toBe(true);
    expect(Object.keys(directScripts).sort()).toEqual(
      specialists.map((person) => person.id).sort(),
    );
  });

  it("Hassan branches on whether production has ever existed", () => {
    const script = directScripts.hassan;
    const never = visibleFields(script, {
      product: "A payroll tool",
      deployed: "never",
    }).map((field) => field.name);
    expect(never).toContain("firstDeploy");
    expect(never).not.toContain("nextShip");

    const live = visibleFields(script, {
      product: "A payroll tool",
      deployed: "it-does",
    }).map((field) => field.name);
    expect(live).toContain("nextShip");
    expect(live).not.toContain("firstDeploy");
  });

  it("Najiullah asks about real data only when there is a model", () => {
    const script = directScripts.najiullah;
    const model = visibleFields(script, {
      product: "A scribe",
      model: "yes",
    }).map((field) => field.name);
    expect(model).toContain("realData");
    expect(model).toContain("evals");

    const skip = visibleFields(script, {
      product: "A marketplace",
      model: "no",
    }).map((field) => field.name);
    expect(skip).not.toContain("realData");
    expect(skip).not.toContain("evals");
  });

  it("Aneeb asks what is written down when people left", () => {
    const script = directScripts.aneeb;
    const left = visibleFields(script, {
      product: "Payroll",
      scope: "scoped",
      whoLeft: "left",
    }).map((field) => field.name);
    expect(left).toContain("docsLeft");

    const still = visibleFields(script, {
      product: "Payroll",
      scope: "scoped",
      whoLeft: "still",
    }).map((field) => field.name);
    expect(still).not.toContain("docsLeft");
  });

  it("the about set attributes questions to different people", () => {
    expect(askedByFor("direct-about", "product")).toBe("aneeb");
    expect(askedByFor("direct-about", "deployed")).toBe("hassan");
    expect(askedByFor("direct-about", "model")).toBe("najiullah");
    expect(askedByFor("direct-about", "trust")).toBe("zaira");

    const withModel = visibleFields(aboutDirectScript, {
      product: "A hospital scribe",
      deployed: "staging",
      model: "yes",
    }).map((field) => field.name);
    expect(withModel).toContain("realData");

    const without = visibleFields(aboutDirectScript, {
      product: "A marketplace",
      deployed: "no",
      model: "no",
    }).map((field) => field.name);
    expect(without).not.toContain("realData");
  });

  it("Hassan's next open field follows the answers", () => {
    const script = directScripts.hassan;
    expect(nextOpen(script, {})?.name).toBe("product");
    expect(
      nextOpen(script, { product: "Payroll", deployed: "never" })?.name,
    ).toBe("firstDeploy");
  });
});
