"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Tilt } from "@/components/landing/Reveal";
import { getDemoOverview } from "@/content/demo";
import {
  heroPortalView,
  type HeroPortalView,
} from "@/lib/hero-portal-view";

const desk = { type: "spring" as const, stiffness: 160, damping: 22 };

function useMinWidth(px: number) {
  const [matches, setMatches] = useState<boolean | null>(null);

  useEffect(() => {
    const media = window.matchMedia(`(min-width: ${px}px)`);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [px]);

  return matches;
}

function ProgressBar({ fill }: Readonly<{ fill: string }>) {
  const reduce = useReducedMotion();
  return (
    <div className="h-2 flex-1 overflow-hidden rounded-full bg-iron/10">
      <motion.div
        className="h-full bg-signal"
        initial={reduce ? { width: fill } : { width: 0 }}
        animate={{ width: fill }}
        transition={
          reduce
            ? { duration: 0 }
            : { delay: 0.72, duration: 0.9, ease: [0.16, 1, 0.3, 1] }
        }
      />
    </div>
  );
}

function LiveChip() {
  const reduce = useReducedMotion();
  return (
    <motion.span
      className="shrink-0 font-plex-mono text-[12px] text-ink/70"
      animate={reduce ? undefined : { opacity: [1, 0.55, 1] }}
      transition={
        reduce
          ? undefined
          : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }
      }
    >
      ◦ live sample
    </motion.span>
  );
}

function CurrentPip({ current }: Readonly<{ current: boolean }>) {
  const reduce = useReducedMotion();
  if (!current) {
    return <span aria-hidden="true">○</span>;
  }
  return (
    <motion.span
      aria-hidden="true"
      animate={reduce ? undefined : { opacity: [1, 0.35, 1] }}
      transition={
        reduce
          ? undefined
          : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
      }
    >
      ●
    </motion.span>
  );
}

function HeroWindow({ view }: Readonly<{ view: HeroPortalView }>) {
  const fill = `${Math.min(100, Math.max(0, view.usedPct))}%`;

  return (
    <Link
      href="/demo"
      aria-label={`Sample portal for ${view.client}. Open the live sample.`}
      className="block overflow-hidden rounded-[12px] bg-rag-card text-left text-iron shadow-[var(--shadow-artifact)] transition-shadow duration-300 hover:shadow-[var(--shadow-raised)]"
    >
      <div className="flex h-8 items-center gap-3 border-b border-iron/10 px-4">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#e36a5c]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#f2c230]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#4a8f6f]" />
        </div>
        <p className="min-w-0 flex-1 truncate rounded-full bg-iron/[0.06] px-3 py-0.5 text-center font-plex-mono text-[12px] text-ink/70">
          app.bpulse.dev/northline
        </p>
        <LiveChip />
      </div>

      <div className="px-6 py-6">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-plex-sans text-[15px] font-medium tracking-[0.04em] text-iron uppercase">
            {view.client}
          </h2>
          <p className="font-plex-mono text-[12px] tabular-nums text-ink/70">
            day {view.daysElapsed} / {view.lockedDays}
          </p>
        </div>

        <ol className="mt-5 flex flex-wrap items-end gap-x-4 gap-y-2 border-t border-iron/10 pt-4">
          {view.stages.map((stage) => {
            const current = Boolean(stage.current);
            const tick = stage.done ? (
              <span aria-hidden="true">✓</span>
            ) : (
              <CurrentPip current={current} />
            );
            return (
              <li key={stage.id} className="min-w-0">
                <p
                  className={`flex items-center gap-1.5 font-plex-mono text-[11px] uppercase tracking-[0.06em] ${
                    current ? "text-iron" : "text-ink/70"
                  }`}
                >
                  {tick}
                  {stage.label}
                </p>
              </li>
            );
          })}
        </ol>

        <div className="mt-5 flex items-center gap-3">
          <ProgressBar fill={fill} />
          <p className="shrink-0 font-plex-mono text-[12px] tabular-nums text-ink/70">
            {view.usedPct}%
          </p>
        </div>
        <p className="mt-2 font-plex-mono text-[12px] text-ink/70">
          v{view.scopeVersion} locked
        </p>

        <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-iron/10 pt-5">
          <div>
            <dt className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/70">
              Findings
            </dt>
            <dd className="mt-1 font-plex-sans text-[14px] text-iron">
              {view.findingsOpen} open
            </dd>
          </div>
          <div>
            <dt className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/70">
              Deploy
            </dt>
            <dd className="mt-1 font-plex-sans text-[14px] text-iron">
              {view.deployLine}
            </dd>
          </div>
          <div>
            <dt className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/70">
              Next
            </dt>
            <dd className="mt-1 font-plex-sans text-[14px] text-iron">
              {view.nextMilestone}
            </dd>
          </div>
        </dl>
      </div>
    </Link>
  );
}

