"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { SectionIntro } from "@/components/home/SectionIntro";
import { Reveal, Stagger, Item, landEase } from "@/components/landing/Reveal";
import { doubtCopy, homeQuestions } from "@/content/home";

/**
 * Doubt, then the ask. Ink. The doubts open like a counted ledger;
 * the ask stays pinned while they unclench.
 */
export function Questions() {
  const reduce = Boolean(useReducedMotion());
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="questions"
      aria-labelledby="questions-heading"
      className="on-ink overflow-x-clip bg-ink text-read"
    >
      <div className="stage-container py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          {/* Left rail — the ask, pinned while the doubts unclench */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionIntro
              id="questions-heading"
              n={doubtCopy.n}
              kicker={doubtCopy.kicker}
              heading={doubtCopy.heading}
              dek={doubtCopy.dek}
              tone="ink"
              headingMax="max-w-[12ch]"
              dekMax="max-w-[34ch]"
            />

            <Reveal delay={0.2}>
              <div className="mt-12 rounded-[24px] border border-paper/10 bg-ink-card/70 p-7">
                <p className="font-newsreader text-[22px] leading-[1.2] text-paper">
                  {doubtCopy.band}
                </p>
                <p className="mt-2 max-w-[30ch] font-plex-sans text-[15px] leading-[1.55] text-read">
                  {doubtCopy.bandNote}
                </p>
                <Link
                  href={doubtCopy.askHref}
                  className="btn btn-paper mt-6 min-h-11 px-7 text-[15px] hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mist"
                >
                  {doubtCopy.ask}
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Right — the doubts, one ledger row each */}
          <Stagger gap={0.05}>
            <ul>
              {homeQuestions.map((item, index) => {
                const on = open === index;
                return (
                  <li key={item.q} className="border-b border-paper/10">
                    <Item>
                      <button
                        type="button"
                        aria-expanded={on}
                        onClick={() => setOpen(on ? null : index)}
                        className="group flex w-full items-center justify-between gap-6 py-5 text-left"
                      >
                        <span className="flex min-w-0 items-baseline gap-4">
                          <span
                            className={`font-plex-mono text-[11px] tabular-nums tracking-[0.08em] transition-colors duration-200 ${
                              on
                                ? "text-ember"
                                : "text-mist/40 group-hover:text-mist/75"
                            }`}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={`font-newsreader text-[21px] leading-[1.25] transition-colors duration-200 ${
                              on
                                ? "text-paper"
                                : "text-paper/85 group-hover:text-paper"
                            }`}
                          >
                            {item.q}
                          </span>
                        </span>
                        <span
                          aria-hidden="true"
                          className={`shrink-0 font-plex-mono text-[20px] leading-none font-light text-mist/50 transition-transform duration-300 ${
                            on ? "rotate-45 text-ember" : ""
                          }`}
                        >
                          +
                        </span>
                      </button>
                      <AnimatePresence initial={false}>
                        {on ? (
                          <motion.div
                            key="answer"
                            initial={reduce ? false : { height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={reduce ? undefined : { height: 0, opacity: 0 }}
                            transition={{
                              duration: reduce ? 0 : 0.35,
                              ease: landEase,
                            }}
                            className="overflow-hidden"
                          >
                            <p className="max-w-[52ch] pb-6 pl-10 font-plex-sans text-[16px] leading-[1.65] text-read">
                              {item.a}
                            </p>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </Item>
                  </li>
                );
              })}
            </ul>
          </Stagger>
        </div>
      </div>
    </section>
  );
}
