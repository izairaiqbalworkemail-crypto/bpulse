-- Portal schema for app.bpulse.dev
-- Run inside Supabase SQL editor or migration pipeline.

create extension if not exists "pgcrypto";

create table if not exists organisations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists memberships (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  org_id uuid not null references organisations(id) on delete cascade,
  role text not null check (role in ('client', 'crew', 'admin')),
  created_at timestamptz not null default now(),
  unique (user_id, org_id)
);

create table if not exists engagements (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references organisations(id) on delete cascade,
  name text not null,
  stage text not null,
  scope_version text not null,
  started_on date,
  target_close date,
  status text not null,
  created_at timestamptz not null default now()
);

create table if not exists documents (
  id uuid primary key default gen_random_uuid(),
  engagement_id uuid not null references engagements(id) on delete cascade,
  kind text not null,
  version text not null,
  status text not null,
  signed_on date,
  storage_path text not null,
  created_at timestamptz not null default now()
);

create table if not exists findings (
  id uuid primary key default gen_random_uuid(),
  engagement_id uuid not null references engagements(id) on delete cascade,
  severity text not null,
  observed text not null,
  consequence text not null,
  closing text not null,
  owner_id uuid,
  state text not null,
  opened_on date,
  created_at timestamptz not null default now()
);

create table if not exists scope_versions (
  id uuid primary key default gen_random_uuid(),
  engagement_id uuid not null references engagements(id) on delete cascade,
  version text not null,
  body jsonb not null,
  locked_on date,
  created_at timestamptz not null default now(),
  unique (engagement_id, version)
);

create table if not exists change_orders (
  id uuid primary key default gen_random_uuid(),
  engagement_id uuid not null references engagements(id) on delete cascade,
  scope_version_id uuid references scope_versions(id) on delete set null,
  body text not null,
  price numeric(12, 2),
  status text not null,
  signed_on date,
  created_at timestamptz not null default now()
);

create table if not exists progress (
  id uuid primary key default gen_random_uuid(),
  engagement_id uuid not null references engagements(id) on delete cascade,
  source text not null,
  ref text,
  message text not null,
  at timestamptz not null,
  created_at timestamptz not null default now()
);

create table if not exists updates (
  id uuid primary key default gen_random_uuid(),
  engagement_id uuid not null references engagements(id) on delete cascade,
  author_id uuid,
  body text not null,
  week_of date not null,
  created_at timestamptz not null default now()
);

create table if not exists assignments (
  id uuid primary key default gen_random_uuid(),
  engagement_id uuid not null references engagements(id) on delete cascade,
  crew_id uuid not null,
  role text not null,
  from_date date,
  to_date date,
  created_at timestamptz not null default now()
);

create table if not exists handover (
  id uuid primary key default gen_random_uuid(),
  engagement_id uuid not null unique references engagements(id) on delete cascade,
  runbook_path text,
  credentials_log text,
  revocation_log text,
  completed_on date,
  created_at timestamptz not null default now()
);

create table if not exists audit_log (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid,
  action text not null,
  target text,
  at timestamptz not null default now(),
  meta jsonb
);
