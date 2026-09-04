# CONTENT-INVENTORY — what exists, what is fabricated, what is missing

Companion to `AUDIT.md`. Every marketing claim in the current repo lands in one of four
buckets below. Part 1 rule: nothing ships that is not in bucket 1, 2, or 4 — and bucket 4
items must be earned, not asserted.

## 1. Truth ledger — every figure in play

| Claim (where) | Bucket | Evidence / disposition |
|---|---|---|
| "450+ healthcare orgs", "5M+ clinical tasks" | **client-reported** | From `sully` subsite; the sourced site itself is reachable. Attribution line must stay on every run of these. |
| "sub-150ms", "211+ countries" (`FieldLog` deepidv rows) | **client-reported, source unreachable** | `deepidv.com` fails to resolve; `deepidv` lot stores the URL but it 404s for verification. Keep only with the attribution line, and retry the source at launch. |
| "iOS + Android" (`myusta`) | **verifiable** | Both app-store listings are live. Lowest-risk figure on the homepage. |
| "9 lots in the catalogue" | **internal, verifiable** | Matches `lots.ts` (comment "Six lots." at line 4 is stale — the entry below the comment is #2 of 9). Subnav "10+ builds" (`page.tsx:57`) is one off; align. |
| "Twelve specialists" | **internal, verifiable** | 12 profiles; consistent across Team page, careers, Masthead. |
| "replies in 1 day" / "online · replies in a day" | **UNBACKED** | No delivery channel exists (`IntakeForm` falls back to soft client-side "email us"). Green "online" dots (`StickyContact:37`, `team/[slug]:108-116`) claim live presence. Strip or contract. |
| Check "$1,500 / 5 days / credited within 30 days"; Close "$18k–$95k"; Standing "$2k–$6k/mo" | **business claim, unverified** | Internal offers. For publication, confirm cache/billing reality (30-day credit especially) with the owner. |
| Edition "No. 1 · September 2026" | **dated** | Today is September 2026. Only publish this month-or-say nothing; add a policy so it can't go stale. |
| "Fort Bamford" / any other invented-looking name | n/a | No fabricated names on live routes; `deploy #2142` and "93% alive" exist only in the dead `ConditionRoom.tsx` (delete). |
| Behavioral / performance figures in lot grades | **internal-claim** | Every `metric`, `redo`, `wall`, `shrink` figure lives on the crew's word. Catalogue these as internal-claim; the auditor's grader site ("kind to real") plus `LIMITS` cuts are the guardrails. |

## 2. Catalogue reconciliation — 24 old projects → 9 lots

The old `projects.json` catalogued **24 projects**; the current catalogue keeps **9**,
each with a screenshot, grade, and `specialistId`. The 15 not catalogued:

`dubizzle`, `third-app` (both still have screenshots + logos), `boolerize`, `jovy`,
`noti` (screenshots only, no logos), `cutlio`, `cosell` (logos only), `logistics`,
`joseph-platforms`, `uvel`, `wayne-engagement` (logos only), `treewallet`,
`foodkarma`, `indoorGIS`, `nexacareTech` (referenced in the brief with no current asset —
**do not fabricate screenshots or logos for these**).

- Screenshots exist for 14 projects (9 catalogued + boolerize, dubizzle, jovy, noti,
  third-app) — the extra five are live candidates if the catalogue grows.
- Only 7 of 15 logo files map to catalogued lots (deepidv, sully, wearmeout, mythos,
  clearance, evidero, fullscript). myusta + sba504 have **no** logo file.
- The brief's featured six: dubizzle, third-app, boolerize, noti (+ indoorGIS,
  nexacareTech, treewallet with no assets) are **missing narrative** — decide now: write
  them in, or explicitly reject them out, before Part 3.

**Decision required (Part-1 board):** page counter, subnav, and edition line must agree
with whichever number the catalogue speaks (9 today, more after reconciliation).

## 3. Crew reconciliation — 15 → 12

Old `team.json`: 15 profiles. Current `specialists.ts`: 12. Dropped: **Ahmad, Mujahid,
Dawood** (verify their story is told deliberately — "twelve specialists, no interns"
only holds if the former-intern members are either re-cast or retired on purpose).

