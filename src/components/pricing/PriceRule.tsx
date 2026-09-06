"use client";

import { Reveal } from "@/components/landing/Reveal";
import { EpisodeHead } from "@/components/episode/Episode";
import { ObjectPlate } from "@/components/objects/ObjectPlate";
import { pricingRule } from "@/content/pricing";

export function PriceRule() {
  return (
    <>
      <EpisodeHead n="02" kicker="THE RULE" id="rule" heading="The same for everyone." />
      <Reveal delay={0.08} className="mt-10">
        <ObjectPlate>
          <p className="max-w-[40ch] font-newsreader text-[22px] leading-[1.35]">
            {pricingRule.statement}
          </p>
          <ul className="mt-8">
            {pricingRule.why.map((line) => (
              <li
                key={line}
                className="border-t border-iron/10 py-3 font-plex-sans text-[16px] leading-[1.5] text-ink first:border-t-0 first:pt-0"
              >
                {line}
              </li>
            ))}
          </ul>
        </ObjectPlate>
      </Reveal>
    </>
  );
}
