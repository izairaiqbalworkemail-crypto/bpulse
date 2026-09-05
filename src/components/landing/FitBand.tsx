"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  buildHeroTracePath,
  dominantPain,
  type HeroPainKey,
} from "@/lib/trace";
import { fitSymptoms } from "@/content/landing";
import type { PulseCheckSituation } from "@/components/intake/PulseCheckIntake";

const traceWidth = 640;
const traceHeight = 150;

export type FitSelection = {
  situation: PulseCheckSituation;
  note: string;
};

export function FitBand({
  onStart,
}: Readonly<{ onStart: (fit: FitSelection) => void }>) {
  const reduce = useReducedMotion();
  const [selected, setSelected] = useState<HeroPainKey[]>([]);

  const leading = useMemo(
    () => fitSymptoms.find((entry) => entry.key === dominantPain(selected)),
    [selected],
  );

  function toggle(key: HeroPainKey) {
    setSelected((current) =>
      current.includes(key)
        ? current.filter((item) => item !== key)
        : [...current, key],
    );
  }

  return (
    <div
      className="card relative p-6 md:p-8"
    >
      <div className="grid gap-6 md:grid-cols-[5fr_7fr] md:gap-0">
        <div>
          <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">
            What&rsquo;s stuck?
          </p>
          <ul role="list" className="mt-4 grid gap-2">
            {fitSymptoms.map((entry) => {
              const on = selected.includes(entry.key);
              return (
                <li key={entry.key}>
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggle(entry.key)}
                    className={`flex w-full items-center justify-between gap-3 rounded-full border px-4 py-2 font-plex-sans text-[15px] transition-colors duration-150 ${
                      on
                        ? "border-signal/40 bg-signal/10 text-signal"
                        : "border-iron/10 text-iron hover:border-iron/25"
                    }`}
                  >
                    {entry.label}
                    <span
                      aria-hidden="true"
                      className="font-plex-mono text-[11px] text-ink/50"
                    >
                      {entry.verdict}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex min-h-[18rem] flex-col border-iron/10 md:border-l md:pl-8">
          <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">
            The trace
          </p>
          <svg
            viewBox={`0 0 ${traceWidth} ${traceHeight}`}
            className="mt-3 w-full text-iron"
            aria-hidden="true"
          >
            <line
              x1="0"
              y1={traceHeight / 2}
              x2={traceWidth}
              y2={traceHeight / 2}
              className="stroke-current opacity-10"
              strokeWidth="1"
            />
            <motion.path
              d={buildHeroTracePath(selected, traceWidth, traceHeight)}
              fill="none"
              className="stroke-signal"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              transition={
                reduce
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 200, damping: 26 }
              }
            />
          </svg>

          <div className="mt-auto pt-5">
            <p className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/70">
              Arrival state
            </p>
            <p className="mt-1 font-newsreader text-[28px] leading-[1.05] tracking-[-0.03em] text-iron">
              {leading?.verdict ?? "Nothing on record"}
            </p>
            <p className="mt-2 max-w-[32ch] font-newsreader text-[15px] leading-[1.45] text-ink">
              {leading
                ? "Five days to know what it takes."
                : "Tap a wound. The trace shows what it does to the plan."}
            </p>
            <div className="mt-4 flex items-center justify-between gap-4">
              <button
                type="button"
                disabled={!leading}
                onClick={() =>
                  leading
                    ? onStart({ situation: leading.situation, note: leading.note })
                    : undefined
                }
                className="inline-flex items-center justify-center gap-2 rounded-full bg-signal px-5 py-2.5 font-plex-sans text-[14px] font-medium text-iron transition-colors duration-150 hover:bg-signal/90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Start the Check
                <span aria-hidden="true">→</span>
              </button>
              <p className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/50">
                {selected.length}/{fitSymptoms.length} on record
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}