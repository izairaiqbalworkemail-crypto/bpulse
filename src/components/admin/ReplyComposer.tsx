"use client";

import { useState } from "react";

type Props = {
  to: string;
  subject: string;
  submissionId?: string;
};

export function ReplyComposer({ to, subject, submissionId }: Readonly<Props>) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState(
    "Thanks for the note. We reviewed what you sent and can reply with next steps if you share one blocker in detail.",
  );
  const [status, setStatus] = useState("");

  async function send() {
    setPending(true);
    setStatus("");
    try {
      const response = await fetch("/api/admin/reply", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          to,
          subject,
          message,
          submissionId: submissionId ?? null,
        }),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? "Reply failed.");
      }
      setStatus("Reply sent.");
      window.location.reload();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Reply failed.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="border border-ink/25 px-2.5 py-1 font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink hover:border-ink"
      >
        {open ? "Close reply" : "Reply"}
      </button>
      {open ? (
        <div className="mt-2 w-[24rem] max-w-[68vw] border border-ink/20 bg-paper p-3">
          <p className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-quill/65">To {to}</p>
          <p className="mt-1 font-plex-mono text-[11px] uppercase tracking-[0.08em] text-quill/65">{subject}</p>
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            rows={5}
            className="mt-2 w-full border border-ink/25 bg-paper px-2 py-1 font-newsreader text-[15px] text-quill"
          />
          <button
            type="button"
            onClick={() => void send()}
            disabled={pending}
            className="mt-2 bg-gold px-3 py-1.5 font-plex-sans text-[13px] text-ink disabled:opacity-70"
          >
            {pending ? "Sending" : "Send reply"}
          </button>
          {status ? <p className="mt-1 font-plex-sans text-[12px] text-quill/70">{status}</p> : null}
        </div>
      ) : null}
    </div>
  );
}
