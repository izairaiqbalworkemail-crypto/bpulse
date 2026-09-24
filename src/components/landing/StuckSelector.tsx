"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { stuckChips, stuckCopy } from "@/content/landing-sections";

/**
 * The dark interrupt. Tap a situation: the photograph, the tag,
 * and the named start all follow. Tap again to clear.
 */
export function StuckSelector() {
  const [selected, setSelected] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const active = selected ?? 0;
  const chip = stuckChips[active];

  const swap = reduce
    ? { duration: 0 }
    : { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <section className="lp-section" id="stuck">
      <div className="lp-shell">
        <div className="lp-stuck-section">
          <div className="lp-stuck-grid">
            <div className="lp-stuck-photo">
              {stuckChips.map((item, i) => (
                <Image
                  key={item.image}
                  src={item.image}
                  alt=""
                  fill
                  sizes="(max-width: 860px) 100vw, 420px"
                  className={i === active ? "is-active" : undefined}
                />
              ))}
              <span className="lp-stuck-photo-tag">
                <span aria-hidden className="lp-dot" />
                {chip.label}
              </span>
            </div>

            <div>
              <p className="lp-section-label lp-section-label-ink mb-4">
                {stuckCopy.label}
              </p>
              <h2 className="lp-stuck-h2">{stuckCopy.heading}</h2>
              <p className="lp-stuck-dek">{stuckCopy.dek}</p>

              <div className="lp-stuck-chips" role="group" aria-label="Pick a situation">
                {stuckChips.map((item, i) => (
                  <button
                    key={item.label}
                    type="button"
                    className={`lp-chip${selected === i ? " is-selected" : ""}`}
                    aria-pressed={selected === i}
                    onClick={() => setSelected(selected === i ? null : i)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div aria-live="polite" className="lp-stuck-result">
                <AnimatePresence initial={false} mode="wait">
                  {selected === null ? (
                    <motion.p
                      key="placeholder"
                      className="lp-result-placeholder"
                      initial={reduce ? false : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduce ? undefined : { opacity: 0, y: -6 }}
                      transition={swap}
                    >
                      {stuckCopy.placeholder}
                    </motion.p>
                  ) : (
                    <motion.div
                      key={selected}
                      className="lp-result-card"
                      initial={reduce ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduce ? undefined : { opacity: 0, y: -8 }}
                      transition={swap}
                    >
                      <span aria-hidden className="lp-result-icon">
                        {chip.icon}
                      </span>
                      <span>
                        <p className="lp-result-name">{chip.name}</p>
                        <p className="lp-result-price">{chip.price}</p>
                        <p className="lp-result-desc">{chip.desc}</p>
                        <Link className="lp-result-link" href={chip.href}>
                          {stuckCopy.resultLink}
                          <span aria-hidden className="lp-arrow">
                            →
                          </span>
                        </Link>
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
