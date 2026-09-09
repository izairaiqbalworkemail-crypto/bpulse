"use client";

import { useState } from "react";
import type { AdminSubmissionRow, SubmissionOutcome } from "@/lib/admin/submissions";
import { submissionOutcomes } from "@/lib/admin/submissions";

type Props = {
  rows: AdminSubmissionRow[];
};

export function SubmissionOutcomes({ rows }: Readonly<Props>) {
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  async function updateRow(id: string, outcome: SubmissionOutcome, valueUsd: string) {
    setPendingId(id);
    setMessage("");
    try {
      const response = await fetch("/api/admin/submissions/outcome", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id, outcome, valueUsd }),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? "Update failed.");
      }
      setMessage("Outcome updated. Refresh to see latest ratios.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Update failed.");
    } finally {
      setPendingId(null);
    }
  }

  return (
    <section className="border-t border-ink/10 pt-6">
      <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-quill/70">
        Outcomes
      </p>
      <p className="mt-2 font-newsreader text-[16px] leading-[1.5] text-quill">
        Update by hand from real follow-up outcomes.
      </p>
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b border-ink/15 text-left">
              <th className="py-2 pr-4 font-plex-mono text-[11px] uppercase tracking-[0.08em] text-quill/65">When</th>
              <th className="py-2 pr-4 font-plex-mono text-[11px] uppercase tracking-[0.08em] text-quill/65">Type</th>
              <th className="py-2 pr-4 font-plex-mono text-[11px] uppercase tracking-[0.08em] text-quill/65">Email</th>
              <th className="py-2 pr-4 font-plex-mono text-[11px] uppercase tracking-[0.08em] text-quill/65">Outcome</th>
              <th className="py-2 pr-4 font-plex-mono text-[11px] uppercase tracking-[0.08em] text-quill/65">Value USD</th>
              <th className="py-2 font-plex-mono text-[11px] uppercase tracking-[0.08em] text-quill/65">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <SubmissionRow
                key={row.id}
                row={row}
                disabled={pendingId === row.id}
                onSave={updateRow}
              />
            ))}
          </tbody>
        </table>
      </div>
      {message ? <p className="mt-4 font-plex-sans text-[14px] text-quill">{message}</p> : null}
    </section>
  );
}

function SubmissionRow({
  row,
  onSave,
  disabled,
}: Readonly<{
  row: AdminSubmissionRow;
  onSave: (id: string, outcome: SubmissionOutcome, valueUsd: string) => Promise<void>;
  disabled: boolean;
}>) {
  const [outcome, setOutcome] = useState<SubmissionOutcome>(row.outcome);
  const [value, setValue] = useState(row.valueUsd ?? "");

  return (
    <tr className="border-b border-ink/10 align-top">
      <td className="py-3 pr-4 font-plex-mono text-[12px] text-quill/70">{row.createdAt.slice(0, 10)}</td>
      <td className="py-3 pr-4 font-plex-mono text-[12px] text-quill/70">{row.type}</td>
      <td className="py-3 pr-4 font-plex-sans text-[13px] text-quill/80">{row.email ?? "-"}</td>
      <td className="py-3 pr-4">
        <select
          value={outcome}
          onChange={(event) => setOutcome(event.target.value as SubmissionOutcome)}
          disabled={disabled}
          className="rounded-[8px] border border-ink/20 bg-paper px-2 py-1 font-plex-sans text-[13px]"
        >
          {submissionOutcomes.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </td>
      <td className="py-3 pr-4">
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="0"
          disabled={disabled}
          className="w-24 rounded-[8px] border border-ink/20 bg-paper px-2 py-1 font-plex-mono text-[13px]"
        />
      </td>
      <td className="py-3">
        <button
          type="button"
          onClick={() => void onSave(row.id, outcome, value)}
          disabled={disabled}
          className="rounded-full bg-ink px-3 py-1 font-plex-sans text-[12px] text-paper disabled:opacity-70"
        >
          Save
        </button>
      </td>
    </tr>
  );
}
