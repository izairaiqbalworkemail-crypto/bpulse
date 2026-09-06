# LAUNCH-STATE

6 September 2026. Phase 1 only. Nothing after this file was built in this pass.

**Method.** Read `src/app/`, `src/components/`, sitemap, robots, nav, footer, email, legal, reports, careers store. Curled `http://localhost:3000` for every route below. Status codes are from that local server, not a preview deploy.

**I cannot see images.** Visual current-ness is judged from tokens, Episode tones, and chrome in the source, not from screenshots.

`LAUNCH-AUDIT.md` (5 September) is stale. It says `/security` does not exist and careers still mounts `CrewSession`. Both are wrong today.

Verdicts:

| Verdict | Meaning |
|---|---|
| **built and current** | Resolves. Uses iron / signal / rag. Restraint holds (or close). Metadata present. Sitemap/robots match intent. |
| **built but stale** | Resolves, but old chrome, extra gold, cards, pills, a thin page, or a spec gap large enough to matter. |
| **specified, not built** | Named in this brief or in the repo, no working surface. |
| **does not exist** | No route. Curl 404. |

---

## Every route

### Funnel

| Route | HTTP | Verdict | Tokens / restraint | Metadata / OG | Sitemap / robots |
|---|---|---|---|---|---|
| `/read` | 200 | **built and current** | Ribbon. Gold once, on the letter. Docket intake, five fields. Specimen, why free, no second follow-up. | `buildMetadata`. No route OG (falls back to `brand.ogImage`). | In sitemap. Robots `Disallow: /read/` (tokens). Landing is meant to stay public. |
| `/read/[token]` | 404 unless UUID exists | **built and current** | Private article. Print CSS for `.read-doc`. Does **not** reuse the report renderer. | `noindex, nofollow`. Own OG. | Not in sitemap. Robots blocks `/read/`. |
| `/pricing` | 200 | **built and current** | Six rungs, no form. Route table, included, not included, PO / W-8BEN, no discount. Gold once, on the ladder. | `buildMetadata`. No route OG. | In sitemap. Allowed. |
| `/session` | 200 | **built and current** | $400, in/out, credited in 30 days. Gold once, on `OfferStart` + `BriefIntake`. | `buildMetadata` + Service JSON-LD. No route OG. | In sitemap. Allowed. |
| `/first-slice` | 200 | **built and current** | $7,500, two weeks, in/out, honest line. Gold once, on start. | Same as session. | In sitemap. Allowed. |
| `/check` | 200 | **built and current** | Gold once (section 01). Ribbon rooms. Intake on paper. | `buildMetadata` + Service JSON-LD. Own OG. | In sitemap. Allowed. |

### Instruments

| Route | HTTP | Verdict | Notes |
|---|---|---|---|
| `/match` | 200 | **built but stale** | Live `MatchDesk`. Copy says no score. Page still uses coloured plates (`bg-partial`, `bg-ink`, `bg-signal` more than once) and rounded cards. No route OG. In sitemap **and** robots `Disallow: /match/`. |
| `/match/[token]` | 404 unless UUID | **built and current** | Permanent URL. `noindex`. Exploratory routes to Aneeb in the engine. No percentage in the UI. |
| `/report` | 404 | **does not exist** | Correct. No index route. |
| `/report/[slug]` | 200 for two slugs; 404 otherwise | **built and current** | Typed files, `pnpm report:new`, 8-char suffix, limits at equal weight, view log (Redis + Postgres), print, OG, noindex, not in sitemap. Host split in `src/proxy.ts`. |
| `/standard` | 200 | **built and current** | Five gates, rubric for Gate 0 on this page. PageHero + `GateCard`, not the newer Episode ribbon. |
| `/standard/gate-0` | 404 | **specified, not built** | Open public diagnostic is not a route. The work sits at `/careers/diagnostic/[token]`. |

### Operations

