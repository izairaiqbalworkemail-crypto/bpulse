# Visual research

Written 9 September 2026. No `src/` was changed.

This file is the first stop the brief asked for. Three rendered directions come after you have read it. Nothing here is a palette to implement.

---

## Method

I did not invent hex values. Each colour below is either:

- **Token:** published in a brand book, Geist docs, official DESIGN.md extract, or a first-party rebrand post.
- **Live:** read from a homepage fetch in this session (copy, structure, declared typefaces).
- **Impression:** occupancy, motion, or hero composition I could not pixel-count from a 1440 viewport in this pass. Marked as such.

I did not run a colour-sampler over live 1440 and 375 screenshots for every site. Where occupancy is given as a percentage, it is an impression from published analyses and homepage structure, not a histogram.

Contrast notes use WCAG 2.x relative luminance on the named pair. I computed the pairs I claim. I did not audit every text colour on every site.

Sites I could not get a first-party token sheet for are marked incomplete rather than guessed.

---

## What I looked at

### Linear · linear.app

| Item | Record | Kind |
|---|---|---|
| Ground | Dark. Canvas `#010102`. Surfaces `#0f1011` `#141516` `#18191a` `#191a1b`. | Token |
| Ink | `#f7f8f8` body-bright, `#d0d6e0` muted, `#8a8f98` subtle, `#62666d` tertiary. | Token |
| Accent | Lavender `#5e6ad2`. Hover `#828fff`. Used on mark, CTA, focus. Not as a section fill. | Token |
| Occupancy | Near-black ~85 to 90 percent of marketing canvas. Accent under 5 percent. | Impression |
| Type | Linear Display / Linear Text / Linear Mono. Public substitute Inter Variable at non-standard weights 510 / 590. Display 48 to 80px, tracking about -0.02em. Body often 15px / 1.6. | Token |
| Why dark | Product is a dark-native issue tracker. Marketing matches the tool so the screenshot is the brand. | Impression |
| Hero visual | Product UI in a dark frame. Not a metaphor. | Impression |
| Colours above fold | Black, off-white type, one lavender CTA. Sometimes a status green `#27a644` in chrome. | Token + impression |
| Motion | Subtle. Hover lift, page-load fade. No scroll theatre as the identity. | Impression |

Selling: craft and speed of software. Trust comes from showing the actual product, not from warmth.

---

### Vercel · vercel.com

| Item | Record | Kind |
|---|---|---|
| Ground | Light marketing default. Background `#ffffff`, surface `#fafafa`. Dark bands exist as polarity flips. | Token (Geist extracts) |
| Ink | `#171717` primary text and CTA. `#4d4d4d` body. `#666666` / `#8f8f8f` muted. | Token |
| Accent | Official mark is black `#000000` and white `#ffffff`. Link blue `#0070f3` is functional, not a brand fill. Hero may use a confined mesh (blue `#0070f3`, purple `#7928ca`, pink `#ff0080`, teal `#50e3c2`). | Token |
| Occupancy | White plus ink dominate. Mesh is a hero object, not a page colour. | Impression |
| Type | Geist Sans and Geist Mono. Display often Geist Mono 48px / 400 to 600, tracking about -0.02em. Body Geist Sans 14 to 16px / 400. Headings stop at 600. | Token |
| Why light | Deploy platform sold as a blank sheet. Dark is the product terminal, not the brochure. | Impression |
| Hero visual | Type plus a restrained graphic or mesh. Product grid below. | Impression |
| Colours above fold | Two: ink and paper. Mesh if present is decoration, not a third text colour. | Impression |
| Motion | Grid, hover, occasional shader. Identity is still type and the triangle. | Impression |

Selling: infrastructure you do not have to think about. Trust is monochrome and named type.

---

### Stripe · stripe.com

