"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";

import { getSpecialist } from "@/content/specialists";

/**
 * Pulse check — ported intact from bpulse (pulse-check-intake.tsx), with
 * one logic fix: the old submit flattened situation/timeline/budget into a
 * single `build` string. Now the three fields are posted structured so the
 * intake ledger stays truthy.
 *
 * Stripped on port: the four emoji/icons, the green presence dot and the
 * fabricated "2 slots left" scarcity badge. Pacing delay kept short (420ms)
 * as a step transition — no typing simulation.
 */
const SITUATIONS = [
  { id: "stalled", label: "Stalled build", hint: "last dev ghosted" },
  { id: "almost", label: "Almost done", hint: "'basically done' forever" },
  { id: "fragile", label: "Live, but fragile", hint: "shipping feels risky" },
  { id: "idea", label: "Just an idea", hint: "nothing built yet" },
] as const;

const TIMELINES = ["ASAP", "This quarter", "Next quarter", "Just scouting"] as const;
const BUDGETS = ["< $10k", "$10k - $30k", "$30k - $75k", "$75k+"] as const;

const STEPS = ["Your situation", "Your build", "Your verdict"];

export type PulseCheckSituation = (typeof SITUATIONS)[number]["id"];

export type PulseCheckPrefill = {
  situation?: PulseCheckSituation;
  stuckNote?: string;
};

