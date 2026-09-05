"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { PressButton, dismissKeyboard } from "@/components/PressButton";
import {
  fieldComplete,
  nextOpen,
  visibleFields,
} from "@/lib/conversation/script";
import {
  checkScript,
  educationScript,
} from "@/lib/conversation/script";
import {
  clearDesk,
  emptyDesk,
  loadDesk,
  saveDesk,
  subscribeDesk,
} from "@/lib/conversation/persist";
import type { Answers, Field, ScriptId } from "@/lib/conversation/types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LABELS: Record<string, string> = {
  product: "What you're building",
  stage: "Where it is",
  attemptedProduction: "Production attempted",
  lastBreak: "What broke",
  shipWound: "When you try to ship",
  modelOnData: "On real data",
  duration: "How long",
  whoBuilt: "Who built it",
  docsLeft: "What's written down",
  deadline: "The deadline",
  name: "Name",
  email: "Email",
  whoSits: "Who sits",
  whatTheyHold: "What they hold",
  whatBreaks: "What breaks",
};

const SCRIPTS = {
  check: checkScript,
  "second-chair": educationScript,
} as const;

type DeskProps = {
  scriptId: ScriptId;
  ending: "read" | "enquiry";
};

function labelOf(field: Field, value: string) {
  const chip = field.chips?.find((item) => item.id === value);
  return chip?.label ?? value;
}

