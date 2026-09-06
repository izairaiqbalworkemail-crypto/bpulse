import type { FieldConfig } from "@/lib/intake/types";

const AI_RE = /ai|ml|model|rag|llm|gpt|agent|bot|gen\s*ai|automat/i;

function clip(text: string, max = 52) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean.replace(/[.,;:!?]+$/, "");
  let cut = clean.slice(0, max);
  const last = cut.lastIndexOf(" ");
  if (last > max * 0.55) cut = cut.slice(0, last);
  return `${cut.replace(/[.,;:!?]+$/, "")}…`;
}

export function askLine(field: FieldConfig, answers: Record<string, string>): string {
  if (field.name === "build") {
    const wound = answers.situation ?? answers.stage ?? "";
    if (/stalled/i.test(wound)) return "Who left, and what is still in the repo?";
    if (/fragile|live/i.test(wound)) return "What is live, and what breaks when you ship?";
    if (/idea/i.test(wound)) {
      return "What is the idea, in one or two lines? If nothing is built, we will say the Check is the wrong door.";
    }
    if (/almost/i.test(wound)) return "What is the last thing that will not ship?";
    return "What are you sitting on that will not ship?";
  }
  if (field.name === "situation") {
    return "Which is it — almost done, stalled, live but fragile, or still an idea?";
  }
  if (field.name === "stack") return "What is the stack, roughly?";
  if (field.name === "access") return "Can we read the repo, or not yet?";
  if (field.name === "name") return "What do we call you? A first name is plenty.";
  if (field.name === "email") return "Where should the reply land? A real inbox.";
  if (field.name === "codeLocation") return "A repo, if you have one. Skip it if you don't.";
  if (field.name === "company") return "Company, or stealth?";
  if (field.name === "idea") return "What's the product, in one or two lines?";
  if (field.name === "spec") return "A written spec, or just the idea?";
  if (field.name === "budget") return "A range, if you have one — or skip it.";
  if (field.name === "progress") return "How far did it get?";
  if (field.name === "stage") return "Where is it, honestly?";
  if (field.name === "mode") return "Which door — join, or pitch?";
  if (field.name === "link") return "A link we can open.";
  if (field.name === "detail") return "What would you bring, or what's the idea?";
  if (field.name === "timeline") return "When does this need to be moving?";
  return field.label;
}

export function readBack(
  field: FieldConfig,
  answer: string,
  answers: Record<string, string>,
): string {
  const q = clip(answer);

  if (field.name === "situation") {
    if (/idea/i.test(answer)) {
      return `“${q}.” Then the Check is the wrong door — we will still reply and say so. If something is already built, stay.`;
    }
    if (/stalled/i.test(answer)) {
      return `“${q}.” Familiar. We read the repo cold and say what is salvageable.`;
    }
    if (/fragile|live/i.test(answer)) {
      return `“${q}.” Then this is a hold test, not a rebuild pitch.`;
    }
    return `“${q}.” That last twenty is the work. Keep, repair, or rebuild.`;
  }

  if (field.name === "build") {
    if (/idea/i.test(answers.situation ?? "")) {
      return `“${q}.” Logged. If there is no repo yet, we will say the Check is the wrong door.`;
    }
    if (AI_RE.test(answer)) {
      return `“${q}.” There is a model in there. We treat that as a product, not a prompt.`;
    }
    return `“${q}.” That is the wound. Five days: read, trace, map, grade, report.`;
  }

  if (field.name === "stack") {
    if (/next|react/i.test(answer)) return `“${q}.” Familiar floor. We will walk it cold.`;
    if (/mobile/i.test(answer)) {
      return `“${q}.” Then the last twenty is usually store, auth, and the API it leans on.`;
    }
    return `“${q}.” The Check is the condition, not the fashion.`;
  }

  if (field.name === "access") {
    if (/full/i.test(answer)) return `“${q}.” Then day one is a read, not a hunt.`;
    if (/partial/i.test(answer)) {
      return `“${q}.” We start with what you can share and list what is missing.`;
    }
    return `“${q}.” Fine. The reply will say exactly what we need to open it.`;
  }

  if (field.name === "name") return `“${q}.” The brief has a name on it now.`;
  if (field.name === "email") return `“${q}.” That is where the condition report lands.`;
  if (field.name === "timeline") return `“${q}.” That sets the pace we scope to.`;
  if (field.name === "budget") return `“${q}.” That shapes scope. Flat, in writing.`;
  if (field.name === "stage") return `“${q}.” Noted.`;
  if (field.name === "mode") return `“${q}.” The door is marked.`;

  return `“${q}.” On the brief.`;
}

export function arrivalGrade(situation: string): string {
  if (/stalled/i.test(situation)) return "Stalled on arrival";
  if (/fragile|live/i.test(situation)) return "Unstable on arrival";
  if (/idea/i.test(situation)) return "Wrong door — nothing built";
  if (/almost/i.test(situation)) return "Incomplete on arrival";
  return "Condition unwritten";
}

export const docketLabel: Record<string, string> = {
  situation: "Where it's stuck",
  build: "What it is",
  stack: "Floor",
  access: "Access you can give",
  name: "How to reach you",
  email: "Inbox",
  codeLocation: "Repo",
  company: "Org",
  idea: "Product",
  spec: "Spec",
  budget: "Band",
  timeline: "Pace",
  stage: "Stage",
  progress: "Progress",
  mode: "Door",
  link: "Link",
  detail: "Note",
};

export function fromTheWords(filled: string[]): string | null {
  if (filled.length === 0) return null;
  const bits = filled.map((name) => docketLabel[name] ?? name);
  return `From the words: ${bits.join(", ").toLowerCase()}.`;
}
