import { Redis } from "@upstash/redis";

const isProduction = process.env.NODE_ENV === "production";

let client: Redis | null | undefined;

/**
 * Shared Upstash client. Production must have REST credentials (env.ts
 * already refuses to boot without them). Local dev returns null so the
 * in-memory fallbacks in rate-limit / idempotency can run.
 */
export function getRedis(): Redis | null {
  if (client !== undefined) return client;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (url && token) {
    client = new Redis({ url, token });
    return client;
  }

  if (isProduction) {
    throw new Error(
      "[boot] Upstash Redis is not configured. Production refuses to start without UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN."
    );
  }

  client = null;
  return client;
}
