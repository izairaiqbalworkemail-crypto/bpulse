"use client";

import { useState } from "react";

const submissionStatuses = [
  "received",
  "triaged",
  "contacted",
  "awaiting_client",
  "qualified",
  "closed",
] as const;

type SubmissionStatus = (typeof submissionStatuses)[number];

type Props = {
  id: string;
  current: string;
};

export function StatusPicker({ id, current }: Readonly<Props>) {
  const initial = submissionStatuses.includes(current as SubmissionStatus)
    ? (current as SubmissionStatus)
    : "received";
  const [status, setStatus] = useState<SubmissionStatus>(initial);
  const [pending, setPending] = useState(false);
  const [notice, setNotice] = useState("");

  async function save() {
    setPending(true);
    setNotice("");
    try {
      const response = await fetch("/api/admin/submissions/status", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? "Status update failed.");
      }
      setNotice("Saved");
      window.location.reload();
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Status update failed.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="w-[15rem]">
      <div className="flex items-center gap-2">
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value as SubmissionStatus)}
          disabled={pending}
          className="min-w-0 flex-1 border border-iron/25 bg-rag px-2 py-1 font-plex-mono text-[12px]"
        >
          {submissionStatuses.map((item) => (
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
      {notice ? <p className="mt-1 font-plex-sans text-[12px] text-ink/70">{notice}</p> : null}
    </div>
  );
}
