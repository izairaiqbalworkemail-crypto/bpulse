export type ReportPod = "integration" | "delivery" | "intelligence";

export type ReportFinding = {
  severity: "blocks launch" | "blocks a customer" | "blocks trust";
  observed: string;
  consequence: string;
  closing: string;
};

export type Report = {
  slug: string;
  company: string;
  preparedBy: string;
  preparedOn: string;
  surfacesRead: [string, string, ...string[]];
  theRead: string;
  findings: [ReportFinding, ReportFinding, ReportFinding, ...ReportFinding[]];
  whatItTakes: {
    scope: string;
    weeks: string;
    band: string;
  };
  pod: ReportPod;
  specialistId: string;
  limits: [string, ...string[]];
};

export function assertReport(report: Report): Report {
  if (report.surfacesRead.length < 2) {
    throw new Error(`Report ${report.slug}: surfacesRead must have at least 2 entries.`);
  }
  if (report.findings.length < 3 || report.findings.length > 5) {
    throw new Error(`Report ${report.slug}: findings must be 3–5.`);
  }
  if (report.limits.length < 1) {
    throw new Error(
      `Report ${report.slug}: a report with no limits was either dishonest or not researched.`
    );
  }
  if (!/-[A-Za-z0-9]{8}$/.test(report.slug)) {
    throw new Error(
      `Report ${report.slug}: slug must end with a random 8-character suffix.`
    );
  }
  return report;
}