| Item | Record | Kind |
|---|---|---|
| Ground | Light. `#ffffff` canvas, `#f8fafd` cool surface, `#e5edf5` border. Dark bands `#0d1738` / `#061b31` for later sections. | Token |
| Ink | `#061b31` or `#0d253d` navy. Mute `#64748d`. | Token |
| Accent | Indigo `#533afd` (also cited historically as `#635bff`). Hover `#2e2b8c`. Soft fill `#e8e9ff`. Gradient stops include orange `#ff6118`. | Token |
| Occupancy | White / cool grey ~70 percent. Navy type. Indigo under 10 percent. Gradient is a Stripe signature object, not a fill for the whole page. | Impression |
| Type | Söhne variable (`sohne-var`), Klim. Display 48 to 56px at weight 300, line-height ~1.03, tracking about -0.02em. Body 16px / 400. One family. No marketing serif. | Token |
| Why light | Money and compliance read as paper and forms. Dark is a later chapter, not the door. | Impression |
| Hero visual | Headline plus product illustration or gradient field. Checkout and dashboard fragments appear as proof, not as the only object. | Impression |
| Colours above fold | White, navy, indigo. Sometimes a green accent in the headline treatment. | Token + impression |
| Motion | WebGL / CSS gradient drift historically. Current site is quieter than the 2020 peak. | Impression |

Selling: you can take payments without looking reckless. Trust is navy, light paper, one loud indigo button.

Note: Stripe's gradient became the default look of 2020 to 2024 fintech. Copying it in 2026 reads as dated, not current.

---

### Raycast · raycast.com

| Item | Record | Kind |
|---|---|---|
| Ground | Dark only. `#07080a`, then `#0d0d0d` `#101111` `#121212`. | Token extract |
| Accent | Red stripe gradient `#ff5757` to `#a1131a` used once at the top of a hero band. | Token extract |
| Type | Inter with `ss03` (single-story g) site-wide. Display up to 64px / 600. | Token extract |
| Hero visual | Command palette mock. The product is the picture. | Impression |
| Occupancy | Black ~90 percent. Red is a stripe, not a theme. | Impression |
| Motion | Palette keystroke theatre. Triggered by the mock, not by scroll pinning. | Impression |

Selling: speed of invoking software. Not a trust sale.

---

### Mercury · mercury.com

| Item | Record | Kind |
|---|---|---|
| Ground | Marketing is dark indigo-black `#171721`. Product UI has a light track `#fbfcfd`. | Token extract |
| Accent | Electric indigo `#5266eb`. Also recorded: `#161c28` `#2a3645` `#c6a69a`. | Token extract + third-party screenshot notes |
| Type | Arcadia / `arcadiaDisplay`. Display ~24 to 65px at weight ~480, with *positive* tracking ~0.42px. Body ~16px / 420. | Token extract |
| Why dark | Differentiates from Stripe / Wise / Brex light banking sites. | Token extract (stated reason) |
| Hero visual | Banking product cards and type. Not a lifestyle photo. | Impression |
| Colours above fold | Dark ground, light type, one indigo CTA. | Impression |
| Motion | Product-card hover. Not the identity. | Impression |

Selling: a bank that looks like software. Trust is mixed: dark reads premium to a 28 year old and slightly costume to a 50 year old treasurer. Impression.

---

### Anthropic · anthropic.com

| Item | Record | Kind |
|---|---|---|
| Ground | Warm ivory `#faf9f5` canvas. Cards `#f0eee6`. Dark band `#141413`. | Token |
| Ink | `#141413` headlines. `#3d3d3a` body. `#5e5d59` / `#87867f` muted. Hairline `#d1cfc5`. | Token |
| Accent | Clay `#d97757` used rarely. Homepage often has no chromatic CTA. Research pages add muted clay, fig, cactus, sky. | Token |
| Occupancy | Ivory plus ink ~90 percent. Clay under 3 percent on the marketing home. | Impression |
| Type | Anthropic Serif (display and, unusually, body). Anthropic Sans (UI, some display). Anthropic Mono. Serif display reported around 68px. Sans display around 61px / 700. | Token + live CSS reports |
| Live homepage | Editorial index of model releases. Dates and categories. "At Anthropic, we build AI to serve humanity's long-term well-being." No product screenshot in the first screen's job. | Live fetch, 9 Sep 2026 |
| Why light | Reads as a research publication, not a launch trailer. | Impression |
| Hero visual | Type. Dates. No portal, no demo reel. | Live |
| Colours above fold | Two: ivory and slate. | Live + token |
| Motion | Almost none as brand. Page is a newspaper. | Impression |
| Contrast | `#141413` on `#faf9f5` is well above 12:1. AA and AAA for body. Computed. | Computed |