| Route | HTTP | Verdict | Notes |
|---|---|---|---|
| `/admin` | 404 | **specified, not built** | No `src/app/admin/`. Schema for `ops_audit_log` exists. `recordAuditEvent()` is never called. |
| `/admin/*` | 404 | **does not exist** | Inbox, reports, follow-up queue, candidates, conversion: none. |
| `/security` | 200 | **built but stale** | Thin. Vendor names only, no regions, no never-do, no SOC 2 line, no claim-to-code. Uses an em dash in the vendor list. In sitemap. |
| `/studio/careers` | 200 | **built but stale** | Gate board. **No auth.** Admin APIs accept unauthenticated POST. Robots disallow `/studio`. |
| `/studio/matches` | 200 | **built but stale** | Match log. No auth. `noindex`. |
| `/careers` | 200 | **built and current** | Public apply page + `BriefIntake`. |
| `/careers/diagnostic/[token]` | 200 for sample `Q7m2Lc9rT4vN8xPw` | **built and current** | Autosave 20s. No account. Three scenario keys; `marlow` and `oxide` are stubs. Rubric is on `/standard`, not on this form. Scores stay in studio. |
| `/careers/status/[token]` | 404 unless a real candidate exists | **built and current** | 16-char token. Gate names only, no scores. Sample diagnostic token has **no** status row (404). No rejection-email path. |
| `/login` | 404 | **does not exist** | |
| `/portal` | 404 | **does not exist** | Sample only, at `/demo`. |

### Legal

| Route | HTTP | Verdict | Notes |
|---|---|---|---|
| `/legal` | 200 | **built and current** | Register. |
| `/legal/data` | 200 | **built and current** | Pakistan, SCC, TIA, measures, vendor regions. In sitemap. |
| `/legal/[slug]` | 200 for all 17 published slugs | **built and current** | One source. Web + PDF + text. Status label exists. Every published doc is `current` / In force. `reviewNote` is not rendered. No solicitor banner. No Breadcrumb JSON-LD. No per-doc OG. |
| `/legal/[slug]/pdf` | 200 | **built and current** | `@react-pdf/renderer`. |
| `/legal/[slug]/text` | 200 | **built and current** | |
| `/legal/[slug]/diff/pdf` | linked from demo | **built and current** | Demo documents page links it. |

Published slugs that resolve: `terms`, `privacy-policy`, `cookie-policy`, `accessibility`, `complaints`, `sub-processors`, `vulnerability-disclosure`, `mutual-nda`, `master-services-agreement`, `statement-of-work`, `change-order`, `ip-assignment`, `data-processing-agreement`, `handover-certificate`, `standard-contractual-clauses`, `crew-agreement`, `gate-2-work-sample`.

### Record, people, demo, chrome

| Route | HTTP | Verdict | Notes |
|---|---|---|---|
| `/` | 200 | **built and current** | Eight rooms. Gold once (Terms). Ladder + Read CTA. |
| `/work` | 200 | **built and current** | Nine lots. |
| `/work/[slug]` | 200 × 9 | **built and current** | Trace OG. Breadcrumb JSON-LD. Unknown slug **throws 500**, not 404 (`getLot`). |
| `/team` | 200 | **built and current** | Twelve. Initials if no photo. |
| `/team/[slug]` | 200 × 12 | **built and current** | Person + breadcrumb JSON-LD. Portrait OG. Unknown slug **500**. |
| `/direct` | 200 | **built and current** | |
| `/direct/[slug]` | 200 | **built and current** | `Write {name}` + `DirectDesk`. |
| `/about` | 200 | **built and current** | Seven rooms. Gold once, on start. |
| `/how-it-works` | 200 | **built but stale** | Ladder copy is current (`ladder.ts`). Chrome is still PageHero + SignalPlate, not the ribbon used on /read /pricing /about. |
| `/second-chair` | 200 | **built and current** | Gold once, on start. Service JSON-LD. Own OG. |
| `/edpulse` | 307 → `/second-chair` | **built and current** | Redirect only. |
| `/demo` and seven views | 200 | **built but stale** | Sample portal. PageHero generation. Honest sample banner. Only `/demo` is in the sitemap. |
| `/notices` | 200 | **built and current** | FAQ JSON-LD. |
| `/contact` | 200 | **built and current** | `BriefIntake`. |
| `/design` | 200 | **built but stale** | Internal. Not in sitemap. Robots disallow. Noindex expected via robots, not a page robot tag check. |
| 404 (`not-found.tsx`) | used | **built but stale** | Two exits (home, /work). Spec asked for three. |
| `error.tsx` | used | **built but stale** | Says “This was not your fault.” Rounded pills. Spec: neither page apologises. |

### Confirmed missing (curl 404)

`/admin`, `/admin/inbox`, `/standard/gate-0`, `/portal`, `/login`, `/report` (index).

