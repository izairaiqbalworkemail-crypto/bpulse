import { getLot, lots } from "@/content/lots";
import { LOT_PATTERNS } from "@/content/read-patterns";
import { offer } from "@/content/offer";
import type { Answers } from "@/lib/conversation/types";
import type { PreliminaryRead, ReadPattern } from "./types";

const PRICE = `$${offer.check.price.toLocaleString("en-US")}`;

const STAGE_LINE: Record<string, string> = {
  "demo-only": "demo only",
  staging: "on staging",
  "live-fragile": "live and fragile",
  "live-stuck": "live and stuck",
};

const DURATION_LINE: Record<string, string> = {
  weeks: "weeks",
  months: "months",
  longer: "longer than months",
};

function clip(value: string, max = 160) {
  const trimmed = value.trim().replace(/\s+/g, " ");
  if (trimmed.length <= max) return trimmed;
  return `${trimmed.slice(0, max).trimEnd()}…`;
}

function quote(value: string | undefined) {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  return clip(trimmed, 220);
}

function lotsOf(slugs: readonly string[]) {
  return slugs.map((slug) => getLot(slug));
}

function patternFor(answers: Answers): ReadPattern | null {
  const catalogue = lots.length;
  const stage = answers.stage;

  if (stage === "demo-only" || stage === "staging") {
    const matched = lotsOf(LOT_PATTERNS.beforeProduction);
    const featured = matched[0];
    if (!featured || matched.length === 0) return null;
    return {
      claim: `${matched.length} of the ${catalogue} lots in the catalogue arrived before they were live. In each, the remaining work was a production path — not a new product.`,
      lotSlug: featured.slug,
      lotName: featured.client,
      count: matched.length,
      of: catalogue,
    };
  }

  if (stage === "live-fragile" || stage === "live-stuck") {
    const matched = lotsOf(LOT_PATTERNS.workingButUnshipped);
    const featured = matched[0];
    if (!featured) return null;
    return {
      claim: `${matched.length} of the ${catalogue} lots in the catalogue arrived with something working that would not ship. The gap, in those records, was a path — deploy, compliance, or ownership — not a rebuild.`,
      lotSlug: featured.slug,
      lotName: featured.client,
      count: matched.length,
      of: catalogue,
    };
  }

  const text = `${answers.product ?? ""} ${answers.shipWound ?? ""}`.toLowerCase();
  if (/\b(llm|model|rag|gpt)\b/.test(text)) {
    const matched = lotsOf(LOT_PATTERNS.modelInTheStack);
    const featured = matched[0];
    if (!featured) return null;
    return {
      claim: `${matched.length} of the ${catalogue} lots in the catalogue had a model in the stack when they arrived. What we could say then, and what we can say here, is only what you typed — not how it behaves on your data.`,
      lotSlug: featured.slug,
      lotName: featured.client,
      count: matched.length,
      of: catalogue,
    };
  }

  return null;
}

function toldFrom(answers: Answers) {
  const bits: string[] = [];
  const product = quote(answers.product);
  if (product) bits.push(product);
  const stage = STAGE_LINE[answers.stage ?? ""];
  if (stage) bits.push(`You marked it ${stage}.`);
  const attempted = quote(answers.attemptedProduction);
  if (attempted) bits.push(`On production: ${attempted}`);
  const broke = quote(answers.lastBreak);
  if (broke) bits.push(`Most recently: ${broke}`);
  const wound = quote(answers.shipWound);
  if (wound) bits.push(wound);
  const model = quote(answers.modelOnData);
  if (model) bits.push(`On real data: ${model}`);
  const durationChip = DURATION_LINE[answers.duration ?? ""];
  if (durationChip) bits.push(`Like this for ${durationChip}.`);
  else {
    const duration = quote(answers.duration);
    if (duration) bits.push(duration);
  }
  if (answers.whoBuilt === "left") bits.push("The people who built it have left.");
  if (answers.whoBuilt === "mixed") bits.push("Some of the people who built it have left.");
  const whoNote = quote(answers.whoBuiltNote);
  if (whoNote) bits.push(whoNote);
  const docs = quote(answers.docsLeft);
  if (docs) bits.push(`Written down: ${docs}`);
  const deadline = quote(answers.deadline);
  if (deadline) bits.push(`The date that matters: ${deadline}`);
  return bits.join(" ");
}

function lookFirst(answers: Answers) {
  const items: string[] = [];
  if (answers.stage === "demo-only" || answers.stage === "staging") {
    items.push("Whether a production environment has ever existed");
  }
  if (answers.lastBreak?.trim()) {
    items.push("What broke most recently, in the words you used");
  }
  if (answers.shipWound?.trim()) {
    items.push(`What you said happens when you try to ship it`);
  }
  if (answers.whoBuilt === "left" || answers.docsLeft) {
    items.push("Whether the path is written down anywhere a stranger could follow");
  }
  if (answers.modelOnData?.trim()) {
    items.push("How it behaves on real data, not the demo set");
  }
  if (items.length === 0) {
    items.push("The stuck part, in the words you used");
  }
  return items.slice(0, 3);
}

function titleFrom(answers: Answers) {
  const product = answers.product?.trim();
  if (!product) return "From your description";
  const first = product.split(/[.!?]/)[0] ?? product;
  return clip(first, 72);
}

export function generateRead(
  answers: Answers,
  token: string,
  preparedAt = new Date().toISOString(),
  source: PreliminaryRead["source"] = "check-intake",
): PreliminaryRead {
  return {
    token,
    preparedAt,
    title: titleFrom(answers),
    told: toldFrom(answers),
    pattern: patternFor(answers),
    lookFirst: lookFirst(answers),
    limits:
      "This is built from what you typed. We have not seen your code, your logs, or your infrastructure. We cannot tell you whether this is one week or ten until we look.",
    checkLine:
      source === "read"
        ? "If you want us to look at the code, that is the Check."
        : `That is what the Check is. Five days, ${PRICE}, credited in full against a build in 30 days.`,
    answers,
    source,
  };
}

export function preparedLabel(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
