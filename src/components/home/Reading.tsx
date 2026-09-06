"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Episode, EpisodeHead } from "@/components/episode/Episode";
import { Item, Stagger, landSpring } from "@/components/landing/Reveal";
import { Trace } from "@/components/trace/Trace";
import { readingNote, readingSymptoms } from "@/content/home";
import { specFromLot } from "@/lib/lot-trace";
import { closestReadingLot } from "@/lib/reading-match";
import type { SignalId } from "@/content/signals";
import { buildHeroTracePath, type HeroPainKey } from "@/lib/trace";
import { scrollToSection } from "@/lib/scroll-section";

const WIDTH = 560;
const HEIGHT = 280;

const TRACE_KEY = {
  "staging-only": "staging-only",
  "no-deploy-path": "almost-done",
  "single-point-knowledge": "single-owner",
  "no-release-owner": "no-release-owner",
  "scope-unbounded": "ghosted-dev",
  "third-party-sprawl": "real-data-break",
} as const satisfies Record<string, HeroPainKey>;

export function Reading() {
  const reduce = useReducedMotion();
  const [selected, setSelected] = useState<SignalId[]>([]);

  const match = useMemo(() => closestReadingLot(selected), [selected]);
  const visitorPath = useMemo(() => {
    const keys = selected.map((id) => TRACE_KEY[id as keyof typeof TRACE_KEY]);
    return buildHeroTracePath(keys, WIDTH, HEIGHT);
  }, [selected]);

  function toggle(id: SignalId) {
    setSelected((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  return (
    <Episode labelledBy="reading" tone="cocoa">
      <EpisodeHead
        n="02"
        kicker="THE READING"
        id="reading"
        tone="cocoa"
        heading="Tap what is already true."
      >
        {readingNote}
      </EpisodeHead>

      <div className="mt-12 grid items-stretch gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <Stagger className="flex flex-col" gap={0.06}>
          {readingSymptoms.map((row) => {
            const on = selected.includes(row.signal);
            return (
              <Item key={row.key}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(row.signal)}
                  className={`flex min-h-[3.25rem] w-full items-center justify-between gap-4 border-b border-rag/10 py-3 text-left ${
                    on ? "text-rag" : "text-rag/70 hover:text-rag"
                  }`}
                >
                  <span className="font-newsreader text-[18px] leading-[1.25]">
                    {row.label}
                  </span>
                  <span className="shrink-0 font-plex-mono text-[11px] uppercase tracking-[0.08em] text-rag/70">
                    {row.verdict}
                  </span>
                </button>
              </Item>
            );
          })}
        </Stagger>

        <div className="relative min-h-[420px] overflow-hidden rounded-[24px] border border-rag/10 bg-iron-card px-6 py-6">
          {match?.lot.imageUrl ? (
            <Image
              src={match.lot.imageUrl}
              alt=""
              fill
              className="object-cover object-top opacity-20"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          ) : null}
          <div className="relative z-10">
            {match ? (
              <div className="pointer-events-none absolute inset-x-0 top-0 opacity-35">
                <Trace spec={specFromLot(match.lot)} size="full" surface="iron" />
              </div>
            ) : null}

            <svg
              viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
              className="relative z-10 mt-4 h-[180px] w-full"
              aria-hidden="true"
            >
              <path
                d={visitorPath}
                fill="none"
                stroke="currentColor"
                className="text-rag/50"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>

            <AnimatePresence mode="wait">
              <motion.div
                key={match?.lot.slug ?? selected.join("-") ?? "empty"}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={reduce ? { duration: 0 } : landSpring}
                className="relative z-10 mt-4"
              >
                {match ? (
                  <>
                    <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-rag/70">
                      {match.lot.grade.label.replace(/ on arrival$/i, "")}
                    </p>
                    <p className="mt-2 font-newsreader text-[22px] leading-[1.15] text-rag">
                      Closest: {match.lot.client} · shares {match.shared} of your{" "}
                      {match.selected} signals
                    </p>
                    <p className="mt-2 max-w-[42ch] font-newsreader text-[15px] leading-[1.4] text-rag/80">
                      {match.lot.summary}
                    </p>
                    <p className="mt-4">
                      <Link
                        href={`/work/${match.lot.slug}`}
                        className="font-plex-sans text-[14px] text-rag underline decoration-rag/25 underline-offset-4 hover:decoration-rag"
                      >
                        See the record →
                      </Link>
                    </p>
                  </>
                ) : (
                  <p className="max-w-[36ch] font-newsreader text-[16px] leading-[1.4] text-rag/80">
                    {selected.length === 0
                      ? "Six conditions we have already seen. Two or more can sit next to a real lot."
                      : "No lot on the record shares two of these signals yet."}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <p className="mt-10">
        <button
          type="button"
          onClick={() => scrollToSection("terms")}
          className="aside-chip aside-chip-rag"
        >
          Five days. A verdict.
        </button>
      </p>
    </Episode>
  );
}
