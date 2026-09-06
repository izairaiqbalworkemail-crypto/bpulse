"use client";

import { useState } from "react";

const statuses = ["open", "pipeline", "closed"] as const;

export function JobComposer() {
  const [title, setTitle] = useState("");
  const [pod, setPod] = useState("Delivery");
  const [status, setStatus] = useState<(typeof statuses)[number]>("open");
  const [location, setLocation] = useState("Remote");
  const [band, setBand] = useState("");
  const [summary, setSummary] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function submit() {
    setSaving(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/careers/jobs", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ title, pod, status, location, band, summary }),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? "Job save failed.");
      }
      setMessage("Job posted.");
      setTitle("");
      setBand("");
      setSummary("");
      window.location.reload();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Job save failed.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="border-y border-iron/20 py-4">
      <p className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/65">Post job</p>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Role title"
          className="border border-iron/25 bg-rag px-3 py-2 font-newsreader text-[16px]"
          disabled={saving}
        />
        <input
          value={pod}
          onChange={(event) => setPod(event.target.value)}
          placeholder="Pod"
          className="border border-iron/25 bg-rag px-3 py-2 font-newsreader text-[16px]"
          disabled={saving}
        />
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value as (typeof statuses)[number])}
          className="border border-iron/25 bg-rag px-3 py-2 font-plex-mono text-[12px]"
          disabled={saving}
        >
          {statuses.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Location"
          className="border border-iron/25 bg-rag px-3 py-2 font-newsreader text-[16px]"
          disabled={saving}
        />
        <input
          value={band}
          onChange={(event) => setBand(event.target.value)}
          placeholder="$2,600-$3,600 / month"
          className="border border-iron/25 bg-rag px-3 py-2 font-newsreader text-[16px] md:col-span-2"
          disabled={saving}
        />
        <textarea
          value={summary}
          onChange={(event) => setSummary(event.target.value)}
          placeholder="What this role owns"
          rows={3}
          className="border border-iron/25 bg-rag px-3 py-2 font-newsreader text-[16px] md:col-span-2"
          disabled={saving}
        />
      </div>
      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          onClick={() => void submit()}
          disabled={saving}
          className="border border-iron/25 px-4 py-2 font-plex-mono text-[11px] uppercase tracking-[0.08em] text-iron"
        >
          {saving ? "Posting..." : "Post job"}
        </button>
        {message ? <p className="font-plex-sans text-[12px] text-ink/70">{message}</p> : null}
      </div>
    </div>
  );
}
