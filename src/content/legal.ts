import { brand } from "@/config/brand";

export type LegalStatus = "draft" | "in-force";

export type LegalSection = {
  heading: string;
  summary: string;
  body: string[];
};

export type LegalDoc = {
  slug: string;
  aliases?: string[];
  title: string;
  version: string;
  updatedAt: string;
  status: LegalStatus;
  sections: LegalSection[];
  changelog: Array<{ date: string; change: string; reason: string }>;
};

export const legalOwner = {
  name: "Hamza Khan",
  role: "Legal & Risk",
  email: "hamza@bpulse.dev",
  line: "Handles NDAs, IP assignment, client legal questions, and instructs external counsel.",
};

export const legalDraftMeaning =
  "These documents describe how we intend to operate and are accurate about what the site does today. They have not yet been reviewed by a qualified solicitor in the jurisdictions our clients contract from. Until that happens they are not in force, and we say so on calls.";

export const contractSet = [
  {
    name: "Mutual NDA",
    line: "Signed before repo access or production credentials.",
  },
  {
    name: "IP assignment",
    line: "Signed in writing before client-facing code starts.",
  },
  {
    name: "Fixed-scope agreement",
    line: "Locks scope, timeline, and price before delivery work.",
  },
  {
    name: "Change orders",
    line: "Prices scope changes explicitly; nothing is absorbed silently.",
  },
];

