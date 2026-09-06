import type { LegalDoc } from "@/content/documents/types";

export const DRAFT_NOTICE = "Draft. Pending legal review. Not in force.";

export function isDraftDocument(doc: LegalDoc): boolean {
  return doc.status === "draft";
}
