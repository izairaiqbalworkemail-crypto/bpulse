"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { Atmosphere } from "@/components/landing/Atmosphere";

type HeroFrameProps = {
  children: ReactNode;
  /** Home hero: min 100svh, ~1400px at desktop so the window crosses the fold. */
  tall?: boolean;
};

/**
 * Shared hero chrome: rag inset, iron plate.
 * Nav lives in SiteChrome so every page has the same topbar.
 */
export function HeroFrame({ children, tall = false }: HeroFrameProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-rag">
      <Atmosphere kind="light" opacity={0.38} />
      <div className="relative z-10 px-3 pb-3 pt-3 md:px-5 md:pb-5 md:pt-5 lg:px-8 lg:pb-8 lg:pt-8">
        <motion.div
          className={`on-iron relative overflow-hidden rounded-[24px] bg-iron text-rag ring-1 ring-inset ring-rag/[0.08] ${
            tall ? "min-h-[100svh] pb-0 lg:min-h-[1400px]" : ""
          }`}
          initial={
            tall || reduceMotion ? false : { opacity: 0, y: 8 }
          }
          animate={{ opacity: 1, y: 0 }}
          transition={
            tall || reduceMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 180, damping: 26 }
          }
        >
          {!tall ? <Atmosphere kind="ring" opacity={0.16} /> : null}
          <div
            className={
              tall
                ? "relative z-10 px-0 pb-0 pt-0"
                : "relative z-10 px-5 pb-10 pt-10 md:px-8 md:pb-14 md:pt-12"
            }
          >
            <div
              className={
                tall
                  ? "mx-auto flex w-full flex-col"
                  : "mx-auto flex w-full max-w-[820px] flex-col"
              }
            >
              {children}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
