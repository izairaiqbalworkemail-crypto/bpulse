"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { PressButton, dismissKeyboard } from "@/components/PressButton";
import {
  aboutDirectScript,
  askedByFor,
  BRIEF_LABEL,
  getDirectScript,
} from "@/content/direct-scripts";
import { getSpecialist } from "@/content/specialists";
import { gateLine } from "@/lib/direct/gate";
import {
  fieldComplete,
  nextOpen,
  visibleFields,
} from "@/lib/conversation/script";
import {
  clearDesk,
  emptyDesk,
  loadDesk,
  saveDesk,
  subscribeDesk,
} from "@/lib/conversation/persist";
import { readMatchBrief } from "@/lib/match/session";
import type { Answers, Field } from "@/lib/conversation/types";
import { firstName, initials } from "@/lib/lot-trace";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type DirectDeskProps = {
  specialistId?: string;
  variant?: "about";
  pageSource: string;
};

function scriptFor(specialistId: string | undefined, variant?: "about") {
  if (variant === "about") return aboutDirectScript;
  return getDirectScript(specialistId ?? "aneeb");
}

function labelOf(field: Field, value: string) {
  const chip = field.chips?.find((item) => item.id === value);
  return chip?.label ?? value;
}

function displayValue(field: Field, answers: Answers) {
  if (field.kind === "identity") {
    return `${answers.name} · ${answers.email}`;
  }
  if (field.kind === "chips" || field.kind === "chips-text") {
    return [labelOf(field, answers[field.name] ?? ""), answers[`${field.name}Note`]]
      .filter(Boolean)
      .join(" — ");
  }
  return answers[field.name] ?? "";
}

function briefLabel(name: string) {
  return BRIEF_LABEL[name] ?? name;
}

