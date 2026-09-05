import type { LegalDoc } from "./types";

/** bpulse as a party in every engagement document. */
export const bpulseParty = {
  key: "bpulse",
  name: "bpulse",
  entity: "Breakthrough Pulse",
  jurisdiction: "Lahore, Punjab, Pakistan",
  email: "contact@bpulse.dev",
} as const;

/** Placeholder client party. A real matter substitutes this before execution. */
export const clientParty = {
  key: "client",
  name: "The Client",
  entity: "The Client company",
  jurisdiction: "Legal entity's registered jurisdiction",
  email: "Contracts lead email",
} as const;

/**
 * The four Part-0 questions are then flagged in every affected document
 * via reviewNote. Never edited in place once sent to a client.
 */

export const mutualNda: LegalDoc = {
  slug: "mutual-nda",
  name: "MUTUAL NON-DISCLOSURE AGREEMENT",
  family: "engagement",
  reference: "NDA-2026-014",
  version: "v1.2",
  issuedAt: "14 Sep 2026",
  updatedAt: "14 Sep 2026",
  status: "active",
  owner: "Hamza Khan",
  role: "Legal & Risk",
  lead: "Signed before the first technical conversation, repo access, or production credentials.",
  parties: [bpulseParty, clientParty],
  reviewNote:
    "Governing law and forum are intentionally left blank on this template. Solicitor to insert the jurisdiction and forum clause before execution, based on where the client is incorporated.",
  signatureBlocks: [
    { party: "bpulse", name: "Authorised bpulse representative", title: "—" },
    { party: "client", name: "Authorised client representative", title: "—" },
  ],
  sections: [
    {
      number: "1",
      heading: "Purpose",
      plainTerms:
        "This agreement protects business information either side shares while exploring or doing work together.",
      clauses: [
        {
          text: "The parties may share confidential information to evaluate a potential engagement or during the performance of one.",
        },
        {
          text: "This agreement is mutual. Each party both discloses and receives confidential information on the same terms.",
        },
      ],
    },
    {
      number: "2",
      heading: "Confidential Information",
      plainTerms:
        "Confidential information is business information that is marked confidential or that a reasonable person would treat as confidential.",
      clauses: [
        {
          text: "\"Confidential Information\" means non-public business, technical, or financial information disclosed in any form, when marked confidential or reasonably identified as confidential at the time of disclosure.",
        },
        {
          text: "Information a reasonable person would treat as confidential counts even if not marked, including source code, credentials, roadmaps, pricing, and underlying client data.",
        },
      ],
    },
    {
      number: "3",
      heading: "Exclusions",
      plainTerms:
        "Information that was already public, independently developed, or lawfully received elsewhere is not confidential.",
      clauses: [
        {
          text: "This agreement does not cover information that: was already public through no fault of the receiving party; was independently developed without use of the confidential information; was lawfully received from a third party without an obligation of confidence; or was already known to the receiving party without an obligation of confidence.",
        },
        {
          text: "The party claiming an exclusion bears the burden of proving it.",
        },
      ],
    },
    {
      number: "4",
      heading: "Obligations",
      plainTerms:
        "Each side keeps the other's confidential information private, uses it only for the agreed purpose, and does not copy or hand it over beyond what the purpose needs.",
      clauses: [
        {
          text: "Use confidential information only for the purpose described, and not for any other advantage.",
        },
        {
          text: "Protect it with at least the same care used for the party's own information of similar sensitivity, and in any case with reasonable care.",
        },
        {
          text: "Give access only to people who need it for the purpose and who are bound by an obligation of confidentiality that is at least as protective. Each party's crew members are bound under their studio contracts.",
        },
        {
          text: "Do not reproduce confidential information beyond what the purpose requires.",
        },
      ],
    },
    {
      number: "5",
      heading: "Required disclosure",
      plainTerms:
        "If a law or regulator forces disclosure, you may disclose it with notice so the other side can act first.",
      clauses: [
        {
          text: "A party may disclose confidential information if required by law, a court order, or a regulator, after giving the disclosing party reasonable notice of the requirement and the intended disclosure, and disclosing only what is required.",
        },
      ],
    },
    {
      number: "6",
      heading: "Term",
      plainTerms:
        "The duty lasts three years from signing; information that stays confidential continues to be protected after that.",
      clauses: [
        {
          text: "This agreement takes effect on signing and continues for three years.",
        },
        {
          text: "Obligations continue to apply to information that remains confidential after the three-year period.",
        },
      ],
      reviewNote:
        "Solicitor to confirm the three-year term, whether trade secrets should survive indefinitely, and the notice period for required disclosure.",
    },
    {
      number: "7",
      heading: "Return or destruction",
      plainTerms:
        "On request, return or destroy the other side's confidential information and confirm it in writing.",
      clauses: [
        {
          text: "On written request, or when the purpose ends, return or permanently delete the other party's confidential information, including copies. Backups that cannot be practicably deleted remain subject to this agreement.",
        },
        {
          text: "Either party may ask for written confirmation that return or destruction has happened.",
        },
      ],
    },
    {
      number: "8",
      heading: "No licence or warranty",
      plainTerms:
        "This agreement only protects information. It grants no rights over the other side's IP and makes no promise about the information's value.",
      clauses: [
        {
          text: "This agreement does not grant any right or licence over either party's intellectual property.",
        },
        {
          text: "Confidential information is shared \"as is\". Neither party warrants its accuracy, completeness, or fitness for a purpose.",
        },
      ],
    },
    {
      number: "9",
      heading: "General",
      plainTerms:
        "Amendments must be in writing; this is the whole agreement on confidentiality.",
      clauses: [
        {
          text: "This agreement is the entire agreement between the parties about confidential information. Any amendment must be in writing and signed by both parties.",
        },
        {
          text: "Notices are effective when sent to each party's registered business email.",
        },
        { text: "There are no third-party beneficiaries to this agreement." },
        {
          text: "Governing law and forum: [to be inserted by qualified solicitor before execution].",
        },
      ],
      reviewNote:
        "The blank on governing law is deliberate. See the agreement-level reviewNote.",
    },
  ],
  changelog: [
    {
      version: "v1.2",
      date: "14 Sep 2026",
      change: "Structured as numbered clauses with plain-terms summaries; left governing law blank for review.",
      reason: "Plain-language drafting and the Part-0 flag on forum.",
    },
  ],
};

