create table if not exists "roles" (
  "id" text primary key,
  "title" text not null,
  "pod" text not null,
  "status" text not null,
  "location" text not null,
  "band" text not null,
  "summary" text not null
);

create table if not exists "applications" (
  "id" text primary key,
  "token" text not null unique,
  "role_id" text not null,
  "name" text not null,
  "email" text not null,
  "gate" text not null,
  "submitted_at" timestamp with time zone not null,
  "updated_at" timestamp with time zone not null,
  "source" text not null
);

create table if not exists "diagnostics" (
  "id" text primary key,
  "application_id" text not null,
  "token" text not null unique,
  "variant" text not null,
  "opened_at" timestamp with time zone,
  "due_at" timestamp with time zone,
  "submitted_at" timestamp with time zone,
  "payload" jsonb,
  "draft" jsonb,
  "scores" jsonb,
  "reviewer_ids" jsonb,
  "reviewer_note" text
);

create table if not exists "gate_events" (
  "id" text primary key,
  "application_id" text not null,
  "gate" text not null,
  "outcome" text not null,
  "occurred_at" timestamp with time zone not null,
  "note_internal" text not null
);

alter table "diagnostics" add column if not exists "draft" jsonb;
alter table "diagnostics" add column if not exists "reviewer_note" text;
