# PATHS — what shipped 5 Sep 2026

End-to-end map. Two surfaces: **The Match** and **The Check session**.
The site still does not take payment. A Check or a Close starts as an email.

Do not call the matcher AI. Do not show a score. Do not invent evidence.

---

## The funnel

```
stuck product
    │
    ├─ /match ── write the stuck part ── named person + reason
    │                 │
    │                 ├─ Write {name} ── /team/{id}#intake ── brief on their desk
    │                 └─ Or start a Check ── /check#intake ── condition on Aneeb's desk
    │
    ├─ /  or  /check ── write the stuck part on the condition sheet
    │                         └─ Put it on Aneeb's desk · $1,500
    │
    └─ /contact  /about  /careers  /team/{id}
              same session chat, different door
```

Path is **Check $1,500 → Close $18k–$95k**. Standing $2–6k/mo is shown, not sold first.

---

## 1. The Match — `/match`

**What it is.** A rules engine against the catalogue (`getCatalogue()` = 9 lots + 15 index rows = **24**). Not a model. Frame on the page: “Matched against 24 real engagements. Not a guess.”

**What you do.** Write the stuck part. Submit. You get up to three named people, each with a reason that points at a real lot or a capability we actually have. No percentage. If nothing is close, Aneeb is the answer and the page says so.

**How it scores (honest).** Capability (w3), stack (w2), lot token overlap of at least two words (w3), availability (w1). Operations people (Hamza, Madiha) are out of the pool. “Ongoing” lots are down-weighted, not excluded. Empty, gibberish, or injection text → weak founder. DeepIDV lot is Mehak’s. Gate 4 is linked as “Client-facing · Gate 4” — we do not invent a clearance date.

**Interface upgrade later.** `RuleMatcher` ships. `ModelMatcher` throws “not shipped”. `createMatcher()` returns the rule matcher. Swap the factory later; the page does not change.

**Where the description lives.** Never in the URL. `sessionStorage` keys `bpulse:match:brief` and `bpulse:match:event`.

### Path A — Match → write a person

1. `/match` (or home episode **06 · The Match**, or nav / footer / hero / `/team`).
2. Describe the stuck part. Server action `runMatchAction` → `match()` → save event.
3. Result: named person, evidence, “Write {first}”.
4. Brief is stored. Outcome `booked` (lead) or `chose_other` (the two extras).
5. `/team/{id}#intake` opens `BriefIntake` with the wound already on the sheet.
6. File → `POST /api/contact` type `work`, source `match`. Outcome `booked` again on file.
7. Aneeb (or that person) gets the email / Neon row / local `.data/submissions.jsonl`.

### Path B — Match → Check

1. Same as A through the result.
2. “Or start a Check” stores the brief, logs `became_check`, goes to `/check#intake`.
3. The condition sheet opens with the stuck part already written. The session reads it and only asks what the words did not say.
4. File → `POST /api/contact` type `pulse-check`. $1,500 is not charged on the site.

### Path C — Match → leave

“Describe it again” logs `abandoned`. Opening a result logs `viewed`.

---

## 2. The Check session — `/check#intake` and home `#intake`

**What it is.** Day zero of the Check. You write on a **condition report**, not a numbered form and not chip chat. Studio voice reads back. No one is typing. Aneeb reads it tomorrow. This does not take a card.

**The invented object.** The sheet is the session. One line is open at a time. Future lines are dashes. Arrival / Floor / Keys fill from the words when the words are clear (keyword read in `readWound`, same honesty as Match — not a model). If two readings conflict, the line stays blank and the session asks. “I have no idea how auth works” is not an idea.

**Order.** Wound first. Then only what is missing: arrival, floor, keys, name, inbox, optional repo. Idea → stack / keys / repo stay off the sheet.

**Prefill.**

| From | What arrives |
|---|---|
| Home fit cards | Arrival already marked. Write the stuck part. |
| `/check?state=stalled` (and the other hero states) | Same. |
| `/check?symptoms=` | Wound seeded from the hero self-check. |
| Match → Check | Wound seeded from `sessionStorage`. |

**File.** `Put it on Aneeb's desk · $1,500` → type `pulse-check`. Confirmation: “The Check is on Aneeb's desk.” A person replies within one business day.

Five days on `/check` are unchanged: Read, Trace, Map, Grade, Report. Verdict: keep, repair, or rebuild. Credited on a Close invoice within 30 days.

---

## 3. The other doors (same session, not the condition sheet)

`BriefIntake` — turn-taking studio voice, living brief on the side. No chips. No “tap above.”