export const masterServices: LegalDoc = {
  slug: "master-services-agreement",
  name: "MASTER SERVICES AGREEMENT",
  family: "engagement",
  reference: "MSA-2026-009",
  version: "v2.0",
  issuedAt: "14 Sep 2026",
  updatedAt: "14 Sep 2026",
  status: "active",
  owner: "Hamza Khan",
  role: "Legal & Risk",
  lead: "The frame for a long-running relationship: services, payment, liability, termination.",
  parties: [bpulseParty, clientParty],
  reviewNote:
    "Three Part-0 flags: (1) governing law and forum for a Lahore studio and an overseas client; (2) the liability cap amount; (3) assignment of future IP works and enforceability in the client's jurisdiction.",
  signatureBlocks: [
    { party: "bpulse", name: "Authorised bpulse representative", title: "—" },
    { party: "client", name: "Authorised client representative", title: "—" },
  ],
  sections: [
    {
      number: "1",
      heading: "Services",
      plainTerms:
        "bpulse provides the services described in each signed Statement of Work under this agreement.",
      clauses: [
        {
          text: "A Statement of Work (\"SOW\") defines one engagement: deliverables, exclusions, acceptance criteria, timeline, and price.",
        },
        { text: "The SOW takes effect when signed. It is incorporated into this agreement." },
        { text: "A Change Order amends a signed SOW in writing and has effect when signed." },
      ],
    },
    {
      number: "2",
      heading: "Payment",
      plainTerms:
        "You pay the SOW price on the schedule it states. Late invoices pause the work.",
      clauses: [
        {
          text: "Invoices are due on the dates stated in the SOW unless agreed otherwise in writing.",
        },
        {
          text: "If an undisputed invoice is more than fifteen days late, bpulse may pause work until the invoice is paid, with the timeline extended by the delay.",
        },
        {
          text: "Amounts exclude taxes; the client is responsible for taxes it is legally required to pay.",
        },
      ],
    },
    {
      number: "3",
      heading: "Liability",
      plainTerms:
        "Neither side is liable for the other's lost profits or indirect losses; total liability is capped.",
      clauses: [
        {
          text: "Neither party is liable for the other's loss of profits, loss of data, or indirect or consequential loss, to the extent permitted by law.",
        },
        {
          text: "Each party's total liability under this agreement and the SOW is capped at the fees paid by the client in the twelve months before the claim. Replace with the agreed cap before execution.",
        },
      ],
      reviewNote: "Solicitor to set the caps and carve-outs for both parties for each jurisdiction.",
    },
    {
      number: "4",
      heading: "Warranties",
      plainTerms:
        "bpulse will do the work with professional care and rights to do so; both sides stand behind what they provide.",
      clauses: [
        {
          text: "bpulse warrants that services are performed with reasonable professional care and that the work does not knowingly infringe a third party's rights.",
        },
        {
          text: "Each party warrants it has the authority to enter this agreement.",
        },
      ],
    },
    {
      number: "5",
      heading: "Termination",
      plainTerms:
        "Either side can end the relationship on written notice; the client pays for work already done.",
      clauses: [
        {
          text: "Either party may terminate this agreement on thirty days' written notice.",
        },
        {
          text: "On termination, the client pays for completed work and committed, non-cancellable expenses, and each party returns or destroys the other's confidential information as the NDA requires.",
        },
      ],
    },
    {
      number: "6",
      heading: "Intellectual property",
      plainTerms:
        "Pre-existing IP stays where it is. New work is assigned under the separate IP assignment.",
      clauses: [
        {
          text: "Each party retains its pre-existing intellectual property.",
        },
        {
          text: "Rights in new deliverables transfer under the IP Assignment signed for the engagement. Nothing in this clause modifies it.",
        },
      ],
      reviewNote:
        "Part-0 item 3: assignment of future works may not bind in every jurisdiction. Solicitor to confirm the mechanism and any local-formality requirement.",
    },
    {
      number: "7",
      heading: "Confidentiality and data",
      plainTerms:
        "Confidentiality follows the signed NDA; personal data follows the signed DPA.",
      clauses: [
        {
          text: "Confidential information is governed by the Mutual NDA signed for the engagement.",
        },
        {
          text: "If the client sends personal data, the Data Processing Agreement signed for the engagement applies.",
        },
      ],
    },
    {
      number: "8",
      heading: "Governing law",
      plainTerms:
        "The forum for any dispute is set here by the reviewing solicitor.",
      clauses: [
        {
          text: "Governing law and forum: [to be inserted by qualified solicitor before execution].",
        },
      ],
      reviewNote: "Part-0 item 1. Deliberately blank until jurisdiction is confirmed.",
    },
    {
      number: "9",
      heading: "General",
      plainTerms:
        "This agreement and its SOWs are the whole deal; amendments are written and signed.",
      clauses: [
        { text: "This agreement, the SOWs, the NDA, and the DPA are the entire agreement." },
        { text: "Amendments must be in writing and signed by both parties." },
        { text: "There are no third-party beneficiaries." },
      ],
    },
  ],
  changelog: [
    {
      version: "v2.0",
      date: "14 Sep 2026",
      change: "Structured draft with flagged blanks for liability cap and governing law.",
      reason: "Render a reviewable frame instead of prose.",
    },
  ],
};

