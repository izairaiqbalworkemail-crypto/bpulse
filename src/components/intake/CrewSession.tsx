"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";

import { buildWorkSession } from "@/lib/intake/work-session";
import { brand } from "@/config/brand";
import { specialists } from "@/content/specialists";
import type { Specialist } from "@/content/types";

export type IntakeType = "start" | "rescue" | "contact" | "careers" | "work";

export type FieldConfig =
  | {
      name: string;
      label: string;
      type: "input";
      input?: string;
      autoComplete?: string;
      required: boolean;
      placeholder?: string;
    }
  | { name: string; label: string; type: "textarea"; required: boolean; placeholder?: string }
  | { name: string; label: string; type: "select"; options: string[]; required: boolean }
  | { name: string; label: string; type: "radio"; options: string[]; required: boolean };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const AI_RE = /ai|ml|model|rag|llm|gpt|agent|bot|gen\s*ai|automat/i;
const LEGAL_RE = /equit|ownership|ip\b|contract|split|rev\s*\.?\s*share|legal/i;

const PLACEHOLDERS: Record<string, string> = {
  name: "Type a name…",
  company: "Stealth counts",
  email: "you@company.com",
  idea: "e.g. Slack for mushroom farmers",
  codeLocation: "Paste the repo url…",
  link: "Paste a link…",
  build: "e.g. a payments app for freelancers that stalled at login",
  detail: "e.g. I run a Shopify app with 400 paying merchants…",
};

type IntroLine = { memberId: string; text: string };

type CustomMirror = {
  kind: "custom";
  member: (answer: string, answers: Record<string, string>) => string;
  say: (answer: string, answers: Record<string, string>) => string;
};

type MirrorSpec =
  | { kind: "plain"; lines: string[] }
  | { kind: "branch"; if: RegExp; then: string[]; otherwise: string[] }
  | CustomMirror;

export type SessionCopy = {
  channel: string;
  label: string;
  pool: string[];
  intro: IntroLine[];
  ask: Record<string, string>;
  owners: Record<string, string>;
  askPick?: Record<string, (answers: Record<string, string>) => string>;
  mirror: Record<string, MirrorSpec>;
  submitBy: string;
  submitLine: string;
  directWith?: string;
  successTitle: string;
  successText: string;
  errorLine: string;
  wrongEmail: string;
};

/*
 * Ported from the old crew-session.tsx SESSIONS. The sequencing, asks, and
 * AI / LEGAL branching copy carry over; every line that impersonated a named
 * person is rewritten to the studio voice. This is an intake form that talks
 * like a conversation — a person reads the saved brief afterwards.
 */