Selling: restraint and safety. The closest analogue to "you can check what we claim."

---

### PostHog · posthog.com

| Item | Record | Kind |
|---|---|---|
| Ground | Cream `#eeefe9` edge to edge. Cards white `#ffffff` or `#fcfcfa`. Dark only inside code `#23251d`. | Token extract |
| Ink | Headlines `#23251d`. Body `#4d4f46`. Mute `#6c6e63`. | Token extract |
| Accent | Yellow-orange `#f7a501` CTA only. Pressed `#dd9000` / `#dd9001`. | Token extract |
| Type | IBM Plex Sans Variable 400 to 800. One family. Code: Source Code Pro / ui-monospace. Display around 36px. Hierarchy is weight more than size. | Token extract |
| Hero visual | Product plus hedgehog drawings. Decoration is illustration, not gradient. | Impression |
| Occupancy | Cream ~80 percent. Yellow is buttons only. | Impression |
| Motion | Light. Personality is the drawing, not motion. | Impression |
| Contrast | `#23251d` on `#eeefe9` is above 12:1. `#f7a501` as text on cream fails AA. They put dark ink on the yellow pill. Correct. Computed on the pairs named. | Computed |

Selling: a serious analytics tool that refuses to look like a bank. Works for a 26 year old. A 50 year old CTO may read the mascot as unserious. Impression.

---

### Notion · notion.com

| Item | Record | Kind |
|---|---|---|
| Ground | Light. Near-white marketing. Product is white canvas. | Impression |
| Type | Notion's custom sans derived from a grotesque. Marketing has used large friendly display. | Impression |
| Hero visual | Product UI and templates. People in product, not stock office photos as the main object. | Impression |
| Colours above fold | Mostly two. Occasional category colour in tiles. | Impression |
| Motion | Template carousels, light hover. | Impression |

Incomplete. No first-party token sheet captured in this pass.

---

### Retool · retool.com

| Item | Record | Kind |
|---|---|---|
| Ground | Historically light with a strong yellow/black industrial mark. | Impression |
| Hero visual | Internal-tool UI. The product. | Impression |

Incomplete. No reliable 2026 token sheet in this pass.

---

### Resend · resend.com

| Item | Record | Kind |
|---|---|---|
| Ground | Dark first. Black `#000000`, white `#fdfdfd`, plus Eggshell, Iron, Stone, Zinc from the rebrand. | First-party rebrand post |
| Type | Domaine (serif headlines). Favorit (subheads). Inter (body). CommitMono (code). | First-party |
| Hero visual | Physical objects and 3D material studies. They say this out loud: a Rubik's cube, then metal and paper. | First-party |
| Why dark | Developer tool that wants to feel like an object, not a doc. | First-party |
| Motion | Material and gradient. Brand post is explicit about texture. | First-party |

Selling: email infrastructure with taste. Trust is physicality. Risk: 3D objects are now a crowded developer-tool look.

---

### Clerk · clerk.com

| Item | Record | Kind |
|---|---|---|
| Ground | Light marketing, product screens in the hero. | Impression |
| Hero visual | Auth UI components. The thing you embed. | Impression |

Incomplete. No token sheet captured.

---

### Cursor · cursor.com

| Item | Record | Kind |
|---|---|---|
| Ground | Dark marketing in recent versions. | Impression |
| Type | Tight sans. | Impression |
| Hero visual | The editor. Often a film of the product working. | Impression |
| Motion | Product demo is the motion. | Impression |

Incomplete as tokens. Complete as a pattern: the hero is the work happening.

---

### Framer · framer.com

| Item | Record | Kind |
|---|---|---|
| Ground | Dark `#090909`. Surfaces `#141414` to `#1c1c1c`. | Token extract |
| Accent | Sky `#0099ff` for links and focus, not button fills. White pill CTAs. | Token extract |
| Type | GT Walsheim Medium display (110px hero reported, tracking -5.5px). Inter Variable for body with several character variants. | Token extract |
| Hero visual | Sites made in Framer, plus huge type. | Impression |
| Occupancy | Black ~85 percent. Blue is a spark. | Impression |

