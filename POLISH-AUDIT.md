# POLISH-AUDIT.md — the work order

Audit taken 5 Sep 2026 against the built app. Every item below is a finding with a file/line, not an opinion. Heights are markup estimates (aspect ratios, paddings, type scale); the founder's screenshot pass at 1440/375 is the source of truth for anything visual.

Shape letters (Part 2 vocabulary):

```
A  Asymmetric 5/7 — text one side, object the other
B  Full-bleed band — one statement, deliberate emptiness
C  Two large + rows — a couple featured, the rest compact
D  Horizontal rail — scroll-linked or stepped, for sequences
E  Index table — dense rows, mono values, for records
F  Stacked blocks — full-width statements with proof beneath
```

## 1. Component inventory (`src/components/`)

| Component | Job | Used on | Verdict |
|---|---|---|---|
| `Hero` | Home mount sequence (headline, sub, CTA, delays .08/.16/.22, spring 180/26) | `/` | Keep (approved #1) |
| `HeroPortal` | Client-window mock with live 80% bar fill (delay .72, dur .9) | `/` | Keep (approved #2) |
| `Landing` | Home episode orchestration | `/` | Keep |
| `Reveal` (landing) | `landSpring` 160/22, `landDuration` 0.7, `Rise`, `Wipe`, `Lift`, `Tilt`, `Stagger`, `Item`, `Count` | everywhere | **Rebuild — see Part 4** |
| `landing/Atmosphere`, `AtmosphereNote` | Paper/iron surface texture + note | Landing, /check, /about… | Keep |
| `landing/PhotoFan` | Hero collage | `/` | Keep |
| `landing/EightyDome` | **No static importer** | — | **Cut (dead)** |
| `PageHero` | Inner-page header (kicker, title, aside; contact CTA hook) | most inner pages | Keep |
| `PageClose` | Terminal next-step block | /how-it-works, /notices, /standard, /team, /work, /work/[slug], /edpulse | Keep |
| `SiteChrome`, `Masthead`, `Footer`, `StickyContact`, `ScrollIntakeLink`, `PressButton` | Chrome | all | Keep |
| `WorkIndex`, `ProjectCard`, `ProjectGrid` | Work log | /work | `ProjectGrid` **dead — cut**; `WorkIndex`+`ProjectCard` keep |
| `PeopleRail`, `PortraitStrip`, | Crew rail / team block | Landing, team pages, inner pages | Keep |
| `Tagline` | **No static importer** | — | **Cut (dead)** |
| `IntakeForm`, `FieldLog`, `EightyBar` | **No static importer** | — | **Cut (dead)** |
| `BriefIntake` | Laurel routing intake (contact/about/careers/standard) | /contact, /about, /careers | Keep |
| `ConditionDesk` | Five-day Check intake conversation | /check, home intake | Keep |
| `CrewSession` | Contact session + msgs | /contact and BriefIntake | Keep |
| `PulseCheckIntake` | Situation prefill bridge → ConditionDesk | /check, home | Keep |
| `MatchDesk`, `MatchPrefill` | Record match | /match, home, team pages | Keep |
| `logic` `AnimatedStages`, `StageRail` | Stage sequences | /how-it-works, /work/[slug], /demo, /check | Keep (Part 4 review) |
| `FilterBar`, `FindingsFilter` | State filters (projects / findings) | /work, /demo/findings | Same job, two domains — flag |
| `BeliefBlock`, `ProofRow`, `VettedPay`, `PassAlong`, `TierTable`, `GateCard` | Content blocks | about/standard, work/[slug], home, edpulse, careers | Keep |
| `FindingLedger` | Report findings rows | /report/[slug] | Keep |
| `careers/DiagnosticForm`, `careers/AdminBoard` | Gate 0 flow + admin board | /careers/diagnostic/[token], /studio/careers | Keep |

Cleanup list: cut `EightyBar`, `FieldLog`, `IntakeForm`, `ProjectGrid`, `Tagline`, `landing/EightyDome` (no importers anywhere).

## 2. Pages and section silhouettes

Markup-estimated heights. Same-letter used twice in a row on a page, or >3× site-wide — rebuild (Part 2).

### `/` — Landing (marketing spine)
| # | Section | Shape | Est. height | Letter |
|---|---|---|---|---|
| — | Hero mount (headline + portal window) | full-height split | ~100vh | H (approved hero) |
| 1 | Argument: `PhotoFan` + locks + PeopleRail | text–object split, 5.5/4.5 | ~640 | A |
| 2 | "Pick the wound" fit cards | 2×2 image cards | ~13.5rem×2 (≈460+) — **full screen feel** | C — **becomes the band (Part 1)** |
| 3 | Catalogue: featured lot + compact stack | 7/5 split | ~520 | C |
| 4 | Path rows (3), métier + image | stacked full-width rows | ~330 each | F — **F×3 adjacent** |

| 5 | Crew grid 3-col portraits | grid | ~1100 | C — **C×3 site** |
| 6 | Match desk card | dense sheet in card | ~520 | E |
| 7 | Close band (dark) + intake + VettedPay + PassAlong | full band + instrument + rows lists | ~420 + large | B + instrument + E |

Letter tallies after Part 1: A×1, B×1, C×3 (site cap!), E×2, F×3-adjacent. Part 2 must rebuild episodes 4 (F triple) and/or 5 and 3 to break the C/F pile-up.

### `/check` — Five days
| Section | Shape | Letter |
|---|---|---|
| Days rail (D) + hero band w/ photo | split | A |
| Desk (`Episode`) | #intake instrument | — |
| `VettedPay` + `PassAlong` rows | lists | E |
| Report → `/report/[slug]`? inbound | — | verify |

### `/how-it-works`
| Section | Shape | Letter |
|---|---|---|
| PageHero | — | — |
| `AnimatedStages` 6 stages | rail sequence | D |
| Deliverables/`StageRail` | D again — adjacent | D — **two Ds adjacent, rebuild one** |
| `PageClose` | terminal block | F |

### `/work` + `/work/[slug]`
| Section | Shape | Letter |
|---|---|---|
| PageHero + `WorkIndex` (state filter rows) | E | — |
| Lot detail: hero split, ProofRows, StageRail, PeopleRail | A + proof list + D | mixed — flag StageRail repeat with /how-it-works |

### `/team` + `/team/[slug]`
| Section | Shape | Letter |
|---|---|---|
| PageHero + `PortraitStrip` grid | C | — |
| Profile: split hero, proof blocks, PeopleRail, MatchPrefill | A + F + C | flag |

### `/about`, `/contact`, `/standard`, `/careers`, `/edpulse`
Mostly `PageHero` + one content block + `BriefIntake`/`TierTable`/`GateCard` + `PageClose`. Repeated pattern **PageHero→block→terminal** is the big site-wide sameness; the block varies but the skeleton is identical on 7 pages. Part 2: differentiate terminal blocks (`PageClose` off `/notices`/`/standard`/`/team`/`/work`/`/work/[slug]`/`/edpulse`), vary heights 400–1100.

**Sample portal `/demo/*`** — 8 pages, every one is "mono label + newsreader heading + data row list". Same silhouette ×8 (E). Part 2: differentiate overview, scope, documents, progress, findings, updates, crew, handover.

**`/legal` + `/legal/[slug]`** — register index (E) + doc template (index table layout). Two-adjacent.

## 3. Paragraphs over three lines with nothing around them

Files and lines to anchor or split (Part 3 fixes):
- `src/app/demo/handover/page.tsx:39` — 189 chars single `<p>`.
- `src/app/match/page.tsx:61` — 151 chars.
- `src/app/careers/page.tsx:32` — 152 chars.
- `src/app/team/[slug]/page.tsx:142` — 192 chars.
- Check the same block kinds on `/about`, `/standard`, `/work/[slug]` for body ≥140 chars inside a lone `<p>` (scan found none, but founders pass at 1440/375 to confirm visually).

Fix pattern: lead-in weight / `DataLine` beside / hairline above / split. Every over-3-line paragraph gets an anchor.

## 4. Internal links and orphans

Static href inventory (from `src/`) — see landing target matrix. Findings:

**Orphans (0 inbound links):**
- `/demo/crew`, `/demo/updates`, `/demo/findings` — only reachable through demo portal internal nav (which itself has **no static link set** — the demo stage nav needs verifying in the rendered portal).
- `/second-chair` — no inbound static link anywhere.
- `/design` — intentional exclusion (not in robots/sitemap) but then it shouldn't be a public route; document as tool, not orphan.
- `/studio/matches`, `/studio/careers` — internal admin tools (no inbound, robots-disallowed). Expected; keep.

**Single inbound (below the "two ways" rule):**
- `/edpulse`, `/security` — Footer only. Add a second source (home, landing copy, /check cross-link).
- `/demo/progress`, `/demo/handover` — `process.ts` card only.
- `/legal/accessibility`, `/legal/complaints` — Footer only.
- `/demo/documents` — legal page + process; OK (2).
- `/demo/scope` — landing control card + `homeLocks` + process; OK.

**Bidirectional lot↔crew** — verify both directions (work/[slug] → named crew; team/[slug] → lots). `team/[slug]` shows lot links; `work/[slug]` must link its crew on site, not just in `proof`.

**Dead ends / next steps** — `PageClose` present on most; add to `/match`, `/demo/*` terminal pages, `/legal` index.

**External links** — grep for `target="_blank"` (must pair `rel="noopener"`).

## 5. Images (`/public`)

Real-locality: project shots, team portraits, `iron-ring`, `desk`, `rag-*` atmosphere are real photos. Brand SVGs/PNGs are production brand assets — fine.

**Portraits >120KB (Part 7 convert + tighten crops):**
- `team/hassan.jpg` 800×800, 186KB → convert WebP <120KB (used on home path + team).
- `team/mazar.jpg` 800×800, 200KB.
- `team/moiz.jpeg` 1254×1254, 213KB — **not square crop**; `moiz.webp` 800×800 24KB exists but is also 11% over? (24KB fine) — check which is referenced.
- `team/madiha.png` 800×800, 680KB (WebP 36KB exists); `team/najiullah.png` 800×800, 729KB (WebP 17KB); `team/suhaib.png` 800×800, 650KB (WebP 20KB) — PNG→WebP, then reference.

**Heavy project shots (weight OK if sizes set, but flag):**
- `project-wearmeout.png` 851KB, `project-mythos-archive.png` 544KB, `project-fullscript.png` 460KB, `project-jovy.png` 456KB, `project-myusta.png` 375KB, `project-boolerize.png` 268KB, `project-deepidv.png` 259KB.

**Sizes/dimensions:**
- Most raster uses `next/image` with `fill` + `sizes` (fine, zero-shift). `CrewCard` uses `<img width={240} height={320}>` on 800×800 source — heavy upscale, and it is the **grayscale offender** (`src/components/Landing.tsx:191` `grayscale` + hover `group-hover:scale-[1.06]` + `transition-[filter,transform]` — violates Part 7 and Part 4 at once).
- `team/hamza.jpg` rendered with explicit 88×110 / 76×96 — portrait aspect from a 400×400 square → **crop instead of stretch**.
- `brand/profile-photo.png` 400×400 213KB — overweight for its 400×400.

**Graffiti rule:** any other `grayscale`/`saturate` usage: grep before Part 7.

**No logo file renders** — `/logos/*.svg` (14 files) have **no tsx references** — confirmed clean.

## 6. Animation inventory (Part 4 verdicts)

| Location | Trigger | Duration | Verdict |
|---|---|---|---|
| `Hero.tsx` items ×4 | mount | spring 180/26, delays .08/.16/.22 | **Keep** (approved #1, respect reduced-motion ✓) |
| `HeroPortal` window + 80% bar | mount | delay .28 spring 200/26; bar delay .72 dur. 0.9 | **Keep** (approved #2) |
| `Reveal.tsx` `landSpring` | sections | **stiffness 160 / damping 22, duration 0.7, y:20** | **→ 200/26, 0.4, y:12** |
| `Reveal` `Wipe` | sections | **0.85** | → 0.4 or cut |
| `Reveal` `Rise` | headings | 0.7 (uses landDuration) | → 0.4 |
| `Reveal` `Count` | in-view | **1.35 count-up** | not in inventory — cut to a state change ≤0.4 or remove |
| `Reveal` `Lift` | hover | **whileHover y:-2** | **cut** (no lift on hover) |
| `Reveal` `Tilt` | hover | **whileHover scale 1.015**, rotateX/Y | **cut** (no scale) |
| Landing `WorkCard`/`CrewCard`/path rows | hover | **group-hover:scale-[1.04..1.08] dur-700** | **cut** → 150ms colour/border only |
| `globals.css:292` `hero-symptom-hit` | chip tap | **240ms** | → 200ms (input state) |
| `globals.css:298` | panel hover | **340ms transform** | → 150/200 |
| `globals.css:317` `hero-panel-settle` | mount | **480ms** | part of hero mount — keep ≤400 or fold |
| `globals.css:332` `hero-report-row-in` | mount | 200ms | keep (mount) |
| `globals.css:473` `mark-strike` | mount/verdict draw | **320ms** | decision: only if part of hero mount montage, else cut |
| `globals.css:550` | accordion/filters | 200ms | keep (state) |
| `globals.css:572` | nav/panel | **520ms + 300ms opacity** | → 400ms |
| `globals.css:659/674` `room-pop`/`room-shot` | sessions | **0.28/0.32 letter-by-letter** | **cut** (letter reveals) |
| `globals.css:713` `msg-in` `brief-in` | session msgs | **0.5 / 0.28** | → 0.4 or cut |
| `globals.css:751` `shake-x` | input error | **0.4** | → 0.2 (state) |
| `globals.css:763/768` `draw-line` | trace/report | **0.5 / 0.35+0.24 delay** | keep only if trace draw; else cut |
| `CrewSession.tsx` | session UI | `duration-500`, various | → 400/150 set |

Reduced-motion gating exists in `Hero`, `HeroPortal`, `Reveal`, `CrewSession` ✓ — extend to any kept CSS keyframes that aren't input responses.

Approved set after cleanup: 150 (hover), 200 (state), 400 (reveal), <1200 (mount), spring 200/26, exit `cubic-bezier(.4,0,1,1)`. Grep gate: no `Nms` outside `{0,60,150,200,240?,400,700⊙dongle}` etc. — final list in Part 4.

## 7. Metadata audit (Part 6)

**Every route has `metadata`/`generateMetadata`** except `/studio/careers` (falls to root default). **Empty/duplicate descriptions:**
- `/match` — `description: ""`.
- `/studio/matches` — `description: ""`.
- `/work`, `/check`, `/team/[slug]`, `/work/[slug]`, `/report/[slug]`, `/legal/[slug]`, `/careers/diagnostic/[token]`, `/careers/status/[token]` — generateMetadata present, **verify 140–160 unique** per entry.

**OG images (route-specific `opengraph-image.tsx`) exist only for:** `/`, `/check`, `/second-chair`, `/read/[token]`, `/team/[slug]`, `/report/[slug]`. Missing per brief table: `/work/[slug]`, `/legal/[slug]` (and team exists), plus default-on for `/about`, `/how-it-works`, `/standard`, `/careers`, `/match`, `/demo*`, `/edpulse`, `/contact`, `/security`, `/notices`. Build via `ImageResponse` per route type.

**JSON-LD present:** verify `Organization`+`WebSite` in layout, `Service` on /check, `Person` on crew, `FAQPage` on /notices, `BreadcrumbList` on nested routes — none confirmed yet; implement in Parts 5–6.

**sitemap.ts gaps:** missing all `/demo/*` subpages and `/match` is present but `/studio/*`, `/report/*`, `/read/*`, `/careers/diagnostic|status`, `/design` correctly absent from both sitemap and (robots disallows `/report/`, `/read/`, `/design`, `/studio`, `/careers/diagnostic/`, `/careers/status/` ✓). Add demo subpages to sitemap.

**Title finds:**
- `/` (`src/app/page.tsx:7`) — `title: "The catalogue"` → browser/OG title reads "The catalogue — bpulse". Wrong; home should be the brand/tagline line.
- `/studio/matches`, `/studio/careers` — no route metadata at all; fall through to root default. Intentional (private screens), but Part 6 must set distinct titles/robots anyway.

**Heading/landmark:** audit h1 count per page and `<main>` presence in Part 6 (root layout confirms landmarks).

## Part 1 delivered — the band

Replaces episode 02 of `/`. `src/components/landing/FitBand.tsx`:

- Six chips, single tight left column, 15px, `aria-pressed` toggle, focus-visible keyboards.
- Right panel: live SVG trace via `buildHeroTracePath` (the six `HeroPainKey` bell profiles, existing weights 1/2/3), spring-morphs on chip selection (`stiffness 200, damping 26`, deduped under `useReducedMotion`).
- Arrival-state verdict = dominant wound (highest weight, ties by profile order) — "Incomplete / Stalled / Single point of failure / Integration-blocked / Unsound / Ownerless"; none selected → "Nothing on record".
- "Start the Check" → prefills the home intake with the mapped `situation` + on-record note, then scrolls to `#intake`. No percentage shown.
- Layout: `md:grid-cols-[5fr_7fr]`, hairline `border-iron/10`, target ~420px desktop / ~560px mobile stacked. Verified DOM: 6 chips, no horizontal overflow at 375, click → verdict + trace + CTA enable, keyboard reachable.
- **Checkpoint 1 screenshots:** `polish-checkpoints/home-1440.png`, `polish-checkpoints/home-375.png` (founder visual pass required — these are NOT self-verified visually).

**Cleanup for Part 2-4 from this pass:** Landing no longer imports `homeFits`/`homeFits` images; `fit` state is now the dominant selection. The old 2×2 `Wipe`/`Tilt` frame grid is gone from `/`, retiring its hover `scale` on the home (see Part 4 list).