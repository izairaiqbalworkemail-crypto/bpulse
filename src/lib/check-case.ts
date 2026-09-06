import { closestReadingLot } from "@/lib/reading-match";
import { getSignal, isSignalId } from "@/content/signals";
import type { SignalId } from "@/content/signals";
import type { Lot } from "@/content/types";

export type SearchLike = Record<string, string | string[] | undefined>;

export type CheckCaseLine = {
  id: SignalId;
  look: string;
  said: string | null;
};

export type CheckCaseView = {
  kind: "personal" | "generic";
  lines: CheckCaseLine[];
  closest: { lot: Lot; shared: number; selected: number } | null;
};

function first(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export function parseSignalIds(raw: string): SignalId[] {
  const seen = new Set<SignalId>();
  const ids: SignalId[] = [];
  for (const part of raw.split(/[,+\s]+/)) {
    if (!isSignalId(part) || seen.has(part)) continue;
    seen.add(part);
    ids.push(part);
  }
  return ids;
}

export function parseCheckCase(params: SearchLike): CheckCaseView {
  const ids = parseSignalIds(first(params.signals));
  if (ids.length === 0) {
    return { kind: "generic", lines: [], closest: null };
  }

  const lines = ids.map((id) => {
    const said = first(params[id]).trim();
    return {
      id,
      look: getSignal(id).says,
      said: said || null,
    };
  });

  return {
    kind: "personal",
    lines,
    closest: closestReadingLot(ids),
  };
}

export function checkHrefFromReading(
  selected: readonly { signal: SignalId; label: string }[],
): string {
  if (selected.length === 0) return "/check";
  const params = new URLSearchParams();
  params.set("signals", selected.map((row) => row.signal).join(","));
  for (const row of selected) {
    params.set(row.signal, row.label);
  }
  return `/check?${params.toString()}`;
}
