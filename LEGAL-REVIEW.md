# LEGAL-REVIEW.md — Pages Pending Legal Review

Every page listed below carries a visible draft banner. Only a lawyer's
sign-off removes them. That is the founder's call to make with a lawyer.

**Do not remove the draft banners.** They are the only thing standing
between "we wrote this" and "this is in force."

---

## Pages requiring review

| Route | Page | What a solicitor needs to check |
|---|---|---|
| `/legal/terms-of-service` | Terms of Service | Governing law (Pakistan), liability cap, IP ownership clause, international B2B service delivery from Pakistan to UK/EU/US clients, consumer-versus-business protection distinctions |
| `/legal/privacy-policy` | Privacy Policy | International data transfer (PK → EU/UK/US), lawful basis for processing, retention periods, intake form data handling, ICO registration (not applicable in PK — flag this), no-analytics/no-cookies accuracy |
| `/legal/cookie-policy` | Cookie Policy | Accuracy of "zero cookies" claim — verify no analytics, no tracking, no session recording in production. If this changes, the page must be updated before deployment. |
| `/legal/accessibility-statement` | Accessibility Statement | WCAG AA claim accuracy, known-issues list completeness, screen-reader audit status, Equality Act 2010 s.29 applicability (UK clients) |
| `/legal/complaints` | Complaints and Dispute Resolution | Response windows (2-day ack, 10-day substantive), mediation preference, payment dispute guidance, escalation process |

---

## Key questions for the solicitor

1. **Governing law.** The Terms state Pakistan. For UK/EU/US B2B clients,
   should governing law be England & Wales, or is Pakistan appropriate for
   a Pakistan-registered studio serving international clients?

2. **Data transfer.** The Privacy Policy describes transfers from Pakistan to
   EU/UK/US. Does the studio need Standard Contractual Clauses (SCCs) or
   other transfer mechanisms under GDPR?

3. **Consumer vs business.** Are all clients B2B? If any B2C work is taken,
   consumer protection laws in the client's jurisdiction may apply.

4. **ICO registration.** Not applicable in Pakistan. Should the Privacy
   Policy note this explicitly for UK clients?

5. **Cookie accuracy.** The Cookie Policy claims zero cookies. This must be
   verified against the production build. If analytics or any tracking is
   added later, both the Cookie Policy and Privacy Policy must be updated
   before deployment.

6. **Complaints process.** The 10-day substantive response window — is this
   reasonable and enforceable? Should it be longer?

---

## Process

1. Founder reviews these pages and the questions above.
2. Founder engages a solicitor with international B2B experience.
3. Solicitor reviews each page and returns edits.
4. Founder applies edits and removes draft banners.
5. `LEGAL-REVIEW.md` is updated to reflect the sign-off date.

---

*This file is project law. It records the pending review and must not be
deleted until all draft banners are removed.*
