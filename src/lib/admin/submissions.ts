import { and, desc, eq, gte, inArray, isNotNull, lte, sql } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { submissions } from "@/lib/db/schema";
import { reportMeta } from "@/db/schema/ops";
import { env } from "@/lib/env";
import { listAdminBoardData } from "@/lib/careers/repo";

export const submissionOutcomes = [
  "new",
  "replied",
  "call_booked",
  "paid",
  "closed",
  "dead",
] as const;

export const submissionStatuses = [
  "received",
  "triaged",
  "contacted",
  "awaiting_client",
  "qualified",
  "closed",
] as const;

export type SubmissionOutcome = (typeof submissionOutcomes)[number];
export type SubmissionStatus = (typeof submissionStatuses)[number];

export type AdminSubmissionRow = {
  id: string;
  createdAt: string;
  type: string;
  source: string | null;
  email: string | null;
  outcome: SubmissionOutcome;
  outcomeAt: string | null;
  valueUsd: string | null;
};

export type FunnelRatios = {
  reportsAndReads: number;
  callsBooked: number;
  checksPaid: number;
};

export type AdminInboxRow = {
  id: string;
  createdAt: string;
  type: string;
  source: string | null;
  email: string | null;
  status: string;
  outcome: SubmissionOutcome;
  valueUsd: string | null;
  outcomeAt: string | null;
  summary: string;
};

export type AdminReportRow = {
  slug: string;
  company: string;
  sentAt: string | null;
  sentTo: string | null;
  status: string;
  openCount: number;
  lastOpenedAt: string | null;
};

export type AdminFollowUpRow = AdminReportRow & {
  daysSinceSent: number;
};

export type AdminCandidateRow = Awaited<ReturnType<typeof listAdminBoardData>>[number];

export type ReplyTarget = {
  id: string;
  email: string | null;
  type: string;
  source: string | null;
  summary: string;
};

export async function listRecentSubmissions(limit = 120): Promise<AdminSubmissionRow[]> {
  if (!env.DATABASE_URL) return [];
  const rows = await getDb()
    .select({
      id: submissions.id,
      createdAt: submissions.createdAt,
      type: submissions.type,
      source: submissions.source,
      email: submissions.email,
      outcome: submissions.outcome,
      outcomeAt: submissions.outcomeAt,
      valueUsd: submissions.valueUsd,
    })
    .from(submissions)
    .orderBy(desc(submissions.createdAt))
    .limit(limit);

  return rows.map((row) => ({
    id: row.id,
    createdAt: row.createdAt.toISOString(),
    type: row.type,
    source: row.source,
    email: row.email,
    outcome: (row.outcome as SubmissionOutcome) ?? "new",
    outcomeAt: row.outcomeAt ? row.outcomeAt.toISOString() : null,
    valueUsd: row.valueUsd,
  }));
}

export async function updateSubmissionOutcome(input: {
  id: string;
  outcome: SubmissionOutcome;
  valueUsd?: string | null;
}): Promise<boolean> {
  if (!env.DATABASE_URL) return false;
  const value = input.valueUsd?.trim();
  const nextValue = value ? Number(value) : null;
  if (value && Number.isNaN(nextValue)) return false;

  const updated = await getDb()
    .update(submissions)
    .set({
      outcome: input.outcome,
      outcomeAt: new Date(),
      valueUsd: value ?? null,
    })
    .where(eq(submissions.id, input.id))
    .returning({ id: submissions.id });

  return updated.length > 0;
}

export async function markSubmissionTriaged(id: string): Promise<boolean> {
  if (!env.DATABASE_URL) return false;
  const updated = await getDb()
    .update(submissions)
    .set({ status: "triaged" })
    .where(eq(submissions.id, id))
    .returning({ id: submissions.id });
  return updated.length > 0;
}

export async function updateSubmissionStatus(input: {
  id: string;
  status: SubmissionStatus;
}): Promise<boolean> {
  if (!env.DATABASE_URL) return false;
  const updated = await getDb()
    .update(submissions)
    .set({ status: input.status })
    .where(eq(submissions.id, input.id))
    .returning({ id: submissions.id });
  return updated.length > 0;
}

export async function getReplyTarget(id: string): Promise<ReplyTarget | null> {
  if (!env.DATABASE_URL) return null;
  const [row] = await getDb()
    .select({
      id: submissions.id,
      email: submissions.email,
      type: submissions.type,
      source: submissions.source,
      payload: submissions.payload,
    })
    .from(submissions)
    .where(eq(submissions.id, id))
    .limit(1);
  if (!row) return null;
  return {
    id: row.id,
    email: row.email,
    type: row.type,
    source: row.source,
    summary: summarizeSubmissionPayload(row.payload),
  };
}

export async function markSubmissionReplied(id: string): Promise<boolean> {
  if (!env.DATABASE_URL) return false;
  const updated = await getDb()
    .update(submissions)
    .set({
      outcome: "replied",
      outcomeAt: new Date(),
      status: "triaged",
    })
    .where(eq(submissions.id, id))
    .returning({ id: submissions.id });
  return updated.length > 0;
}

export async function listInboxSubmissions(limit = 120): Promise<AdminInboxRow[]> {
  if (!env.DATABASE_URL) return [];
  const rows = await getDb()
    .select({
      id: submissions.id,
      createdAt: submissions.createdAt,
      type: submissions.type,
      source: submissions.source,
      email: submissions.email,
      status: submissions.status,
      outcome: submissions.outcome,
      outcomeAt: submissions.outcomeAt,
      valueUsd: submissions.valueUsd,
      payload: submissions.payload,
    })
    .from(submissions)
    .where(sql`${submissions.status} <> 'triaged'`)
    .orderBy(desc(submissions.createdAt))
    .limit(limit);

  return rows.map((row) => ({
    id: row.id,
    createdAt: row.createdAt.toISOString(),
    type: row.type,
    source: row.source,
    email: row.email,
    status: row.status,
    outcome: (row.outcome as SubmissionOutcome) ?? "new",
    valueUsd: row.valueUsd,
    outcomeAt: row.outcomeAt ? row.outcomeAt.toISOString() : null,
    summary: summarizeSubmissionPayload(row.payload),
  }));
}

