"use client";

import { Reveal } from "@/components/landing/Reveal";

type Tier = {
  name: string;
  price: string;
  body: string;
  featured?: boolean;
};

type TierTableProps = {
  tiers: readonly Tier[];
  caption?: string;
};

export function TierTable({ tiers, caption }: TierTableProps) {
  return (
    <div>
      {caption ? (
        <p className="mb-2 font-plex-mono text-[13px] uppercase tracking-[0.08em] text-ink/70">
          {caption}
        </p>
      ) : null}
      <div className="divide-y divide-iron/15 border-t border-iron/20">
        {tiers.map((tier, index) => (
          <Reveal key={tier.name} delay={index * 0.04}>
            <div
              className={`grid gap-3 py-8 md:grid-cols-[9rem_1fr] md:items-baseline ${
                tier.featured ? "border-l-2 border-signal pl-5" : ""
              }`}
            >
              <p
                className={`font-newsreader tabular-nums ${
                  tier.featured
                    ? "text-[22px] leading-none text-iron"
                    : "text-[18px] text-ink"
                }`}
              >
                {tier.price}
              </p>
              <div>
                <p className="font-newsreader text-[20px] leading-[1.2] text-iron">
                  {tier.name}
                </p>
                <p className="mt-2 max-w-[48ch] font-newsreader text-[16px] leading-[1.5] text-ink">
                  {tier.body}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
