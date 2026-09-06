import { NextResponse } from "next/server";
import { isRateLimited } from "@/lib/rate-limit";
import { runMatch } from "@/lib/match/engine";
import { buildEvent, saveMatchEvent } from "@/lib/match/store";
import { clipDescription } from "@/lib/match/normalize";
import type { MatchInput, MatchStage, MatchUrgency } from "@/lib/match/types";
import { env } from "@/lib/env";
import { getDb } from "@/lib/db";
import { submissions } from "@/lib/db/schema";
import { saveLocalSubmission } from "@/lib/intake/local-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const STAGES = new Set<MatchStage>(["idea", "building", "stuck", "live-fragile"]);
const URGENCIES = new Set<MatchUrgency>(["now", "weeks", "exploring"]);

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid body" }, { status: 400 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";
  if (await isRateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "too many requests" }, { status: 429 });
  }

  const description = clipDescription(
    typeof body.description === "string" ? body.description : "",
  );
  const stage =
    typeof body.stage === "string" && STAGES.has(body.stage as MatchStage)
      ? (body.stage as MatchStage)
      : undefined;
  const urgency =
    typeof body.urgency === "string" && URGENCIES.has(body.urgency as MatchUrgency)
      ? (body.urgency as MatchUrgency)
      : undefined;
  const stack = Array.isArray(body.stack)
    ? body.stack.filter((item): item is string => typeof item === "string").slice(0, 8)
    : [];
  const session =
    typeof body.session === "string" && body.session
      ? body.session
      : crypto.randomUUID();

  const input: MatchInput = { description, stage, stack, urgency };
  const outcome = runMatch(input);
  const event = buildEvent(input, outcome, session);
  await saveMatchEvent(event);

  const requestId =
    typeof body.requestId === "string" && body.requestId
      ? body.requestId
      : `match-${event.id}`;
  const payload = {
    description,
    stage: stage ?? null,
    urgency: urgency ?? null,
    stack,
    eventId: event.id,
  };

  if (env.DATABASE_URL) {
    try {
      await getDb()
        .insert(submissions)
        .values({
          type: "match",
          source: "match",
          payload,
          email: null,
          requestId,
        })
        .onConflictDoNothing({ target: submissions.requestId });
    } catch {
      await saveLocalSubmission({
        id: requestId,
        type: "match",
        source: "match",
        email: null,
        payload,
        requestId,
      });
    }
  } else {
    await saveLocalSubmission({
      id: requestId,
      type: "match",
      source: "match",
      email: null,
      payload,
      requestId,
    });
  }

  return NextResponse.json({
    ok: true,
    eventId: event.id,
    token: event.id,
    results: event.results,
    outcome,
  });
}
