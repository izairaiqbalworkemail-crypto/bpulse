"use client";

import { Item, Stagger } from "@/components/landing/Reveal";
import { EpisodeHead } from "@/components/episode/Episode";
import { ObjectPlate } from "@/components/objects/ObjectPlate";
import { secondChairQuestions } from "@/content/second-chair";

export function ChairQuestions() {
  return (
    <>
      <EpisodeHead
        n="07"
        kicker="THE QUESTIONS"
        id="questions"
        tone="cocoa"
        heading="Including the one you are already asking."
      >
        Visible. No accordion.
      </EpisodeHead>
      <Stagger className="mt-14 grid gap-4 md:grid-cols-2" gap={0.07}>
        {secondChairQuestions.map((item) => (
          <Item key={item.q}>
            <ObjectPlate>
              <h3 className="max-w-[26ch] font-newsreader text-[24px] leading-[1.2] text-iron">
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
