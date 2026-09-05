# LEGAL-REVIEW.md

## Current operating position

- Baseline in product copy: **Hamza Khan is legal owner, not legal reviewer**.
- As directed by the founder (05 Sep 2026), all 15 documents are now **Active
  forms** — the Draft banner was removed from web, PDF, and plain text, and the
  register status shows Active.
- Activation means the forms are live bpulse templates. It does **not** mean a
  qualified solicitor signed them off:
  - every reviewNote below still stands and is rendered in the output;
  - governing law/forum blanks stay blank until a jurisdiction is confirmed;
  - counsel reviews each executed set in the client's jurisdiction before completion.

## Founder confirmations required (Hamza)

Status as of 05 Sep 2026: **activation directed by founder; review items pending**

1. Advocate enrolment status
   - Is Hamza an enrolled advocate with a bar council?
   - If yes: council name and enrolment number.

2. Jurisdiction qualification
   - Is Hamza qualified to advise on UK, EU, or US contract law used by bpulse clients?

3. Confirmation that each reviewNote below can be resolved to a final clause.

## Switching rule

- The Draft label is removed (founder direction, 05 Sep 2026) — recorded here as
  the who/when behind the activation.
- Resolving a `reviewNote` to final wording still requires qualified counsel input;
  that resolution is recorded here per document and jurisdictions before execution.

## Why this record exists

- Procurement and legal teams will ask who reviewed terms and under what qualification.
- Activation is a product decision; sign-off is a legal decision. This file keeps
  the two visible and separate.

## Scope owner responsibilities now

- Route legal enquiries to Hamza Khan.
- Handle NDAs and IP assignment in writing.
- Coordinate and instruct external solicitor review by jurisdiction.

---

# Items a solicitor must decide

Every review item below comes from a `reviewNote` field in
`src/content/documents/*.ts` — the renderers surface the same text.
Nothing here overrides the source; if they drift, fix the source.

## Engagement

### NDA — NDA-2026-014 (`/legal/mutual-nda`)

Document-level:

- Governing law and forum are intentionally left blank on this template. Solicitor to insert the jurisdiction and forum clause before execution, based on where the client is incorporated.

Section 6 (Term):

- Solicitor to confirm the three-year term, whether trade secrets should survive indefinitely, and the notice period for required disclosure.

Section 9 (General):

- The blank on governing law is deliberate. See the agreement-level reviewNote.

### MSA — MSA-2026-009 (`/legal/master-services-agreement`)

Document-level (three Part-0 flags):

- (1) governing law and forum for a Lahore studio and an overseas client;
- (2) the liability cap amount;
- (3) assignment of future IP works and enforceability in the client's jurisdiction.

Section 3 (Liability):

- Solicitor to set the caps and carve-outs for both parties for each jurisdiction.

Section 6 (Intellectual property):

- Part-0 item 3: assignment of future works may not bind in every jurisdiction. Solicitor to confirm the mechanism and any local-formality requirement.

Section 8 (Governing law):

- Part-0 item 1. Deliberately blank until jurisdiction is confirmed.

### SOW — SOW-2026-031 (`/legal/statement-of-work`)

Document-level:

- Acceptance criteria and the invoice schedule must be agreed before execution. Change Orders modify this SOW in writing.

Section 4 (Acceptance criteria):

- Solicitor to confirm whether deemed-acceptance on silence is enforceable in the client's jurisdiction.

### Change order — CO-2026-047 (`/legal/change-order`)

No review items flagged. Price $2,400; extends the SOW timeline by two business days.

### IP assignment — IPA-2026-012 (`/legal/ip-assignment`)

Document-level:

- Part-0 item 3: assignment of future (not-yet-created) works varies by jurisdiction. Solicitor to confirm the mechanism and any local formalities for the client's jurisdiction.

Section 2 (Future works):

- Assignment of future works — confirm enforceability (Part-0 item 3).

### DPA — DPA-2026-003 (`/legal/data-processing-agreement`)

Document-level (Part-0 item 2):

- Pakistan has no EU adequacy decision. For EU data, this agreement must attach the Standard Contractual Clauses (Commission Implementing Decision (EU) 2021/914) as module two or three, with the correct annexes. Counsel to confirm the current version and complete Annex I–III.

Section 3 (Sub-processors):

