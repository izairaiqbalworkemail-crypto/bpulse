# bpulse — brand assets

Every file here is generated from one vector source: `scripts/build-keystone.mjs`. The mark is two SVG paths. No raster original, no glow, no gradient overlay.

---

## The mark

**The keystone.** A paper ring that does not quite close. A flat gold wedge locked into the gap.

Clients arrive with something that looks finished and will not hold. The studio is the piece that makes the structure stand.

**Colours**

| Role | Hex |
|---|---|
| Ground | `#0C100E` night desk. Never a gradient. |
| Ring on void | `#E6EBE3` page |
| Ring on page | `#121612` carbon |
| Keystone | `#D6FF2A` tape. The last 20%. The wedge only. |

---

## What to use where

| Use | File |
|---|---|
| App icon, PWA, Apple touch | `icon/bpulse-icon.svg` + `icon/bpulse-icon-{1024,512,256,180,128,64}.png` |
| Favicon | `favicon/bpulse-favicon.svg` + `favicon/favicon-{48,32,16}.png` |
| LinkedIn / X / GitHub avatar | `social/bpulse-avatar-400.png` or the icon SVG |
| Link preview card | `social/bpulse-og.svg` |
| On the site, dark sections | `mark/bpulse-mark-dark.svg` |
| On the site, paper sections | `mark/bpulse-mark-light.svg` |
| One colour — print, emboss, stamp | `mark/bpulse-mark-mono.svg` |
| Email signature, docs, decks | `lockup/bpulse-lockup-{dark,light}.svg` |

**Always prefer the SVG** on the web. The PNGs exist for platforms that demand them.

---

## Rules

**Clear space: 25% of the mark's height** on all four sides.

**The mono file uses `currentColor`**, so it inherits text colour.

**Never** add a glow, a drop shadow, an outline, or a gradient overlay. Never rotate it, never stretch it, never recolour the wedge to anything but gold.

---

## Regenerating

```
node scripts/build-keystone.mjs
```

That rebuilds the kit and writes `src/lib/brand/keystone.ts`, which `Mark.tsx` reads.
