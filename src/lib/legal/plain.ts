import type { LegalDoc } from "@/content/documents/types";
import { LEGAL_STATUS_META } from "@/content/documents/types";
import { clauseNumber } from "@/content/documents";

const RULE = "─".repeat(72);

function meta(doc: LegalDoc, line: string) {
  return `${line.padEnd(38)} ${metaRight(doc)}`;
}

function metaRight(doc: LegalDoc) {
  return `Ref ${doc.reference} · ${doc.version} · ${LEGAL_STATUS_META[doc.status].label}`;
}

/** Plain-text rendering of a LegalDoc, one source field = one visual line. */
export function renderPlainText(doc: LegalDoc): string {
  const lines: string[] = [];

  // Masthead
  lines.push("bpulse — BREAKTHROUGH PULSE");
  lines.push("Lahore, Punjab, Pakistan");
  lines.push(RULE);
  lines.push("");
  lines.push(doc.name);
  lines.push("");
  lines.push(`Status: ${LEGAL_STATUS_META[doc.status].label}`);
  lines.push("");

  // Metadata
  lines.push(meta(doc, `Reference: ${doc.reference}`));
  lines.push(`Issued: ${doc.issuedAt}`);
  lines.push(`Updated: ${doc.updatedAt}`);
  lines.push(`Version: ${doc.version}`);
  lines.push(`Owner: ${doc.owner} · ${doc.role}`);
  lines.push("");
  doc.parties.forEach((party) => {
    lines.push(`${party.key === "bpulse" ? "From" : "To"} — ${party.name}`);
    lines.push(`    ${party.entity} · ${party.jurisdiction}`);
  });
  lines.push("");
  lines.push(`In plain terms: ${doc.lead}`);
  lines.push(RULE);
  lines.push("");

  // Body
  for (const section of doc.sections) {
    lines.push(`${section.number}. ${section.heading}`);
    lines.push("");
    lines.push(`  In plain terms: ${section.plainTerms}`);
    lines.push("");
    section.clauses.forEach((clause, index) => {
      const number = clauseNumber(section.number, index, clause.number);
      lines.push(`${number.padEnd(8)}${clause.text}`);
    });
    if (section.reviewNote) {
      lines.push("");
      lines.push(`  [Review] ${section.reviewNote}`);
    }
    lines.push("");
  }

  // Signatures (only when blocks exist)
  if (doc.signatureBlocks.length > 0) {
    lines.push(RULE);
    lines.push("");
    lines.push("SIGNATURES");
    lines.push("");
    for (const block of doc.signatureBlocks) {
      lines.push(`For ${block.party.toUpperCase()} — ${block.name}`);
      lines.push(`Title: ${block.title}`);
      lines.push("");
      lines.push(`Signature: ____________________  Date: __________`);
      lines.push("");
    }
  }

  // Changelog
  lines.push(RULE);
  lines.push("");
  lines.push("CHANGELOG");
  for (const entry of doc.changelog) {
    lines.push(`  ${entry.version} · ${entry.date} · ${entry.change}`);
    lines.push(`    Why: ${entry.reason}`);
  }

  // Footer
  lines.push(RULE);
  lines.push(`bpulse · ${doc.reference} · ${doc.version} · ${LEGAL_STATUS_META[doc.status].label}`);
  lines.push("bpulse.dev · contact@bpulse.dev");

  return lines.join("\n");
}