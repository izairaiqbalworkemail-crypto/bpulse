import { describe, expect, it } from "vitest";
import { getLot } from "@/content/lots";
import {
  REPAIR_REPORT_SLUG,
  buildKeepReport,
  buildRepairReport,
} from "@/content/check-reports";

describe("check reports", () => {
  it("redacts the repair client and keeps real arrival signals", () => {
    const lot = getLot(REPAIR_REPORT_SLUG);
    const report = buildRepairReport();
    const text = JSON.stringify(report);

    expect(text).not.toMatch(/WearMeOut/i);
    expect(report.findings.map((row) => row.id)).toEqual(lot.signals);
    expect(report.read).toBe(lot.condition);
    expect(report.takes).toContain(lot.outcome);
    expect(report.takes).not.toMatch(/\d+\s+days/i);
    expect(report.limits).toEqual(lot.limits);
  });

  it("does not invent a keep file", () => {
    const report = buildKeepReport();
    expect(report.findings).toEqual([]);
    expect(report.clientLine).toMatch(/No public engagement file/i);
    expect(report.limits.join(" ")).toMatch(/sample template/i);
    expect(report.read).toMatch(/do not need us/i);
  });
});
