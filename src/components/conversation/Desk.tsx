"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { dismissKeyboard } from "@/components/PressButton";
import {
  Docket,
  DocketChoices,
  DocketFile,
  DocketFiled,
  DocketNext,
  DocketReview,
  DocketWrite,
} from "@/components/intake/docket/Docket";
import {
  checkScript,
  educationScript,
  fieldComplete,
  nextOpen,
  readScript,
  visibleFields,
} from "@/lib/conversation/script";
import {
  clearDesk,
  emptyDesk,
  loadDesk,
  saveDesk,
  subscribeDesk,
} from "@/lib/conversation/persist";
import type { Answers, Field } from "@/lib/conversation/types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LABELS: Record<string, string> = {
  product: "The product",
  stage: "Where it is",
  attemptedProduction: "Production",
  lastBreak: "What broke",
  shipWound: "When you ship",
  modelOnData: "On real data",
  duration: "How long",
  whoBuilt: "Who built it",
  docsLeft: "What's written",
  deadline: "The deadline",
  name: "Name",
  email: "Email",
  identity: "Where to send it",
  whoSits: "Who sits",
  whatTheyHold: "What they hold",
  whatBreaks: "What breaks",
};

const ADDRESSEE: Record<string, string> = {
  check: "Aneeb",
  read: "Aneeb",
  "second-chair": "Hassan",
};

const ADDRESSEE_NOTE: Record<string, string> = {
  check: "He reads it himself. A person replies within one business day.",
  read: "He reads it himself. A written reply within one business day.",
  "second-chair": "Hassan reads it. A person replies within one business day.",
};

const SCRIPTS = {
  check: checkScript,
  read: readScript,
  "second-chair": educationScript,
} as const;

type DeskProps = {
  scriptId: keyof typeof SCRIPTS;
  ending: "read" | "enquiry";
};

function labelOf(field: Field, value: string) {
  const chip = field.chips?.find((item) => item.id === value);
  return chip?.label ?? value;
}

function display(field: Field, answers: Answers) {
  if (field.kind === "identity") {
    return [answers.name, answers.email].filter(Boolean).join(" · ");
  }
  if (field.kind === "chips" || field.kind === "chips-text") {
    return [labelOf(field, answers[field.name] ?? ""), answers[`${field.name}Note`]]
      .filter(Boolean)
      .join(" · ");
  }
  return answers[field.name] ?? "";
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
  const [heldChip, setHeldChip] = useState("");
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
  const filled = visible.filter((field) => fieldComplete(field, answers));
  const index = reviewing ? visible.length : filled.length + 1;

  function write(partial: Answers) {
    saveDesk(script.id, {
      answers: { ...answers, ...partial },
      seen: stored.seen,
    });
    setDraft("");
    setNote("");
    setHeldChip("");
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

  function rewind(fromName: string) {
    const at = filled.findIndex((field) => field.name === fromName);
    if (at < 0) return;
    dismissKeyboard();
    const drop = filled.slice(at);
    const next = { ...answers };
    for (const field of drop) {
      delete next[field.name];
      if (field.kind === "chips-text") delete next[`${field.name}Note`];
      if (field.kind === "identity") {
        delete next.name;
        delete next.email;
      }
    }
    saveDesk(script.id, {
      answers: next,
      seen: stored.seen.filter((name) => !drop.some((field) => field.name === name)),
    });
    setDraft("");
    setNote("");
    setHeldChip("");
    setError(null);
  }

  function back() {
    const last = filled.at(-1);
    if (!last) return;
    rewind(last.name);
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
      <DocketFiled
        kicker="Docket filed"
        heading="Hassan has the note."
        body="A person replies from a real inbox, within one business day."
      />
    );
  }

  const who = ADDRESSEE[script.id] ?? "Aneeb";
  const ask = reviewing
    ? `Send it to ${who}.`
    : (current?.ask ?? "Write what is stuck.");
  const writing =
    current &&
    current.kind !== "chips" &&
    current.kind !== "chips-text";

  return (
    <>
      <Docket
        to={script.id === "read" ? undefined : who}
        kicker={script.id === "read" ? `To ${who}` : undefined}
        note={script.id === "read" ? undefined : ADDRESSEE_NOTE[script.id]}
        step={index}
        of={visible.length}
        ask={ask}
        hint={writing ? "Enter to continue" : undefined}
        error={error}
        prior={
          reviewing
            ? undefined
            : filled.map((field) => ({
                label: LABELS[field.name] ?? field.ask,
                value: display(field, answers),
                onEdit: () => rewind(field.name),
              }))
        }
        onBack={back}
        canBack={filled.length > 0}
        actions={
          reviewing ? (
            <DocketFile
              disabled={busy}
              onPress={() => {
                if (busy) return;
                dismissKeyboard();
                void submit();
              }}
            >
              {busy
                ? "Sending…"
                : ending === "read"
                  ? `Send it to ${who}`
                  : `File it for ${who}`}
            </DocketFile>
          ) : current?.kind === "chips" ? null : current?.kind === "chips-text" ? (
            <DocketNext
              disabled={!heldChip}
              onPress={() => sendField(current, heldChip)}
            >
              Continue
            </DocketNext>
          ) : current?.kind === "identity" ? (
            <DocketNext onPress={sendIdentity}>Continue</DocketNext>
          ) : current ? (
            <DocketNext
              disabled={!draft.trim()}
              onPress={() => sendField(current, draft)}
            >
              Continue
            </DocketNext>
          ) : null
        }
      >
        {reviewing ? (
          <DocketReview
            rows={visible.map((field) => ({
              label: LABELS[field.name] ?? field.ask,
              value: display(field, answers),
            }))}
          />
        ) : current?.kind === "chips" ? (
          <DocketChoices
            options={current.chips ?? []}
            onPick={(id) => {
              dismissKeyboard();
              sendField(current, id);
            }}
          />
        ) : current?.kind === "chips-text" ? (
          <div>
            <DocketChoices
              options={current.chips ?? []}
              selected={heldChip}
              onPick={setHeldChip}
            />
            <div className="mt-5">
              <DocketWrite
                value={note}
                onChange={setNote}
                onSubmit={() => {
                  if (heldChip) sendField(current, heldChip);
                }}
                placeholder={current.extraPlaceholder}
                type="textarea"
                rows={3}
              />
            </div>
          </div>
        ) : current?.kind === "identity" ? (
          <div className="docket-split">
            <DocketWrite
              label="Name"
              name="name"
              value={draft}
              onChange={setDraft}
              onSubmit={() => document.getElementById("docket-email")?.focus()}
              autoComplete="name"
            />
            <DocketWrite
              label="Email"
              name="email"
              value={note}
              onChange={setNote}
              onSubmit={sendIdentity}
              type="email"
              autoComplete="email"
              autoFocus={false}
            />
          </div>
        ) : current ? (
          <DocketWrite
            value={draft}
            onChange={setDraft}
            onSubmit={() => sendField(current, draft)}
            placeholder={current.placeholder}
            type="textarea"
            rows={current.name === "product" || current.name === "shipWound" ? 4 : 3}
          />
        ) : null}
      </Docket>
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
    </>
  );
}
