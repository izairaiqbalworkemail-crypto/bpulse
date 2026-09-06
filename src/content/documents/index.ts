import type { LegalDoc, LegalFamily, LegalStatus, Party } from "./types";
import { engagementDocs } from "./engagements";
import { siteDocs } from "./site";
import { internalDocs } from "./internal";

/** One source of truth. Public + engagement + candidate + crew. */
export const LEGAL_PUBLISH_STATUS: LegalStatus = "draft";

const sourceDocuments: LegalDoc[] = [...siteDocs, ...engagementDocs, ...internalDocs];

export const legalDocuments: LegalDoc[] = sourceDocuments.map((doc) => ({
  ...doc,
  status: LEGAL_PUBLISH_STATUS,
}));

export function documentsByFamily(): Record<LegalFamily, LegalDoc[]> {
  return {
    public: legalDocuments.filter((doc) => doc.family === "public"),
    engagement: legalDocuments.filter((doc) => doc.family === "engagement"),
    candidate: legalDocuments.filter((doc) => doc.family === "candidate"),
    crew: legalDocuments.filter((doc) => doc.family === "crew"),
  };
}

const slugMap = new Map<string, LegalDoc>();
for (const doc of legalDocuments) {
  slugMap.set(doc.slug, doc);
  for (const alias of doc.aliases ?? []) slugMap.set(alias, doc);
}

export function getLegalDoc(slug: string): LegalDoc | null {
  return slugMap.get(slug) ?? null;
}

export function clauseNumber(sectionNumber: string, index: number, override?: string) {
  return override ?? `${sectionNumber}.${index + 1}`;
}

export function partyPair(doc: LegalDoc): [Party | null, Party | null] {
  const bpulse = doc.parties.find((party) => party.key === "bpulse") ?? null;
  const other = doc.parties.find((party) => party.key !== "bpulse") ?? null;
  return [bpulse, other];
}

export const legalOwner = {
  name: "Hamza Khan",
  role: "Legal owner",
  email: "hamza@bpulse.dev",
  line: "Handles NDAs and IP assignment, answers client legal questions, and instructs external counsel.",
};

/** Core set signed on every Close. DPA and SCCs depend on the matter. */
export const contractSet = [
  "mutual-nda",
  "master-services-agreement",
  "statement-of-work",
  "change-order",
  "ip-assignment",
  "data-processing-agreement",
]
  .map((slug) => {
    const doc = slugMap.get(slug);
    if (!doc) throw new Error(`core document missing: ${slug}`);
    return {
      name: doc.name
        .toLowerCase()
        .split(" ")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" "),
      line: doc.lead,
      slug: doc.slug,
    };
  });

export function collectReviewNotes() {
  const rows: Array<{ slug: string; reference: string; note: string; where: string }> = [];
  for (const doc of legalDocuments) {
    if (doc.reviewNote) {
      rows.push({ slug: doc.slug, reference: doc.reference, note: doc.reviewNote, where: "document" });
    }
    for (const section of doc.sections) {
      if (section.reviewNote) {
        rows.push({ slug: doc.slug, reference: doc.reference, note: section.reviewNote, where: `section ${section.number}` });
      }
    }
  }
  return rows;
}
