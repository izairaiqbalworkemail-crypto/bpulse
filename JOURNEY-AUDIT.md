# Journey audit — 9 September 2026

Current-state document for the next session. Not a restyle brief. Not a new palette. Not a joke site.

**Method.** Read `src/app/**/page.tsx` (46 routes), chrome, content, CSS letter system. Curled `http://localhost:3000` for every major path. Headless Chrome shots at 1440 and 375 for `/`, `/pricing`, `/read`, `/check`, `/session`, `/how-it-works`, `/match`, `/demo`, `/standard`, `/work`, `/team`, `/report`. Older files (`LAUNCH-STATE.md`, `FULL-AUDIT.md`, `POLISH-AUDIT.md`) are stale on chrome and must not be trusted for layout.

**Buyer.** Founder or CTO. Often a phone at night. About ninety seconds. They must be able to repeat what we do, see a price, and send the free Read.

**Money path.** Home or any interior → understand the last twenty percent → pick a start (almost always the Read) → land on the form → send it. Everything else is proof that the Read is safe.

---

## 0. How the next session must work

1. Read this file top to bottom before editing.
2. Do not invent a new theme. Ivory `#F4EFE6`, ink `#161310`, brass `#C9A24A` on actions only.
3. Do not put the 80% bar, pulse red, teal, or a hero object back on public pages.
4. Do not restyle the home poster unless a P0 on `/` is named below.
5. Fix in the order in §10. One contract first, then the pages that violate it, then copy, then ops.
6. After each visual change: 1440 and 375 of `/`, `/session` (the correct interior), the page you touched, and `/read#intake`.
7. Copy rules still hold: no em dash, no emoji, no exclamation, first-person CTAs, figures only from `src/content`. Forbidden on public glass: `signals`, `trace`, `LOT`, `the record`, `arrived`, `admitted`, `rung`, `deployment(s)`.
8. Viral here means “send this to my CTO.” Not slang. Not a meme.

---

## 1. Locked visual contract

The UI feels broken because three architectures are live at once.

| Surface | Chrome class | First object | Height | After the first object | Margin |
|---|---|---|---|---|---|
| Home `/` | `letter-desk letter-night` | `story-inset` + `letter-hero` | Full window minus desk inset | One folio sheet, hairlines, not cards | Desk inset all around the poster |
| Interior public | `letter-bleed` | `letter-chapter` + `letter-window.is-chapter` | `min-height: 50svh`, radius 0, edge to glass | **Must be paper** so the cut is visible | No desk. Type inset 20px only |
| Private document | report chrome | No pill, no DirectStrip, no folio | Content height | Paper article | Reading column |

**When to use what**

| Question | Answer |
|---|---|
| Framed full window? | Only `/`. |
| Half-window dark chapter? | Every other public marketing page. |
| Full-bleed dark after the chapter? | Never as the first following room. Paper first. Then cocoa is allowed as a later spread. |
| Card / rounded plate? | Only a discrete object (a real report, a portal, a specimen). Never a section. |
| Gold / brass? | The ask button. Never a wash, never a border-as-brand, never a room. |
| Photo / still / object in the first screen? | Never. `SealedStill` on `/how-it-works` is the old rejected hero object. |
| Type | Source Serif 4 for letter voice. IBM Plex Sans for UI. IBM Plex Mono for prices, dates, counts. |
| Chapter claim size | `clamp(2.5rem, 6vw, 4.75rem)`, max ~14ch, must complete above the fold on 375. |
| Home claim size | `clamp(2.75rem, 8vw, 6.25rem)`, two lines, must complete above the fold on 375. |
| Body / dek | Serif 18–24 on paper, 17–22 on ink. Measure ~42–52ch. |
| Section kicker | Plex Mono 11–12, uppercase, short rule under it. |
| Card allowed | Specimen on `/read`, portal on home Visibility, Check report document, legal tables. |
| Motion | Claim rise, kicker draw, cut slide. `prefers-reduced-motion: reduce` off. No particles. |

**Why some pages look full screen and some look half**

`.letter-window.is-chapter` is 50svh. If the next section is ink (`Episode tone="cocoa"`, `SignalPlate`, `ReadSample`, `bg-ink`), the eye reads one tall dark page. Session is half because the next room is paper. Process looks full because `SignalPlate` is a dark rounded card on dark. Team looks full because the first Episode is cocoa portraits.

---

## 2. Journey map (what must be true)

```
night phone
  → /  (framed poster: what we do + prices + Get my free read)
  → optional proof: /work, /pricing, /how-it-works, /demo
  → /read  (half chapter, then specimen, then the form)
  → send the Read
  → private /read/[token]
```

Alternate honest doors: `/session` ($400), `/check` ($1,500), `/first-slice` ($7,500). Close is `/how-it-works`. Standing is `/second-chair`. Match is a diagnostic, not the sale.

**Journey tests the next session must keep green**

- Pill ask and home ask always go to `/read`.
- Offer pages that sell a paid hour must still show a line to the free Read.
- `#start` and `#intake` must exist on the page the CTA names, and `SiteChrome` must scroll there (already patched once; re-verify after any hash work).
- A stranger can say the prices from the first home screen.
- No public page asks for a meeting as the first action.

---

## 3. What is right (do not “improve”)

These are working. Leave them unless a numbered issue names them.

