#!/usr/bin/env node
/**
 * pnpm report:new <company>
 * Scaffolds src/content/reports/<slug>.ts with every field commented.
 */

import { randomBytes } from "node:crypto";
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const company = process.argv.slice(2).join(" ").trim();
if (!company) {
  console.error("Usage: pnpm report:new <company>");
  process.exit(1);
}

const slugBase = company
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "");
const suffix = randomBytes(6)
  .toString("base64url")
  .replace(/[^A-Za-z0-9]/g, "")
  .slice(0, 8)
  .padEnd(8, "x");
const slug = `${slugBase}-${suffix}`;
const dir = join(process.cwd(), "src/content/reports");
const file = join(dir, `${slug}.ts`);

if (existsSync(file)) {
  console.error(`Already exists: ${file}`);
  process.exit(1);
}

mkdirSync(dir, { recursive: true });

const contents = `import type { Report } from "./types";
import { assertReport } from "./types";

const report: Report = {
  slug: "${slug}",
  company: ${JSON.stringify(company)},
  preparedBy: "", // named specialist who wrote it
  preparedOn: "", // e.g. 5 September 2026
  surfacesRead: [
    // min 2 — what was actually looked at
    "",
    "",
  ],
  theRead: "", // 2–3 sentences, specific and falsifiable
  findings: [
    {
      severity: "blocks launch", // or "blocks a customer" | "blocks trust"
      observed: "",
      consequence: "",
      closing: "",
    },
    {
      severity: "blocks a customer",
      observed: "",
      consequence: "",
      closing: "",
    },
    {
      severity: "blocks trust",
      observed: "",
      consequence: "",
      closing: "",
    },
  ],
  whatItTakes: {
    scope: "",
    weeks: "",
    band: "", // under $18k · $18k–$40k · $40k–$95k · $95k+
  },
  pod: "integration", // integration | delivery | intelligence
  specialistId: "",
  limits: [
    // min 1 — a report with no limits was either dishonest or not researched
    "",
  ],
};

export default assertReport(report);
`;

writeFileSync(file, contents);
console.log(`Wrote ${file}`);
console.log(`Slug: ${slug}`);
console.log(`Import it from src/content/reports/index.ts before it will render.`);
