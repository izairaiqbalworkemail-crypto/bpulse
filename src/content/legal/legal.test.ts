import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { collectReviewNotes, legalDocuments } from "@/content/documents";
import { transferPage } from "@/content/legal/data";
import { vendorNames } from "@/content/legal/vendors";
import { renderPlainText } from "@/lib/legal/plain";

const pdfSource = readFileSync(
  path.join(process.cwd(), "src/lib/legal/pdf.tsx"),
  "utf8",
);

describe("legal register", () => {
  it("keeps every document current, never Active or Signed", () => {
    for (const doc of legalDocuments) {
      expect(doc.status).toBe("current");
      expect(doc.status).not.toBe("active");
      expect(doc.status).not.toBe("signed");
    }
  });

  it("never claims a solicitor review", () => {
    const blob = legalDocuments
      .flatMap((doc) => [
        doc.lead,
        doc.reviewNote ?? "",
        ...doc.sections.flatMap((section) => [
          section.plainTerms,
          ...section.clauses.map((clause) => clause.text),
        ]),
      ])
      .join(" ");
    expect(blob).not.toMatch(/reviewed by (a |our )?solicitor/i);
    expect(blob).not.toMatch(/legal advice/i);
  });

  it("names the four live vendors and no others", () => {
    expect(vendorNames).toEqual(["Vercel", "Neon", "Upstash", "Resend"]);
    const sub = legalDocuments.find((doc) => doc.slug === "sub-processors");
    expect(sub?.status).toBe("current");
    const text = sub?.sections.map((section) => section.clauses.map((c) => c.text).join(" ")).join(" ");
    for (const name of vendorNames) {
      expect(text).toContain(name);
    }
  });

  it("states the Pakistan position and the SCC route on /legal/data", () => {
    const joined = [
      transferPage.pakistan.clauses.join(" "),
      transferPage.scc.clauses.join(" "),
      transferPage.uk.clauses.join(" "),
      transferPage.tia.clauses.join(" "),
    ].join(" ");
    expect(joined).toMatch(/no enacted general data protection law/i);
    expect(joined).toMatch(/2021\/914/);
    expect(joined).toMatch(/Module Two/);
    expect(joined).toMatch(/Transfer Impact Assessment/);
    expect(joined).toMatch(/UK International Data Transfer Addendum/);
  });

  it("does not put gold, draft marks, or plain-language boxes in the PDF renderer", () => {
    expect(pdfSource).not.toMatch(/#f2c230/i);
    expect(pdfSource).not.toMatch(/SIGNAL/);
    expect(pdfSource).not.toMatch(/plainTerms/);
    expect(pdfSource).not.toMatch(/DRAFT/);
  });

  it("omits plain-language summaries from plain text", () => {
    const nda = legalDocuments.find((doc) => doc.slug === "mutual-nda");
    expect(nda).toBeTruthy();
    const text = renderPlainText(nda!);
    expect(text).toMatch(/Status: In force/);
    expect(text).not.toMatch(/DRAFT/);
    expect(text).not.toMatch(/In plain terms:/);
  });

  it("collects review notes for counsel", () => {
    const notes = collectReviewNotes();
    expect(notes.length).toBeGreaterThan(8);
    expect(notes.some((row) => row.slug === "data-processing-agreement")).toBe(
      true,
    );
  });
});
