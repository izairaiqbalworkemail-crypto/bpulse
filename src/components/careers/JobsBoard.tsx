"use client";

import { useMemo, useState } from "react";
import { SubmissionSuccess } from "@/components/intake/SubmissionSuccess";

type Role = {
  id: string;
  title: string;
  pod: string;
  status: string;
  location: string;
  band: string;
  summary: string;
};

type Props = {
  roles: Role[];
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function JobsBoard({ roles }: Readonly<Props>) {
  const openRoles = useMemo(() => roles.filter((role) => role.status === "open"), [roles]);
  const [roleId, setRoleId] = useState(openRoles[0]?.id ?? "");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [link, setLink] = useState("");
  const [detail, setDetail] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<{ id: string; statusToken: string; duplicate: boolean } | null>(null);

  const selectedRole = roles.find((role) => role.id === roleId) ?? null;

  async function submit() {
    setError(null);
    if (!roleId || !name.trim() || !email.trim() || !detail.trim()) {
      setError("Complete the role, name, email, and detail fields.");
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setError("That email looks off.");
      return;
    }

    setSaving(true);
    try {
      const response = await fetch("/api/careers/apply", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ roleId, name, email, link, detail }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        id?: string;
        statusToken?: string;
        duplicate?: boolean;
        error?: string;
      };
      if (!response.ok || !data.ok || !data.id || !data.statusToken) {
        throw new Error(data.error ?? "Application failed.");
      }
      setDone({
        id: data.id,
        statusToken: data.statusToken,
        duplicate: Boolean(data.duplicate),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Application failed.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
      <section>
        <ul className="space-y-3">
          {roles.map((role) => {
            const active = role.id === roleId;
            const isOpen = role.status === "open";
            return (
              <li key={role.id} className="card p-6">
                <p className="font-newsreader text-[21px] text-iron">{role.title}</p>
                <p className="mt-1 font-newsreader text-[16px] text-ink">
                  {role.band} · {role.location} · {role.summary}
                </p>
                <div className="mt-3 flex items-center gap-4">
                  <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">{role.status}</p>
                  {isOpen ? (
                    <button
                      type="button"
                      onClick={() => setRoleId(role.id)}
                      className="font-plex-sans text-[13px] underline decoration-iron/25 underline-offset-4 hover:decoration-iron"
                    >
                      {active ? "Selected" : "Apply to this role"}
                    </button>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section id="intake" className="card p-6">
        <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">Apply to a role</p>
        {done ? (
          <div className="mt-4">
            <SubmissionSuccess
              heading={done.duplicate ? "Application already on file." : "Application filed."}
              body={
                done.duplicate
                  ? "We already have your application for this role. Use your status link to follow progress."
                  : "You now have a private status link. Gate 0 instructions follow by email within one business day."
              }
              referenceId={done.id}
            />
            <p className="mt-4 font-newsreader text-[16px] text-ink">
              Status link: <a className="underline" href={`/careers/status/${done.statusToken}`}>{`/careers/status/${done.statusToken}`}</a>
            </p>
          </div>
        ) : openRoles.length === 0 ? (
          <p className="mt-4 font-newsreader text-[17px] text-ink">No open roles right now.</p>
        ) : (
          <div className="mt-4 space-y-3">
            <label className="block">
              <span className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/65">Role</span>
              <select
                value={roleId}
                onChange={(event) => setRoleId(event.target.value)}
                className="mt-1 w-full border border-iron/25 bg-rag px-3 py-2 font-newsreader text-[16px]"
                disabled={saving}
              >
                {openRoles.map((role) => (
                  <option key={role.id} value={role.id}>{role.title}</option>
                ))}
              </select>
            </label>
            {selectedRole ? (
              <p className="font-newsreader text-[15px] text-ink/80">
                {selectedRole.band} · {selectedRole.location}
              </p>
            ) : null}
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
              className="w-full border border-iron/25 bg-rag px-3 py-2 font-newsreader text-[16px]"
              disabled={saving}
            />
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
              className="w-full border border-iron/25 bg-rag px-3 py-2 font-newsreader text-[16px]"
              disabled={saving}
            />
            <input
              value={link}
              onChange={(event) => setLink(event.target.value)}
              placeholder="Portfolio / GitHub / Resume link"
              className="w-full border border-iron/25 bg-rag px-3 py-2 font-newsreader text-[16px]"
              disabled={saving}
            />
            <textarea
              value={detail}
              onChange={(event) => setDetail(event.target.value)}
              placeholder="What you would bring to this role"
              rows={4}
              className="w-full border border-iron/25 bg-rag px-3 py-2 font-newsreader text-[16px]"
              disabled={saving}
            />
            {error ? <p className="font-newsreader text-[15px] text-signal-ink">{error}</p> : null}
            <button
              type="button"
              onClick={() => void submit()}
              disabled={saving}
              className="border border-iron/25 px-4 py-2 font-plex-mono text-[11px] uppercase tracking-[0.08em] text-iron"
            >
              {saving ? "Submitting..." : "Submit application"}
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
