import { createHash } from "node:crypto";

import { getDb } from "@/lib/db";
import { auditLog } from "@/db/schema/ops";

/**
 * Append-only. There is no update/delete path for this table anywhere in
 * the codebase — keep it that way. ip is hashed here, never stored raw.
 */
export async function recordAuditEvent(input: {
  actor: string;
  action: string;
  target?: string;
  ip?: string;
  metadata?: Record<string, unknown>;
}): Promise<void> {
  try {
    await getDb()
      .insert(auditLog)
      .values({
        actor: input.actor,
        action: input.action,
        target: input.target ?? null,
        ipHash: input.ip ? hashIp(input.ip) : null,
        metadata: input.metadata ?? null,
      });
  } catch (err) {
    // Audit logging must never break the action it's logging.
    console.error("[audit-log] write failed", err);
  }
}

function hashIp(ip: string): string {
  return createHash("sha256").update(ip).digest("hex");
}
