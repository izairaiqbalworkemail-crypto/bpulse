const MODEL_TERMS = [
  "llm",
  "language model",
  "foundation model",
  "gpt",
  "openai",
  "claude",
  "gemini",
  "rag",
  "embedding",
  "inference",
  "hallucin",
  "the model",
  "a model",
  "our model",
];

const DEPARTED_TERMS = [
  "left",
  "gone",
  "quit",
  "departed",
  "nobody left",
  "no longer here",
  "no longer with",
  "fired",
  "resigned",
  "ex-dev",
  "ex developer",
  "contractor disappeared",
  "agency disappeared",
];

function haystack(parts: Array<string | undefined>) {
  return parts
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export function mentionsModel(...parts: Array<string | undefined>) {
  const text = haystack(parts);
  return MODEL_TERMS.some((term) => text.includes(term));
}

export function mentionsDeparted(...parts: Array<string | undefined>) {
  const text = haystack(parts);
  return DEPARTED_TERMS.some((term) => text.includes(term));
}
