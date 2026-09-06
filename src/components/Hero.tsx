"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { SamplePortal } from "@/components/home/SamplePortal";
import { Rise, landSpring } from "@/components/landing/Reveal";
import { pulseCopy } from "@/content/home";
import { scrollToSection } from "@/lib/scroll-section";

/**
 * 01 · THE PULSE — type, two actions, the sample. No decoration.
 */
export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="pulse"
      aria-labelledby="pulse-heading"
      className="on-iron relative scroll-mt-[5.75rem] bg-iron-2 text-rag md:scroll-mt-28"
    >
      <div className="stage-container flex min-h-[100svh] flex-col justify-end pb-16 pt-28 md:pb-20 md:pt-32">
        <motion.p
          className="font-plex-mono text-[12px] uppercase tracking-[0.14em] text-rag/70"
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduce ? { duration: 0 } : { ...landSpring, delay: 0.08 }}
        >
          {pulseCopy.n} · {pulseCopy.kicker}
        </motion.p>

        <h1
          id="pulse-heading"
          className="mt-5 max-w-[14ch] font-newsreader type-display-xl text-[44px] leading-[1.02] md:text-[72px]"
        >
          <Rise delay={0.12}>
            <span className="block text-rag">{pulseCopy.claim[0]}</span>
          </Rise>
          <Rise delay={0.2}>
            <span className="mt-1 block text-rag">{pulseCopy.claim[1]}</span>
          </Rise>
        </h1>

        <motion.p
          className="mt-6 max-w-[32ch] font-newsreader text-[20px] leading-[1.4] text-rag/80 md:text-[22px]"
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduce ? { duration: 0 } : { ...landSpring, delay: 0.26 }}
        >
          {pulseCopy.dek}
        </motion.p>

        <motion.div
          className="mt-8 flex flex-wrap items-center gap-3"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={reduce ? { duration: 0 } : { ...landSpring, delay: 0.32 }}
        >
          <Link
            href="/check"
            className="btn btn-signal min-h-12 px-6 text-[15px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
          >
            {pulseCopy.primary}
          </Link>
          <button
            type="button"
            onClick={() => scrollToSection("view")}
            className="inline-flex min-h-12 items-center px-2 font-plex-sans text-[15px] text-rag/80 underline decoration-rag/25 underline-offset-4 hover:text-rag hover:decoration-rag focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rag"
          >
            {pulseCopy.secondary}
          </button>
        </motion.div>

        <motion.div
          className="mt-14"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduce ? { duration: 0 } : { ...landSpring, delay: 0.38 }}
        >
          <SamplePortal />
        </motion.div>
      </div>
    </section>
  );
}
