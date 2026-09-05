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
    <div className="card mt-8 p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">Window: 48 hours from opening · expected effort ~2 hours</p>
        <p className="font-plex-mono text-[12px] text-ink/80">{remainingLabel}</p>
      </div>

      <label className="mt-5 block">
        <span className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">The read</span>
        <textarea
          value={form.read}
          onChange={(event) => setForm((prev) => ({ ...prev, read: event.target.value }))}
          rows={5}
          disabled={submitted || closed}
          className="mt-2 w-full rounded-[12px] bg-rag px-4 py-3 font-newsreader text-[17px] text-iron ring-1 ring-iron/15 outline-none"
        />
      </label>

      <div className="mt-8">
        <div className="flex items-center justify-between">
          <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">Findings (3-5 required)</p>
          <button
            type="button"
            disabled={submitted || closed || form.findings.length >= 5}
            onClick={() => setForm((prev) => ({ ...prev, findings: [...prev.findings, emptyFinding()] }))}
            className="rounded-full border border-iron/20 px-3 py-1 font-plex-sans text-[13px]"
          >
            Add finding
          </button>
        </div>

        <div className="mt-3 space-y-4">
          {form.findings.map((finding, index) => (
            <div key={`${index}-${finding.observed.slice(0, 12)}`} className="card p-4">
              <p className="font-plex-mono text-[12px] text-ink/70">Finding {index + 1}</p>
              <textarea
                value={finding.observed}
                onChange={(event) => updateFinding(index, "observed", event.target.value)}
                rows={2}
                placeholder="Observed"
                disabled={submitted || closed}
                className="mt-2 w-full rounded-[10px] bg-rag px-3 py-2 font-newsreader text-[16px] ring-1 ring-iron/15"
              />
              <textarea
                value={finding.consequence}
                onChange={(event) => updateFinding(index, "consequence", event.target.value)}
                rows={2}
                placeholder="Consequence"
                disabled={submitted || closed}
                className="mt-2 w-full rounded-[10px] bg-rag px-3 py-2 font-newsreader text-[16px] ring-1 ring-iron/15"
              />
              <textarea
                value={finding.closing}
                onChange={(event) => updateFinding(index, "closing", event.target.value)}
                rows={2}
                placeholder="Closing"
                disabled={submitted || closed}
                className="mt-2 w-full rounded-[10px] bg-rag px-3 py-2 font-newsreader text-[16px] ring-1 ring-iron/15"
              />
              <input
                value={finding.evidence}
                onChange={(event) => updateFinding(index, "evidence", event.target.value)}
                placeholder="Evidence path or log line"
                disabled={submitted || closed}
                className="mt-2 w-full rounded-[10px] bg-rag px-3 py-2 font-newsreader text-[16px] ring-1 ring-iron/15"
              />
            </div>
          ))}
        </div>
      </div>

      <label className="mt-8 block">
        <span className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">What it takes</span>
        <textarea
          value={form.whatItTakes}
          onChange={(event) => setForm((prev) => ({ ...prev, whatItTakes: event.target.value }))}
          rows={4}
          disabled={submitted || closed}
          className="mt-2 w-full rounded-[12px] bg-rag px-4 py-3 font-newsreader text-[17px] ring-1 ring-iron/15"
        />
      </label>

      <label className="mt-5 block">
        <span className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">Limits (minimum one, required)</span>
        <textarea
          value={form.limits}
          onChange={(event) => setForm((prev) => ({ ...prev, limits: event.target.value }))}
          rows={3}
          disabled={submitted || closed}
          className="mt-2 w-full rounded-[12px] bg-rag px-4 py-3 font-newsreader text-[17px] ring-1 ring-iron/15"
        />
      </label>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => void saveDraft()}
          disabled={submitted || closed || saving}
          className="rounded-full border border-iron/20 px-4 py-2 font-plex-sans text-[14px]"
        >
          {saving ? "Saving..." : "Save draft"}
        </button>
        <button
          type="button"
          onClick={() => void submit()}
          disabled={submitted || closed || submitting}
          className="rounded-full bg-iron px-5 py-2 font-plex-sans text-[14px] text-rag"
        >
          {submitting ? "Submitting..." : "Submit diagnostic"}
        </button>
        <p className="font-newsreader text-[16px] text-ink">{message}</p>
      </div>
    </div>
  );
}