- Home framed poster: desk margin, full window, “It looks finished. / It will not ship.”, published ladder on the floor, brass ask, no EightyBar, no hero object.
- Home folio as one sheet (`Landing.tsx` → `.letter-folio`).
- Interior chrome class: `letter-bleed` is on every public interior we curled. Desk class is home-only.
- Session first paint: dark half chapter → paper “It is not a sales call.” This is the interior reference.
- Check first paint: dark half chapter, giant `CHECK`, facts row, then paper “Where this sits.”
- Read form exists at `#intake`. Session / First Slice use `OfferStart` with both `#start` and `#intake`.
- Ladder prices are one source (`src/content/ladder.ts` → `brand.offers` → `offer`).
- Twelve specialists in `specialists.ts`. FAQ admits the bench size.
- Nav lock: Work, Team, Pricing, Process, Match + “Get my free read.”
- Footer four columns match `funnel.test.ts`.
- Public analytics claim on `/security` (self-hosted, no third-party cookies) is a trust asset if it stays true.
- Report renderer on `/report/[slug]` is a document, not a marketing page (the index `/report` is the leak).
- Fonts in `layout.tsx`: Source Serif 4 as `--font-newsreader`, IBM Plex Sans, IBM Plex Mono.
- Admin and studio return 404 when there is no session. Correct for a stranger.

---

## 4. Route inventory (today)

HTTP from local `next dev` on 9 Sep 2026.

| Route | HTTP | Chrome | First screen | Next room | Verdict |
|---|---|---|---|---|---|
| `/` | 200 | desk + night | Full framed poster | Folio paper | **Right** |
| `/session` | 200 | bleed | Half chapter | Paper | **Right pattern** |
| `/first-slice` | 200 | bleed | Half chapter | Paper | **Right pattern** |
| `/check` | 200 | bleed | Half chapter | Paper sits | **Right pattern** |
| `/read` | 200 | bleed | Half chapter | **Ink specimen** | Half is invisible |
| `/pricing` | 200 | bleed | Half chapter | **Cocoa route** | Half is invisible |
| `/work` | 200 | bleed | Half chapter | Paper index | Pattern OK, hideAction |
| `/team` | 200 | bleed | Half chapter | **Cocoa portraits** | Looks full-screen dark |
| `/how-it-works` | 200 | bleed | Half chapter, **no ask** | **SignalPlate card + still** | **Broken** |
| `/match` | 200 | bleed | Half chapter | Paper, then colour plates | **Broken copy + UI** |
| `/about` | 200 | bleed | Half chapter | Paper beliefs | OK, then cocoa origin |
| `/standard` | 200 | bleed | Half chapter, no ask | Paper + Atmosphere + GateCards | Stale room |
| `/contact` | 200 | bleed | Half chapter, no ask | Paper form | OK, weak close |
| `/careers` | 200 | bleed | Half chapter, no ask | **SignalPlate** | Same card bug as Process |
| `/security` | 200 | bleed | Half chapter, no ask | Thin paper + em dashes | Stale |
| `/notices` | 200 | bleed | Half chapter, no ask | Paper FAQ | OK |
| `/design` | 200 noindex | bleed | Half chapter | Token museum + EightyBar | Internal only |
| `/demo` + 7 children | 200 | bleed | Paper spacer + banner + chapter + 8 tabs | Sample | **Stacked chrome** |
| `/legal` | 200 | bleed | Half chapter, no ask | Register | OK |
| `/legal/data` | 200 | bleed | Half chapter | Transfers | OK |
| `/legal/[slug]` | 200 × published | bleed | Half chapter | Document | OK |
| `/direct` | 200 | bleed | Half chapter | People | Side door |
| `/direct/[slug]` | 200 × 12 | bleed | Half chapter | Desk | Side door |
| `/second-chair` | 200 | bleed | Half chapter | Paper promise | Long, OK pattern |
| `/work/[slug]` | 200 × lots | bleed | Half chapter | Ink Trace | Forbidden visual + word |
| `/team/[slug]` | 200 × 12 | bleed | Half chapter | Bio | OK |
| `/edpulse` | 307 → `/second-chair` | — | — | — | Still in sitemap |
| `/report` | 200 | **bleed + pill + footer** | Empty paper note | — | **Chrome leak** |
| `/report/[slug]` | 200 if file | report (no pill) | Document | — | Right if host-split |
| `/admin`, `/admin/login` | 404 logged out | — | — | — | Auth hide. Files exist |
| `/studio/careers`, `/studio/matches` | 404 logged out | — | — | — | Auth hide. Files exist |
| `/access`, `/portal`, `/login` | 404 | — | — | — | No public portal. Sample is `/demo` |
| unknown | 404 | bleed + PageHero | “This lot is not in the catalogue.” | — | Forbidden word |

Sitemap also indexes `/match` while robots `Disallow: /match/`. Sitemap indexes `/edpulse` which only redirects.

---

## 5. Home structure (the landing)

`src/app/page.tsx` → `Hero` + `Landing`.

| # | Section | Component | Surface | Job | State |
|---|---|---|---|---|---|
| 00 | Poster | `Hero.tsx` | Full ink plate on desk | Recognition + prices + Read | **Right** |
| 01 | Start | `Where.tsx` | Paper folio | Six situations → offers | Right. Read first |
| 02 | Suggestion | `Suggest.tsx` | Shorter paper | Word map to a published offer | Honest if not labelled AI |
| 03 | Portal | `View.tsx` | Paper + portal object | One real sample screen | Right object |
| 04 | Proof | `Proof.tsx` | Paper | Tap symptoms → a case | Right idea |
| 05 | Happens | `Happens.tsx` | Dark spread in folio | Read / diagnose / build / handover | Right as a spread |
| 06 | Terms | `Terms.tsx` | Paper | Full ladder | Right |
| 07 | Who + After | `Who.tsx` `After.tsx` | Dark crew desk | Faces + Second Chair | Right as a spread |
| 08 | Questions | `Questions.tsx` | Paper | Bad-at first, then Read | Right |

