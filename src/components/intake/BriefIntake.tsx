"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { sessionFields } from "@/lib/intake/fields";
import { applyWoundRead, readWound } from "@/lib/intake/read-wound";
import {
  arrivalGrade,
  askLine,
  docketLabel,
  fromTheWords,
  readBack,
} from "@/lib/intake/session-voice";
import { getSpecialist } from "@/content/specialists";
import { offer } from "@/content/offer";
import { readMatchBrief } from "@/lib/match/session";
import type { FieldConfig, IntakeType } from "@/lib/intake/types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LONG_FIELDS = new Set(["build", "detail", "idea"]);

type Turn =
  | { id: string; kind: "studio"; text: string }
  | { id: string; kind: "you"; field: string; text: string };

function applies(field: FieldConfig, answers: Record<string, string>) {
  return !field.when || field.when(answers);
}

function shortId(id: string) {
  return id.replaceAll("-", "").slice(0, 8);
}

function validate(field: FieldConfig, value: string): string | null {
  const trimmed = value.trim();
  if (field.name === "email" && trimmed && !EMAIL_RE.test(trimmed)) {
    return "That email looks off.";
  }
  if (LONG_FIELDS.has(field.name) && trimmed && trimmed.length < 10) {
    return "A couple of lines — enough to take it seriously.";
  }
  if (field.required && !trimmed) return "Say something, even a short one.";
  return null;
}

function opening(type: IntakeType, first: string, named: boolean): string {
  if (named) {
    return `${first} reads every line tomorrow. No one is typing now. Answer like a person — this session writes the brief.`;
  }
  if (type === "check") {
    return `The Check. Five days. $${offer.check.price.toLocaleString("en-US")}. Write the stuck part. Aneeb reads it tomorrow.`;
  }
  if (type === "careers") {
    return "Aneeb reads every application. Candidates are never charged. This session writes the note.";
  }
  return "A few turns. The brief writes itself. A person reads it within one business day.";
}

function bootTurns(
  type: IntakeType,
  first: string,
  named: boolean,
  seeded: Record<string, string>,
  fields: FieldConfig[],
): Turn[] {
  const start: Turn[] = [
    {
      id: "open",
      kind: "studio",
      text: opening(type, first, named),
    },
  ];
  if (seeded.build) {
    start.push({
      id: "pre",
      kind: "you",
      field: "build",
      text: seeded.build,
    });
    start.push({
      id: "pre-read",
      kind: "studio",
      text: readBack(
        { name: "build", label: "Build", type: "textarea", required: true },
        seeded.build,
        seeded,
      ),
    });
  }
  const firstField =
    fields
      .filter((field) => applies(field, seeded))
      .find((field) => !(seeded[field.name] ?? "").trim()) ?? null;
  if (firstField) {
    start.push({
      id: "ask0",
      kind: "studio",
      text: askLine(firstField, seeded),
    });
  }
  return start;
}

type BriefIntakeProps = {
  type: IntakeType;
  source?: string;
  workWith?: string;
  prefill?: Record<string, string>;
};

