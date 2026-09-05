"use client";

import { motion, useReducedMotion } from "motion/react";
import { HeroFrame } from "@/components/HeroFrame";
import { HeroPortal } from "@/components/HeroPortal";
import { offer } from "@/content/offer";
import { scrollToSection } from "@/lib/scroll-section";

const spring = { type: "spring" as const, stiffness: 180, damping: 26 };

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <HeroFrame tall>
      <div className="flex flex-col items-center text-center">
        <div className="flex min-h-[52svh] w-full flex-col items-center justify-end px-5 pb-[clamp(2.5rem,8svh,8.75rem)] pt-16 md:min-h-[58svh] md:px-8 md:pt-20">
          <h1 className="mx-auto max-w-[900px] font-newsreader text-[40px] leading-[1.05] tracking-[-0.03em] md:text-[60px] xl:text-[96px]">
            <motion.span
              className="block text-rag"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduce ? { duration: 0 } : spring}
            >
              Everyone gets to 80%.
            </motion.span>
            <motion.span
              className="mt-0 block text-signal"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduce ? { duration: 0 } : { ...spring, delay: 0.08 }}
            >
              We ship the rest.
            </motion.span>
          </h1>

          <motion.p
            className="mt-12 max-w-[64ch] font-newsreader text-[20px] leading-normal text-rag/75"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduce ? { duration: 0 } : { ...spring, delay: 0.16 }}
          >
            Fixed scope. Senior only. You watch every day of it.
          </motion.p>

          <motion.div
            className="mt-[72px] flex flex-wrap items-center justify-center gap-4"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduce ? { duration: 0 } : { ...spring, delay: 0.22 }}
          >
            <button
              type="button"
              onClick={() => scrollToSection("intake")}
              className="inline-flex items-center rounded-full bg-signal px-6 py-3 font-plex-sans text-[15px] font-medium text-iron focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
            >
              {`Start the Check · $${offer.check.price.toLocaleString("en-US")}`}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("match")}
              className="inline-flex items-center gap-2 font-plex-sans text-[15px] text-rag/80 hover:text-rag focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rag"
            >
              Match it against the record
              <span aria-hidden="true">→</span>
            </button>
          </motion.div>
        </div>

        <div className="w-full md:w-[min(82vw,1400px)]">
          <HeroPortal />
        </div>
      </div>
    </HeroFrame>
  );
}
