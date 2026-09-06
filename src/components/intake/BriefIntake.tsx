"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
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
import { sessionFields } from "@/lib/intake/fields";
import { applyWoundRead, readWound } from "@/lib/intake/read-wound";
import { askLine, docketLabel } from "@/lib/intake/session-voice";
import { getSpecialist } from "@/content/specialists";
import { readMatchBrief } from "@/lib/match/session";
import {
  clearDesk,
  emptyDesk,
  loadDesk,
  saveDesk,
  subscribeDesk,
} from "@/lib/conversation/persist";
import type { FieldConfig, IntakeType } from "@/lib/intake/types";
import { track } from "@/lib/analytics/public";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LONG_FIELDS = new Set(["build", "detail", "idea"]);

function applies(field: FieldConfig, answers: Record<string, string>) {
  return !field.when || field.when(answers);
}

function validate(field: FieldConfig, value: string): string | null {
  const trimmed = value.trim();
  if (field.name === "email" && trimmed && !EMAIL_RE.test(trimmed)) {
    return "That email looks off.";
  }
  if (LONG_FIELDS.has(field.name) && trimmed && trimmed.length < 10) {
    return "A couple of lines. Enough to take it seriously.";
  }
  if (field.required && !trimmed) return "Say something, even a short one.";
  return null;
}

function kickerOf(
  type: IntakeType,
  source: string | undefined,
  first: string,
  named: boolean,
) {
  if (named) return `Direct · ${first}`;
  if (source === "session") return "The Session";
  if (source === "first-slice") return "The First Slice";
  if (type === "check") return "The Check";
  if (type === "careers") return "Careers";
  if (type === "contact") return "Contact";
  if (type === "work") return "Work";
  return "The brief";
}