Role drift surfaced between old and current:

| Member | Old role | Current role |
|---|---|---|
| hamza | Law Associate · Legal Advisory | Backend Engineer (Legal-advisory work retained in record) |
| moiz | DevOps | Full Stack |
| abdullah | Dev Intern, 1+ yr | Frontend Engineer, 3+ yr |

Not a flaw, but it must be a **decision**, not an accident: the old crew page sold
domain-specialists (Legal/QA/PeopleOps); the new one sells build specialisation. Pick
the "twelve specialists" story and make the records match it.

## 4. Attribution gaps — lots vs the crew's own records

Lot → `specialistId` resolves, but the credited specialist's **own record often says
nothing about that lot**. Verified: only the three Hassan-led core lots (sully, deepidv,
myusta) have matching URLs in `specialists.ts` (lines 24, 62, 67, 147, 191, 232, 273).

| Lot | Specialist (per `lots.ts`) | In that specialist's record? |
|---|---|---|
| deepidv, sully, myusta | hassan | yes |
| wearmeout, mythos-archive | aneeb | no (record cites Sully) |
| sba504 | mazar | no |
| clearance | najiullah | no |
| evidero | fizza | no |
| fullscript | abdullah | no |

`lots.ts` has **no `attribution` field**, so "client-reported" columns are equivalent to
"crew-asserted" with no per-lot source. Add attribution (client store listing, case
study, review link) to the lot schema, or drop figures.

## 5. Portrait and asset gaps

- **No photos:** zaira, mehak (`photoStatus: "Photo pending"` — handled gracefully on `/team`).
- **Low-res:** aneeb.jpg 400×400, hamza.jpg 400×400 (all others 800×800; moiz.jpeg
  1254×1254 — downscale).
- **Heavy:** madiha.png 697KB, najiullah.png 747KB, suhaib.png 666KB → convert to
  JPEG/WebP (target ≪150KB each).
- **Icon set:** logo.png / favicon.png / apple-icon.png are the identical 626×935 portrait
  (319KB). False square for apple-icon; needs design + proper export.
- **OG:** no og file; `brand.ogImage` points at a 404 path (see AUDIT §4.3). Old repo has
  `og-home.png` (1200×630) as a reference concept for the generator to match.

## 6. Logo authenticity gates

15 SVGs exist for client/organisation marks. The audit cannot establish that these were
author-shipped by the clients — treat as **unverified until confirmed**, per the brief's
"fabricated logo files" reject. Disposition options per logo: (a) client confirms, keep;
(b) no confirmation, remove from marquees and cards; (c) re-drawn generic mark labeled as
such — **not allowed** (falls in the reject). 7 logos map to catalogue lots; the other 8
are currently invisible to users, so gating them blocks nothing today.

## 7. Copy still to be written (future parts — not yet drafted)

- Full report tool: "the wrong doctor" headline, baseline vs current, task list,
  5-day build week, verdict language, snapshot persistence, limits section above every CTA
- Demo portal: sample lot pane + note, lone "claim 24h" button, seeded spins
- `/standard`, `/edpulse`, `/how-it-works` pages
- Portal auth: invite email, one-tap return, session handling, server-side guards
- Intake: confirmation copy, 30-day credit note, "what happens to your source" answer,
  specialist-assignment honest copy ("who does the work" notice already exists)

## 8. Check before launch (every item is currently open)

1. Edition date policy (Sep 2026 vs real launch month).
2. deepidv source reachability — retry; if still down, keep rows only with the
   "client-reported" tag reconsidered.
3. The one-business-day promise must be backed by the new intake delivery route, or removed.
4. Check "credited within 30 days" billing path; Standing pricing basis.
5. Careers "Open" roles actually accept applications.
6. Hero "helping hands" roster (fizza, zaira, …) matches the 12-specialist list.
7. Grade synonyms stay consistent (`trust signal` vs `period created` vs `audit` in
   notices — pick one term, one definition).
8. All nine lots have attribution evidence; six currently do not (see §4).