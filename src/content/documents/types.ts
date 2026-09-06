/** The document system. One typed source, three renderers. */

export type LegalStatus =
  | "draft"
  | "current"
  | "active"
  | "awaiting-signature"
  | "signed"
  | "superseded"
  | "not-reached";

export type LegalFamily = "public" | "engagement" | "candidate" | "crew";

export type PartyKey = "bpulse" | "client" | "crew" | "candidate";

export type Party = {
  key: PartyKey;
  name: string;
  entity: string;
  jurisdiction: string;
  email?: string;
};

export type Clause = {
  number?: string;
  text: string;
};

export type LegalSection = {
  number: string;
  heading: string;
  /** Web only. Never rendered in PDF or plain text. */
  plainTerms: string;
  clauses: Clause[];
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

export type LegalDocVersion = {
  version: string;
  issuedAt: string;
  note: string;
  sections: LegalSection[];
};

export type LegalDoc = {
  slug: string;
  aliases?: string[];
  name: string;
  family: LegalFamily;
  reference: string;
  version: string;
  issuedAt: string;
  updatedAt: string;
  status: LegalStatus;
  owner: string;
  role: string;
  lead: string;
  parties: Party[];
  sections: LegalSection[];
  signatureBlocks: SignatureBlock[];
  changelog: ChangeEntry[];
  versions?: LegalDocVersion[];
  reviewNote?: string;
  /** MSA and SOW carry initials boxes on every PDF page. */
  initialsOnEachPage?: boolean;
};

export const LEGAL_STATUS_META = {
  draft: { label: "Draft", dot: "○", class: "text-ink/70" },
  current: { label: "In force", dot: "●", class: "text-iron" },
  active: { label: "Active", dot: "✓", class: "text-partial" },
  "awaiting-signature": { label: "Awaiting signature", dot: "●", class: "text-ink" },
  signed: { label: "Signed", dot: "✓", class: "text-partial" },
  superseded: { label: "Superseded", dot: "◇", class: "text-ink/50" },
  "not-reached": { label: "Not reached", dot: "○", class: "text-ink/50" },
} as const;

export const LEGAL_FAMILY_LABEL: Record<LegalFamily, string> = {
  public: "Public",
  engagement: "Engagement",
  candidate: "Candidate",
  crew: "Crew",
} as const;
