"use client";

import { Item, Stagger } from "@/components/landing/Reveal";
import { EpisodeHead } from "@/components/episode/Episode";
import { pricingExcluded } from "@/content/pricing";

export function PriceExcluded() {
  return (
    <>
      <EpisodeHead
        n="05"
        kicker="WHAT IS NOT INCLUDED"
        id="excluded"
        tone="cocoa"
        heading="What we do not sell."
      />
      <Stagger className="mt-12 grid gap-5 md:grid-cols-3" gap={0.07}>
        {pricingExcluded.map((row) => (
          <Item key={row.title}>
            <article className="h-full border-l-2 border-paper/20 pl-5">
              <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-paper/60">
                {row.title}
              </p>
              <p className="mt-4 font-newsreader text-[20px] leading-[1.35] text-paper">{row.body}</p>
            </article>
          </Item>
        ))}
      </Stagger>
    </>
  );
}
