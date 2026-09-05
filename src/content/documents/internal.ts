import type { LegalDoc } from "./types";
import { bpulseParty } from "./engagements";

export const crewParty = {
  key: "crew",
  name: "Crew member",
  entity: "A named member of the bpulse crew",
  jurisdiction: "Their country of residence",
} as const;

export const candidateParty = {
  key: "candidate",
  name: "Candidate",
  entity: "The candidate completing the work sample",
  jurisdiction: "Their country of residence",
} as const;

export const crewAgreement: LegalDoc = {
  slug: "crew-agreement",
  name: "CREW AGREEMENT",
  family: "internal",
  reference: "BP-CREW",
  version: "v1.0",
  issuedAt: "14 Sep 2026",
  updatedAt: "14 Sep 2026",
  status: "active",
  owner: "Hamza Khan",
  role: "Legal & Risk",
  lead: "Makes the 'under studio contract' claim real for every person on the crew.",
  parties: [bpulseParty, crewParty],
  reviewNote:
    "Solicitor to confirm the relationship is a contract-for-services and not employment under the crew member's domestic laws, and to set governing law defaults.",
  signatureBlocks: [
    { party: "bpulse", name: "Authorised bpulse representative", title: "—" },
    { party: "crew", name: "Crew member", title: "—" },
  ],
  sections: [
    {
      number: "1",
      heading: "Relationship",
      plainTerms:
        "Crew members are independent providers engaged per engagement, not employees.",
      clauses: [
        {
          text: "The crew member provides services to bpulse as an independent contractor, engaged per engagement.",
        },
        {
          text: "Nothing in this agreement creates an employment, partnership, or agency relationship.",
        },
      ],
    },
    {
      number: "2",
      heading: "Obligations",
      plainTerms:
        "Do the assigned work with professional care, keep client trust, and follow studio standards.",
      clauses: [
        {
          text: "Deliver assigned work to the standard described in the studio's published standard.",
        },
        {
          text: "Follow the studio's security practices and client-handling rules.",
        },
      ],
    },
    {
      number: "3",
      heading: "Confidentiality",
      plainTerms:
        "Client information stays confidential; the crew member is bound by the studio's client NDAs.",
      clauses: [
        {
          text: "Crew members treat all client information as confidential under the studio's NDAs with clients.",
        },
        {
          text: "Client credentials are used only for the assignment and never shared.",
        },
      ],
    },
    {
      number: "4",
      heading: "Intellectual property",
      plainTerms:
        "Work done for clients is assigned to bpulse so the client IP transfer is clean.",
      clauses: [
        {
          text: "All work produced for an engagement is assigned to bpulse at the moment of creation.",
        },
        {
          text: "The crew member keeps their pre-existing tools and personal portfolio rights for code they wrote, subject to client confidentiality.",
        },
      ],
    },
    {
      number: "5",
      heading: "Payment",
      plainTerms: "Paid per agreed engagement terms, after client payments clear where agreed.",
      clauses: [
        {
          text: "Payment is per the engagement terms agreed in writing for each project.",
        },
        {
          text: "Payment is made after the studio receives the corresponding client payment where that is the agreed arrangement.",
        },
      ],
    },
    {
      number: "6",
      heading: "Term",
      plainTerms: "Active when a crew member signs; either side can end it on written notice.",
      clauses: [
        {
          text: "This agreement applies while the crew member works with bpulse and for the survival periods of the sections above.",
        },
        {
          text: "Either side may end it in writing; confidentiality and IP clauses survive.",
        },
      ],
    },
  ],
  changelog: [
    {
      version: "v1.0",
      date: "14 Sep 2026",
      change: "Initial structured draft.",
      reason: "Back the 'under studio contract' claim with a real instrument.",
    },
  ],
};

