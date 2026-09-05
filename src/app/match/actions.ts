"use server";

import type { MatchActionState } from "@/lib/match/action-state";
import { match } from "@/lib/match/engine";
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

  try {
    const results = match({ description });
    const event = buildEvent({ description }, results, session);
    await saveMatchEvent(event);
    return {
      results,
      eventId: event.id,
      description,
      error: null,
    };
  } catch {
    return {
      results: null,
      eventId: null,
      description,
      error: "The match did not run. Try again.",
    };
  }
}
