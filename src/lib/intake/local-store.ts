import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";

export type LocalSubmission = {
  id: string;
  type: string;
  source?: string | null;
  email?: string | null;
  payload: Record<string, unknown>;
  requestId: string;
  savedAt: string;
};

/**
 * Local-dev desk. Writes one JSONL row so the Check works before
 * Neon and Resend are connected. Not used in production if DATABASE_URL is set.
 */
export async function saveLocalSubmission(
  row: Omit<LocalSubmission, "savedAt">,
): Promise<string> {
  const dir = path.join(process.cwd(), ".data");
  await mkdir(dir, { recursive: true });
  const record: LocalSubmission = {
    ...row,
    savedAt: new Date().toISOString(),
  };
  await appendFile(
    path.join(dir, "submissions.jsonl"),
    `${JSON.stringify(record)}\n`,
    "utf8",
  );
  return record.id;
}
