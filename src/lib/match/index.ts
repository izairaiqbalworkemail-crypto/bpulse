export {
  FOUNDER_ID,
  match,
  runMatch,
  extractSignals,
  compareEngagements,
  sameWayCount,
  dominantComparison,
} from "./engine";
export { RuleMatcher, ModelMatcher, createMatcher } from "./matchers";
export type {
  Evidence,
  Extraction,
  LotComparison,
  MatchConfidence,
  MatchInput,
  MatchOutcome,
  MatchResult,
  MatchStage,
  MatchUrgency,
  RankedResult,
  Shape,
  SignalHit,
  Matcher,
} from "./types";
export type { Signal, SignalId } from "@/content/signals";