import { checkBadOutcome } from "@/content/check";
import { getLot } from "@/content/lots";
import { getSignal } from "@/content/signals";
import type { SignalId } from "@/content/signals";

export const REPAIR_REPORT_SLUG = "wearmeout";

export type CheckReportFinding = {
  n: string;
  id: SignalId;
  line: string;
};

export type CheckReport = {
  id: "repair" | "keep";
  tab: string;
  verdict: string;
  prepared: string | null;
  preparedNote: string | null;
  clientLine: string;
  read: string;
  findings: CheckReportFinding[];
  takes: string;
  limits: string[];
  sourceNote: string;
};

/**
 * Redacted from a real engagement. Findings are that lot's arrival
 * signals, in the published taxonomy voice. No invented duration.
 */
export function buildRepairReport(): CheckReport {
  const lot = getLot(REPAIR_REPORT_SLUG);
  const limits = lot.limits ?? [];
  const dateNote =
    limits.find((line) => /earliest verifiable/i.test(line)) ?? null;

  return {
    id: "repair",
    tab: "Repair",
    verdict: "repair",
    prepared: lot.grade.date ?? null,
    preparedNote: dateNote,
    clientLine: `[Client redacted] · ${lot.grade.label}`,
    read: lot.condition,
    findings: lot.signals.map((id, index) => ({
      n: String(index + 1).padStart(2, "0"),
      id,
      line: getSignal(id).says,
    })),
    takes: `${lot.outcome} Duration is not on the public record.`,
    limits,
    sourceNote:
      "Redacted from a public engagement on the record. The client name is removed. Findings are the arrival signals on that file — not a rewritten sample.",
  };
}

/**
 * No public Check on the record ended in keep. Inventing a named
 * company and findings would be a template. This is the written
 * verdict we give when that is true.
 */
export function buildKeepReport(): CheckReport {
  return {
    id: "keep",
    tab: "You don't need us",
    verdict: "keep — you don't need us",
    prepared: null,
    preparedNote: null,
    clientLine: "No public engagement file · keep",
    read: checkBadOutcome,
    findings: [],
    takes: "Nothing from us. A week of senior cleanup on your side, if you want it.",
    limits: [
      "No public Check on the record concluded keep. A redacted company name and invented findings would be a sample template.",
      "The fee is credited on a Close invoice within 30 days, or returned if you do not take a Close.",
    ],
    sourceNote:
      "This is the written verdict, not a fictional file. We show it because the Check is not a funnel.",
  };
}

export const checkReports = [buildRepairReport(), buildKeepReport()] as const;
