import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "@/lib/env";
import * as schema from "./schema";

type DbInstance = ReturnType<typeof drizzle<typeof schema>>;

type DbGlobal = typeof globalThis & {
  __bpulse_db?: DbInstance;
  __bpulse_sql?: postgres.Sql;
};

const globalDb = globalThis as DbGlobal;

/**
 * Lazily constructed to avoid throwing on import when DATABASE_URL is missing.
 * In dev we pin pool size low and keep a global singleton across HMR reloads
 * so local Next route reloads do not burn through Postgres connection slots.
 */
let _db: DbInstance | null = globalDb.__bpulse_db ?? null;
let _client: postgres.Sql | null = globalDb.__bpulse_sql ?? null;

export function getDb() {
  if (!_db) {
    if (!env.DATABASE_URL) {
      throw new Error("DATABASE_URL is not configured");
    }
    _client = postgres(env.DATABASE_URL, {
      ssl: "require",
      prepare: false,
      max: process.env.NODE_ENV === "production" ? 10 : 2,
      idle_timeout: 20,
      connect_timeout: 20,
    });
    _db = drizzle(_client, { schema });
    if (process.env.NODE_ENV !== "production") {
      globalDb.__bpulse_sql = _client;
      globalDb.__bpulse_db = _db;
    }
  }
  return _db;
}