Selling: you can ship a site that looks like this. Not a trust sale.

---

### Arc · arc.net / The Browser Company

| Item | Record | Kind |
|---|---|---|
| Ground | Light editorial with twilight gradients as atmosphere. | Impression (brand writeups) |
| Type | Inter Display 500/700 headlines. Inter 400/500 body. | Brand analysis |
| Hero visual | The browser chrome as a feeling. Soft blur. | Impression |
| Colours | A few sunset hues plus neutrals. | Impression |

Selling: taste. Already dated as a 2023 to 2024 mood. Impression.

---

### Supabase · supabase.com

| Item | Record | Kind |
|---|---|---|
| Ground | White `#ffffff`. | Token extract |
| Ink | `#171717` / `#1c1c1c`. | Token extract |
| Accent | Emerald `#3ecf8e`. | Token extract |
| Type | Circular (Lineto) 500 display, 400 body. Display 64 / 48 / 36 with negative tracking. Buttons radius 6px, not pills. | Token extract |
| Hero visual | Dashboard and SQL. Green is the action, not the page. | Impression |

Selling: Postgres without ceremony. Trust is a white sheet and a screenshot of the console.

---

### Toptal · toptal.com

| Item | Record | Kind |
|---|---|---|
| Ground | Light marketing. Dark navy also in brand. | Token + live |
| Accent | Toptal Blue `#204ecf`. Toptal Dark `#1a1a2e`. | Token (colour directory citing official) |
| Live homepage | "Hire the Top 3% of Freelance Talent." Hero is a rotating card of named people, roles, previous companies. CTA path starts with a conversation, not a price. | Live fetch, 9 Sep 2026 |
| Type | Corporate grotesque. Not distinctive. | Impression |
| Hero visual | A person. Always a person. That is the product. | Live |
| Proof style | 4.9 / 5 from 42,598 reviews. 35,000+ clients. 140+ countries. Newsweek rank. | Live (their claims, not ours) |
| Motion | Card rotation, video wall. | Live structure |
| What they hide | Price. You talk first. | Live |

Direct competitor. Sells a vetted individual. Visual language: blue, headshots, logos, big numbers. This is the crowded marketplace look. bpulse must not look like this.

---

### Turing · turing.com

| Item | Record | Kind |
|---|---|---|
| Ground | Light, technical, "Turing Blue" as a brand story. | Agency case (DPGW) |
| Live | Talent network and AI research. Path is partner / hire, not a published ladder. | Live-adjacent |
| Hero visual | Light, capability, people at scale. | Impression |

Incomplete as hex. Complete as a pattern: same category as Toptal. Person, not finished work. Quote after a call.

Do not confuse with Turing College (`#673aff` / `#303236`), which is a different organisation.

---

### Andela · andela.com

| Item | Record | Kind |
|---|---|---|
| Ground | Light with Green Black `#132128`, Kale `#173b3f`, Grey `#e6e6e6`, Opal `#b0d6ce`, White `#ffffff`. | Brand book |
| Accent | Emerald `#56c870` for CTAs and highlights only. | Brand book |
| Type | Inria Serif headlines. Inter body. | Brand book |
| Hero visual | People and capability. African engineering brand with a sage register. | Impression |

Sells teams of people. Serif plus green is closer to a studio than Toptal blue, but still a staffing site.

---

### Clay · clay.global (studio)

Incomplete. No first-party token sheet in this pass. Known in the category for heavy art-direction and case-led heroes. Impression: they sell taste and inventiveness, which is the opposite of "finishing."

---

### Eleken · eleken.co

Incomplete. Product-design studio. Marketing is usually light, case-study led, UI shots. Impression: "idea to launch" studio template.

---

### Orbix

Incomplete. Could not lock a single canonical marketing site and token sheet in this pass without guessing.

---

### thoughtbot · thoughtbot.com

| Item | Record | Kind |
|---|---|---|
| Type | Cosmica for titles (Medium) and headings (Semibold). PP Mori Regular for body. JetBrains Mono Regular for code, Bold for buttons and tags. | Live, thoughtbot Playbook |
| Ground | Playbook and marketing read as light, calm, consultant-white. | Impression |
| Hero visual | Process and people, not a product login. CTA is "talk to a product expert." | Live |
| What they hide | A fixed public price ladder on the door. | Impression |

