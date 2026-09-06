"use client";

import { type FormEvent, useState } from "react";

export function AdminAccessForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [devLink, setDevLink] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function requestLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    setDevLink(null);

    try {
      const response = await fetch("/api/studio/auth/request", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, redirectTo: "/admin" }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        error?: string;
        devLink?: string;
      };
      if (!response.ok || data.ok === false) {
        setMessage(data.error ?? "Could not request sign in link.");
      } else {
        setMessage("If this address is on the allowlist, the sign in link is sent.");
        if (data.devLink) {
          setDevLink(data.devLink);
        }
      }
    } catch {
      setMessage("Could not request sign in link.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">Internal access</p>
      <h1 className="mt-3 font-newsreader text-[38px] leading-[1.08] text-iron">Studio sign in</h1>
      <p className="mt-4 max-w-[52ch] font-plex-sans text-[16px] leading-[1.6] text-ink">
        Enter an allowlisted email address to receive a one-time sign in link.
      </p>
      <p className="mt-2 max-w-[52ch] font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/65">
        Local setup: add your email to STUDIO_ADMIN_ALLOWLIST in .env.local.
      </p>

      <form className="mt-8 max-w-[28rem]" onSubmit={requestLink}>
        <label className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/70" htmlFor="email">
          Work email
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-2 w-full rounded-[10px] border border-iron/20 bg-rag px-3 py-2 font-plex-sans text-[15px] text-iron"
        />
        <button
          type="submit"
          disabled={busy}
          className="mt-4 rounded-full bg-iron px-5 py-2 font-plex-sans text-[14px] text-rag disabled:opacity-70"
        >
          {busy ? "Sending" : "Send sign in link"}
        </button>
      </form>

      {message ? <p className="mt-4 font-plex-sans text-[14px] text-ink">{message}</p> : null}
      {devLink ? (
        <p className="mt-2 font-plex-mono text-[12px] text-ink/75">
          Local dev link: <a href={devLink} className="underline underline-offset-4">{devLink}</a>
        </p>
      ) : null}
    </>
  );
}
