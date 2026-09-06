"use client";

import { Item, Stagger } from "@/components/landing/Reveal";
import { EpisodeHead } from "@/components/episode/Episode";
import { ObjectRow } from "@/components/objects/ObjectRow";
import { pricingIncluded } from "@/content/pricing";

export function PriceIncluded() {
  return (
    <>
      <EpisodeHead
        n="04"
        kicker="WHAT IS INCLUDED, ALWAYS"
        id="included"
        heading="None of this is an upsell."
      />
      <Stagger className="mt-12 flex flex-col gap-3" gap={0.07}>
        {pricingIncluded.items.map((item, index) => (
          <Item key={item}>
            <ObjectRow className="grid grid-cols-[2.25rem_minmax(0,1fr)] items-baseline gap-4">
              <span className="font-plex-mono text-[12px] text-ink/70">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="max-w-[48ch] font-newsreader text-[20px] leading-[1.4] text-iron">
                {item}
              </p>
            </ObjectRow>
          </Item>
        ))}
      </Stagger>
    </>
  );
}
