"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { landSpring } from "@/components/landing/Reveal";

/**
 * The 80% / last-20% bar. Shared across every page hero so the site
 * always opens on the same diagram.
 */
export function EightyBar() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const filled = inView || reduce;

  return (
    <div ref={ref}>
      <div className="mb-3 flex items-baseline justify-between font-plex-mono text-[14px] tabular-nums">
        <span className="text-rag/75">80%</span>
        <span className="text-rag/70">the last 20%</span>
      </div>
      <div className="relative h-3.5 overflow-hidden rounded-full border border-rag/18 bg-iron/75">
        <motion.div
          className="absolute inset-y-0 left-0 bg-signal"
          initial={reduce ? false : { width: "0%" }}
          animate={{ width: filled ? "80%" : "0%" }}
          transition={reduce ? { duration: 0 } : { ...landSpring, delay: 0.12 }}
        />
        <div
          className="absolute inset-y-0 right-0 w-[20%] border-l border-rag/30"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(239,234,224,0.18) 0, rgba(239,234,224,0.18) 2px, transparent 2px, transparent 7px)",
          }}
        />
      </div>
    </div>
  );
}