export const legalDocs: LegalDoc[] = [
  {
    slug: "terms",
    aliases: ["terms-of-service"],
    title: "Terms of Service",
    version: "v0.3",
    updatedAt: "12 Sep 2026",
    status: "draft",
    sections: [
      {
        heading: "1. Who we are",
        summary: "bpulse is a Pakistan-registered software studio and these terms cover our site and services.",
        body: [
          `${brand.legalName} (\"bpulse\", \"we\", \"us\") operates from Lahore, Punjab, Pakistan.`,
          "These terms apply to our website and to service engagements unless superseded by a signed client agreement.",
        ],
      },
      {
        heading: "2. What we do",
        summary: "We run diagnostics, fixed-scope builds, and optional post-launch support.",
        body: [
          "The Check is a diagnostic. The Close is fixed-scope delivery. Standing is optional post-launch support.",
          "Specific scope, timeline, and pricing are defined in writing for each engagement.",
        ],
      },
      {
        heading: "3. Scope and delivery",
        summary: "Scope is written and versioned; changes require a signed change order.",
        body: [
          "No build work starts until scope is written and accepted by both sides.",
          "If scope changes, we price and document the change before implementation.",
        ],
      },
      {
        heading: "4. IP and confidentiality",
        summary: "Client IP stays client-owned and new work is assigned in writing once payment terms are met.",
        body: [
          "You keep ownership of your pre-existing code, data, and materials.",
          "New deliverables are assigned as agreed in the signed project documents.",
        ],
      },
      {
        heading: "5. Liability and disputes",
        summary: "Liability is capped to fees paid for the engagement and dispute handling is defined in writing.",
        body: [
          "Our liability is limited to fees paid for the specific engagement, to the extent permitted by law.",
          "Dispute path, governing law, and forum are finalised in signed client documents.",
        ],
      },
    ],
    changelog: [
      {
        date: "12 Sep 2026",
        change: "Split marketing language from enforceable terms and moved law/forum to signed contracts.",
        reason: "Avoid false certainty across jurisdictions.",
      },
    ],
  },
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    version: "v0.4",
    updatedAt: "12 Sep 2026",
    status: "draft",
    sections: [
      {
        heading: "1. What we collect",
        summary: "We collect the fields people type into intake forms and selected operational event data.",
        body: [
          "Intake submissions include fields like name, email, project details, budget, and timeline.",
          "Match events store the typed business description and suggested matches. Private report views log timestamp and slug only.",
        ],
      },
      {
        heading: "2. What we do not collect",
        summary: "We do not run analytics, tracking pixels, session recording, or advertising cookies.",
        body: [
          "The site sets no marketing or analytics cookies.",
          "We do not use behavioural profiling systems on this marketing site.",
        ],
      },
      {
        heading: "3. Where data is processed",
        summary: "Data is processed through Postgres, Resend for mail delivery, and Upstash Redis for abuse protection and counters.",
        body: [
          "Submission data is saved to Postgres when configured, and to a local development store when no database is configured.",
          "Rate limiting and view counters are backed by Upstash Redis. Email notifications are sent through Resend when enabled.",
        ],
      },
      {
        heading: "4. Retention and deletion",
        summary: "There is no automated retention job yet; deletion is currently handled by request.",
        body: [
          "Contact us at contact@bpulse.dev to request correction or deletion.",
          "A formal retention schedule will be published when implemented in production.",
        ],
      },
      {
        heading: "5. Contact",
        summary: "Privacy and legal data questions are routed to a named owner.",
        body: [
          "For privacy matters, email contact@bpulse.dev.",
          "For legal and risk matters, email hamza@bpulse.dev. Legal owner: Hamza Khan (bpulse team profile: /team/hamza).",
        ],
      },
    ],
    changelog: [
      {
        date: "12 Sep 2026",
        change: "Aligned vendor list with security and legal pages.",
        reason: "Keep the same facts consistent across surfaces.",
      },
    ],
  },
  {
    slug: "cookie-policy",
    title: "Cookie Policy",
    version: "v0.2",
    updatedAt: "08 Sep 2026",
    status: "draft",
    sections: [
      {
        heading: "1. We set no cookies",
        summary: "The site currently sets no cookies.",
        body: [
          "No analytics, advertising, or session-recording cookies are used.",
          "If this changes, this document and the privacy policy will be updated before deployment.",
        ],
      },
      {
        heading: "2. No cookie banner",
        summary: "No banner is shown because no consented cookie categories are currently in use.",
        body: [
          "A banner for non-existent cookies is misleading.",
          "We will add consent controls if cookie-based tracking is introduced.",
        ],
      },
      {
        heading: "3. External links",
        summary: "Linked third-party sites may use their own cookies.",
        body: [
          "This policy applies to bpulse properties only.",
        ],
      },
    ],
    changelog: [
      {
        date: "08 Sep 2026",
        change: "Rewrote to explicit zero-cookie claim and update requirement.",
        reason: "Keep policy testable against production behavior.",
      },
    ],
  },
  {
    slug: "accessibility",
    aliases: ["accessibility-statement"],
    title: "Accessibility",
    version: "v0.2",
    updatedAt: "08 Sep 2026",
    status: "draft",
    sections: [
      {
        heading: "1. Commitment",
        summary: "We are actively improving accessibility and do not claim a completed audit.",
        body: [
          "Core routes are built with semantic HTML and keyboard focus order in mind.",
          "A full screen-reader and assistive-tech matrix is not complete yet.",
        ],
      },
      {
        heading: "2. Known limits",
        summary: "Some interactions and media treatments still need broader testing.",
        body: [
          "Reduced motion preferences are respected in key surfaces but have not been fully audited page by page.",
          "If you hit a barrier, report it and we will prioritise remediation.",
        ],
      },
      {
        heading: "3. Contact",
        summary: "Accessibility concerns go to a monitored inbox with a one-business-day reply target.",
        body: [
          "Email contact@bpulse.dev with route and issue details.",
        ],
      },
    ],
    changelog: [
      {
        date: "08 Sep 2026",
        change: "Trimmed unsupported claims and added explicit non-audit disclosure.",
        reason: "Avoid overstating accessibility readiness.",
      },
    ],
  },
  {
    slug: "complaints",
    title: "Complaints & Disputes",
    version: "v0.1",
    updatedAt: "05 Sep 2026",
    status: "draft",
    sections: [
      {
        heading: "1. How to raise a complaint",
        summary: "Email the issue, what happened, and what outcome you want.",
        body: [
          "Send complaints to contact@bpulse.dev with subject line 'Complaint'.",
          "We acknowledge within two business days.",
        ],
      },
      {
        heading: "2. How we handle it",
        summary: "A senior reviewer who is not the subject handles the case.",
        body: [
          "We provide a substantive response within ten business days when possible.",
          "If timing changes, we say so in writing.",
        ],
      },
      {
        heading: "3. Escalation",
        summary: "If unresolved, we offer mediation before litigation where practical.",
        body: [
          "Mediation provider and cost sharing are agreed case by case.",
        ],
      },
      {
        heading: "4. Contact",
        summary: "Legal owner details are listed for direct routing.",
        body: [
          `${legalOwner.name} · ${legalOwner.role} · ${legalOwner.email}`,
        ],
      },
    ],
    changelog: [
      {
        date: "05 Sep 2026",
        change: "Initial publication.",
        reason: "Create a written complaint route with response timings.",
      },
    ],
  },
];

const slugMap = new Map<string, LegalDoc>();
for (const doc of legalDocs) {
  slugMap.set(doc.slug, doc);
  for (const alias of doc.aliases ?? []) {
    slugMap.set(alias, doc);
  }
}

export function getLegalDoc(slug: string): LegalDoc | null {
  return slugMap.get(slug) ?? null;
}
