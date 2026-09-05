/**
 * Honest keyword read of the stuck part. Not a model.
 * If two readings conflict, leave the field blank and ask.
 */

export const SITUATIONS = [
  "Almost done",
  "Stalled",
  "Live, but fragile",
  "Just an idea",
] as const;

export const STACKS = [
  "Next.js / React",
  "Rails / Django / Laravel",
  "Mobile",
  "Something else",
] as const;

export const ACCESS = ["Full access", "Partial", "Not yet"] as const;

export type WoundRead = {
  situation?: (typeof SITUATIONS)[number];
  stack?: (typeof STACKS)[number];
  access?: (typeof ACCESS)[number];
};

const IDEA =
  /just an idea|nothing (is |was )?built|no (code|repo) yet|haven'?t (built|started|written)|still an idea|not (even )?built yet/i;
const STALLED =
  /\b(stalled|abandoned|ghosted)\b|nobody (left )?(owns|knows|touches)|the last (person|dev|developer|engineer) left|dead (repo|project)/i;
const FRAGILE =
  /\bfragile\b|keeps breaking|in prod(uction)? and|live,? but|users (are )?(complain|hitting)|can'?t ship without (a )?hotfix/i;
const ALMOST =
  /\balmost done\b|last (20|twenty)\b|won'?t ship|never (been )?deployed|staging only|\b(80|90)%\b/i;

const NEXT = /\b(next\.?js|react|vercel)\b/i;
const CLASSIC = /\b(rails|django|laravel)\b/i;
const MOBILE = /\b(ios|android|react native|flutter|mobile)\b/i;

const FULL = /\bfull access\b|you can clone|i can give (you )?(the )?repo/i;
const PARTIAL = /\bpartial access\b/;
const NONE = /\bno access yet\b|can'?t share (the )?(repo|code)/i;

function pickOne<T>(hits: T[]): T | undefined {
  return hits.length === 1 ? hits[0] : undefined;
}

export function readWound(text: string): WoundRead {
  const body = text.trim();
  if (!body) return {};

  const situations: WoundRead["situation"][] = [];
  if (IDEA.test(body)) situations.push("Just an idea");
  if (STALLED.test(body)) situations.push("Stalled");
  if (FRAGILE.test(body)) situations.push("Live, but fragile");
  if (ALMOST.test(body)) situations.push("Almost done");

  const stacks: WoundRead["stack"][] = [];
  if (NEXT.test(body)) stacks.push("Next.js / React");
  if (CLASSIC.test(body)) stacks.push("Rails / Django / Laravel");
  if (MOBILE.test(body)) stacks.push("Mobile");

  const keys: WoundRead["access"][] = [];
  if (FULL.test(body)) keys.push("Full access");
  if (PARTIAL.test(body)) keys.push("Partial");
  if (NONE.test(body)) keys.push("Not yet");

  return {
    situation: pickOne(situations),
    stack: pickOne(stacks),
    access: pickOne(keys),
  };
}

export function applyWoundRead(
  answers: Record<string, string>,
  read: WoundRead,
): { answers: Record<string, string>; filled: string[] } {
  const next = { ...answers };
  const filled: string[] = [];
  for (const key of ["situation", "stack", "access"] as const) {
    const value = read[key];
    if (value && !(next[key] ?? "").trim()) {
      next[key] = value;
      filled.push(key);
    }
  }
  return { answers: next, filled };
}