export function Desk({ scriptId, ending }: Readonly<DeskProps>) {
  const script = SCRIPTS[scriptId];
  const router = useRouter();
  const stored = useSyncExternalStore(
    subscribeDesk,
    () => loadDesk(script.id),
    emptyDesk,
  );
  const answers = stored.answers;
  const [draft, setDraft] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const [requestId] = useState(() =>
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `desk-${Date.now()}`,
  );

  const visible = useMemo(() => visibleFields(script, answers), [script, answers]);
  const current = nextOpen(script, answers);
  const reviewing = !current;

  function write(partial: Answers) {
    saveDesk(script.id, {
      answers: { ...answers, ...partial },
      seen: stored.seen,
    });
    setDraft("");
    setNote("");
    setError(null);
  }

  function sendField(field: Field, value: string) {
    const trimmed = value.trim();
    if (field.required && !trimmed) {
      setError("Say something, even a short one.");
      return;
    }
    if (field.kind === "chips-text") {
      write({ [field.name]: trimmed, [`${field.name}Note`]: note.trim() });
      return;
    }
    write({ [field.name]: trimmed });
  }

  function sendIdentity() {
    const name = draft.trim();
    const email = note.trim();
    if (!name) {
      setError("A first name is plenty.");
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setError("That email looks off.");
      return;
    }
    write({ name, email });
  }

  function back() {
    const filled = visible.filter((field) => fieldComplete(field, answers));
    const last = filled.at(-1);
    if (!last) return;
    dismissKeyboard();
    const next = { ...answers };
    delete next[last.name];
    if (last.kind === "chips-text") delete next[`${last.name}Note`];
    if (last.kind === "identity") {
      delete next.name;
      delete next.email;
    }
    saveDesk(script.id, {
      answers: next,
      seen: stored.seen.filter((name) => name !== last.name),
    });
    setError(null);
  }

  async function submit() {
    setBusy(true);
    setError(null);
    try {
      if (ending === "read") {
        const response = await fetch("/api/read", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            answers,
            requestId,
            website: honeypot,
            source: script.source,
          }),
        });
        const data = (await response.json()) as {
          ok?: boolean;
          token?: string;
          error?: string;
        };
        if (!response.ok || !data.ok || !data.token) {
          throw new Error(data.error ?? "The read did not save.");
        }
        clearDesk(script.id);
        router.push(`/read/${data.token}`);
        return;
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          type: "second-chair",
          source: script.source,
          clientId: requestId,
          requestId,
          website: honeypot,
          ...answers,
        }),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? "The note did not save.");
      }
      clearDesk(script.id);
      setDone(answers.name ?? "filed");
    } catch (error_) {
      setError(error_ instanceof Error ? error_.message : "It did not save.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="overflow-hidden rounded-[24px] bg-iron px-6 py-10 text-rag ring-1 ring-rag/10 md:px-8">
        <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-rag/55">
          Note filed
        </p>
        <p className="mt-3 font-newsreader text-[32px] leading-[1.1] text-rag">
          Hassan has the note.
        </p>
        <p className="mt-4 max-w-[36ch] font-newsreader text-[18px] leading-[1.4] text-rag/75">
          A person replies from a real inbox, within one business day.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[24px] bg-rag-card shadow-[var(--shadow-card)] ring-1 ring-iron/10">
      <header className="bg-iron px-5 py-5 text-rag md:px-7">
        <p className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-rag/50">
          Structured intake · not a chatbot
        </p>
        <p className="mt-2 max-w-[48ch] font-newsreader text-[17px] leading-[1.4] text-rag/85">
          {script.banner}
        </p>
      </header>

      <ol className="flex flex-col gap-5 px-5 py-6 md:px-7">
        {visible
          .filter((field) => fieldComplete(field, answers) && current?.name !== field.name)
          .map((field) => (
            <li key={field.name}>
              <p className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/50">
                {LABELS[field.name] ?? field.ask}
              </p>
              <p className="mt-1 font-newsreader text-[17px] leading-[1.4] text-iron">
                {field.kind === "identity"
                  ? `${answers.name} · ${answers.email}`
                  : field.kind === "chips" || field.kind === "chips-text"
                    ? [labelOf(field, answers[field.name] ?? ""), answers[`${field.name}Note`]]
                        .filter(Boolean)
                        .join(" — ")
                    : answers[field.name]}
              </p>
            </li>
          ))}
      </ol>

      <div className="sticky bottom-0 z-20 border-t border-iron/10 bg-rag-card px-5 py-5 md:static md:px-7">
        {error ? (
          <p role="alert" className="mb-3 font-newsreader text-[15px] text-iron">
            {error}
          </p>
        ) : null}

        {reviewing ? (
          <div>
            <p className="font-newsreader text-[20px] leading-[1.3] text-iron">
              That&apos;s the brief. Check it, then send it.
            </p>
            <dl className="mt-4 flex flex-col gap-3">
              {visible.map((field) => (
                <div key={field.name}>
                  <dt className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/50">
                    {LABELS[field.name] ?? field.ask}
                  </dt>
                  <dd className="mt-0.5 font-newsreader text-[16px] leading-[1.4] text-iron">
                    {field.kind === "identity"
                      ? `${answers.name} · ${answers.email}`
                      : field.kind === "chips" || field.kind === "chips-text"
                        ? [labelOf(field, answers[field.name] ?? ""), answers[`${field.name}Note`]]
                            .filter(Boolean)
                            .join(" — ")
                        : answers[field.name]}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <PressButton
                disabled={busy}
                onPress={() => {
                  if (busy) return;
                  dismissKeyboard();
                  void submit();
                }}
                className="inline-flex min-h-11 touch-manipulation items-center rounded-full bg-signal px-5 py-2.5 font-plex-sans text-[14px] font-medium text-iron disabled:opacity-40"
              >
                {busy
                  ? "Filing…"
                  : ending === "read"
                    ? "Write the read"
                    : "Put it on Hassan's desk"}
              </PressButton>
              <PressButton
                onPress={back}
                className="min-h-11 touch-manipulation font-plex-sans text-[14px] text-iron underline decoration-iron/30 underline-offset-4"
              >
                Back
              </PressButton>
            </div>
          </div>
        ) : current?.kind === "chips" || current?.kind === "chips-text" ? (
          <div>
            <p className="font-newsreader text-[20px] leading-[1.3] text-iron">
              {current.ask}
            </p>
            <ul className="mt-4 flex flex-col gap-2">
              {current.chips?.map((chip) => (
                <li key={chip.id}>
                  <PressButton
                    onPress={() => {
                      dismissKeyboard();
                      sendField(current, chip.id);
                    }}
                    className="min-h-11 w-full touch-manipulation rounded-[14px] bg-rag px-4 py-3 text-left font-newsreader text-[17px] text-iron ring-1 ring-iron/10"
                  >
                    {chip.label}
                  </PressButton>
                </li>
              ))}
            </ul>
            {current.kind === "chips-text" ? (
              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder={current.extraPlaceholder}
                rows={2}
                className="mt-3 w-full resize-none rounded-[14px] bg-rag px-4 py-3 font-newsreader text-[16px] text-iron outline-none ring-1 ring-iron/15"
              />
            ) : null}
            <PressButton
              onPress={back}
              className="mt-4 min-h-11 touch-manipulation font-plex-sans text-[14px] text-iron underline decoration-iron/30 underline-offset-4"
            >
              Back
            </PressButton>
          </div>
        ) : current?.kind === "identity" ? (
          <div>
            <p className="font-newsreader text-[20px] leading-[1.3] text-iron">
              {current.ask}
            </p>
            <label className="mt-4 block">
              <span className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/50">
                Name
              </span>
              <input
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                autoComplete="name"
                enterKeyHint="next"
                className="mt-1 w-full rounded-[14px] bg-rag px-4 py-3 font-newsreader text-[17px] text-iron outline-none ring-1 ring-iron/15"
              />
            </label>
            <label className="mt-3 block">
              <span className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/50">
                Email
              </span>
              <input
                value={note}
                onChange={(event) => setNote(event.target.value)}
                type="email"
                autoComplete="email"
                enterKeyHint="send"
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    sendIdentity();
                  }
                }}
                className="mt-1 w-full rounded-[14px] bg-rag px-4 py-3 font-newsreader text-[17px] text-iron outline-none ring-1 ring-iron/15"
              />
            </label>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <PressButton
                onPress={sendIdentity}
                className="inline-flex min-h-11 touch-manipulation items-center rounded-full bg-iron px-4 py-2 font-plex-sans text-[14px] font-medium text-rag"
              >
                Send
              </PressButton>
              <PressButton
                onPress={back}
                className="min-h-11 touch-manipulation font-plex-sans text-[14px] text-iron underline decoration-iron/30 underline-offset-4"
              >
                Back
              </PressButton>
            </div>
          </div>
        ) : current ? (
          <div>
            <p className="font-newsreader text-[20px] leading-[1.3] text-iron">
              {current.ask}
            </p>
            <textarea
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder={current.placeholder}
              enterKeyHint="send"
              rows={4}
              onKeyDown={(event) => {
                if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
                  event.preventDefault();
                  sendField(current, draft);
                }
              }}
              className="mt-4 w-full resize-none rounded-[14px] bg-rag px-4 py-3 font-newsreader text-[17px] leading-[1.4] text-iron outline-none ring-1 ring-iron/15"
            />
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <PressButton
                onPress={() => {
                  sendField(current, draft);
                }}
                className="inline-flex min-h-11 touch-manipulation items-center rounded-full bg-iron px-4 py-2 font-plex-sans text-[14px] font-medium text-rag"
              >
                Send
              </PressButton>
              <PressButton
                onPress={back}
                className="min-h-11 touch-manipulation font-plex-sans text-[14px] text-iron underline decoration-iron/30 underline-offset-4"
              >
                Back
              </PressButton>
            </div>
          </div>
        ) : null}
      </div>

      <label className="sr-only" htmlFor={`${script.id}-website`}>
        Company site
      </label>
      <input
        id={`${script.id}-website`}
        name="website"
        value={honeypot}
        onChange={(event) => setHoneypot(event.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
      />
    </div>
  );
}
