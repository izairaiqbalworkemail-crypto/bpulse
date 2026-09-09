/**
 * Safe class/token remaps for the editorial retheme.
 * Run phases in order. Never run phase 2 before phase 1.
 *
 *   node scripts/retheme-tokens.mjs quill
 *   node scripts/retheme-tokens.mjs grounds
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");
const phase = process.argv[2];

const FILES = [];
function walk(dir) {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === ".next" || name === ".git") continue;
    const here = join(dir, name);
    if (statSync(here).isDirectory()) walk(here);
    else if (/\.(tsx|ts|css|mjs)$/.test(name)) FILES.push(here);
  }
}
walk(join(root, "src"));
walk(join(root, "scripts"));

const PREFIX =
  /(?:(?:hover|focus|focus-visible|active|disabled|group-hover|group-focus|sm|md|lg|xl|2xl|max-sm|max-md|dark):)*/;

function remapUtility(src, from, to) {
  const re = new RegExp(
    `(^|[^A-Za-z0-9_-])(${PREFIX.source})(text|bg|border|decoration|outline|ring|fill|from|to|via|divide|caret|accent|stroke|shadow)-${from}(\\/[0-9]+)?\\b`,
    "g",
  );
  return src.replace(re, `$1$2$3-${to}$4`);
}

function remapCssVar(src, from, to) {
  return src.replaceAll(`--color-${from}`, `--color-${to}`);
}

function remapIdent(src, from, to) {
  return src
    .replaceAll(`.${from}`, `.${to}`)
    .replaceAll(` ${from}`, ` ${to}`);
}

let changed = 0;

if (phase === "quill") {
  for (const file of FILES) {
    let next = readFileSync(file, "utf8");
    const before = next;
    next = remapCssVar(next, "ink", "quill");
    next = remapUtility(next, "ink", "quill");
    if (next !== before) {
      writeFileSync(file, next);
      changed += 1;
    }
  }
  console.log(`quill: ${changed} files`);
} else if (phase === "grounds") {
  const steps = [
    ["iron-2", "ink-2"],
    ["iron-card", "ink-card"],
    ["rag-card", "paper-card"],
    ["rag-mute", "paper-mute"],
    ["signal-ink", "ink"],
    ["iron", "ink"],
    ["rag", "paper"],
    ["signal", "gold"],
  ];
  for (const file of FILES) {
    let next = readFileSync(file, "utf8");
    const before = next;
    for (const [from, to] of steps) {
      next = remapCssVar(next, from, to);
      next = remapUtility(next, from, to);
    }
    next = next.replaceAll("on-ink", "on-ink");
    next = next.replaceAll("btn-ink", "btn-ink");
    next = next.replaceAll("btn-gold", "btn-gold");
    next = next.replaceAll("card-ink", "card-ink");
    next = next.replaceAll("room-card-ink", "room-card-ink");
    next = next.replaceAll("room-card-paper", "room-card-paper");
    next = next.replaceAll("paper-ground", "paper-ground");
    if (next !== before) {
      writeFileSync(file, next);
      changed += 1;
    }
  }
  console.log(`grounds: ${changed} files`);
} else {
  console.error("usage: node scripts/retheme-tokens.mjs quill|grounds");
  process.exit(1);
}
