const INJECTION =
  /ignore (all )?(previous|above|prior)|system prompt|you are now|jailbreak|act as|override instructions/i;

const STOP = new Set([
  "a",
  "an",
  "the",
  "and",
  "or",
  "but",
  "to",
  "of",
  "in",
  "on",
  "for",
  "with",
  "we",
  "it",
  "is",
  "was",
  "are",
  "been",
  "be",
  "this",
  "that",
  "our",
  "they",
  "has",
  "have",
  "had",
  "not",
  "no",
  "as",
  "at",
  "by",
  "from",
  "into",
  "about",
  "over",
  "how",
  "the",
]);

export const MATCH_MAX_CHARS = 10_000;

export function clipDescription(raw: string): string {
  return raw.replace(/\s+/g, " ").trim().slice(0, MATCH_MAX_CHARS);
}

export function looksLikeInjection(text: string): boolean {
  return INJECTION.test(text);
}

export function normalizeToken(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9+.#-]+/g, "")
    .replace(/^\.+|\.+$/g, "")
    .replace(/\.js$/, "")
    .replace(/^node\.?js$/, "node");
}

export function tokensOf(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9+.#-]+/)
    .map(normalizeToken)
    .filter((token) => token.length >= 2 && !STOP.has(token));
}

export function hasTerm(haystack: string, term: string): boolean {
  const needle = term.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(^|[^a-z0-9])${needle}([^a-z0-9]|$)`, "i").test(haystack);
}

export function quoteSpan(description: string, needles: string[]): string | null {
  const clean = clipDescription(description);
  if (!clean) return null;
  const lower = clean.toLowerCase();
  for (const needle of needles) {
    const at = lower.indexOf(needle.toLowerCase());
    if (at < 0) continue;
    const start = clean.lastIndexOf(" ", Math.max(0, at - 28));
    const end = clean.indexOf(" ", at + needle.length + 36);
    const span = clean
      .slice(start < 0 ? 0 : start, end < 0 ? clean.length : end)
      .replace(/^[,.;:\s]+|[,.;:\s]+$/g, "");
    if (span.length < 8) continue;
    return span;
  }
  return null;
}

export function clamp01(value: number): number {
  if (Number.isNaN(value)) return 0;
  return Math.max(0, Math.min(1, value));
}
