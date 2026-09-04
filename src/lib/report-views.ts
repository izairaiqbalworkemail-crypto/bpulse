import { sql } from "drizzle-orm";

import { getRedis } from "@/lib/redis";
import { getDb } from "@/lib/db";
import { reportMeta } from "@/db/schema/ops";

/**
 * Server-side report view log. Timestamp and slug only.
 * No cookies, no IP, no third-party analytics.
 *
 * Redis (report:views) stays the raw, capped recent-activity log it already
 * was. Postgres (ops_report_meta) is the durable per-slug rollup the admin
 * Reports/Follow-up views read — view_count and last_viewed_at, upserted
 * here so a view on a slug with no report_meta row yet still counts instead
 * of being silently dropped.
 */
export async function logReportView(slug: string): Promise<void> {
  const redis = getRedis();
  const entry = JSON.stringify({ slug, t: Date.now() });
  if (redis) {
    await redis.lpush("report:views", entry);
    await redis.ltrim("report:views", 0, 999);
  } else if (process.env.NODE_ENV !== "production") {
    console.info("[report-view]", entry);
  }

  try {
    await getDb()
      .insert(reportMeta)
      .values({ slug, company: slug, viewCount: 1, lastViewedAt: new Date() })
      .onConflictDoUpdate({
        target: reportMeta.slug,
        set: {
          viewCount: sql`${reportMeta.viewCount} + 1`,
          lastViewedAt: new Date(),
        },
      });
  } catch (err) {
    console.error("[report-view] postgres rollup failed", err);
  }
}