export function DirectDesk({
  specialistId,
  variant,
  pageSource,
}: Readonly<DirectDeskProps>) {
  const script = scriptFor(specialistId, variant);
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
  const [record, setRecord] = useState<Answers | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const [requestId] = useState(() =>
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `direct-${Date.now()}`,
  );
  const visible = useMemo(() => visibleFields(script, answers), [script, answers]);
  const current = nextOpen(script, answers);
  const reviewing = !current;

  useEffect(() => {
    if (answers.product) return;
    const brief = readMatchBrief().brief;
    if (!brief) return;
    saveDesk(script.id, {
      answers: { ...answers, product: brief },
      seen: stored.seen,
    });
  }, [answers, script.id, stored.seen]);

  const askerId = askedByFor(script.id, current?.name ?? "product");
  const asker = getSpecialist(askerId);
  const askerFirst = firstName(asker.name);
  const headerPerson = specialistId
    ? getSpecialist(specialistId)
    : getSpecialist("aneeb");
  const headerFirst = firstName(headerPerson.name);
  const gate = gateLine(headerPerson.id);

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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          type: "direct",
          source: pageSource,
          with: headerPerson.id,
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
      setRecord(answers);
      clearDesk(script.id);
    } catch (error_) {
      setError(error_ instanceof Error ? error_.message : "It did not save.");
    } finally {
      setBusy(false);
    }
  }

  const filledRows = visible.filter((field) => fieldComplete(field, answers));

  if (record) {
    const rows = visibleFields(script, record).filter((field) =>
      fieldComplete(field, record),
    );
    return (
      <div className="overflow-hidden rounded-[16px] bg-rag-card p-6 shadow-[var(--shadow-card)] ring-1 ring-iron/10 md:p-8 print:shadow-none print:ring-0">
        <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/60">
          Written intake · filed
        </p>
        <h2 className="mt-3 font-newsreader text-[28px] leading-[1.15] text-iron">
          {headerFirst} has the brief.
        </h2>
        <p className="mt-3 max-w-[42ch] font-newsreader text-[17px] leading-[1.4] text-ink">
          A person replies from a real inbox, within one business day. Nobody was
          typing.
        </p>
        <dl className="mt-8 flex flex-col gap-4">
          {rows.map((field) => (
            <div key={field.name}>
              <dt className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/50">
                {briefLabel(field.kind === "identity" ? "email" : field.name)}
              </dt>
              <dd className="mt-1 font-newsreader text-[17px] leading-[1.4] text-iron">
                {displayValue(field, record)}
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-8 flex flex-wrap gap-3 print:hidden">
          <PressButton
            onPress={() => window.print()}
            className="inline-flex min-h-11 items-center rounded-full bg-iron px-4 py-2 font-plex-sans text-[14px] font-medium text-rag"
          >
            Print this record
          </PressButton>
          <Link
            href="/direct"
            className="inline-flex min-h-11 items-center font-plex-sans text-[14px] text-iron underline decoration-iron/30 underline-offset-4"
          >
            Write someone else
          </Link>
        </div>
      </div>
    );
  }

  const portrait = headerPerson.photo && headerPerson.photoStatus === "Photo";

  return (
    <div className="overflow-hidden rounded-[16px] bg-rag-card shadow-[var(--shadow-card)] ring-1 ring-iron/10">
      <header className="border-b border-iron/10 bg-iron px-5 py-5 text-rag md:px-7">
        <div className="flex items-start gap-4">
          <span className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-full bg-iron-2">
            {portrait ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={headerPerson.photo}
                alt=""
                width={56}
                height={56}
                className="h-full w-full object-cover object-top"
              />
            ) : (
              <span className="font-newsreader text-[20px] text-rag">
                {initials(headerPerson.name)}
              </span>
            )}
          </span>
          <div className="min-w-0">
            <p className="font-newsreader text-[22px] leading-[1.15] text-rag">
              {headerPerson.name}
              <span className="text-rag/55">
                {" "}
                · {headerPerson.role.split("·")[0]?.trim()}
              </span>
            </p>
            <p className="mt-1">
              <Link
                href={gate.href}
                className="font-plex-mono text-[12px] text-signal underline decoration-signal/40 underline-offset-4"
              >
                {gate.label}
              </Link>
            </p>
            <p className="mt-3 max-w-[52ch] font-newsreader text-[16px] leading-[1.4] text-rag/80">
              {script.banner}
            </p>
          </div>
        </div>
      </header>

      <div className="grid md:grid-cols-[minmax(0,1fr)_16.5rem]">
        <div className="min-w-0 px-5 py-6 md:px-7">
          <div className="mb-6 rounded-[12px] bg-rag px-4 py-3 ring-1 ring-iron/10 md:hidden">
            <p className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/50">
              Your brief
            </p>
            {filledRows.length === 0 ? (
              <p className="mt-1 font-newsreader text-[15px] text-ink/70">
                It fills as you answer.
              </p>
            ) : (
              <dl className="mt-2 flex flex-col gap-2">
                {filledRows.map((field) => (
                  <div key={field.name} className="flex justify-between gap-3">
                    <dt className="font-plex-mono text-[11px] uppercase tracking-[0.06em] text-ink/50">
                      {briefLabel(field.kind === "identity" ? "email" : field.name)}
                    </dt>
                    <dd className="truncate font-newsreader text-[14px] text-iron">
                      {displayValue(field, answers)}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          {error ? (
            <p role="alert" className="mb-4 font-newsreader text-[15px] text-iron">
              {error}
            </p>
          ) : null}

          {reviewing || !current ? (
            <div>
              <p className="font-newsreader text-[22px] leading-[1.3] text-iron">
                That&apos;s the brief. Check it, then send it.
              </p>
              <dl className="mt-5 flex flex-col gap-3">
                {visible.map((field) => (
                  <div key={field.name}>
                    <dt className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/50">
                      {briefLabel(field.kind === "identity" ? "email" : field.name)}
                    </dt>
                    <dd className="mt-1 font-newsreader text-[17px] leading-[1.4] text-iron">
                      {displayValue(field, answers)}
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
                  {busy ? "Filing…" : `Send it to ${headerFirst}`}
                </PressButton>
                <PressButton
                  onPress={back}
                  className="min-h-11 touch-manipulation font-plex-sans text-[14px] text-iron underline decoration-iron/30 underline-offset-4"
                >
                  Back
                </PressButton>
              </div>
            </div>
          ) : (
            <div>
              <p className="font-plex-sans text-[14px] text-signal">
                {askerFirst} asks
              </p>
              <p className="mt-1 font-newsreader text-[22px] leading-[1.3] text-iron">
                {current.ask}
              </p>

              {current.kind === "chips" ? (
                <ul className="mt-5 flex flex-wrap gap-2">
                  {current.chips?.map((chip) => (
                    <li key={chip.id}>
                      <PressButton
                        onPress={() => {
                          dismissKeyboard();
                          sendField(current, chip.id);
                        }}
                        className="min-h-11 touch-manipulation rounded-full bg-rag px-4 py-2 font-newsreader text-[16px] text-iron ring-1 ring-iron/15"
                      >
                        {chip.label}
                      </PressButton>
                    </li>
                  ))}
                </ul>
              ) : current.kind === "identity" ? (
                <div className="mt-5">
                  <label className="block">
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
                  <PressButton
                    onPress={sendIdentity}
                    className="mt-4 inline-flex min-h-11 touch-manipulation items-center rounded-full bg-iron px-4 py-2 font-plex-sans text-[14px] font-medium text-rag"
                  >
                    Send
                  </PressButton>
                </div>
              ) : (
                <div className="mt-5">
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
                    className="w-full resize-none rounded-[14px] bg-rag px-4 py-3 font-newsreader text-[17px] leading-[1.4] text-iron outline-none ring-1 ring-iron/15"
                  />
                  <PressButton
                    onPress={() => sendField(current, draft)}
                    className="mt-3 inline-flex min-h-11 touch-manipulation items-center rounded-full bg-iron px-4 py-2 font-plex-sans text-[14px] font-medium text-rag"
                  >
                    Send
                  </PressButton>
                </div>
              )}

              <PressButton
                onPress={back}
                className="mt-4 min-h-11 touch-manipulation font-plex-sans text-[14px] text-iron underline decoration-iron/30 underline-offset-4"
              >
                Back
              </PressButton>
            </div>
          )}
        </div>

        <aside className="hidden border-l border-iron/10 bg-rag px-5 py-6 md:block">
          <p className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/50">
            Your brief
          </p>
          <div className="mt-4 h-px bg-iron/10" aria-hidden="true" />
          {filledRows.length === 0 ? (
            <p className="mt-4 font-newsreader text-[15px] leading-[1.4] text-ink/70">
              This is what {headerFirst} will read.
            </p>
          ) : (
            <dl className="mt-4 flex flex-col gap-4">
              {filledRows.map((field) => (
                <div key={field.name}>
                  <dt className="font-plex-mono text-[11px] uppercase tracking-[0.06em] text-ink/50">
                    {briefLabel(field.kind === "identity" ? "email" : field.name)}
                  </dt>
                  <dd className="mt-1 font-newsreader text-[15px] leading-[1.4] text-iron">
                    {displayValue(field, answers)}
                  </dd>
                </div>
              ))}
            </dl>
          )}
          <p className="mt-8 font-newsreader text-[14px] leading-[1.4] text-ink/60">
            This is what {headerFirst} will read.
          </p>
        </aside>
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
