"use client";

import { Reveal, Rise } from "@/components/landing/Reveal";
import { aboutWhat } from "@/content/about";

export function AboutWhat() {
  return (
    <>
      <Reveal>
        <p className="font-plex-mono text-[12px] uppercase tracking-[0.14em] text-rag/70">
          01 · WHAT THIS IS
        </p>
      </Reveal>
      <div className="episode-rule text-rag" aria-hidden="true" />
      <Rise delay={0.06}>
        <h1
          id="what-heading"
          className="mt-8 max-w-[12ch] font-newsreader type-display text-[48px] leading-[1.02] text-rag md:text-[72px]"
        >
          {aboutWhat.heading}
        </h1>
      </Rise>
      <Reveal delay={0.16}>
        <p className="mt-8 max-w-[36ch] font-newsreader text-[20px] leading-[1.4] text-rag/75">
          {aboutWhat.dek}
        </p>
      </Reveal>
    </>
  );
}
