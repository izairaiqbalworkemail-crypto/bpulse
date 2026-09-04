import { getLot } from "@/content/lots";
import { getSpecialist } from "@/content/specialists";

export type ReportSignalKey =
  | "almost-done"
  | "staging-only"
  | "single-owner"
  | "ghosted-dev"
  | "notebook-dead"
  | "release-owner";

export const reportSignalCatalog: Record<
  ReportSignalKey,
  {
    label: string;
    weight: 1 | 2 | 3;
    deflection: number;
  }
> = {
  "almost-done": {
    label: "90% done for three months",
    weight: 2,
    deflection: 3.8,
  },
  "staging-only": {
    label: "working on staging, never once in production",
    weight: 1,
    deflection: 2.2,
  },
  "single-owner": {
    label: "held together by one person who cannot take leave",
    weight: 3,
    deflection: 6.5,
  },
  "ghosted-dev": {
    label: "ghosted by the developer who wrote it",
    weight: 3,
    deflection: 6.8,
  },
  "notebook-dead": {
    label: "alive in a notebook, dead on real data",
    weight: 2,
    deflection: 4.9,
  },
  "release-owner": {
    label: "waiting on someone to own the release",
    weight: 1,
    deflection: 2.9,
  },
};

export type ProspectReport = {
  slug: string;
  company: string;
  role: string;
  lotSlug: string;
  specialistId: string;
  generatedOn: string;
  summary: string;
  findings: string[];
  signals: ReportSignalKey[];
};

export const reports: ProspectReport[] = [
  {
    slug: "northline-finance-k4m2p8qz",
    company: "Northline Finance",
    role: "Founder",
    lotSlug: "deepidv",
    specialistId: "mehak",
    generatedOn: "2026-09-04",
    summary:
      "The product reads close from the outside, but the release path is still undefined. The team is compensating with effort instead of structure.",
    findings: [
      "Production has never run the full verification path end-to-end.",
      "Core knowledge is concentrated in one engineer, creating release risk.",
      "Model behavior diverges once real customer inputs hit the pipeline.",
    ],
    signals: [
      "almost-done",
      "staging-only",
      "single-owner",
      "notebook-dead",
      "release-owner",
    ],
  },
  {
    slug: "juniper-clinic-suite-r7t9m2kd",
    company: "Juniper Clinic Suite",
    role: "CTO",
    lotSlug: "sully",
    specialistId: "aneeb",
    generatedOn: "2026-09-04",
    summary:
      "The build is shipping outputs, but release confidence is low because ownership and deployment discipline are both unstable.",
    findings: [
      "Handover documents exist but are not executable by someone new to the codebase.",
      "The original engineer is no longer reachable and unresolved blockers remain.",
      "The release checklist has no single accountable owner.",
    ],
    signals: [
      "almost-done",
      "ghosted-dev",
      "single-owner",
      "release-owner",
    ],
  },
];

const reportMap = new Map(reports.map((report) => [report.slug, report]));

export const reportSlugPattern =
  /^[a-z0-9]+(?:-[a-z0-9]+)*-[a-z0-9]{8}$/;

export function isReportSlugFormat(slug: string): boolean {
  return reportSlugPattern.test(slug);
}

export function getReport(slug: string): ProspectReport | null {
  if (!isReportSlugFormat(slug)) return null;
  return reportMap.get(slug) ?? null;
}

export function getResolvedReport(slug: string) {
  const report = getReport(slug);
  if (!report) return null;
  const lot = getLot(report.lotSlug);
  const specialist = getSpecialist(report.specialistId);
  return { report, lot, specialist };
}