export function PulseCheckIntake({ prefill }: { prefill?: PulseCheckPrefill }) {
  const lead = getSpecialist("aneeb");
  const [step, setStep] = useState(0);
  const [situation, setSituation] = useState<PulseCheckSituation | null>(
    prefill?.situation ?? null
  );
  const [timeline, setTimeline] = useState<string | null>(null);
  const [budget, setBudget] = useState<string | null>(null);
  const [repo, setRepo] = useState("");
  const [stuck, setStuck] = useState(prefill?.stuckNote ?? "");
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [requestId] = useState(() => crypto.randomUUID());
  const [save, setSave] = useState<"idle" | "saving" | "done">("idle");

  async function book() {
    if (save === "saving") return;
    setSave("saving");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "pulse-check",
          website: honeypot,
          requestId,
          email,
          codeLocation: repo,
          situation,
          timeline,
          budget,
          build: stuck,
        }),
      });
      const data = (await res.json()) as { ok?: boolean };
      if (!res.ok || !data.ok) throw new Error("not ok");
      setSave("done");
    } catch {
      setSave("idle");
    }
  }

  const ready = situation !== null && stuck.trim().length >= 6;

  function advance(next: number) {
    setStep(next);
  }

  if (save === "done") {
    return (
      <div className="overflow-hidden rounded-surface border border-signal/40 bg-[linear-gradient(160deg,rgba(242,194,48,0.10),rgba(21,25,36,0)_55%)] px-6 py-14 text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-signal/40 bg-signal/10">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 text-signal">
            <path d="M4 12.5 9 17.5 20 6" />
          </svg>
        </span>
        <p className="mt-5 font-newsreader text-2xl tracking-tight text-ink">Audit requested. Smart move.</p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink/70">
          A senior reserves your slot and follows up within a day with how we&apos;d start the
          five-day review. The $1,800 comes straight off the build if we take it on.
        </p>
        <div className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-iron/10 bg-rag-card px-4 py-2.5 text-xs text-ink/60">
          <span className="h-2 w-2 rounded-full bg-ok" aria-hidden />
          no charge today · invoice only confirms the slot
        </div>
        <Link href="/" className="mt-6 inline-flex font-plex-mono text-xs uppercase tracking-[0.14em] text-signal hover:text-ink">
          back to home
        </Link>
      </div>
    );
  }

  return (
    <div
      className="overflow-hidden rounded-surface border border-signal/30 bg-[linear-gradient(180deg,rgba(242,194,48,0.07)_0%,rgba(21,25,36,0)_120px)] shadow-[var(--shadow-card)]"
      role="region"
      aria-label="Book your pulse check"
    >
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />
      {/* header */}
      <div className="flex items-center gap-3 border-b border-iron/10 px-5 py-4">
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-1 ring-iron/15">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={lead.photo} alt={lead.name} width={40} height={40} className="h-full w-full object-cover grayscale" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold tracking-tight text-ink">
            {lead.name} reads every audit
          </p>
          <p className="truncate text-xs text-ink/55">
            step {step + 1} of {STEPS.length} · {STEPS[step]}
          </p>
        </div>
      </div>

      {/* progress */}
      <div className="h-[3px] shrink-0 bg-iron/10">
        <div
          className="h-full bg-signal transition-[width] duration-500 ease-out"
          style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
        />
      </div>

      <div className="px-5 py-5">
        <AnimatePresence mode="wait">
          {step === 0 ? (
            <motion.div key="situation" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.24 }}>
              <p className="text-sm font-medium text-ink/85">Which best describes it?</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {SITUATIONS.map((s) => {
                  const on = situation === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        setSituation(s.id);
                        advance(1);
                      }}
                      aria-pressed={on}
                      className={`relative rounded-xl border px-3.5 py-3 text-left transition-all duration-150 ${on ? "border-signal bg-signal/10 ring-1 ring-signal/40" : "border-iron/15 hover:border-signal/50"}`}
                    >
                      {on ? (
                        <span className="absolute right-2.5 top-2.5 grid h-4 w-4 place-items-center rounded-full bg-signal text-signal-ink" aria-hidden>
                          <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none"><path d="M2.5 6.5 5 9l4.5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </span>
                      ) : null}
                      <span className="block text-sm font-semibold text-ink">{s.label}</span>
                      <span className="mt-0.5 block text-xs text-ink/50">{s.hint}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ) : step === 1 ? (
            <motion.div key="build" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.24 }}>
              <p className="text-sm font-medium text-ink/85">What&apos;s breaking?</p>
              <div className="mt-3 rounded-xl border border-iron/15 bg-rag transition-colors focus-within:border-signal/50">
                <textarea
                  value={stuck}
                  onChange={(e) => setStuck(e.target.value)}
                  rows={3}
                  placeholder="The demo that fails, the thing 'basically done', whatever's eating your time."
                  aria-label="What's stuck"
                  className="w-full resize-none bg-transparent px-4 py-3.5 text-[0.95rem] leading-relaxed text-ink outline-none placeholder:text-ink/30"
                />
              </div>

              <div className="mt-3 rounded-xl border border-iron/15 bg-rag transition-colors focus-within:border-signal/50">
                <input value={repo} onChange={(e) => setRepo(e.target.value)} placeholder="Repo link · github.com/you/the-thing" aria-label="Repo link" className="w-full bg-transparent px-4 py-3 text-[0.95rem] text-ink outline-none placeholder:text-ink/30" />
              </div>

              <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-medium text-ink/60">Timeline</p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {TIMELINES.map((t) => (
                      <button key={t} type="button" onClick={() => setTimeline(t)} aria-pressed={timeline === t}
                        className={`rounded-full border px-2.5 py-1 text-xs font-medium transition-colors ${timeline === t ? "border-signal bg-signal/10 text-signal" : "border-iron/15 text-ink/70 hover:border-signal/50"}`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-ink/60">Budget</p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {BUDGETS.map((b) => (
                      <button key={b} type="button" onClick={() => setBudget(b)} aria-pressed={budget === b}
                        className={`rounded-full border px-2.5 py-1 text-xs font-medium transition-colors ${budget === b ? "border-signal bg-signal/10 text-signal" : "border-iron/15 text-ink/70 hover:border-signal/50"}`}>
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button type="button" disabled={stuck.trim().length < 6} onClick={() => advance(2)}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-signal px-5 py-3 text-sm font-semibold text-signal-ink transition-opacity hover:opacity-90 disabled:opacity-35">
                Next
                <svg viewBox="0 0 24 24" className="h-[0.95em] w-[0.95em]" fill="none" aria-hidden>
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </motion.div>
          ) : (
            <motion.div key="verdict" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.24 }}>
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-signal/30 bg-signal/[0.06] px-4 py-3">
                <div>
                  <p className="font-newsreader text-lg font-semibold tracking-tight text-ink">$1,800</p>
                  <p className="text-xs text-ink/55">five-day audit · credited to your build</p>
                </div>
                <p className="flex items-center gap-1.5 text-right text-[0.68rem] leading-snug text-ink/60">
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0 text-ok" fill="none" aria-hidden>
                    <path d="M8 1.8 13 3.5v4.2c0 3.2-2 5.5-5 6.5-3-1-5-3.3-5-6.5V3.5L8 1.8Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                  </svg>
                  you&apos;ll know exactly what you own
                </p>
              </div>

              <p className="mt-4 text-sm font-medium text-ink/85">Where does the verdict land?</p>
              <div className="mt-3 rounded-xl border border-iron/15 bg-rag focus-within:border-signal/50">
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@company.com" aria-label="Email" className="w-full bg-transparent px-4 py-3 text-[0.95rem] text-ink outline-none placeholder:text-ink/30" />
              </div>

              <button type="button" onClick={book} disabled={!ready}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-signal px-5 py-3.5 text-sm font-semibold text-signal-ink transition-all hover:opacity-90 disabled:opacity-35">
                {save === "saving" ? "Reserving your slot…" : "Reserve my audit · $1,800"}
                <svg viewBox="0 0 24 24" className="h-[0.95em] w-[0.95em]" fill="none" aria-hidden>
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-ink/45">
                <svg viewBox="0 0 16 16" className="h-3 w-3 text-ok" fill="none" aria-hidden>
                  <path d="M2.5 8.5 6 12 13.5 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                credited if we build · real senior, not a dashboard
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}