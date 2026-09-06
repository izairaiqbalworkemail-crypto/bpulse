"use client";

import Image from "next/image";
import Link from "next/link";
import { Slide } from "@/components/landing/Reveal";
import { PricingLadder } from "@/components/offer/PricingLadder";
import { PulseCheckIntake } from "@/components/intake/PulseCheckIntake";
import { SealedStill } from "@/components/SealedStill";
import { VettedPay } from "@/components/VettedPay";
import { checkRunner } from "@/content/check";
import { termsCredit } from "@/content/home";
import { getSpecialist } from "@/content/specialists";

/**
 * 07 · THE TERMS — gold field, the published ladder, one still.
 */
export function Terms() {
  const runner = getSpecialist(checkRunner.id);

  return (
    <section
      id="terms"
      aria-labelledby="terms-heading"
      className="ribbon relative scroll-mt-[5.75rem] bg-signal text-iron md:scroll-mt-28"
    >
      <div className="stage-container py-24 md:py-32">
        <p className="font-plex-mono text-[12px] uppercase tracking-[0.14em] text-iron/70">
          07 · THE TERMS
        </p>
        <h2
          id="terms-heading"
          className="mt-5 max-w-[16ch] font-newsreader type-display text-[40px] leading-[1.08] md:text-[52px]"
        >
          Published. Before a call.
        </h2>

        <div className="mt-16 grid items-start gap-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <PricingLadder onGold />

          <Slide from="right" delay={0.08}>
            <SealedStill caption="Written. Sealed. You leave with the keys." />
            {runner.photo ? (
              <Link
                href={`/team/${runner.id}`}
                className="mt-8 flex items-center gap-4 border-t border-iron/15 pt-6"
              >
                <Image
                  src={runner.photo}
                  alt={runner.name}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full object-cover object-top"
                />
                <span>
                  <span className="block font-newsreader text-[18px] text-iron">
                    {runner.name}
                  </span>
                  <span className="block font-newsreader text-[14px] text-iron/70">
                    {checkRunner.line}
                  </span>
                </span>
              </Link>
            ) : null}
          </Slide>
        </div>

        <p className="mt-16 max-w-[42ch] font-newsreader text-[22px] leading-[1.35] text-iron">
          {termsCredit}
        </p>

        <p className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
          <Link href="/read" className="btn btn-iron min-h-12 px-6 text-[15px]">
            Start with the Read
          </Link>
          <Link
            href="/check"
            className="font-plex-sans text-[15px] underline decoration-iron/30 underline-offset-4 hover:decoration-iron"
          >
            How the five days work
          </Link>
        </p>

        <div className="mt-14">
          <VettedPay surface="signal" />
        </div>

        <div
          id="intake"
          className="mt-12 scroll-mt-[5.75rem] md:scroll-mt-28"
        >
          <PulseCheckIntake source="home" />
        </div>
      </div>
    </section>
  );
}