---

## Navigation and footer

### Masthead (what visitors actually see)

| Label | href | Curl | Verdict |
|---|---|---|---|
| Mark / bpulse | `/` | 200 | resolves |
| Record | `/work` | 200 | resolves |
| Admitted | `/team` | 200 | resolves |
| Check | `/check` | 200 | resolves |
| How | `/how-it-works` | 200 | resolves |
| Assign | `/match` | 200 | resolves |
| Check · $1,500 | `/check` (home: `#intake`) | 200 | resolves |

`src/config/site.ts` `siteNav` (Work, Check, Pricing, How it works, Team, Careers, About, Notices, Contact) is **not wired**. Dead config, not a dead link.

### Footer

| Label | href | Curl | Verdict |
|---|---|---|---|
| The record | `/work` | 200 | resolves |
| How it works | `/how-it-works` | 200 | resolves |
| Admitted | `/team` | 200 | resolves |
| The standard | `/standard` | 200 | resolves |
| Security | `/security` | 200 | resolves |
| The Read | `/read` | 200 | resolves |
| Pricing | `/pricing` | 200 | resolves |
| The Session | `/session` | 200 | resolves |
| The Check | `/check` | 200 | resolves |
| The First Slice | `/first-slice` | 200 | resolves |
| Second Chair | `/second-chair` | 200 | resolves |
| Assignment | `/match` | 200 | resolves |
| Direct line | `/direct` | 200 | resolves |
| The platform | `/demo` | 200 | resolves |
| About | `/about` | 200 | resolves |
| Applying to the standard | `/careers` | 200 | resolves |
| Notices | `/notices` | 200 | resolves |
| Get in touch | `/contact` | 200 | resolves |
| Legal register | `/legal` | 200 | resolves |
| Where data goes | `/legal/data` | 200 | resolves |
| Terms | `/legal/terms` | 200 | resolves |
| Privacy | `/legal/privacy-policy` | 200 | resolves |
| Cookies | `/legal/cookie-policy` | 200 | resolves |

Zero dead footer or masthead hrefs.

In-page links checked in this pass that also resolve: `/legal/vulnerability-disclosure`, `/legal/sub-processors`, `/legal/standard-contractual-clauses`, `/legal/change-order`, `/team/hamza`, `/demo/handover`, `/work/deepidv`, `/work/sully`.

---

## Components in `src/components/` (117 files)

### Orphaned (20). Safe to delete in Phase 5.

`IntakeForm.tsx`, `intake/CrewSession.tsx` (component unused; `SessionCopy` type still imported), `EightyBar.tsx`, `Tagline.tsx`, `StickyContact.tsx`, `ScrollIntakeLink.tsx`, `TierTable.tsx`, `FieldLog.tsx`, `ProjectGrid.tsx`, `ProjectCard.tsx`, `landing/PhotoFan.tsx`, `landing/FitBand.tsx`, `landing/ContrastNote.tsx`, `landing/LastTwentyLock.tsx`, `match/MatchPrefill.tsx`.

Plus the unused `Wipe` export on `landing/Reveal.tsx`.

### Duplicated, still wired

| Older | Newer | Still used on |
|---|---|---|
| `Reveal.tsx` (IO observer) | `landing/Reveal` | `/match/[token]` only |
| `offer/PricingLadder.tsx` | `pricing/PriceLadder.tsx` | Home Terms, `/session`, `/first-slice` |

### Design-only / demo-only

`primitives/Lot.tsx`, `primitives/Notice.tsx` → `/design`. `FindingsFilter.tsx` → `/demo/findings`.

### In use

The other 95 files reach a live route. Intake is one instrument: `docket/Docket` under `Desk`, `BriefIntake`, `ConditionDesk`, `DirectDesk`, `MatchDesk`.

---

## Against the expected missing list