export async function listReports(limit = 200): Promise<AdminReportRow[]> {
  if (!env.DATABASE_URL) return [];
  const rows = await getDb()
    .select({
      slug: reportMeta.slug,
      company: reportMeta.company,
      sentAt: reportMeta.sentAt,
      sentTo: reportMeta.sentTo,
      status: reportMeta.status,
      openCount: reportMeta.viewCount,
      lastOpenedAt: reportMeta.lastViewedAt,
    })
    .from(reportMeta)
    .orderBy(desc(reportMeta.sentAt), desc(reportMeta.lastViewedAt))
    .limit(limit);

  return rows.map((row) => ({
    slug: row.slug,
    company: row.company,
    sentAt: row.sentAt ? row.sentAt.toISOString() : null,
    sentTo: row.sentTo,
    status: row.status,
    openCount: row.openCount,
    lastOpenedAt: row.lastOpenedAt ? row.lastOpenedAt.toISOString() : null,
  }));
}

export async function listFollowUpQueue(limit = 200): Promise<AdminFollowUpRow[]> {
  if (!env.DATABASE_URL) return [];
  const cutoff = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const candidateReports = await getDb()
    .select({
      slug: reportMeta.slug,
      company: reportMeta.company,
      sentAt: reportMeta.sentAt,
      sentTo: reportMeta.sentTo,
      status: reportMeta.status,
      openCount: reportMeta.viewCount,
      lastOpenedAt: reportMeta.lastViewedAt,
    })
    .from(reportMeta)
    .where(
      and(
        isNotNull(reportMeta.sentAt),
        lte(reportMeta.sentAt, cutoff),
        sql`${reportMeta.viewCount} > 0`,
      ),
    )
    .orderBy(desc(reportMeta.lastViewedAt), desc(reportMeta.sentAt))
    .limit(limit);

  const replyRows = await getDb()
    .select({ email: submissions.email })
    .from(submissions)
    .where(
      and(
        isNotNull(submissions.email),
        inArray(submissions.outcome, ["replied", "call_booked", "paid", "closed"]),
      ),
    );
  const replySet = new Set(replyRows.map((row) => row.email?.toLowerCase()).filter(Boolean));

  return candidateReports
    .filter((row) => !row.sentTo || !replySet.has(row.sentTo.toLowerCase()))
    .map((row) => {
      const sent = row.sentAt ?? new Date();
      const daysSinceSent = Math.floor((Date.now() - sent.getTime()) / (1000 * 60 * 60 * 24));
      return {
        slug: row.slug,
        company: row.company,
        sentAt: row.sentAt ? row.sentAt.toISOString() : null,
        sentTo: row.sentTo,
        status: row.status,
        openCount: row.openCount,
        lastOpenedAt: row.lastOpenedAt ? row.lastOpenedAt.toISOString() : null,
        daysSinceSent,
      };
    });
}

export async function listCandidateBoard(): Promise<AdminCandidateRow[]> {
  return listAdminBoardData();
}

function summarizeSubmissionPayload(payload: unknown): string {
  if (!payload || typeof payload !== "object") return "No structured fields.";
  const record = payload as Record<string, unknown>;
  const keys = ["name", "company", "shipWound", "state", "timeline", "budget", "brief", "title"];
  const lines: string[] = [];
  for (const key of keys) {
    const value = record[key];
    if (typeof value !== "string") continue;
    const trimmed = value.trim();
    if (!trimmed) continue;
    lines.push(`${key}: ${trimmed.replace(/\s+/g, " ")}`);
    if (lines.length === 3) break;
  }
  return lines.length ? lines.join(" | ") : "No structured fields.";
}

export async function getFunnelRatios(windowDays: 30 | 90): Promise<FunnelRatios> {
  if (!env.DATABASE_URL) {
    return {
      reportsAndReads: 0,
      callsBooked: 0,
      checksPaid: 0,
    };
  }
  const since = new Date(Date.now() - windowDays * 24 * 60 * 60 * 1000);

  const [readRows, callRows, paidRows, reportRows] = await Promise.all([
    getDb()
      .select({ c: sql<number>`count(*)` })
      .from(submissions)
      .where(
        and(
          gte(submissions.createdAt, since),
          inArray(submissions.type, ["read", "check-intake"]),
        ),
      ),
    getDb()
      .select({ c: sql<number>`count(*)` })
      .from(submissions)
      .where(and(gte(submissions.createdAt, since), sql`${submissions.outcome} = 'call_booked'`)),
    getDb()
      .select({ c: sql<number>`count(*)` })
      .from(submissions)
      .where(and(gte(submissions.createdAt, since), sql`${submissions.outcome} = 'paid'`)),
    getDb()
      .select({ c: sql<number>`count(*)` })
      .from(reportMeta)
      .where(and(gte(reportMeta.sentAt, since), isNotNull(reportMeta.sentAt))),
  ]);

  return {
    reportsAndReads: (readRows[0]?.c ?? 0) + (reportRows[0]?.c ?? 0),
    callsBooked: callRows[0]?.c ?? 0,
    checksPaid: paidRows[0]?.c ?? 0,
  };
}
