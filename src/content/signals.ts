/**
 * Signal taxonomy — twenty-one signals, four lanes.
 *
 * A signal is a repeatable condition we recognise in what a visitor writes
 * because we have already seen it in an engagement. `says` is the sentence in
 * our voice. `phrases` are the trigger phrases the extractor matches verbatim
 * (case-insensitive, word-bounded) against the description.
 *
 * Nothing here is invented: every `says` line is a restatement of something a
 * lot already arrived with or a contribution already on record. The match
 * engine does not read its own luck — it reads these phrases and nothing else.
 */
export type SignalCategory = "Delivery" | "Integration" | "Intelligence" | "Ownership";

export type SignalId =
  | "no-deploy-path"
  | "staging-only"
  | "env-drift"
  | "no-rollback"
  | "manual-release"
  | "no-observability"
  | "third-party-sprawl"
  | "auth-undocumented"
  | "api-contract-drift"
  | "legacy-coupling"
  | "migration-not-idempotent"
  | "notebook-only"
  | "no-evals"
  | "no-fallback"
  | "latency-unbounded"
  | "hallucination-unguarded"
  | "single-point-knowledge"
  | "dev-departed"
  | "no-release-owner"
  | "scope-unbounded"
  | "stalled-long";

export type Signal = {
  id: SignalId;
  category: SignalCategory;
  /** Our voice. What this condition looks like when we have seen it. */
  says: string;
  /** Trigger phrases, matched word-bounded against the description. */
  phrases: string[];
};

