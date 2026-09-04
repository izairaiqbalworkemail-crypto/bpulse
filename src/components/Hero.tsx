"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { Mark } from "@/components/primitives/Mark";
import { offer } from "@/content/offer";
import { specialists } from "@/content/specialists";

type ArrivalState = "incomplete" | "stalled" | "integration-blocked" | "unstable";

type Symptom = {
  key: string;
  label: string;
  weight: 1 | 2 | 3;
  finding: string;
  takes: string;
};

const nav = [
  { label: "Work", href: "/work" },
  { label: "Crew", href: "/team" },
  { label: "Check", href: "/check" },
  { label: "Notices", href: "/notices" },
] as const;

const symptoms: Symptom[] = [
  {
    key: "staging-only",
    label: "Staging works. Prod has never been tried.",
    weight: 1,
    finding: "Staging was a ghost, prod was a hope.",
    takes: "Run a production-first release pass with rollback and ownership on call.",
  },
  {
    key: "single-owner",
    label: "One person understands it.",
    weight: 3,
    finding: "Bus factor is one, so every release is memory-dependent.",
    takes: "Write and rehearse a complete handover runbook before the next deploy.",
  },
  {
    key: "ghosted-dev",
    label: "The developer went dark.",
    weight: 3,
    finding: "Delivery ownership dropped while unfinished paths stayed in flight.",
    takes: "Reassign technical ownership and triage all open paths by business risk.",
  },
  {
    key: "almost-done",
    label: "90% done for three months.",
    weight: 2,
    finding: "The last twenty percent exists, but nobody owns the finish sequence.",
    takes: "Convert the final backlog into a dated release plan with hard gates.",
  },
  {
    key: "real-data-break",
    label: "Works in a notebook, dies on real data.",
    weight: 1,
    finding: "The model passes demo inputs, then breaks under production conditions.",
    takes: "Add production-like evals and failure-path tests before adding more scope.",
  },
  {
    key: "no-release-owner",
    label: "Nobody owns the release.",
    weight: 2,
    finding: "Go/no-go accountability is diffuse, so no one can close the final mile.",
    takes: "Nominate one release owner with final sign-off and rollback authority.",
  },
];

function classifyArrivalState(total: number): ArrivalState {
  if (total <= 3) return "incomplete";
  if (total <= 6) return "stalled";
  if (total <= 10) return "integration-blocked";
  return "unstable";
}

function arrivalLabel(state: ArrivalState): string {
  switch (state) {
    case "incomplete":
      return "Incomplete on arrival";
    case "stalled":
      return "Stalled on arrival";
    case "integration-blocked":
      return "Integration-blocked on arrival";
    case "unstable":
      return "Unstable on arrival";
  }
}

function arrivalDot(state: ArrivalState): "partial" | "blocked" {
  return state === "integration-blocked" || state === "unstable"
    ? "blocked"
    : "partial";
}

