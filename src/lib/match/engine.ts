import { capabilityTerms, type MatchCapability } from "@/content/match-terms";
import { lots } from "@/content/lots";
import { specialists } from "@/content/specialists";
import { crewCapability } from "@/content/crew-lines";
import {
  clamp01,
  clipDescription,
  hasTerm,
  looksLikeInjection,
  normalizeToken,
  quoteSpan,
  tokensOf,
} from "./normalize";
import type {
  Evidence,
  MatchConfidence,
  MatchInput,
  MatchResult,
} from "./types";

export const FOUNDER_ID = "aneeb";

const WEIGHT = {
  capability: 3,
  stack: 2,
  lot: 3,
  availability: 1,
} as const;

const MATCHABLE = new Set(["Integration", "Delivery", "Intelligence"]);

function capabilityOf(id: string): MatchCapability {
  const group = crewCapability[id] ?? "Delivery";
  if (group === "Integration") return "integration";
  if (group === "Intelligence") return "intelligence";
  return "delivery";
}

function pool() {
  return specialists.filter((person) => MATCHABLE.has(crewCapability[person.id] ?? ""));
}

function capabilityHits(text: string): Record<MatchCapability, string[]> {
  const hits: Record<MatchCapability, string[]> = {
    delivery: [],
    integration: [],
    intelligence: [],
  };
  (Object.keys(capabilityTerms) as MatchCapability[]).forEach((cap) => {
    for (const term of capabilityTerms[cap]) {
      if (hasTerm(text, term) && !hits[cap].includes(term)) {
        hits[cap].push(term);
      }
    }
  });
  return hits;
}

function capabilityScore(hits: string[]): number {
  return clamp01(hits.length / 3);
}

function stackTokens(values: string[]): string[] {
  return values.map(normalizeToken).filter(Boolean);
}

function stackScore(inputTokens: string[], specialistStack: string[]): number {
  const theirs = new Set(stackTokens(specialistStack));
  if (theirs.size === 0) return 0;
  let overlap = 0;
  const seen = new Set<string>();
  for (const token of inputTokens) {
    if (theirs.has(token) && !seen.has(token)) {
      seen.add(token);
      overlap += 1;
    }
  }
  return clamp01(overlap / 2);
}

function lotCorpus(slug: string): string {
  const lot = lots.find((item) => item.slug === slug);
  if (!lot) return "";
  return [
    lot.condition,
    lot.summary,
    lot.title,
    lot.outcome,
    lot.grade.label,
    ...(lot.highlights ?? []),
    ...lot.dataLines.map((line) => line.value),
  ].join(" ");
}

function lotScore(
  descriptionTokens: string[],
  specialistId: string,
  stage?: MatchInput["stage"],
): { score: number; slug?: string; overlap: string[] } {
  const theirs = lots.filter((lot) => lot.specialistId === specialistId);
  let best = { score: 0, slug: undefined as string | undefined, overlap: [] as string[] };

  for (const lot of theirs) {
    const corpusTokens = new Set(tokensOf(lotCorpus(lot.slug)));
    const overlap = descriptionTokens.filter((token) => corpusTokens.has(token));
    const unique = [...new Set(overlap)];
    let score = clamp01(unique.length / 6);

    if (stage === "stuck" && lot.grade.state === "stalled") score = clamp01(score + 0.15);
    if (
      stage === "live-fragile" &&
      (lot.grade.state === "unstable" || lot.grade.state === "integration-blocked")
    ) {
      score = clamp01(score + 0.15);
    }
    if (stage === "building" && lot.grade.state === "incomplete") {
      score = clamp01(score + 0.08);
    }

    if (score > best.score && unique.length >= 2) {
      best = { score, slug: lot.slug, overlap: unique };
    }
  }

  return best;
}

function availabilityScore(specialistId: string): number {
  const busy = lots.some(
    (lot) =>
      lot.specialistId === specialistId &&
      lot.dataLines.some(
        (line) =>
          line.label === "Status" && /ongoing/i.test(line.value),
      ),
  );
  return busy ? 0.4 : 1;
}

function confidenceOf(total: number, lot: number, cap: number): MatchConfidence {
  if (total >= 4.2 && (lot >= 0.25 || cap >= 0.5)) return "strong";
  if (total >= 2.2) return "partial";
  return "weak";
}

