/** The document system. One typed source, three renderers. */

export type LegalStatus =
  | "active"
  | "awaiting-signature"
  | "signed"
  | "superseded"
  | "not-reached";

export type LegalFamily = "engagement" | "site" | "internal";

export type PartyKey = "bpulse" | "client" | "crew" | "candidate";

export type Party = {
  key: PartyKey;
  /** Short display name, e.g. "Northline Payroll". */
  name: string;
  entity: string;
  jurisdiction: string;
  email?: string;
};

export type Clause = {
  /** Explicit number override, e.g. "1.1(a)". Auto-numbered as "S.i". */
  number?: string;
  text: string;
};

export type LegalSection = {
  number: string;
  heading: string;
  /** One or two plain sentences. Must never drift from the clauses below. */
  plainTerms: string;
  clauses: Clause[];
  /** Anything a solicitor must decide before this section is enforceable. */
  reviewNote?: string;
};

export type SignatureBlock = {
  party: PartyKey;
  name: string;
  title: string;
};

export type ChangeEntry = {
  version: string;
  date: string;
  change: string;
  reason: string;
};

/** A past version, kept for version history and diffing. */
export type LegalDocVersion = {
  version: string;
  issuedAt: string;
  note: string;
  sections: LegalSection[];
};

export type LegalDoc = {
  slug: string;
  aliases?: string[];
  /** Display name for the masthead, e.g. "MUTUAL NON-DISCLOSURE AGREEMENT". */
  name: string;
  family: LegalFamily;
  reference: string;
  version: string;
  issuedAt: string;
  updatedAt: string;
  status: LegalStatus;
  /** Real legal owner. Never a reviewer unless confirmed. */
  owner: string;
  role: string;
  /** One line on what this document is for. */
  lead: string;
  parties: Party[];
  sections: LegalSection[];
  signatureBlocks: SignatureBlock[];
  changelog: ChangeEntry[];
  /** Optional version history; drives the diff view. */
  versions?: LegalDocVersion[];
  /** Document-level solicitor flag (jurisdiction, SCC, etc.). */
  reviewNote?: string;
};

export const LEGAL_STATUS_META = {
  active: { label: "Active", dot: "✓", class: "text-partial" },
  "awaiting-signature": { label: "Awaiting signature", dot: "●", class: "text-signal" },
  signed: { label: "Signed", dot: "✓", class: "text-partial" },
  superseded: { label: "Superseded", dot: "◇", class: "text-ink/50" },
  "not-reached": { label: "Not reached", dot: "○", class: "text-ink/50" },
} as const;

export const LEGAL_FAMILY_LABEL: Record<LegalFamily, string> = {
  engagement: "Client-facing",
  site: "Site legal",
  internal: "Internal",
} as const;