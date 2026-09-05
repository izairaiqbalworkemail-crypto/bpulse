import { pgTable, text, timestamp, jsonb, uuid } from "drizzle-orm/pg-core";
import type { MatchResult } from "@/lib/match/types";
import type { PreliminaryRead } from "@/lib/read/types";

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

export const reads = pgTable("reads", {
  token: uuid("token").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  source: text("source").notNull(),
  email: text("email"),
  title: text("title").notNull(),
  document: jsonb("document").$type<PreliminaryRead>().notNull(),
});

export const matchOutcomes = pgTable("match_outcomes", {
  id: uuid("id").primaryKey().defaultRandom(),
  matchEventId: uuid("match_event_id").notNull(),
  outcome: text("outcome").notNull(),
  occurredAt: timestamp("occurred_at", { withTimezone: true }).notNull().defaultNow(),
});

export const roles = pgTable("roles", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  pod: text("pod").notNull(),
  status: text("status").notNull(),
  location: text("location").notNull(),
  band: text("band").notNull(),
  summary: text("summary").notNull(),
});

export const applications = pgTable("applications", {
  id: text("id").primaryKey(),
  token: text("token").notNull().unique(),
  roleId: text("role_id").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  gate: text("gate").notNull(),
  submittedAt: timestamp("submitted_at", { withTimezone: true }).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull(),
  source: text("source").notNull(),
});

export const diagnostics = pgTable("diagnostics", {
  id: text("id").primaryKey(),
  applicationId: text("application_id").notNull(),
  token: text("token").notNull().unique(),
  variant: text("variant").notNull(),
  openedAt: timestamp("opened_at", { withTimezone: true }),
  dueAt: timestamp("due_at", { withTimezone: true }),
  submittedAt: timestamp("submitted_at", { withTimezone: true }),
  payload: jsonb("payload"),
  scores: jsonb("scores"),
  reviewerIds: jsonb("reviewer_ids"),
});

export const gateEvents = pgTable("gate_events", {
  id: text("id").primaryKey(),
  applicationId: text("application_id").notNull(),
  gate: text("gate").notNull(),
  outcome: text("outcome").notNull(),
  occurredAt: timestamp("occurred_at", { withTimezone: true }).notNull(),
  noteInternal: text("note_internal").notNull(),
});

export const legalDocs = pgTable("legal_docs", {
  slug: text("slug").primaryKey(),
  version: text("version").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull(),
  status: text("status").notNull(),
  changelog: jsonb("changelog").notNull(),
});
