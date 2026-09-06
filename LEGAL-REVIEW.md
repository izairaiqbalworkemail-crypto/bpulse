# LEGAL-REVIEW.md

Hand this file to a commercial solicitor with cross-border experience. Ask
about adequacy, SCCs (Commission Implementing Decision (EU) 2021/914 Module
Two), the Transfer Impact Assessment, and the UK International Data Transfer
Addendum — by those names.

Until that person signs off, every public surface stays **Draft**.

## Sign-off ledger

- Status: No solicitor sign-off recorded.
- Last checked: 06 Sep 2026.
- Jurisdiction sign-off entries: none.

---

## Hamza Khan — owner, not reviewer

Questions asked. Answers as of 06 Sep 2026: **not confirmed**.

1. Is he an enrolled advocate, with which bar council and what number?
   - **Unknown. Do not name him as counsel.**
2. Has he reviewed these documents in this form?
   - **No.**
3. Is he qualified on UK, EU, or US contract law?
   - **Unknown. Do not imply it.**

He is the **legal owner**. He handles NDAs and IP assignment, answers client
legal questions, and instructs external counsel. The banner stays. Swapping
the label later is one line in `legalOwner`.

He appears on `/legal`, in the footer, on `/contact`, and on `/team/hamza`
with that scope stated.

---

## What superseded the 05 Sep activation

A previous product direction marked the register Active and removed Draft
banners. The 06 Sep brief reverses that. Activation without solicitor
sign-off is the thing a procurement team will catch. Draft is back on web,
PDF (watermark), and plain text.

---

## Count

The brief said sixteen documents. The inventory lists seventeen once
Vulnerability Disclosure (public) and the SCC cover (engagement) are both
kept. We shipped seventeen from one source.

Public (7): Terms, Privacy, Cookie, Accessibility, Complaints,
Sub-processors, Vulnerability Disclosure.

Engagement (8): NDA, MSA, SOW, Change Order, IP Assignment, DPA, SCC cover
+ UK Addendum, Handover Certificate.

Candidate (1): Gate 2 Work Sample.

Crew (1): Crew Agreement.

---

## What we did not invent

- No statutory section numbers for PECA.
- No case citations.
- No claim that encryption keys are held outside Pakistan.
- No Neon / Upstash / Resend region invented. Confirm before execution.
- SCC mandatory clause text is not reproduced. The cover names
  2021/914 Module Two and says the official pages are attached at execution.
- Cookie policy: the site sets no cookies. There is no banner.

---

## Items a solicitor must decide

Generated from `reviewNote` fields in `src/content/documents/*.ts` and
`src/content/legal/data.ts`. If this file drifts, fix the source.

### Terms of Service — BP-TERMS (`/legal/terms`)

- Section 5: default governing law and forum for the site terms, and whether
  a B2B clause or a consumer clause applies on the public site.

### Privacy Policy — BP-PRIVACY (`/legal/privacy-policy`)

- Section 4: a defensible retention schedule, and whether the EU
  personal-data route needs SCCs with the named sub-processors.

### Cookie Policy — BP-COOKIE (`/legal/cookie-policy`)

- No review items flagged.

### Accessibility Statement — BP-ACCESS (`/legal/accessibility`)

- No review items flagged.

### Complaints & Disputes — BP-COMPLAINTS (`/legal/complaints`)

- Section 3: default mediation provider; whether enforcement clauses are
  needed for client-facing disputes.

### Sub-processors — BP-SUB (`/legal/sub-processors`)

- Confirm the live Neon region and record it in Annex I of any SCC set
  before a DPA is executed.

### Vulnerability Disclosure — BP-VDP (`/legal/vulnerability-disclosure`)

- Safe-harbour scope; whether a bug-bounty reward applies. Nothing promises
  a reward unless stated.

### NDA — NDA-2026-014 (`/legal/mutual-nda`)

- Governing law and forum left blank until the client's jurisdiction is
  known.
- Section 6: three-year term; whether trade secrets survive indefinitely;
  notice period for required disclosure.

### MSA — MSA-2026-009 (`/legal/master-services-agreement`)

- Governing law and forum; liability cap; assignment of future IP works.
- Section 3: caps and carve-outs per jurisdiction.
- Section 6: future-works assignment mechanism and local formalities.
- Section 8: governing law deliberately blank.

### SOW — SOW-2026-031 (`/legal/statement-of-work`)

- Acceptance criteria and invoice schedule before execution.
- Section 4: whether deemed-acceptance on silence is enforceable.

### Change order — CO-2026-047 (`/legal/change-order`)

- No review items flagged.

### IP assignment — IPA-2026-012 (`/legal/ip-assignment`)

- Future-works assignment across jurisdictions; local formalities.

### DPA — DPA-2026-003 (`/legal/data-processing-agreement`)

- Attach 2021/914 Module Two (or the correct module) with Annex I–III.
- Confirm current regions for Neon, Upstash, Resend, and Vercel.

### SCC cover — SCC-2026-001 (`/legal/standard-contractual-clauses`)

- Attach the official 2021/914 text unmodified.
- Confirm the current ICO UK Addendum version.
- Complete Annex I–III per matter.

### Handover certificate — HC (`/legal/handover-certificate`)

- Fill the dated access-revocation log at completion.

### Crew agreement — BP-CREW (`/legal/crew-agreement`)

- Confirm contract-for-services and not employment under the crew member's
  domestic laws. Set governing law defaults.

### Gate 2 work sample — BP-GATE2 (`/legal/gate-2-work-sample`)

- Sample fee; whether IP in the sample transfers on payment; confidentiality
  relative to the candidate's other work.

### `/legal/data` (not a signed instrument)

- TIA form and whether supplementary measures suffice for the dataset.
- Government-access request policy against PECA and any compulsory-access
  powers.
- UK Addendum version.

---

## Facts the documents rely on

- Sub-processors: Vercel, Neon, Upstash, Resend. Source:
  `src/content/legal/vendors.ts`. Same list on privacy, DPA, `/security`,
  `/legal/data`, and the sub-processor document.
- All four are US-incorporated. An EEA intake is an international transfer
  even if a processing region sits in the EU.
- Neon region is fixed at project creation and is not published here.
- The site sets no cookies. No cookie banner exists.
- Pakistan: no enacted general data protection law; no EU adequacy;
  PECA 2016 is a criminal statute, not a processing framework.
- We do not claim keys held outside Pakistan. We do not claim
  pseudonymisation of intake.

---

## How to take this to counsel

1. Open `/legal` and `/legal/data`.
2. Download one instrument in PDF and plain text (`/legal/mutual-nda/pdf`,
   `/legal/mutual-nda/text`).
3. Walk the four Part 0 items by name.
4. Resolve each `reviewNote`. Bump the version and append a changelog
   entry. Do not edit a sent version in place.
5. Only then remove the Draft banner, and only from the documents that
   person actually reviewed.
