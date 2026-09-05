/**
 * Lots that may appear under "what that usually means".
 * Each slug is justified by the lot's own `condition` line — never a guess.
 * If a situation has no matching lot, that block does not render.
 */
export const LOT_PATTERNS = {
  /**
   * DeepIDV — "compliance path demo-tight, not proven against production data"
   * WearMeOut — "looking done in demo mode but not production-ready"
   * myUsta — "Built but not yet live"
   */
  beforeProduction: ["deepidv", "wearmeout", "myusta"],
  /**
   * Clearance — "AI pipeline functional but the compliance and deployment layers still open"
   * Sully — "unable to ship cleanly"
   * WearMeOut — "the actual last twenty percent, still open"
   */
  workingButUnshipped: ["clearance", "sully", "wearmeout"],
  /**
   * Sully — AI employee platform
   * Clearance — AI-powered clearance
   * WearMeOut — AI custom t-shirt platform
   */
  modelInTheStack: ["sully", "clearance", "wearmeout"],
} as const;
