"use client";

import { Item, Stagger } from "@/components/landing/Reveal";
import { EpisodeHead } from "@/components/episode/Episode";
import { ObjectPlate } from "@/components/objects/ObjectPlate";
import { aboutBeliefs } from "@/content/about";

export function AboutBeliefs() {
  return (
    <>
      <EpisodeHead
        n="02"
        kicker="WHAT WE BELIEVE"
        id="believe"
        heading="Belief, then proof."
      />
      <Stagger className="mt-12 grid gap-5 md:grid-cols-2" gap={0.07}>
        {aboutBeliefs.map((belief, index) => (
          <Item key={belief.statement}>
            <ObjectPlate
              href={belief.href}
              tone={index === 0 ? "iron" : "paper"}
              className="h-full"
            >
              <p className="font-plex-mono text-[11px] uppercase tracking-[0.1em] opacity-60">
                {belief.mark}
              </p>
              <h3 className="mt-4 max-w-[18ch] font-newsreader text-[26px] leading-[1.15] md:text-[28px]">
                {belief.statement}
              </h3>
              <p className="mt-3 max-w-[42ch] font-plex-sans text-[15px] leading-[1.55] opacity-80">
                {belief.proof}
              </p>
              <p className="mt-6 font-plex-sans text-[14px] underline decoration-current/30 underline-offset-4">
                Open it
              </p>
            </ObjectPlate>
          </Item>
        ))}
      </Stagger>
    </>
  );
}
