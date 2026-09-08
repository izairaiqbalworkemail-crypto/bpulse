"use client";

import { Item, Stagger } from "@/components/landing/Reveal";
import { EpisodeHead } from "@/components/episode/Episode";
import Link from "next/link";
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
        {aboutBeliefs.map((belief) => (
          <Item key={belief.statement}>
            <Link href={belief.href} className="block h-full border-t border-ink/10 pt-6">
              <p className="font-plex-mono text-[11px] uppercase tracking-[0.1em] text-quill/70">
                {belief.mark}
              </p>
              <h3 className="mt-4 max-w-[18ch] font-newsreader text-[26px] leading-[1.15] text-ink md:text-[28px]">
                {belief.statement}
              </h3>
              <p className="mt-3 max-w-[42ch] font-plex-sans text-[15px] leading-[1.55] text-quill">
                {belief.proof}
              </p>
              <p className="mt-6 font-plex-sans text-[14px] text-ink underline decoration-ink/30 underline-offset-4">
                Open it
              </p>
            </Link>
          </Item>
        ))}
      </Stagger>
    </>
  );
}