const SESSIONS: Record<IntakeType, SessionCopy> = {
  start: {
    channel: "new-build",
    label: "scope session",
    pool: ["aneeb", "hassan", "suhaib", "najiullah"],
    intro: [
      {
        memberId: "aneeb",
        text: "This is the scope session for a new build. Every answer you give lands on a live brief as you go — a person reads it, not a queue.",
      },
      {
        memberId: "hassan",
        text: "A few short questions, then the brief is complete: your name, a real email, the product in one or two lines, and a budget range. A senior replies from a real inbox within one business day.",
      },
    ],
    ask: {
      name: "First, what do we call you? A first name is plenty.",
      company:
        "Company or org? If it's unnamed yet, \u201cstealth\u201d is a valid answer.",
      email: "A real email - it's the one address the brief is replied to.",
      idea: "Now the part worth reading. What's the product, in one or two lines?",
      spec: "A written spec you can send, or just the idea? Both work, they just change how the brief is read.",
      budget: "Rough budget range? It shapes scope, nothing more. Skip it if you'd rather not say.",
    },
    owners: {
      name: "aneeb",
      company: "aneeb",
      email: "aneeb",
      idea: "aneeb",
      spec: "aneeb",
      budget: "aneeb",
    },
    askPick: {
      spec: (answers) => (AI_RE.test(answers.idea ?? "") ? "najiullah" : "aneeb"),
    },
    mirror: {
      name: {
        kind: "plain",
        lines: [
          "\u201c{q}\u201d. Good to meet you by text.",
          "\u201c{q}\u201d. Noted. Short part's over, let's get to the build.",
        ],
      },
      company: {
        kind: "plain",
        lines: [
          "\u201c{q}\u201d. Logged. And \u201cstealth\u201d is a fine company name.",
          "\u201c{q}\u201d. Got it, the brief is tagged with that.",
        ],
      },
      email: {
        kind: "plain",
        lines: [
          "\u201c{q}\u201d. That's the address the reply lands in. On we go.",
          "\u201c{q}\u201d. Got it - that inbox goes to a real person, not a drip campaign.",
        ],
      },
      idea: {
        kind: "custom",
        member: (answer) => (AI_RE.test(answer) ? "najiullah" : "aneeb"),
        say: (answer) =>
          AI_RE.test(answer)
            ? `\u201c${quoteOf(answer)}\u201d is the ai lane - the trainable core first, chrome later. It'd start there.`
            : `\u201c${quoteOf(answer)}\u201d. Concrete is good. First build: one core loop, a real deploy, nothing else.`,
      },
      spec: {
        kind: "branch",
        if: /written/i,
        then: [
          "A written spec - the only filter that's trusted. Send it after this and every line is read before the quote.",
        ],
        otherwise: [
          "Just an idea, no problem. Specs get extracted for a living around here - it becomes a one-page scope before building.",
        ],
      },
      budget: {
        kind: "plain",
        lines: [
          "\u201c{q}\u201d. Fine - that sets the ceiling on scope, and the price sits inside it after an audit.",
          "\u201c{q}\u201d. Understood. Flat quote, agreed in writing before any code.",
        ],
      },
    },
    submitBy: "aneeb",
    submitLine: "That's the whole brief. Saving it and handing it over now.",
    successTitle: "Brief captured",
    successText:
      "Your brief is saved, reference-locked, and on its way. A senior replies within one business day, with the person who'd build it.",
    errorLine: "That didn't make it through. Give it one more tap and we resend.",
    wrongEmail: "That email looks off. Mind a second pass?",
  },
  rescue: {
    channel: "rescue-room",
    label: "triage session",
    pool: ["suhaib", "aneeb", "hassan", "mazar"],
    intro: [
      {
        memberId: "suhaib",
        text: "This is a triage session for a stalled build. Ghosted repos make up most of our weeks around here, so you're not the first and you won't be the last.",
      },
      {
        memberId: "aneeb",
        text: "Seven questions and this thing is triaged. Once we know where the code lives, we walk it cold and tell you straight what's salvageable - within one business day, from a real inbox.",
      },
    ],
    ask: {
      name: "First, who are we in the repo with?",
      company: "And the company or project it belongs to?",
      email: "A real email for the reply. No lists, promise.",
      codeLocation:
        "Where does the code live? A repo link, a zip, or a laptop that's gone quiet. All familiar.",
      progress: "How far did the last team actually get?",
      access: "Codebase and credentials - how close are we to full access?",
      budget: "Budget range? It shapes the rescue plan, nothing more.",
    },
    owners: {
      name: "suhaib",
      company: "suhaib",
      email: "suhaib",
      codeLocation: "suhaib",
      progress: "suhaib",
      access: "aneeb",
      budget: "aneeb",
    },
    mirror: {
      name: {
        kind: "plain",
        lines: [
          "\u201c{q}\u201d. Good, a real name to put on the brief.",
          "\u201c{q}\u201d. Noted, we're in the repo together now.",
        ],
      },
      company: {
        kind: "plain",
        lines: [
          "\u201c{q}\u201d. Tagged, the project name stays on the brief.",
          "\u201c{q}\u201d. Got it, filed under the rescue file.",
        ],
      },
      email: {
        kind: "plain",
        lines: [
          "\u201c{q}\u201d. That's the address the verdict lands in. Noted.",
          "\u201c{q}\u201d. Got it. Exactly where the reply arrives.",
        ],
      },
      codeLocation: {
        kind: "plain",
        lines: [
          "\u201c{q}\u201d. Right about where expected. Send read access and the walk starts.",
          "\u201c{q}\u201d. Noted, the usual address for a lost weekend. It'll be taken from there.",
        ],
      },
      progress: {
        kind: "custom",
        member: (answer) => (/80%/i.test(answer) ? "hassan" : /feature/i.test(answer) ? "mazar" : "suhaib"),
        say: (answer) =>
          /80%/i.test(answer)
            ? "\u201c80% done\u201d - heard that a dozen times a month. It usually means staging works and production was never born. That's a missing env, and missing envs are our floor."
            : /feature/i.test(answer)
              ? "\u201cFeature-complete\u201d, and yet not live. Classic rescue cue. The break is found before you find it."
              : /half/i.test(answer)
                ? "\u201cHalf-built\u201d. Honest, and honestly the best place to start. We drop anchors, we don't ship rewrites."
                : `\u201c${quoteOf(answer)}\u201d. Right at the start of a rescue, then. Nothing to defend - we read, then we triage.`,
      },
      access: {
        kind: "custom",
        member: (answer) => (/full/i.test(answer) ? "aneeb" : /partial/i.test(answer) ? "hassan" : "suhaib"),
        say: (answer) =>
          /full/i.test(answer)
            ? "\u201cYes, full access\u201d. Perfect. We lock it down, audit with receipts, and the countdown starts on the quote."
            : /partial/i.test(answer)
              ? `\u201c${quoteOf(answer)}\u201d. Fine by us. We work with read access and bridge the rest as we go, mapping what we can't reach.`
              : `\u201c${quoteOf(answer)}\u201d. OK, slow start. There's almost always a route in, we just agree the steps first.`,
      },
      budget: {
        kind: "plain",
        lines: [
          "\u201c{q}\u201d. Noted. Flat quote, agreed after the audit, before anyone touches code.",
          "\u201c{q}\u201d. Fine, that shapes how deep the first pass goes.",
        ],
      },
    },
    submitBy: "suhaib",
    submitLine: "Triage brief complete. Saving it and passing it to the rescue room now.",
    successTitle: "Brief captured",
    successText:
      "Brief saved and on its way. Within one business day you'll know exactly what's salvageable and the fastest route to live.",
    errorLine: "That didn't make it through. One more tap and we resend.",
    wrongEmail: "That email looks off. Mind a second pass?",
  },
  contact: {
    channel: "new-idea",
    label: "idea session",
    pool: ["aneeb", "suhaib", "hassan", "najiullah"],
    intro: [
      {
        memberId: "aneeb",
        text: "This is the idea session. If you weren't sure which door to knock on, this is it - everything you send lands on a brief that gets saved.",
      },
      {
        memberId: "suhaib",
        text: "A person answers within one business day, from a real inbox. No drip campaign, no ticket queue.",
      },
    ],
    ask: {
      name: "First, what's your name? A first name is plenty.",
      email: "Your email - the one address a real person replies to.",
      stage: "Where's the idea today? Rough, written, or already building?",
      build: "What are you sitting on? One or two lines, nobody's grading it.",
      budget: "Budget range? It shapes what we'd scope first, nothing more.",
    },
    owners: {
      name: "aneeb",
      email: "aneeb",
      stage: "suhaib",
      build: "aneeb",
      budget: "aneeb",
    },
    askPick: {
      build: (answers) => (AI_RE.test(answers.build ?? "") ? "najiullah" : "aneeb"),
    },
    mirror: {
      name: {
        kind: "plain",
        lines: [
          "\u201c{q}\u201d. Good to meet you by text. The rest stays light.",
          "\u201c{q}\u201d. Noted. Nice to meet you proper.",
        ],
      },
      email: {
        kind: "plain",
        lines: [
          "\u201c{q}\u201d. Noted, that's the inbox a real human replies to.",
          "\u201c{q}\u201d. Saved. This is the one address we'll use.",
        ],
      },
      stage: {
        kind: "custom",
        member: (answer) => (/rough/i.test(answer) ? "aneeb" : /spec/i.test(answer) ? "suhaib" : "hassan"),
        say: (answer) =>
          /rough/i.test(answer)
            ? "\u201cRough idea\u201d. Perfect starting point, rough is honest. We blank-slate it and find the one thing worth building."
            : /spec/i.test(answer)
              ? "\u201cSpec written\u201d. Rare and welcome. It's read before anything is commented on."
              : "\u201cAlready building\u201d. Then we talk about the gap, not the dream. Tell us what's live and what's stuck.",
      },
      build: {
        kind: "custom",
        member: (answer) => (AI_RE.test(answer) ? "najiullah" : "aneeb"),
        say: (answer) =>
          AI_RE.test(answer)
            ? `\u201c${quoteOf(answer)}\u201d - there's an AI angle in there, and that's the ai lane. Trainable core first, chrome out.`
            : `\u201c${quoteOf(answer)}\u201d. That one's liked. First thing to prove: that someone would use it before we make it pretty.`,
      },
      budget: {
        kind: "plain",
        lines: [
          "\u201c{q}\u201d. Fine - the quote lands after we read the real thing, flat and in writing.",
          "\u201c{q}\u201d. Understood, no hourly meters on this floor.",
        ],
      },
    },
    submitBy: "aneeb",
    submitLine: "Brief complete. Saving and handing it over now.",
    successTitle: "Brief captured",
    successText:
      "Saved with a reference, emailed to the address you gave. A senior replies within one business day. No drip campaign, just a person.",
    errorLine: "That didn't make it through. One more tap and we resend.",
    wrongEmail: "That email looks off. Mind a second pass?",
  },
  careers: {
    channel: "studio",
    label: "studio session",
    pool: ["madiha", "hamza"],
    intro: [
      {
        memberId: "madiha",
        text: "This is the studio session. A quick fork: either you're pitching the studio something to build, or you're pitching yourself to join it. This conversation is the whole door, and it lands on a person's desk either way.",
      },
    ],
    ask: {
      mode: "Which door? Pitching an idea to build, or joining the studio?",
      name: "What's your name?",
      email: "A real email. A person replies, that's the whole promise.",
      link: "Drop a link. Portfolio, repo, resume, something you've shipped. Optional, always helps.",
      detail: "The real bit. What you'd bring, or the idea itself: who it's for and why it matters.",
    },
    owners: {
      mode: "madiha",
      name: "madiha",
      email: "madiha",
      link: "madiha",
      detail: "madiha",
    },
    askPick: {
      detail: (answers) =>
        (answers.mode ?? "").toLowerCase().includes("pitch") ? "madiha" : "madiha",
    },
    mirror: {
      mode: {
        kind: "custom",
        member: () => "madiha",
        say: (answer) =>
          /join/i.test(answer)
            ? "\u201cJoin the studio\u201d. Love it. The floor's tight and the work ships for real. Who are you, and what do you make?"
            : "\u201cPitch an idea\u201d. Good. We've watched too many founders pay a dev shop to ignore the idea. We don't do that here. Now, the idea itself.",
      },
      name: {
        kind: "plain",
        lines: [
          "\u201c{q}\u201d. Noted, good to meet you.",
          "\u201c{q}\u201d. On the brief. Hi.",
        ],
      },
      email: {
        kind: "plain",
        lines: [
          "\u201c{q}\u201d. That's the inbox the reply lands in. No ATS black hole here.",
          "\u201c{q}\u201d. Saved. A real human comes back to this address.",
        ],
      },
      link: {
        kind: "plain",
        lines: [
          "\u201c{q}\u201d. Saved, it's read before any call.",
          "\u201c{q}\u201d. Good, that shortens the intro considerably.",
        ],
      },
      detail: {
        kind: "custom",
        member: (answer, answers) =>
          LEGAL_RE.test(answer)
            ? "hamza"
            : (answers.mode ?? "").toLowerCase().includes("pitch")
              ? "madiha"
              : "madiha",
        say: (answer, answers) =>
          LEGAL_RE.test(answer)
            ? `\u201c${quoteOf(answer)}\u201d - and you're already thinking about the split, which means you're thinking like a founder. The papers get handled so the deal stays clean.`
            : (answers.mode ?? "").toLowerCase().includes("pitch")
              ? `\u201c${quoteOf(answer)}\u201d. Solid place to start. First move: prove it on ten real users before the first line. If ten people want it, we build it.`
              : `\u201c${quoteOf(answer)}\u201d. That's the energy the studio runs on. Details get routed to the right table tonight and you'll hear back within one business day.`,
      },
    },
    submitBy: "madiha",
    submitLine: "Brief complete. Sending it over to the studio table now.",
    successTitle: "Brief captured",
    successText:
      "Saved and on its way to a real person. No ATS, no black hole. You'll hear back within one business day.",
    errorLine: "That didn't make it through. One more tap and we resend.",
    wrongEmail: "That email looks off. Mind a second pass?",
  },
  work: {
    channel: "direct-line",
    label: "direct line",
    pool: ["aneeb", "suhaib", "hassan", "najiullah"],
    intro: [
      {
        memberId: "aneeb",
        text: "This is a direct line - what you send lands with the person you picked, not a queue. Tell us what you want to build.",
      },
    ],
    ask: {
      name: "First, what's your name?",
      email: "A real email - it's the one address you'll get the reply at.",
      build: "So what are we building together? One or two lines.",
      timeline: "When does it need to be moving?",
      budget: "Rough budget range? It shapes scope, nothing more. Skip it if you'd rather not say.",
    },
    owners: {
      name: "aneeb",
      email: "aneeb",
      build: "aneeb",
      timeline: "aneeb",
      budget: "aneeb",
    },
    mirror: {
      name: {
        kind: "plain",
        lines: ["\u201c{q}\u201d. Good to meet you by text.", "\u201c{q}\u201d. Noted."],
      },
      email: {
        kind: "plain",
        lines: [
          "\u201c{q}\u201d. That's the address the reply goes to.",
          "\u201c{q}\u201d. Noted.",
        ],
      },
      build: {
        kind: "plain",
        lines: [
          "\u201c{q}\u201d. That one's liked. First move is always one working core loop, shipped for real.",
          "\u201c{q}\u201d. Good, that's the kind of build worth a desk.",
        ],
      },
      timeline: {
        kind: "plain",
        lines: ["\u201c{q}\u201d. Noted, that sets the pace.", "\u201c{q}\u201d. Understood."],
      },
      budget: {
        kind: "plain",
        lines: ["\u201c{q}\u201d. Fine, that shapes scope.", "\u201c{q}\u201d. Noted."],
      },
    },
    submitBy: "aneeb",
    submitLine: "That's the whole brief. Saving it and keeping it on the desk. Expect a reply within one business day.",
    successTitle: "Brief captured",
    successText:
      "Brief saved and emailed. A senior replies within one business day, from the address you just talked to.",
    errorLine: "That didn't make it through. One more tap and we resend.",
    wrongEmail: "That email looks off. Mind a second pass?",
  },
};