function founderFallback(description: string): MatchResult {
  return {
    specialistId: FOUNDER_ID,
    capability: "delivery",
    confidence: "weak",
    evidence: [
      {
        kind: "capability",
        claim:
          description.trim().length === 0
            ? "Nothing was written yet. Aneeb will read whatever you send him."
            : "Nothing in our record matches this closely. Aneeb will read it himself.",
      },
    ],
  };
}

function evidenceFor(args: {
  description: string;
  specialistId: string;
  capHits: string[];
  stackHits: string[];
  lot?: { slug: string; overlap: string[] };
}): Evidence[] {
  const lines: Evidence[] = [];
  const lot = args.lot
    ? lots.find((item) => item.slug === args.lot?.slug)
    : undefined;

  if (lot && args.lot) {
    const quoted = quoteSpan(args.description, args.lot.overlap.slice(0, 4));
    const lead = quoted
      ? `You said “${quoted}.”`
      : "What you described sits next to a lot we already took.";
    lines.push({
      kind: "lot",
      lotSlug: lot.slug,
      claim: `${lead} ${lot.client} arrived the same way — ${lot.condition.split(".")[0]!.trim()}.`,
    });
  }

  if (args.stackHits.length > 0) {
    lines.push({
      kind: "stack",
      claim: `Their stack on the record includes ${args.stackHits.slice(0, 3).join(", ")}.`,
    });
  }

  if (args.capHits.length > 0 && lines.length === 0) {
    const quoted = quoteSpan(args.description, args.capHits);
    lines.push({
      kind: "capability",
      claim: quoted
        ? `You said “${quoted}.” That is the lane they already ship in.`
        : `The words you used sit in the work they already do: ${args.capHits.slice(0, 3).join(", ")}.`,
    });
  }

  if (lines.length === 0) {
    lines.push({
      kind: "capability",
      claim: "The closest read is still thin. A named person will look at it.",
    });
  }

  return lines;
}

export function match(input: MatchInput): MatchResult[] {
  const description = clipDescription(input.description ?? "");
  const injection = looksLikeInjection(description);
  const usableText = injection ? "" : description;
  const descTokens = tokensOf(usableText);
  const chipTokens = stackTokens(input.stack ?? []);
  const inputTokens = [...descTokens, ...chipTokens];
  const capHits = capabilityHits(usableText);
  const empty = description.length === 0 || (injection && chipTokens.length === 0);

  if (empty && chipTokens.length === 0) {
    return [founderFallback(description)];
  }

  const ranked = pool()
    .map((person) => {
      const cap = capabilityOf(person.id);
      const caps = capHits[cap];
      const capScore = capabilityScore(caps);
      const stacks = stackScore(inputTokens, person.stack);
      const lot = lotScore(descTokens, person.id, input.stage);
      const avail = availabilityScore(person.id);
      const urgencyBoost = input.urgency === "now" ? avail * 0.15 : 0;
      const total =
        capScore * WEIGHT.capability +
        stacks * WEIGHT.stack +
        lot.score * WEIGHT.lot +
        avail * WEIGHT.availability +
        urgencyBoost;

      const stackHits = person.stack.filter((item) =>
        chipTokens.includes(normalizeToken(item)) ||
        descTokens.includes(normalizeToken(item)),
      );

      return {
        person,
        cap,
        total,
        capScore,
        lot,
        stacks,
        caps,
        stackHits,
      };
    })
    .sort((a, b) => {
      if (b.total !== a.total) return b.total - a.total;
      return a.person.id.localeCompare(b.person.id);
    });

  const top = ranked[0];
  if (!top || top.total < 2.2) {
    return [founderFallback(description)];
  }

  const picked = ranked.slice(0, 3).filter((row, index) => {
    if (index === 0) return true;
    return row.total >= 2.2;
  });

  return picked.map((row) => ({
    specialistId: row.person.id,
    capability: row.cap,
    confidence: confidenceOf(row.total, row.lot.score, row.capScore),
    evidence: evidenceFor({
      description,
      specialistId: row.person.id,
      capHits: row.caps,
      stackHits: row.stackHits,
      lot: row.lot.slug
        ? { slug: row.lot.slug, overlap: row.lot.overlap }
        : undefined,
    }),
  }));
}
