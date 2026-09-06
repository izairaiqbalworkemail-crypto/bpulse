"use server";

import type { MatchActionState } from "@/lib/match/action-state";
import { runMatch } from "@/lib/match/engine";
import { clipDescription } from "@/lib/match/normalize";
import { buildEvent, saveMatchEvent } from "@/lib/match/store";

export async function runMatchAction(
  _previous: MatchActionState,
  formData: FormData,
): Promise<MatchActionState> {
  const raw = formData.get("description");
  const description = clipDescription(typeof raw === "string" ? raw : "");
  const sessionRaw = formData.get("session");
  const session =
    typeof sessionRaw === "string" && sessionRaw
      ? sessionRaw
      : crypto.randomUUID();

  if (!description) {
    return {
      outcome: null,
      eventId: null,
      token: null,
      description,
      error: "Say something first.",
    };
  }

  try {
    const outcome = runMatch({ description });
    const event = buildEvent({ description }, outcome, session);
    await saveMatchEvent(event);
    return {
      outcome,
      eventId: event.id,
      token: event.id,
      description,
      error: null,
    };
  } catch {
    return {
      outcome: null,
      eventId: null,
      token: null,
      description,
      error: "The match did not run. Try again.",
    };
  }
}