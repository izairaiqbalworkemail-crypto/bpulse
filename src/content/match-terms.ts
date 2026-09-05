/**
 * Capability dictionary for the match engine.
 * Edit terms here — the scorer does not change.
 * Never presented as AI.
 */
export const capabilityTerms = {
  delivery: [
    "deploy",
    "ci",
    "cd",
    "pipeline",
    "staging",
    "production",
    "docker",
    "kubernetes",
    "env",
    "release",
    "uptime",
    "rollback",
    "monitoring",
    "devops",
    "infra",
    "infrastructure",
  ],
  integration: [
    "api",
    "webhook",
    "third-party",
    "legacy",
    "migration",
    "sso",
    "auth",
    "authentication",
    "payment",
    "erp",
    "crm",
    "sync",
    "oauth",
    "integration",
  ],
  intelligence: [
    "model",
    "llm",
    "rag",
    "embedding",
    "eval",
    "evals",
    "inference",
    "prompt",
    "fine-tune",
    "finetune",
    "hallucination",
    "latency",
    "agent",
    "agents",
  ],
} as const;

export type MatchCapability = keyof typeof capabilityTerms;

export const matchStackChips = [
  "TypeScript",
  "Next.js",
  "React",
  "Node",
  "Python",
  "AWS",
  "PostgreSQL",
  "Docker",
  "Kubernetes",
  "React Native",
] as const;
