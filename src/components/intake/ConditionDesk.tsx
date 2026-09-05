"use client";

import { useMemo, useRef, useState, type RefObject } from "react";
import { PressButton, dismissKeyboard } from "@/components/PressButton";
import { sessionFields } from "@/lib/intake/fields";
import { applyWoundRead, readWound } from "@/lib/intake/read-wound";
import {
  arrivalGrade,
  askLine,
  docketLabel,
  fromTheWords,
  readBack,
} from "@/lib/intake/session-voice";
import { offer } from "@/content/offer";
import type { FieldConfig } from "@/lib/intake/types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SHEET = ["situation", "build", "stack", "access", "codeLocation", "name", "email"];

type Note = { id: string; text: string };

type ConditionDeskProps = {
  source?: string;
  prefill?: Record<string, string>;
};

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
  if (field.name === "build" && trimmed && trimmed.length < 10) {
    return "A couple of lines — enough to take it seriously.";
  }
  if (field.required && !trimmed) return "Say something, even a short one.";
  return null;
}

function nextOpen(answers: Record<string, string>) {
  return (
    sessionFields.check
      .filter((field) => applies(field, answers))
      .find((field) => !(answers[field.name] ?? "").trim()) ?? null
  );
}

function seedAnswers(prefill?: Record<string, string>) {
  const base = { ...prefill };
  if (!base.build) return { answers: base, filled: [] as string[] };
  return applyWoundRead(base, readWound(base.build));
}

function openingNotes(answers: Record<string, string>, filled: string[]): Note[] {
  const notes: Note[] = [
    {
      id: "open",
      text: answers.situation
        ? `Five days. A verdict. You marked this ${answers.situation.toLowerCase()}. Write the stuck part.`
        : "Five days. A verdict. Write the stuck part. Aneeb reads it tomorrow.",
    },
  ];
  if (answers.build) {
    notes.push({
      id: "pre-read",
      text: readBack(
        { name: "build", label: "Build", type: "textarea", required: true },
        answers.build,
        answers,
      ),
    });
    const heard = fromTheWords(filled);
    if (heard) notes.push({ id: "heard", text: heard });
  }
  const open = nextOpen(answers);
  if (open && open.name !== "build") {
    notes.push({ id: "ask0", text: askLine(open, answers) });
  } else if (!open) {
    notes.push({
      id: "ready0",
      text: "That's the condition. Put it on Aneeb's desk — he reads it tomorrow.",
    });
  }
  return notes;
}

