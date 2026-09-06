"use client";

import { useState } from "react";

const submissionOutcomes = [
  "new",
  "replied",
  "call_booked",
  "paid",
  "closed",
  "dead",
] as const;

type SubmissionOutcome = (typeof submissionOutcomes)[number];

type Props = {
  id: string;
  current: SubmissionOutcome;
  valueUsd?: string | null;
};

export function OutcomePicker({ id, current, valueUsd }: Readonly<Props>) {
  const [outcome, setOutcome] = useState<SubmissionOutcome>(current);
  const [value, setValue] = useState(valueUsd ?? "");
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState("");

  async function save() {
    setPending(true);
    setStatus("");
    try {
      const response = await fetch("/api/admin/submissions/outcome", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id, outcome, valueUsd: value }),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? "Outcome update failed.");
      }
      setStatus("Saved");
      window.location.reload();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Outcome update failed.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="w-[15rem]">
      <div className="flex items-center gap-2">
        <select
          value={outcome}
          onChange={(event) => setOutcome(event.target.value as SubmissionOutcome)}
          disabled={pending}
          className="min-w-0 flex-1 border border-iron/25 bg-rag px-2 py-1 font-plex-mono text-[12px]"
        >
          {submissionOutcomes.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => void save()}
          disabled={pending}
          className="border border-iron/25 px-2.5 py-1 font-plex-mono text-[11px] uppercase tracking-[0.08em] text-iron"
        >
          Save
        </button>
      </div>
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="value usd"
        disabled={pending}
        className="mt-1 w-full border border-iron/25 bg-rag px-2 py-1 font-plex-mono text-[11px]"
      />
      {status ? <p className="mt-1 font-plex-sans text-[12px] text-ink/70">{status}</p> : null}
    </div>
  );
}
