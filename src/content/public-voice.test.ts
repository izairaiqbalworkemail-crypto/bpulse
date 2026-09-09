import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Customer words on the glass. Internal words stay in src/lib, /studio, /admin.
 * This is what stops the old vocabulary coming back.
 */

const ROOT = resolve(import.meta.dirname, "../..");

const SKIP_DIR = new Set(["admin", "studio", "node_modules"]);

const SKIP_FILE = new Set([
  "public-voice.test.ts",
  "funnel.test.ts",
  "vocabulary.ts",
  "signals.ts",
]);

const SKIP_PATH_PART = ["/lib/", "src/lib/", "src/app/admin/", "src/app/studio/"];

const FORBIDDEN: { name: string; re: RegExp }[] = [
  { name: "LOT", re: /\bLOT\b/ },
  { name: "the record", re: /\bthe record\b/i },
  { name: "trace", re: /\btrace\b/i },
  { name: "signals", re: /\bsignals\b/i },
  { name: "arrived", re: /\barrived\b/i },
  { name: "admitted", re: /\badmitted\b/i },
  { name: "rung", re: /\brung\b/i },
  { name: "deployment", re: /\bdeployments?\b/i },
];

const STANDING_STATUS = /\bstanding\b/i;

function walk(dir: string, files: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIR.has(name)) continue;
    const full = join(dir, name);
    const rel = relative(ROOT, full);
    if (SKIP_PATH_PART.some((part) => rel.includes(part))) continue;
    if (rel.includes("src/content/reports/")) continue;
    const stat = statSync(full);
    if (stat.isDirectory()) {
      walk(full, files);
      continue;
    }
    if (SKIP_FILE.has(name)) continue;
    if (name.endsWith(".test.ts") || name.endsWith(".test.tsx")) continue;
    if (!/\.(ts|tsx)$/.test(name)) continue;
    files.push(full);
  }
  return files;
}

function extractCopy(source: string): string[] {
  const out: string[] = [];
  for (const line of source.split("\n")) {
    const trimmed = line.trim();
    if (trimmed.startsWith("//") || trimmed.startsWith("*") || trimmed.startsWith("/*")) {
      continue;
    }
    const re = /(['"])(?:\\.|(?!\1)[^\\\n])*\1/g;
    let match: RegExpExecArray | null;
    while ((match = re.exec(line))) {
      out.push(match[0].slice(1, -1));
    }
  }
  return out;
}

function skipCopy(value: string): boolean {
  if (value.length === 0) return true;
  if (/^(@\/|\.\/|\.\.\/|\/|#)/.test(value)) return true;
  if (/^LOT\s+\d+$/.test(value.trim())) return true;
  if (/^pricing\.rung\.clicked$/.test(value)) return true;
  if (/^match-signals$/.test(value)) return true;
  if (/^(standing|closed|open|deferred)$/i.test(value.trim())) return true;
  if (/deployment issue/.test(value)) return true;
  if (/^Standing$/.test(value.trim())) return true;
  if (/\bStanding\b/.test(value) && !/\bstanding\b/.test(value.replace(/Standing/g, ""))) {
    return false;
  }
  return false;
}

function isOfferStanding(value: string): boolean {
  return (
    /^Standing$/.test(value.trim()) ||
    /\bStanding\b/.test(value)
  );
}

function isFindingsClosed(value: string): boolean {
  return (
    /\b(open|closed|deferred)\b/i.test(value) &&
    /\bfindings?\b/i.test(value)
  );
}

describe("public voice", () => {
  it("keeps the old vocabulary off public routes", () => {
    const files = [
      ...walk(join(ROOT, "src/app")),
      ...walk(join(ROOT, "src/components")),
      ...walk(join(ROOT, "src/content")),
      ...walk(join(ROOT, "src/config")),
    ];

    const hits: string[] = [];
    for (const file of files) {
      const rel = relative(ROOT, file);
      const source = readFileSync(file, "utf8");
      for (const value of extractCopy(source)) {
        if (skipCopy(value)) continue;

        for (const rule of FORBIDDEN) {
          if (!rule.re.test(value)) continue;
          hits.push(`${rel}: "${value.slice(0, 96)}" (${rule.name})`);
        }

        if (
          STANDING_STATUS.test(value) &&
          !isOfferStanding(value) &&
          !/^(standing)$/i.test(value.trim())
        ) {
          hits.push(`${rel}: "${value.slice(0, 96)}" (standing)`);
        }

        if (
          /\bclosed\b/i.test(value) &&
          !isFindingsClosed(value) &&
          !/^(closed)$/i.test(value.trim()) &&
          !/\bfails closed\b/i.test(value) &&
          !/\bwindow closed\b/i.test(value)
        ) {
          hits.push(`${rel}: "${value.slice(0, 96)}" (closed)`);
        }
      }
    }

    const unique = [...new Set(hits)];
    expect(unique, unique.join("\n")).toEqual([]);
  });
});
