"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { DiagnosticPayloadInput } from "@/lib/careers/store";
import { SubmissionSuccess } from "@/components/intake/SubmissionSuccess";
import { track } from "@/lib/analytics/public";

type Props = {
  token: string;
  dueAt: string;
  seeded: DiagnosticPayloadInput | null;
  submitted: boolean;
  statusToken?: string | null;
  roleTitle?: string | null;
  candidateName?: string | null;
};

function emptyFinding() {
  return { observed: "", consequence: "", closing: "", evidence: "" };
}

export function DiagnosticForm({
  token,
  dueAt,
  seeded,
  submitted,
  statusToken,
  roleTitle,
  candidateName,
}: Props) {
  const reduceMotion = useReducedMotion();
  const [form, setForm] = useState<DiagnosticPayloadInput>(
    seeded ?? {
      read: "",
      findings: [emptyFinding(), emptyFinding(), emptyFinding()],
      whatItTakes: "",
      limits: "",
    },
  );
  const [isSubmitted, setIsSubmitted] = useState(submitted);
  const [message, setMessage] = useState<string>(submitted ? "Diagnostic already submitted." : "Draft saved locally.");
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [remainingMs, setRemainingMs] = useState(() => new Date(dueAt).getTime() - Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRemainingMs(new Date(dueAt).getTime() - Date.now());
    }, 1000);
    return () => window.clearInterval(timer);
  }, [dueAt]);

  const closed = remainingMs <= 0;

  const findingCount = form.findings.filter((item) => item.observed.trim().length > 0).length;
  const progress = useMemo(() => {
    let score = 0;
    if (form.read.trim().length > 120) score += 1;
    if (findingCount >= 3) score += 1;
    if (form.whatItTakes.trim().length > 40) score += 1;
    if (form.limits.trim().length > 20) score += 1;
    return Math.round((score / 4) * 100);
  }, [findingCount, form.limits, form.read, form.whatItTakes]);

  const remainingLabel = useMemo(() => {
    const safe = Math.max(0, remainingMs);
    const hours = Math.floor(safe / (1000 * 60 * 60));
    const minutes = Math.floor((safe % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m remaining`;
  }, [remainingMs]);

  const saveDraft = useCallback(async () => {
    if (isSubmitted || closed) return;
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
      setLastSavedAt(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Autosave failed.");
    } finally {
      setSaving(false);
    }
  }, [closed, form, isSubmitted, token]);

  useEffect(() => {
    if (isSubmitted) return;
    const timer = window.setInterval(() => {
      void saveDraft();
    }, 20000);
    return () => window.clearInterval(timer);
  }, [isSubmitted, saveDraft]);

  async function submit() {
    if (isSubmitted || closed) return;
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
      track("diagnostic.submitted", { surface: "careers-gate0" });
      setMessage("Submitted. Thank you.");
      setIsSubmitted(true);
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

  if (isSubmitted) {
    return (
      <motion.section
        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.42, ease: "easeOut" }}
        className="card mt-10 border-iron/15 p-7"
      >
        <SubmissionSuccess
          kicker="Diagnostic filed"
          heading="Gate 0 response received"
          body="Your report is in reviewer queue. You can track status anytime using your private link."
          referenceId={token}
        />
        {statusToken ? (
          <p className="mt-4 font-newsreader text-[16px] text-ink">
            Status page: {" "}
            <Link
              href={`/careers/status/${statusToken}`}
              className="underline decoration-iron/25 underline-offset-4 hover:decoration-iron"
            >
              {`/careers/status/${statusToken}`}
            </Link>
          </p>
        ) : null}
      </motion.section>
    );
  }

  return (
    <motion.section
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="card mt-10 border-iron/15 p-6 md:p-8"
    >
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-iron/12 pb-5">
        <div>
          <p className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/65">
            Diagnostic workspace
          </p>
          <p className="mt-2 font-newsreader text-[28px] leading-[1.1] text-iron">
            Build the launch read
          </p>
          <p className="mt-2 font-newsreader text-[16px] text-ink">
            {candidateName ?? "Candidate"} · {roleTitle ?? "Gate 0"}
          </p>
        </div>
        <div className="min-w-[14rem]">
          <p className={`font-plex-mono text-[12px] tabular-nums ${closed ? "text-signal-ink" : "text-ink/65"}`}>
            {closed ? "Window closed" : remainingLabel}
          </p>
          <div className="mt-2 h-[3px] w-full bg-iron/10">
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeOut" }}
              className="h-[3px] bg-iron"
            />
          </div>
          <p className="mt-1 font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/55">
            Completion {progress}%
          </p>
        </div>
      </div>

      <label className="mt-8 block rounded-[12px] border border-iron/10 bg-rag p-4">
        <span className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/45">
          The read
        </span>
        <textarea
          value={form.read}
          onChange={(event) => setForm((prev) => ({ ...prev, read: event.target.value }))}
          rows={5}
          disabled={isSubmitted || closed}
          className="docket-write mt-2"
        />
      </label>

      <div className="mt-8 rounded-[12px] border border-iron/10 bg-rag p-4">
        <div className="flex items-end justify-between gap-3">
          <p className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/45">
            Findings · {findingCount}/5
          </p>
          <button
            type="button"
            disabled={isSubmitted || closed || form.findings.length >= 5}
            onClick={() => setForm((prev) => ({ ...prev, findings: [...prev.findings, emptyFinding()] }))}
            className="min-h-11 font-plex-sans text-[14px] text-ink/50 underline decoration-iron/15 underline-offset-4 hover:text-iron disabled:opacity-40"
          >
            Add finding
          </button>
        </div>

        <div className="mt-4 space-y-8">
          {form.findings.map((finding, index) => (
            <motion.div
              key={`${index}-${finding.observed.slice(0, 12)}`}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              className="rounded-[10px] border border-iron/10 bg-rag-card p-4"
            >
              <p className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/45">
                Finding {String(index + 1).padStart(2, "0")}
              </p>
              <textarea
                value={finding.observed}
                onChange={(event) => updateFinding(index, "observed", event.target.value)}
                rows={2}
                placeholder="Observed"
                disabled={isSubmitted || closed}
                className="docket-write mt-3"
              />
              <textarea
                value={finding.consequence}
                onChange={(event) => updateFinding(index, "consequence", event.target.value)}
                rows={2}
                placeholder="Consequence"
                disabled={isSubmitted || closed}
                className="docket-write mt-3"
              />
              <textarea
                value={finding.closing}
                onChange={(event) => updateFinding(index, "closing", event.target.value)}
                rows={2}
                placeholder="Closing"
                disabled={isSubmitted || closed}
                className="docket-write mt-3"
              />
              <input
                value={finding.evidence}
                onChange={(event) => updateFinding(index, "evidence", event.target.value)}
                placeholder="Evidence path or log line"
                disabled={isSubmitted || closed}
                className="docket-write mt-3"
              />
            </motion.div>
          ))}
        </div>
      </div>

      <label className="mt-8 block rounded-[12px] border border-iron/10 bg-rag p-4">
        <span className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/45">
          What it takes
        </span>
        <textarea
          value={form.whatItTakes}
          onChange={(event) => setForm((prev) => ({ ...prev, whatItTakes: event.target.value }))}
          rows={4}
          disabled={isSubmitted || closed}
          className="docket-write mt-2"
        />
      </label>

      <label className="mt-8 block rounded-[12px] border border-iron/10 bg-rag p-4">
        <span className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/45">
          Limits · at least one
        </span>
        <textarea
          value={form.limits}
          onChange={(event) => setForm((prev) => ({ ...prev, limits: event.target.value }))}
          rows={3}
          disabled={isSubmitted || closed}
          className="docket-write mt-2"
        />
      </label>

      <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-iron/10 pt-5">
        <button
          type="button"
          onClick={() => void saveDraft()}
          disabled={isSubmitted || closed || saving}
          className="docket-next"
        >
          {saving ? "Saving…" : "Save draft"}
        </button>
        <button
          type="button"
          onClick={() => void submit()}
          disabled={isSubmitted || closed || submitting}
          className="docket-file"
        >
          {submitting ? "Filing…" : "File the diagnostic"}
        </button>
        <p className="font-newsreader text-[15px] text-ink">
          {message}
          {lastSavedAt ? ` Last save ${lastSavedAt}.` : ""}
        </p>
      </div>
    </motion.section>
  );
}
