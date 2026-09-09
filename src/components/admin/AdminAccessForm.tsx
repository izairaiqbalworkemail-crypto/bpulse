"use client";

import { type FormEvent, useState } from "react";

export function AdminAccessForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function requestLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");

    try {
      const response = await fetch("/api/studio/auth/request", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, redirectTo: "/admin" }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        error?: string;
      };
      if (!response.ok || data.ok === false) {
        setMessage(data.error ?? "Could not request sign in link.");
      } else {
        setMessage("If this address can sign in, the link is sent.");
      }
    } catch {
      setMessage("Could not request sign in link.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-quill/70">
        Sign in
      </p>
      <h1 className="mt-3 font-newsreader text-[38px] leading-[1.08] text-ink">
        Studio
      </h1>
      <p className="mt-4 max-w-[52ch] font-plex-sans text-[16px] leading-[1.6] text-quill">
        Enter your work email. If it is on the list, a one-time link is sent.
      </p>

      <form className="mt-8 max-w-[28rem]" onSubmit={requestLink}>
        <label
          className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-quill/70"
          htmlFor="email"
        >
          Work email
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-2 w-full rounded-[10px] border border-ink/20 bg-paper px-3 py-2 font-plex-sans text-[15px] text-ink"
        />
        <button
          type="submit"
          disabled={busy}
          className="mt-4 rounded-full bg-ink px-5 py-2 font-plex-sans text-[14px] text-paper disabled:opacity-70"
        >
          {busy ? "Sending" : "Send sign in link"}
        </button>
      </form>

      {message ? (
        <p className="mt-4 font-plex-sans text-[14px] text-quill">{message}</p>
      ) : null}
    </>
  );
}