Pill overlays the poster (`position: fixed`). DirectStrip is hidden on `/`. Footer is ink colophon.

---

## 6. Every other page — structure and verdict

### `/read` — the sale

1. `ReadOffer` — half chapter, cut `READ`, ask `#intake`
2. `ReadSample` — **ink** specimen card
3. Why — paper
4. After — ink
5. Start + `Desk` — paper `#start` / `#intake`

Wrong: ink immediately after the chapter, so the half cut does not read. The specimen is a legal object and should sit on paper, not become a second dark hero.

### `/session` — reference interior

1. PageHero — half chapter, cut `SESSION`, ask `#intake` “Reserve my Session”
2. Paper hour + price + in/out + link to Read
3. `OfferStart` signal room + `BriefIntake`

Right pattern. Keep.

### `/check`

1. `CheckOffer` — half chapter, cut `CHECK`, ask `#start`
2. Sits (paper ladder)
3. Reports
4. Days
5. Runner
6. Case
7. Questions
8. `CheckStart` `#start` + `PulseCheckIntake` (no `#intake`)

Pattern right. Form id is only `start`. Deep links to `#intake` miss.

### `/first-slice`

Same skeleton as Session. Right pattern. Ask “Start my First Slice” → `#intake`. Link to Check is correct.

### `/pricing`

1. PageHero — half, cut from “Pricing”
2. Route **cocoa**
3. Ladder signal
4. Rule paper
5. Included paper
6. Excluded cocoa
7. Pay paper
8. Questions cocoa
9. Start paper

Half is invisible because room 2 is cocoa. `PriceRoute` row type is already `text-ink` (written for paper cards). Flip room 2 to paper.

### `/how-it-works` — worst marketing layout after Match

1. PageHero — half, **hideAction**, cut `PROCESS`
2. `SignalPlate` — rounded dark card, **SealedStill photo**, Close price
3. Paper stages + `AnimatedStages`
4. Cocoa guarantees

This is why the founder sees “full screen” and “cards.” Delete the plate. Put Close price and the three facts on paper under the chapter. Put the Read ask back in the chapter. The still is a hero object. Banned.

### `/match` — worst public copy + colour

1. PageHero — half, cut `ASSIGNMENT`
2. Centered paper manifesto (alignment break vs left chapter)
3. Coloured pipeline (`bg-partial`, `bg-diag`, `bg-ink`)
4. “Each signal opens its file”
5. `MatchDesk`

Nav puts this next to Pricing. It uses the old vocabulary the public-voice test exists to kill. Em dashes in page strings. Centre-aligned body under a left chapter. Rebuild as: half chapter → paper desk only. No colour plates. No word `signal` on the glass.

### `/work`

1. PageHero — half, hideAction, cut `WORK`
2. Paper `WorkIndex` + PageClose to Check

Dek: `{catalogue length} rows. Nine in depth.` Catalogue is lots + `indexProjects`. If those counts drift, the sentence lies. HideAction means the chapter does not ask for the Read. PageClose goes to Check, which is honest for “your case is not here,” but the chapter should still offer the Read.

### `/work/[slug]`

1. PageHero — kicker is `caseNumber` (LOT language risk)
2. Ink band + `Trace` component
3. BrowserShot, ProofRow, crew

`Trace` is a forbidden public word and a leftover visual. Case numbers like `LOT 031` must not reach the glass. Unknown slug: `dynamicParams = false` + `notFound()` — 404, not 500. Good.

### `/team`

1. PageHero — half, hideAction, cut `TEAM`
2. **Cocoa** `PortraitStrip`
3. Paper groups

Looks full-screen dark. Portraits are a discrete object: put the strip on paper, or after a short paper line.

### `/team/[slug]`

PageHero kicker is `role · status`. Cut becomes a long phrase. Bio + direct line. Keep the Read or Direct as the one ask, not both fighting.

### `/about`

PageHero cut `Studio` → beliefs paper → origin cocoa → crew paper → where cocoa → not paper → start signal. Long but coherent. Start goes to Read. Good.

### `/standard`

PageHero hideAction → Atmosphere grain → PeopleRail → GateCards → rubric → beliefs. Pre-letter room. GateCard is a card. HideAction on a trust page is a journey leak: after they believe the crew, they need the Read.

### `/contact`

PageHero hideAction “Write us.” → BriefIntake. Correct door for “not a product yet.” Should still say the Read is the product door.

### `/careers`

Same SignalPlate crime as Process. Then GateCards + JobsBoard. hideAction. Candidate journey, not buyer journey — still must not look like a different website.

### `/security`

Thin. `{name} — {role}` em dashes. No regions on this page (they live on `/legal/data`). hideAction. Fine as a pointer if the dashes die.

### `/notices`

Paper FAQ. hideAction. Last notice is “what we are bad at.” Good. Cross-link the home FAQ so they do not drift.

### `/design`

Internal museum. EightyBar lives here only. Keep it off `/`. Em dash in metadata. Robots disallow. Good.

### `/demo` and children

`demo/layout.tsx` stacks:

1. Dummy paper spacer `h-[5.25rem]` (old masthead offset)
2. Ink sample banner
3. Full PageHero chapter every time you change tab
4. Eight-link paper nav
5. Then the view

The portal is the product proof. The layout makes it a brochure. One sample banner. One view nav. No repeating chapter on `/demo/scope`. Chapter once, or none: the portal chrome is the object.

