import { pgTable, text, timestamp, jsonb, uuid } from "drizzle-orm/pg-core";

export const submissions = pgTable("submissions", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  type: text("type").notNull(),
  source: text("source"),
  payload: jsonb("payload").notNull(),
  email: text("email"),
  status: text("status").notNull().default("received"),
  budget: text("budget"),
  timeline: text("timeline"),
  state: text("state"),
  requestId: text("request_id").notNull().unique(),
});

export type Submission = typeof submissions.$inferSelect;
export type NewSubmission = typeof submissions.$inferInsert;
