# LAUNCH — for the founder

This is the go-live book. You do not need to be an engineer. If a step says “ask whoever deploys,” that is the person with the Vercel login.

The site is a catalogue and a funnel. It does **not** take payment. It does **not** run a live client portal. A Check or a Close is still a conversation that starts from an email.

---

## 1. Go-live checklist (in order)

Do these in this order. Do not skip ahead and “test the site” — the form will fail on purpose until 1–5 are done.

| # | Do this | Done looks like |
|---|---|---|
| 1 | Create a **Neon** (or Supabase) Postgres project. Write down the **region** (EU or US). | You have a connection string. You know the region. |
| 2 | Create **Upstash Redis** (free is enough). | You have `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`. |
| 3 | Create **Resend**. Verify the sending domain (e.g. `bpulse.dev`). | You can send a test email from that domain. |
| 4 | In **Vercel → Environment variables** (Production + Preview), add: `DATABASE_URL`, `RESEND_API_KEY`, `FOUNDER_EMAIL`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`. Optional: `RESEND_FROM`. | All five show as set. Redeploy after saving. |
| 5 | From the project folder, run `pnpm db:migrate` against that `DATABASE_URL`. | The `submissions` table exists. |
| 6 | Redeploy. Open the preview URL. Submit **four** real tests: Contact, Check, one specialist page, Careers. | Each time: an email in `FOUNDER_EMAIL`, and a row in the database. |
| 7 | On the preview, submit the Check form **six times in a minute**. | The sixth should fail (“too many requests”). If it does not, Redis is not wired. |
| 8 | Submit the same Check twice **at the same time** with the same request (refresh-spam the last step). | You get one row, not two. |
| 9 | Paste `/`, `/check`, and one lot URL into Slack and LinkedIn. | The card shows “We finish what starts.” — not a blank box. |
| 10 | Open `/legal/*`. Confirm the **Draft** banner is still there until a solicitor signs off. | Banner visible. You have not told anyone the terms are in force. |
| 11 | Decide whether you will answer every intake **within one business day**. If you will not, take that sentence off the site before launch. | Inbox habit, or the sentence is gone. |
| 12 | Walk the **visual list** at the bottom of this file. | You have looked at every new page at 1440 and 375. |

Until 1–6 are done, every form returns an error and a `mailto:` link. That is correct. It is also **not a working funnel**. Do not put the site in front of a paying client in that state.

---

## 2. How to write and publish a report

A report is a private page for one company. It is **not** in Google. There is **no list** of reports. If someone asks you to add a list page, say no.

### Write

In the project folder:

```
pnpm report:new "Acme Payroll"
```

That creates a file under `src/content/reports/` with a slug like `acme-payroll-K7m2Qx9p` (company name + eight random characters). Open it. Fill every field. The comments in the file say what each one is.

Rules the file will refuse to break:

- At least **two** surfaces you actually looked at
- **3–5** findings, each with what you saw, what it costs them, and how you’d close it
- At least **one** limit — what you could **not** see

A report with no limits was either dishonest or not researched. Do not ship it.

### Models (imitate these)

Open these two files and copy the *specificity*, not the companies — they are fictional:

- `src/content/reports/northline-payroll-k7m2Qx9p.ts` — open signup, free-tier exhaustion
- `src/content/reports/harbor-chart-n4R8wL2c.ts` — demo JSON that looks like patient data vs a HIPAA page

Good: *“The signup POST has no rate limit, so one script exhausts the free tier overnight.”*  
Worthless: *“Security needs work.”*

### Publish

1. Add one line in `src/content/reports/index.ts` so the new file is imported.
2. Deploy.
3. Send the person **only** this link: `https://report.bpulse.dev/{the-slug}`
4. Do not put the link in the footer, the sitemap, a tweet, or a case study.

Print: they can print to PDF. The nav and the Check button hide. The URL prints in the footer.

---

## 3. How to check leads

**Where the email goes.** Whatever you set as `FOUNDER_EMAIL` in Vercel. Reply to that thread. The visitor’s address is the reply-to.

**Where the admin inbox is.** There is no admin website. The database table is `submissions` (Neon console → Tables, or `pnpm db:studio`). Each row is one intake: type, email, budget, payload, time.

**The two ratios that matter** (count them by hand at first):

1. **Replies in one business day / submissions that week.** If this is not ~100%, the site is lying. Fix the inbox, or change the sentence.
2. **Checks that become a Close in 30 days / Checks you invoiced.** This is whether the credit term is real. If you never credit, take the credit sentence off `/check`.

You do not need a CRM for the first ten leads. When you do: buy Attio or Pipedrive. Do not build one.

---

## 4. When something breaks

### Forms all say “delivery is not configured” (or 500 + mailto)

A Vercel env var is missing, or you forgot to redeploy after adding them. Check the five names in section 1. Open the latest deployment logs.

### Forms accept more than five in a minute

Upstash is missing or the preview does not have those two variables. Phase A is doing nothing. Add the vars, redeploy, try again.

### Email never arrives, but a database row exists

Resend: domain not verified, or `RESEND_FROM` is not on that domain, or the mail is in spam. Send a test from the Resend dashboard first.

### Share cards are blank in Slack / LinkedIn

The image URL should be `/opengraph-image` on the marketing site, and the per-report generator on a report link. After a deploy, use [opengraph.xyz](https://www.opengraph.xyz) on the live URL. If it 404s, the deploy did not pick up `brand.ogImage`.

---

## 5. What is deliberately missing (do not build these)

**The real logged-in portal.** `/demo` is the sample. The live one is built for the first actual client, around what they need. Building it now means guessing twice.

**HRMS, CRM, finance, a feedback widget.** Buy: Rippling or Deel, Attio or Pipedrive, Xero.

**The redesign.** Function first. Visual pass is a separate job.

**Blocked on you, not on code**

- Photoshoot — Zaira and Mehak have no photo
- Real client logos, with written permission
- Written permission for names and quotes
- Attribution on the six crew-asserted lots (`FOUNDER-CONFIRM.md`)
- A solicitor for the five legal pages (they say **Draft** on purpose)

**Blocked on a lawyer**

- Terms, privacy, cookies, accessibility, complaints — not in force until reviewed
- Whether “one business day” and the 30-day credit belong in the terms or stay as site copy

---

## 6. Visual checks (you — I cannot see images)

Look at each of these at **1440** and **375** wide. Write down anything that overflows, clips, or looks like a leftover decoration.

- Home hero, including the pain list and the 80% bar
- `/check`, `/work`, one lot, one specialist
- `/demo` and every tab (Overview through Handover). The **sample** banner must be obvious on all of them
- `/how-it-works`, `/standard`, `/edpulse`
- One report URL, including print preview (File → Print)
- Slack / LinkedIn paste of `/` and a report link
- Focus rings: tab through the pain list, the three intakes, the mobile menu (open it, Tab, Escape)
- Reduced motion: OS setting on. Ambient movement should stop. Buttons you click may still move

If the logo in the tab looks stretched, the square icon set is already in `public/`. Hard-refresh.

---

## 7. Honest read

**Ready as a brochure** — the pages, the sample portal, the report tool, the copy that no longer contradicts itself.

**Not ready as a funnel** — until the database, mail, and Redis are live and you have watched a test land in your inbox.

**Not ready as a legal entity talking to a client** — until a solicitor has taken the Draft banner off, or you keep the banner and say so on the call.

Put this in front of a paying client **after** checklist 1–9 and the inbox habit. Before that, you are showing a site that cannot accept a lead and legal pages that say they are not in force. That is a worse first impression than no site.