Demo copy uses em dashes (`Close — registration harden`, metadata titles `The platform — scope`).

### `/second-chair`

Long Episode ribbon. First room paper. Ask `See how Second Chair works` is third-person-ish vs first-person rule; it is a see-link, not the money ask. Intake `Desk` at `#intake`. Standing prices from ladder. OK if it stays under the contract.

### `/direct` and `/direct/[slug]`

Side door. DirectStrip on every interior already points here. Three faces in the strip (Aneeb, Hassan, Najiullah) vs “Twelve specialists.” The strip is a second CTA under every page, including Legal and Security. That fights the Read.

### `/legal`, `/legal/data`, `/legal/[slug]`

Register and documents. Half chapter + paper is fine. DirectStrip under a contract is odd. Legal owner link on the chapter is good.

### `/report`

Private host index wearing the public pill, DirectStrip, and footer. `SiteChrome` only treats `pathname.startsWith("/report/")`, so `/report` is “interior marketing.” Fix the prefix test to include exact `/report`.

### 404

“This lot is not in the catalogue.” Forbidden `lot`. Ask “Back to the catalogue.” Home metadata title is also “The catalogue.” The buyer does not say catalogue. Say “This page is not here.” Ask “Get my free read” or “Back to bpulse.”

---

## 7. Cross-cutting systems

### Chrome

- Pill is night on all public pages. Correct.
- `--letter-inset` still lives on `:root`, so bleed pages inherit desk math for the pill. Override exists; verify 375 pill does not sit in a fake desk gutter.
- `ribbon + ribbon` default is a **0.5rem cocoa gap**. Bleed overrides to 1px. Any page that is not `letter-bleed` on `html` during first paint will flash card-gaps.
- Footer line: “set in IBM Plex” — headlines are Source Serif 4. Lie.
- DirectStrip on legal, security, notices, careers, 404, report index.

### Type

- Two heading systems: `letter-window-claim` and `type-display` / `text-[clamp(2rem,4vw,3.5rem)]`. Interiors mix them in one scroll.
- Design page still documents “Lot title 34/26” and “Lead title 72/36.” That is the previous brand. Update or noindex stays and nobody ships from it.
- Footer and some kickers use `text-label` on ink (low contrast).

### Colour

- `@theme` still has ember, tape, stuck, diag, build, ship, teal-ish `after`. Utilities `bg-partial`, `bg-diag`, `bg-stuck` still paint Match and MatchResult.
- Aurora wash in CSS mentions “rgba(200, 80, 46)” — leftover pulse orange. Confirm it is not visible on home (home uses brass lamp radial only).

### Motion

- Chapter rise + cut + kicker draw: good, reduced-motion off.
- `AnimatedStages`, `Atmosphere`, `Reveal` / `Rise` / `Stagger` still run on interiors. Fine if quiet. Not fine if they feel like a second theme.
- EightyBar motion on `/design` only.

### Copy / tests

- `funnel.test.ts` still locks `pulseCopy.claim` to “stuck at 80%.” Live hero uses `hero.ts`. The test is protecting a dead string. Update the test to the live claim or the next cleanup will “restore” the old hero.
- `readingNote`: “the written Read is free and arrives in one business day.” `arrives` is next to the forbidden `arrived` family. Say “lands” (already used in `doubtCopy`).
- `notices.ts` and `beliefs.ts` use em dashes in published answers.
- `specialists.ts` `writeAbout` / `philosophy` em dashes show on team slugs.
- Match page is a forbidden-word farm: signal, lot, em dashes.
- OG alt: `${brand.name} — ${brand.tagline}` em dash.

### SEO / robots

- `/match` in sitemap, `/match/` disallowed. Pick one. If Match is a product door, allow it after the rewrite. If it is an engine demo, remove from nav.
- `/edpulse` in sitemap, 307 to Second Chair. Remove from sitemap.
- `/design` disallowed. Good.
- Most interiors have no route-level OG. They fall back to the brand image. Fine for now. Not a P0.

### Ops / trust

- Admin and studio exist in source, 404 when logged out. Confirm they never 200 without a cookie on preview.
- `/portal` 404. Home and FAQ promise “a login you can watch.” The proof is `/demo`. The word “portal” on home is OK if `/demo` is obviously the sample. Do not leave a dead `/portal` in old copy.
- Check reports and demo documents must stay labelled sample.

---

## 8. Issue register

Severity: **P0** blocks money or is visibly broken. **P1** breaks the contract or trust. **P2** polish. **P3** nit.

### Architecture (do these first)

| ID | Sev | Where | Issue | Fix |
|---|---|---|---|---|
| A01 | P0 | Interiors | First room after chapter is often ink, so 50svh reads as full screen | Contract: first sibling after `letter-chapter` is paper. Change ReadSample, PriceRoute episode, Team portraits, Process plate |
| A02 | P0 | `/how-it-works`, `/careers` | `SignalPlate` is a rounded card + `SealedStill` object on dark | Delete plate. Paper band. Price as type. No photo |
| A03 | P0 | `/demo/*` | Four chrome layers + chapter on every tab | One banner, one view nav, chapter once or never |
| A04 | P0 | `/report` | Public pill/footer on a private host index | Treat `/report` as report chrome |
| A05 | P1 | CSS | `.ribbon + .ribbon` 0.5rem gap vs bleed 1px | Hairline is default on bleed; never 8px cocoa gutters |
| A06 | P1 | CSS | `.letter-window` min-height ~100svh vs `.is-chapter` 50svh | Keep chapter more specific. Add a test comment in CSS so nobody “fixes” it back to full |
| A07 | P1 | CSS | `.hero-plate` radius fights chapter radius 0 | Chapter wins today; set `hero-plate` radius 0 when `.is-chapter` |
| A08 | P1 | `/` vs interiors | Three page types, one SiteChrome boolean that is easy to get wrong | Explicit map: home / bleed / report. Include exact `/report`, `/read/*`, `/match/*` |
| A09 | P1 | Team, About, Pricing | Cocoa immediately after chapter | Paper first, cocoa as section 3+ |
| A10 | P2 | Pill | `:root --letter-inset` still pads bleed pill | Bleed pill padding is viewport gutter (12–16px), not desk |