Closest studio in craft. Sells a way of working. Still "idea to launch," still a call.

---

## Answers the brief asked for

### 1. Which sites sell trust rather than speed, and what do they share?

Trust sites in this set: **Anthropic**, **Stripe**, **Mercury** (mixed), **thoughtbot**, **Andela**, **Vercel** (infrastructure trust).

They share:

- Few colours above the fold. Usually two neutrals plus one action colour.
- Type that can be read at 16px without decoration.
- A light or paper ground when the claim is legal, money, or safety. Dark when the claim is "this is the tool."
- Proof that is a document, a date, a dashboard, or a named policy. Not a glow.
- Motion that does not carry the meaning. If you turn it off, the page still works.

Linear and Cursor are trusted by developers, but they sell velocity. Their dark product-hero is honest for a tool. It is the wrong borrow for a studio whose product is a written record.

Toptal sells trust-as-volume: 3 percent, 42,598 reviews, 48 hours. That is a different trust. It needs a call. It hides the price. It is the competitor pattern to refuse.

### 2. Where is the crowded aesthetic, and what does that make cheap?

Crowded in 2026, from this set:

- Near-black canvas `#0a0a0a` / `#010102` plus Inter plus a violet or indigo CTA (Linear, Raycast, Framer, a dozen AI wrappers).
- Stripe-descended mesh gradients on a white hero.
- Glass, bloom, particle cursors, pinned horizontal galleries.
- Marketplace headshot carousels (Toptal).
- Warm dark plus gold (the current bpulse theme, and a hundred "premium agency" templates).

Those now signal "we used the same three references." They do not signal that a price is published or that a login exists.

Gold on cocoa is especially cheap for this buyer. It is the colour of a tasting menu and a crypto deck. It does not look like a ledger.

### 3. What do current-feeling 2026 sites do that dated ones do not?

Current in this set:

- **Paper, not theatre.** Anthropic ivory. PostHog cream. Vercel white. The page is a surface you read.
- **One action colour, never a section fill.** PostHog yellow. Linear lavender. Supabase emerald. The rest is ink.
- **The product is the picture, or there is no picture.** Cursor, Linear, Clerk, Supabase show the thing. Anthropic shows type and a date. Both are honest. A fake browser of someone else's marketing site is not.
- **Display type is either a real serif with a job (Anthropic, Resend, Andela, thoughtbot) or a single grotesque at a strange weight (Linear 510, Stripe 300, Mercury 420).** Dated sites shout at 800 on Inter.
- **Motion is optional.** Dated sites pin, stack, and explode. Current sites can be still.

Dated:

- Full-page dark with a gold pill and a decorative right column.
- Headshot as the product when you are not selling the headshot.
- Gradient as personality.

### 4. Which work for a 26 year old founder and a 50 year old CTO?

Both ages, from this set:

- **Stripe.** Light, navy, one button. A 26 year old reads it as modern. A 50 year old reads it as a bank.
- **Vercel.** Black and white. No slang in the chrome.
- **Anthropic.** Looks like a journal. Neither age is talked down to.
- **thoughtbot.** Consultant-plain. Slightly boring. That is a feature for the CTO.

One age more than the other:

- **PostHog** and **Arc** skew young (mascot, twilight).
- **Mercury dark** and **Framer** / **Linear** skew young-technical.
- **Toptal** skews procurement and HR. The founder on a phone at night has seen this page a hundred times.

bpulse's buyer is both people in ninety seconds on a phone. The overlap is: light or paper ground, large readable type, one obvious ask, a real object (login or document), no costume dark.

### 5. For a studio whose product is a written record and a login, what visual language is honest?

Honest means the page looks like the thing you get.

You get:

- A written Read in one business day.
- Published prices. Free, `$400`, `$1,500`, `$7,500`, `$18,000` to `$95,000`. Same for everyone.
- A portal where scope, progress, and revocation are visible.
- Named people, not a bench of silhouettes.

So the page should look like:

