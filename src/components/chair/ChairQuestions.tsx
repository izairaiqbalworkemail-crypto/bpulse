"use client";

import { Item, Stagger } from "@/components/landing/Reveal";
import { EpisodeHead } from "@/components/episode/Episode";
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
            <article className="border-t border-paper/15 pt-6">
              <h3 className="max-w-[26ch] font-newsreader text-[24px] leading-[1.2] text-paper">
                {item.q}
              </h3>
              <p className="mt-3 max-w-[42ch] font-newsreader text-[17px] leading-[1.5] text-paper/80">
                {item.a}
              </p>
            </article>
          </Item>
        ))}
      </Stagger>
    </>
  );
}
