"use client";

import { useEffect, useMemo, useState } from "react";
import type { DiagnosticPayloadInput } from "@/lib/careers/store";

type Props = {
  token: string;
  dueAt: string;
  seeded: DiagnosticPayloadInput | null;
  submitted: boolean;
};

function emptyFinding() {
  return { observed: "", consequence: "", closing: "", evidence: "" };
}

export function DiagnosticForm({ token, dueAt, seeded, submitted }: Props) {
  const [form, setForm] = useState<DiagnosticPayloadInput>(
    seeded ?? {
      read: "",
      findings: [emptyFinding(), emptyFinding(), emptyFinding()],
      whatItTakes: "",
      limits: "",
    },
  );
  const [message, setMessage] = useState<string>(submitted ? "Submitted." : "Draft saved locally.");
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [remainingMs, setRemainingMs] = useState(() => new Date(dueAt).getTime() - Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRemainingMs(new Date(dueAt).getTime() - Date.now());
    }, 1000);
    return () => window.clearInterval(timer);
  }, [dueAt]);

  useEffect(() => {
    if (submitted) return;
    const timer = window.setInterval(() => {
      void saveDraft();
    }, 20000);
    return () => window.clearInterval(timer);
  });

  const closed = remainingMs <= 0;

  const remainingLabel = useMemo(() => {
    const safe = Math.max(0, remainingMs);
    const hours = Math.floor(safe / (1000 * 60 * 60));
    const minutes = Math.floor((safe % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m remaining`;
  }, [remainingMs]);

  async function saveDraft() {
    if (submitted || closed) return;
    setSaving(true);
    try {
      const response = await fetch(`/api/careers/diagnostic/${token}/autosave`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? "Autosave failed.");
      }
      setMessage("Autosaved.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Autosave failed.");
    } finally {
      setSaving(false);
    }
  }

  async function submit() {
    if (submitted || closed) return;
    setSubmitting(true);
    try {
      const response = await fetch(`/api/careers/diagnostic/${token}/submit`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? "Submission failed.");
      }
      setMessage("Submitted. Thank you.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Submission failed.");
    } finally {
      setSubmitting(false);
    }
  }

  function updateFinding(index: number, key: "observed" | "consequence" | "closing" | "evidence", value: string) {
    setForm((prev) => {
      const findings = [...prev.findings];
      findings[index] = { ...findings[index], [key]: value };
      return { ...prev, findings };
    });
  }

  return (
    <div className="docket mt-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/45">
            Diagnostic
          </p>
          <p className="mt-2 font-newsreader text-[22px] leading-[1.2] text-iron">
            Forty-eight hours. About two hours of work.
          </p>
        </div>
        <p className="font-plex-mono text-[12px] tabular-nums text-ink/45">
          {remainingLabel}
        </p>
      </div>

      <label className="mt-10 block">
        <span className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/45">
          The read
        </span>
        <textarea
          value={form.read}
          onChange={(event) => setForm((prev) => ({ ...prev, read: event.target.value }))}
          rows={5}
          disabled={submitted || closed}
          className="docket-write"
        />
      </label>

      <div className="mt-10">
        <div className="flex items-end justify-between gap-3">
          <p className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/45">
            Findings · three to five
          </p>
          <button
            type="button"
            disabled={submitted || closed || form.findings.length >= 5}
            onClick={() => setForm((prev) => ({ ...prev, findings: [...prev.findings, emptyFinding()] }))}
            className="min-h-11 font-plex-sans text-[14px] text-ink/50 underline decoration-iron/15 underline-offset-4 hover:text-iron disabled:opacity-40"
          >
            Add finding
          </button>
        </div>

        <div className="mt-4 space-y-8">
          {form.findings.map((finding, index) => (
            <div key={`${index}-${finding.observed.slice(0, 12)}`} className="border-t border-iron/10 pt-5">
              <p className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/45">
                Finding {String(index + 1).padStart(2, "0")}
              </p>
              <textarea
                value={finding.observed}
                onChange={(event) => updateFinding(index, "observed", event.target.value)}
                rows={2}
                placeholder="Observed"
                disabled={submitted || closed}
                className="docket-write mt-3"
              />
              <textarea
                value={finding.consequence}
                onChange={(event) => updateFinding(index, "consequence", event.target.value)}
                rows={2}
                placeholder="Consequence"
                disabled={submitted || closed}
                className="docket-write mt-3"
              />
              <textarea
                value={finding.closing}
                onChange={(event) => updateFinding(index, "closing", event.target.value)}
                rows={2}
                placeholder="Closing"
                disabled={submitted || closed}
                className="docket-write mt-3"
              />
              <input
                value={finding.evidence}
                onChange={(event) => updateFinding(index, "evidence", event.target.value)}
                placeholder="Evidence path or log line"
                disabled={submitted || closed}
                className="docket-write mt-3"
              />
            </div>
          ))}
        </div>
      </div>

      <label className="mt-10 block">
        <span className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/45">
          What it takes
        </span>
        <textarea
          value={form.whatItTakes}
          onChange={(event) => setForm((prev) => ({ ...prev, whatItTakes: event.target.value }))}
          rows={4}
          disabled={submitted || closed}
          className="docket-write"
        />
      </label>

      <label className="mt-8 block">
        <span className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/45">
          Limits · at least one
        </span>
        <textarea
          value={form.limits}
          onChange={(event) => setForm((prev) => ({ ...prev, limits: event.target.value }))}
          rows={3}
          disabled={submitted || closed}
          className="docket-write"
        />
      </label>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={() => void saveDraft()}
          disabled={submitted || closed || saving}
          className="docket-next"
        >
          {saving ? "Saving…" : "Save draft"}
        </button>
        <button
          type="button"
          onClick={() => void submit()}
          disabled={submitted || closed || submitting}
          className="docket-file"
        >
          {submitting ? "Filing…" : "File the diagnostic"}
        </button>
        <p className="font-newsreader text-[15px] text-ink">{message}</p>
      </div>
    </div>
  );
}
