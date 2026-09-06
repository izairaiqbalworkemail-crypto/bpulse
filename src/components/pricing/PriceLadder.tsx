"use client";

import { Count, Item, Stagger } from "@/components/landing/Reveal";
import { EpisodeHead } from "@/components/episode/Episode";
import { ObjectPlate } from "@/components/objects/ObjectPlate";
import { pricingLadder } from "@/content/pricing";
import { ladderPrices } from "@/content/ladder";
import { track } from "@/lib/analytics/public";

const counted: Partial<Record<(typeof pricingLadder)[number]["id"], number>> = {
  session: ladderPrices.session,
  check: ladderPrices.check,
  slice: ladderPrices.slice,
};

export function PriceLadder() {
  return (
    <>
      <EpisodeHead
        n="01"
        kicker="THE LADDER"
        id="ladder"
        tone="signal"
        heading="Published."
      />
      <Stagger className="mt-12 grid gap-4 md:grid-cols-2" gap={0.07}>
        {pricingLadder.map((rung, index) => {
          const amount = counted[rung.id];
          return (
            <Item key={rung.id} className={index === 0 ? "md:col-span-2" : undefined}>
              <ObjectPlate
                href={rung.href}
                tone="paper"
                className="h-full bg-rag"
                onClick={() => track("pricing.rung.clicked", { rung: rung.id })}
              >
                <p className="font-plex-mono text-[12px] uppercase tracking-[0.1em] text-ink/60">
                  {rung.name}
                </p>
                <p className="mt-3 font-newsreader type-display text-[36px] leading-none tabular-nums md:text-[44px]">
                  {amount ? <Count prefix="$" to={amount} /> : rung.price}
                </p>
                <p className="mt-4 max-w-[46ch] font-plex-sans text-[16px] leading-[1.5] text-iron/80">
                  {rung.body}
                </p>
              </ObjectPlate>
            </Item>
          );
        })}
      </Stagger>
    </>
  );
}
