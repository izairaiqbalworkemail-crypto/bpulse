import type { LegalDoc, LegalFamily, Party } from "./types";
import { engagementDocs } from "./engagements";
import { siteDocs } from "./site";
import { internalDocs } from "./internal";

/** One source of truth for all fifteen documents. */
export const legalDocuments: LegalDoc[] = [
  ...engagementDocs,
  ...siteDocs,
  ...internalDocs,
];

export function documentsByFamily(): Record<LegalFamily, LegalDoc[]> {
  return {
    engagement: engagementDocs,
    site: siteDocs,
    internal: internalDocs,
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

/** Auto number a clause as "S.i" unless the clause carries an override. */
export function clauseNumber(sectionNumber: string, index: number, override?: string) {
  return override ?? `${sectionNumber}.${index + 1}`;
}

/** The parties mini-table cards use. bpulse first. */
export function partyPair(doc: LegalDoc): [Party | null, Party | null] {
  const bpulse = doc.parties.find((party) => party.key === "bpulse") ?? null;
  const other = doc.parties.find((party) => party.key !== "bpulse") ?? null;
  return [bpulse, other];
}

export const legalOwner = {
  name: "Hamza Khan",
  role: "Backend Engineer · Legal & Risk Owner",
  email: "hamza@bpulse.dev",
  line: "Named owner for NDAs, IP assignment, and legal-risk routing — backend engineer focused on APIs and infrastructure.",
};

/** Core set signed on every Close. DPA and change orders depend on the matter. */
export const contractSet = [
  "mutual-nda",
  "master-services-agreement",
  "statement-of-work",
  "ip-assignment",
  "handover-certificate",
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
    };
  });

export const occasionalDocs = ["data-processing-agreement", "change-order"];
export const occasionalSet = occasionalDocs.map((slug) => {
  const doc = slugMap.get(slug);
  if (!doc) throw new Error(`occasional document missing: ${slug}`);
  return {
    name: doc.name
      .toLowerCase()
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" "),
    line: doc.lead,
  };
});

/** Every section reviewNote plus doc reviewNotes, used to build LEGAL-REVIEW.md. */
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