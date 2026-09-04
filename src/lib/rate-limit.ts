import { Ratelimit } from "@upstash/ratelimit";
import { getRedis } from "@/lib/redis";

/**
 * Sliding window: 5 requests per minute per IP.
 * Production uses Upstash (shared across invocations).
 * Local dev falls back to an in-memory map — never in production.
 */

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;

type Bucket = { count: number; windowStart: number };
const localBuckets =
  process.env.NODE_ENV === "production"
    ? null
    : new Map<string, Bucket>();

let limiter: Ratelimit | null | undefined;

function getLimiter(): Ratelimit | null {
  if (limiter !== undefined) return limiter;
  const redis = getRedis();
  if (!redis) {
    limiter = null;
    return null;
  }
  limiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(MAX_REQUESTS_PER_WINDOW, "1 m"),
    prefix: "rl:intake",
  });
  return limiter;
}

export async function isRateLimited(key: string): Promise<boolean> {
  const redisLimiter = getLimiter();
  if (redisLimiter) {
    const { success } = await redisLimiter.limit(key);
    return !success;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("[rate-limit] Redis required in production");
  }

  if (!localBuckets) return false;
  const now = Date.now();
  const bucket = localBuckets.get(key);
  if (!bucket || now - bucket.windowStart > WINDOW_MS) {
    localBuckets.set(key, { count: 1, windowStart: now });
    return false;
  }
  bucket.count += 1;
  return bucket.count > MAX_REQUESTS_PER_WINDOW;
}
