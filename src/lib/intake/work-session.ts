import type { FieldConfig, SessionCopy } from "@/components/intake/CrewSession";
import type { Specialist } from "@/content/types";

const AI_RE = /ai|ml|model|rag|llm|gpt|agent|bot|gen\s*ai|automat/i;

const TIMELINES = [
  "asap / this month",
  "within the quarter",
  "next quarter",
  "just exploring",
];
const BUDGETS = ["< $10k", "$10k - $30k", "$30k - $75k", "$75k+"];

function firstDisplay(member: Specialist) {
  return member.name.trim().split(/\s+/)[0] ?? member.id;
}

function quoteSnippet(text: string, max = 44) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (!clean) return "…";
  if (clean.length <= max) return clean.replace(/[.,;:!?]+$/, "");
  let cut = clean.slice(0, max);
  const last = cut.lastIndexOf(" ");
  if (last > max * 0.55) cut = cut.slice(0, last);
  return `${cut.replace(/[.,;:!?]+$/, "")}…`;
}

function quoteOf(text: string, max = 44) {
  return `"${quoteSnippet(text, max)}"`;
}

export type WorkSession = {
  session: SessionCopy;
  fields: FieldConfig[];
};

/**
 * Ported from the old work-session.ts. The field options — TIMELINES and
 * BUDGETS — carry over verbatim. The session copy is rewritten to a single
 * studio voice: this is an intake form that reads like a conversation, and
 * the named person reads the brief afterwards. No impersonation inside the
 * chat, ever.
 */
export function buildWorkSession(member: Specialist): WorkSession {
  const display = firstDisplay(member);

  const fields: FieldConfig[] = [
    {
      name: "name",
      label: "Name",
      type: "input",
      input: "text",
      autoComplete: "name",
      required: true,
      placeholder: "a first name is plenty",
    },
    {
      name: "email",
      label: "Email",
      type: "input",
      input: "email",
      autoComplete: "email",
      required: true,
      placeholder: "you@company.com",
    },
    {
      name: "build",
      label: "What are we building?",
      type: "textarea",
      required: true,
      placeholder: "e.g. a payments app for freelancers that never shipped",
    },
    {
      name: "timeline",
      label: "When should it be moving?",
      type: "radio",
      options: TIMELINES,
      required: true,
    },
    {
      name: "budget",
      label: "Budget range",
      type: "select",
      options: BUDGETS,
      required: false,
    },
  ];

  const session: SessionCopy = {
    channel: `${member.id}-direct-line`,
    label: "direct line",
    pool: [member.id],
    intro: [
      {
        memberId: member.id,
        text: `You asked to work with ${display}, so this is the direct line to ${display} — not a queue, and not a bot. This is an intake form that reads like a conversation, and it saves your answers as a brief.`,
      },
      {
        memberId: member.id,
        text: `${display} reads every answer personally and replies from the inbox on this page within one business day. So write like a person — that's who reads it.`,
      },
    ],
    ask: {
      name: `first, what's your name?`,
      email: "a real email. it's the one address you'll get the reply at.",
      build: "ok, the part we care about: what are we building together? one or two lines.",
      timeline: "when do you need this moving?",
      budget:
        "rough budget range? it shapes scope, nothing more. skip it if you'd rather not say.",
    },
    owners: {
      name: member.id,
      email: member.id,
      build: member.id,
      timeline: member.id,
      budget: member.id,
    },
    mirror: {
      name: {
        kind: "plain",
        lines: [
          "{q}. good to meet you by text. this brief has your name on it already.",
          "{q}. noted. hi — it's the studio on the other end of the form.",
        ],
      },
      email: {
        kind: "plain",
        lines: [
          "{q}. that's where the reply comes, personal, no queue.",
          "{q}. saved. no drip campaigns on this floor.",
        ],
      },
      build: {
        kind: "custom",
        member: () => member.id,
        say: (answer) =>
          AI_RE.test(answer)
            ? `${quoteOf(answer)}. there's an ai angle in there, which is the ai lane. we'd start on the trainable core, leave the chrome out, then prove people actually use it.`
            : `${quoteOf(answer)}. we like that it's concrete. first move from our side: one working core loop, deployed for real, nothing else.`,
      },
      timeline: {
        kind: "plain",
        lines: [
          "{q}. noted, that sets the pace we scope to.",
          "{q}. fine by us.",
        ],
      },
      budget: {
        kind: "plain",
        lines: [
          "{q}. that shapes scope, and we'll quote inside it, flat and in writing.",
          "{q}. understood, no hourly meters here.",
        ],
      },
    },
    submitBy: member.id,
    submitLine: `${display}… that's the whole brief. saving it with your name on it and putting it on ${display}'s desk.`,
    directWith: display,
    successTitle: `On ${display}'s desk`,
    successText: `Saved and emailed to the address you just wrote from. ${display} replies within one business day. The person you asked for.`,
    errorLine: "that didn't make it through, sorry. one more tap and we resend.",
    wrongEmail: "that email looks off. mind a second pass?",
  };

  return { session, fields };
}