export const signalTaxonomy: Signal[] = [
  {
    id: "no-deploy-path",
    category: "Delivery",
    says: "Built, but the path to a live deploy does not exist.",
    phrases: [
      "no deploy path",
      "deploy process",
      "never deployed",
      "never been deployed",
      "cannot deploy",
      "no way to deploy",
      "not deployed",
      "deploy to production",
      "go live",
      "not live yet",
      "not yet live",
      "no deployment",
      "never shipped to production",
      "never hit production",
      "not in production",
    ],
  },
  {
    id: "staging-only",
    category: "Delivery",
    says: "It runs on staging; production has never seen it.",
    phrases: [
      "staging only",
      "works on staging",
      "runs on staging",
      "only on staging",
      "in staging",
      "on staging",
      "staging green",
      "staging is green",
      "never left staging",
      "stuck in staging",
      "sits in staging",
      "demo mode",
    ],
  },
  {
    id: "env-drift",
    category: "Delivery",
    says: "Environments have drifted; staging is not production.",
    phrases: [
      "environment drift",
      "env drift",
      "staging differs",
      "not the same as staging",
      "works here but not there",
      "different in production",
      "differs from staging",
      "config drift",
      "works locally",
      "works on my machine",
    ],
  },
  {
    id: "no-rollback",
    category: "Delivery",
    says: "A bad release cannot be undone.",
    phrases: [
      "no rollback",
      "cannot roll back",
      "can't roll back",
      "can't revert",
      "no revert",
      "cannot revert",
      "no way to undo",
      "no downgrade",
    ],
  },
  {
    id: "manual-release",
    category: "Delivery",
    says: "Shipping means clicking, copying, or a human checklist.",
    phrases: [
      "manual deploy",
      "manually deploy",
      "deploy by hand",
      "manual steps",
      "deploy manually",
      "manual release",
      "click deploy",
      "clicking deploy",
      "run commands by hand",
      "copy-paste",
      "manual invite",
    ],
  },
  {
    id: "no-observability",
    category: "Delivery",
    says: "Nothing watches it run.",
    phrases: [
      "no monitoring",
      "no logs",
      "no observability",
      "cannot see errors",
      "nobody knows when",
      "no alerting",
      "no dashboards",
      "no telemetry",
      "errors silently",
      "blind in production",
      "no visibility into",
    ],
  },
  {
    id: "third-party-sprawl",
    category: "Integration",
    says: "Third-party systems point every direction with no one holding them.",
    phrases: [
      "third party",
      "third-party",
      "integrations pulling",
      "every direction",
      "integration sprawl",
      "many apis",
      "apis everywhere",
      "vendor sprawl",
      "multiple integrations",
      "dozens of integrations",
      "point every direction",
    ],
  },
  {
    id: "auth-undocumented",
    category: "Integration",
    says: "Auth nobody owns: wired once, understood by nobody.",
    phrases: [
      "auth was wired",
      "auth nobody",
      "nobody knows how the auth",
      "who wired auth",
      "sso was wired",
      "sso set up by",
      "auth setup",
      "auth undocumented",
      "login undocumented",
      "nobody knows how auth",
      "how auth works",
      "tokens expire",
    ],
  },
  {
    id: "api-contract-drift",
    category: "Integration",
    says: "APIs are half-wired; the contract has drifted.",
    phrases: [
      "api contract",
      "contract drift",
      "breaking api",
      "api mismatch",
      "half wired",
      "half-wired",
      "payment api",
      "webhooks broken",
      "sync broke",
      "api broke",
      "endpoint mismatch",
      "response shape",
    ],
  },
  {
    id: "legacy-coupling",
    category: "Integration",
    says: "New work is bolted onto a legacy system.",
    phrases: [
      "legacy system",
      "legacy codebase",
      "legacy coupling",
      "mature rails",
      "legacy erp",
      "monolith",
      "spaghetti",
      "entangled with",
      "tightly coupled",
      "deeply coupled",
      "years of legacy",
      "old system",
    ],
  },
  {
    id: "migration-not-idempotent",
    category: "Integration",
    says: "The migration cannot be re-run.",
    phrases: [
      "migration not idempotent",
      "cannot rerun",
      "can't rerun",
      "migration fails",
      "migration broke",
      "data migration",
      "schema migration",
      "migrations failing",
      "migration half",
      "migration halfway",
      "duplicate records",
      "ran twice",
    ],
  },
  {
    id: "notebook-only",
    category: "Intelligence",
    says: "The intelligence lives in a notebook, not in the product.",
    phrases: [
      "notebook",
      "jupyter",
      "in a notebook",
      "only in colab",
      "colab",
      "model in a notebook",
      "prototype only",
      "no serving layer",
    ],
  },
  {
    id: "no-evals",
    category: "Intelligence",
    says: "No eval holds the model to a standard.",
    phrases: [
      "no evals",
      "no eval",
      "without evals",
      "no evaluation",
      "no benchmarks",
      "never evaluated",
      "eval suite missing",
      "no regression test",
      "no ground truth",
      "no test set",
    ],
  },
  {
    id: "no-fallback",
    category: "Intelligence",
    says: "When the model is wrong there is nothing underneath.",
    phrases: [
      "no fallback",
      "no human fallback",
      "nothing underneath",
      "no guardrail",
      "no default path",
      "no backup path",
      "when it fails nothing",
    ],
  },
  {
    id: "latency-unbounded",
    category: "Intelligence",
    says: "The model responds when it responds.",
    phrases: [
      "inference is too slow",
      "inference too slow",
      "too slow for",
      "response too slow",
      "high latency",
      "latency is high",
      "unbounded latency",
      "inference latency",
      "took too long",
      "slow for the",
      "loading forever",
    ],
  },
  {
    id: "hallucination-unguarded",
    category: "Intelligence",
    says: "The model can be wrong and nothing notices.",
    phrases: [
      "hallucinate",
      "hallucinates",
      "hallucination",
      "makes things up",
      "confidently wrong",
      "wrong answers on",
      "model is wrong",
      "not grounded",
      "no grounding",
    ],
  },
  {
    id: "single-point-knowledge",
    category: "Ownership",
    says: "One person holds the whole picture.",
    phrases: [
      "one person knows",
      "single point",
      "only one person",
      "nobody else knows",
      "no documentation",
      "nothing documented",
      "in their head",
      "one mind",
      "not written down",
      "only they know",
    ],
  },
  {
    id: "dev-departed",
    category: "Ownership",
    says: "The person who built it has gone.",
    phrases: [
      "someone who left",
      "who left",
      "nobody left knows",
      "person who left",
      "the dev left",
      "the developer left",
      "built by someone who",
      "left the company",
      "no longer here",
      "since they left",
      "no handover",
    ],
  },
  {
    id: "no-release-owner",
    category: "Ownership",
    says: "Nobody owns getting it out the door.",
    phrases: [
      "no release owner",
      "nobody owns the release",
      "who owns the release",
      "no one owns",
      "no owner for",
      "no owner",
      "release owner",
      "ownership clarity",
      "ownership handover",
      "who owns delivery",
      "unowned",
    ],
  },
  {
    id: "scope-unbounded",
    category: "Ownership",
    says: "The scope never stops growing.",
    phrases: [
      "scope creep",
      "every direction",
      "endless scope",
      "scope keeps",
      "keeps growing",
      "one more thing",
      "everything at once",
      "never ends",
      "launch cold",
      "both sides at once",
    ],
  },
  {
    id: "stalled-long",
    category: "Ownership",
    says: "Stalled long enough that context has decayed.",
    phrases: [
      "stalled",
      "stalled for",
      "months with no",
      "no progress for",
      "sitting for months",
      "abandoned",
      "not touched in",
      "collecting dust",
      "been stuck",
      "forgot where",
    ],
  },
];

const signalById = new Map(signalTaxonomy.map((signal) => [signal.id, signal]));

export function getSignal(id: SignalId): Signal {
  const signal = signalById.get(id);
  if (!signal) throw new Error(`Unknown signal: ${id}`);
  return signal;
}

export function signalsOfIds(ids: readonly SignalId[]): Signal[] {
  return ids.map(getSignal);
}

export const signalCategoryLabel: Record<SignalCategory, string> = {
  Delivery: "Delivery",
  Integration: "Integration",
  Intelligence: "Intelligence",
  Ownership: "Ownership",
};