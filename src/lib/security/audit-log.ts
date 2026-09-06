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
    const message = "Audit logging failed. Request blocked until logging is restored.";
    if (process.env.NODE_ENV === "production") {
      throw new Error(message, { cause: err });
    }
    console.warn("[audit-log] write failed in non-production; continuing", err);
  }
}

function hashIp(ip: string): string {
  return createHash("sha256").update(ip).digest("hex");
}
