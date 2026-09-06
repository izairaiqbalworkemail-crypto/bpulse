"use client";

import { Item, Stagger } from "@/components/landing/Reveal";
import { EpisodeHead } from "@/components/episode/Episode";
import { ObjectRow } from "@/components/objects/ObjectRow";
import { pricingRoute } from "@/content/pricing";

export function PriceRoute() {
  return (
    <>
      <EpisodeHead
        n="03"
        kicker="WHICH RUNG"
        id="which"
        tone="cocoa"
        heading="Which one are you."
      />
      <Stagger className="mt-12 flex flex-col gap-3" gap={0.07}>
        {pricingRoute.map((row) => (
          <Item key={row.if}>
            <ObjectRow
              href={row.href}
              className="grid grid-cols-[minmax(0,1fr)_8rem] items-baseline gap-4 md:grid-cols-[minmax(0,1fr)_12rem]"
            >
              <p className="font-newsreader text-[20px] leading-[1.3] text-iron">{row.if}</p>
              <p className="font-plex-sans text-[16px] text-iron underline decoration-iron/25 underline-offset-4">
                {row.start}
              </p>
            </ObjectRow>
          </Item>
        ))}
      </Stagger>
    </>
  );
}