/** Statement of Work with two real versions to drive the diff view. */
export const sow: LegalDoc = {
  slug: "statement-of-work",
  name: "STATEMENT OF WORK",
  family: "engagement",
  reference: "SOW-2026-031",
  version: "v2.1",
  issuedAt: "28 Aug 2026",
  updatedAt: "03 Sep 2026",
  status: "active",
  owner: "Hamza Khan",
  role: "Legal & Risk",
  lead: "The scope-lock document: deliverables, exclusions, acceptance, timeline.",
  parties: [bpulseParty, clientParty],
  reviewNote:
    "Acceptance criteria and the invoice schedule must be agreed before execution. Change Orders modify this SOW in writing.",
  signatureBlocks: [
    { party: "bpulse", name: "Authorised bpulse representative", title: "—" },
    { party: "client", name: "Authorised client representative", title: "—" },
  ],
  sections: [
    {
      number: "1",
      heading: "Engagement",
      plainTerms: "One fixed-scope engagement under the MSA, priced and locked before code.",
      clauses: [
        { text: "This SOW is an engagement under the Master Services Agreement signed for the client." },
        { text: "Total price: $55,000. Timeline: 21 business days from the signed date." },
      ],
    },
    {
      number: "2",
      heading: "In scope",
      plainTerms: "The work is the deliverables listed here, nothing else.",
      clauses: [
        { text: "Deliverable A: registration flow hardening for the listed failure modes." },
        { text: "Deliverable B: public launch pages and copy for the launch sentence." },
        { text: "Deliverable C: one-time password-reset tokens on first success, with fifteen-minute expiry. [v2.1]" },
      ],
    },
    {
      number: "3",
      heading: "Out of scope",
      plainTerms: "Anything not in the deliverables is a change order, priced separately.",
      clauses: [
        { text: "Mobile app changes, data migration beyond the listed tables, and marketing design are out of scope." },
        { text: "A request that changes scope is a Change Order: priced, signed, and appended to this SOW." },
      ],
    },
    {
      number: "4",
      heading: "Acceptance criteria",
      plainTerms: "Each deliverable is approved when it meets its written criteria.",
      clauses: [
        { text: "Registration hardening is accepted when the failure modes in scope no longer reproduce in a staging environment against real flows." },
        { text: "Reset tokens are accepted when a used token is rejected on second use and expires after fifteen minutes. [v2.1]" },
        { text: "The client has ten business days to raise defects after handover; silence counts as acceptance." },
      ],
      reviewNote: "Solicitor to confirm whether deemed-acceptance on silence is enforceable in the client's jurisdiction.",
    },
    {
      number: "5",
      heading: "Invoices",
      plainTerms: "Billed in the schedule below; payment terms follow the MSA.",
      clauses: [
        { text: "Invoice 1 — 50% at signing." },
        { text: "Invoice 2 — 40% at delivery of the deliverables for review." },
        { text: "Invoice 3 — 10% at handover." },
      ],
    },
    {
      number: "6",
      heading: "Handover",
      plainTerms: "You leave with the keys: codebase, runbooks, and revoked access.",
      clauses: [
        { text: "Handover includes the handover certificate, runbooks, and credentials transfer." },
        { text: "The handover certificate records the dated access-revocation log." },
      ],
    },
  ],
  changelog: [
    {
      version: "v2.0",
      date: "14 Aug 2026",
      change: "Registered as fixed-scope: registration harden + launch sentence.",
      reason: "Lock the scope before build.",
    },
    {
      version: "v2.1",
      date: "18 Aug 2026",
      change: "Added deliverable C and acceptance: password-reset token one-time use, fifteen-minute expiry.",
      reason: "Change order 01 followed the first finding.",
    },
  ],
  versions: [
    {
      version: "v2.0",
      issuedAt: "14 Aug 2026",
      note: "Original locked scope.",
      sections: [
        {
          number: "1",
          heading: "Engagement",
          plainTerms: "One fixed-scope engagement under the MSA.",
          clauses: [
            { text: "This SOW is an engagement under the Master Services Agreement signed for the client." },
            { text: "Total price: $55,000. Timeline: 21 business days from the signed date." },
          ],
        },
        {
          number: "2",
          heading: "In scope",
          plainTerms: "The work is the deliverables listed here, nothing else.",
          clauses: [
            { text: "Deliverable A: registration flow hardening for the listed failure modes." },
            { text: "Deliverable B: public launch pages and copy for the launch sentence." },
          ],
        },
        {
          number: "3",
          heading: "Out of scope",
          plainTerms: "Anything not in the deliverables is a change order.",
          clauses: [
            { text: "Mobile app changes, data migration beyond the listed tables, and marketing design are out of scope." },
            { text: "A request that changes scope is a Change Order: priced, signed, and appended to this SOW." },
          ],
        },
        {
          number: "4",
          heading: "Acceptance criteria",
          plainTerms: "Each deliverable is approved when it meets its written criteria.",
          clauses: [
            { text: "Registration hardening is accepted when the failure modes in scope no longer reproduce in a staging environment against real flows." },
            { text: "The client has ten business days to raise defects after handover; silence counts as acceptance." },
          ],
        },
        {
          number: "5",
          heading: "Invoices",
          plainTerms: "Billed in the schedule below; payment terms follow the MSA.",
          clauses: [
            { text: "Invoice 1 — 50% at signing." },
            { text: "Invoice 2 — 40% at delivery of the deliverables for review." },
            { text: "Invoice 3 — 10% at handover." },
          ],
        },
        {
          number: "6",
          heading: "Handover",
          plainTerms: "You leave with the keys.",
          clauses: [
            { text: "Handover includes the handover certificate, runbooks, and credentials transfer." },
          ],
        },
      ],
    },
  ],
};

