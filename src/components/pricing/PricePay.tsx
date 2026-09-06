"use client";

import { Item, Reveal, Stagger } from "@/components/landing/Reveal";
import { EpisodeHead } from "@/components/episode/Episode";
import { ObjectRow } from "@/components/objects/ObjectRow";
import { pricingPay } from "@/content/pricing";

export function PricePay() {
  return (
    <>
      <EpisodeHead n="06" kicker="HOW PAYMENT WORKS" id="pay" heading="How you pay." />
      <Stagger className="mt-12 flex flex-col gap-3" gap={0.07}>
        {pricingPay.steps.map((step, index) => (
          <Item key={step}>
            <ObjectRow className="grid grid-cols-[2.25rem_minmax(0,1fr)] items-baseline gap-4">
              <span className="font-plex-mono text-[13px] tabular-nums text-ink/70">
                {index + 1}
              </span>
              <p className="font-newsreader text-[22px] leading-[1.35] text-iron">{step}</p>
            </ObjectRow>
          </Item>
        ))}
      </Stagger>
      <Reveal delay={0.12}>
        <p className="mt-10 max-w-[48ch] font-plex-sans text-[16px] leading-[1.55] text-ink">
          {pricingPay.note}
        </p>
      </Reveal>
    </>
  );
}
