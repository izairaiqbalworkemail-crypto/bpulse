import type { MatchCapability } from "@/content/match-terms";

export type MatchStage = "idea" | "building" | "stuck" | "live-fragile";
export type MatchUrgency = "now" | "weeks" | "exploring";
export type MatchConfidence = "strong" | "partial" | "weak";

export type MatchInput = {
  description: string;
  stage?: MatchStage;
  stack?: string[];
  urgency?: MatchUrgency;
};

export type Evidence = {
  kind: "lot" | "stack" | "capability";
  lotSlug?: string;
  claim: string;
};

export type MatchResult = {
  specialistId: string;
  capability: MatchCapability;
  evidence: Evidence[];
  confidence: MatchConfidence;
};

export interface Matcher {
  match(input: MatchInput): Promise<MatchResult[]>;
}
