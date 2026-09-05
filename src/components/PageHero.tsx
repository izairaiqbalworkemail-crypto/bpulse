"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { HeroFrame } from "@/components/HeroFrame";
import { Mark } from "@/components/primitives/Mark";
import { Rise, landSpring } from "@/components/landing/Reveal";
import { offer } from "@/content/offer";

type PageHeroProps = {
  kicker: string;
  title: ReactNode;
  dek?: ReactNode;
  actionHref?: string;
  actionLabel?: string;
  hideAction?: boolean;
};

const checkPrice = `$${offer.check.price.toLocaleString("en-US")}`;

/**
 * Interior-page hero. Iron plate, gold mark, one Check ask.
 * No 80% bar — the mark is the object.
 */
export function PageHero({
  kicker,
  title,
  dek,
  actionHref = "/check",
  actionLabel,
  hideAction = false,
}: PageHeroProps) {
  const reduce = useReducedMotion();
  const label = actionLabel ?? `Start the Check · ${checkPrice}`;

  return (
    <HeroFrame>
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduce ? { duration: 0 } : landSpring}
      >
        <Mark size={52} />
      </motion.div>
      <div className="mt-8 flex flex-col gap-7 md:mt-10">
        <div>
          <p className="font-plex-mono text-[12px] uppercase tracking-[0.14em] text-rag/70">
            {kicker}
          </p>
          <Rise delay={0.06}>
            <h1 className="mt-3 max-w-[16ch] font-newsreader text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.04] tracking-[-0.03em] text-rag">
              {title}
            </h1>
          </Rise>
          {dek ? (
            <motion.div
              className="mt-4 max-w-[40ch] font-newsreader text-[18px] leading-[1.4] text-rag/70 md:text-[20px]"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduce ? { duration: 0 } : { ...landSpring, delay: 0.16 }}
            >
              {dek}
            </motion.div>
          ) : null}
        </div>
        {!hideAction ? (
          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduce ? { duration: 0 } : { ...landSpring, delay: 0.22 }}
          >
            <Link
              href={actionHref}
              className="inline-flex w-fit items-center gap-2 rounded-full bg-signal px-5 py-2.5 font-plex-sans text-[14px] font-medium text-iron"
            >
              {label}
              <span aria-hidden="true">→</span>
            </Link>
            {actionHref === "/check" ? (
              <Link
                href="/contact"
                className="font-plex-sans text-[14px] text-rag/80 underline decoration-rag/30 underline-offset-4 hover:text-rag hover:decoration-rag"
              >
                Or write the studio
              </Link>
            ) : null}
          </motion.div>
        ) : null}
      </div>
    </HeroFrame>
  );
}
