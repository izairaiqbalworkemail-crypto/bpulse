/**
 * In-memory rate limiter, keyed by IP.
 *
 * Caveat: this state lives in the function's memory, not a shared store. On
 * Vercel, each serverless instance has its own map and cold starts clear it,
 * so this is a soft limit — it slows a single warm instance, not a hard
 * ceiling across the deployment. Fine for deterring casual abuse of a
 * low-traffic contact endpoint; swap for Upstash Redis if the endpoint ever
 * sees traffic where that gap matters.
 */

type Bucket = { count: number; windowStart: number };

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;

const buckets = new Map<string, Bucket>();

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now - bucket.windowStart > WINDOW_MS) {
    buckets.set(key, { count: 1, windowStart: now });
    return false;
  }

  bucket.count += 1;
  return bucket.count > MAX_REQUESTS_PER_WINDOW;
}