- **Paper.** A document has a ground. Ivory or cream or white. Not a nightclub.
- **A serif that is for reading, or a grotesque that stays at 400 to 600.** The Read is a letter. The page can admit that.
- **The portal as the only large picture**, framed as a window you can open, not as a 3D toy and not as a client's marketing site.
- **Numbers in mono.** Prices and days are evidence. They should look like evidence.
- **One action colour on the Read.** Not on the page.
- **Dark only as a room you enter to look at the login.** Like PostHog's code island, or Anthropic's slate band. Not the default sky.

What is not honest:

- Gold atmosphere (implies luxury hospitality).
- A headshot carousel (implies Toptal).
- Abstract blobs (implies we do not have the work).
- A grim full-bleed dark plate (implies the product is a mood).

---

## Contrast I actually computed

| Pair | Approx ratio | AA body (4.5:1) |
|---|---|---|
| `#141413` on `#faf9f5` (Anthropic) | ~16:1 | Pass |
| `#23251d` on `#eeefe9` (PostHog) | ~13:1 | Pass |
| `#171717` on `#ffffff` (Vercel) | ~16:1 | Pass |
| `#061b31` on `#ffffff` (Stripe navy) | ~16:1 | Pass |
| `#f7f8f8` on `#010102` (Linear) | ~19:1 | Pass |
| `#f7a501` on `#eeefe9` (PostHog yellow as text) | ~2.1:1 | Fail. They do not use it as text. |
| `#f0bb35` on `#15130f` (current bpulse gold on ink) | ~8.5:1 for large type, borderline for small bold | Large pass, small risky |
| `#8a8272` on `#15130f` (current bpulse label on ink) | ~5.2:1 | Pass for large, tight for small |
| `#c9c3b6` on `#15130f` (current bpulse body on ink) | ~9.5:1 | Pass |
| `#4a453b` on `#f3ece3` (current bpulse body on cream) | ~7.4:1 | Pass |

The current cream/ink pair is not failing accessibility. It is failing meaning. It looks like a third revision of "premium dark plus gold," which the brief already named as grim.

---

## Occupancy, said plainly

I did not measure pixel histograms. The structural fact is enough:

Trust sites give **most of the page to one ground and one ink**. Chroma is a button or a single band. Speed sites give **most of the page to black** and a product video.

bpulse has been giving most of the first window to graphite and gold. That is a speed-site costume on a trust product.

---

## What I believe is right (not yet a direction)

This is a conclusion from the research, not a build.

1. **Start light.** Paper or ivory. Dark is a room for the portal, not the default.
2. **Kill gold as atmosphere.** If a yellow exists, it is a PostHog-style action chip on the Read, or it does not exist.
3. **The hero visual is the portal or it is type.** Those are the only honest objects. A person on the right makes you Toptal. A client's marketing screenshot is a lie. A B watermark is decoration.
4. **Type should look like a record.** A readable serif for the claim, or one grotesque at a human weight. Mono for prices and days. Not three display faces.
5. **Motion is not the system.** If we animate later, it is the portal updating, not the chrome.

If a constraint in the brief is in the way: the demand for a right-hand hero visual is the constraint I would argue. The sites that sell trust often have no right-hand visual. Anthropic does not. Stripe sometimes does not. The failed portal-card / report-stack / browser-window sequence is evidence that forcing a right column is the leak, not the lack of a cleverer object.

The portal can be **section 03, tall**, which the brief already allows. The first window can be type, the price of the Read (free), and one button. That is a decision I will put in at least one of the three directions.

---

## Gaps I will not paper over

- No live 1440 sampler on Linear, Framer, Mercury, Cursor, Clay, Eleken, Orbix.
- Notion, Retool, Clerk, Cursor, Clay, Eleken, Orbix are incomplete as hex.
- Occupancy percentages are impressions.
- Motion triggers are impressions except where a homepage structure made them obvious (Toptal card rotate, product-demo sites).

If you want the next pass to be measurements not extracts, the work is a 1440 and 375 capture set and a colour histogram per above-the-fold.

---

## Stop

This is the research. I have not written HTML directions. I have not touched `src/`.

When you say go, I will build three standalone HTML files that are actually different, using only copy and figures from `src/content`, and I will rank them.