export const gate2Sample: LegalDoc = {
  slug: "gate-2-work-sample",
  name: "GATE 2 WORK SAMPLE AGREEMENT",
  family: "internal",
  reference: "BP-GATE2",
  version: "v1.0",
  issuedAt: "14 Sep 2026",
  updatedAt: "14 Sep 2026",
  status: "active",
  owner: "Hamza Khan",
  role: "Legal & Risk",
  lead: "The terms for the paid Gate 2 sample: payment, IP in the sample, confidentiality.",
  parties: [bpulseParty, candidateParty],
  reviewNote:
    "Confirm the sample fee, whether IP in the sample transfers on payment, and the confidentiality scope relative to the candidate's other work.",
  signatureBlocks: [
    { party: "bpulse", name: "Authorised bpulse representative", title: "—" },
    { party: "candidate", name: "Candidate", title: "—" },
  ],
  sections: [
    {
      number: "1",
      heading: "The sample",
      plainTerms:
        "Gate 2 is a paid work sample using a studio-written brief and a snapshot of a real failure.",
      clauses: [
        {
          text: "The candidate completes the sample using the brief and repository provided by bpulse under the application's gate process.",
        },
      ],
    },
    {
      number: "2",
      heading: "Payment",
      plainTerms: "The sample pays an agreed fee on submission.",
      clauses: [
        {
          text: "bpulse pays the agreed sample fee within thirty days of a submitted sample.",
        },
      ],
    },
    {
      number: "3",
      heading: "Intellectual property in the sample",
      plainTerms:
        "The sample code is owned by the candidate until paid; payment transfers it to bpulse.",
      clauses: [
        {
          text: "Any code the candidate writes is owned by the candidate until bpulse pays for it.",
        },
        {
          text: "At the moment bpulse pays the sample fee, that code is assigned to bpulse.",
        },
      ],
      reviewNote: "Confirm the assignment-on-payment mechanism in the candidate's jurisdiction.",
    },
    {
      number: "4",
      heading: "Confidentiality",
      plainTerms: "The brief's failure case stays confidential; the candidate may not post it.",
      clauses: [
        {
          text: "The brief, the repository, and the failure case are confidential to bpulse and the candidate.",
        },
        {
          text: "The candidate will not publish the brief or the sample until bpulse approves.",
        },
      ],
    },
    {
      number: "5",
      heading: "Evaluation",
      plainTerms: "The studio scores the sample against its published rubric.",
      clauses: [
        {
          text: "The sample is scored against the six-criteria rubric published on the careers page.",
        },
        {
          text: "A decision to move to Gate 3 (paid introduction) is communicated in writing.",
        },
      ],
    },
  ],
  changelog: [
    {
      version: "v1.0",
      date: "14 Sep 2026",
      change: "Initial structured draft.",
      reason: "Make the paid sample's payment, IP, and confidentiality explicit.",
    },
  ],
};

export const vulnerabilityDisclosure: LegalDoc = {
  slug: "vulnerability-disclosure",
  name: "VULNERABILITY DISCLOSURE POLICY",
  family: "internal",
  reference: "BP-VDP",
  version: "v1.0",
  issuedAt: "14 Sep 2026",
  updatedAt: "14 Sep 2026",
  status: "active",
  owner: "Hamza Khan",
  role: "Legal & Risk",
  lead: "How researchers can report a security issue and what we commit to in return. Public.",
  parties: [bpulseParty],
  reviewNote:
    "Confirm safe-harbour scope and whether a bug-bounty reward applies. Nothing here promises a reward unless stated.",
  signatureBlocks: [],
  sections: [
    {
      number: "1",
      heading: "Scope",
      plainTerms: "The security issues we want reported are in bpulse's own applications and infra.",
      clauses: [
        {
          text: "This policy covers security issues in bpulse's own applications, sub-domains under bpulse.dev, and infrastructure bpulse operates.",
        },
      ],
    },
    {
      number: "2",
      heading: "How to report",
      plainTerms: "Report to security@bpulse.dev with as much detail as you can.",
      clauses: [
        {
          text: "Send a written report to security@bpulse.dev: what is affected, reproduction steps, and impact.",
        },
        {
          text: "One issue per report where practical, and no automated scanning that disrupts service.",
        },
      ],
    },
    {
      number: "3",
      heading: "What we ask",
      plainTerms:
        "Do not test in ways that put real client data at risk, and give us a chance to fix before publication.",
      clauses: [
        {
          text: "Do not access or exfiltrate production client data beyond what is needed to prove the issue.",
        },
        {
          text: "Give us reasonable time to fix before the issue is published.",
        },
      ],
    },
    {
      number: "4",
      heading: "What we promise",
      plainTerms:
        "We confirm receipt, keep you updated, and do not pursue legal action for good-faith research under this policy.",
      clauses: [
        {
          text: "We confirm receipt of a valid report within five business days and keep a named contact on the case.",
        },
        {
          text: "Good-faith research that follows this policy will not be met with legal action.",
        },
      ],
    },
    {
      number: "5",
      heading: "Public disclosure",
      plainTerms: "We agree disclosure timing with the reporter before anything becomes public.",
      clauses: [
        {
          text: "We agree a disclosure date with the reporter, ordinarily after a fix is deployed or the risk is accepted in writing.",
        },
      ],
    },
  ],
  changelog: [
    {
      version: "v1.0",
      date: "14 Sep 2026",
      change: "Initial structured draft.",
      reason: "Give researchers a written, safe route instead of silence.",
    },
  ],
};

export const internalDocs = [crewAgreement, gate2Sample, vulnerabilityDisclosure];