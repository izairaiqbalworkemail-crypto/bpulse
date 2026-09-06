"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Episode, EpisodeHead } from "@/components/episode/Episode";
import { landSpring } from "@/components/landing/Reveal";
import { closeStages } from "@/content/process";
import {
  changeOrders,
  handover,
  scopeDiff,
  scopeVersions,
} from "@/content/demo";

const samples: Record<string, { kicker: string; lines: string[] }> = {
  discovery: {
    kicker: "Overview",
    lines: [
      "Current stage, next milestone, days on the clock.",
      "The same questions we use on a Check.",
    ],
  },
  nda: {
    kicker: "Documents",
    lines: [
      "NDA dated 12 Aug 2026 · signed.",
      "Nothing implied. Status is on the page.",
    ],
  },
  scope: {
    kicker: "Scope lock",
    lines: [
      ...scopeVersions.map((row) => `v${row.version} · ${row.dated} · ${row.summary}`),
      ...scopeDiff.map((row) => `${row.change} · ${row.price}`),
      ...changeOrders.map((row) => `${row.id} · ${row.price} · signed ${row.signed}`),
    ],
  },
  build: {
    kicker: "Progress",
    lines: [
      "Findings stay open, closed, or deferred with an owner and a date.",
      "Unwired integrations say not connected.",
    ],
  },
  handover: {
    kicker: "Revocation log",
    lines: handover.revocation.map(
      (row) => `${row.item} · revoked ${row.revokedOn} · ${row.note}`,
    ),
  },
  standing: {
    kicker: "Standing",
    lines: [
      "Optional. Priced in writing.",
      "The revocation log stays after we leave.",
    ],
  },
};

/**
 * 06 · THE VIEW — paper. Stage index, then the sample. No pills.
 */
export function View() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<(typeof closeStages)[number]["id"]>(
    "scope",
  );
  const stage = closeStages.find((item) => item.id === active) ?? closeStages[2];
  const sample = samples[stage.id];

  return (
    <Episode labelledBy="view" tone="paper">
      <EpisodeHead
        n="06"
        kicker="THE VIEW"
        id="view"
        heading="A URL, not a promise."
      >
        Every agency says full transparency. You can open a working sample
        before you pay anything.
      </EpisodeHead>

      <div className="mt-14">
        <div
          role="tablist"
          aria-label="Close stages"
          className="flex flex-wrap gap-x-6 gap-y-3 border-b border-iron/10"
        >
          {closeStages.map((item) => {
            const on = item.id === active;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setActive(item.id)}
                className={`-mb-px border-b pb-3 font-plex-sans text-[14px] ${
                  on
                    ? "border-iron text-iron"
                    : "border-transparent text-ink/70 hover:text-iron"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={stage.id}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={reduce ? { duration: 0 } : landSpring}
            className="mt-10 grid gap-12 md:grid-cols-2"
          >
            <dl className="flex flex-col gap-7">
              <div>
                <dt className="font-plex-mono text-[11px] uppercase tracking-[0.1em] text-ink/70">
                  You receive
                </dt>
                <dd className="mt-2 font-newsreader text-[18px] leading-[1.4] text-iron">
                  {stage.receive}
                </dd>
              </div>
              <div>
                <dt className="font-plex-mono text-[11px] uppercase tracking-[0.1em] text-ink/70">
                  You sign
                </dt>
                <dd className="mt-2 font-newsreader text-[18px] leading-[1.4] text-iron">
                  {stage.sign}
                </dd>
              </div>
              <div>
                <dt className="font-plex-mono text-[11px] uppercase tracking-[0.1em] text-ink/70">
                  You see
                </dt>
                <dd className="mt-2 font-newsreader text-[18px] leading-[1.4] text-iron">
                  {stage.see}
                </dd>
              </div>
            </dl>
            <div>
              <p className="font-plex-mono text-[11px] uppercase tracking-[0.1em] text-ink/70">
                Sample · {sample.kicker}
              </p>
              <ul className="mt-4 flex flex-col">
                {sample.lines.map((line) => (
                  <li
                    key={line}
                    className="border-b border-iron/8 py-3 font-newsreader text-[16px] leading-[1.4] text-iron first:pt-0"
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="mt-12">
        <Link
          href="/demo"
          className="font-plex-sans text-[15px] text-iron underline decoration-iron/25 underline-offset-4 hover:decoration-iron"
        >
          Explore a real engagement →
        </Link>
      </p>
    </Episode>
  );
}