export const changeOrder: LegalDoc = {
  slug: "change-order",
  name: "CHANGE ORDER",
  family: "engagement",
  reference: "CO-2026-047",
  version: "v1.0",
  issuedAt: "03 Sep 2026",
  updatedAt: "03 Sep 2026",
  status: "active",
  owner: "Hamza Khan",
  role: "Legal & Risk",
  lead: "The priced, signed amendment appended to the SOW. Nothing is absorbed silently.",
  parties: [bpulseParty, clientParty],
  signatureBlocks: [
    { party: "bpulse", name: "Authorised bpulse representative", title: "—" },
    { party: "client", name: "Authorised client representative", title: "—" },
  ],
  sections: [
    {
      number: "1",
      heading: "Changes to scope",
      plainTerms: "This order amends the SOW in writing and adds priced work.",
      clauses: [
        { text: "This Change Order amends Statement of Work SOW-2026-031." },
        { text: "The change: one-time password-reset tokens with a fifteen-minute expiry, plus the matching acceptance test." },
      ],
    },
    {
      number: "2",
      heading: "Price",
      plainTerms: "The change costs $2,400, billed on the existing schedule.",
      clauses: [{ text: "Price: $2,400, added to the next invoice under the MSA." }],
    },
    {
      number: "3",
      heading: "Timeline",
      plainTerms: "Two business days added to the SOW timeline.",
      clauses: [{ text: "The SOW timeline extends by two business days." }],
    },
    {
      number: "4",
      heading: "Acceptance",
      plainTerms: "The changed deliverable follows the SOW acceptance rules.",
      clauses: [
        {
          text: "Acceptance for the changed deliverable follows clause 4 of the SOW, as amended by this order.",
        },
      ],
    },
  ],
  changelog: [
    {
      version: "v1.0",
      date: "03 Sep 2026",
      change: "Initial order for scope change.",
      reason: "Price the change before doing it.",
    },
  ],
};

