"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { Count, landSpring } from "@/components/landing/Reveal";

const R = 78;
const C = 2 * Math.PI * R;

/**
 * One object for episode 01: a soft ring that fills to 80%.
 * Caps are round. The last fifth stays open on purpose.
 */
export function EightyDome({
  compact = false,
}: Readonly<{ compact?: boolean }>) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const filled = inView || reduce;
  const box = compact ? "h-[168px] w-[168px]" : "h-[200px] w-[200px]";
  const type = compact
    ? "font-newsreader text-[44px] leading-none tracking-[-0.04em] text-iron"
    : "font-newsreader text-[52px] leading-none tracking-[-0.04em] text-iron";

  return (
    <div ref={ref} className={`mx-auto grid place-items-center ${compact ? "w-[168px]" : "w-[200px]"}`}>
      <div className={`relative ${box}`}>
        <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
          <circle
            cx="100"
            cy="100"
            r={R}
            fill="none"
            stroke="rgba(13,18,24,0.1)"
            strokeWidth="14"
          />
          <motion.circle
            cx="100"
            cy="100"
            r={R}
            fill="none"
            stroke="#f2c230"
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={C}
            transform="rotate(-90 100 100)"
            initial={reduce ? false : { strokeDashoffset: C }}
            animate={{ strokeDashoffset: filled ? C * 0.2 : C }}
            transition={reduce ? { duration: 0 } : { ...landSpring, delay: 0.16 }}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <Count to={80} className={type} />
        </div>
      </div>
      <p className="mt-3 font-plex-mono text-[13px] uppercase tracking-[0.08em] text-ink/70">
        the last 20% is the work
      </p>
    </div>
  );
}
