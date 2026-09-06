import { lots } from "@/content/lots";
import type { SignalId } from "@/content/signals";
import type { Lot } from "@/content/types";

export type ReadingMatch = {
  lot: Lot;
  shared: number;
  selected: number;
};

/**
 * Closest lot only when two or more selected signals sit on a real engagement.
 * No percentage. Tie goes to the earlier lot in the catalogue.
 */
export function closestReadingLot(selected: SignalId[]): ReadingMatch | null {
  if (selected.length < 2) return null;

  let best: ReadingMatch | null = null;

  for (const lot of lots) {
    const shared = lot.signals.filter((id) => selected.includes(id)).length;
    if (shared < 2) continue;
    if (!best || shared > best.shared) {
      best = { lot, shared, selected: selected.length };
    }
  }

  return best;
}
