import type { LegalDoc } from "./types";
import { subProcessors } from "@/content/legal/vendors";
import { vulnerabilityDisclosure } from "./internal";

/** Pairs with the actual intake endpoints; claims must match code behaviour. */
export const siteParties = {
  bpulse: {
    key: "bpulse",
    name: "bpulse",
    entity: "Breakthrough Pulse",
    jurisdiction: "Lahore, Punjab, Pakistan",
    email: "contact@bpulse.dev",
  },
  visitor: {
    key: "client",
    name: "The visitor",
    entity: "The person using this site",
    jurisdiction: "As stated in their submission",
  },
} as const;

export const siteTerms: LegalDoc = {
  slug: "terms",
  aliases: ["terms-of-service"],
  name: "TERMS OF SERVICE",
  family: "public",
  reference: "BP-TERMS",
  version: "v0.3",
  issuedAt: "12 Sep 2026",
  updatedAt: "12 Sep 2026",
  status: "current",
  owner: "Hamza Khan",
  role: "Legal & Risk",
  lead: "The rules for using bpulse's site and services when no signed client agreement applies.",
  parties: [siteParties.bpulse, siteParties.visitor],
  signatureBlocks: [],
  sections: [
    {
      number: "1",
      heading: "Who we are",
      plainTerms:
        "bpulse is a Pakistan-based software studio and these terms cover our site and services.",
      clauses: [
        {
          text: 'Breakthrough Pulse ("bpulse", "we", "us") operates from Lahore, Punjab, Pakistan.',
        },
        {
          text: "These terms apply to our website and to service engagements unless superseded by a signed client agreement.",
        },
      ],
    },
    {
      number: "2",
      heading: "What we do",
      plainTerms: "We run diagnostics, fixed-scope builds, and optional post-launch support.",
      clauses: [
        { text: "The Check is a diagnostic. The Close is fixed-scope delivery. Standing is optional post-launch support." },
        { text: "Specific scope, timeline, and pricing are defined in writing for each engagement." },
      ],
    },
    {
      number: "3",
      heading: "Scope and delivery",
      plainTerms:
        "Scope is written and versioned; changes require a signed change order.",
      clauses: [
        { text: "No build work starts until scope is written and accepted by both sides." },
        { text: "If scope changes, we price and document the change before implementation." },
      ],
    },
    {
      number: "4",
      heading: "IP and confidentiality",
      plainTerms:
        "Client IP stays client-owned; new work is assigned in writing once payment terms are met.",
      clauses: [
        { text: "You keep ownership of your pre-existing code, data, and materials." },
        { text: "New deliverables are assigned as agreed in the signed project documents." },
      ],
    },
    {
      number: "5",
      heading: "Liability and disputes",
      plainTerms:
        "Liability is capped to fees paid for the engagement; dispute handling is defined in writing.",
      clauses: [
        { text: "Our liability is limited to fees paid for the specific engagement, to the extent permitted by law." },
        {
          text: "Dispute path, governing law, and forum are finalised in signed client documents.",
        },
      ],
      reviewNote:
        "Solicitor to decide the default governing law and forum for the site terms, and whether a B2B clause or a consumer clause applies on the public site.",
    },
    {
      number: "6",
      heading: "Contact",
      plainTerms: "Questions and notices go to contact@bpulse.dev.",
      clauses: [{ text: "Notices under these terms are effective when sent to contact@bpulse.dev." }],
    },
  ],
  changelog: [
    {
      version: "v0.3",
      date: "12 Sep 2026",
      change: "Split marketing language from enforceable terms and moved law/forum to signed contracts.",
      reason: "Avoid false certainty across jurisdictions.",
    },
  ],
};

