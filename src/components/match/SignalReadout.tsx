"use client";

import Link from "next/link";
import { PressButton } from "@/components/PressButton";
import {
  getSignal,
  signalCategoryLabel,
  type SignalId,
} from "@/content/signals";
import { indexProjects } from "@/content/catalogue";
import type {
  LotComparison,
  MatchConfidence,
  SignalHit,
} from "@/lib/match/types";

const CATEGORY_COLORS: Record<string, string> = {
  Delivery: "bg-signal",
  Integration: "bg-partial",
  Intelligence: "bg-ink",
  Ownership: "bg-iron",
};

function seenAtHref(row: LotComparison): string | null {
  if (row.kind === "lot") return `/work/${row.id}`;
  return indexProjects.find((project) => project.id === row.id)?.url ?? null;
}

function coveragePill({
  confidence,
  leadSignals,
  leadName,
  hit,
}: {
  confidence: MatchConfidence;
  leadSignals: ReadonlySet<SignalId>;
  leadName: string;
  hit: SignalHit;
}) {
  if (confidence === "exploratory") {
    return {
      label: "Read by a person",
      tone: "signal" as const,
    };
  }
  return leadSignals.has(hit.signalId)
    ? { label: `${leadName} covers this`, tone: "filled" as const }
    : { label: "Open on the bench", tone: "open" as const };
}

function pillClass(tone: "signal" | "filled" | "open"): string {
  if (tone === "signal") return "chip bg-signal text-iron";
  if (tone === "filled") return "chip bg-partial text-rag";
  return "chip chip-line";
}

export function SignalReadout({
  hits,
  removed,
  confidence,
  leadSignals,
  leadName,
  comparisons,
  onToggleSignal,
}: Readonly<{
  hits: SignalHit[];
  removed: SignalId[];
  confidence: MatchConfidence;
  leadSignals: ReadonlySet<SignalId>;
  leadName: string;
  comparisons: LotComparison[];
  onToggleSignal?: (id: SignalId, remove: boolean) => void;
}>) {
  const groups = new Map<string, SignalHit[]>();
  for (const hit of hits) {
    const list = groups.get(hit.category) ?? [];
    list.push(hit);
    groups.set(hit.category, list);
  }

  return (
    <div className="flex flex-col gap-6">
      {[...groups.entries()].map(([category, list]) => (
        <div key={category}>
          <p className="kicker flex items-center gap-2">
            <span
              aria-hidden="true"
              className={`h-2 w-2 rounded-full ${CATEGORY_COLORS[category] ?? "bg-ink"}`}
            />
            {signalCategoryLabel[category as keyof typeof signalCategoryLabel]}
            <span className="ml-2 text-ink/40">
              {String(list.length).padStart(2, "0")}
            </span>
          </p>
          <ul className="stagger mt-3 flex flex-col gap-3">
            {list.map((hit, index) => {
              const signal = getSignal(hit.signalId);
              const seenAt = comparisons
                .filter((row) => row.engagement.includes(hit.signalId))
                .map((row) => ({
                  id: row.id,
                  label: `${row.client} · ${row.kind}`,
                  href: seenAtHref(row),
                }));
              const pill = coveragePill({
                confidence,
                leadSignals,
                leadName,
                hit,
              });
              return (
                <li
                  key={hit.signalId}
                  className="panel-sub px-4 py-3"
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-plex-mono text-[10px] uppercase tracking-[0.08em] text-ink/50">
                        {String(index + 1).padStart(2, "0")} · the phrase we
                        heard
                      </p>
                      <p className="mt-1 font-newsreader text-[18px] leading-[1.4] text-iron">
                        {hit.phrases.join(" · ")}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <span className={pillClass(pill.tone)}>{pill.label}</span>
                      {onToggleSignal ? (
                        <button
                          type="button"
                          onClick={() => onToggleSignal(hit.signalId, true)}
                          className="font-plex-sans text-[13px] text-ink underline decoration-iron/30 underline-offset-4 hover:text-blocked"
                        >
                          Not what I meant
                        </button>
                      ) : null}
                    </div>
                  </div>

                  {hit.quote ? (
                    <p className="mt-2 font-newsreader italic text-[14px] leading-[1.4] text-ink/80">
                      “{hit.quote}”
                    </p>
                  ) : null}

                  <details className="mt-3">
                    <summary className="cursor-pointer font-plex-sans text-[13px] text-iron/80 underline decoration-iron/25 underline-offset-4 hover:text-iron">
                      Open the signal file
                    </summary>
                    <div className="mt-3 flex flex-col gap-3">
                      <div>
                        <p className="font-plex-mono text-[10px] uppercase tracking-[0.08em] text-ink/50">
                          How we read it
                        </p>
                        <p className="mt-1 font-newsreader text-[15px] leading-[1.45] text-ink">
                          {signal.says}
                        </p>
                      </div>
                      <div>
                        <p className="font-plex-mono text-[10px] uppercase tracking-[0.08em] text-ink/50">
                          Matched on
                        </p>
                        <ul className="mt-2 flex flex-wrap gap-2">
                          {hit.phrases.map((phrase) => (
                            <li
                              key={phrase}
                              className="chip chip-soft"
                            >
                              “{phrase}”
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="font-plex-mono text-[10px] uppercase tracking-[0.08em] text-ink/50">
                          Where we&apos;ve seen it on file
                        </p>
                        {seenAt.length > 0 ? (
                          <ul className="mt-2 flex flex-wrap gap-2">
                            {seenAt.map((row) => (
                              <li key={row.id}>
                                {row.href ? (
                                  <Link
                                    href={row.href}
                                    className="chip chip-line underline decoration-iron/25 underline-offset-2 hover:text-iron"
                                  >
                                    {row.label}
                                  </Link>
                                ) : (
                                  <span className="chip chip-line">{row.label}</span>
                                )}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="mt-1 font-newsreader text-[14px] text-ink/70">
                            No engagement on file is tagged with this condition.
                          </p>
                        )}
                      </div>
                      <div>
                        <p className="font-plex-mono text-[10px] uppercase tracking-[0.08em] text-ink/50">
                          Coverage
                        </p>
                        <p className="mt-1 font-newsreader text-[14px] text-ink/80">
                          {confidence === "exploratory"
                            ? "With fewer than two conditions, a person reads this by hand — nothing on the bench is weight-bearing here."
                            : leadSignals.has(hit.signalId)
                              ? "Your match already ships past this condition; it is part of why they were put first."
                              : "Nothing on the bench covers this one. If it matters, say it at the intake and it lands on the handoff."}
                        </p>
                      </div>
                    </div>
                  </details>
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      {removed.length > 0 && onToggleSignal ? (
        <div>
          <p className="kicker text-ink/50">Set aside — add back</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {removed.map((id) => (
              <li key={id}>
                <PressButton
                  onPress={() => onToggleSignal(id, false)}
                  className="chip chip-line min-h-9 touch-manipulation font-plex-sans text-[13px] hover:text-blocked"
                >
                  {id.replaceAll("-", " ")}
                </PressButton>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}