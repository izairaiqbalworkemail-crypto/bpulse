"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { Masthead } from "@/components/primitives/Masthead";

type HeroFrameProps = {
  children: ReactNode;
  /** Full-viewport shell used on the home self-check. */
  tall?: boolean;
  onReady?: () => void;
};

/**
 * Shared hero chrome: rag inset, iron plate, masthead.
 * Home fills it with the self-check. Every other page fills it with a title.
 */
export function HeroFrame({ children, tall = false, onReady }: HeroFrameProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative bg-rag">
      <div className="px-3 pb-3 pt-3 md:px-5 md:pb-5 md:pt-5 lg:px-8 lg:pb-8 lg:pt-8">
        <motion.div
          className={`on-iron relative overflow-hidden rounded-[24px] bg-iron text-rag ring-1 ring-inset ring-rag/[0.08] ${
            tall ? "min-h-[100svh]" : ""
          }`}
          initial={reduceMotion ? false : { scale: 0.985, y: 8 }}
          animate={{ scale: 1, y: 0 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 180, damping: 24 }
          }
          onAnimationComplete={() => onReady?.()}
        >
          <div className="absolute inset-x-5 top-4 z-20 md:inset-x-8 md:top-6 lg:inset-x-20 lg:top-8">
            <div className="max-w-[1200px]">
              <Masthead />
            </div>
          </div>

          <div
            className={
              tall
                ? "px-5 pb-12 pt-16 md:px-8 md:pb-[72px] md:pt-24 lg:px-20 lg:pb-[120px] lg:pt-40"
                : "px-5 pb-12 pt-20 md:px-8 md:pb-16 md:pt-24 lg:px-20 lg:pb-20 lg:pt-28"
            }
          >
            <div className="mx-0 flex max-w-[1200px] flex-col">{children}</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
