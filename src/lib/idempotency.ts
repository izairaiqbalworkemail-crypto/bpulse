import { getRedis } from "@/lib/redis";

/**
 * Submission request-id cache. Production: Redis key, 5-minute TTL.
 * Local dev: in-memory map. Never the in-memory path in production.
 */

const WINDOW_SECONDS = 5 * 60;
const KEY_PREFIX = "idemp:intake:";

const localSeen =
  process.env.NODE_ENV === "production"
    ? null
    : new Map<string, { id: string; expiresAt: number }>();

export async function getCachedSubmission(
  requestId: string
): Promise<string | null> {
  const redis = getRedis();
  if (redis) {
    const value = await redis.get<string>(`${KEY_PREFIX}${requestId}`);
    return value ?? null;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("[idempotency] Redis required in production");
  }

  if (!localSeen) return null;
  const entry = localSeen.get(requestId);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    localSeen.delete(requestId);
    return null;
  }
  return entry.id;
}

export async function cacheSubmission(
  requestId: string,
  submissionId: string
): Promise<void> {
  const redis = getRedis();
  if (redis) {
    await redis.set(`${KEY_PREFIX}${requestId}`, submissionId, {
      ex: WINDOW_SECONDS,
    });
    return;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("[idempotency] Redis required in production");
  }

  localSeen?.set(requestId, {
    id: submissionId,
    expiresAt: Date.now() + WINDOW_SECONDS * 1000,
  });
}
