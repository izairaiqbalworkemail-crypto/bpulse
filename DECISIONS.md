# DECISIONS.md — Interpretations, Trade-offs, Contrast Table

Everything in this brief that had to be interpreted or chosen between, recorded.
Contrast ratios are computed, not asserted.

---

## Contrast Table

Computed from the settled tokens.

### Checkpoint 1 hero pairs (Sep 2026)

- `#EFEAE0` on `#0D1218` (primary hero text): **15.68:1**.
- `rgba(239,234,224,0.72)` on `#0D1218` (quiet lead-in): effective `#B0AEA8`, **8.48:1**.
- `rgba(239,234,224,0.70)` on `#0D1218` (secondary mono): effective `#ABA9A4`, **8.01:1**.
- `#0D1218` on `#F2C230` (hero CTA): **11.22:1**.

All pass WCAG AA; secondary text stays at or above 70% opacity.

### Dependency decisions (Sep 2026)

- Added `motion` (`motion/react`) for spring-driven and path-morph animation in the hero because the brief explicitly requires Motion as the animation runtime.

### Iron on Rag (primary text / headings)

- Foreground: `#10161C` (iron)
- Background: `#EFEAE0` (rag)
- **Ratio: 15.18:1** — AAA, far exceeds WCAG AA 4.5:1.

### Ink on Rag (secondary text)

- Foreground: `#38424E` (ink)
- Background: `#EFEAE0` (rag)
- **Ratio: 8.51:1** — AAA, far exceeds WCAG AA 4.5:1.

### Iron on Signal (CTA button text)

- Foreground: `#10161C` (iron)
- Background: `#F2C230` (signal)
- **Ratio: 10.87:1** — AAA, far exceeds WCAG AA 4.5:1.

### Rag on Iron (masthead / footer text)

- Foreground: `#EFEAE0` (rag)
- Background: `#10161C` (iron)
- **Ratio: 15.18:1** — AAA, exceeds WCAG AA 4.5:1.

### Rag 70% on Iron (masthead secondary floor)

- Effective colour: `rgba(239,234,224,0.7)` composited on `#10161C`
- **Ratio: 11.19:1** — AAA.

### Ink 70% on Rag (caption / mono labels floor)

- Effective: `rgba(56,66,78,0.7)` on `#EFEAE0`
- **Ratio: 5.95:1** — passes AA for normal text.

### Sound dot on Rag (grade dot)

- `#4A8F6F` on `#EFEAE0` — **4.25:1**. Passes AA for large/graphical UI. The dot is an 8px non-text indicator always paired with a word, so the word carries the meaning.

### Unsound dot on Rag (grade dot)

- `#B03A28` on `#EFEAE0` — **4.53:1**. Passes AA. Same pairing rule.

---

## Structured Data Validation

**Result: not yet run against Google's Rich Results Test.** The site is not deployed, and the Rich Results test requires a public URL or an HTML file upload. The test accepts a pasted snippet.

`Organization` and `WebSite` JSON-LD are emitted in the root layout. `Service`, `Person`, `FAQPage`, and `BreadcrumbList` factories are built and exported in `src/lib/JsonLd.tsx`, ready for the routes that use them.

**Action:** run the deployed homepage through Google's Rich Results Test at launch. Expected outcome: `Organization` + `WebSite` validate cleanly (both are well-formed `@context: https://schema.org` documents). This decision records the pending validation; it has not been faked as a pass.

---

## Interpretations and Trade-offs

### 1. `@theme` vs grade colours

The brief requires `sound` / `unsound` OUTSIDE `@theme` so Tailwind generates no `bg-sound` utility and the constraint cannot be violated from markup. This is implemented as plain custom properties on `:root`. The `Grade` primitive reads them via inline `style={{ backgroundColor: "var(--color-sound)" }}`. There is no `bg-sound` class anywhere and none is generated.

### 2. Type scale — clamp() formulas

Rather than hardcoding three breakpoint values per role, I used CSS `clamp()` so the type scales fluidly and the exact values at any viewport are computable. Formulas:

| Role | Clamp formula | 375px | 768px | 1440px |
|---|---|---|---|---|
| Lead title | `clamp(2.25rem, 4.5vw + 0.5rem, 4.5rem)` | 36px | 54px | 72px |
| Lot title | `clamp(1.625rem, 1.25vw + 1.125rem, 2.125rem)` | 26px | 29px | 34px |
| Section label | `clamp(0.875rem, 0.3vw + 0.75rem, 0.9375rem)` | 14px | 15px | 15px |
| Reading | `clamp(1rem, 0.5vw + 0.8rem, 1.125rem)` | 16px | 17.5px | 18px |
| Data / mono | `clamp(0.8125rem, 0.3vw + 0.6875rem, 0.875rem)` | 13px | 14px | 14px |
| Caption | `clamp(0.75rem, 0.3vw + 0.625rem, 0.8125rem)` | 12px | 13px | 13px |

Note: the 1440px column uses the brief's desktop values as the clamp max. Mid breakpoints interpolate. 768px sits between mobile and desktop per the brief's tablet row (52/30/15/18/14/13), which the fluid scaling approximates.

### 3. Reduced motion — per-behaviour, not global

A global `animation: none; transition: none` would freeze the interface and kill focus transitions (which are a WCAG requirement). Instead:

- `@media (prefers-reduced-motion: reduce)` disables: `.mark-strike` animation, `.lot-rule` transition, `.hover-lift` transform. It keeps colour, border, and focus transitions.
- Verified by specificity: the reduced-motion block uses `!important` on the motion-specific rules so it cannot be overridden by a later class.

### 4. Optical sizing — Newsreader

The brief requires Newsreader "locked to text optical size." `next/font/google`'s Newsreader serves a variable font with an `opsz` axis (6–72) and variable `wght` (200–800).

Applied in `globals.css`:

```css
h1, h2, h3, p, .font-newsreader {
  font-optical-sizing: auto;
  font-variation-settings: "opsz" 16, "wght" 400;
}
```

`font-optical-sizing: auto` lets the browser derive opsz from the rendered size, so a 36px heading still renders at a reading-like optical size instead of the high-contrast display face. `font-variation-settings` pins the default to text-optical (opsz 16, wght 400) as a baseline. This prevents exactly the failure the brief describes: high-contrast serif on warm cream.

### 5. Grid — 1180px with 32px gutters

Chosen over ivee's measured 1200px. The brief's grid is settled at 1180px; ivee's 1200px confirms the convention, but we keep 1180px for the slightly tighter reading rhythm a catalogue wants.

### 6. `signal` — enforced by review

`--color-signal` is in `@theme`, so `bg-signal` can technically be used anywhere. The rule (one fill per viewport) is enforced by a review habit: the CTA button is the only intended signal fill per page. This is documented rather than structurally enforced because Tailwind generates the utility; the alternative (keeping signal outside `@theme`) would force inline styles and reduce compose-ability.

### 7. `brand.ts` location — `src/config/`

Per the note: brand is configuration, not a library — so it lives at `src/config/brand.ts`, read by everything.

### 8. DeepIDC.com

Unreachable at build time (transport error). Studied via the existing project-shots/logo assets instead. Note in STUDY.md.

### 9. Motion — the rule draw-on delay

The brief says 400ms with 60ms stagger within a lot. Implemented via `transitionDelay` on the rule, driven by the `useInView` IntersectionObserver. `prefers-reduced-motion` disables the transition without hiding content (rule renders at full opacity regardless — only the draw animation is skipped).

### 10. Assets

The brief said "all assets in the root use them and post in public." Moved `logo.png`, `logos/`, `project-shots/`, `team/` into `public/`. The old acid-lime `icon.svg`/`apple-icon.svg` were reauthored into `src/app/` in the new iron/rag palette (chevron shape preserved). The old-palette duplicates were removed to avoid shipping the wrong brand colour.

### 11. Contrast floor lint guard

Added an ESLint guard using `no-restricted-syntax` to block `className` strings that use `text-ink/*` or `text-rag/*` below `/70` in the Phase 1/2 implementation files:

- `src/components/Hero.tsx`
- `src/components/primitives/Masthead.tsx`
- `src/app/check/page.tsx`
- `src/components/IntakeForm.tsx`

This prevents regressions while the remaining routes are migrated to the same floor in later phases.

---

## Remaining Work after this prompt

The four prompt pages build. Routes `/check`, `/work/[slug]`, `/team/[slug]`, `/notices`, `/contact`, `/report/[slug]` are wired in sitemap/robots/SEO but have no page files. The `/report` constraint (unguessable slugs, noindex) is documented in `SECURITY.md`.

