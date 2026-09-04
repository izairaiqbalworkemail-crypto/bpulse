# LAUNCH-AUDIT — 5 September 2026

Independent pass after `ops/layer` merged to `main`. Written as an adversary, then the fixes applied in the same session.

**I cannot see images.** Visual results are not verified here. They sit on the founder list in `LAUNCH.md`.

**I could not reach a preview deploy.** `https://bpulse.dev` returned `403 Forbidden` (plain text, no Vercel HTML). Vercel CLI could not list projects from this machine. Form, rate-limit, header, and Lighthouse checks against a live preview are **blocked on a working preview URL**. Structural findings below are from the code and a clean `pnpm lint` / `pnpm typecheck` / `pnpm build`.

---

## 1. Promises vs code

| # | Claim | Where | Enforced? | Verdict | Disposition |
|---|---|---|---|---|---|
| 1 | Check is **$1,500** | `brand.ts`, `/check`, legal | Copy + JSON-LD. No checkout | **Was false in the Check form** (`PulseCheckIntake` said **$1,800**) | **Fixed.** Form now reads `offer.check.price` |
| 2 | Reply **within one business day** | Contact, intakes, StickyContact, legal | POST saves + emails. No SLA clock | Contractual | **Kept.** Founder must honour it. PulseCheck “within a day” **aligned** |
| 3 | Check **credited in 30 days** | `/`, `/check`, offer | No ledger, no invoice | Contractual | **Qualified.** Copy now says credited **on a Close invoice, by hand, not by this site** |
| 4 | “Invoice only confirms the slot” | PulseCheck success | No invoicing exists | **Was untrue** | **Removed.** “This form does not take payment.” |
| 5 | Site sets **no cookies** | Privacy / cookie policy | No `setCookie`, no analytics scripts in `src/` | **Supported** (first-party JS) | Kept |
| 6 | “That is all. We do not collect anything else.” | Privacy §1 | **False** — IP used for rate limit; report views logged | **Was untrue** | **Fixed.** Privacy now names IP, Redis, report slug+time |
| 7 | “Not shared with third parties” | Privacy §3 | **False** — Postgres, Resend, Upstash | **Was untrue** | **Fixed.** Vendors named; not marketing lists |
| 8 | Submissions **deleted after 12 months** | Privacy §4 | **No job in `schema.ts`** | **Was untrue** | **Removed.** Manual delete on request until a schedule is real |
| 9 | Data **transferred to Pakistan** | Privacy §6 | Region unknown until Neon exists | Unsupported | **Fixed.** Region unpublished; ask the inbox |
| 10 | **Fixed scope in writing before code** | Offer, about, terms | No signing workflow | Contractual | Kept as how we work, not as software |
| 11 | **Access revoked at handover** | How-it-works, about, demo | Sample log only | Sample is honest | Kept. Live log ships with the first client portal |
| 12 | **“The portal exists”** | `/how-it-works` | Only `/demo` | **Was untrue** | **Fixed.** Sample now; live portal not built |
| 13 | **Every lot is a real engagement** | `/work` | Six lots `crew-asserted` | Overstated | **Fixed.** Page now says six lots are crew-reported, unverified |
| 14 | **9 builds / 12 hands** | Home stats | Hardcoded (matched content) | Drift risk | **Fixed.** `lots.length` / `specialists.length` / `offer.check.duration` |
| 15 | **Twelve specialists** | Careers | Hardcoded | Drift risk | **Fixed.** `specialists.length` |
| 16 | Edpulse **$0 / $4,900 / custom** | `/edpulse` | No payment | Price list | Kept. No checkout to lie about |
| 17 | Gates / never charged a fee | `/standard` | No HR system | Policy | Kept. Pass rate still unpublished |
| 18 | Close **$18k–$95k**, Standing **$2k–$6k/mo** | brand / legal | No billing | Price bands | Kept |
| 19 | Legal pages **in force** | Would be implied | Banner: **Draft · not yet in force** | Honest | Kept. Lawyer still required |
| 20 | WCAG AA / VoiceOver+NVDA tested | Accessibility page | Tokens computed; no formal audit | **Was overstated** | **Fixed.** Formal audit not claimed |
| 21 | “Aneeb reads every audit” | PulseCheck header | Email goes to `FOUNDER_EMAIL` | Partial | Left. Founder inbox is the channel |
| 22 | Careers roles **Open** | `/careers` | Now has a careers intake | Was a dead “Open” | **Fixed.** `CrewSession type="careers"` mounted |

Contractual claims (SLA, credit, scope lock, gates) are **not software**. They are true only if the founder does them. They are listed in `LAUNCH.md` as ops, not as green ticks.

---

## 2. Every figure

| Figure | Source | Attribution | Tag on page? |
|---|---|---|---|
| 9 lots | `lots.ts` via `lots.length` | count of catalogue | n/a |
| 12 specialists | `specialists.ts` via `.length` | count of roster | n/a |
| Check $1,500 / 5 business days | `brand.offers` → `offer.ts` | price list | n/a |
| Close / Standing ranges | `brand.offers` | price list | n/a |
| Sully 450+ orgs, 5M+ | `lots.ts` dataLines | `client-listing` · sully.ai | FieldLog + lot page from content |
| DeepIDV 211+, sub-150ms | `lots.ts` dataLines | `client-listing` · deepidv.com | Same. Site resolved 5 Sep 2026 |
| myUsta iOS+Android | `lots.ts` dataLines | `client-listing` · app.myusta.al | Same |
| WearMeOut, Mythos, SBA504, Clearance, Evidero, Fullscript | `lots.ts` | **`crew-asserted`** | **“crew-reported, unverified”** on `/work/[slug]` via `figureDisclaimer` |
| Demo numbers | `demo.ts` | labelled sample | Banner on every `/demo` view |
| Report samples | fictional companies | limits say fictional | n/a |
| Edpulse $4,900 | `process.ts` | price list | n/a |

