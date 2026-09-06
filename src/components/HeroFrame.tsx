"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type HeroFrameProps = {
  children: ReactNode;
  tall?: boolean;
};

/**
 * Cream sides. One graphite plate. Nothing else.
 */
export function HeroFrame({ children, tall = false }: HeroFrameProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id={tall ? "hero" : undefined}
      data-surface="paper"
      className="ribbon paper-ground relative"
    >
      <div
        className={
          tall
            ? "relative z-10 p-2.5 md:p-4"
            : "relative z-10 px-3 pb-3 pt-3 md:px-6 md:pb-6 md:pt-5 lg:px-8"
        }
      >
        <motion.div
          className={
            tall
              ? "hero-plate on-iron relative flex min-h-[calc(100svh-1.25rem)] flex-col md:min-h-[calc(100svh-2rem)]"
              : "hero-plate on-iron relative flex min-h-[min(68svh,38rem)] flex-col"
          }
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 180, damping: 26 }
          }
        >
          <div className="relative z-10 flex min-h-0 flex-1 flex-col">
            {children}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
