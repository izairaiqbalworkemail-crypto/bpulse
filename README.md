# bpulse — Foundation

The production foundation for bpulse.dev: a senior software studio in Lahore
that finishes the last twenty percent of products built and won't ship.

This is a **catalogue**. Real lots — real clients, real condition notes on work
bpulse actually did, what arrived, what was wrong, what it took. The reference
is a Christie's evening-sale catalogue page, not an agency marketing site.

## Stack

- Next.js (App Router) + TypeScript `strict`
- Tailwind CSS v4, CSS-first `@theme`, no `tailwind.config.js`
- `next/font/google`, self-hosted, `display: swap`
- **No UI library.** Every primitive written here.
- Motion: `motion` ^13.2.0 for intake step transitions. CSS transitions plus `useInView` elsewhere. Reduced-motion is respected.
- ESLint + Prettier, `pnpm`

## Setup

```bash
pnpm install
pnpm dev
```

## Design tokens (the law)

| Token | Hex | Role |
|---|---|---|
| `rag` | `#EFEAE0` | The ground — ~95% of surface area |
| `iron` | `#10161C` | Masthead bar and closing rule only |
| `ink` | `#38424E` | Secondary text on paper |
| `signal` | `#F2C230` | One fill per viewport (CTA) |
| `sound` | `#4A8F6F` | Grade: holding — always with a word |
| `unsound` | `#B03A28` | Grade: not holding — always with a word |

Rules, enforced structurally where possible:

- Paper dominates. Iron is the masthead and the closing rule only.
- `signal` appears once per viewport. If two are visible, one is wrong.
- `sound`/`unsound` render only beside a real arrival grade, always with a word.
  They are plain custom properties on `:root` — outside `@theme` — so Tailwind
  generates no `bg-sound` utility and the constraint cannot be violated.
- Hairlines: iron at 15% opacity, 1px. The primary separator on the whole site.
- **No shadows anywhere.** Paper does not float.
- No gradients, no glassmorphism, no tinted overlays.
- Radius: 4px on surfaces, 999px on buttons. Nothing else.
- Grid: 1180px max, 32px gutters. Measure capped at 66ch.

## Type

- **Newsreader** (text optical size) — titles and all reading text.
- **IBM Plex Sans** — labels, credits, navigation, notices.
- **IBM Plex Mono** — lot numbers, dates, durations, prices, verified figures.
  Only verifiable values. Set in mono and uncheckable = wrong.
- Tabular figures on all mono.

Type scale is fluid via `clamp()`; formulas and computed breakpoint values are
in `DECISIONS.md`.

## The seven primitives

`src/components/primitives/`. Every page is assembled from these and **no page
may invent an eighth.**

| Primitive | File | Purpose |
|---|---|---|
| `Mark` | `Mark.tsx` | The bpulse chevron, hand-authored SVG |
| `Masthead` | `Masthead.tsx` | Publication masthead, iron bar, rule beneath |
| `Lot` | `Lot.tsx` | The primary content object — a catalogue lot |
| `DataLine` | `DataLine.tsx` | Mono key-value row with hairline leader |
| `Grade` | `Grade.tsx` | Word + 8px dot. Never colour alone |
| `Credit` | `Credit.tsx` | Specialist: name, capability, optional portrait |
| `Notice` | `Notice.tsx` | Question + visible answer. No accordion |

## Motion — the complete inventory

1. **Mark strike** — 320ms, scale 1.04→1.00, `cubic-bezier(.69,0,0,1)`, once.
2. **Rules draw on** as a Lot enters viewport — 400ms, left to right, 60ms stagger.
3. **Hover on a Lot** — border colour + one-step value shift, 200ms.
4. **Hover on a button** — value shift only.

Forbidden: fade-up on every section, parallax, animated gradients, typing,
counters, carousels, marquees, anything that loops, anything that moves unbidden.

`prefers-reduced-motion: reduce` **disables** all four — per behaviour, not a
global freeze. It keeps colour, border, and focus transitions.

## SEO

- `src/lib/seo.ts` — `buildMetadata()` used by every page; root layout sets
  defaults from `src/config/brand.ts`.
- `sitemap.ts` — real and dynamic. Excludes `/report/*` and `/design`.
- `robots.ts` — `Disallow: /report/`.
- `JsonLd.tsx` — typed factories: `Organization`, `WebSite` wired in layout;
  `Service`, `Person`, `FAQPage`, `BreadcrumbList` ready.
- `opengraph-image.tsx` — programmatic, typographic, rag ground with the Mark.
- One `h1` per page, semantic landmarks, real `<article>` for lots.
- `lang` set, correct `metadataBase`, canonical on every page.

## Security

`/report/[slug]` is private: noindex, nofollow, excluded from sitemap,
`Disallow` in robots, unguessable slugs, and **no `/report` index route may
ever exist**. See `SECURITY.md`.

## Docs

- `STUDY.md` — reference-site measurements (ivee.jobs, bpulse.dev).
- `DECISIONS.md` — contrast table, clamp formulas, trade-offs, structured-data status.
- `SECURITY.md` — the `/report` constraint.