### Home

| ID | Sev | Issue | Fix |
|---|---|---|---|
| H01 | P1 | `pulseCopy.claim` is dead; tests still require “stuck at 80%” | Point tests at `heroCopy`. Keep `pulseCopy` only for CTA/href/trust |
| H02 | P1 | Home metadata title “The catalogue” | “Last twenty percent” or the claim. Buyers do not search catalogue |
| H03 | P2 | `pulseCopy.dek` disagrees with `heroCopy.dek` | One dek. Live one wins |
| H04 | P2 | Suggest must never say AI | Keep “Suggestion.” Map to ladder + match |
| H05 | P2 | Proof needs two taps; 90s buyer may bounce | Keep, but one line under it: “Or skip this. The Read is free.” |
| H06 | P3 | Folio dark spreads Happens + crew | Keep. They are spreads in one sheet, not cards |
| H07 | P3 | Home secondary “See the work” is unused on the poster | Do not add a second button on the poster |

### Read

| ID | Sev | Issue | Fix |
|---|---|---|---|
| R01 | P0 | ReadSample is ink after chapter | Paper room, specimen stays the paper card |
| R02 | P1 | Why block links to Check before they send the Read | Keep Check as a mention after the form, not before |
| R03 | P1 | Desk conversation vs Session BriefIntake | Two intake UIs. Pick one shape for “send words.” Desk is fine if it submits |
| R04 | P2 | Heading “Free. One business day.” repeats the dek | Keep. It is the offer |
| R05 | P2 | After band is a third ink slab | Allowed as room 4 if room 2 is paper |

### Session / Slice / Check

| ID | Sev | Issue | Fix |
|---|---|---|---|
| O01 | P0 | Check `#intake` missing | Put `id="intake"` on `PulseCheckIntake` wrap |
| O02 | P1 | Session chapter ask is paid; pill ask is still Read | Correct. Keep both. Do not make the pill say Reserve |
| O03 | P1 | OfferStart is `tone="signal"` (ink) | OK as the **last** room. Never first |
| O04 | P2 | Price repeated in chapter kicker, chapter, and paper 48px | One big price on paper, chapter stays the promise |
| O05 | P2 | InOutPlate may read as a card | If it has radius+shadow, flatten to two columns |
| O06 | P3 | First Slice honest line is good | Do not sweeten |

### Pricing

| ID | Sev | Issue | Fix |
|---|---|---|---|
| P01 | P0 | First Episode cocoa | `tone="paper"` + EpisodeHead paper |
| P02 | P1 | Eight rooms. 90s buyer | Keep ladder high. Collapse included/excluded if needed later |
| P03 | P1 | Gold on ladder? | Gold only on the recommended row ask, not every price |
| P04 | P2 | Start room duplicates Read CTA | Fine. Last ask may repeat |

### Process

| ID | Sev | Issue | Fix |
|---|---|---|---|
| PR01 | P0 | hideAction | Show “Get my free read” |
| PR02 | P0 | SignalPlate + SealedStill | Remove. Paper facts |
| PR03 | P1 | Copy admits “Portal screenshots are not on file yet” | Point at `/demo`, delete the apology or make demo the proof |
| PR04 | P1 | AnimatedStages vs letter quiet motion | Keep only if it is a list, not a theatre |
| PR05 | P2 | Guarantees cocoa last | OK after paper stages |

### Match

| ID | Sev | Issue | Fix |
|---|---|---|---|
| M01 | P0 | Em dashes and `signal` / `lot` on the glass | Rewrite every string through public-voice |
| M02 | P0 | `bg-partial` `bg-diag` colour plates | Ink/paper only |
| M03 | P1 | Centered manifesto under left chapter | Left, measure 52ch, same grid as Session |
| M04 | P1 | In nav as a peer of Pricing | After rewrite, or demote from nav to footer |
| M05 | P1 | Sitemap vs robots | Allow after rewrite, or remove from sitemap and nav |
| M06 | P2 | MatchDesk is the actual product | Keep the desk. Delete the essay plates |
| M07 | P2 | Title “The assignment engine” | “Describe what is stuck.” Buyer words |

### Work / Team

| ID | Sev | Issue | Fix |
|---|---|---|---|
| W01 | P1 | Work hideAction | Add Read ask |
| W02 | P1 | “N rows. Nine in depth.” | Compute both from data. Do not hardcode nine |
| W03 | P1 | Work slug kicker `LOT` / case number | “031” or client only. Never `LOT` |
| W04 | P0 | `Trace` on work slug | Rename public label. Or replace with a quiet stage list |
| W05 | P1 | Team hideAction + cocoa first | Read ask. Portraits on paper |
| W06 | P2 | Missing photos as initials | Already promised. Keep |
| W07 | P2 | Team slug cut from long kicker | Pass `cut={first name}` |
| W08 | P3 | Work PageClose → Check | Keep |