export function BriefIntake({
  type,
  source,
  workWith,
  prefill,
}: Readonly<BriefIntakeProps>) {
  const person = workWith ? getSpecialist(workWith) : null;
  const first = person?.name.split(" ")[0] ?? "Aneeb";
  const fields = sessionFields[type];
  const seeded = { ...prefill };
  const [answers, setAnswers] = useState<Record<string, string>>(() => seeded);
  const [turns, setTurns] = useState<Turn[]>(() =>
    bootTurns(type, first, Boolean(person), seeded, fields),
  );
  const [draft, setDraft] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const [requestId] = useState(() =>
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `brief-${Date.now()}`,
  );
  const textRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const uid = useRef(turns.length);

  const visible = useMemo(
    () => fields.filter((field) => applies(field, answers)),
    [fields, answers],
  );
  const current =
    visible.find((field) => !(answers[field.name] ?? "").trim()) ?? null;
  const ready = !current;

  function push(turn: Turn) {
    setTurns((list) => [...list, turn]);
  }

  useEffect(() => {
    (textRef.current ?? inputRef.current)?.focus();
  }, [current?.name]);

  useEffect(() => {
    logRef.current?.scrollTo({
      top: logRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [turns.length, ready]);

  function send(field: FieldConfig, value: string) {
    const message = validate(field, value);
    if (message) {
      setError(message);
      return;
    }
    const trimmed = value.trim();
    let next = { ...answers, [field.name]: trimmed };
    let filled: string[] = [];
    if (type === "check" && field.name === "build") {
      const applied = applyWoundRead(next, readWound(trimmed));
      next = applied.answers;
      filled = applied.filled;
    }
    setAnswers(next);
    setDraft("");
    setError(null);
    uid.current += 1;
    push({ id: `you-${uid.current}`, kind: "you", field: field.name, text: trimmed });
    uid.current += 1;
    push({
      id: `studio-${uid.current}`,
      kind: "studio",
      text: readBack(field, trimmed, next),
    });
    const heard = fromTheWords(filled);
    if (heard) {
      uid.current += 1;
      push({ id: `heard-${uid.current}`, kind: "studio", text: heard });
    }
    const upcoming = fields
      .filter((item) => applies(item, next))
      .find((item) => !(next[item.name] ?? "").trim());
    if (upcoming) {
      uid.current += 1;
      push({ id: `ask-${uid.current}`, kind: "studio", text: askLine(upcoming, next) });
    } else {
      uid.current += 1;
      push({
        id: `close-${uid.current}`,
        kind: "studio",
        text:
          type === "check"
            ? "That's the condition. Put it on Aneeb's desk — he reads it tomorrow."
            : `That's the brief. Put it on ${first}'s desk.`,
      });
    }
  }

  function skip(field: FieldConfig) {
    if (field.required) {
      setError("That one is required.");
      return;
    }
    send(field, "I'd rather not say");
  }

  async function submit() {
    for (const field of visible) {
      if (!field.required) continue;
      const message = validate(field, answers[field.name] ?? "");
      if (message) {
        setError(message);
        return;
      }
    }
    setBusy(true);
    setError(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          type: type === "check" ? "pulse-check" : type,
          clientId: requestId,
          requestId,
          website: honeypot,
          with: person?.name ?? "",
          source: source ?? type,
          ...answers,
        }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        id?: string;
        error?: string;
      };
      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? "The brief did not save.");
      }
      const stored = readMatchBrief();
      if (stored.eventId && type === "work") {
        void fetch("/api/match/outcome", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            matchEventId: stored.eventId,
            outcome: "booked",
          }),
        });
      }
      setDone(shortId(data.id ?? requestId));
    } catch (error_) {
      setError(
        error_ instanceof Error ? error_.message : "The brief did not save.",
      );
    } finally {
      setBusy(false);
    }
  }

  const docketKeys = visible
    .map((field) => field.name)
    .filter((name) => docketLabel[name]);

  if (done) {
    return (
      <div className="overflow-hidden rounded-[24px] bg-iron text-rag ring-1 ring-rag/10">
        <div className="px-6 py-10 md:px-8">
          <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-rag/55">
            Session filed · {done}
          </p>
          <p className="mt-3 font-newsreader text-[32px] leading-[1.1] text-rag">
            {type === "check"
              ? "The Check is on Aneeb's desk."
              : `On ${first}'s desk.`}
          </p>
          <p className="mt-4 max-w-[34ch] font-newsreader text-[18px] leading-[1.4] text-rag/75">
            A person replies from a real inbox, within one business day.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[24px] bg-rag-card shadow-[var(--shadow-card)] ring-1 ring-iron/10">
      <header className="flex items-center justify-between gap-3 bg-iron px-5 py-4 text-rag md:px-6">
        <div className="min-w-0">
          <p className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-rag/50">
            Session · {type === "check" ? "The Check" : person ? `Direct · ${first}` : "The brief"}
          </p>
          <p className="mt-1 truncate font-newsreader text-[18px] text-rag">
            {type === "check"
              ? "The condition writes itself."
              : "The brief writes itself."}
          </p>
        </div>
        <p className="shrink-0 font-plex-mono text-[12px] text-rag/50">
          {ready ? "Ready to file" : "Writing"}
        </p>
      </header>

      <div className="grid md:grid-cols-[minmax(0,1fr)_16rem]">
        <div className="flex min-h-[28rem] flex-col border-iron/10 md:border-r">
          <div
            ref={logRef}
            className="min-h-0 flex-1 space-y-5 overflow-y-auto px-5 py-6 md:px-6"
          >
            {turns.map((turn) =>
              turn.kind === "studio" ? (
                <p
                  key={turn.id}
                  className="max-w-[40ch] font-newsreader text-[18px] leading-[1.4] text-iron"
                >
                  {turn.text}
                </p>
              ) : (
                <blockquote
                  key={turn.id}
                  className="ml-4 border-l-2 border-signal pl-4"
                >
                  <p className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/50">
                    You
                  </p>
                  <p className="mt-1 font-newsreader text-[17px] leading-[1.4] text-iron">
                    {turn.text}
                  </p>
                </blockquote>
              ),
            )}
          </div>

          <div className="border-t border-iron/10 px-5 py-4 md:px-6">
            {error ? (
              <p role="alert" className="mb-3 font-newsreader text-[15px] text-iron">
                {error}
              </p>
            ) : null}

            {ready ? (
              <button
                type="button"
                onClick={() => void submit()}
                disabled={busy}
                className="inline-flex items-center rounded-full bg-signal px-5 py-2.5 font-plex-sans text-[14px] font-medium text-iron disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-iron"
              >
                {busy
                  ? "Filing…"
                  : type === "check"
                    ? "Put it on Aneeb's desk"
                    : `Put it on ${first}'s desk`}
              </button>
            ) : current && (current.type === "radio" || current.type === "select") ? (
              <ul className="flex flex-col gap-2">
                {current.options.map((option) => (
                  <li key={option}>
                    <button
                      type="button"
                      onClick={() => send(current, option)}
                      className="w-full rounded-[14px] bg-rag px-4 py-3 text-left font-newsreader text-[17px] text-iron ring-1 ring-iron/10 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-iron"
                    >
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            ) : current ? (
              <div>
                {current.type === "textarea" ? (
                  <textarea
                    ref={textRef}
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    onKeyDown={(event) => {
                      if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
                        event.preventDefault();
                        send(current, draft);
                      }
                    }}
                    placeholder={current.placeholder}
                    rows={3}
                    className="w-full resize-none rounded-[14px] bg-rag px-4 py-3 font-newsreader text-[17px] leading-[1.4] text-iron outline-none ring-1 ring-iron/15 focus-visible:ring-2 focus-visible:ring-iron"
                  />
                ) : (
                  <input
                    ref={inputRef}
                    type={
                      current.input === "email"
                        ? "email"
                        : current.input === "url"
                          ? "url"
                          : "text"
                    }
                    autoComplete={current.autoComplete}
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        send(current, draft);
                      }
                    }}
                    placeholder={current.placeholder}
                    className="w-full rounded-[14px] bg-rag px-4 py-3 font-newsreader text-[17px] text-iron outline-none ring-1 ring-iron/15 focus-visible:ring-2 focus-visible:ring-iron"
                  />
                )}
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => send(current, draft)}
                    className="inline-flex items-center rounded-full bg-iron px-4 py-2 font-plex-sans text-[14px] font-medium text-rag focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-iron"
                  >
                    Send
                  </button>
                  {current.type === "textarea" ? (
                    <span className="font-plex-mono text-[11px] text-ink/50">⌘ Enter</span>
                  ) : null}
                  {!current.required ? (
                    <button
                      type="button"
                      onClick={() => skip(current)}
                      className="font-plex-sans text-[14px] text-iron underline decoration-iron/30 underline-offset-4"
                    >
                      Skip
                    </button>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <aside className="hidden bg-rag/60 px-5 py-6 md:block">
          <p className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/55">
            {type === "check" ? "Condition on arrival" : "The brief so far"}
          </p>
          {type === "check" ? (
            <p className="mt-3 font-newsreader text-[20px] leading-[1.2] text-iron">
              {arrivalGrade(answers.situation ?? "")}
            </p>
          ) : null}
          <dl className="mt-5 flex flex-col gap-3">
            {docketKeys.map((name) => (
              <div key={name}>
                <dt className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/50">
                  {docketLabel[name]}
                </dt>
                <dd className="mt-0.5 font-newsreader text-[15px] leading-[1.35] text-iron">
                  {answers[name] ? answers[name] : "—"}
                </dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>

      <label className="sr-only" htmlFor="brief-website">
        Company site
      </label>
      <input
        id="brief-website"
        name="website"
        value={honeypot}
        onChange={(event) => setHoneypot(event.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
      />

      <p className="border-t border-iron/10 px-5 py-3 font-newsreader text-[13px] text-ink/60 md:px-6">
        No one is typing. A person reads this tomorrow.
        {type === "check" ? " This does not take a card." : ""}
      </p>
    </div>
  );
}
