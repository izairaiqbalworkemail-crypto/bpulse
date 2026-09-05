"use client";

import { motion, useReducedMotion } from "motion/react";
import { HeroFrame } from "@/components/HeroFrame";
import { HeroPortal } from "@/components/HeroPortal";
import { Rise } from "@/components/landing/Reveal";
import { offer } from "@/content/offer";
import { scrollToSection } from "@/lib/scroll-section";

const spring = { type: "spring" as const, stiffness: 180, damping: 26 };
const draw = [0.16, 1, 0.3, 1] as const;

function LastTwenty() {
  const reduce = useReducedMotion();

  return (
    <div
      className="mt-10 flex h-px w-48 overflow-hidden"
      aria-hidden="true"
    >
      <motion.span
        className="block h-full origin-left bg-rag/25"
        style={{ width: "80%" }}
        initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={
          reduce ? { duration: 0 } : { delay: 0.4, duration: 0.8, ease: draw }
        }
      />
      <motion.span
        className="block h-full origin-left bg-signal"
        style={{ width: "20%" }}
        initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={
          reduce ? { duration: 0 } : { delay: 1.15, duration: 0.35, ease: draw }
        }
      />
    </div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <HeroFrame tall>
      <div className="mx-auto grid w-full max-w-[1120px] flex-1 items-center gap-16 px-6 pb-16 pt-24 md:px-10 md:pb-20 md:pt-28 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,32rem)] lg:gap-20">
        <motion.div
          className="min-w-0"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduce ? { duration: 0 } : { ...spring, delay: 0.06 }}
        >
          <motion.p
            className="font-plex-mono text-[12px] uppercase tracking-[0.16em] text-rag/70"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={reduce ? { duration: 0 } : { ...spring, delay: 0.12 }}
          >
            The last twenty
          </motion.p>

          <h1 className="mt-6 max-w-[12ch] font-newsreader text-[44px] leading-[1.05] tracking-[-0.02em] text-rag md:text-[64px]">
            <Rise>
              <span className="block">Everyone gets to 80%.</span>
            </Rise>
            <Rise delay={0.08}>
              <span className="mt-1 block">We ship the rest.</span>
            </Rise>
          </h1>

          <motion.p
            className="mt-6 max-w-[28ch] font-newsreader text-[18px] leading-[1.45] text-rag/75 md:text-[20px]"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduce ? { duration: 0 } : { ...spring, delay: 0.18 }}
          >
            Fixed scope. Senior only. You watch every day of it.
          </motion.p>

          <LastTwenty />

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-6"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={reduce ? { duration: 0 } : { ...spring, delay: 0.28 }}
          >
            <button
              type="button"
              onClick={() => scrollToSection("intake")}
              className="inline-flex min-h-11 touch-manipulation items-center rounded-full bg-signal px-5 py-2.5 font-plex-sans text-[14px] font-medium text-iron focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
            >
              {`Start the Check · $${offer.check.price.toLocaleString("en-US")}`}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("match")}
              className="font-plex-sans text-[14px] text-rag/75 hover:text-rag focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rag"
            >
              Match the record
            </button>
          </motion.div>
        </motion.div>

        <HeroPortal />
      </div>
    </HeroFrame>
  );
}