export const ipAssignment: LegalDoc = {
  slug: "ip-assignment",
  name: "IP ASSIGNMENT",
  family: "engagement",
  reference: "IPA-2026-012",
  version: "v1.0",
  issuedAt: "14 Sep 2026",
  updatedAt: "14 Sep 2026",
  status: "active",
  owner: "Hamza Khan",
  role: "Legal & Risk",
  lead: "Explicit transfer of new work on payment, naming what is assigned and what stays ours.",
  parties: [bpulseParty, clientParty],
  reviewNote:
    "Part-0 item 3: assignment of future (not-yet-created) works varies by jurisdiction. Solicitor to confirm the mechanism and any local formalities for the client's jurisdiction.",
  signatureBlocks: [
    { party: "bpulse", name: "Authorised bpulse representative", title: "—" },
    { party: "client", name: "Authorised client representative", title: "—" },
  ],
  sections: [
    {
      number: "1",
      heading: "Assignment",
      plainTerms:
        "On payment, bpulse assigns the new work to the client, worldwide, for good.",
      clauses: [
        {
          text: "On payment of the applicable invoice, bpulse irrevocably assigns to the client all rights in the deliverable code, including copyright, to the extent it was created for the engagement.",
        },
        {
          text: "The transfer is worldwide and free of encumbrance, and includes the right to use, modify, and sublicense the deliverables.",
        },
      ],
    },
    {
      number: "2",
      heading: "Future works",
      plainTerms:
        "Rights in work not yet created transfer at the moment it is created.",
      clauses: [
        {
          text: "To the extent permitted by law, this assignment applies to work created after this document is signed but within the engagement.",
        },
        {
          text: "Where a jurisdiction requires an additional formality for future works, each party will sign any reasonable document needed to perfect the transfer.",
        },
      ],
      reviewNote: "Assignment of future works — confirm enforceability (Part-0 item 3).",
    },
    {
      number: "3",
      heading: "What stays ours",
      plainTerms: "bpulse keeps its tooling, libraries, and know-how.",
      clauses: [
        {
          text: "bpulse retains its pre-existing tooling, libraries, templates, and the general know-how of its crew.",
        },
        {
          text: "bpulse grants the client a perpetual, royalty-free right to use retained tooling embedded in the deliverables only to run and modify those deliverables.",
        },
      ],
    },
    {
      number: "4",
      heading: "Warranties",
      plainTerms:
        "bpulse confirms the work is its own and free of third-party claims.",
      clauses: [
        {
          text: "bpulse warrants that the deliverables were created for the engagement and do not knowingly infringe a third party's rights.",
        },
      ],
    },
    {
      number: "5",
      heading: "Governing law",
      plainTerms: "Set by the reviewing solicitor before execution.",
      clauses: [
        { text: "Governing law and forum: [to be inserted by qualified solicitor before execution]." },
      ],
    },
  ],
  changelog: [
    {
      version: "v1.0",
      date: "14 Sep 2026",
      change: "Initial structured draft.",
      reason: "Create a reviewable IP assignment baseline.",
    },
  ],
};

