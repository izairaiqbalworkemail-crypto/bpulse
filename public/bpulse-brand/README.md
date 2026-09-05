# bpulse — brand assets

Every file here is generated from one vector source. The mark is hand-authored SVG paths — no raster, no gradients, no effects. It scales to a billboard and down to 16px.

---

## The mark

A geometric **B**, extruded down-right with a lit gold side face. Light reads as coming from the top-left, which is why the face is warm cream and the extrusion runs from gold at the front to deep bronze at the back.

It keeps the two-layer idea from your existing logo and fixes the three things that were dating it: the soft glow, the gradient fill, and the mismatched offset. What was a printing misregistration is now a solid object.

**Colours**

| Role | Hex |
|---|---|
| Ground | `#0D1218` |
| Face | `#F5F1E6` |
| Extrusion, near | `#F2C230` |
| Extrusion, far | `#7A5812` |
| Face on light grounds | `#0D1218` |

The cream is deliberately warm, not white. On a dark ground pure white reads clinical; `#F5F1E6` reads like paper.

---

## What to use where

| Use | File |
|---|---|
| App icon, PWA, Apple touch | `icon/bpulse-icon-{1024,512,256,180,128,64}.png` |
| Favicon | `favicon/favicon-{48,32,16}.png` + `bpulse-favicon.svg` |
| LinkedIn / X / GitHub avatar | `social/bpulse-avatar-400.png` |
| Link preview card | `social/bpulse-og-1200x630.png` |
| On the site, dark sections | `mark/bpulse-mark-dark.svg` |
| On the site, paper sections | `mark/bpulse-mark-light.svg` |
| One colour — print, emboss, stamp | `mark/bpulse-mark-mono.svg` |
| Email signature, docs, decks | `lockup/bpulse-lockup-{dark,light}.png` |

**Always prefer the SVG** on the web. The PNGs exist for platforms that demand them.

---

## Rules

**The favicon is flat, not extruded.** Below 32px the extrusion turns to mud. That's why `favicon/` uses a solid cream B with no side face. Don't substitute the icon file.

**Minimum size for the extruded mark: 32px.** Below that, use the flat one.

**Clear space: 25% of the mark's height** on all four sides. Nothing enters it.

**The mono file uses `currentColor`**, so it inherits text colour. Drop it inline in React and it just works.

**Never** add a glow, a drop shadow, an outline, or a gradient overlay. The depth is already in the geometry. Never rotate it, never stretch it, never recolour the face to anything but cream or iron.

---

## The wordmark

The lockup SVGs reference **IBM Plex Sans SemiBold**, your brand font. They render correctly wherever Plex is installed or loaded as a webfont. The PNG exports here fell back to a system font because Plex wasn't available in the generation environment.

**Before you use the lockup anywhere final:** open the SVG in a tool with Plex installed, convert the text to outlines, and re-export. Then it's self-contained and renders identically everywhere.

Set at 200px with `-8` letter-spacing, weight 600, mark height 300, gap 76.

---

## Regenerating

`logo.py` in the working directory produces everything from the single `B` path constant. Change a colour or the extrusion depth and re-run to rebuild the whole set. Keep it — it's how the assets stay consistent if the brand shifts.

---

## What I'd still do

**Test the avatar as a circle.** LinkedIn crops personal avatars round; company pages keep the square. This is sized to survive both, but look at it on your actual profile before committing.

**Outline the wordmark** as above.

**Consider a motion version** for video and social — the extrusion depth animating from 0 to full over 400ms reads well and is trivial to build from the same paths.
