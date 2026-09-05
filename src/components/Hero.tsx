"use client";

import { motion, useReducedMotion } from "motion/react";
import { HeroFrame } from "@/components/HeroFrame";
import { HeroPortal } from "@/components/HeroPortal";
import { Rise } from "@/components/landing/Reveal";
import { Masthead } from "@/components/primitives/Masthead";
import { offer } from "@/content/offer";
import { scrollToSection } from "@/lib/scroll-section";

const spring = { type: "spring" as const, stiffness: 180, damping: 26 };
const draw = [0.16, 1, 0.3, 1] as const;

function LastTwenty() {
  const reduce = useReducedMotion();

  return (
    <div
      className="mt-8 flex h-[3px] w-full max-w-[22rem] overflow-hidden md:mt-10"
      aria-hidden="true"
    >
      <motion.span
        className="block h-full origin-left bg-rag/25"
        style={{ width: "80%" }}
        initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={
          reduce ? { duration: 0 } : { delay: 0.42, duration: 0.9, ease: draw }
        }
      />
      <motion.span
        className="block h-full origin-left bg-signal"
        style={{ width: "20%" }}
        initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={
          reduce ? { duration: 0 } : { delay: 1.28, duration: 0.42, ease: draw }
        }
      />
    </div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <HeroFrame tall>
      <motion.div
        className="shrink-0 px-5 pt-5 md:px-8 md:pt-7"
        initial={reduce ? false : { opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduce ? { duration: 0 } : spring}
      >
        <div className="mx-auto max-w-[1120px]">
          <Masthead variant="transparent" />
        </div>
      </motion.div>

      <div className="mx-auto grid w-full max-w-[1120px] flex-1 items-center gap-12 px-5 py-12 md:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(24rem,38rem)] lg:gap-16">
        <div className="min-w-0 text-left">
          <motion.p
            className="font-plex-mono text-[12px] uppercase tracking-[0.14em] text-rag/70"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduce ? { duration: 0 } : { ...spring, delay: 0.06 }}
          >
            The last twenty
          </motion.p>

          <h1 className="mt-5 max-w-[16ch] font-newsreader text-[40px] leading-[1.08] tracking-[-0.015em] text-rag md:text-[56px] xl:text-[68px]">
            <Rise>
              <span className="block">Everyone gets to 80%.</span>
            </Rise>
            <Rise delay={0.1}>
              <span className="mt-1 block">We ship the rest.</span>
            </Rise>
          </h1>

          <motion.p
            className="mt-6 max-w-[34ch] font-newsreader text-[20px] leading-[1.45] text-rag/75 md:mt-8 md:text-[22px]"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduce ? { duration: 0 } : { ...spring, delay: 0.2 }}
          >
            Fixed scope. Senior only. You watch every day of it.
          </motion.p>

          <LastTwenty />

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-4 md:mt-12"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduce ? { duration: 0 } : { ...spring, delay: 0.28 }}
          >
            <button
              type="button"
              onClick={() => scrollToSection("intake")}
              className="inline-flex min-h-12 touch-manipulation items-center rounded-full bg-signal px-7 py-3.5 font-plex-sans text-[16px] font-medium text-iron focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
            >
              {`Start the Check · $${offer.check.price.toLocaleString("en-US")}`}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("match")}
              className="inline-flex min-h-12 touch-manipulation items-center gap-2 font-plex-sans text-[16px] text-rag/75 hover:text-rag focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rag"
            >
              Match it against the record
              <span aria-hidden="true">→</span>
            </button>
          </motion.div>
        </div>

        <HeroPortal />
      </div>
    </HeroFrame>
  );
}
