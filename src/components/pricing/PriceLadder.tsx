"use client";

import { Item, Stagger } from "@/components/landing/Reveal";
import { EpisodeHead } from "@/components/episode/Episode";
import { ObjectPlate } from "@/components/objects/ObjectPlate";
import { pricingLadder } from "@/content/pricing";
import { track } from "@/lib/analytics/public";

export function PriceLadder() {
  return (
    <>
      <EpisodeHead
        n="02"
        kicker="HOW WE WORK"
        id="ladder"
        tone="signal"
        heading="Published."
      />
      <Stagger className="mt-12 grid gap-4 md:grid-cols-2" gap={0.07}>
        {pricingLadder.map((rung, index) => (
          <Item key={rung.id} className={index === 0 ? "md:col-span-2" : undefined}>
            <ObjectPlate
              href={rung.href}
              tone="paper"
              className="h-full bg-paper"
              onClick={() => track("pricing.rung.clicked", { rung: rung.id })}
            >
              <p className="font-plex-mono text-[12px] uppercase tracking-[0.1em] text-quill/60">
                {rung.name}
              </p>
              <p className="mt-3 font-newsreader type-display text-[36px] leading-none tabular-nums md:text-[44px]">
                {rung.price}
              </p>
              <p className="mt-4 max-w-[46ch] font-plex-sans text-[16px] leading-[1.5] text-ink/80">
                {rung.body}
              </p>
            </ObjectPlate>
          </Item>
        ))}
      </Stagger>
    </>
  );
}
