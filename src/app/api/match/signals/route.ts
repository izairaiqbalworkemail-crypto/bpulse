import { NextResponse } from "next/server";
import { signalTaxonomy, type SignalId } from "@/content/signals";
import { runMatch } from "@/lib/match/engine";
import { clipDescription } from "@/lib/match/normalize";
import { buildEvent, saveMatchEvent } from "@/lib/match/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Re-run a match with some extracted signals set aside ("edit the match live").
 * Same deterministic engine, same instrumentation — a fresh event is filed.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid body" }, { status: 400 });
  }

  const description = clipDescription(
    typeof body.description === "string" ? body.description : "",
  );
  if (!description) {
    return NextResponse.json({ ok: false, error: "no description" }, { status: 400 });
  }

  const known = new Set(signalTaxonomy.map((signal) => signal.id));
  const exclude = Array.isArray(body.remove)
    ? body.remove.filter(
        (item): item is SignalId => typeof item === "string" && known.has(item as SignalId),
      )
    : [];
  const sessionRaw = body.session;
  const session =
    typeof sessionRaw === "string" && sessionRaw
      ? sessionRaw
      : crypto.randomUUID();

  const outcome = runMatch({ description, exclude });
  const event = buildEvent({ description, exclude }, outcome, session);
  await saveMatchEvent(event);

  return NextResponse.json({
    ok: true,
    outcome,
    eventId: event.id,
    token: event.id,
  });
}