**Bug class:** a crew-asserted figure without the tag. Lot pages apply the tag. Homepage FieldLog only uses the three `client-listing` lots. Homepage cards do not print figures.

`FOUNDER-CONFIRM.md` still has empty `confirmedOn` on every lot. Do not invent dates.

---

## 3. Routes

**Build: 51 routes.** No `/report` index. No `/admin`, `/security`, `/portal`, `/login`.

| Should be in sitemap | Is |
|---|---|
| Marketing pages + legal | Yes |
| `/work/[slug]` × 9, `/team/[slug]` × 12 | **Added this pass** |
| `/demo` | Yes (subviews not listed — one entry is enough) |
| `/report/*` | **No** (correct) |
| `/design` | **No** (correct, noindex) |

**Dead internal links:** none found.

**Host split:** `src/proxy.ts` — on `report.*`, robots is `Disallow: /`, `/` and `/sitemap.xml` 404, other paths rewrite to `/report/{slug}`. Marketing `robots.ts` disallows `/report/` and `/design`. Reports are `noindex, nofollow`.

`/admin` from a logged-out browser: there is no route. Next will 404. **Not verified on a deployed host.**

Report enumeration by guessing `acme-aaaaaaaa`: `getReport` → `notFound()`. Slugs end in 8 random chars (`assertReport`). **Not verified live.**

---

## 4. Forms (preview — blocked)

All mounted variants POST `/api/contact`:

| Variant | Mount | `type` |
|---|---|---|
| Contact | `/contact` `IntakeForm` | `general-intake` |
| Check | `/check` `PulseCheckIntake` | `pulse-check` |
| Per-specialist | `/team/[slug]` `CrewSession` | `work` |
| Careers | `/careers` `CrewSession` | `careers` |

**Row + email not confirmed.** No preview with Neon/Resend/Upstash. Until those env vars exist, the route correctly returns **500 + mailto**. That is not a working funnel.

Rate limit / concurrent idempotency: **not run against a preview.** That was the point of Phase A. Do it on the first preview that has Upstash.

---

## 5. Security (from outside — blocked)

| Check | Result |
|---|---|
| `curl -I https://bpulse.dev` | **403** — cannot read headers |
| Security headers on deploy | **Added** in `next.config.ts`: `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`. Confirm on the preview |
| `/admin` | No route in the app |
| Report listing | No index route |
| Guessable slugs | Scaffold + `assertReport` require `*-{8}` |
| Cookies | None set in app code |

---

## 6. Accessibility (structural only)

| Check | Code | Visual? |
|---|---|---|
| Pain list arrow keys | `Hero.tsx` Home/End/arrows | Founder |
| Three intakes keyboard | Buttons/inputs/textarea in tab order | Founder — complete each |
| Mobile menu focus trap + Escape | `Masthead.tsx` | Founder |
| `:focus-visible` | `globals.css` (iron on paper, rag on iron) | Founder — every control |
| `useReducedMotion` | Hero + CrewSession + PulseCheck | Founder — ambient off |

**axe / Lighthouse a11y:** not run. No reliable browser against a live URL from this session. Treat as **unverified**. Do not claim WCAG conformance.

Known structural risks (not severity-scored by axe):

- PulseCheck honeypot is `aria-hidden` + `tabIndex={-1}` — correct
- Some `next/image` `alt=""` on decorative portraits
- Demo download stubs are plain `<a download>` — keyboard OK
- Finding ledger uses `<details>` — keyboard OK

---

## 7. Performance (Lighthouse — not run)

Required URLs: `/`, `/check`, `/work`, one `/work/[slug]`, one `/team/[slug]`, `/demo`, one report.

**All four scores: not measured.** I will not invent numbers.

Likely issues when you run it (diagnosis only):

- Hero + masthead + Newsreader/Plex on every page — font cost
- Lot and team portraits (WebP now under 40KB for the heavy four)
- `motion` on Check and CrewSession
- Report OG + view log are dynamic

Anything under 90 after a real run: start with unused JS on `/` (intake is not on home) and image `sizes`.

---

## 8. Fixes applied this pass

1. Check price unified to `offer.check.price`
2. SLA wording unified to one business day
3. Fake invoice line removed
4. Credit described as a hand term
5. How-it-works no longer claims a live portal
6. Work catalogue no longer claims every lot is confirmed
7. Privacy: IP, vendors, no fake 12-month wipe, no fake Pakistan transfer
8. Accessibility page no longer claims VoiceOver/NVDA or a full AA audit
9. Home stats and careers count wired to content
10. FieldLog derived from `lots.ts` client-listing rows
11. Sitemap includes every work and team slug
12. Careers intake mounted
13. `next.config.ts` security headers
14. `ops/layer` fast-forwarded onto `main` so this audit ran on the real tree

---

## 9. Still open (cannot fix in code)

- Preview deploy + real env
- Rate limit and idempotency on that preview
- Slack / LinkedIn OG paste
- axe + Lighthouse + keyboard + reduced-motion **by eye**
- Neon region, Resend domain, Upstash
- Six lot confirmations
- Zaira and Mehak photos
- Client logo permission
- Solicitor on legal pages
- One-business-day inbox habit
- Hand credit on the first Close invoice
