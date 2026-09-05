import type { LegalSection } from "@/content/documents/types";
import { clauseNumber } from "@/content/documents";

export type ClauseChange = {
  key: string;
  number: string;
  text: string;
  state: "added" | "removed" | "unchanged";
};

export type SectionDiff = {
  number: string;
  heading: string;
  plainTermsChanged: boolean;
  clauses: ClauseChange[];
};

/** Line-based diff between two versions of a document. Text equality decides. */
export function diffSections(before: LegalSection[], after: LegalSection[]): SectionDiff[] {
  const beforeByNumber = new Map(before.map((section) => [section.number, section]));
  const afterByNumber = new Map(after.map((section) => [section.number, section]));

  const numbers: string[] = [];
  for (const section of after) numbers.push(section.number);
  for (const section of before) {
    if (!afterByNumber.has(section.number)) numbers.push(section.number);
  }

  return numbers.map((number) => {
    const beforeSection = beforeByNumber.get(number);
    const afterSection = afterByNumber.get(number);

    if (!afterSection) {
      return {
        number,
        heading: beforeSection?.heading ?? number,
        plainTermsChanged: false,
        clauses: (beforeSection?.clauses ?? []).map((clause, index) => ({
          key: `${number}:${clause.number ?? index}`,
          number: clauseNumber(number, index, clause.number),
          text: clause.text,
          state: "removed" as const,
        })),
      };
    }

    if (!beforeSection) {
      return {
        number,
        heading: afterSection.heading,
        plainTermsChanged: false,
        clauses: afterSection.clauses.map((clause, index) => ({
          key: `${number}:${clause.number ?? index}`,
          number: clauseNumber(number, index, clause.number),
          text: clause.text,
          state: "added" as const,
        })),
      };
    }

    const beforeTexts = new Set(beforeSection.clauses.map((clause) => clause.text));
    const afterTexts = new Set(afterSection.clauses.map((clause) => clause.text));

    const changes: ClauseChange[] = [];
    afterSection.clauses.forEach((clause, index) => {
      changes.push({
        key: `${number}:a:${clause.number ?? index}`,
        number: clauseNumber(number, index, clause.number),
        text: clause.text,
        state: beforeTexts.has(clause.text) ? "unchanged" : "added",
      });
    });
    beforeSection.clauses.forEach((clause, index) => {
      if (!afterTexts.has(clause.text)) {
        changes.push({
          key: `${number}:b:${clause.number ?? index}`,
          number: clauseNumber(number, index, clause.number),
          text: clause.text,
          state: "removed",
        });
      }
    });

    return {
      number,
      heading: afterSection.heading,
      plainTermsChanged: beforeSection.plainTerms !== afterSection.plainTerms,
      clauses: changes,
    };
  });
}