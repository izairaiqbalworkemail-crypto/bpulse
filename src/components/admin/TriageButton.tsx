"use client";

import { useState } from "react";

type Props = {
  id: string;
};

export function TriageButton({ id }: Readonly<Props>) {
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");

  async function markTriaged() {
    setPending(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/submissions/triage", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? "Could not mark triaged.");
      }
      setMessage("Triaged");
      window.location.reload();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not mark triaged.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => void markTriaged()}
        disabled={pending}
        className="border border-iron/25 px-2.5 py-1 font-plex-mono text-[11px] uppercase tracking-[0.08em] text-iron hover:border-iron disabled:opacity-60"
      >
        {pending ? "Saving" : "Mark triaged"}
      </button>
      {message ? <p className="mt-1 font-plex-sans text-[12px] text-ink/70">{message}</p> : null}
    </div>
  );
}