export function Hero() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [firstTapDone, setFirstTapDone] = useState(false);

  const selectedSymptoms = useMemo(
    () => symptoms.filter((item) => selected.has(item.key)),
    [selected]
  );

  const weightedScore = useMemo(() => {
    const raw = selectedSymptoms.reduce((sum, item) => sum + item.weight, 0);
    return Math.max(0, Math.min(raw, 12));
  }, [selectedSymptoms]);

  const arrivalState =
    selectedSymptoms.length > 0 ? classifyArrivalState(weightedScore) : null;

  const findings = selectedSymptoms.slice(0, 3).map((item) => item.finding);
  const takes = selectedSymptoms.slice(0, 3).map((item) => item.takes);

  const intakeQuery =
    selectedSymptoms.length > 0
      ? {
          state: arrivalState ?? "",
          symptoms: selectedSymptoms.map((item) => item.label).join(" | "),
          source: "hero-self-check",
        }
      : { source: "hero-self-check" };

  const toggleSymptom = (key: string) => {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
        if (!firstTapDone) setFirstTapDone(true);
      }
      return next;
    });
  };

  const reportLive = arrivalState
    ? `${selectedSymptoms.length} symptoms selected. Arrival state: ${arrivalLabel(arrivalState)}.`
    : "No symptoms selected. Tap what matches your build.";

  return (
    <section className="hero-stage bg-iron" aria-labelledby="hero-title">
      <div className="hero-blackbox hero-panel-settle">
        <div className="hero-shell">
          <div className="hero-top-pill">
            <Link href="/" className="inline-flex items-center gap-3">
              <Mark size={24} />
              <span className="font-plex-sans text-lg font-medium tracking-tight text-rag">
                bpulse
              </span>
            </Link>

            <nav aria-label="Primary" className="hero-top-nav">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-plex-sans text-sm font-medium text-rag/75 transition-colors duration-150 hover:text-rag"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <Link
              href="/contact"
              className="rounded-[12px] bg-signal px-5 py-2.5 font-plex-sans text-sm font-medium text-signal-ink transition-all duration-150 hover:brightness-95"
            >
              Book a call
            </Link>
          </div>

          <div className="hero-blackbox-content grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-6">
              <h1
                id="hero-title"
                className="max-w-[13ch] -ml-[0.03em] font-newsreader text-[clamp(2.5rem,6vw+1rem,5rem)] leading-[1.05] tracking-[-0.03em] text-rag"
              >
                Everyone can get to 80%.
              </h1>

              <p className="mt-6 max-w-[38ch] font-newsreader text-reading leading-reading text-rag-mute">
                Where&apos;s yours stuck?
              </p>

              <div
                className="mt-8 flex flex-col gap-5"
                role="group"
                aria-label="Product symptoms"
              >
                {symptoms.map((item) => {
                  const active = selected.has(item.key);
                  return (
                    <button
                      key={item.key}
                      type="button"
                      aria-pressed={active}
                      onClick={() => toggleSymptom(item.key)}
                      className={`group flex w-full items-start gap-4 rounded-[16px] border px-5 py-4 text-left font-newsreader text-[1.125rem] leading-[1.5] transition-all duration-200 ${
                        active
                          ? "border-signal bg-signal text-signal-ink hero-symptom-active"
                          : "border-rag/25 bg-iron-card text-rag hover:border-rag/50"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`mt-[0.35em] h-5 w-5 shrink-0 rounded-[4px] border transition-all duration-200 ${
                          active
                            ? "border-signal-ink bg-signal-ink"
                            : "border-rag/55 bg-transparent"
                        }`}
                      />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-rag/15">
                  <div
                    className="h-full bg-signal transition-[width] duration-300 ease-out"
                    style={{ width: `${(selectedSymptoms.length / symptoms.length) * 100}%` }}
                  />
                </div>
                <p className="mt-2 font-plex-mono text-caption text-rag/75">
                  {selectedSymptoms.length} of {symptoms.length} signals marked
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href={{ pathname: "/check", query: intakeQuery }}
                  className="inline-flex items-center gap-2 rounded-[12px] bg-signal px-8 py-4 font-plex-sans text-sm font-medium text-signal-ink transition-all duration-150 hover:brightness-95"
                >
                  Book a call
                  <span aria-hidden="true">→</span>
                </Link>
                <p className="font-newsreader text-reading leading-reading text-rag-mute">
                  Rough self-check. The real read takes five days.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <article
                className={`paper-artifact hero-report-card p-8 ${firstTapDone ? "hero-report-card--straight" : ""}`}
                aria-live="polite"
                aria-atomic="true"
              >
                <p className="font-plex-mono text-data tracking-[0.08em] text-ink/70 uppercase">
                  LOT - your build
                </p>
                <div className="mt-4 h-px w-full bg-iron/15" />
                <p className="mt-4 font-plex-mono text-data tracking-[0.08em] text-ink/70 uppercase">
                  Condition on arrival
                </p>

                {selectedSymptoms.length === 0 ? (
                  <div className="mt-6 rounded-[16px] border border-dashed border-iron/20 bg-rag px-5 py-6">
                    <p className="font-newsreader text-reading leading-reading text-ink">
                      Tap what matches your current build. The condition report assembles here.
                    </p>
                  </div>
                ) : (
                  <div className="mt-6 space-y-6">
                    <div>
                      <p className="font-plex-mono text-caption tracking-[0.08em] text-ink/70 uppercase">
                        Findings
                      </p>
                      <ul className="mt-2 space-y-2">
                        {findings.map((line, index) => (
                          <li
                            key={line}
                            className="hero-report-row font-newsreader text-reading leading-reading text-ink"
                            style={{ animationDelay: `${index * 60}ms` }}
                          >
                            {line}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="font-plex-mono text-caption tracking-[0.08em] text-ink/70 uppercase">
                        What it takes
                      </p>
                      <ul className="mt-2 space-y-2">
                        {takes.map((line, index) => (
                          <li
                            key={line}
                            className="hero-report-row font-newsreader text-reading leading-reading text-ink"
                            style={{ animationDelay: `${index * 60}ms` }}
                          >
                            {line}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {arrivalState ? (
                      <div className="flex items-center gap-3 border-t border-iron/15 pt-4">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{
                            backgroundColor:
                              arrivalDot(arrivalState) === "blocked"
                                ? "var(--color-blocked)"
                                : "var(--color-partial)",
                          }}
                          aria-hidden="true"
                        />
                        <p className="font-plex-sans text-sm font-medium text-iron">
                          {arrivalLabel(arrivalState)}
                        </p>
                      </div>
                    ) : null}
                  </div>
                )}

                <p className="sr-only">{reportLive}</p>
              </article>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-shell mt-4 flex flex-wrap items-center justify-between gap-3 font-plex-mono text-caption text-rag/70">
        <p>{specialists.length} specialists on crew</p>
        <p>Check: ${offer.check.price.toLocaleString()} · 5 business days · reply in 1 day</p>
      </div>
    </section>
  );
}