### Company

| ID | Sev | Issue | Fix |
|---|---|---|---|
| C01 | P1 | Standard hideAction + GateCards | Read ask. Flatten cards to rows |
| C02 | P1 | Careers SignalPlate | Same delete as Process |
| C03 | P2 | Contact hideAction | OK if the form is the ask. Add “If you have a stuck build, the Read is faster.” |
| C04 | P1 | Security em dashes | Colon or period |
| C05 | P2 | Security is a vendor list | One sentence + link `/legal/data`. Do not duplicate badly |
| C06 | P3 | Notices hideAction | Optional Read ask at the end (PageClose) |
| C07 | P2 | About length | Keep. Start already goes to Read |

### Demo / Direct / Chair

| ID | Sev | Issue | Fix |
|---|---|---|---|
| D01 | P0 | Demo layout stack | See A03 |
| D02 | P1 | Demo em dashes in titles and engagement name | Rewrite seeds |
| D03 | P1 | Dummy `h-[5.25rem]` spacer | Delete. Pill is fixed overlay |
| D04 | P2 | Eight demo views | Keep. They are the portal |
| D05 | P2 | DirectStrip vs Read | Hide on legal/security/404/report. Soften copy to not compete |
| D06 | P3 | Strip says twelve, shows three faces | “Write Aneeb, Hassan, or Najiullah” or show twelve initials |
| D07 | P2 | Second Chair CTA `afterCopy.open` | First person: “See my Second Chair options” or keep as a see-link, not a gold ask |

### Copy (public glass)

| ID | Sev | Quote / place | Fix |
|---|---|---|---|
| T01 | P0 | 404 “This lot is not in the catalogue.” | “This page is not here.” |
| T02 | P0 | Match bodies with `—` | Rewrite |
| T03 | P0 | Security `{name} — {role}` | `{name}. {role}` |
| T04 | P1 | `beliefs.ts` em dashes | Rewrite the published belief |
| T05 | P1 | `notices.ts` em dashes | Rewrite |
| T06 | P1 | Specialist `writeAbout` / `philosophy` em dashes | Rewrite |
| T07 | P1 | `readingNote` “arrives” | “lands” |
| T08 | P1 | OG `name — tagline` | Comma or period |
| T09 | P1 | Demo metadata “The platform — scope” | “Scope. Sample.” |
| T10 | P1 | `check-reports.ts` “keep — you don't need us” | “Keep. You do not need us.” |
| T11 | P2 | Home FAQ vs notices answers | One source |
| T12 | P2 | `pageFrame.secondChair` “On Call starts at $900” vs Standing name | One name: Standing or Second Chair, not both unexplained |
| T13 | P2 | Footer “set in IBM Plex” | “Source Serif 4 and IBM Plex” or delete |
| T14 | P2 | Design metadata em dash | Internal, still clean it |
| T15 | P2 | CrewSession strings (if any public) em dashes | Those scripts must pass public-voice |
| T16 | P3 | Curly apostrophe in Match title | Straight is fine. Not a voice crime |

### Type / place / colour recipes

| ID | Sev | Issue | Fix |
|---|---|---|---|
| V01 | P1 | Mixed `type-display` and `letter-window-claim` | Chapter = letter-window-*. Rooms = one folio scale: kicker 11–12 mono, h2 clamp 2–3.5rem serif, body 17–18 |
| V02 | P1 | Match colour tokens on glass | Ban `bg-partial` `bg-diag` `bg-stuck` on `src/app` and `src/components` except `/design` and reports |
| V03 | P2 | Atmosphere grain on standard/security/notices | Off, or so faint it is not a second theme |
| V04 | P2 | ObjectRow / room-card / card classes on interiors | If a section uses them, it is a card. Flatten |
| V05 | P2 | Legal chapter dek uses `decoration-paper` | Correct on ink. Do not copy that class onto paper |
| V06 | P2 | 375 chapter: long titles + CTA + facts | Check already grows past 50svh. Allowed. Do not clip the ask |
| V07 | P2 | Home 375 ladder may crowd the claim | Claim must stay above the fold. Ladder may continue below |
| V08 | P3 | Cut word from long kickers (“Applying”) | Always pass an explicit `cut` on PageHero |

### SEO / ops / data

| ID | Sev | Issue | Fix |
|---|---|---|---|
| S01 | P1 | `/edpulse` in sitemap | Remove |
| S02 | P1 | `/match` sitemap vs robots | Decide after M04 |
| S03 | P1 | `/portal` exists behind auth; public copy still points at a live login | Strangers go to `/demo`. Authenticated `/portal` is a stub |
| S04 | P0 | `/admin/login` is unreachable (layout `notFound`) | See X05. Logged-out `/admin` 404 is correct |
| S05 | P1 | Studio/admin are session-gated in `proxy.ts` | Keep. Fix login. Do not trust `LAUNCH-STATE.md` “no auth” |
| S06 | P2 | Report host split in `proxy.ts` | Keep. `/report` index must not market |
| S07 | P3 | Route OG images missing | Later |

### Journey leaks (the actual business)

