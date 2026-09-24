"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { processSteps } from "@/content/landing-sections";
import { landEase } from "@/components/landing/Reveal";
import { SectionHead } from "@/components/landing/SectionHead";

/**
 * The four stages gather from a scatter and join into one list.
 * Each card keeps its own offset so the join reads as assembly, not fade.
 */
const scatter = [
  { x: -60, y: 30, rotate: -4 },
  { x: -20, y: -40, rotate: 3 },
  { x: 20, y: 40, rotate: -3 },
  { x: 60, y: -30, rotate: 4 },
] as const;

export function ProcessRail() {
  const reduce = useReducedMotion();

  return (
    <section className="lp-section" id="process">
      <div className="lp-shell">
        <SectionHead
          label="What happens"
          heading="Read, diagnose, build, handover."
          dek="Scroll in — watch it come together, the same way the work does."
        />
        <div className="lp-process-wrap">
          <div className="lp-process-list">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.n}
                className="lp-p-card"
                initial={
                  reduce ? false : { opacity: 0, ...scatter[i] }
                }
                whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                viewport={{ once: true, margin: "-12% 0px" }}
                transition={{ duration: 0.7, ease: landEase, delay: i * 0.07 }}
              >
                <p className="lp-p-num">{step.n}</p>
                <h3>{step.label}</h3>
                <p>{step.body}</p>
              </motion.div>
            ))}
          </div>
          <div className="lp-process-photo">
            <Image
              src="/landing/process.jpg"
              alt="Two engineers at a desk mid-build, one screen showing a deploy log."
              fill
              sizes="(max-width: 900px) 100vw, 480px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