| Door | Type saved | Who reads it |
|---|---|---|
| `/team/{id}#intake` | `work` | The named person |
| `/contact` | `contact` | Studio |
| `/about` | `about` | Studio |
| `/careers` | `careers` | Aneeb. Candidates are never charged. |

`CrewSession.tsx` is leftover chrome. It is not wired. Do not put it back.

---

## 4. Where a lead goes

```
browser
  ├─ Match describe  →  runMatchAction  →  match_events
  │                         + POST /api/match/outcome  →  match_outcomes
  └─ File a session  →  POST /api/contact
                            ├─ Neon `submissions` if DATABASE_URL
                            ├─ else `.data/submissions.jsonl`
                            └─ Resend to FOUNDER_EMAIL if RESEND_API_KEY
```

Local Match log: `.data/match-events.jsonl` and `.data/match-outcomes.jsonl` (gitignored).

**Admin (not indexed):** `/studio/matches` — two ratios, both honest:

1. Match → call booked (`booked` / events). They wrote someone, not that a call happened.
2. Call booked → Check (`became_check` / booked). They **started** a Check, not that they paid.

`robots.txt` disallows `/studio` and `/report/`. Do not put the match log on `report.bpulse.dev` — that host rewrites `/x` → `/report/x`.

After deploy: `pnpm db:migrate` so `0002_match.sql` creates `match_events` and `match_outcomes`.

---

## 5. How to walk every path (you)

Hard-refresh first. The old Match form used to GET `/match?` and look dead.

1. **Match happy path.** `/match` → try “Staging only” → Read it against the record → a named person and a lot link → Write {name} → brief already there → file → confirmation.
2. **Match → Check.** Same describe → Or start a Check → `/check#intake` has the wound → Send through the open lines → Put it on Aneeb's desk → confirmation. No card.
3. **Weak match.** Paste nonsense or an injection line → Aneeb, weak, honest sentence. No score.
4. **Check from cold.** `/check#intake` → write a stalled Next.js wound → Arrival / Floor mark “from the words” if the words support it → name, inbox → file.
5. **Check from home.** Tap a fit card → `#intake` says “You marked this … Write the stuck part.”
6. **Idea.** Write “just an idea, nothing is built” → sheet says wrong door, still files, we reply and say so.
7. **Contact / careers / about.** Same session, different opening line. File still hits `/api/contact`.
8. **Studio.** `/studio/matches` after a few walks. Counts move. Descriptions are there. Not in Google.
9. **Privacy.** `/legal/privacy-policy` names `/match` and what we store.

Rate limit still applies (five / minute). Honeypot field `website` still discards bots.

---

## 6. Honesty that must not regress

- Never say the matcher is AI.
- Never show a percentage or “match score.”
- Never invent a lot or a Gate 4 date.
- DeepIDV specialist on the lot is Mehak. Do not assign Hassan ownership of that lot.
- Admin “Check” means started, not paid.
- Demo / sample data stays banner-labelled.
- Dead name Threshold does not appear.
- `$1,500` and `$18,000–$95,000` come from `src/config/brand.ts` / `src/content/offer.ts`. Do not invent a $1M target.

---

## 7. Files

| Piece | Where |
|---|---|
| Engine + tests | `src/lib/match/` · `pnpm test` (32 tests) |
| Capability dictionary | `src/content/match-terms.ts` |
| Match UI | `src/components/match/MatchDesk.tsx` |
| Match page / action | `src/app/match/` |
| Match APIs | `src/app/api/match/` · `src/app/api/match/outcome/` |
| Condition sheet | `src/components/intake/ConditionDesk.tsx` |
| Wound read + tests | `src/lib/intake/read-wound.ts` |
| Session voice | `src/lib/intake/session-voice.ts` |
| Other-door session | `src/components/intake/BriefIntake.tsx` |
| Studio log | `src/app/studio/matches/page.tsx` |
| Schema / migration | `src/lib/db/schema.ts` · `drizzle/0002_match.sql` |

Entry points for Match: hero, masthead, footer, home episode 06, `/team`, `/check`, sitemap.

---

## 8. What this is not

- Not a live client portal. `/demo` is still the sample.
- Not a calendar. There is no “Book 20 minutes.”
- Not payment. The $1,500 is agreed after Aneeb replies.
- Not a CRM. First ten leads: inbox + Neon + `/studio/matches`.

**Ready as a path** — you can walk Match and Check from a cold page to a filed brief.

**Ready as a funnel** — only after Neon, Resend, Upstash, and `pnpm db:migrate` (including `0002_match`) are live, and you have watched one Match and one Check land in `FOUNDER_EMAIL`. See `LAUNCH.md`.
