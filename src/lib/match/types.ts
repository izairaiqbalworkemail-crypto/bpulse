import type { SignalCategory, SignalId } from "@/content/signals";
import type { MatchCapability } from "@/content/match-terms";

export type MatchStage = "idea" | "building" | "stuck" | "live-fragile";
export type MatchUrgency = "now" | "weeks" | "exploring";

/**
 * Confidence is never a score. Three honest buckets:
 * strong — the words you used sit next to lots and work already on record.
 * partial — a real but partial read; check the reasons.
 * exploratory — nothing in the record comes close; the founder reads it.
 */
export type MatchConfidence = "strong" | "partial" | "exploratory";

export type MatchInput = {
  description: string;
  stage?: MatchStage;
  stack?: string[];
  urgency?: MatchUrgency;
  /** Signals the writer asked to set aside (edit a match live). */
  exclude?: SignalId[];
};

/** Stage 1 — Extract. A signal matched out of the description. */
export type SignalHit = {
  signalId: SignalId;
  category: SignalCategory;
  /** The trigger phrases that actually matched, verbatim from the text. */
  phrases: string[];
  /** A quoted span of the writer's own words, when one can be found. */
  quote?: string | null;
};

export type Extraction = {
  hits: SignalHit[];
  /** Distinct signals matched. This is the number we ever show. */
  count: number;
  /** Total phrase hits including repeats inside one signal. Never shown. */
  rawHits: number;
};

/** Stage 2 — Compare. One row per engagement in the record. */
export type LotComparison = {
  id: string;
  kind: "lot" | "index";
  client: string;
  title: string;
  /** Signals the engagement and the description share. */
  overlap: SignalId[];
  /** Signals on the engagement, full set. */
  engagement: SignalId[];
  /** Fraction of the engagement's own signals that matched. 0–1. */
  signalScore: number;
  /** Token overlap against the engagement's real text. 0–1. */
  textScore: number;
  /** Weighted blend used only to rank; never shown. 0–1. */
  total: number;
};

/** Stage 3 — Rank. A person who could take it, with the reasons. */
export type Evidence = {
  kind: "signal" | "lot" | "stack" | "capability";
  lotSlug?: string;
  claim: string;
};

export type RankedResult = {
  specialistId: string;
  capability: MatchCapability;
  confidence: MatchConfidence;
  /** The signals from this description that this person's work addresses. */
  signals: SignalId[];
  evidence: Evidence[];
  /** Internal rank total. Never rendered. */
  total: number;
};

/** Stage 4 — Shape. A range, never a score. */
export type Shape = {
  /** Qualitative range derived from how many distinct conditions were seen. */
  estimate: string;
  /** What it means that this specific person or lot takes it. */
  consequence: string;
};

export type MatchOutcome = {
  input: MatchInput;
  /** Stage 1 */
  extraction: Extraction;
  /** Stage 2 — ranked against all 24 engagements. */
  comparisons: LotComparison[];
  /** Stage 3 */
  results: RankedResult[];
  /** Stage 4 — omitted for an empty or injection-only description. */
  shape?: Shape;
  confidence: MatchConfidence;
};

export type MatchResult = RankedResult;

export interface Matcher {
  match(input: MatchInput): Promise<MatchResult[]>;
}