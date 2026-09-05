import { pgTable, text, timestamp, jsonb, uuid } from "drizzle-orm/pg-core";
import type { MatchResult } from "@/lib/match/types";

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

export const matchEvents = pgTable("match_events", {
  id: uuid("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  inputHash: text("input_hash").notNull(),
  description: text("description").notNull(),
  stage: text("stage"),
  stack: jsonb("stack").$type<string[]>().notNull(),
  urgency: text("urgency"),
  results: jsonb("results").$type<MatchResult[]>().notNull(),
  confidence: text("confidence").notNull(),
  session: text("session").notNull(),
});

export const matchOutcomes = pgTable("match_outcomes", {
  id: uuid("id").primaryKey().defaultRandom(),
  matchEventId: uuid("match_event_id").notNull(),
  outcome: text("outcome").notNull(),
  occurredAt: timestamp("occurred_at", { withTimezone: true }).notNull().defaultNow(),
});