| ID | Sev | Issue | Fix |
|---|---|---|---|
| J01 | P0 | Process, Work, Team, Standard, Match chapter often hide the Read | Default PageHero `hideAction={false}` except Contact, Careers, Legal, 404-to-home |
| J02 | P0 | DirectStrip competes with the Read on every interior | Hide except Work/Team/About. Or move into footer |
| J03 | P1 | Match is in the primary nav | After rewrite only. Otherwise it trains the buyer that assignment is the product. The product is the Read |
| J04 | P1 | Home Suggest can send them to Match | “See the full match” is OK as secondary. Primary must stay Read |
| J05 | P1 | Why-on-Read points to Check before intake | Move below the form |
| J06 | P1 | 90s path has too many interiors | Do not add pages. Shorten Process and Match |
| J07 | P2 | Second Chair is in Where but not in nav | Correct. Footer/home is enough |
| J08 | P2 | Close links to Process not a Close intake | Correct. Close is scoped after Check |
| J09 | P2 | Standing links to Second Chair | Correct if the page says Standing once |
| J10 | P3 | Careers is not the buyer path | Do not put it in the pill |

---

## 9. How to place a component (decision list)

Use this in the next session instead of inventing layout.

**A chapter (`PageHero` / `HeroFrame`)**
When: every public interior.  
How: full bleed, 50svh min, ink, cut word, left type, one brass ask.  
When not: home (use framed poster). Private report. Demo child tabs.

**A paper room (`Episode tone="paper"`)**
When: the first room after a chapter, lists, forms, FAQs, prices.  
How: no radius, no shadow, hairline to the next room, `stage-container` measure.

**A dark spread (`Episode tone="cocoa"` or folio dark)**
When: section 3 or later. Crew, origin, guarantees.  
How: full bleed ink, no card, no gold wash.  
When not: immediately under a chapter.

**A discrete object (the only “card”)**
When: a real specimen, a real report, the sample portal, a locked document.  
How: one per page if possible. Paper inside if the room is ink, or ink chrome around a paper doc.  
When not: wrapping a whole section.

**A form**
When: the page’s job is to take words (Read, Session, Slice, Check, Contact, Direct, Chair).  
How: `#start` and `#intake` both present. First-person submit. No “book a call.”

**Gold button**
When: the action that makes money or starts the Read.  
How: `btn-gold`. Once per chapter. Once more at the real form is OK.  
When not: outlining the pill, colouring prices, colouring rooms.

**Mono**
When: price, date, count, kicker, meter.  
When not: headlines.

---

## 10. Next session plan

### Session A — contract (half a day)

1. CSS + SiteChrome: the table in §1 is law. `/report` exact path. Bleed pill gutter.
2. First-after-chapter is paper: ReadSample, Pricing route, Team strip, delete SignalPlate on Process and Careers.
3. Process: restore Read ask, delete SealedStill.
4. Verify `/`, `/session`, `/read`, `/check`, `/pricing`, `/how-it-works`, `/team` at 1440 and 375.

### Session B — Match + Demo + 404

1. Match: desk only, public voice, no colour plates. Nav decision.
2. Demo: kill spacer, one chapter max, rewrite em dashes.
3. 404 + home title: no catalogue/lot.
4. Verify `/match`, `/demo`, `/demo/scope`, a 404.

### Session C — copy sweep

1. Grep `—` in `src/app` and `src/content` excluding comments and legal form-fill placeholders that are empty fields.
2. Forbidden words on glass.
3. Retarget `funnel.test.ts` to `heroCopy`.
4. Footer type credit. Second Chair / Standing naming.

### Session D — journey polish

1. PageHero default ask on Work, Team, Standard, Process. Team index must not send the buyer to Match. Team slugs must not gold-ask Direct in the chapter.
2. DirectStrip placement.
3. Check `#intake` (Match `PriceBand` and `SpecialistCard` currently deep-link a missing hash).
4. Work slug without Trace/LOT. Findings `blocked` must not be `lot.grade.label`.
5. Hash re-test: `/check#start`, `/check#intake`, `/read#intake`, `/session#intake`.
6. Do not restyle the home poster. Do collapse extra gold on home (one brass ask per viewport) and remove the Happens “now” badge.

### Do not do in the next session

- New palette, new font, new home poster, Gen Z slang, particle motion, rebuilding legal, inventing portal screenshots, adding pages.

---

## 11. Count

Numbered rows in §8: **107**. Parallel pass added **30** new rows in §13. Unique actionable issues in this file: **~137**, plus the per-route verdicts in §4.

Do not pad to 400. Execute §10 and X01–X12. A later 375 pass on every `/work/*` and `/legal/*` slug can add more if needed.

**The business in one paragraph.** You finish software that looks done and will not ship. You publish prices. You give a free written Read. The site is right when a burned founder can do that without decoding three layouts. Home is a framed poster. Every other page is a half-window chapter on paper. Cards are objects. Gold is the ask. Match and Process are the current trust leaks. Session is the pattern to copy.

---

## 12. File map for the next agent

| Job | Open first |
|---|---|
| Chrome | `src/components/SiteChrome.tsx`, `src/app/globals.css` (letter-*, ribbon) |
| Chapter | `src/components/HeroFrame.tsx`, `PageHero.tsx` |
| Home | `Hero.tsx`, `Landing.tsx`, `src/content/hero.ts`, `home.ts` |
| Right interior | `src/app/session/page.tsx` |
| Broken interior | `src/components/SignalPlate.tsx`, `src/app/how-it-works/page.tsx`, `src/app/match/page.tsx`, `src/app/demo/layout.tsx` |
| Sale | `src/app/read/page.tsx`, `ReadOffer.tsx`, `ReadSample.tsx` |
| Voice | `src/content/public-voice.test.ts`, `funnel.test.ts` |
| Prices | `src/content/ladder.ts` |

---

## 13. Parallel pass — extra issues the first draft missed

Six page-group audits ran after §1–12 were written. They confirm the contract. These rows were **not** in §8 and change what the next session must do. Do not treat `LAUNCH-STATE.md` as current: admin, portal, and `/report` exist; legal publish status is `draft`.

