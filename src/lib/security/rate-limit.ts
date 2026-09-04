import { Ratelimit } from "@upstash/ratelimit";
import type { Redis } from "@upstash/redis";

import { getRedis } from "@/lib/redis";

/**
 * Per-IP, per-route-class budgets, enforced in proxy.ts on every API route.
 * Backed by Upstash Redis (already a required boot dependency for report
 * view logging — see src/lib/redis.ts), so this survives cold starts and is
 * shared across serverless instances, unlike an in-memory map.
 *
 * Two budgets: a tight one for the lead-delivery endpoint (already guarded
 * by its own honeypot/idempotency, but still deserves a floor), and a
 * looser one for everything else under /api/.
 *
 * getRedis() throws in production if Upstash isn't configured — correct as
 * a boot check inside a route module, but proxy.ts runs on every request
 * including the first one on a cold instance, possibly before any route
 * module has imported env.ts. Lazily constructing (and catching) here means
 * a misconfigured/unreachable Redis fails a single rate-limit check instead
 * of taking down every request through the proxy.
 */
let redis: Redis | null | undefined;
let contactLimiter: Ratelimit | null = null;
let defaultApiLimiter: Ratelimit | null = null;

function limiters(): { contact: Ratelimit | null; api: Ratelimit | null } {
  if (redis === undefined) {
    try {
      redis = getRedis();
    } catch (err) {
      console.error("[rate-limit] Redis unavailable, failing open", err);
      redis = null;
    }
    if (redis) {
      contactLimiter = new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(5, "60 s"),
        prefix: "ratelimit:contact",
      });
      defaultApiLimiter = new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(30, "60 s"),
        prefix: "ratelimit:api",
      });
    }
  }
  return { contact: contactLimiter, api: defaultApiLimiter };
}

export type RateLimitResult = {
  limited: boolean;
  retryAfterSeconds: number;
};

function limiterFor(pathname: string): Ratelimit | null {
  const { contact, api } = limiters();
  if (pathname.startsWith("/api/contact")) return contact;
  if (pathname.startsWith("/api/")) return api;
  return null;
}

/**
 * Returns { limited: false } (never blocks) when Redis isn't configured or
 * unreachable — fails open rather than taking the whole proxy down. In
 * production this null case should only ever be transient (a Redis outage),
 * since env.ts refuses to boot without Upstash credentials in the first
 * place; in local dev without credentials it's the expected, permanent
 * state.
 */
export async function checkRateLimit(
  pathname: string,
  ip: string
): Promise<RateLimitResult> {
  const limiter = limiterFor(pathname);
  if (!limiter) {
    return { limited: false, retryAfterSeconds: 0 };
  }

  try {
    const { success, reset } = await limiter.limit(`${pathname}:${ip}`);
    return {
      limited: !success,
      retryAfterSeconds: Math.max(1, Math.ceil((reset - Date.now()) / 1000)),
    };
  } catch (err) {
    console.error("[rate-limit] check failed, failing open", err);
    return { limited: false, retryAfterSeconds: 0 };
  }
}
