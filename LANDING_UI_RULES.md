# Landing UI Rules

These rules keep episodes different in concept but consistent in craft.

## Spacing Scale

- Section vertical rhythm: `py-20 md:py-28` (80px / 112px)
- Intro block to primary object: `mt-12`
- Object to section footer/CTA: `mt-8`
- Card padding: `p-6 md:p-8` (or equivalent split paddings)
- Tight content rows: `py-3` to `py-4`

## Geometry

- Primary panel radius: `rounded-[24px]`
- Secondary inset cards: `rounded-[14px]` to `rounded-[16px]`
- Border language: `border-ink/10` on paper, `border-paper/10` on ink

## Type Hierarchy

- Kicker: `font-plex-mono text-[11px] uppercase tracking-[0.14em]`
- Episode heading: `font-newsreader text-[clamp(2rem,4vw,3.5rem)]`
- Body copy: `font-plex-sans text-[16px] leading-[1.55]`
- Meta/status labels: `font-plex-mono text-[10px..12px] uppercase`

## Motion

- Section intros: `Reveal` + `Rise`
- Lists/grids: `Stagger` + `Item` for first-enter choreography
- Hover motion: max `y: -2px` equivalent, no heavy transforms
- Respect reduced motion by relying on existing `Reveal` utilities

## Tone

- Accent colors only for meaning (stuck/diag/build/ship)
- Avoid decorative color blocks with no semantic role
- Keep one clear object per section
- Use clear borders, whitespace, and typography before effects
