"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { dominantPain, type HeroPainKey } from "@/lib/trace";
import { fitSymptoms } from "@/content/landing";
import type { PulseCheckSituation } from "@/components/intake/PulseCheckIntake";
import { landEase, landSpring } from "@/components/landing/Reveal";

export type FitSelection = {
  situation: PulseCheckSituation;
  note: string;
};

type WoundCardProps = {
  entry: (typeof fitSymptoms)[number];
  on: boolean;
  reduce: boolean;
  index: number;
  onToggle: (key: HeroPainKey) => void;
};

function WoundCard({
  entry,
  on,
  reduce,
  index,
  onToggle,
}: Readonly<WoundCardProps>) {
  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={
        reduce ? { duration: 0 } : { duration: 0.5, ease: landEase, delay: index * 0.04 }
      }
    >
      <motion.button
        type="button"
        aria-pressed={on}
        onClick={() => onToggle(entry.key)}
        animate={reduce ? undefined : { y: on ? -4 : 0 }}
        whileHover={reduce ? undefined : { y: on ? -5 : -2 }}
        whileTap={reduce ? undefined : { scale: 0.99 }}
        transition={reduce ? { duration: 0 } : landSpring}
        className={`lift-card flex min-h-[7.75rem] w-full flex-col justify-between rounded-[24px] px-5 py-5 text-left ${
          on
            ? "border-signal bg-signal text-iron shadow-[var(--shadow-raised)]"
            : "room-card-rag text-iron"
        }`}
      >
        <p
          className={`font-plex-mono text-[11px] uppercase tracking-[0.08em] ${
            on ? "text-iron/70" : "text-ink/70"
          }`}
        >
          {entry.verdict}
        </p>
        <p className="mt-6 font-newsreader text-[22px] leading-[1.15] tracking-[-0.01em]">
          {entry.label}
        </p>
      </motion.button>
    </motion.li>
  );
}

/**
 * Six wounds as type. No photographs. A tap still seeds the Check.
 */
export function FitBand({
  onStart,
}: Readonly<{ onStart: (fit: FitSelection) => void }>) {
  const reduce = Boolean(useReducedMotion());
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
      <div className="min-h-[6.5rem]">
        <AnimatePresence mode="wait">
          <motion.div
            key={leading?.key ?? "empty"}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={reduce ? { duration: 0 } : { duration: 0.4, ease: landEase }}
          >
            <p className="font-newsreader text-[32px] leading-[1.1] tracking-[-0.02em] text-iron md:text-[40px]">
              {leading?.verdict ?? "Name the wound."}
            </p>
            <p className="mt-3 max-w-[40ch] font-newsreader text-[18px] leading-[1.45] text-ink">
              {leading
                ? leading.note
                : "Tap what is already true. The Check opens with that situation written down."}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {fitSymptoms.map((entry, index) => (
          <WoundCard
            key={entry.key}
            entry={entry}
            on={selected.includes(entry.key)}
            reduce={reduce}
            index={index}
            onToggle={toggle}
          />
        ))}
      </ul>

      <div className="mt-8">
        <motion.button
          type="button"
          disabled={!leading}
          onClick={() =>
            leading
              ? onStart({ situation: leading.situation, note: leading.note })
              : undefined
          }
          whileHover={reduce || !leading ? undefined : { y: -2 }}
          whileTap={reduce || !leading ? undefined : { scale: 0.98 }}
          className="btn btn-signal min-h-12 px-6 text-[15px] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Start the Check{" "}
          <span aria-hidden="true">→</span>
        </motion.button>
      </div>
    </div>
  );
}
