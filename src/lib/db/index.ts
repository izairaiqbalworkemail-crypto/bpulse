import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import { env } from "@/lib/env";
import * as schema from "./schema";

/**
 * Lazily constructed: `neon()` validates its connection string eagerly, so
 * building it at module scope would throw on import whenever DATABASE_URL is
 * unset — including on the honeypot/rate-limit paths in the route that never
 * touch the database. Deferring construction until first real use keeps
 * those paths working in local dev without a database configured.
 */
let _db: ReturnType<typeof drizzle<typeof schema>> | null = null;

export function getDb() {
  if (!_db) {
    if (!env.DATABASE_URL) {
      throw new Error("DATABASE_URL is not configured");
    }
    _db = drizzle(neon(env.DATABASE_URL), { schema });
  }
  return _db;
}
