# STUDY.md — Reference Site Measurements

All values extracted from live CSS in the HTTrack mirror of ivee.jobs (Framer site, published 1 Sep 2026). CSS is embedded inline on line 217 of `ivee.jobs/index.html`, ~208KB minified. Values are verified against the source, not inferred.

---

## ivee.jobs — Verified Measurements

### Container

| Property | Desktop (≥1200px) | Tablet (810–1199px) | Mobile (<810px) |
|---|---|---|---|
| Root width | 1200px | 680px | 390px |
| Root padding | 0 | 32px 32px 0 | 20px 20px 0 |

Source: `.framer-7DKoa.framer-72rtr7 { width: 1200px }`, `.framer-v-1ls8jow { width: 680px; padding: 32px 32px 0 }`, `.framer-v-1orulb4 { width: 390px; padding: 20px 20px 0 }`

### Section Padding

| Section | Desktop | Tablet | Mobile |
|---|---|---|---|
| Hero (first section) | 160px 40px 120px | 160px 32px 100px | — |
| Standard sections | 120px 40px | — | — |

Source: `.framer-10elhk0 { padding: 160px 40px 120px }`, `.framer-10elhk0` responsive override `{ padding: 160px 32px 100px }`, `.framer-zklugx { padding: 120px 40px }`, `.framer-sg3dt2 { padding: 120px 40px }`

### Internal Gap

80px between blocks inside a section. Used consistently across nav variant, hero, and all standard sections.

Source: `.framer-a9cfi0 { gap: 80px }`, `.framer-10elhk0 { gap: 80px }`, `.framer-2bx71e { gap: 80px }`

### Border Radius

| Element | Value | Source |
|---|---|---|
| Cards / surfaces | 32px (with superellipse corner-shape fallback 0.843) | `.framer-5fwddv { border-radius: calc(32px * ...) }` |
| Buttons / nav pill | 100px (with superellipse corner-shape fallback 0.566) | `.framer-q4zife { border-radius: calc(100px * ...) }` |

**Note:** The user suggested 16px for cards. The actual CSS shows 32px base radius on all card-like surfaces. The 100px radius is used on both the floating nav pill and CTA buttons.

### Grid

The only `display: grid` on the page — case studies section:

| Breakpoint | Columns | Gap |
|---|---|---|
| Desktop (≥1200px) | 3 columns | 20px |
| Tablet (810–1199px) | 2 columns | 20px |
| Mobile (<810px) | 1 column | — |

Source: `.framer-3k9qs6 { grid-template-columns: repeat(3, minmax(50px, 1fr)); gap: 20px }` → tablet override `repeat(2, ...)` → mobile override `repeat(1, ...)`

Internal card padding: 32px. Source: `.framer-5fwddv { padding: 32px }`

### Box Shadow — ivee's Multi-Layer Stack

ivee uses a **9-layer brand-tinted shadow stack** on cards and buttons. Not black — tinted with their brand dark `#012422` / `#001413`. The outer layers fade to zero opacity.

```
box-shadow:
  0 2px 6px -4px #0124220d,
  0 2.51941px 1.2597px -0.625px #00141303,
  0 5.97144px 2.98572px -1.25px #00141303,
  0 10.8925px 5.44626px -1.875px #00141303,
  0 18.1088px 9.0544px -2.5px #00141303,
  0 29.2442px 14.6221px -3.125px #00141303,
  0 47.8699px 23.935px -3.75px #00141303,
  0 82.4287px 41.2144px -4.375px #00141300,
  0 150px 75px -5px #00141300
```

Applied to both `.framer-5fwddv` (dark card) and `.framer-q4zife` (button). The last two layers have `00` alpha — they exist in the CSS but render invisible.

**We do not use this.** Paper does not float. Shadows are the wrong separation mechanism for our catalogue metaphor.

### Typography (from Framer CSS custom properties)

| Role | Desktop | Tablet | Mobile |
|---|---|---|---|
| Body text | 16px, Poppins 400 | 16px, Poppins 400 | 14px, Poppins 400 |
| Line height (body) | 1.4em | 1.4em | 1.5em |
| Paragraph spacing | 20px | 20px | 20px |

### Animation (from Framer appear JSON)

| Property | Value |
|---|---|
| Type | Spring |
| Duration | 1000ms |
| Bounce | 0.1 |
| Initial | opacity: 0.001, y: 20 |
| Animate | opacity: 1, y: 0 |
| Stagger | 100ms increments (0.1s, 0.2s, 0.3s delays) |

### Colours

| Token | Hex | Usage |
|---|---|---|
| Background | `#fefffc` / `#F0F2ED` | Page ground |
| Primary text | `#1b2a5b` | Headings, body, all text |
| Lime accent | `#e9ff70` | Single accent fill |
| Semi-transparent white | `#ffffffbf` | Nav backdrop |
| Border faint | `#ffffff1a` | Hairlines |
| Border medium | `#ffffff26` | Active borders |

---

## bpulse.dev — Current Site Observations

### Good Copy Worth Preserving

- "Most products die at 80%" — sharp, ownable position line
- "We finish what starts" — clean brand soul
- "Bill outcomes, not hours" — strong service promise
- "Stays until it's live" — production commitment
- Specific tech callouts: "Role-based access control under HIPAA constraints" — verifiable detail beats invented stats

### Patterns to NOT Repeat

- Dark navy theme (`#0a0e1a`) — feels like every SaaS dashboard
- Sora + Manrope fonts — generic tech combo
- `motion` library (Framer Motion successor) — heavy, we use CSS only
- `embla-carousel-react` — no carousels in the new design
- `recharts`, `lenis`, `posthog-js` — none of these
- `lucide-react` icons — we write SVG primitives
- Count-up animations, copium teasers, agent fabs
- Invented deploy IDs, fake scarcity, untraceable statistics

---

## deepidc.com

Attempted multiple fetches at build time (Sep 2026); the domain returned a transport error and never delivered HTML or CSS, so no measurements could be extracted. Attempted again via the desktop browser; likewise unreachable.

Fallback: the DeepIDV brand is represented in the local asset library (`public/logos/deepidv.svg`, `public/project-shots/project-deepidv.png`). The real client is catalogued as a lot (`LOT 031` in the home preview) based on the COMPANY_BRIEF portfolio description: a verification engine and agentic compliance suite. When deepidc.com becomes reachable, its structures can be measured and this section completed.

**Do not treat this as a measured reference.** No numbers from deepidc.com appear anywhere in this design.

---

## Key Takeaways for bpulse2

1. **ivee shadows exist but we don't use them.** Paper doesn't float.
2. **ivee's 32px card radius is via superellipse, not simple border-radius.** We use 4px — catalogue, not consumer app.
3. **80px internal section gap is the real rhythm driver**, not padding alone.
4. **Their 1200px container matches our 1180px grid.** Close enough to confirm the convention; we keep 1180px for the slight extra breathing room.
5. **Their nav pill at 100px radius is wrong for us.** We need a publication masthead, not a floating widget.