export const dataProcessing: LegalDoc = {
  slug: "data-processing-agreement",
  name: "DATA PROCESSING AGREEMENT",
  family: "engagement",
  reference: "DPA-2026-003",
  version: "v1.0",
  issuedAt: "14 Sep 2026",
  updatedAt: "14 Sep 2026",
  status: "active",
  owner: "Hamza Khan",
  role: "Legal & Risk",
  lead: "Signed with any client that sends personal data. Non-optional for EU engagements.",
  parties: [bpulseParty, clientParty],
  reviewNote:
    "Part-0 item 2: Pakistan has no EU adequacy decision. For EU data, this agreement must attach the Standard Contractual Clauses (Commission Implementing Decision (EU) 2021/914) as module two or three, with the correct annexes. Counsel to confirm the current version and complete Annex I–III.",
  signatureBlocks: [
    { party: "bpulse", name: "Authorised bpulse representative", title: "—" },
    { party: "client", name: "Authorised client representative", title: "—" },
  ],
  sections: [
    {
      number: "1",
      heading: "Roles",
      plainTerms:
        "The client decides what data goes into the work; bpulse processes it on the client's instructions.",
      clauses: [
        {
          text: "The client is the controller (or the processor, where the client processes on a third party's behalf) and bpulse is the processor for the purposes of this agreement.",
        },
        {
          text: "bpulse processes personal data only on the client's documented instructions and only for the engagement.",
        },
      ],
    },
    {
      number: "2",
      heading: "Data described",
      plainTerms:
        "The data covered is personal data the client puts into the systems under this engagement.",
      clauses: [
        {
          text: "Covered data: personal data in client production data, test fixtures, or customer records that arrives in the codebases and systems bpulse works under this engagement.",
        },
      ],
    },
    {
      number: "3",
      heading: "Sub-processors",
      plainTerms: "bpulse only uses the named sub-processors, with data hosted where listed.",
      clauses: [
        { text: "Vercel — hosting and edge infrastructure." },
        { text: "Neon — managed Postgres for intake and application records; host region per deployment and recorded in the sub-processor register." },
        { text: "Upstash — Redis for rate limits and selected counters." },
        { text: "Resend — transactional email delivery." },
        {
          text: "bpulse will not add a sub-processor without notice and written consent, which may not be unreasonably withheld.",
        },
      ],
      reviewNote:
        "Confirm current regions for Neon, Upstash, Resend, and Vercel before execution; record them in Annex I of any SCC set.",
    },
    {
      number: "4",
      heading: "Transfers",
      plainTerms:
        "Data may move across borders; for EU data this is covered by Standard Contractual Clauses attached to this agreement.",
      clauses: [
        {
          text: "Where data is transferred outside the European Economic Area, the Standard Contractual Clauses attached to this agreement apply.",
        },
        {
          text: "This clause exists because Pakistan currently has no EU adequacy decision; the SCCs are the transfer mechanism EU procurement will ask for by name.",
        },
      ],
      reviewNote: "Part-0 item 2. Attach completed SCCs (2021/914) before execution.",
    },
    {
      number: "5",
      heading: "Security",
      plainTerms:
        "bpulse uses the controls described on its security page and keeps confidentiality duties.",
      clauses: [
        {
          text: "bpulse applies the technical and organisational measures described at bpulse.dev/security.",
        },
        { text: "bpulse personnel are bound by studio confidentiality agreements." },
        {
          text: "On a personal-data breach affecting the client's data, bpulse notifies the client without undue delay.",
        },
      ],
    },
    {
      number: "6",
      heading: "Client assistance",
      plainTerms:
        "bpulse helps the client answer data-subject requests and regulator enquiries.",
      clauses: [
        {
          text: "bpulse makes a named contact available (hamza@bpulse.dev) for data-subject requests and supports the client in responding.",
        },
      ],
    },
    {
      number: "7",
      heading: "Deletion",
      plainTerms:
        "When the engagement ends, client data is returned or deleted from bpulse systems.",
      clauses: [
        {
          text: "On termination of the engagement, bpulse returns or deletes the client's personal data, unless retention is required by law.",
        },
      ],
    },
  ],
  changelog: [
    {
      version: "v1.0",
      date: "14 Sep 2026",
      change: "Initial structured draft with named sub-processors and SCC hook.",
      reason: "Create a reviewable DPA baseline for EU procurement.",
    },
  ],
};

