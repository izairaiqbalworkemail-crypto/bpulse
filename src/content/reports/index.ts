import type { Report } from "./types";
import { assertReport } from "./types";
import harborChart from "./harbor-chart-n4R8wL2c";
import northlinePayroll from "./northline-payroll-k7m2Qx9p";

const reports: Report[] = [
  assertReport(northlinePayroll),
  assertReport(harborChart),
];

const reportMap = new Map(reports.map((report) => [report.slug, report]));

export function getReport(slug: string): Report | undefined {
  return reportMap.get(slug);
}

export function getReportSlugs(): string[] {
  return reports.map((report) => report.slug);
}