function writeType(field: FieldConfig): "text" | "email" | "url" | "textarea" {
  if (field.type === "textarea") return "textarea";
  if (field.type === "input" && field.input === "email") return "email";
  if (field.type === "input" && field.input === "url") return "url";
  return "text";
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
  const persistId = `brief:${type}:${source ?? type}`;
  const stored = useSyncExternalStore(
    subscribeDesk,
    () => loadDesk(persistId),
    emptyDesk,
  );
  const answers = useMemo(
    () => ({ ...prefill, ...stored.answers }),
    [prefill, stored.answers],
  );
  const [draft, setDraft] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<{ id: string; emailed: boolean } | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const [requestId] = useState(() =>
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `brief-${Date.now()}`,
  );
  const started = useRef(false);

  useEffect(() => {
    if (Object.keys(stored.answers).length > 0) return;
    if (!prefill || Object.keys(prefill).length === 0) return;
    saveDesk(persistId, { answers: { ...prefill }, seen: [] });
  }, [persistId, prefill, stored.answers]);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    if (Object.keys(stored.answers).length > 0) {
      track("intake.resumed", { surface: source ?? type });
    }
    if (type === "check") {
      track("check.started", { surface: source ?? "check" });
      return;
    }
    if (type === "careers") {
      track("careers.started", { surface: source ?? "careers" });
      return;
    }
    if (source === "session") {
      track("session.started", { surface: "session" });
      return;
    }
    if (source === "first-slice") {
      track("slice.started", { surface: "first-slice" });
      return;
    }
    if (type === "contact") {
      track("contact.started", { surface: source ?? "contact" });
      return;
    }
  }, [source, stored.answers, type]);

  const visible = useMemo(
    () => fields.filter((field) => applies(field, answers)),
    [fields, answers],
  );
  const current =
    visible.find((field) => !(answers[field.name] ?? "").trim()) ?? null;
  const filled = visible.filter((field) => (answers[field.name] ?? "").trim());
  const reviewing = !current;
  const index = reviewing ? visible.length : filled.length + 1;
  const kicker = kickerOf(type, source, first, Boolean(person));

  function writeAnswers(next: Record<string, string>) {
    saveDesk(persistId, { answers: next, seen: stored.seen });
    setDraft("");
    setError(null);
  }

  function send(field: FieldConfig, value: string) {
    const message = validate(field, value);
    if (message) {
      track("intake.error", { surface: source ?? type, field: field.name });
      setError(message);
      return;
    }
    const trimmed = value.trim();
    let next = { ...answers, [field.name]: trimmed };
    if (type === "check" && field.name === "build") {
      next = applyWoundRead(next, readWound(trimmed)).answers;
    }
    writeAnswers(next);
  }

  function skip(field: FieldConfig) {
    if (field.required) {
      setError("That one is required.");
      return;
    }
    send(field, "I'd rather not say");
  }

  function back() {
    const last = filled.at(-1);
    if (!last) return;
    dismissKeyboard();
    const next = { ...answers };
    delete next[last.name];
    saveDesk(persistId, { answers: next, seen: stored.seen });
    setDraft("");
    setError(null);
  }

  async function submit() {
    for (const field of visible) {
      if (!field.required) continue;
      const message = validate(field, answers[field.name] ?? "");
      if (message) {
        track("intake.error", { surface: source ?? type, field: field.name });
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
        emailed?: boolean;
        error?: string;
      };
      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? "The brief did not save.");
      }
      if (type === "check") {
        track("check.submitted", { surface: source ?? "check" });
      }
      if (source === "session") {
        track("read.submitted", { surface: "session" });
      }
      const storedMatch = readMatchBrief();
      if (storedMatch.eventId && type === "work") {
        void fetch("/api/match/outcome", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            matchEventId: storedMatch.eventId,
            outcome: "booked",
          }),
        });
      }
      clearDesk(persistId);
      setDone({ id: data.id ?? requestId, emailed: Boolean(data.emailed) });
    } catch (error_) {
      setError(
        error_ instanceof Error ? error_.message : "The brief did not save.",
      );
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <DocketFiled
        kicker="Docket filed"
        heading={
          type === "check"
            ? "The Check is on Aneeb's desk."
            : `On ${first}'s desk.`
        }
        body="A person replies from a real inbox, within one business day."
        referenceId={done.id}
        emailed={done.emailed}
      />
    );
  }

  const ask = reviewing
    ? "Check it, then file it."
    : current
      ? askLine(current, answers)
      : "Write what is stuck.";

  return (
    <>
      <Docket
        kicker={kicker}
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
              {busy
                ? "Filing…"
                : type === "check"
                  ? "File the Check"
                  : `File it for ${first}`}
            </DocketFile>
          ) : current && (current.type === "radio" || current.type === "select") ? null : current ? (
            <div className="flex items-center gap-4">
              {!current.required ? (
                <button
                  type="button"
                  onClick={() => skip(current)}
                  className="docket-back"
                >
                  Skip
                </button>
              ) : null}
              <DocketNext onPress={() => send(current, draft)}>Continue</DocketNext>
            </div>
          ) : null
        }
      >
        {reviewing ? (
          <DocketReview
            rows={visible.map((field) => ({
              label: docketLabel[field.name] ?? field.label,
              value: answers[field.name] ?? "",
            }))}
          />
        ) : current && (current.type === "radio" || current.type === "select") ? (
          <DocketChoices
            options={current.options.map((option) => ({
              id: option,
              label: option,
            }))}
            onPick={(id) => {
              dismissKeyboard();
              send(current, id);
            }}
          />
        ) : current ? (
          <DocketWrite
            value={draft}
            onChange={setDraft}
            onSubmit={() => send(current, draft)}
            placeholder={current.type === "input" || current.type === "textarea" ? current.placeholder : undefined}
            type={writeType(current)}
            autoComplete={current.type === "input" ? current.autoComplete : undefined}
            rows={2}
          />
        ) : null}
      </Docket>
      <label className="sr-only" htmlFor={`${persistId}-website`}>
        Company site
      </label>
      <input
        id={`${persistId}-website`}
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
