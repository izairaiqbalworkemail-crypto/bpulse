"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { dismissKeyboard } from "@/components/PressButton";
import {
  Docket,
  DocketChoices,
  DocketFile,
  DocketNext,
  DocketReview,
  DocketWrite,
} from "@/components/intake/docket/Docket";
import { SubmissionSuccess } from "@/components/intake/SubmissionSuccess";
import {
  aboutDirectScript,
  BRIEF_LABEL,
  getDirectScript,
} from "@/content/direct-scripts";
import { getSpecialist } from "@/content/specialists";
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
import { firstName } from "@/lib/lot-trace";
import { track } from "@/lib/analytics/public";

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
    return [answers.name, answers.email].filter(Boolean).join(" · ");
  }
  if (field.kind === "chips" || field.kind === "chips-text") {
    return [labelOf(field, answers[field.name] ?? ""), answers[`${field.name}Note`]]
      .filter(Boolean)
      .join(" · ");
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
  const [record, setRecord] = useState<{
    answers: Answers;
    id: string;
    emailed: boolean;
  } | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const started = useRef(false);
  const [requestId] = useState(() =>
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `direct-${Date.now()}`,
  );
  const visible = useMemo(() => visibleFields(script, answers), [script, answers]);
  const current = nextOpen(script, answers);
  const reviewing = !current;
  const filled = visible.filter((field) => fieldComplete(field, answers));
  const index = reviewing ? visible.length : filled.length + 1;

  useEffect(() => {
    if (answers.product) return;
    const brief = readMatchBrief().brief;
    if (!brief) return;
    saveDesk(script.id, {
      answers: { ...answers, product: brief },
      seen: stored.seen,
    });
  }, [answers, script.id, stored.seen]);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    if (Object.keys(answers).length > 0) {
      track("intake.resumed", { surface: pageSource });
    }
    track("direct.started", {
      surface: pageSource,
      specialist: specialistId ?? "aneeb",
    });
  }, [answers, pageSource, specialistId]);

  const headerPerson = specialistId
    ? getSpecialist(specialistId)
    : getSpecialist("aneeb");
  const headerFirst = firstName(headerPerson.name);

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
      track("intake.error", { surface: pageSource, field: field.name });
      setError("Say something, even a short one.");
      return;
    }
    write({ [field.name]: trimmed });
  }

  function sendIdentity() {
    const name = draft.trim();
    const email = note.trim();
    if (!name) {
      track("intake.error", { surface: pageSource, field: "name" });
      setError("A first name is plenty.");
      return;
    }
    if (!EMAIL_RE.test(email)) {
      track("intake.error", { surface: pageSource, field: "email" });
      setError("That email looks off.");
      return;
    }
    write({ name, email });
  }

  function back() {
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
      const data = (await response.json()) as {
        ok?: boolean;
        id?: string;
        emailed?: boolean;
        error?: string;
      };
      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? "The note did not save.");
      }
      setRecord({ answers, id: data.id ?? requestId, emailed: Boolean(data.emailed) });
      clearDesk(script.id);
    } catch (error_) {
      setError(error_ instanceof Error ? error_.message : "It did not save.");
    } finally {
      setBusy(false);
    }
  }

  if (record) {
    const rows = visibleFields(script, record.answers).filter((field) =>
      fieldComplete(field, record.answers),
    );
    return (
      <div className="docket">
        <SubmissionSuccess
          heading={`${headerFirst} has the brief.`}
          body="A person replies from a real inbox, within one business day."
          referenceId={record.id}
          emailed={record.emailed}
        />
        <div className="mt-10">
          <DocketReview
            rows={rows.map((field) => ({
              label: briefLabel(field.kind === "identity" ? "email" : field.name),
              value: displayValue(field, record.answers),
            }))}
          />
        </div>
        <div className="mt-10 flex flex-wrap gap-6 print:hidden">
          <button type="button" onClick={() => window.print()} className="docket-next">
            Print this record
          </button>
          <Link
            href="/direct"
            className="min-h-11 font-plex-sans text-[14px] text-ink/50 underline decoration-iron/15 underline-offset-4 hover:text-iron"
          >
            Write someone else
          </Link>
        </div>
      </div>
    );
  }

  const ask = reviewing
    ? "Check it, then file it."
    : (current?.ask ?? "Write what is stuck.");

  return (
    <>
      <Docket
        kicker={`Write ${headerFirst}`}
        step={index}
        of={visible.length}
        ask={ask}
        error={error}
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
              {busy ? "Filing…" : `File it for ${headerFirst}`}
            </DocketFile>
          ) : current?.kind === "chips" ? null : current?.kind === "identity" ? (
            <DocketNext onPress={sendIdentity}>Continue</DocketNext>
          ) : current ? (
            <DocketNext onPress={() => sendField(current, draft)}>Continue</DocketNext>
          ) : null
        }
      >
        {reviewing ? (
          <DocketReview
            rows={visible.map((field) => ({
              label: briefLabel(field.kind === "identity" ? "email" : field.name),
              value: displayValue(field, answers),
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
        ) : current?.kind === "identity" ? (
          <div>
            <DocketWrite
              label="Name"
              value={draft}
              onChange={setDraft}
              onSubmit={() => undefined}
              autoComplete="name"
            />
            <div className="mt-3">
              <DocketWrite
                label="Email"
                value={note}
                onChange={setNote}
                onSubmit={sendIdentity}
                type="email"
                autoComplete="email"
              />
            </div>
          </div>
        ) : current ? (
          <DocketWrite
            value={draft}
            onChange={setDraft}
            onSubmit={() => sendField(current, draft)}
            placeholder={current.placeholder}
            type="textarea"
            rows={2}
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