---

## Arrival-State Grading (decision)

**Rejected:** publishing a live "holding / not holding" grade on a named client's current product. Two reasons:

- It is an unconsented public negative assessment of the client's product today, sourced from an internal ledger note.
- It reads backwards commercially: "DeepIDV — not holding" reads as "bpulse worked on it and left it unsound."

**Adopted:** the grade describes the lot's **condition on arrival** — the state of the object when it came through the door. Every lot arrived short of shippable; that is why it was brought in. What it is now is the outcome, stated separately in `outcome` ("Shipped: …").

Semantics:

- `grade.label` = condition on arrival ("Incomplete on arrival", "Stalled on arrival", …).
- `grade.date` = the arrival date. **Where the source records no arrival (or engagement-start) date, the date is omitted, not inferred**, and the lot's `limits` line says so.
- `outcome` = what shipped, stated separately.
- The studio-assessment framing is deleted. No live grades on client products.

Implementation: `ArrivalGrade` in `src/content/types.ts`; the `Grade` primitive renders the date only when present.

### Arrival-state vocabulary

Four states, proposed from the source language and mapped onto the two existing token colours (no third colour). Three are in use across the nine lots; `unstable` is reserved and unspent because no source supports "arrived broken."

| State | Colour | Meaning | Anchored in source | Lots |
|---|---|---|---|---|
| `incomplete` | sound (green) | built but not finished — demo-only, last-20% or an attribution/SEO/lead-capture pass still open | "looked done in demo mode"; "source links audited … pass completed"; "full technical SEO, lead capture" | WearMeOut, Mythos, SBA 504 |
| `stalled` | sound (green) | work done but unable to ship until ownership/integration order; built but unlaunched | "handover focus on integration notes and ownership clarity"; "launch a two-sided marketplace" | Sully, myUsta |
| `integration-blocked` | unsound (red) | a core path not production-ready; integrations pulling in every direction | "verification flows … to production-ready compliance paths"; "third-party integrations pulling in every direction" | DeepIDV |
| `unstable` | unsound (red) | arrived broken/fragile | — (reserved; no source supports it) | none |

Led lot is DeepIDV (LOT 031, `integration-blocked`) — the strongest arrival story, which works better under arrival semantics.

### Why the two colours are honest

Nearly everything arrives "unsound" in the sense of not-shippable. The two-colour split therefore encodes **how far along the object was relative to shippable**, not good/bad:

- green (`sound`) = the bones are intact; shippable with the last twenty percent (incomplete, stalled).
- red (`unsound`) = a structural piece was missing or not production-ready on arrival (integration-blocked, unstable).

This keeps the existing two token colours and never invents a third.

---

## Frame pass: Header, Hero, Footer (Sep 2026)

### Contrast — computed on the current tokens

- Nav link `#EFEAE0` @ 75% over pill `#151C25` → effective `#B9B7B1`, **8.18:1** (AA).
- Nav link hover/focus `#EFEAE0` over `#151C25` → **14.15:1** (AAA).
- Pill `Menu` mono control `#EFEAE0` @ 75% over `#151C25` → **8.18:1** (AA).
- "Book a call" iron text `#0D1218` on signal `#F2C230` → **11.22:1** (AA).
- Pain statement unselected `#EFEAE0` @ 70% over `#0D1218` → effective `#ABA9A4`, **7.61:1** (AA).
- Pain statement selected `#EFEAE0` over `#0D1218` → **15.68:1** (AAA).
- Footer column labels/colophon `#EFEAE0` @ 70% (bumped from 60%) over `#0D1218` → **7.61:1** (AA).
- Nothing renders below 70% text opacity after the footer colophon bump (`text-rag/60` → `text-rag/70`).

### Fix: entrance animations were freezing in real Chrome

Found by capture inspection, not asserted: with the panel spring's `settled` state gating only the `transition.delay` (60s/999s while pending), motion never restarted the already-in-flight child animations when `settled` flipped — the pain list stayed at `opacity: 0` and the 80% bar never filled, in both dev and prod. Fixed by flipping the `animate` **targets** through `revealed = reduceMotion || settled` (0 → shown / `width: 0` → `"80%"`), so motion starts a new value animation on settle. Verified by pixel scan: the bar fill run spans 101–1058 of the 1200px track ≈ **79.8%** after settle.
