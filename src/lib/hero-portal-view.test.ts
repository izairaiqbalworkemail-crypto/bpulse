import { describe, expect, it } from "vitest";
import { getDemoOverview } from "@/content/demo";
import { heroPortalView } from "@/lib/hero-portal-view";

describe("hero portal seed", () => {
  it("projects the same overview onto both compositions", () => {
    const overview = getDemoOverview();
    const view = heroPortalView(overview);

    expect(view.client).toBe(overview.client);
    expect(view.daysElapsed).toBe(overview.daysElapsed);
    expect(view.lockedDays).toBe(overview.lockedDays);
    expect(view.usedPct).toBe(overview.usedPct);
    expect(view.scopeVersion).toBe(overview.scopeVersion);
    expect(view.currentStage).toBe(overview.currentStage);
    expect(view.stages).toEqual(overview.stages);
    expect(view.findingsOpen).toBe(overview.findings.open);
    expect(view.nextMilestone).toBe(overview.nextMilestone);
    expect(view.deployLine).toContain(overview.staging?.env ?? "");
    expect(view.deployLine).toContain(overview.staging?.status ?? "");
  });
});
