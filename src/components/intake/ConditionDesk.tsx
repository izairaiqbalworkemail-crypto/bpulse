"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
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
import { offer } from "@/content/offer";
import {
  clearDesk,
  emptyDesk,
  loadDesk,
  saveDesk,
  subscribeDesk,
} from "@/lib/conversation/persist";
import type { FieldConfig } from "@/lib/intake/types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ConditionDeskProps = {
  source?: string;
  prefill?: Record<string, string>;
  surface?: "card" | "plain";
  submitTone?: "signal" | "iron";
};

function applies(field: FieldConfig, answers: Record<string, string>) {
  return !field.when || field.when(answers);
}

function validate(field: FieldConfig, value: string): string | null {
  const trimmed = value.trim();
  if (field.name === "email" && trimmed && !EMAIL_RE.test(trimmed)) {
    return "That email looks off.";
  }
  if (field.name === "build" && trimmed && trimmed.length < 10) {
    return "A couple of lines. Enough to take it seriously.";
  }
  if (field.required && !trimmed) return "Say something, even a short one.";
  return null;
}

function seedAnswers(prefill?: Record<string, string>) {
  const base = { ...prefill };
  if (!base.build) return base;
  return applyWoundRead(base, readWound(base.build)).answers;
}

function writeType(field: FieldConfig): "text" | "email" | "url" | "textarea" {
  if (field.type === "textarea") return "textarea";
  if (field.type === "input" && field.input === "email") return "email";
  if (field.type === "input" && field.input === "url") return "url";
  return "text";
}

export function ConditionDesk({
  source = "check",
  prefill,
}: Readonly<ConditionDeskProps>) {
  const persistId = `condition:${source}`;
  const stored = useSyncExternalStore(
    subscribeDesk,
    () => loadDesk(persistId),
    emptyDesk,
  );
  const answers = useMemo(() => {
    if (Object.keys(stored.answers).length > 0) {
      return { ...prefill, ...stored.answers };
    }
    return seedAnswers(prefill);
  }, [prefill, stored.answers]);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [requestId] = useState(() =>
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `check-${Date.now()}`,
  );

  useEffect(() => {
    if (Object.keys(stored.answers).length > 0) return;
    const seeded = seedAnswers(prefill);
    if (Object.keys(seeded).length === 0) return;
    saveDesk(persistId, { answers: seeded, seen: [] });
  }, [persistId, prefill, stored.answers]);

  const visible = useMemo(
    () => sessionFields.check.filter((field) => applies(field, answers)),
    [answers],
  );
  const current =
    visible.find((field) => !(answers[field.name] ?? "").trim()) ?? null;
  const filled = visible.filter((field) => (answers[field.name] ?? "").trim());
  const reviewing = !current;
  const index = reviewing ? visible.length : filled.length + 1;
  const price = `$${offer.check.price.toLocaleString("en-US")}`;

  function writeAnswers(next: Record<string, string>) {
    saveDesk(persistId, { answers: next, seen: stored.seen });
    setDraft("");
    setError(null);
  }

  function write(field: FieldConfig, value: string) {
    const message = validate(field, value);
    if (message) {
      setError(message);
      return;
    }
    const trimmed = value.trim();
    let next = { ...answers, [field.name]: trimmed };
    if (field.name === "build") {
      next = applyWoundRead(next, readWound(trimmed)).answers;
    }
    writeAnswers(next);
  }

  function skip(field: FieldConfig) {
    if (field.required) {
      setError("That one is required.");
      return;
    }
    write(field, "I'd rather not say");
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
      clearDesk(persistId);
      setDone(true);
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
      <DocketFiled
        kicker="Docket filed"
        heading="The Check is on Aneeb's desk."
        body="He reads it tomorrow. A person replies from a real inbox, within one business day."
      />
    );
  }

  const ask = reviewing
    ? "Check it, then file it."
    : current
      ? askLine(current, answers)
      : "Write the stuck part.";

  return (
    <>
      <Docket
        kicker="The Check"
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
              {busy ? "Filing…" : `File · ${price}`}
            </DocketFile>
          ) : current && (current.type === "radio" || current.type === "select") ? null : current ? (
            <div className="flex items-center gap-4">
              {!current.required ? (
                <button type="button" onClick={() => skip(current)} className="docket-back">
                  Skip
                </button>
              ) : null}
              <DocketNext onPress={() => write(current, draft)}>Continue</DocketNext>
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
              write(current, id);
            }}
          />
        ) : current ? (
          <DocketWrite
            value={draft}
            onChange={setDraft}
            onSubmit={() => write(current, draft)}
            placeholder={
              current.type === "input" || current.type === "textarea"
                ? current.placeholder
                : undefined
            }
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
