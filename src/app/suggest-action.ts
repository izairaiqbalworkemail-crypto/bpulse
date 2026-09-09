"use server";

import { suggestCopy } from "@/content/home";
import { getSpecialist } from "@/content/specialists";
import { runMatch } from "@/lib/match/engine";
import { clipDescription } from "@/lib/match/normalize";
import {
  askFor,
  emptySuggest,
  suggestOffer,
  type SuggestState,
} from "@/lib/offer-suggest";

export async function suggestStart(
  _previous: SuggestState,
  formData: FormData,
): Promise<SuggestState> {
  const pickRaw = formData.get("pick");
  const descriptionRaw = formData.get("description");
  const pick = typeof pickRaw === "string" ? pickRaw : "";
  const description = clipDescription(
    typeof descriptionRaw === "string" ? descriptionRaw : "",
  );
  if (!pick && !description) {
    return { ...emptySuggest, error: suggestCopy.empty };
  }

  const { row, offer } = suggestOffer(description, pick || undefined);
  const outcome = runMatch({
    description: description || row.if,
  });
  const lead = outcome.results[0];
  const person = lead ? getSpecialist(lead.specialistId) : null;

  return {
    error: null,
    start: row.start,
    href: row.href,
    price: offer.price,
    meter: offer.meter,
    because: row.if,
    ask: askFor(row.href),
    person: person?.name ?? null,
    role: person?.role ?? null,
  };
}