export const sitePrivacy: LegalDoc = {
  slug: "privacy-policy",
  name: "PRIVACY POLICY",
  family: "public",
  reference: "BP-PRIVACY",
  version: "v0.5",
  issuedAt: "12 Sep 2026",
  updatedAt: "06 Sep 2026",
  status: "current",
  owner: "Hamza Khan",
  role: "Legal & Risk",
  lead: "What the site collects from the fields people type in, and where it sits.",
  parties: [siteParties.bpulse, siteParties.visitor],
  signatureBlocks: [],
  sections: [
    {
      number: "1",
      heading: "What we collect",
      plainTerms:
        "We collect the fields people type into intake forms and selected operational event data.",
      clauses: [
        { text: "Intake submissions include fields like name, email, project details, budget, and timeline." },
        { text: "Match events store the typed business description and suggested matches. Private report views log timestamp and slug only." },
      ],
    },
    {
      number: "2",
      heading: "Analytics and tracking boundaries",
      plainTerms:
        "Public pages use self-hosted cookieless analytics. Portal pages use product analytics after sign-in.",
      clauses: [
        { text: "Public pages use self-hosted Umami with no cookies." },
        { text: "Umami records page path, referrer, country, device type, and a daily rotating non-reversible hash built from IP and user agent with salt." },
        { text: "Umami does not record typed form text, email addresses, or company names." },
        { text: "Portal product analytics use PostHog after login under signed engagement terms." },
      ],
    },
    {
      number: "3",
      heading: "Where data is processed",
      plainTerms:
        "Data is processed through managed Postgres, Redis counters, transactional email, and self-hosted analytics infrastructure.",
      clauses: [
        { text: "Submission data is saved to managed Postgres (Neon) when configured, and to a local development store when no database is configured." },
        { text: "Rate limiting and view counters are backed by Upstash Redis. Email notifications are sent through Resend when enabled." },
        { text: "Public analytics runs on a self-hosted Umami deployment on bpulse infrastructure. No visitor analytics request is sent to a third-party analytics host." },
        { text: "The site is hosted on Vercel." },
        {
          text: `Named sub-processors: ${subProcessors.map((row) => row.name).join(", ")}. Regions and roles are on /legal/sub-processors and /legal/data.`,
        },
      ],
    },
    {
      number: "4",
      heading: "Retention and deletion",
      plainTerms:
        "There is no automated retention job yet; deletion is currently handled by request.",
      clauses: [
        { text: "Contact us at contact@bpulse.dev to request correction or deletion." },
        { text: "A formal retention schedule will be published when implemented in production." },
      ],
      reviewNote:
        "Solicitor to confirm a defensible retention schedule and whether the EU personal-data route needs Standard Contractual Clauses with the sub-processors below.",
    },
    {
      number: "5",
      heading: "Contact",
      plainTerms: "Privacy and legal data questions are routed to a named owner.",
      clauses: [
        { text: "For privacy matters, email contact@bpulse.dev." },
        {
          text: "For legal and risk matters, email hamza@bpulse.dev. Legal owner: Hamza Khan (bpulse team profile: /team/hamza).",
        },
      ],
    },
  ],
  changelog: [
    {
      version: "v0.5",
      date: "06 Sep 2026",
      change: "Added public cookieless analytics and portal-only product analytics boundaries.",
      reason: "Keep published policy accurate to deployed tracking behavior.",
    },
  ],
};

export const siteCookies: LegalDoc = {
  slug: "cookie-policy",
  name: "COOKIE POLICY",
  family: "public",
  reference: "BP-COOKIE",
  version: "v0.3",
  issuedAt: "08 Sep 2026",
  updatedAt: "06 Sep 2026",
  status: "current",
  owner: "Hamza Khan",
  role: "Legal & Risk",
  lead: "The site's cookie posture, stated as it currently is.",
  parties: [siteParties.bpulse, siteParties.visitor],
  signatureBlocks: [],
  sections: [
    {
      number: "1",
      heading: "Public site cookies",
      plainTerms: "The public site sets no cookies.",
      clauses: [
        { text: "Public pages set no analytics, advertising, or session-recording cookies." },
        { text: "Public analytics uses self-hosted Umami in cookieless mode." },
        { text: "No consent banner is shown on public pages because no public cookie category requiring consent is in use." },
      ],
    },
    {
      number: "2",
      heading: "Portal session cookie",
      plainTerms: "The authenticated portal sets one session cookie for access control.",
      clauses: [
        { text: "Cookie name: __Host-bpulse-studio." },
        { text: "Purpose: authenticated access to internal and portal routes." },
        { text: "Flags: Secure, HttpOnly, SameSite=Strict, Path=/, short max-age." },
      ],
    },
    {
      number: "3",
      heading: "External links",
      plainTerms: "Linked third-party sites may use their own cookies.",
      clauses: [{ text: "This policy applies to bpulse properties only." }],
    },
  ],
  changelog: [
    {
      version: "v0.3",
      date: "06 Sep 2026",
      change: "Split public cookieless posture from authenticated session cookie policy.",
      reason: "Keep cookie policy accurate after portal auth and analytics changes.",
    },
  ],
};

export const siteAccessibility: LegalDoc = {
  slug: "accessibility",
  aliases: ["accessibility-statement"],
  name: "ACCESSIBILITY STATEMENT",
  family: "public",
  reference: "BP-ACCESS",
  version: "v0.2",
  issuedAt: "08 Sep 2026",
  updatedAt: "08 Sep 2026",
  status: "current",
  owner: "Hamza Khan",
  role: "Legal & Risk",
  lead: "Where the site is on accessibility and how to report a barrier.",
  parties: [siteParties.bpulse, siteParties.visitor],
  signatureBlocks: [],
  sections: [
    {
      number: "1",
      heading: "Commitment",
      plainTerms: "We are actively improving accessibility and do not claim a completed audit.",
      clauses: [
        { text: "Core routes are built with semantic HTML and keyboard focus order in mind." },
        { text: "A full screen-reader and assistive-tech matrix is not complete yet." },
      ],
    },
    {
      number: "2",
      heading: "Known limits",
      plainTerms: "Some interactions and media treatments still need broader testing.",
      clauses: [
        { text: "Reduced-motion preferences are respected in key surfaces but have not been fully audited page by page." },
        { text: "If you hit a barrier, report it and we will prioritise remediation." },
      ],
    },
    {
      number: "3",
      heading: "Contact",
      plainTerms: "Accessibility concerns go to a monitored inbox with a one-business-day reply target.",
      clauses: [{ text: "Email contact@bpulse.dev with route and issue details." }],
    },
  ],
  changelog: [
    {
      version: "v0.2",
      date: "08 Sep 2026",
      change: "Trimmed unsupported claims and added explicit non-audit disclosure.",
      reason: "Avoid overstating accessibility readiness.",
    },
  ],
};

