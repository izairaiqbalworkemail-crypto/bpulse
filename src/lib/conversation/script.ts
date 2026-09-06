import { mentionsDeparted, mentionsModel } from "./terms";
import type { Answers, Field, Script } from "./types";

const STAGES = [
  { id: "demo-only", label: "Demo only" },
  { id: "staging", label: "Staging" },
  { id: "live-fragile", label: "Live and fragile" },
  { id: "live-stuck", label: "Live and stuck" },
] as const;

const DURATIONS = [
  { id: "weeks", label: "Weeks" },
  { id: "months", label: "Months" },
  { id: "longer", label: "Longer" },
] as const;

const BUILDERS = [
  { id: "still-here", label: "Still here" },
  { id: "left", label: "They left" },
  { id: "mixed", label: "Some left, some stayed" },
  { id: "rather-not", label: "I'd rather not say" },
] as const;

export const checkScript: Script = {
  id: "check",
  source: "check-intake",
  banner:
    "This is a structured intake, not a chatbot. Nobody is typing. At the end you get a written read of what you've described, and a real person replies within one business day.",
  fields: [
    {
      name: "product",
      ask: "What are you building?",
      kind: "textarea",
      required: true,
      placeholder: "A payroll tool, a hospital scribe, a marketplace. One or two lines.",
    },
    {
      name: "stage",
      ask: "Where is it now?",
      kind: "chips",
      required: true,
      chips: STAGES,
    },
    {
      name: "attemptedProduction",
      ask: "Has production ever been attempted?",
      kind: "textarea",
      required: true,
      placeholder: "Tried once and rolled back, never tried, only a staging URL…",
      when: (answers) => answers.stage === "demo-only",
    },
    {
      name: "lastBreak",
      ask: "What broke most recently?",
      kind: "textarea",
      required: true,
      placeholder: "The last incident, in the words you would use internally.",
      when: (answers) => answers.stage === "live-fragile",
    },
    {
      name: "shipWound",
      ask: "What happens when you try to ship it?",
      kind: "textarea",
      required: true,
      placeholder: "The thing that stops the deploy, the review, or the launch.",
    },
    {
      name: "modelOnData",
      ask: "How does the model behave on real data — not the demo set?",
      kind: "textarea",
      required: true,
      placeholder: "What it gets wrong, what you cannot yet measure.",
      when: (answers) => mentionsModel(answers.product, answers.shipWound),
    },
    {
      name: "duration",
      ask: "How long has it been like this?",
      kind: "chips",
      required: true,
      chips: DURATIONS,
    },
    {
      name: "whoBuilt",
      ask: "Who built it, and are they still there?",
      kind: "chips-text",
      required: true,
      chips: BUILDERS,
      extraPlaceholder: "A name, a shop, or a short note — optional.",
    },
    {
      name: "docsLeft",
      ask: "Is any of it written down — the auth, the deploy, the decisions?",
      kind: "textarea",
      required: true,
      placeholder: "A README, a Notion page, nothing, a person who left with it.",
      when: (answers) =>
        answers.whoBuilt === "left" ||
        mentionsDeparted(answers.whoBuiltNote, answers.shipWound, answers.product),
    },
    {
      name: "deadline",
      ask: "What's the deadline that matters?",
      kind: "textarea",
      required: true,
      placeholder: "A board date, a contract, a launch window — or none.",
    },
    {
      name: "identity",
      ask: "Where do we send the read?",
      kind: "identity",
      required: true,
    },
  ],
};

export const readScript: Script = {
  id: "read",
  source: "read",
  banner:
    "One question at a time. Back is always available. What you type stays if you refresh.",
  fields: [
    {
      name: "product",
      ask: "What are you building?",
      kind: "textarea",
      required: true,
      placeholder: "A payroll tool, a hospital scribe, a marketplace. One or two lines.",
    },
    {
      name: "stage",
      ask: "Where is it now?",
      kind: "chips",
      required: true,
      chips: STAGES,
    },
    {
      name: "shipWound",
      ask: "What happens when you try to ship it?",
      kind: "textarea",
      required: true,
      placeholder: "The thing that stops the deploy, the review, or the launch.",
    },
    {
      name: "duration",
      ask: "How long has it been like this?",
      kind: "textarea",
      required: true,
      placeholder: "Weeks, months, since the person who knew it left.",
    },
    {
      name: "identity",
      ask: "Where do we send it?",
      kind: "identity",
      required: true,
    },
  ],
};

export const educationScript: Script = {
  id: "second-chair",
  source: "second-chair",
  banner:
    "This is a structured intake, not a chatbot. Nobody is typing. A named engineer reads it within one business day.",
  fields: [
    {
      name: "whoSits",
      ask: "Who would sit in the sessions?",
      kind: "textarea",
      required: true,
      placeholder: "A founder, two engineers, a new lead. Names if you have them.",
    },
    {
      name: "whatTheyHold",
      ask: "What did someone ship that they now have to hold?",
      kind: "textarea",
      required: true,
      placeholder: "The product, the repo, the part that frightens them.",
    },
    {
      name: "whatBreaks",
      ask: "What breaks when they try to change it?",
      kind: "textarea",
      required: true,
      placeholder: "A deploy, a review, a model call, a person who left.",
    },
    {
      name: "identity",
      ask: "Where should Hassan write back?",
      kind: "identity",
      required: true,
    },
  ],
};

export function visibleFields(script: Script, answers: Answers): Field[] {
  return script.fields.filter((field) => !field.when || field.when(answers));
}

export function nextOpen(script: Script, answers: Answers): Field | null {
  return (
    visibleFields(script, answers).find((field) => {
      if (field.kind === "identity") {
        return !answers.name?.trim() || !answers.email?.trim();
      }
      return !(answers[field.name] ?? "").trim();
    }) ?? null
  );
}

export function fieldComplete(field: Field, answers: Answers) {
  if (field.kind === "identity") {
    return Boolean(answers.name?.trim() && answers.email?.trim());
  }
  return Boolean((answers[field.name] ?? "").trim());
}
