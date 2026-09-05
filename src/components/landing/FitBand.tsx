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

const traceWidth = 720;
const traceHeight = 120;

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
    <div>
      <svg
        viewBox={`0 0 ${traceWidth} ${traceHeight}`}
        className="w-full"
        aria-hidden="true"
      >
        <line
          x1="0"
          y1={traceHeight / 2}
          x2={traceWidth}
          y2={traceHeight / 2}
          stroke="rgba(60, 42, 29, 0.12)"
          strokeWidth="1"
        />
        <motion.path
          d={buildHeroTracePath(selected, traceWidth, traceHeight)}
          fill="none"
          stroke="#3c2a1d"
          strokeWidth="1.5"
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

      <p className="mt-8 font-newsreader text-[32px] leading-[1.1] text-iron md:text-[40px]">
        {leading?.verdict ?? "Nothing on record"}
      </p>
      <p className="mt-3 max-w-[36ch] font-newsreader text-[18px] text-ink">
        {leading
          ? "Five days to know what it takes."
          : "Tap a wound. The trace shows what it does to the plan."}
      </p>

      <ul role="list" className="mt-10 grid gap-3 sm:grid-cols-2">
        {fitSymptoms.map((entry) => {
          const on = selected.includes(entry.key);
          return (
            <li key={entry.key}>
              <button
                type="button"
                aria-pressed={on}
                onClick={() => toggle(entry.key)}
                className={`flex min-h-14 w-full items-center justify-between gap-3 rounded-full px-5 text-left font-plex-sans text-[16px] ${
                  on
                    ? "bg-iron text-rag"
                    : "bg-transparent text-iron ring-1 ring-iron/15 hover:ring-iron/35"
                }`}
              >
                {entry.label}
                <span className="font-plex-mono text-[11px] uppercase tracking-[0.06em] opacity-70">
                  {entry.verdict}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-10">
        <button
          type="button"
          disabled={!leading}
          onClick={() =>
            leading
              ? onStart({ situation: leading.situation, note: leading.note })
              : undefined
          }
          className="inline-flex min-h-12 items-center gap-2 rounded-full bg-iron px-6 py-3 font-plex-sans text-[15px] font-medium text-rag disabled:cursor-not-allowed disabled:opacity-40"
        >
          Start the Check
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
