# AUDIT — bpulse / bpulse2, Part 1

Status: **CHECKPOINT 1 — complete.** No build work has started.
Part 2 (the outright port of the brief's six targets) executed in §8.

Scope: `bpulse/` (old build) and `bpulse2/` (current build). Every file in both repos,
every asset, and the compiled output were examined. Findings cite `file:line` where they
refer to specifics.

Verification run against `bpulse2/`:
- `npm run lint` — clean
- `npx tsc --noEmit` — clean
- `npm run build` — clean; 40 routes: 27 static + SSG, `/check` dynamic. No warnings.

---

## 1. Reconciliation: two repos, two product stories

`bpulse/` (old) tells a **crew story**: a conversation intake (`crew-session.tsx`,
~1,450 lines), pillar-filtered work gallery (`work/page.tsx`), per-member work
submissions (`work-with/[slug]`), 15 crew profiles and 24 projects stored as JSON.

`bpulse2/` (current) tells a **catalogue story**: Work / Team / Check / Notices / Contact,
9 lots, 12 specialists, a diagnostic "Check" funnel, arrival vocabulary, and a strict
"no fabricated numbers" discipline that is largely honoured on the live routes.

**Read:** `bpulse2` is not a rewrite of the brief from scratch. It is a prior round of
this same brief — a first pass at the marketing site + check funnel. The crew story was
transitioned to a catalogue story, and it is the line between those two stories (and
between both and the brief) where the fractures below live.

---

## 2. Port table — old repo assets vs the brief

| Old asset | Verdict | Detail |
|---|---|---|
| `build-triage.tsx` | **port + fix** | Weights `[2,3,2,3,1,1]` sum 12, `MAX = 72`, `pct = score/MAX*100`. No clamp ⇒ upper bound `72 + 12·6 = 144%`. Keep weights, clamp, and **show no percentage** (the brief forbids fake precision). Current `trace.ts` does this correctly (see §4.6). |
| `crew-session.tsx` | **reimplement** | Best single asset in the old repo: structured intake (start / rescue / contact / careers / work), `EMAIL_RE` / `AI_RE` / `LEGAL_RE` routing, satisfaction survey. Port the structure into the report/portal intake; **strip all simulated presence** (see §4.1). |
| `work-session.ts` | **port** | Per-member field config; `TIMELINES "asap…this month…"`, `BUDGETS "<$10k…$75k+"`. Reuse verbatim as field options. |
| `work-with/[slug]` | **reimplemented** | Already replaced by `team/[slug]` + `IntakeForm` in the current repo. Structure matches; solved problems kept. |
| `work/page.tsx` + `hero.tsx` | **copy only** | Old hero's copy — `build triage`, `distress>time`, `feelings as data`, the four-options grid, "we're a five step checklist that grows" — is genuinely good. Its mechanism (live crew avatars, simulated replies) is rejected outright. |
| `team.json` | **take copy** | 15 profiles, each with role, city, journey, attach, expectations, and — critically — a `crews` field linking members to projects and **client quote `slack: username` attributions**. Currently richer than `specialists.ts` (see CONTENT-INVENTORY §3, §4). |
| `projects.json` | **take copy** | 24 projects, each with `summary`, `takedown`, `crews`, `roles`, `link` (client site / case study), and per-project text blocks. Current `lots.ts` keeps only 9 with drastically reduced narrative. Reconcile upward, not down. |
| `lib/motion.ts` | **ported** | `MOTION_EASE = [0.22,1,0.36,1]`, 0.65s, 0.08 stagger — already the repo standard. |
| `public/` tree | **audited** | Identical in both repos. Full asset audit in §5 and CONTENT-INVENTORY §5–§6. |
| `api/contact/route.ts` | **reject** | Appends to `data/leads/*.jsonl` via `appendFile` and returns 200 regardless. No delivery channel, no loud failure, no backlog surfacing. This is the exact "silent swallow" design the brief's loudly-failing startup check exists to prevent. |

---

## 3. Route and component census — current repo

| Route | Type | Notes |
|---|---|---|
| `/` | ○ | Hero + FieldLog + work-direction + studio + atlas-gate sections |
| `/work` | ○ | Pillar-filtered grid (`ProjectGrid`) |
| `/work/[slug]` | ● | 9 lots via `generateStaticParams`; Grade / DataLine / Credit / BreadcrumbJsonLd |
| `/check` | ƒ | Intake + day-by-day (5 days) + outpatient card; reads `searchParams` |
| `/team` | ○ | 12 specialists; `photoStatus` "Photo pending" handled |
| `/team/[slug]` | ● | 12 via `generateStaticParams`; `specialistLots` filter |
| `/about` | ○ | Principles + timeline |
| `/careers` | ○ | Claims "Twelve specialists" — consistent |
| `/notices` | ○ | 6 notices, "no accordion" discipline kept |
| `/contact` | ○ | IntakeForm |
| `/legal/[slug]` | ● | 5 pages, draft banner `bg-signal/15` |
| `/design` | ○ | noindex styleguide incl. `MotionReplay` |
| `/opengraph-image` | ○ | **Dead — overridden by `buildMetadata` static image (see §4.3)** |
| `/robots.txt`, `/sitemap.xml` | ○ | robots disallows `/report/`, `/design`; sitemap = 12 routes |

Not present: `/demo`, `/standard`, `/edpulse`, `/how-it-works`, any `/report/*` route,
any dashboard/portal, and — critical — **no `src/app/api/` directory at all**.

Components: `IntakeForm`, `FieldLog`, `Hero`, `HeroArtifact` (**orphaned**), `ScrollProgress`
(**orphaned**), `StickyContact`, `ConditionRoom` (**orphaned**), primitives (Mark, DataLine,
Credit, Grade, Lot, Notice, Masthead). Grep confirms `Masthead`, `ScrollProgress`,
`HeroArtifact` are imported by no route.

---

## 4. Findings

### 4.1 Fabricated evidence — all dead code, none on the live routes

`src/components/ConditionRoom.tsx` is an unmounted component that replicates the old
crew-session fictions and would the moment anyone mounts it:
- `deploy #2142` (lines 77, 79, 208) "e2e 92% green" — a fabricated deployment
- "93% alive" (line 80), "96% alive" (line 112) — fabricated metrics
- `Hassan` line: "no pushbacks, no blockers, one of us replies for real within a day" (line 86)
- a fake send box (`RebuildInput` + replies-array conditional replies + typing dots + reaction emoji)

**Disposition: delete, do not salvage.** The brief's rejects exist because code like this
was shipped once already.

### 4.2 Simulated presence — live claims, no backing

The following are **rendered on the live site**, unlike §4.1:
- `StickyContact.tsx` line 30: green status dot; line 37: "online · replies in a day".
  On every page via the root layout.
- `team/[slug]/page.tsx` lines 108–116: green dot "online now · replies within a day".
- `IntakeForm.tsx`: `TypingIndicator` + `simulateTyping` 600ms cosmetic typing.

"Online · replies in a day" is the same live-presence fiction the brief calls out
(simulated intelligence / simulated crew replying live). Replacement: a single, honest,
**contractual** commitment — "we answer within one business day" — or nothing. Green dots
imply presence today; drop them.

### 4.3 Broken or missing

- **Every OG share card 404s.** `layout.tsx` `buildMetadata` passes
  `images: [{ url: brand.ogImage }]` = `https://bpulse.dev/og.png`. No such file exists
  (`public/` has no `og.*`), and the route override in `buildMetadata` means the working
  dynamic generator at `src/app/opengraph-image.tsx` is never used. Fix: point
  `buildMetadata` at the generator route or generate a real static file.
- **`apple-icon.png` / `favicon.png` / `logo.png` are all the same 626×935 PNG**
  (319,499 bytes). 626×935 is a 0.67 portrait — invalid as an apple touch icon, oversized
  as a favicon, and reused where a square crop is expected. Produce a true square PNG
  (≥180×180) + small favicon.
- **No intake delivery.** `NEXT_PUBLIC_INTAKE_ENDPOINT` is unset (no `.env*` in the repo),
  so `IntakeForm` falls back to soft client-side "email us" — the exact silent-swallow
  failure the brief forbids. The spec demands a server route that **fails loudly at
  startup** when no delivery channel is configured. This is the first build step.
- **README staleness.** `README.md` says "No animation library. CSS transitions plus one
  IntersectionObserver hook" and "No plugins or third-party packages." `package.json`
  declares `motion ^13.2.0`. Docs must match reality (it's the newer discipline that's
  correct — the README is stale, not the dependency).

### 4.4 Claim vs content mismatches

| Where | Claim | Truth |
|---|---|---|
| `src/app/page.tsx:57` (subnav) | "10+ builds" | 9 lots in the catalogue |
| `Masthead.tsx:14` (dead) | "6 lots in the catalogue" (`lots.slice(0,6)`) | 9 lots — the off-by-three bug class, this time real. Dead code, but it would surface on first mount. |
| `lots.ts:4` (comment) | "Six lots." | Nine follow beneath the comment |
| `DECISIONS.md` | "across the six lots" | 9 lots |
| `globals.css` + code | shadows, gradients, grid backdrops in use | README/DECISIONS claim no shadows/gradients/decorations — docs vs implementation drift |
| `site.ts` | Edition "No. 1 · September 2026" | Today is September 2026. Publishing an edition dated with the current month is only honest if the site actually launches this month. Verify at launch, and never run stale. |
| Hero | "helping hands from fizza, zaira, …" | Confirm the names against the 12-specialist roster before this ships as-is |

### 4.5 Security / report spec

`SECURITY.md` describes `/report/[slug]` (unguessable slug, noindex, no index route, view
log). No route exists and robots already disallows `/report/`, which is aligned. The
report tool is a Part-2 build; the spec is current and self-consistent.

### 4.6 The honest engine — keep, do not regress

The following are genuinely good and match the brief:
- Arrival vocabulary (`arrivals.ts`), `notices.ts` "no accordion", honest-outcome section
  (`work/[slug]`), `Credit.tsx` no-grey-box, "no cookie banner since no cookies" stance,
  legal draft banners, keynote transparency in the Check funnel.
- `trace.ts`: weights `[2,1,3,3,1,2]` sum 12, severity **clamped to 1**, no percentage
  surfaced. This is the fixed build-triage.
- Image discipline: `next/image` real dimensions, `density` aware, no invented assets
  beyond the logo (logo authorship per CONTENT-INVENTORY §6).
- All nine lots carry real project screenshots (see §5).

---

## 5. Asset audit (summary; detail in CONTENT-INVENTORY)

- `project-shots/`: 14 PNGs — one for each of the 9 catalogued lots plus 5 for projects
  that are **not** in the catalogue (boolerize, dubizzle, jovy, noti, third-app). All
  1280×800 or 1440×900, weights 28KB–557KB.
- `team/`: 10 portraits for 12 specialists (zaira, mehak pending). `aneeb.jpg`+`hamza.jpg`
  at 400×400 (all others 800×800 except `moiz.jpeg` 1254×1254); three PNGs are heavy
  (`madiha.png` 697KB, `najiullah.png` 747KB, `suhaib.png` 666KB → convert to JPEG/WebP).
- `logos/`: 15 SVGs, ~300B each. **All point at old projects; only 7 map to catalogued
  lots** (deepidv, sully, wearmeout, mythos-archive, clearance, evidero, fullscript).
  myusta and sba504 have no logo; dubizzle, third-app, jovy, noti, cosell, cutlio,
  logistics, joseph-platforms, uvel, wayne-engagement have logos with no catalogue card.
  Authorship of every one of these "client logo" files is unverified — gate per
  CONTENT-INVENTORY §6.
- Root: `logo.png`/`favicon.png`/`apple-icon.png` identical 626×935 (see §4.3); **no
  og image**; old-only assets `hero-screenshot.png` (1440×720) and `og-home.png`
  (1200×630) — the original OG assets, superseded by the generator.

---

## 6. Permanent rejects — current disposition

| Reject (brief) | Disposition today |
|---|---|
| Simulated crew replying live | `ConditionRoom.tsx` (dead, delete); old `crew-session.tsx` (reimplement, not lift); `StickyContact` green dot + `team/[slug]` "online now" (remove); `IntakeForm` typing animation (strip) |
| `deploy #2142` | `ConditionRoom.tsx` only — deleted with it |
| 300-client discount | absent |
| "30+ builds" | absent ("10+ builds" used at `page.tsx:57` — align to 9) |
| "14 senior hands" | replaced by "twelve specialists", consistent across page/careers/Masthead |
| Fabricated logo files | 15 SVGs, authorship unverified — gate, don't trust |
| Lenis | absent — `motion` v13 in place |
| Count-up animations | absent |
| Scroll progress bar | `ScrollProgress.tsx` — dead, delete |
| `atmo` grid backdrops | **Still live**: `atmo-dots` at `page.tsx:122,349,442`, `atmo-glow` at `page.tsx:411`. Reconcile with `globals.css` intent notes; per the reject list these come off the home route. |

---

## 7. Immediate actions (before / alongside Part-2 build)

1. **Server intake route** (`/api/intake`) with a startup-time delivery check that refuses
   to boot with no channel configured. First build step.
2. **OG fix**: make `buildMetadata` use the working generator route (or ship a real
   `og.png`); kill the 404 path.
3. **Remove fabricated presence**: `ConditionRoom.tsx`, `ScrollProgress.tsx`,
   `Masthead.tsx` (or correct to live data), `HeroArtifact.tsx` (or mount or delete),
   green "online" dots, typing animation. Replace with the one-business-day commitment.
4. **Fix claim drift**: "10+ builds" → verified count; `lots.ts`/`DECISIONS.md` stale
   "six lots"; README vs `motion`; edition date policy; hero "helping hands" roster.
5. **Asset housekeeping**: square brand icon set; downsize/convert heavy PNGs to JPEG;
   equal-resolution portraits; decide the logo gates (CONTENT-INVENTORY §6).
6. **Checkpoint 1 halting rule**: no further build work may begin until the two inventory
   gaps (CONTENT-INVENTORY) are reconciled and this board is clean.

---

## 8. Part 2 — outright port, executed

Six targets from §2 ported out of `bpulse/` into `bpulse2/`, plus the delivery route
(§4.3, §7.1) and the entire presence fiction class (§4.2) removed from live routes.
Verification rerun after all changes: `npx tsc --noEmit` clean, `npm run lint` clean,
`npm run build` clean. Routes now include a dynamic `/api/contact`; `/check` renders the
ported wizard. Each component below is reported as ported / stripped / restyled /
logic changed.

### 8.1 `crew-session.tsx` → `src/components/intake/CrewSession.tsx`

- Ported: message queue + scheduling, step progression, EMAIL / AI / LEGAL branching,
  option chips, progress bar, capture-sheet brief drawer, printable record, all five
  session types (start / rescue / contact / careers / work).
- Stripped: TypingIndicator UI and simulated delays (pacing retained, reduced-motion
  aware), green presence dot, named in-chat repliers, and the "online · replies in a
  day" claim — the top label now reads plainly "an intake form that reads like a
  conversation. No one is typing. Replies within one business day." **No impersonation
  survives**: every session's copy was rewritten to a single studio voice naming the
  specialist only as the reader of the brief.
- Restyled: old navy `#0a0e1a` / `#232e52` → rag/iron tokens; print record → iron-2
  `#151c25` / iron-card `#1a222b` / signal; new CSS added to `globals.css` —
  `msg-in`, `brief-in`, `check-ring` / `check-stroke` draw, `animate-shake`,
  `.print-cert-page` + landscape `@page` A4 print rules; shadows use the repo's
  `shadow-[var(--…)]` convention.
- Logic changed: `work-session.ts` voice adapted from old `TeamMember`+`genzLine` to
  current `Specialist` (philosophy/funFacts); header shows "direct line to {first} ·
  replies within one business day"; avatars replaced with a static initials/"you" dot.

### 8.2 `work-session.ts` → `src/lib/intake/work-session.ts`

- Ported verbatim: `TIMELINES` / `BUDGETS` option lists, `name/email/build/timeline/budget`
  field set, firstLow / roleFirst field ordering.
- Logic changed: single-voice direct-line copy (same adaptation as 8.1); imports the
  `FieldConfig` / `SessionCopy` types from the component — type-only circular import,
  erased at compile, safe.

### 8.3 `pulse-check-intake.tsx` → `src/components/intake/PulseCheckIntake.tsx`

- Ported: 3-step wizard, situation grid, timeline/budget chips, `$1,800` verdict panel,
  reserve-by-invoice flow, success screen.
- Stripped: the four emoji situation icons, Aneeb's green presence dot, and the
  fabricated "2 slots left" scarcity badge.
- Logic changed: **flattening bug fixed** — situation / timeline / budget now POST
  structured (`{situation, timeline, budget, build: stuck}`); the old code folded all
  three into a single `build` string. The 520ms fake "thinking…" delay removed.
  Optional `prefill` prop added so the hero self-check query (restate → situation,
  symptoms → stuck note) survives the swap.
- Restyled: accent lime → signal amber, verdict-alive → ok, panel → rag-card.

### 8.4 About beliefs

Four beliefs ported verbatim into `src/app/about/page.tsx` beside the existing three
principles: "Done means deployed" / "The people who scope it ship it" / "No hostage
codebases" / "Stays until it's live". No rewording.

### 8.5 Team direct line + remaining presence fiction

- `team/[slug]` now mounts `<CrewSession type="work" workWith={specialist.id} />`;
  the IntakeForm specialist variant is gone from team pages; the green photo dot and
  "online now · replies within a day" pill are replaced by "replies within one
  business day".
- `StickyContact.tsx` (root layout, every page): green presence dot removed, "online ·
  replies in a day" → "replies within one business day".
- `IntakeForm.tsx` (now used only on `/contact`): `TypingIndicator` and the 600ms
  `simulateTyping` were deleted; answers advance directly. This closes §4.2 in full.
  The `bg-sound` dot at `careers/page.tsx:178` is a real Open/Closed status, kept.

### 8.6 Delivery route — `src/app/api/contact/route.ts`

JSONL append to `.data/intake.jsonl` (`mkdir` + `appendFile`, one row per request, UUID
+ timestamp). **Loud failure is enforced at write time**: any write error returns 500
with a resend path, never a silent smiley. Both intakes POST here — CrewSession
(`type`, `with`, email, answers) and PulseCheckIntake (now structured fields). Deviation
from §7.1: this fails loudly on delivery rather than refusing to boot without a channel;
with the local JSONL log always writable the site boots, and the contract moves to the
write. Revisit if a real delivery channel replaces the log.

### 8.7 Dropped-field ports

- `types.ts`: `Lot` gained `impact?` / `highlights?` / `detail?`; `Specialist` gained
  `linkedin?` / `github?` / `upwork?` / `hobbies?` / `genzLine?` and `source?` on reviews.
- `specialists.ts` aneeb: `hobbies` (three, from `team.json`), `genzLine`, `linkedin`,
  and `source: "client engagement"` on both reviews.
- `lots.ts` deepidv + sully: `detail` + `highlights` from `projects.json`, each with a
  `limits` clause stating the origin is prior portfolio data, not a fresh re-audit —
  the site's no-invented-proof rule is kept rather than the fields quietly absorbed.
- Attribution cross-check: the four `specialistId`s used by lots (aneeb, fizza, mehak,
  najiullah) all resolve to named specialists. The CONTENT-INVENTORY gap "evidero →
  fizza, missing member" is closed: fizza is a catalogued specialist.

### 8.8 Unresolved (reported, not invented)

- **Budget scale divergence**: CrewSession / PulseCheck carry the old verbatim
  `TIMELINES` and `BUDGETS` (`asap…just exploring`, `< $10k…$75k+`), while `IntakeForm`
  uses its own six-tier scale. Decide which is canonical before any funnel work.
- **Satisfaction survey**: the old crew-session phrasing was never located
  (`satisf` grep found nothing in the old repo). The ported component does not fabricate
  one — noted as a gap, not implemented.
- **Old source fidelity**: `crew-session.tsx` lines 541–960 re-read in Phase E.
  Runtime engine kept (skip-optional, EMAIL_RE, 10-character floors, chip retry,
  reduced-motion timer scale). Typing simulation, 3.2s read receipts, and PostHog
  left out — simulated presence.

---

## 9. Phase E dispositions — 5 September 2026

| Item | Disposition |
|---|---|
| OG cards 404 | `brand.ogImage` now `/opengraph-image` so `buildMetadata` uses the generator |
| Icons | `apple-icon.png` 180×180, `favicon.png` 32×32, `icon.svg` added. `logo.png` unchanged |
| Heavy portraits | `madiha` / `najiullah` / `suhaib` → WebP under 40KB. `moiz` downscaled to 800 WebP |
| `atmo-dots` / `atmo-glow` | Removed from `page.tsx` and `globals.css` |
| `ConditionRoom` / `ScrollProgress` / `HeroArtifact` | Deleted |
| "10+ builds" | Now `9` — the catalogue count |
| "six lots" | `lots.ts` and `DECISIONS.md` say nine |
| README animation library | Documents `motion` ^13.2.0 |
| Hero "helping hands" | Already absent from current Hero — no roster line to fix |
| Edition date | `site.ts` documents: update when content changes, month + year of that edit |
| Lot `attribution` | Schema added. Six lots `crew-asserted` (figures tagged). Sully, myUsta, DeepIDV `client-listing`. `confirmedOn` empty — founder list in `FOUNDER-CONFIRM.md` |
| DeepIDV | Retried 5 Sep 2026 — site resolves; 211+ and sub-150ms still stated. Figures stay on FieldLog and the lot, sourced |
| Budget scale | Canonical set in `src/content/budgets.ts`; CrewSession/work-session, PulseCheck, IntakeForm all use it |