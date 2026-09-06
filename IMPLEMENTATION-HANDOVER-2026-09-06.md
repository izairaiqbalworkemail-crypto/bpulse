# Implementation Handover - 2026-09-06

This document captures all major work completed in this pass so the project can continue without context loss.

## 1) Platform and security foundations

- Added secure studio/admin session handling and logout flows.
- Updated route protection in `src/proxy.ts`:
  - authenticated users on non-report host are redirected from `/` to `/admin`
  - `/admin` and `/portal` are concealed for logged-out users
  - report host root rewrites to `/report`
- Strengthened audit logging behavior:
  - `src/lib/security/audit-log.ts` now fails closed in production when writes fail
  - sensitive admin/studio/portal actions and reads now block if audit fails

## 2) Admin operations surface

- Built admin shell and multi-view operations workspace:
  - `src/app/admin/layout.tsx`
  - `src/app/admin/page.tsx`
- Added five operational views:
  - Inbox
  - Reports
  - Follow-up queue
  - Candidates
  - Numbers
- Added CRM-style controls for submissions:
  - outcome updates (`OutcomePicker` + `/api/admin/submissions/outcome`)
  - status updates (`StatusPicker` + `/api/admin/submissions/status`)
  - triage action (`TriageButton` + `/api/admin/submissions/triage`)
  - direct reply composer (`ReplyComposer` + `/api/admin/reply`)

## 3) Careers CRM (jobs + applicants)

- Added job posting from admin:
  - `JobComposer` UI
  - `JobStatusPicker` UI for open/pipeline/closed updates
  - `/api/admin/careers/jobs` endpoint (auth + audit)
- Added public job application flow:
  - `JobsBoard` on `/careers`
  - `/api/careers/apply` endpoint
  - applications tied to a selected role
- Applicants now appear grouped under each job in admin Jobs view.
- Each applicant gets a status token and status page link (`/careers/status/[token]`).

## 4) Careers diagnostic (premium redesign + complete flow)

- Full redesign of diagnostic page:
  - `src/app/careers/diagnostic/[token]/page.tsx`
  - improved dossier-style layout, role/candidate context, status-link surface
- Upgraded form UX:
  - `src/components/careers/DiagnosticForm.tsx`
  - progress indicator, cleaner structure, motion, better save/submit feedback
  - autosave timestamp feedback
  - proper submitted terminal state using shared success component
- Added pipeline-backed context lookup by diagnostic token:
  - `getDiagnosticContextData` in `src/lib/careers/repo.ts`

## 5) Intake and success-state UX upgrade

- Introduced reusable completion component:
  - `src/components/intake/SubmissionSuccess.tsx`
- Wired completion states across intake surfaces:
  - `IntakeForm`
  - `BriefIntake`
  - `ConditionDesk`
  - `DirectDesk`
  - `conversation/Desk`
  - `DocketFiled`
- Added subtle completion animation styles in `src/app/globals.css`.

## 6) Theme and visual consistency fixes

- Fixed cross-page contrast issue by setting a safe non-report main background:
  - `src/components/SiteChrome.tsx`
- Reworked `src/app/demo/handover/page.tsx` for consistent themed rendering and layout quality.

## 7) Data layer and migrations

- Runtime DB client moved/standardized to Postgres JS + Drizzle in `src/lib/db/index.ts`.
- Added dev-safe connection behavior:
  - global singleton reuse in dev to avoid connection-slot exhaustion
  - smaller non-prod pool limits/timeouts
- Added schema and write paths for submissions, outcomes, and careers entities.

### New/updated SQL migrations

- `drizzle/0005_submission_outcomes.sql`
- `drizzle/0006_careers_tables.sql`
- older migrations updated to idempotent `IF NOT EXISTS` where needed:
  - `0000`, `0001`, `0002`, `0003`, `0004`

## 8) Migration tooling fix

- Added resilient migration runner:
  - `scripts/db-migrate.mjs`
  - tracks applied files in `_bpulse_migrations`
  - supports reruns safely by checksum
  - retries with relaxed SSL verification if local cert chain is untrusted
- Updated scripts:
  - `db:migrate` now uses custom runner
  - `db:migrate:drizzle` kept as fallback

## 9) Portal and reporting improvements

- Added `PortalAnalytics` and mounted under portal layout only.
- Expanded portal view parity pages.
- Added report-host root page and host-specific behavior.
- Added more admin/report linkage and report journey copy updates.

## 10) Supabase additions required

Run these in your target Supabase project/environment:

1. Apply DB migrations
   - `pnpm db:migrate`
   - This must create/ensure: `roles`, `applications`, `diagnostics`, `gate_events`, and existing intake/report tables.

2. Verify required tables exist
   - `submissions`
   - `reads`
   - `match_events`
   - `match_outcomes`
   - `ops_audit_log`
   - `ops_report_meta`
   - `roles`
   - `applications`
   - `diagnostics`
   - `gate_events`

3. Apply portal SQL (if not already applied)
   - `supabase/migrations/20260906120000_portal_schema.sql`
   - `supabase/migrations/20260906120100_portal_rls.sql`
   - `supabase/migrations/20260906120200_portal_rls_adversarial.sql`

4. Environment variables to set in Supabase/Vercel runtime
   - `DATABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `SUPABASE_PROJECT_REF`
   - `STUDIO_AUTH_SECRET`
   - `STUDIO_ADMIN_ALLOWLIST`
   - `RESEND_API_KEY` (for real email delivery)
   - `RESEND_FROM`
   - optional cache/rate limit:
     - `UPSTASH_REDIS_REST_URL`
     - `UPSTASH_REDIS_REST_TOKEN`
   - optional analytics:
     - `NEXT_PUBLIC_POSTHOG_HOST`
     - `NEXT_PUBLIC_POSTHOG_KEY`
     - `NEXT_PUBLIC_UMAMI_SCRIPT_URL`
     - `NEXT_PUBLIC_UMAMI_WEBSITE_ID`

5. Operational checks after deploy
   - Login flow works for allowlisted emails.
   - `/admin` hidden for logged-out users.
   - Careers jobs posted from admin appear on `/careers`.
   - Applying to a job creates an applicant under that job and yields status link.
   - Diagnostic autosave/submit persists and status page resolves.
   - Audit log rows are written for admin mutations.

## 11) Current known caveats

- If local `.next` state gets corrupted, clear cache/restart dev server.
- Without `RESEND_API_KEY`, submission emails do not send but data persists.
- Drizzle CLI migrate had issues on this DB path; custom `db:migrate` is the supported path for this repo now.
