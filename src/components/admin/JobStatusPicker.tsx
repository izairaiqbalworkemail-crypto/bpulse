"use client";

import { useState } from "react";

const statuses = ["open", "pipeline", "closed"] as const;

type Props = {
  id: string;
  title: string;
  pod: string;
  location: string;
  band: string;
  summary: string;
  status: string;
};

export function JobStatusPicker({
  id,
  title,
  pod,
  location,
  band,
  summary,
  status,
}: Readonly<Props>) {
  const [next, setNext] = useState<(typeof statuses)[number]>(
    statuses.includes(status as (typeof statuses)[number])
      ? (status as (typeof statuses)[number])
      : "pipeline",
  );
  const [pending, setPending] = useState(false);
  const [note, setNote] = useState("");

  async function save() {
    setPending(true);
    setNote("");
    try {
      const response = await fetch("/api/admin/careers/jobs", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          id,
          title,
          pod,
          status: next,
          location,
          band,
          summary,
        }),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? "Status update failed.");
      }
      setNote("Saved");
      window.location.reload();
    } catch (error) {
      setNote(error instanceof Error ? error.message : "Status update failed.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <select
        value={next}
        onChange={(event) => setNext(event.target.value as (typeof statuses)[number])}
        disabled={pending}
        className="border border-iron/25 bg-rag px-2 py-1 font-plex-mono text-[12px]"
      >
        {statuses.map((item) => (
          <option key={item} value={item}>{item}</option>
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
      {note ? <span className="font-plex-sans text-[12px] text-ink/65">{note}</span> : null}
    </div>
  );
}
