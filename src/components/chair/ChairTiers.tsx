"use client";

import { Count, Item, Reveal, Stagger } from "@/components/landing/Reveal";
import { ObjectRow } from "@/components/objects/ObjectRow";
import { chairPrices, secondChairTiers } from "@/content/second-chair";
import { noDiscount } from "@/content/ladder";

/**
 * Five published prices. On Call is the object. The rest stay a ledger.
 */
export function ChairTiers() {
  const featured = secondChairTiers.find((tier) => tier.id === "on-call");
  const rest = secondChairTiers.filter((tier) => tier.id !== "on-call");

  return (
    <div>
      {featured ? (
        <Reveal className="price-object mt-12 bg-rag text-iron">
          <p className="font-plex-mono text-[12px] uppercase tracking-[0.1em] text-ink/70">
            {featured.meter}
          </p>
          <p className="mt-3 font-newsreader type-display text-[40px] leading-none tabular-nums md:text-[52px]">
            <Count prefix="$" to={chairPrices.onCall} />
            <span className="ml-2 font-plex-sans text-[18px] tracking-normal">
              per month
            </span>
          </p>
          <p className="mt-3 font-plex-sans text-[18px] text-iron">{featured.name}</p>
          <p className="mt-3 max-w-[46ch] font-plex-sans text-[16px] leading-[1.55] text-ink">
            {featured.body}
          </p>
        </Reveal>
      ) : null}

      <Stagger className="mt-4 flex flex-col gap-3" gap={0.05}>
        {rest.map((tier) => (
          <Item key={tier.id}>
            <ObjectRow
              tone="gold"
              className="grid gap-2 md:grid-cols-[12rem_11rem_minmax(0,1fr)] md:items-baseline md:gap-8"
            >
              <p className="font-plex-sans text-[16px]">{tier.name}</p>
              <p className="font-plex-mono text-[15px] tabular-nums">{tier.price}</p>
              <p className="max-w-[46ch] font-plex-sans text-[16px] leading-[1.5] text-ink">
                {tier.body}
              </p>
            </ObjectRow>
          </Item>
        ))}
      </Stagger>
      <Reveal delay={0.1}>
        <p className="mt-10 max-w-[52ch] font-plex-sans text-[15px] leading-[1.55] text-iron/80">
          {noDiscount}
        </p>
      </Reveal>
    </div>
  );
}