export function ConditionDesk({
  source = "check",
  prefill,
}: Readonly<ConditionDeskProps>) {
  const seeded = seedAnswers(prefill);
  const [answers, setAnswers] = useState(seeded.answers);
  const [heard, setHeard] = useState<Set<string>>(() => new Set(seeded.filled));
  const [notes, setNotes] = useState<Note[]>(() =>
    openingNotes(seeded.answers, seeded.filled),
  );
  const [draft, setDraft] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const [requestId] = useState(() =>
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `check-${Date.now()}`,
  );
  const uid = useRef(notes.length);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const visible = useMemo(
    () => sessionFields.check.filter((field) => applies(field, answers)),
    [answers],
  );
  const current = nextOpen(answers);
  const ready = !current;
  const price = `$${offer.check.price.toLocaleString("en-US")}`;

  function speak(text: string) {
    uid.current += 1;
    setNotes((list) => [...list.slice(-3), { id: `n${uid.current}`, text }]);
  }

  function write(field: FieldConfig, value: string) {
    const message = validate(field, value);
    if (message) {
      setError(message);
      return;
    }
    const trimmed = value.trim();
    let next = { ...answers, [field.name]: trimmed };
    let filled: string[] = [];
    if (field.name === "build") {
      const applied = applyWoundRead(next, readWound(trimmed));
      next = applied.answers;
      filled = applied.filled;
      setHeard((set) => new Set([...set, ...filled]));
    }
    setAnswers(next);
    setDraft("");
    setError(null);
    speak(readBack(field, trimmed, next));
    const heardLine = fromTheWords(filled);
    if (heardLine) speak(heardLine);
    const upcoming = nextOpen(next);
    if (upcoming) {
      speak(askLine(upcoming, next));
    } else {
      speak("That's the condition. Put it on Aneeb's desk — he reads it tomorrow.");
    }
  }

  function skip(field: FieldConfig) {
    if (field.required) {
      setError("That one is required.");
      return;
    }
    write(field, "I'd rather not say");
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
          type: "pulse-check",
          clientId: requestId,
          requestId,
          website: honeypot,
          source,
          ...answers,
        }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        id?: string;
        error?: string;
      };
      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? "The condition did not save.");
      }
      setDone(shortId(data.id ?? requestId));
    } catch (error_) {
      setError(
        error_ instanceof Error ? error_.message : "The condition did not save.",
      );
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="overflow-hidden rounded-[24px] bg-iron text-rag ring-1 ring-rag/10">
        <div className="px-6 py-10 md:px-8">
          <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-rag/55">
            Condition filed · {done}
          </p>
          <p className="mt-3 font-newsreader text-[32px] leading-[1.1] text-rag">
            The Check is on Aneeb&apos;s desk.
          </p>
          <p className="mt-4 max-w-[36ch] font-newsreader text-[18px] leading-[1.4] text-rag/75">
            He reads it tomorrow. A person replies from a real inbox, within one
            business day. {price}. Five days. A verdict.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[24px] bg-rag-card shadow-[var(--shadow-card)] ring-1 ring-iron/10">
      <header className="flex items-end justify-between gap-4 bg-iron px-5 py-5 text-rag md:px-7">
        <div className="min-w-0">
          <p className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-rag/50">
            The Check · five days · {price}
          </p>
          <p className="mt-1 font-newsreader text-[22px] leading-[1.15] text-rag">
            Write the stuck part.
          </p>
        </div>
        <p className="shrink-0 font-plex-mono text-[12px] text-rag/50">
          {ready ? "Ready to file" : current?.name === "build" ? "The wound" : "Writing"}
        </p>
      </header>

      <div className="space-y-4 px-5 py-6 md:px-7">
        {notes.slice(-2).map((note) => (
          <p
            key={note.id}
            className="max-w-[46ch] font-newsreader text-[18px] leading-[1.4] text-iron"
          >
            {note.text}
          </p>
        ))}
      </div>

      <div className="mx-5 mb-6 rounded-[20px] bg-rag px-5 py-6 ring-1 ring-iron/10 md:mx-7 md:px-6">
        <p className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/55">
          Condition on arrival
        </p>
        <p className="mt-2 font-newsreader text-[26px] leading-[1.15] text-iron">
          {arrivalGrade(answers.situation ?? "")}
        </p>

        <dl className="mt-6 flex flex-col gap-5">
          {SHEET.filter((name) => visible.some((field) => field.name === name)).map(
            (name) => {
              const field = visible.find((item) => item.name === name);
              const open = current?.name === name;
              const value = answers[name];
              return (
                <div key={name}>
                  <dt className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/50">
                    {docketLabel[name]}
                    {heard.has(name) ? (
                      <span className="normal-case tracking-normal text-ink/40">
                        {" "}
                        · from the words
                      </span>
                    ) : null}
                  </dt>
                  <dd className="mt-1.5">
                    {open && field ? (
                      <OpenLine
                        field={field}
                        draft={draft}
                        error={error}
                        textRef={textRef}
                        inputRef={inputRef}
                        onDraft={setDraft}
                        onWrite={write}
                        onSkip={skip}
                      />
                    ) : (
                      <p className="font-newsreader text-[17px] leading-[1.4] text-iron">
                        {value ? value : "—"}
                      </p>
                    )}
                  </dd>
                </div>
              );
            },
          )}
        </dl>

        {ready ? (
          <PressButton
            disabled={busy}
            onPress={() => {
              if (busy) return;
              dismissKeyboard();
              void submit();
            }}
            className="mt-6 inline-flex min-h-11 touch-manipulation items-center rounded-full bg-signal px-5 py-2.5 font-plex-sans text-[14px] font-medium text-iron disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-iron"
          >
            {busy ? "Filing…" : `Put it on Aneeb's desk · ${price}`}
          </PressButton>
        ) : null}
      </div>

      <label className="sr-only" htmlFor="check-website">
        Company site
      </label>
      <input
        id="check-website"
        name="website"
        value={honeypot}
        onChange={(event) => setHoneypot(event.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
      />

      <p className="border-t border-iron/10 px-5 py-3 font-newsreader text-[13px] text-ink/60 md:px-7">
        No one is typing. Aneeb reads this tomorrow. This does not take a card.
      </p>
    </div>
  );
}

type OpenLineProps = {
  field: FieldConfig;
  draft: string;
  error: string | null;
  textRef: RefObject<HTMLTextAreaElement | null>;
  inputRef: RefObject<HTMLInputElement | null>;
  onDraft: (value: string) => void;
  onWrite: (field: FieldConfig, value: string) => void;
  onSkip: (field: FieldConfig) => void;
};

function OpenLine({
  field,
  draft,
  error,
  textRef,
  inputRef,
  onDraft,
  onWrite,
  onSkip,
}: Readonly<OpenLineProps>) {
  if (field.type === "radio" || field.type === "select") {
    return (
      <div>
        {error ? (
          <p role="alert" className="mb-2 font-newsreader text-[15px] text-iron">
            {error}
          </p>
        ) : null}
        <ul className="sticky bottom-0 z-20 flex flex-col gap-2 bg-rag py-2 md:static md:bg-transparent md:py-0">
          {field.options.map((option) => (
            <li key={option}>
              <PressButton
                onPress={() => {
                  dismissKeyboard();
                  onWrite(field, option);
                }}
                className="min-h-11 w-full touch-manipulation rounded-[14px] bg-white px-4 py-3 text-left font-newsreader text-[17px] text-iron ring-1 ring-iron/10 hover:ring-iron/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-iron"
              >
                {option}
              </PressButton>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div>
      {error ? (
        <p role="alert" className="mb-2 font-newsreader text-[15px] text-iron">
          {error}
        </p>
      ) : null}
      {field.type === "textarea" ? (
        <textarea
          ref={textRef}
          aria-label={docketLabel[field.name] ?? field.label}
          value={draft}
          onChange={(event) => onDraft(event.target.value)}
          onKeyDown={(event) => {
            if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
              event.preventDefault();
              onWrite(field, draft);
            }
          }}
          placeholder={field.placeholder}
          enterKeyHint="send"
          rows={4}
          className="w-full resize-none bg-transparent font-newsreader text-[17px] leading-[1.4] text-iron outline-none"
        />
      ) : (
        <input
          ref={inputRef}
          aria-label={docketLabel[field.name] ?? field.label}
          type={
            field.input === "email" ? "email" : field.input === "url" ? "url" : "text"
          }
          autoComplete={field.autoComplete}
          enterKeyHint="send"
          value={draft}
          onChange={(event) => onDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              onWrite(field, draft);
            }
          }}
          placeholder={field.placeholder}
          className="w-full bg-transparent font-newsreader text-[17px] text-iron outline-none"
        />
      )}
      <div className="sticky bottom-0 z-20 mt-3 flex flex-wrap items-center gap-3 bg-rag py-3 md:static md:bg-transparent md:py-0">
        <PressButton
          onPress={() => onWrite(field, draft)}
          className="inline-flex min-h-11 touch-manipulation items-center rounded-full bg-iron px-4 py-2 font-plex-sans text-[14px] font-medium text-rag focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-iron"
        >
          Send
        </PressButton>
        {field.type === "textarea" ? (
          <span className="hidden font-plex-mono text-[11px] text-ink/50 md:inline">⌘ Enter</span>
        ) : null}
        {!field.required ? (
          <PressButton
            onPress={() => onSkip(field)}
            className="min-h-11 touch-manipulation font-plex-sans text-[14px] text-iron underline decoration-iron/30 underline-offset-4"
          >
            Skip
          </PressButton>
        ) : null}
      </div>
    </div>
  );
}
