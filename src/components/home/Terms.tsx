"use client";

import Image from "next/image";
import Link from "next/link";
import { Count, Slide } from "@/components/landing/Reveal";
import { PulseCheckIntake } from "@/components/intake/PulseCheckIntake";
import { SealedStill } from "@/components/SealedStill";
import { VettedPay } from "@/components/VettedPay";
import { checkRunner } from "@/content/check";
import { termsCredit } from "@/content/home";
import { offer } from "@/content/offer";
import { getSpecialist } from "@/content/specialists";

/**
 * 07 · THE TERMS — gold field, type, one still. No nested cards.
 */
export function Terms() {
  const runner = getSpecialist(checkRunner.id);

  return (
    <section
      id="terms"
      aria-labelledby="terms-heading"
      className="relative scroll-mt-[5.75rem] bg-signal text-iron md:scroll-mt-28"
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

        <div className="mt-16 grid items-start gap-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div>
            <article className="border-t border-iron/15 pt-8">
              <p className="font-plex-mono text-[12px] uppercase tracking-[0.1em] text-iron/70">
                {offer.check.name}
              </p>
              <p className="mt-3 font-newsreader type-display-xl text-[64px] leading-none md:text-[80px]">
                <Count prefix="$" to={offer.check.price} />
              </p>
              <p className="mt-3 font-plex-mono text-[13px] uppercase tracking-[0.06em] text-iron/70">
                {offer.check.duration}
              </p>
              <p className="mt-4 max-w-[38ch] font-newsreader text-[18px] leading-[1.4] text-iron/80">
                Keep, repair or rebuild — in writing. Credited in full if we
                build within 30 days.
              </p>
            </article>

            <article className="mt-10 border-t border-iron/15 pt-8">
              <p className="font-plex-mono text-[12px] uppercase tracking-[0.1em] text-iron/70">
                {offer.close.name}
              </p>
              <p className="mt-3 font-newsreader type-display-m text-[36px] leading-[1.05] md:text-[40px]">
                {offer.close.priceRange}
              </p>
              <p className="mt-4 max-w-[38ch] font-newsreader text-[17px] leading-[1.4] text-iron/80">
                {offer.close.description}
              </p>
            </article>

            <article className="mt-10 border-t border-iron/15 pt-8">
              <p className="font-plex-mono text-[12px] uppercase tracking-[0.1em] text-iron/70">
                {offer.standing.name}
              </p>
              <p className="mt-3 font-newsreader type-display-m text-[36px] leading-[1.05] md:text-[40px]">
                {offer.standing.priceRange}
              </p>
              <p className="mt-4 max-w-[38ch] font-newsreader text-[17px] leading-[1.4] text-iron/80">
                After launch, until you don&apos;t need us.
              </p>
            </article>
          </div>

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

        <p className="mt-8">
          <Link
            href="/check"
            className="btn btn-iron min-h-12 px-6 text-[15px]"
          >
            How the five days work
          </Link>
        </p>

        <div className="mt-14">
          <VettedPay surface="signal" />
        </div>

        <div
          id="intake"
          className="mt-12 scroll-mt-[5.75rem] border-t border-iron/15 bg-rag p-6 text-iron md:scroll-mt-28 md:p-10"
        >
          <PulseCheckIntake source="home" />
        </div>
      </div>
    </section>
  );
}