- Confirm current regions for Neon, Upstash, Resend, and Vercel before execution; record them in Annex I of any SCC set.

Section 4 (Transfers):

- Part-0 item 2. Attach completed SCCs (2021/914) before execution.

### Handover certificate — HC (`/legal/handover-certificate`)

Document-level:

- Fill the dated access-revocation log at completion; the certificate is evidence for the "no hostage codebases" claim.

## Site legal

### Terms of service — BP-TERMS (`/legal/terms`)

Section 5 (Liability and disputes):

- Solicitor to decide the default governing law and forum for the site terms, and whether a B2B clause or a consumer clause applies on the public site.

### Privacy policy — BP-PRIVACY (`/legal/privacy-policy`)

Section 4 (Retention and deletion):

- Solicitor to confirm a defensible retention schedule and whether the EU personal-data route needs Standard Contractual Clauses with the sub-processors below.

### Cookie policy — BP-COOKIE (`/legal/cookie-policy`)

No review items flagged.

### Accessibility statement — BP-ACCESS (`/legal/accessibility`)

No review items flagged.

### Complaints & dispute resolution — BP-COMPLAINTS (`/legal/complaints`)

Section 3 (Escalation):

- Solicitor to decide a default mediation provider and whether enforcement clauses are needed for client-facing disputes.

## Internal

### Crew agreement — BP-CREW (`/legal/crew-agreement`)

Document-level:

- Solicitor to confirm the relationship is a contract-for-services and not employment under the crew member's domestic laws, and to set governing law defaults.

### Gate 2 work sample — BP-GATE2 (`/legal/gate-2-work-sample`)

Document-level:

- Confirm the sample fee, whether IP in the sample transfers on payment, and the confidentiality scope relative to the candidate's other work.

Section 3 (Intellectual property in the sample):

- Confirm the assignment-on-payment mechanism in the candidate's jurisdiction.

### Vulnerability disclosure — BP-VDP (`/legal/vulnerability-disclosure`)

Document-level:

- Confirm safe-harbour scope and whether a bug-bounty reward applies. Nothing here promises a reward unless stated.

---

## Facts the documents rely on (keep in sync)

- Sub-processors: Vercel (hosting/edge), Neon (managed Postgres), Upstash (Redis rate limits/counters), Resend (transactional email).
- All four sub-processors are US-incorporated, so EEA→sub-processor data flows are an international transfer for the DPA even where the chosen processing region is inside the EU.
- Neon: the region is fixed at project creation and cannot be changed; it must be recorded per project (Annex I of any SCC set) before execution. Source: Neon docs ("Regions", region fixed at project creation).
- Engagement figures: SOW-2026-031 total $55,000 / 21 business days; CO-2026-047 +$2,400 / +2 business days; the demo portal clock tracks 11 of 23 locked days.
- Governing law and forum are left deliberately blank (marked for insertion by a qualified solicitor) in the NDA, MSA, and IP assignment, matching the Part-0 flags.

## Researched legal facts (with sources)

- **Pakistan is not on the EU adequacy list.** Verified against the European Commission's adequacy-decisions list. The DPA statement "Pakistan has no EU adequacy decision" is current and accurate.
- **SCCs are still Commission Implementing Decision (EU) 2021/914 of 4 June 2021.** Controller→processor transfers use Module 2; the old 2001/497 and 2010/87 sets are replaced. Planned SCCs for Art. 3 processors had not been adopted at research time.
- **PDF typeface is real bpulse type, not a stand-in.** Plex Sans, Plex Mono, and Newsreader TTFs are bundled in `src/lib/legal/fonts/` (OFL) and embedded in every PDF. No Helvetica/Courier fallbacks remain in the legal PDFs.
- **No cookie-banner or analytics claim:** the site ships no analytics, tracking pixels, advertising cookies, or session recording — matching `/security` and the Cookie Policy.

## Activation record

- Who: founder (Aneeb Iqbal, per this brief), directed activation of the legal register.
- When: 05 Sep 2026.
- What: all 15 documents switched `draft` → `active`; Draft banners removed from web, PDF, and plain text; `/legal` and `/legal/[slug]` show Active status; `LEGAL-REVIEW.md` keeps the review items live.
- Boundary: activation ≠ solicitor sign-off. Each `reviewNote` below still requires counsel before the executed set is relied on.