export const siteComplaints: LegalDoc = {
  slug: "complaints",
  name: "COMPLAINTS & DISPUTE RESOLUTION",
  family: "public",
  reference: "BP-COMPLAINTS",
  version: "v0.1",
  issuedAt: "05 Sep 2026",
  updatedAt: "05 Sep 2026",
  status: "current",
  owner: "Hamza Khan",
  role: "Legal & Risk",
  lead: "A written complaint route with response timings.",
  parties: [siteParties.bpulse, siteParties.visitor],
  signatureBlocks: [],
  sections: [
    {
      number: "1",
      heading: "How to raise a complaint",
      plainTerms: "Email the issue, what happened, and what outcome you want.",
      clauses: [
        { text: "Send complaints to contact@bpulse.dev with the subject line 'Complaint'." },
        { text: "We acknowledge within two business days." },
      ],
    },
    {
      number: "2",
      heading: "How we handle it",
      plainTerms: "A senior reviewer who is not the subject handles the case.",
      clauses: [
        { text: "We provide a substantive response within ten business days when possible." },
        { text: "If timing changes, we say so in writing." },
      ],
    },
    {
      number: "3",
      heading: "Escalation",
      plainTerms: "If unresolved, we offer mediation before litigation where practical.",
      clauses: [{ text: "Mediation provider and cost sharing are agreed case by case." }],
      reviewNote:
        "Solicitor to decide a default mediation provider and whether enforcement clauses are needed for client-facing disputes.",
    },
    {
      number: "4",
      heading: "Contact",
      plainTerms: "The legal owner's details are listed for direct routing.",
      clauses: [{ text: "Hamza Khan · Legal & Risk · hamza@bpulse.dev" }],
    },
  ],
  changelog: [
    {
      version: "v0.1",
      date: "05 Sep 2026",
      change: "Initial publication.",
      reason: "Create a written complaint route with response timings.",
    },
  ],
};

export const siteSubProcessors: LegalDoc = {
  slug: "sub-processors",
  aliases: ["subprocessors"],
  name: "SUB-PROCESSOR LIST",
  family: "public",
  reference: "BP-SUB",
  version: "v0.2",
  issuedAt: "12 Sep 2026",
  updatedAt: "12 Sep 2026",
  status: "current",
  owner: "Hamza Khan",
  role: "Legal & Risk",
  lead: "The named vendors this site and the studio currently use, with what we can verify about region.",
  parties: [siteParties.bpulse, siteParties.visitor],
  signatureBlocks: [],
  reviewNote:
    "Confirm the live Neon region and record it in Annex I of any SCC set before a DPA is executed.",
  sections: [
    {
      number: "1",
      heading: "Who processes data for us",
      plainTerms:
        "Four named vendors. All four are US-incorporated. A region we have not recorded is left blank rather than guessed.",
      clauses: subProcessors.map((row) => ({
        text: `${row.name} (${row.entity}) — ${row.role}. ${row.region} Data: ${row.data}`,
      })),
    },
    {
      number: "2",
      heading: "What a transfer means",
      plainTerms:
        "Because the vendors are US-incorporated, an EEA visitor's intake is an international transfer even when a processing region sits in the EU.",
      clauses: [
        {
          text: "Pakistan is not covered by an EU adequacy decision. The transfer page at /legal/data states the SCC route, the UK addendum, and the Transfer Impact Assessment.",
        },
        {
          text: "Umami is self-hosted on bpulse infrastructure and is not a third-party sub-processor for visitor analytics requests.",
        },
        {
          text: "We will not add a sub-processor without updating this list and, for an executed DPA, giving notice.",
        },
      ],
    },
  ],
  changelog: [
    {
      version: "v0.2",
      date: "12 Sep 2026",
      change: "Named the four live vendors from the actual stack, without invented regions.",
      reason: "The DPA requires a public sub-processor list that matches the code.",
    },
  ],
};

export const siteDocs = [
  siteTerms,
  sitePrivacy,
  siteCookies,
  siteAccessibility,
  siteComplaints,
  siteSubProcessors,
  vulnerabilityDisclosure,
];
