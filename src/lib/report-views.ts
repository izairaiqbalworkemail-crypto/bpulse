import { getRedis } from "@/lib/redis";

/**
 * Server-side report view log. Timestamp and slug only.
 * No cookies, no IP, no third-party analytics.
 */
export async function logReportView(slug: string): Promise<void> {
  const redis = getRedis();
  const entry = JSON.stringify({ slug, t: Date.now() });
  if (redis) {
    await redis.lpush("report:views", entry);
    await redis.ltrim("report:views", 0, 999);
    return;
  }
  if (process.env.NODE_ENV !== "production") {
    console.info("[report-view]", entry);
  }
}
