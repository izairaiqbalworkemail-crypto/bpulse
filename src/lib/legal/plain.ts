import type { LegalDoc } from "@/content/documents/types";
import { LEGAL_STATUS_META } from "@/content/documents/types";
import { clauseNumber } from "@/content/documents";

const RULE = "─".repeat(72);

/** Executable plain text. No plain-language summaries. */
export function renderPlainText(doc: LegalDoc): string {
  const status = LEGAL_STATUS_META[doc.status];
  const lines: string[] = [];

  lines.push("bpulse — BREAKTHROUGH PULSE");
  lines.push("Lahore, Punjab, Pakistan");
  lines.push(RULE);
  lines.push("");
  lines.push(doc.name);
  lines.push("");
  lines.push(`Status: ${status.label}`);
  lines.push("");
  lines.push(`Reference: ${doc.reference}`);
  lines.push(`Issued: ${doc.issuedAt}`);
  lines.push(`Updated: ${doc.updatedAt}`);
  lines.push(`Version: ${doc.version}`);
  lines.push(`Owner: ${doc.owner} · ${doc.role}`);
  lines.push("");
  for (const party of doc.parties) {
    lines.push(`${party.key === "bpulse" ? "From" : "To"} — ${party.name}`);
    lines.push(`    ${party.entity} · ${party.jurisdiction}`);
  }
  lines.push(RULE);
  lines.push("");

  for (const section of doc.sections) {
    lines.push(`${section.number}. ${section.heading}`);
    lines.push("");
    section.clauses.forEach((clause, index) => {
      const number = clauseNumber(section.number, index, clause.number);
      lines.push(`${number.padEnd(8)}${clause.text}`);
    });
    lines.push("");
  }

  if (doc.signatureBlocks.length > 0) {
    lines.push(RULE);
    lines.push("");
    lines.push("SIGNATURES");
    lines.push("");
    for (const block of doc.signatureBlocks) {
      lines.push(`For ${block.party} — ${block.name}`);
      lines.push(`Title: ${block.title}`);
      lines.push("");
      lines.push("Signature: ____________________  Date: __________");
      lines.push("");
    }
  }

  lines.push(RULE);
  lines.push("");
  lines.push("CHANGELOG");
  for (const entry of doc.changelog) {
    lines.push(`  ${entry.version} · ${entry.date} · ${entry.change}`);
    lines.push(`    ${entry.reason}`);
  }
  lines.push(RULE);
  lines.push(`bpulse · Lahore, Pakistan · ${doc.reference} · ${doc.version} · ${status.label}`);

  return lines.join("\n");
}
