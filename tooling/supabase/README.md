# Portal database setup

This folder holds the Supabase SQL for the client portal.

## CLI setup

1. Login once: `supabase login`
2. Link this repo to your project:
   - Existing project: `supabase link --project-ref <project-ref> --password <db-password>`
   - New project: `supabase projects create bpulse-portal --org-id <org-id> --region ap-southeast-1 --db-password <strong-password>`
3. Apply SQL in order through migrations:
   - `supabase db push`
   - (uses `supabase/migrations/20260906120000_portal_schema.sql` then `20260906120100_portal_rls.sql`)
4. Run adversarial checks in staging/CI (after replacing fixture UUIDs):
   - run `supabase/migrations/20260906120200_portal_rls_adversarial.sql` in SQL Editor

## Environment

Set these values in `.env.local` after linking:

- `SUPABASE_PROJECT_REF` from `supabase status` or dashboard
- `NEXT_PUBLIC_SUPABASE_URL` as `https://<project-ref>.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` from dashboard API settings
- `SUPABASE_SERVICE_ROLE_KEY` from dashboard API settings

## Apply order

1. `portal-schema.sql`
2. `portal-rls.sql`
3. `portal-rls-adversarial.sql` in CI and staging checks

## RLS test goal

Authenticate as org A and query every portal table against org B ids directly in SQL.
Expected result is zero rows for every query.

## Storage reminder

Mirror the same org policies on storage buckets that hold documents.
Rows and files must both enforce org boundaries.
