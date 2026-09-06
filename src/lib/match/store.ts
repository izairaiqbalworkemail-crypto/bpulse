import { createHash } from "node:crypto";
import { appendFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { matchEvents, matchOutcomes } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import type {
  MatchConfidence,
  MatchInput,
  MatchOutcome,
  MatchResult,
} from "./types";

export type MatchOutcomeKind =
  | "viewed"
  | "booked"
  | "abandoned"
  | "chose_other"
  | "became_check";

export type StoredMatchEvent = {
  id: string;
  createdAt: string;
  inputHash: string;
  description: string;
  stage?: string;
  stack: string[];
  urgency?: string;
  results: MatchResult[];
  confidence: MatchConfidence;
  session: string;
  /** The whole pipeline that produced the results — enough to render /match/[token]. */
  outcome: MatchOutcome;
};

export type StoredMatchOutcome = {
  matchEventId: string;
  outcome: MatchOutcomeKind;
  occurredAt: string;
};

function file(name: string) {
  return path.join(process.cwd(), ".data", name);
}

export function hashInput(description: string): string {
  return createHash("sha256").update(description).digest("hex");
}

async function appendJsonl(name: string, row: unknown) {
  await mkdir(path.dirname(file(name)), { recursive: true });
  await appendFile(file(name), `${JSON.stringify(row)}\n`, "utf8");
}

async function readJsonl<T>(name: string): Promise<T[]> {
  try {
    const raw = await readFile(file(name), "utf8");
    return raw
      .split("\n")
      .filter(Boolean)
      .map((line) => JSON.parse(line) as T);
  } catch {
    return [];
  }
}

async function db() {
  if (!process.env.DATABASE_URL) return null;
  const { getDb } = await import("@/lib/db");
  return getDb();
}

function rowFromDb(row: unknown): StoredMatchEvent {
  const r = row as Record<string, unknown>;
  return {
    id: String(r.id),
    createdAt: new Date(r.createdAt as string).toISOString(),
    inputHash: String(r.inputHash),
    description: String(r.description),
    stage: r.stage == null ? undefined : String(r.stage),
    stack: Array.isArray(r.stack) ? (r.stack as string[]) : [],
    urgency: r.urgency == null ? undefined : String(r.urgency),
    results: (r.results ?? []) as MatchResult[],
    confidence: (r.confidence ?? "exploratory") as MatchConfidence,
    session: String(r.session),
    outcome: (r.outcome ?? null) as MatchOutcome,
  };
}

export async function saveMatchEvent(row: StoredMatchEvent): Promise<void> {
  const connection = await db();
  if (connection) {
    try {
      await connection.insert(matchEvents).values({
        id: row.id,
        createdAt: new Date(row.createdAt),
        inputHash: row.inputHash,
        description: row.description,
        stage: row.stage ?? null,
        stack: row.stack,
        urgency: row.urgency ?? null,
        results: row.results,
        confidence: row.confidence,
        session: row.session,
        outcome: row.outcome,
      });
      return;
    } catch (error) {
      console.error("[match] database write failed, saving locally", error);
    }
  }
  await appendJsonl("match-events.jsonl", row);
}

export async function saveMatchOutcome(row: StoredMatchOutcome): Promise<void> {
  const connection = await db();
  if (connection) {
    try {
      await connection.insert(matchOutcomes).values({
        matchEventId: row.matchEventId,
        outcome: row.outcome,
        occurredAt: new Date(row.occurredAt),
      });
      return;
    } catch {
      // fall through
    }
  }
  await appendJsonl("match-outcomes.jsonl", row);
}

export async function listMatchLog(limit = 40): Promise<{
  events: StoredMatchEvent[];
  outcomes: StoredMatchOutcome[];
}> {
  const connection = await db();
  if (connection) {
    try {
      const events = await connection.select().from(matchEvents);
      const outcomes = await connection.select().from(matchOutcomes);
      return {
        events: events
          .map((row) => rowFromDb(row))
          .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
          .slice(0, limit),
        outcomes: outcomes.map((row) => ({
          matchEventId: row.matchEventId,
          outcome: row.outcome as MatchOutcomeKind,
          occurredAt: row.occurredAt.toISOString(),
        })),
      };
    } catch {
      // local
    }
  }
  const events = (await readJsonl<StoredMatchEvent>("match-events.jsonl"))
    .reverse()
    .slice(0, limit);
  const outcomes = await readJsonl<StoredMatchOutcome>("match-outcomes.jsonl");
  return { events, outcomes };
}

/** Fetch one match by its unguessable token (= event id) for /match/[token]. */
export async function getMatch(token: string): Promise<StoredMatchEvent | null> {
  if (!/^[0-9a-f-]{36}$/i.test(token)) return null;
  const connection = await db();
  if (connection) {
    try {
      const [row] = await connection
        .select()
        .from(matchEvents)
        .where(eq(matchEvents.id, token))
        .limit(1);
      if (row) return rowFromDb(row);
    } catch {
      // local
    }
  }
  const local = await readJsonl<StoredMatchEvent>("match-events.jsonl");
  return local.find((row) => row.id === token) ?? null;
}

export function buildEvent(
  input: MatchInput,
  outcome: MatchOutcome,
  session: string,
): StoredMatchEvent {
  const confidence = outcome.confidence ?? outcome.results[0]?.confidence ?? "exploratory";
  return {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    inputHash: hashInput(input.description),
    description: input.description,
    stage: input.stage,
    stack: input.stack ?? [],
    urgency: input.urgency,
    results: outcome.results,
    confidence,
    outcome,
    session,
  };
}