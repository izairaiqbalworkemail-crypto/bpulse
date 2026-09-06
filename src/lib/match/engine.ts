import { signalTaxonomy, type SignalId } from "@/content/signals";
import { capabilityTerms, type MatchCapability } from "@/content/match-terms";
import { lots } from "@/content/lots";
import { indexProjects } from "@/content/catalogue";
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
  Extraction,
  LotComparison,
  MatchConfidence,
  MatchInput,
  MatchOutcome,
  MatchResult,
  RankedResult,
  Shape,
  SignalHit,
} from "./types";

export const FOUNDER_ID = "aneeb";

const WEIGHT = {
  signals: 4,
  capability: 3,
  domain: 2,
  stack: 2,
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

function signalsOf(personId: string): SignalId[] {
  const person = specialists.find((item) => item.id === personId);
  return person?.signalsAddressed ?? [];
}

/* ──────────────────────────────────────────────
   Stage 1 — Extract. Phrase match → signals.
   Deterministic: iterate the taxonomy in order.
   ────────────────────────────────────────────── */

export function extractSignals(
  description: string,
  exclude: ReadonlySet<SignalId> = new Set(),
): Extraction {
  const hits: SignalHit[] = [];
  let rawHits = 0;
  for (const signal of signalTaxonomy) {
    if (exclude.has(signal.id)) continue;
    const matched = signal.phrases.filter((phrase) => hasTerm(description, phrase));
    if (matched.length === 0) continue;
    rawHits += matched.length;
    hits.push({
      signalId: signal.id,
      category: signal.category,
      phrases: matched,
      quote: quoteSpan(description, matched),
    });
  }
  return { hits, count: hits.length, rawHits };
}

/* ──────────────────────────────────────────────
   Stage 2 — Compare. Signals → engagements.
   Every one of the 24 rows in the record is scored.
   The number of rows sharing ≥1 signal is the number
   we ever claim about "the same way".
   ────────────────────────────────────────────── */

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

export function compareEngagements(
  extraction: Extraction,
  description: string,
): LotComparison[] {
  const extracted = new Set(extraction.hits.map((hit) => hit.signalId));
  const descTokens = new Set(tokensOf(description));

  const rows: LotComparison[] = [];

  for (const lot of lots) {
    rows.push(comparisonRow({
      id: lot.slug,
      kind: "lot",
      client: lot.client,
      title: lot.title,
      engagement: lot.signals,
      corpus: lotCorpus(lot.slug),
      extracted,
      descTokens,
    }));
  }

  for (const project of indexProjects) {
    rows.push(comparisonRow({
      id: project.id,
      kind: "index",
      client: project.client,
      title: project.line,
      engagement: project.signals ?? [],
      corpus: `${project.line} ${project.client} ${project.stack}`,
      extracted,
      descTokens,
    }));
  }

  return rows.sort((a, b) => {
    if (b.total !== a.total) return b.total - a.total;
    return a.id.localeCompare(b.id);
  });
}

function comparisonRow(args: {
  id: string;
  kind: "lot" | "index";
  client: string;
  title: string;
  engagement: SignalId[];
  corpus: string;
  extracted: Set<SignalId>;
  descTokens: Set<string>;
}): LotComparison {
  const overlap = args.engagement.filter((id) => args.extracted.has(id));
  const signalScore = clamp01(overlap.length / Math.max(1, args.engagement.length));
  const corpusTokens = new Set(tokensOf(args.corpus));
  let textOverlap = 0;
  for (const token of args.descTokens) {
    if (corpusTokens.has(token)) textOverlap += 1;
  }
  const textScore = clamp01(textOverlap / 8);
  return {
    id: args.id,
    kind: args.kind,
    client: args.client,
    title: args.title,
    overlap,
    engagement: args.engagement,
    signalScore,
    textScore,
    total: signalScore * 0.8 + textScore * 0.2,
  };
}

/** Engagements whose arrival condition shares ≥1 signal with the description. */
export function sameWayCount(comparisons: LotComparison[]): number {
  return comparisons.filter((row) => row.overlap.length > 0).length;
}

export function dominantComparison(
  comparisons: LotComparison[],
): LotComparison | null {
  const lead = comparisons[0];
  if (!lead) return null;
  if (lead.total > 0.08 && lead.overlap.length > 0) return lead;
  return null;
}

/* ──────────────────────────────────────────────
   Stage 3 — Rank. People, weighted.
   signals·4, capability·3, domain·2, stack·2, availability·1.
   Never a score on the page — this ordering only.
   ────────────────────────────────────────────── */

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

function domainScore(inputTokens: string[], domains: string[]): number {
  const theirs = new Set(stackTokens(domains));
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

function stageLift(specialistId: string, stage?: MatchInput["stage"]): number {
  if (!stage) return 0;
  return lots.some(
    (lot) =>
      lot.specialistId === specialistId &&
      ((stage === "stuck" && lot.grade.state === "stalled") ||
        (stage === "live-fragile" &&
          (lot.grade.state === "unstable" ||
            lot.grade.state === "integration-blocked")) ||
        (stage === "building" && lot.grade.state === "incomplete")),
  )
    ? 0.06
    : 0;
}

function confidenceOf(
  extractionCount: number,
  addressedCount: number,
  total: number,
): MatchConfidence {
  if (extractionCount < 2) return "exploratory";
  if (addressedCount >= 2 && total >= 4.2) return "strong";
  return "partial";
}

function founderFallback(description: string, injection: boolean): RankedResult {
  const evidence: Evidence[] =
    description.trim().length === 0 || injection
      ? [
          {
            kind: "capability",
            claim:
              description.trim().length === 0
                ? "Nothing was written yet. Aneeb will read whatever you send him."
                : "The words look like an instruction to us, not a real condition. Aneeb will read it himself.",
          },
        ]
      : [
          {
            kind: "capability",
            claim:
              "Nothing in our record matches this closely. Aneeb will read it himself and a named person shapes it by hand.",
          },
        ];
  return {
    specialistId: FOUNDER_ID,
    capability: "delivery",
    confidence: "exploratory",
    signals: [],
    evidence,
    total: 0,
  };
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

function evidenceFor(args: {
  description: string;
  personId: string;
  hits: SignalHit[];
  addressed: SignalHit[];
  capHits: string[];
  stackHits: string[];
  comparisons: LotComparison[];
}): Evidence[] {
  const lines: Evidence[] = [];
  const signal = args.addressed[0];

  const ownLot = args.comparisons.find(
    (row) =>
      row.kind === "lot" &&
      row.overlap.length > 0 &&
      lots.some(
        (lot) => lot.slug === row.id && lot.specialistId === args.personId,
      ),
  );

  if (signal && signal.quote) {
    const say = signalTaxonomy.find((item) => item.id === signal.signalId);
    lines.push({
      kind: "signal",
      claim: `You said “${signal.quote}.” ${
        say ? `${say.says} That is the condition they already ship past.` : ""
      }`,
    });
  } else if (ownLot) {
    const lot = lots.find((item) => item.slug === ownLot.id);
    if (lot) {
      const quoted = quoteSpan(args.description, ownLot.overlap);
      lines.push({
        kind: "lot",
        lotSlug: lot.slug,
        claim: `${
          quoted
            ? `You said “${quoted}.”`
            : "What you described sits next to a lot we already took."
        } ${lot.client} arrived the same way — ${lot.condition.split(".")[0]!.trim()}.`,
      });
    }
  } else if (signal && !signal.quote && args.addressed.length > 0) {
    const labels = args.addressed
      .slice(0, 2)
      .map((hit) => hit.phrases[0])
      .join(", ");
    lines.push({
      kind: "signal",
      claim: `The words you used sit in the work they already do: ${labels}.`,
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

  if (args.stackHits.length > 0) {
    lines.push({
      kind: "stack",
      claim: `Their stack on the record includes ${args.stackHits.slice(0, 3).join(", ")}.`,
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

function shapeFor(
  outcome: Pick<MatchOutcome, "extraction" | "results" | "comparisons" | "confidence">,
): Shape | undefined {
  const lead = outcome.results[0];
  if (!lead) return undefined;
  if (outcome.confidence === "exploratory") {
    return {
      estimate: "No sound shape from the record — nothing on file comes close.",
      consequence: "Aneeb reads it himself, then shapes it by hand before anything ships.",
    };
  }
  const first = lead.specialistId === FOUNDER_ID ? "Aneeb" : undefined;
  const person = specialists.find((item) => item.id === lead.specialistId);
  const name = first ?? person?.name.split(" ")[0] ?? "They";
  const count = outcome.extraction.count;
  const estimate =
    count <= 2
      ? "A few focused weeks"
      : count === 3
        ? "Three to four weeks"
        : "A month, aiming at the first shippable slice";
  const dominant = dominantComparison(outcome.comparisons);
  const consequence = dominant
    ? `${name} closes these conditions by the book — ${dominant.client} arrived the same way and shipped.`
    : `${name} closes these conditions on record. The scope narrows before it widens.`;
  return { estimate, consequence };
}

/* ──────────────────────────────────────────────
   runMatch — the whole, deterministic pipeline.
   ────────────────────────────────────────────── */

export function runMatch(input: MatchInput): MatchOutcome {
  const description = clipDescription(input.description ?? "");
  const injection = looksLikeInjection(description);
  const usableText = injection ? "" : description;
  const descTokens = tokensOf(usableText);
  const chipTokens = stackTokens(input.stack ?? []);

  const extraction = extractSignals(
    usableText,
    new Set(input.exclude ?? []),
  );
  const comparisons = compareEngagements(extraction, usableText);
  const capHits = capabilityHits(usableText);

  const empty = description.trim().length === 0;
  const exploratory = empty || injection || extraction.count < 2;

  if (exploratory) {
    const founder = founderFallback(description, injection || empty);
    return {
      input,
      extraction,
      comparisons,
      results: [founder],
      confidence: "exploratory",
      shape: shapeFor({
        extraction,
        results: [founder],
        comparisons,
        confidence: "exploratory",
      }),
    };
  }

  const ranked = pool()
    .map((person) => {
      const capped = capabilityOf(person.id);
      const theirSignals = new Set(signalsOf(person.id));
      const addressed = extraction.hits.filter((hit) =>
        theirSignals.has(hit.signalId),
      );
      const signalScore = clamp01(addressed.length / 3);
      const caps = capHits[capped];
      const capScore = clamp01(caps.length / 3);
      const domScore = domainScore(descTokens, person.domains);
      const stacks = stackScore([...descTokens, ...chipTokens], person.stack);
      const avail = availabilityScore(person.id);
      const urgencyBoost = input.urgency === "now" ? avail * 0.15 : 0;
      const total =
        signalScore * WEIGHT.signals +
        capScore * WEIGHT.capability +
        domScore * WEIGHT.domain +
        stacks * WEIGHT.stack +
        avail * WEIGHT.availability +
        urgencyBoost +
        stageLift(person.id, input.stage);

      const stackHits = person.stack.filter(
        (item) =>
          chipTokens.includes(normalizeToken(item)) ||
          descTokens.includes(normalizeToken(item)),
      );

      return {
        person,
        capped,
        total,
        addressed,
        caps,
        stackHits,
      };
    })
    .sort((a, b) => {
      if (b.total !== a.total) return b.total - a.total;
      return a.person.id.localeCompare(b.person.id);
    });

  const picked = ranked.slice(0, 3).filter((row, index) => {
    if (index === 0) return row.total >= 2.2;
    return row.total >= 2.2;
  });

  if (picked.length === 0) {
    const founder = founderFallback(description, false);
    return {
      input,
      extraction,
      comparisons,
      results: [founder],
      confidence: "exploratory",
      shape: shapeFor({
        extraction,
        results: [founder],
        comparisons,
        confidence: "exploratory",
      }),
    };
  }

  const results: RankedResult[] = picked.map((row) => ({
    specialistId: row.person.id,
    capability: row.capped,
    confidence: confidenceOf(extraction.count, row.addressed.length, row.total),
    signals: row.addressed.map((hit) => hit.signalId),
    evidence: evidenceFor({
      description,
      personId: row.person.id,
      hits: extraction.hits,
      addressed: row.addressed,
      capHits: row.caps,
      stackHits: row.stackHits,
      comparisons,
    }),
    total: row.total,
  }));

  return {
    input,
    extraction,
    comparisons,
    results,
    confidence: results[0]?.confidence ?? "exploratory",
    shape: shapeFor({
      extraction,
      results,
      comparisons,
      confidence: results[0]?.confidence ?? "exploratory",
    }),
  };
}

/** Compact view used by the matcher and legacy callers. */
export function match(input: MatchInput): MatchResult[] {
  return runMatch(input).results;
}

/** Signals a description carries, for the pages that need the extraction alone. */
export type { Signal, SignalId } from "@/content/signals";