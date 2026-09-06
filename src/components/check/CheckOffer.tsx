"use client";

import Link from "next/link";
import { Count, Item, Reveal, Rise, Stagger } from "@/components/landing/Reveal";
import { checkOffer } from "@/content/check";
import { offer } from "@/content/offer";

export function CheckOffer() {
  return (
    <section
      id="offer"
      aria-labelledby="offer-heading"
      className="ribbon relative flex min-h-[100svh] flex-col bg-signal text-iron"
    >
      <div className="stage-container flex flex-1 flex-col justify-center pt-28 pb-16 md:pt-32">
        <Reveal>
          <p className="font-plex-mono text-[12px] uppercase tracking-[0.14em] text-iron/70">
            01 · THE OFFER
          </p>
        </Reveal>
        <div className="episode-rule text-iron" aria-hidden="true" />
        <Rise delay={0.06}>
          <h1
            id="offer-heading"
            className="mt-5 font-newsreader type-display-xl text-[64px] leading-none md:text-[96px]"
          >
            <Count prefix="$" to={offer.check.price} />
          </h1>
        </Rise>
        <Reveal delay={0.12}>
          <p className="mt-4 font-plex-mono text-[13px] uppercase tracking-[0.06em] text-iron/70">
            {offer.check.duration}.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="mt-6 max-w-[36ch] font-newsreader text-[22px] leading-[1.3] md:text-[26px]">
            {checkOffer.verdict}
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <p className="mt-4 max-w-[36ch] font-newsreader text-[18px] leading-[1.4] text-iron/80">
            {checkOffer.credit}
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link href="#start" className="btn btn-iron min-h-12 px-6 text-[15px]">
              Reserve a slot
            </Link>
            <Link
              href="#deliverable"
              className="font-plex-sans text-[15px] text-iron underline decoration-iron/30 underline-offset-4 hover:decoration-iron"
            >
              See a real report ↓
            </Link>
          </p>
        </Reveal>
      </div>
      <Stagger
        className="stage-container grid grid-cols-2 gap-x-8 gap-y-4 border-t border-iron/15 py-5 md:grid-cols-4"
        gap={0.06}
      >
        {checkOffer.facts.map((fact) => (
          <Item key={fact}>
            <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-iron/70">
              {fact}
            </p>
          </Item>
        ))}
      </Stagger>
    </section>
  );
}
