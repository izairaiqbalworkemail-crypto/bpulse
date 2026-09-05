import { NextResponse } from "next/server";
import { saveMatchOutcome, type MatchOutcomeKind } from "@/lib/match/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const OUTCOMES = new Set<MatchOutcomeKind>([
  "viewed",
  "booked",
  "abandoned",
  "chose_other",
  "became_check",
]);

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const matchEventId =
    typeof body.matchEventId === "string" ? body.matchEventId : "";
  const outcome =
    typeof body.outcome === "string" ? (body.outcome as MatchOutcomeKind) : null;

  if (!matchEventId || !outcome || !OUTCOMES.has(outcome)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  await saveMatchOutcome({
    matchEventId,
    outcome,
    occurredAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
