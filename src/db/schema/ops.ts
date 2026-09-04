import { pgTable, text, timestamp, jsonb, uuid, integer } from "drizzle-orm/pg-core";

/**
 * Append-only. No update or delete path exists anywhere in this codebase —
 * enforce that by convention: never import `eq`+update/delete against this
 * table. ip_hash, never a raw IP — hash it at the call site before insert.
 */
export const auditLog = pgTable("ops_audit_log", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  actor: text("actor").notNull(),
  action: text("action").notNull(),
  target: text("target"),
  ipHash: text("ip_hash"),
  metadata: jsonb("metadata"),
});

export const reportMeta = pgTable("ops_report_meta", {
  slug: text("slug").primaryKey(),
  company: text("company").notNull(),
  sentAt: timestamp("sent_at", { withTimezone: true }),
  sentTo: text("sent_to"),
  sourceChannel: text("source_channel"),
  status: text("status").notNull().default("drafted"),
  viewCount: integer("view_count").notNull().default(0),
  lastViewedAt: timestamp("last_viewed_at", { withTimezone: true }),
});

export type AuditLogEntry = typeof auditLog.$inferSelect;
export type NewAuditLogEntry = typeof auditLog.$inferInsert;
export type ReportMeta = typeof reportMeta.$inferSelect;