function HeroCard({ view }: Readonly<{ view: HeroPortalView }>) {
  const reduce = useReducedMotion();
  const fill = `${Math.min(100, Math.max(0, view.usedPct))}%`;
  const current =
    view.stages.find((stage) => stage.current)?.label ?? view.currentStage;

  return (
    <Link
      href="/demo"
      aria-label={`Sample portal for ${view.client}. Open the live sample.`}
      className="block overflow-hidden rounded-[12px] bg-rag-card px-5 py-5 text-left text-iron shadow-[var(--shadow-artifact)]"
    >
      <LiveChip />
      <h2 className="mt-3 font-plex-sans text-[15px] font-medium tracking-[0.04em] text-iron uppercase">
        {view.client}
      </h2>
      <p className="mt-1 font-plex-mono text-[12px] tabular-nums text-ink/70">
        day {view.daysElapsed} of {view.lockedDays}
      </p>

      <div className="mt-4 border-t border-iron/10 pt-4">
        <p className="flex items-center gap-2" aria-label={`Stage ${current}`}>
          {view.stages.map((stage) => {
            const on = Boolean(stage.current);
            return (
              <motion.span
                key={stage.id}
                className={`h-2 w-2 rounded-full ${
                  stage.done || on ? "bg-iron" : "bg-iron/20"
                }`}
                animate={
                  reduce || !on ? undefined : { opacity: [1, 0.35, 1] }
                }
                transition={
                  reduce || !on
                    ? undefined
                    : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
                }
                aria-hidden="true"
              />
            );
          })}
          <span className="ml-1 font-plex-mono text-[12px] text-iron">
            {current}
          </span>
        </p>
        <div className="mt-4 flex items-center gap-3">
          <ProgressBar fill={fill} />
          <p className="shrink-0 font-plex-mono text-[12px] tabular-nums text-ink/70">
            {view.usedPct}%
          </p>
        </div>
        <p className="mt-2 font-plex-mono text-[12px] text-ink/70">
          v{view.scopeVersion} locked
        </p>
      </div>

      <dl className="mt-4 border-t border-iron/10 pt-4">
        <div>
          <dt className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/70">
            Findings
          </dt>
          <dd className="mt-1 font-plex-sans text-[14px] text-iron">
            {view.findingsOpen} open
          </dd>
        </div>
        <div className="mt-3">
          <dt className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/70">
            Next
          </dt>
          <dd className="mt-1 font-plex-sans text-[14px] text-iron">
            {view.nextMilestone}
          </dd>
        </div>
      </dl>
    </Link>
  );
}

export function HeroPortal() {
  const reduce = useReducedMotion();
  const wide = useMinWidth(768);
  const view = heroPortalView(getDemoOverview());

  return (
    <motion.div
      className="relative w-full"
      initial={
        reduce ? false : { opacity: 0, y: 40, scale: 0.96, rotate: 0.5 }
      }
      animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
      transition={reduce ? { duration: 0 } : { ...desk, delay: 0.34 }}
    >
      {wide === null ? (
        <div className="h-[280px] w-full md:h-[380px]" aria-hidden="true" />
      ) : (
        <Tilt intensity={wide ? 6 : 0} className="[transform-style:preserve-3d]">
          {wide ? <HeroWindow view={view} /> : <HeroCard view={view} />}
        </Tilt>
      )}
    </motion.div>
  );
}
