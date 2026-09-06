"use client";

import { Item, Stagger } from "@/components/landing/Reveal";
import { EpisodeHead } from "@/components/episode/Episode";
import { ObjectPlate } from "@/components/objects/ObjectPlate";
import { pricingQuestions } from "@/content/pricing";

export function PriceQuestions() {
  return (
    <>
      <EpisodeHead
        n="07"
        kicker="THE QUESTIONS"
        id="questions"
        tone="cocoa"
        heading="The questions."
      />
      <Stagger className="mt-12 grid gap-5 md:grid-cols-2" gap={0.07}>
        {pricingQuestions.map((item) => (
          <Item key={item.q}>
            <ObjectPlate className="h-full">
              <h3 className="max-w-[28ch] font-newsreader text-[24px] leading-[1.2]">
                {item.q}
              </h3>
              <p className="mt-3 max-w-[42ch] font-newsreader text-[17px] leading-[1.5] text-ink">
                {item.a}
              </p>
            </ObjectPlate>
          </Item>
        ))}
      </Stagger>
    </>
  );
}
