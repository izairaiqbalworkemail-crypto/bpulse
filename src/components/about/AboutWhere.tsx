"use client";

import { Item, Stagger } from "@/components/landing/Reveal";
import { EpisodeHead } from "@/components/episode/Episode";
import { ObjectRow } from "@/components/objects/ObjectRow";
import { aboutWhere } from "@/content/about";

export function AboutWhere() {
  return (
    <>
      <EpisodeHead
        n="05"
        kicker="WHERE WE ARE"
        id="where"
        tone="cocoa"
        heading="The facts."
      />
      <Stagger className="mt-12 flex flex-col gap-3" gap={0.07}>
        {aboutWhere.map((row) => (
          <Item key={row.fact}>
            <ObjectRow
              tone="iron"
              className="grid gap-2 md:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] md:items-baseline"
            >
              <p className="font-newsreader text-[20px] leading-[1.3]">{row.fact}</p>
              <p className="font-plex-sans text-[16px] leading-[1.5] opacity-70">{row.note}</p>
            </ObjectRow>
          </Item>
        ))}
      </Stagger>
    </>
  );
}
