import { mkdir, appendFile, readFile } from "node:fs/promises";
import path from "node:path";
import { reads } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import type { PreliminaryRead } from "./types";

function file() {
  return path.join(process.cwd(), ".data", "reads.jsonl");
}

async function appendLocal(row: PreliminaryRead) {
  await mkdir(path.dirname(file()), { recursive: true });
  await appendFile(file(), `${JSON.stringify(row)}\n`, "utf8");
}

async function readLocal(): Promise<PreliminaryRead[]> {
  try {
    const raw = await readFile(file(), "utf8");
    return raw
      .split("\n")
      .filter(Boolean)
      .map((line) => JSON.parse(line) as PreliminaryRead);
  } catch {
    return [];
  }
}

async function db() {
  if (!process.env.DATABASE_URL) return null;
  const { getDb } = await import("@/lib/db");
  return getDb();
}

export async function saveRead(row: PreliminaryRead): Promise<void> {
  const connection = await db();
  if (connection) {
    try {
      await connection.insert(reads).values({
        token: row.token,
        createdAt: new Date(row.preparedAt),
        source: row.source,
        email: row.answers.email ?? null,
        title: row.title,
        document: row,
      });
      return;
    } catch (error) {
      console.error("[read] database write failed, saving locally", error);
    }
  }
  await appendLocal(row);
}

export async function getRead(token: string): Promise<PreliminaryRead | null> {
  if (!/^[0-9a-f-]{36}$/i.test(token)) return null;
  const connection = await db();
  if (connection) {
    try {
      const [row] = await connection
        .select()
        .from(reads)
        .where(eq(reads.token, token))
        .limit(1);
      if (row) return row.document;
    } catch {
      // local
    }
  }
  const local = await readLocal();
  return local.find((row) => row.token === token) ?? null;
}
