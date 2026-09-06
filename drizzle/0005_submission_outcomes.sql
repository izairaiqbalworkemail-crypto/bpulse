alter table "submissions"
  add column if not exists "outcome" text not null default 'new',
  add column if not exists "outcome_at" timestamp with time zone,
  add column if not exists "value_usd" numeric(12, 2);