### New P0s

| ID | Sev | Where | Issue | Fix |
|---|---|---|---|---|
| X01 | P0 | `/check` + Match | `/check#intake` is dead. Match `PriceBand` and `SpecialistCard` use it | Add `id="intake"` on `CheckStart` (same as `OfferStart`) |
| X02 | P0 | `/read` content | `read.ts` says “Thirty minutes of a senior engineer.” Ladder says one business day | One meter: one business day. Effort may be thirty minutes internally; do not publish both |
| X03 | P0 | `/pricing` FAQ | “Session and the Check credit against anything you buy” | Check credits against **a build** only (`ladder.ts`) |
| X04 | P0 | `/team`, `/team/[slug]` | Index close goes to Match. Slug chapter gold-asks Direct | Read first. Direct/Match secondary, not the chapter ask |
| X05 | P0 | `/admin/login` | `admin/layout.tsx` `notFound()` wraps login. Magic `safeRedirect` rejects `/admin` | Login outside the gated layout. Allow `/admin` in `safeRedirect` |
| X06 | P0 | Legal | `LEGAL_PUBLISH_STATUS = "draft"` on every doc. `reviewNote` is public | Hide solicitor notes. Do not imply in-force templates until sign-off |
| X07 | P0 | `error.tsx` | “Back to the catalogue” | Same as 404: home or Read |
| X08 | P0 | `/direct` | “Lots · {clients}” on the glass | “Work” / client names |
| X09 | P0 | CrewSession | “read, trace, map, grade, report” | Plain Check days. No `trace` |
| X10 | P0 | `crew-lines.ts` | Fizza “ten live client builds” | Trace to lots or delete. Invented count |
| X11 | P0 | Home CSS | Folio sections `min-height: 100svh` | Only the poster is full window. Folio rooms are content height |
| X12 | P0 | Check chapter | Facts grid lives in the 50svh chapter | Move facts to the first paper room |

### New P1s (do in Session A–C)

| ID | Sev | Issue | Fix |
|---|---|---|---|
| X13 | P1 | Home gold on hero + pill + Where + Suggest + Questions + Terms price | One brass ask per viewport. Prices stay ink/mono |
| X14 | P1 | Hero brass radial wash | Flat ink on the poster. Brass only on the button |
| X15 | P1 | Happens Build stage `current: true` | Remove “now.” You are not already building their product |
| X16 | P1 | Suggest gold always “Get my free read” even when the match is Check | Keep Read as the honest fallback in copy. Do not gold-ask a different offer than the suggestion without saying so |
| X17 | P1 | Standing vs Second Chair | One public name on home, pricing, and `/second-chair` |
| X18 | P1 | `:root --letter-inset` still applies on bleed | `html.letter-bleed { --letter-inset: 0 }` |
| X19 | P1 | Global `.ribbon + .ribbon` 0.5rem cocoa gap vs bleed 1px | Hairline wins. Remove the 0.5rem rule |
| X20 | P1 | `SignalFrame` reintroduces a padded card after the chapter | Dies with SignalPlate |
| X21 | P1 | Team slug renders internal signal IDs | Human labels or omit |
| X22 | P1 | Work findings `blocked` = `lot.grade.label` for every highlight | Real blocked line, or drop the field |
| X23 | P1 | `/careers/diagnostic/*` and `/status/*` wear marketing chrome | Report-style chrome on token routes |
| X24 | P1 | Authenticated ops hitting `/` redirect to `/admin` | Do not lock the public site when someone is logged in |
| X25 | P1 | `brand.ts` still says “stuck at 80%” while the live H1 does not | Pick the live hero. Cascade metadata |
| X26 | P1 | `public-voice.test.ts` can pass while Match/404 still say lot/signal/record | Widen the test or rewrite those strings first |
| X27 | P1 | Check chapter on 375: 50svh ≈ 333px, claim can fall below the fold | Mobile chapter `min-height: max(50svh, 22rem)`; thinner top pad |
| X28 | P1 | Home portal sample still says “staging deploy key” | “Staging access.” Forbidden-adjacent |
| X29 | P1 | How-it-works StageRail marks Read as `current` | Entry point, not “now” |
| X30 | P1 | About StartPlate label “Start”; pricing StartPlate “Start” | “Get my free read” |

### Visual contract additions (from the CSS pass)

Use with §1. Do not reopen the palette.

- Split `.letter-window` so interiors cannot inherit the home full-window min-height.
- Remove `hero-plate` from interiors, or force radius 0 + no shadow under `.letter-bleed`.
- Chapter plate: flat ink. Brass radial stays on `.letter-hero` only.
- `DirectStrip`: flatten (no avatar chip stack) or merge into the footer.
- Ban `bg-partial` / `bg-diag` / `bg-ship` / EightyBar on marketing routes. `/design` only.
- `prefers-reduced-motion` must also kill `.reveal` / `.card` transitions.
- `/session` remains the interior reference. Copy its chapter → paper cadence.

### What the parallel pass said is already in §8

Ink-after-chapter, SignalPlate, Match voice, demo stack, `/report` chrome, 404 lot, Check `#intake` (now X01), funnel test vs `heroCopy`, folio vs cards. Do not file those twice.

### Updated count

§8: 107. §13: 30 new. Parallel raw lists (home 42 + offers 58 + trust 58 + demo/ops 45 + copy 93 + visual 58) overlap heavily. **Unique actionable rows in this file: ~137.** The next session executes §10 + X01–X12, not a 400-item backlog.
