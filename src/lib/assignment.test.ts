import { describe, expect, it } from "vitest";
import { getLot } from "@/content/lots";
import { getSpecialist } from "@/content/specialists";
import {
  admission,
  assignedCrew,
  assignmentHistory,
  assignmentStatus,
  signalsClosed,
} from "@/lib/assignment";

describe("assignment", () => {
  it("treats DeepIDV lead as Mehak, not Hassan", () => {
    const crew = assignedCrew(getLot("deepidv"));
    expect(crew[0]?.person.id).toBe("mehak");
    expect(crew.some((row) => row.person.id === "hassan")).toBe(true);
  });

  it("maps published availability, and invents no third status", () => {
    expect(assignmentStatus(getSpecialist("aneeb"))).toBe("assigned");
    expect(assignmentStatus(getSpecialist("hassan"))).toBe("available");
  });

  it("refuses a clearance date", () => {
    const line = admission(getSpecialist("hassan"));
    expect(line.standing).toBe("Client-facing · Gate 4");
    expect(line.dateNote).toMatch(/not on the public record/i);
  });

  it("closes signals from lots on the record only", () => {
    const closed = signalsClosed(getSpecialist("fizza"));
    expect(closed).toContain("staging-only");
    expect(closed).toContain("no-deploy-path");
    expect(assignmentHistory(getSpecialist("fizza")).some((row) => row.lead)).toBe(
      true,
    );
  });
});
