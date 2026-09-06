import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { Client } from "pg";

const ROOT = process.cwd();
const MIGRATIONS_DIR = path.join(ROOT, "drizzle");

await loadLocalEnv();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set. Add it to env or .env.local.");
}

let client = createClient();

try {
  try {
    await client.connect();
  } catch (error) {
    if (!isSelfSignedTlsError(error)) throw error;
    console.warn("[db:migrate] TLS chain untrusted locally, retrying with relaxed verification");
    client = createClient(true);
    await client.connect();
  }
  await client.query(`
    create table if not exists "_bpulse_migrations" (
      "name" text primary key,
      "checksum" text not null,
      "applied_at" timestamp with time zone not null default now()
    );
  `);

  const files = await listMigrationFiles();
  if (files.length === 0) {
    console.log("[db:migrate] no migration files found");
    process.exit(0);
  }

  for (const file of files) {
    const filePath = path.join(MIGRATIONS_DIR, file);
    const sql = await readFile(filePath, "utf8");
    const checksum = sha1(sql);

    const row = await client.query(
      `select "checksum" from "_bpulse_migrations" where "name" = $1 limit 1`,
      [file],
    );

    if (row.rows[0]?.checksum === checksum) {
      console.log(`[db:migrate] skip ${file}`);
      continue;
    }

    console.log(`[db:migrate] apply ${file}`);
    await client.query("begin");
    try {
      await client.query(sql);
      await client.query(
        `
          insert into "_bpulse_migrations" ("name", "checksum", "applied_at")
          values ($1, $2, now())
          on conflict ("name")
          do update set "checksum" = excluded."checksum", "applied_at" = excluded."applied_at";
        `,
        [file, checksum],
      );
      await client.query("commit");
    } catch (error) {
      await client.query("rollback");
      throw new Error(`Failed migration ${file}: ${toErrorMessage(error)}`);
    }
  }

  console.log("[db:migrate] done");
} finally {
  await client.end();
}

function createClient(insecure = false) {
  const connectionString = withSslMode(process.env.DATABASE_URL, insecure ? "no-verify" : undefined);
  return new Client({
    connectionString,
    ...(insecure ? { ssl: { rejectUnauthorized: false } } : {}),
  });
}

function withSslMode(connectionString, sslMode) {
  if (!sslMode) return connectionString;
  if (connectionString.includes("sslmode=")) {
    return connectionString.replace(/sslmode=[^&]+/g, `sslmode=${sslMode}`);
  }
  const joiner = connectionString.includes("?") ? "&" : "?";
  return `${connectionString}${joiner}sslmode=${sslMode}`;
}

function isSelfSignedTlsError(error) {
  if (!error || typeof error !== "object") return false;
  const candidate = error;
  return "code" in candidate && candidate.code === "SELF_SIGNED_CERT_IN_CHAIN";
}

async function listMigrationFiles() {
  const entries = await readdir(MIGRATIONS_DIR, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && /^\d+.*\.sql$/.test(entry.name))
    .map((entry) => entry.name)
    .sort();
}

function sha1(value) {
  return createHash("sha1").update(value, "utf8").digest("hex");
}

function toErrorMessage(value) {
  return value instanceof Error ? value.message : String(value);
}

async function loadLocalEnv() {
  if (process.env.DATABASE_URL) return;

  const envPath = path.join(ROOT, ".env.local");
  let content = "";
  try {
    content = await readFile(envPath, "utf8");
  } catch {
    return;
  }

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq <= 0) continue;
    const key = line.slice(0, eq).trim();
    const value = line.slice(eq + 1).trim().replace(/^"|"$/g, "");
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}
