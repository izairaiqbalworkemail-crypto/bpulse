import { match as score } from "./engine";
import type { MatchInput, MatchResult, Matcher } from "./types";

/** v1 — ships now, $0, no network. */
export class RuleMatcher implements Matcher {
  async match(input: MatchInput): Promise<MatchResult[]> {
    return score(input);
  }
}

/**
 * v2 — not shipped. A model would extract structure; this class
 * would still call the same scorer. Do not construct it in the app.
 */
export class ModelMatcher implements Matcher {
  async match(_input: MatchInput): Promise<MatchResult[]> {
    throw new Error(
      "ModelMatcher is not shipped. Use RuleMatcher until the logs say v1 is wrong often enough to matter.",
    );
  }
}

export function createMatcher(): Matcher {
  return new RuleMatcher();
}