export const handoverCertificate: LegalDoc = {
  slug: "handover-certificate",
  name: "HANDOVER CERTIFICATE",
  family: "engagement",
  reference: "HC",
  version: "v1.0",
  issuedAt: "—",
  updatedAt: "14 Sep 2026",
  status: "not-reached",
  owner: "Hamza Khan",
  role: "Legal & Risk",
  lead: "Records what was delivered, credentials transferred, and access revoked with a dated log.",
  parties: [bpulseParty, clientParty],
  reviewNote:
    "Fill the dated access-revocation log at completion; the certificate is evidence for the 'no hostage codebases' claim.",
  signatureBlocks: [
    { party: "bpulse", name: "Authorised bpulse representative", title: "—" },
    { party: "client", name: "Authorised client representative", title: "—" },
  ],
  sections: [
    {
      number: "1",
      heading: "Delivered items",
      plainTerms: "Lists what the client now holds.",
      clauses: [
        { text: "The deliverables under SOW reference: source code repositories, documentation, and runbooks." },
        { text: "Accessible copy of the environment configuration needed to run the product." },
      ],
    },
    {
      number: "2",
      heading: "Acceptance of handover",
      plainTerms: "Signing this confirms the handover is complete and accepted.",
      clauses: [
        { text: "The client confirms the delivered items are received and the acceptance criteria in the SOW are met." },
      ],
    },
    {
      number: "3",
      heading: "Credentials transferred",
      plainTerms: "Production and service credentials are handed to the client.",
      clauses: [
        { text: "Credentials for production and the named service accounts were transferred on the date signed." },
      ],
    },
    {
      number: "4",
      heading: "Access revoked",
      plainTerms: "Studio access is cut off, logged by date.",
      clauses: [
        { text: "bpulse's access to client-owned systems and repositories was revoked on: [date]." },
        { text: "The dated revocation log is appended to this certificate." },
      ],
    },
    {
      number: "5",
      heading: "Residual obligations",
      plainTerms: "Confidentiality and data duties survive handover.",
      clauses: [
        { text: "The NDA and DPA continue to apply after this handover." },
      ],
    },
  ],
  changelog: [
    {
      version: "v1.0",
      date: "14 Sep 2026",
      change: "Initial structured draft.",
      reason: "Create the completion record that makes handover provable.",
    },
  ],
};

export const engagementDocs = [
  mutualNda,
  masterServices,
  sow,
  changeOrder,
  ipAssignment,
  dataProcessing,
  handoverCertificate,
];