| Expected | Reality |
|---|---|
| `/read` | **Built.** Not a gap. |
| `/pricing` | **Built.** Not a gap. |
| `/first-slice` | **Built.** Not a gap. |
| `/report/[slug]` | **Built.** Not a gap. Follow-up UI that would read the view log is missing. |
| `/match` | **Built, stale chrome.** Engine is real. |
| `/standard/gate-0` | **Missing as a public route.** Token diagnostic exists. |
| `/admin` | **Missing.** `/studio/*` is an unlocked stand-in. |
| `/security` | **Built, thin.** Not the page in the brief. |
| `/careers/status/[token]` | **Built.** |
| `/careers/diagnostic/[token]` | **Built.** Two of three scenarios are stubs. |
| PDF renderer | **Built.** |
| `/legal/data` | **Built.** |
| Sub-processor list | **Built.** One list in `src/content/legal/vendors.ts`. |
| 404 / error | **Built, both short of the brief.** |
| Per-route OG | **Partial.** Root, `/check`, `/second-chair`, `/work/[slug]`, `/team/[slug]`, `/read/[token]`, `/report/[slug]`. Marketing funnel pages share the default image. `/legal/[slug]` has none of its own. |
| Email templates | **Partial, inline in `src/lib/email.ts`.** Read delivered, intake received, match sent. **Missing:** Check confirmed, application received, gate advanced, report sent. No template system, no plain-text-first layout. |

---

## What is genuinely missing

Highest value left, in this brief’s order, after subtracting what already exists:

1. **`/admin`** with magic link, allowlist, a real 404 when logged out, follow-up queue, two conversion numbers, append-only audit writes.
2. **`/standard/gate-0`** as an open attempt (or an honest public door into the existing token diagnostic), rubric on the form, three real variants.
3. **`/security` rewritten** so every claim traces to code, with never-do, SOC 2 Type I targeted, regions, CSP without `unsafe-inline`.
4. **Studio lock.** `/studio/*` and `/api/careers/admin/*` are public today.
5. **Email set.** Check confirmed, application received, gate advanced, report sent. Rejection is an email first. One template, HTML + plain text.
6. **Connective finish.** Three-exit 404. Error that does not apologise. Unique descriptions. Per-route OG. Breadcrumb JSON-LD on `/legal/[slug]`. Unknown `/work/*` and `/team/*` must 404, not 500.
7. **Cleanup.** Delete the 20 orphans. Finish `marlow` / `oxide`. Show draft banners until a solicitor removes them, or stop saying the docs are waiting. Grep leftover hex in print CSS, email, and `CrewSession`.
8. **Auth and preview.** No working preview was used in this pass. Headers, rate limit, Slack/LinkedIn OG paste, and Lighthouse are unverified.

Phase 2 of this brief (build `/read`, `/pricing`, `/first-slice`) is **already done**. Do not rebuild them. Spend Phase 2 time on the real gaps above, or skip to Phase 3/4.

---

## Sitemap and robots, in one place

**In sitemap, should be:** `/`, `/check`, `/read`, `/pricing`, `/session`, `/first-slice`, `/how-it-works`, `/standard`, `/edpulse`, `/second-chair`, `/demo`, `/work` + 9 lots, `/team` + 12 people, `/careers`, `/about`, `/notices`, `/contact`, `/security`, `/match`, `/direct` + 12 people, `/legal`, `/legal/data`, named legal slugs.

**Out of sitemap, correctly:** `/report/*`, `/read/[token]`, `/match/[token]`, `/careers/status/*`, `/careers/diagnostic/*`, `/admin` (none), `/design`, `/studio/*`.

**Tension.** `/read` and `/match` are in the sitemap while robots disallows `/read/` and `/match/`. Tokens are protected. Landings are supposed to be public. Confirm crawler behaviour on the exact path vs the trailing slash before launch.

**`/admin` is not in robots** because there is no route. Add the disallow when the page exists.

---

## Gold, palette, em dashes (spot check, not Phase 6)

Gold once, from source: `/`, `/read`, `/pricing`, `/check`, `/about`, `/session`, `/first-slice`, `/second-chair`. **`/match` breaks it** (several signal plates).

Legacy hex still lives in print CSS, email HTML, OG image files (token values, acceptable), and orphaned `CrewSession`.

Em dash: `/security` vendor lines use `—`. Full Phase 6 grep is not this file.

---

## Founder-blocked (unchanged, not code)

Neon region. Resend domain. Upstash. Five Vercel env vars. `pnpm db:migrate`. A working preview URL. Photoshoot for Zaira and Mehak. Client logos with written permission. Names and quotes with written permission. Attribution on six deployments. A solicitor. Portal screenshots for `/how-it-works`. The one-business-day inbox habit.

---

**Stop.** Phase 2 waits on a read of this file. The funnel pages this brief thought were missing are already on `main`.
