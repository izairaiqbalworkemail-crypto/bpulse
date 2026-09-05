"use client";

import Link from "next/link";
import { useEffect, useState, type PointerEvent } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { getDemoOverview } from "@/content/demo";
import { heroPortalView, type HeroPortalView } from "@/lib/hero-portal-view";

const land = { type: "spring" as const, stiffness: 150, damping: 22 };
const RING = 2 * Math.PI * 46;

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

function DayRing({
  daysElapsed,
  lockedDays,
  usedPct,
}: Readonly<{ daysElapsed: number; lockedDays: number; usedPct: number }>) {
  const reduce = useReducedMotion();
  const offset = RING * (1 - Math.min(100, Math.max(0, usedPct)) / 100);

  return (
    <div className="relative mx-auto h-[9.5rem] w-[9.5rem]">
      <svg viewBox="0 0 120 120" className="-rotate-90" aria-hidden="true">
        <circle
          cx="60"
          cy="60"
          r="46"
          fill="none"
          stroke="rgba(244, 238, 230, 0.12)"
          strokeWidth="1.5"
        />
        <motion.circle
          cx="60"
          cy="60"
          r="46"
          fill="none"
          stroke="#f2c230"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray={RING}
          initial={reduce ? { strokeDashoffset: offset } : { strokeDashoffset: RING }}
          animate={{ strokeDashoffset: offset }}
          transition={
            reduce
              ? { duration: 0 }
              : { delay: 0.7, duration: 1.4, ease: [0.16, 1, 0.3, 1] }
          }
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <p className="font-newsreader text-[32px] leading-none tracking-[-0.03em] text-rag">
            {daysElapsed}
            <span className="text-rag/40">/{lockedDays}</span>
          </p>
          <p className="mt-1 font-plex-mono text-[10px] uppercase tracking-[0.14em] text-rag/70">
            day
          </p>
        </div>
      </div>
    </div>
  );
}

function GlassFace({
  view,
  compact,
}: Readonly<{ view: HeroPortalView; compact: boolean }>) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const tiltX = useSpring(useTransform(py, [0, 1], [5, -5]), {
    stiffness: 140,
    damping: 20,
  });
  const tiltY = useSpring(useTransform(px, [0, 1], [-6, 6]), {
    stiffness: 140,
    damping: 20,
  });
  const sheenX = useTransform(px, [0, 1], ["0%", "100%"]);
  const sheenY = useTransform(py, [0, 1], ["0%", "100%"]);

  function onMove(event: PointerEvent<HTMLAnchorElement>) {
    if (reduce) return;
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  }

  function onLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.div
      style={
        reduce
          ? undefined
          : { rotateX: tiltX, rotateY: tiltY, transformPerspective: 1100 }
      }
    >
      <Link
        href="/demo"
        aria-label={`Sample portal for ${view.client}. Open the live sample.`}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="relative block overflow-hidden rounded-[22px] text-left text-rag ring-1 ring-rag/15"
        style={{
          background:
            "linear-gradient(165deg, rgba(250, 246, 240, 0.1) 0%, rgba(250, 246, 240, 0.03) 48%, rgba(28, 19, 14, 0.4) 100%)",
          boxShadow:
            "inset 0 1px 0 rgba(250, 246, 240, 0.22), 0 28px 60px -28px rgba(0, 0, 0, 0.55)",
        }}
      >
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            left: sheenX,
            top: sheenY,
            background:
              "radial-gradient(circle, rgba(242, 194, 48, 0.2), transparent 70%)",
          }}
        />
        {!reduce ? (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(115deg, transparent 35%, rgba(250, 246, 240, 0.16) 50%, transparent 65%)",
              backgroundSize: "220% 220%",
            }}
            animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
            transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
          />
        ) : null}

        <div className="relative px-6 py-6 md:px-7 md:py-7">
          <div className="flex items-center justify-between gap-3">
            <p className="font-plex-mono text-[11px] uppercase tracking-[0.14em] text-rag/70">
              Sample
            </p>
            <p className="font-plex-mono text-[11px] uppercase tracking-[0.14em] text-signal">
              {view.usedPct}% used
            </p>
          </div>

          <p className="mt-5 font-newsreader text-[26px] leading-[1.1] text-rag">
            {view.client}
          </p>
          <p className="mt-1 font-plex-mono text-[12px] text-rag/70">
            v{view.scopeVersion} locked
          </p>

          <div className="mt-8">
            <DayRing
              daysElapsed={view.daysElapsed}
              lockedDays={view.lockedDays}
              usedPct={view.usedPct}
            />
          </div>

          {compact ? (
            <p className="mt-6 font-plex-mono text-[12px] text-rag/75">
              {view.currentStage} · {view.nextMilestone}
            </p>
          ) : (
            <>
              <ol className="mt-8 flex flex-col gap-2.5">
                {view.stages.map((stage) => {
                  const on = Boolean(stage.current);
                  return (
                    <li
                      key={stage.id}
                      className="flex items-center justify-between gap-3"
                    >
                      <span
                        className={`font-plex-sans text-[13px] ${
                          on ? "text-rag" : "text-rag/70"
                        }`}
                      >
                        {stage.label}
                      </span>
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          stage.done
                            ? "bg-rag/45"
                            : on
                              ? "bg-signal"
                              : "bg-rag/20"
                        }`}
                        aria-hidden="true"
                      >
                        {on && !reduce ? (
                          <motion.span
                            className="block h-full w-full rounded-full bg-signal"
                            animate={{ opacity: [1, 0.35, 1] }}
                            transition={{
                              duration: 2.2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />
                        ) : null}
                      </span>
                    </li>
                  );
                })}
              </ol>
              <p className="mt-7 border-t border-rag/10 pt-5 font-newsreader text-[15px] leading-[1.4] text-rag/80">
                Next · {view.nextMilestone}
              </p>
            </>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

export function HeroPortal() {
  const reduce = useReducedMotion();
  const wide = useMinWidth(768);
  const view = heroPortalView(getDemoOverview());

  return (
    <motion.div
      className="relative w-full max-w-[22rem] justify-self-end lg:max-w-[24rem]"
      initial={reduce ? false : { opacity: 0, y: 28, rotate: 1.2, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
      transition={reduce ? { duration: 0 } : { ...land, delay: 0.28 }}
    >
      {wide === null ? (
        <div className="h-[280px] w-full" aria-hidden="true" />
      ) : (
        <GlassFace view={view} compact={!wide} />
      )}
    </motion.div>
  );
}
