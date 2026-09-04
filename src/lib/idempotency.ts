/**
 * In-memory idempotency cache for submission request IDs. Same restart
 * caveat as rate-limit.ts: this map is per-instance and clears on cold
 * start, so a retry that lands on a fresh instance after a restart will
 * re-submit rather than dedupe. Acceptable for a five-minute window on a
 * low-traffic endpoint — the risk is an occasional duplicate lead email,
 * not a correctness failure.
 */

const WINDOW_MS = 5 * 60_000;

const seen = new Map<string, { id: string; expiresAt: number }>();

export function getCachedSubmission(requestId: string): string | null {
  const entry = seen.get(requestId);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    seen.delete(requestId);
    return null;
  }
  return entry.id;
}

export function cacheSubmission(requestId: string, submissionId: string): void {
  seen.set(requestId, { id: submissionId, expiresAt: Date.now() + WINDOW_MS });
}