type Msg =
  | { id: number; kind: "text"; from: "bot" | "you"; text: string; agentId?: string }
  | { id: number; kind: "note"; text: string }
  | { id: number; kind: "chips"; name: string; options: string[] }
  | { id: number; kind: "success"; title: string; text: string };

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;

type MsgInput = DistributiveOmit<Msg, "id">;

type Task = (done: () => void) => void;

function isChoice(
  field: FieldConfig | null,
): field is Extract<FieldConfig, { type: "select" | "radio" }> {
  return field !== null && (field.type === "select" || field.type === "radio");
}

function shortId(id: string) {
  return id.slice(0, 8).toUpperCase();
}

function memberById(id: string): Specialist {
  return specialists.find((m) => m.id === id) ?? specialists[0];
}

function sentenceCase(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  let next = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
  next = next.replace(/([.!?]\s+)([a-z])/g, (_, sep: string, char: string) => `${sep}${char.toUpperCase()}`);
  next = next.replace(/\bi\b/g, "I");
  return next;
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

/**
 * The conversation intake, ported from bpulse's crew-session.tsx.
 *
 * Ported whole: chat-column UI, message sequencing, step progression,
 * EMAIL / AI / LEGAL branching, option chips, progress bar, the capture-sheet
 * brief drawer, the satisfaction capture, and the printable record.
 *
 * Stripped: typing indicator and simulated typing delays, green presence
 * dots, a named crew member appearing to reply in real time, and the
 * "online · replies in a day" claim. Replaced by a plain label at the top:
 * this is an intake form that reads like a conversation.
 */
export function CrewSession({
  type,
  fields: incoming,
  session: sessionOverride,
  workWith,
}: {
  type: IntakeType;
  fields?: FieldConfig[];
  session?: SessionCopy;
  workWith?: string;
}) {
  const work = useMemo(
    () => (workWith ? buildWorkSession(memberById(workWith)) : null),
    [workWith],
  );
  const session = sessionOverride ?? work?.session ?? SESSIONS[type] ?? SESSIONS.contact;
  const fields = work?.fields ?? incoming ?? [];
  const lead = memberById(session.pool[0]);
  const reduce = useReducedMotion();

  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [botBusy, setBotBusy] = useState(false);
  const [currentField, setCurrentField] = useState<FieldConfig | null>(null);
  const [phase, setPhase] = useState<"chatting" | "sending" | "done">("chatting");
  const [input, setInput] = useState("");
  const [inputError, setInputError] = useState("");
  const [shake, setShake] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [sessionId, setSessionId] = useState("");
  const [deliveryNote, setDeliveryNote] = useState("");
  const [briefOpen, setBriefOpen] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  // Reset when the target session or fields change (e.g. navigating between
  // team direct lines). References are stable via useMemo above, so this runs
  // once per session.
  const sessionKey = useMemo(
    () => `${type}:${workWith ?? session.channel}`,
    [type, workWith, session.channel],
  );

  const queueRef = useRef<Task[]>([]);
  const runningRef = useRef(false);
  const timersRef = useRef<number[]>([]);
  const idRef = useRef(1);
  const stepRef = useRef(0);
  const answersRef = useRef<Record<string, string>>({});
  const rotRef = useRef<Record<string, number>>({});
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  function schedule(fn: () => void, ms: number) {
    const scaled = reduce ? Math.min(ms, 90) : ms;
    const t = window.setTimeout(fn, scaled);
    timersRef.current.push(t);
  }

  function pushMessage(msg: MsgInput): number {
    const id = idRef.current++;
    setMsgs((prev) => [...prev, { ...msg, id } as Msg]);
    return id;
  }

  function kick() {
    if (runningRef.current) return;
    const task = queueRef.current.shift();
    if (!task) {
      setBotBusy(false);
      return;
    }
    runningRef.current = true;
    task(() => {
      runningRef.current = false;
      kick();
    });
  }

  // Message pacing past the empty brief. No typing UI — this only spaces the
  // sequence so the form "reads" instead of slamming four bubbles at once.
  function botPause(text: string) {
    if (reduce) return 60;
    if (text.length > 90) return 720;
    if (text.length > 40) return 540;
    return 400;
  }

  function readTime(text: string) {
    return reduce ? 60 : Math.max(300, Math.min(1500, Math.round(text.length * 15)));
  }

  function buildMirror(
    fieldName: string,
    answer: string,
    answers: Record<string, string>,
  ): { memberId: string; text: string } {
    const spec =
      session.mirror[fieldName] ??
      ({
        kind: "plain",
        lines: [`\u201c{q}\u201d. Noted, it's on the brief.`],
      } as MirrorSpec);
    if (spec.kind === "custom") {
      return {
        memberId: spec.member(answer, answers),
        text: spec.say(answer, answers),
      };
    }
    const chosen =
      spec.kind === "branch" ? (spec.if.test(answer) ? spec.then : spec.otherwise) : spec.lines;
    const key = `${session.channel}:${fieldName}`;
    const idx = rotRef.current[key] ?? 0;
    rotRef.current[key] = idx + 1;
    return {
      memberId: session.owners[fieldName] ?? session.pool[0],
      text: chosen[idx % chosen.length].replace("{q}", quoteOf(answer)),
    };
  }

  function buildAsk(fieldName: string, answers: Record<string, string>) {
    const pick = session.askPick?.[fieldName];
    return {
      memberId: pick ? pick(answers) : session.owners[fieldName] ?? session.pool[0],
      text: session.ask[fieldName] ?? "",
    };
  }

  function pushBot(text: string, memberId: string) {
    pushMessage({ kind: "text", from: "bot", text, agentId: memberId });
  }

  function sceneBot(text: string, memberId: string): Task {
    return (done) => {
      setBotBusy(true);
      schedule(() => {
        setBotBusy(false);
        pushBot(text, memberId);
        schedule(done, readTime(text));
      }, botPause(text));
    };
  }

  function sceneQuestion(field: FieldConfig, memberId: string): Task {
    const text = buildAsk(field.name, answersRef.current).text || field.label;
    return (done) => {
      setBotBusy(true);
      schedule(() => {
        setBotBusy(false);
        setCurrentField((current) => (current?.name === field.name ? current : field));
        pushBot(text, memberId);
        if (isChoice(field)) {
          pushMessage({ kind: "chips", name: field.name, options: field.options });
        }
        schedule(done, 140);
      }, botPause(text));
    };
  }

  function completeStep() {
    const index = stepRef.current;
    const isLast = index === fields.length - 1;
    stepRef.current += 1;
    setAnswered(stepRef.current);
    const field = fields[index];
    const value = answersRef.current[field.name] ?? "";
    const skipped = !value.trim() && !field.required;
    if (skipped) {
      queueRef.current.push(
        sceneBot("Noted, skipped. No pressure.", session.owners[field.name] ?? session.pool[0]),
      );
    } else {
      const mirror = buildMirror(field.name, value, answersRef.current);
      queueRef.current.push(sceneBot(mirror.text, mirror.memberId));
    }
    if (isLast) {
      queueRef.current.push(sceneSubmit());
    } else {
      const nextField = fields[stepRef.current];
      if (nextField) {
        const ask = buildAsk(nextField.name, answersRef.current);
        queueRef.current.push(sceneQuestion(nextField, ask.memberId));
      }
    }
    kick();
  }

  function errorMessage(field: FieldConfig, value: string): string {
    const trimmed = value.trim();
    if (field.name === "email") {
      if (!trimmed) return "We need an email to reply to.";
      if (!EMAIL_RE.test(trimmed)) return session.wrongEmail;
      return "";
    }
    if (field.name === "build" && trimmed.length < 10) {
      return "Give us a line or two. Ten characters of real description still counts.";
    }
    if (field.name === "detail" && trimmed.length < 10) {
      return "A couple of lines, enough that we can take it seriously.";
    }
    if (field.name === "idea" && trimmed.length < 10) {
      return "One or two lines, just enough to know what we're building.";
    }
    if (field.required && !trimmed) return "That's a required one. Type something in.";
    return "";
  }

  function submitAnswer(value: string) {
    const field = currentField;
    if (!field) return;
    const err = errorMessage(field, value);
    if (err) {
      setInputError(err);
      setShake((s) => s + 1);
      return;
    }
    setInputError("");
    setInput("");
    const trimmed = value.trim();
    const saved = { ...answersRef.current, [field.name]: trimmed };
    answersRef.current = saved;
    setAnswers(saved);
    pushMessage({ kind: "text", from: "you", text: trimmed });
    completeStep();
  }

  function submitChip(fieldName: string, option: string) {
    if (fieldName === "__retry__") {
      pushMessage({ kind: "text", from: "you", text: option });
      setPhase("sending");
      void doSubmit();
      return;
    }
    const saved = { ...answersRef.current, [fieldName]: option };
    answersRef.current = saved;
    setAnswers(saved);
    pushMessage({ kind: "text", from: "you", text: option });
    const field = fields.find((f) => f.name === fieldName);
    if (field) completeStep();
  }

  function sceneSubmit(): Task {
    return (done) => {
      const memberId = session.submitBy;
      setBotBusy(true);
      schedule(() => {
        setBotBusy(false);
        pushBot(session.submitLine, memberId);
        schedule(() => {
          void doSubmit();
          done();
        }, 420);
      }, botPause(session.submitLine));
    };
  }

  async function doSubmit() {
    setPhase("sending");
    const clientId = sessionId || "";
    try {
      const body = {
        type,
        clientId,
        requestId: clientId,
        website: honeypot,
        with: session.directWith ?? "",
        ...answersRef.current,
      };
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = (await response.json()) as { ok?: boolean; id?: string };
      if (!response.ok || !data.ok) throw new Error("not ok");
      pushMessage({
        kind: "success",
        title: session.successTitle,
        text: session.successText,
      });
      setPhase("done");
      setDeliveryNote(`Brief ${shortId(data.id ?? clientId)} · captured · saved · emailed`);
    } catch {
      setPhase("chatting");
      pushBot(session.errorLine, session.pool[0]);
      queueRef.current.push((done) => {
        setBotBusy(true);
        schedule(() => {
          setBotBusy(false);
          pushMessage({ kind: "chips", name: "__retry__", options: ["Resend the brief"] });
          schedule(done, 140);
        }, 300);
      });
      kick();
    }
  }

  useEffect(() => {
    if (!fields.length) return;
    const init = () => {
      timersRef.current.forEach((t) => window.clearTimeout(t));
      timersRef.current = [];
      idRef.current = 1;
      queueRef.current = [];
      stepRef.current = 0;
      answersRef.current = {};
      rotRef.current = {};
      setAnswers({});
      setAnswered(0);
      setMsgs([]);
      setPhase("chatting");
      setDeliveryNote("");
      setBriefOpen(false);
      setSessionId(globalThis.crypto.randomUUID());

      session.intro.forEach((line) =>
        queueRef.current.push(sceneBot(line.text, line.memberId)),
      );
      const first = buildAsk(fields[0].name, {});
      queueRef.current.push(sceneQuestion(fields[0], first.memberId));

      runningRef.current = false;
      kick();
    };
    const boot = window.setTimeout(init, 0);
    return () => window.clearTimeout(boot);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionKey, fields, type]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [msgs, botBusy, reduce]);

  useEffect(() => {
    if (!currentField || isChoice(currentField) || phase !== "chatting") return;
    const t = window.setTimeout(() => inputRef.current?.focus(), reduce ? 0 : 340);
    return () => window.clearTimeout(t);
  }, [currentField, phase, reduce]);

  const readyForInput =
    phase === "chatting" && !botBusy && currentField !== null && !isChoice(currentField);

  function autoGrow(el: HTMLTextAreaElement) {
    el.style.height = "0px";
    el.style.height = `${Math.min(el.scrollHeight, 132)}px`;
  }

  const send = () => {
    if (!readyForInput) return;
    submitAnswer(input);
  };

  const progress =
    phase === "done" || answered === fields.length
      ? 100
      : Math.max(4, (answered / Math.max(fields.length, 1)) * 100);
  const nextField = isChoice(currentField) ? null : currentField;
  const isDirect = type === "work" && !!workWith;

  return (
    <>
      {/* Printable record — landscape, single PDF. Studio marks only, no person. */}
      <div className="print-cert-page" aria-hidden>
        <div
          style={{
            backgroundColor: "#151c25",
            color: "#f7f4ee",
            fontFamily: "var(--font-plex-sans), ui-sans-serif, system-ui, sans-serif",
            padding: 26,
            boxSizing: "border-box",
            WebkitPrintColorAdjust: "exact",
            printColorAdjust: "exact",
          }}
        >
          <div
            style={{
              border: "1px solid rgba(239,234,224,0.18)",
              borderRadius: 16,
              background: "#151c25",
              overflow: "hidden",
            }}
          >
            {/* header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 20px",
                borderBottom: "1px solid rgba(239,234,224,0.18)",
                background: "#151c25",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 8,
                    background: "#f2c230",
                    color: "#10161c",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800,
                    fontSize: 14,
                    fontFamily: "var(--font-plex-sans), sans-serif",
                  }}
                >
                  BP
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-plex-sans), sans-serif",
                      fontSize: 15,
                      fontWeight: 700,
                      letterSpacing: 2,
                      color: "#f7f4ee",
                    }}
                  >
                    BREAKTHROUGH PULSE
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      letterSpacing: 3,
                      textTransform: "uppercase",
                      color: "rgba(239,234,224,0.55)",
                      fontFamily: "var(--font-plex-mono), monospace",
                    }}
                  >
                    Certified client brief
                  </div>
                </div>
              </div>
              <div
                style={{
                  textAlign: "right",
                  fontSize: 10,
                  color: "rgba(239,234,224,0.5)",
                  lineHeight: 1.6,
                  fontFamily: "var(--font-plex-mono), monospace",
                }}
              >
                <div>
                  REF:{" "}
                  <b style={{ color: "#f2c230" }}>{shortId(sessionId || "PENDING")}</b>
                </div>
                <div>
                  ISSUED:{" "}
                  {new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>

            {/* body */}
            <div style={{ padding: "18px 20px" }}>
              <div
                style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 12,
                      letterSpacing: 5,
                      textTransform: "uppercase",
                      color: "rgba(239,234,224,0.55)",
                      fontFamily: "var(--font-plex-mono), monospace",
                    }}
                  >
                    {session.label}
                  </div>
                  <div
                    style={{
                      marginTop: 8,
                      fontSize: 34,
                      fontWeight: 700,
                      letterSpacing: -1,
                      color: "#f7f4ee",
                      fontFamily: "var(--font-newsreader), Georgia, serif",
                    }}
                  >
                    Your build brief, captured.
                  </div>
                </div>
                <div
                  style={{
                    height: 2,
                    flex: 1,
                    margin: "0 18px 32px",
                    background: "linear-gradient(90deg,#f2c230,transparent)",
                  }}
                />
              </div>

              <div style={{ marginTop: 2, fontSize: 13, lineHeight: 1.5, color: "rgba(239,234,224,0.55)" }}>
                Captured in a {"\u201c"}
                {session.channel}
                {"\u201d"} conversation. What you said lands on a real senior&apos;s desk, saved and
                emailed to your address.
              </div>

              {/* brief fields */}
              <div
                style={{
                  marginTop: 14,
                  border: "1px solid rgba(239,234,224,0.14)",
                  borderRadius: 10,
                  overflow: "hidden",
                }}
              >
                {Object.entries(answers)
                  .filter(([, v]) => v)
                  .slice(0, 6)
                  .map(([k, v], i) => (
                    <div
                      key={k}
                      style={{
                        display: "flex",
                        gap: 14,
                        padding: "8px 12px",
                        fontSize: 12.5,
                        borderTop: i === 0 ? "none" : "1px solid rgba(239,234,224,0.14)",
                        background: i % 2 ? "#151c25" : "#1a222b",
                      }}
                    >
                      <span
                        style={{
                          width: 130,
                          flexShrink: 0,
                          color: "#f2c230",
                          textTransform: "capitalize",
                          fontFamily: "var(--font-plex-mono), monospace",
                          fontSize: 11,
                        }}
                      >
                        {k}
                      </span>
                      <span
                        style={{ color: "#f7f4ee", flex: 1, textAlign: "left", wordBreak: "break-word" }}
                      >
                        {v}
                      </span>
                    </div>
                  ))}
              </div>

              {/* guarantee + verify */}
              <div style={{ marginTop: 14, display: "flex", justifyContent: "space-between", gap: 16 }}>
                <div
                  style={{
                    flex: 1,
                    border: "1px solid rgba(239,234,224,0.14)",
                    borderRadius: 10,
                    padding: "10px 12px",
                    background: "#151c25",
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      letterSpacing: 2,
                      color: "#f2c230",
                      fontFamily: "var(--font-plex-mono), monospace",
                    }}
                  >
                    THE GUARANTEE
                  </div>
                  <div style={{ marginTop: 6, fontSize: 12, lineHeight: 1.45, color: "rgba(239,234,224,0.55)" }}>
                    A senior replies within one business day. No queue, no drip campaign. If it
                    ships, it ships under studio contract with the IP assigned in writing.
                  </div>
                </div>
                <div
                  style={{
                    flex: 1,
                    border: "1px solid rgba(239,234,224,0.14)",
                    borderRadius: 10,
                    padding: "10px 12px",
                    background: "#151c25",
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      letterSpacing: 2,
                      color: "rgba(239,234,224,0.55)",
                      fontFamily: "var(--font-plex-mono), monospace",
                    }}
                  >
                    VERIFY
                  </div>
                  <div
                    style={{
                      marginTop: 6,
                      fontSize: 12,
                      lineHeight: 1.45,
                      color: "rgba(239,234,224,0.55)",
                    }}
                  >
                    {brand.contact.email} · {brand.url}
                    <br />
                    {session.directWith
                      ? `Direct line to ${session.directWith}.`
                      : "A brief, not a chat log — the person who answers has the whole page."}
                  </div>
                </div>
              </div>
            </div>

            {/* footer */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                padding: "14px 20px",
                borderTop: "1px solid rgba(239,234,224,0.18)",
                background: "#151c25",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span
                  style={{
                    fontFamily: "var(--font-newsreader), Georgia, serif",
                    fontSize: 18,
                    fontWeight: 700,
                    fontStyle: "italic",
                    color: "#f7f4ee",
                  }}
                >
                  Breakthrough Pulse
                </span>
                <span style={{ fontSize: 11, color: "rgba(239,234,224,0.5)" }}>
                  senior software studio
                </span>
              </div>
              <span
                style={{
                  fontSize: 10,
                  letterSpacing: 1,
                  color: "rgba(239,234,224,0.5)",
                  textAlign: "right",
                }}
              >
                we finish what starts
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="relative flex h-[540px] w-full flex-col overflow-hidden rounded-surface border border-iron/10 bg-rag-card shadow-[var(--shadow-card)] sm:h-[620px]"
        role="region"
        aria-label={`${sentenceCase(session.label)} intake`}
      >
        <input
          type="text"
          name="website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute left-[-9999px] h-0 w-0 opacity-0"
        />
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-b border-iron/10 px-4 py-3 sm:px-5 sm:py-3.5">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <div className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-surface bg-iron/5 ring-1 ring-iron/10">
              <Image
                src={brand.logo}
                alt={brand.name}
                width={26}
                height={26}
                className="h-[26px] w-[26px] object-contain"
              />
            </div>
            <div className="min-w-0">
              <p className="truncate font-plex-sans text-sm font-medium tracking-tight text-iron">
                {brand.name}
              </p>
              <p className="truncate font-plex-mono text-[0.66rem] text-ink/60">
                {isDirect
                  ? `direct line to ${lead.name.split(" ")[0]} · replies within one business day`
                  : `${sentenceCase(session.label)} · replies within one business day`}
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={() => window.print()}
              aria-label="Download the record of this brief"
              className="inline-flex items-center gap-1.5 rounded-input border border-iron/15 bg-iron/[0.03] px-2.5 py-1.5 font-plex-sans text-xs font-medium text-iron/80 transition-colors hover:border-iron/40 hover:text-iron"
            >
              Record
            </button>
            <button
              type="button"
              onClick={() => setBriefOpen((v) => !v)}
              aria-expanded={briefOpen}
              aria-label="Open the brief"
              className={`inline-flex items-center gap-1.5 rounded-input border px-2.5 py-1.5 font-plex-sans text-xs font-medium transition-colors ${
                briefOpen
                  ? "border-signal/60 bg-signal/10 text-iron"
                  : "border-iron/15 text-iron/70 hover:border-signal/50 hover:text-iron"
              }`}
            >
              Brief
              <span className="grid h-4 min-w-4 place-items-center rounded-full bg-signal px-1 text-[10px] font-bold text-signal-ink">
                {answered}
              </span>
            </button>
          </div>
        </div>

        {/* Plain label: a form that talks, not presence */}
        <div className="border-b border-iron/10 bg-iron/[0.03] px-4 py-2 sm:px-5">
          <p className="font-plex-mono text-caption leading-relaxed tracking-tight text-ink/70">
            This is an intake form that reads like a conversation. No one is
            typing — a person reads every answer and replies within one
            business day.
          </p>
        </div>

        {/* Progress */}
        <div className="h-px shrink-0 bg-iron/10">
          <div
            className="h-full bg-signal transition-[width] duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          role="log"
          aria-label="Intake conversation"
          aria-live="polite"
          className="min-h-0 flex-1 overflow-y-auto px-5 py-5"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-iron/10" aria-hidden />
            <span className="whitespace-nowrap font-plex-mono text-[0.66rem] tracking-wide text-ink/50">
              {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric" })} · intake
            </span>
            <span className="h-px flex-1 bg-iron/10" aria-hidden />
          </div>

          {msgs.map((msg) => {
            if (msg.kind === "text") {
              const yours = msg.from === "you";
              return (
                <div key={msg.id} className="msg-in mb-4 flex flex-col">
                  <div
                    className={`flex max-w-[88%] items-end gap-2.5 ${
                      yours ? "ml-auto flex-row-reverse" : ""
                    }`}
                  >
                    {yours ? (
                      <span
                        className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-iron/10 font-plex-sans text-[10px] font-semibold uppercase tracking-wide text-iron/70"
                        aria-label="You"
                      >
                        You
                      </span>
                    ) : (
                      <span
                        className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-iron text-[10px] font-bold text-signal"
                        aria-hidden
                      >
                        ·
                      </span>
                    )}
                    <div
                      className={`px-4 py-2.5 font-newsreader text-[0.95rem] leading-reading ${
                        yours
                          ? "rounded-[16px] rounded-br-[5px] bg-iron text-rag"
                          : "rounded-[16px] rounded-bl-[5px] bg-iron/[0.05] text-iron ring-1 ring-iron/10"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                </div>
              );
            }

            if (msg.kind === "note") {
              return (
                <div key={msg.id} className="msg-in my-2 flex justify-center">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-iron/10 bg-iron/[0.03] px-3 py-1 font-plex-mono text-[0.64rem] tracking-wide text-ink/60">
                    {msg.text}
                  </span>
                </div>
              );
            }

            if (msg.kind === "chips") {
              const fresh =
                (currentField?.name === msg.name || msg.name === "__retry__") &&
                !botBusy &&
                phase === "chatting";
              return (
                <div key={msg.id} className="mb-4 flex flex-wrap gap-2 pl-0 sm:pl-[38px]">
                  {msg.options.map((option) => {
                    const picked = answers[msg.name] === option;
                    const retry = msg.name === "__retry__";
                    const enabled = retry ? fresh : fresh && !picked;
                    return (
                      <button
                        key={option}
                        type="button"
                        disabled={!enabled}
                        aria-pressed={picked}
                        onClick={() => submitChip(msg.name, option)}
                        className={`rounded-input border px-3.5 py-2 font-plex-sans text-[0.82rem] font-medium transition-colors ${
                          picked
                            ? "border-signal/60 bg-signal/10 text-iron"
                            : enabled
                              ? "border-iron/15 text-iron/85 hover:border-signal/50 hover:text-iron"
                              : "cursor-default border-iron/[0.06] text-iron/30"
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              );
            }

            return (
              <div key={msg.id} className="msg-in mb-4 flex justify-center pt-2">
                <div className="flex max-w-[94%] flex-col items-center gap-2.5 rounded-surface border border-signal/30 bg-signal/[0.07] px-7 py-6 text-center">
                  <svg viewBox="0 0 52 52" className="h-11 w-11" aria-hidden>
                    <circle
                      cx="26"
                      cy="26"
                      r="24"
                      fill="none"
                      stroke="#f2c230"
                      strokeWidth="2.5"
                      className="check-ring"
                    />
                    <path
                      fill="none"
                      stroke="#f2c230"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 27l7 7 13-14"
                      className="check-stroke"
                    />
                  </svg>
                  <p className="font-plex-sans text-[0.82rem] font-semibold tracking-tight text-iron">
                    {msg.title}
                  </p>
                  <p className="max-w-[42ch] font-newsreader text-sm leading-reading text-ink/80">
                    {msg.text}
                  </p>
                  {deliveryNote ? (
                    <p className="font-plex-mono text-[0.64rem] tracking-wide text-ink/50">
                      {deliveryNote}
                    </p>
                  ) : null}
                </div>
              </div>
            );
          })}

          {phase === "done" ? (
            <div className="dc-divider mt-2 font-plex-mono text-[0.7rem] tracking-wide text-ink/50">
              Brief filed · a person replies within one business day
            </div>
          ) : null}
        </div>

        {/* Brief fields strip */}
        <div className="shrink-0 border-t border-iron/10 px-5 py-2">
          <div className="flex items-center gap-2 overflow-x-auto pb-0.5" aria-hidden>
            <span className="shrink-0 font-plex-mono text-[0.64rem] tracking-wide text-ink/60">
              Capturing
            </span>
            {fields.map((field) => {
              const got = Boolean(answers[field.name]);
              return (
                <span
                  key={field.name}
                  className={`flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-plex-sans text-[0.64rem] font-medium ${
                    got ? "border-signal/50 text-iron" : "border-iron/10 text-ink/50"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${got ? "bg-signal" : "bg-ink/30"}`}
                    aria-hidden
                  />
                  {field.label}
                </span>
              );
            })}
          </div>
        </div>

        {/* Composer */}
        <div className="shrink-0 border-t border-iron/10 px-5 py-3">
          {currentField && !isChoice(currentField) ? (
            <>
              <div
                key={shake}
                className={`flex items-center gap-2 rounded-input border bg-rag px-3.5 py-2 transition-colors ${
                  inputError ? "animate-shake border-blocked/60" : "border-iron/15 focus-within:border-iron/30"
                }`}
              >
                <textarea
                  ref={inputRef}
                  value={input}
                  rows={1}
                  disabled={!readyForInput}
                  aria-label={currentField.label}
                  placeholder={PLACEHOLDERS[currentField.name] ?? "Type here…"}
                  onChange={(e) => {
                    setInput(e.target.value);
                    autoGrow(e.target);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send();
                    }
                  }}
                  className="max-h-[132px] flex-1 resize-none bg-transparent py-1.5 font-plex-sans text-sm leading-relaxed text-iron outline-none placeholder:text-ink/40"
                />
                <button
                  type="button"
                  aria-label="Send answer"
                  disabled={!readyForInput}
                  onClick={send}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-input bg-signal text-signal-ink transition-colors hover:brightness-95 disabled:opacity-35"
                >
                  <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden>
                    <path
                      d="M2 8h11M9.5 3.5 14 8l-4.5 4.5"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex min-h-[1.25rem] items-center justify-between gap-3 pt-1.5">
                <p
                  aria-live="polite"
                  className={`font-plex-sans text-xs ${inputError ? "text-blocked" : "text-ink/60"}`}
                >
                  {inputError || "Press Enter to send"}
                </p>
                <p className="font-plex-mono text-[0.64rem] text-ink/50">
                  Every answer lands in the brief
                </p>
              </div>
            </>
          ) : (
            <div className="flex min-h-[38px] items-center justify-between gap-3 font-plex-sans text-sm text-ink/60">
              <p>
                {botBusy
                  ? "Recording your answer…"
                  : phase === "done"
                    ? "Saved and on its way."
                    : "Choose one of the options above to continue"}
              </p>
              <p className="shrink-0 font-plex-mono text-xs text-ink/50">Breakthrough Pulse</p>
            </div>
          )}
        </div>

        {/* Brief drawer */}
        {briefOpen ? (
          <>
            <button
              type="button"
              aria-label="Close the brief"
              onClick={() => setBriefOpen(false)}
              className="absolute inset-0 z-20 bg-iron/30 backdrop-blur-[2px]"
            />
            <aside
              className="absolute inset-y-0 right-0 z-30 flex w-80 max-w-[88%] flex-col border-l border-iron/10 bg-rag-card shadow-[var(--shadow-raised)]"
              aria-label="Your brief"
            >
              <div className="flex shrink-0 items-center justify-between border-b border-iron/10 px-5 py-4">
                <div>
                  <p className="font-plex-sans text-sm font-medium tracking-tight text-iron">
                    Your brief
                  </p>
                  {sessionId ? (
                    <p className="mt-0.5 font-plex-mono text-[0.62rem] text-ink/60">
                      Ref {shortId(sessionId)} · brief
                    </p>
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={() => setBriefOpen(false)}
                  className="grid h-8 w-8 place-items-center rounded-input text-ink/60 transition-colors hover:text-iron"
                  aria-label="Close the brief"
                >
                  ✕
                </button>
              </div>

              <div className="min-h-0 flex-1 space-y-2.5 overflow-y-auto px-5 py-4">
                {answered === 0 ? (
                  <p className="font-plex-sans text-sm leading-relaxed text-ink/60">
                    Nothing here yet. Every answer you send lands on this sheet.
                    It becomes the brief the person reads.
                  </p>
                ) : (
                  fields
                    .filter((f) => answers[f.name])
                    .map((field) => (
                      <div
                        key={field.name}
                        className="brief-in rounded-surface border border-iron/10 bg-rag px-3.5 py-3"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <p className="font-plex-sans text-xs font-medium text-iron/80">
                            {field.label}
                          </p>
                          <svg
                            viewBox="0 0 16 16"
                            className="h-3.5 w-3.5 shrink-0 text-ink/50"
                            fill="none"
                            aria-hidden
                          >
                            <path
                              d="M3 8.5 6.5 12 13 4.5"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <p className="mt-1 font-newsreader text-sm whitespace-pre-wrap break-words leading-relaxed text-iron/85">
                          {answers[field.name]}
                        </p>
                      </div>
                    ))
                )}

                <div className="border-t border-iron/10 pt-4">
                  <p className="font-plex-sans text-xs font-medium text-ink/60">
                    Capture sheet
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {fields.map((field) => {
                      const got = Boolean(answers[field.name]);
                      return (
                        <span
                          key={field.name}
                          className={`flex items-center gap-1.5 rounded-full border px-2 py-1 font-plex-sans text-[0.64rem] font-medium ${
                            got ? "border-signal/50 text-iron" : "border-iron/10 text-ink/50"
                          }`}
                        >
                          <span
                            className={`h-1 w-1 rounded-full ${got ? "bg-signal" : "bg-ink/30"}`}
                            aria-hidden
                          />
                          {field.label}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="shrink-0 border-t border-iron/10 px-5 py-3">
                <p className="font-plex-sans text-xs font-medium text-ink/60">Status</p>
                <p className="mt-1 font-plex-sans text-sm leading-relaxed text-iron/70">
                  {phase === "done"
                    ? "Captured, saved, and emailed. A person replies within one business day."
                    : phase === "sending"
                      ? "Saving and sending your brief…"
                      : `${answered} of ${fields.length} captured${
                          nextField ? ` · next: ${nextField.label.toLowerCase()}` : ""
                        }`}
                </p>
              </div>
            </aside>
          </>
        ) : null}
      </div>
    </>
  );
}