"use client";

import { Item, Stagger } from "@/components/landing/Reveal";
import { EpisodeHead } from "@/components/episode/Episode";
import { ObjectPlate } from "@/components/objects/ObjectPlate";
import { aboutNot } from "@/content/about";

export function AboutNot() {
  const last = aboutNot[aboutNot.length - 1];
  const rest = aboutNot.slice(0, -1);

  return (
    <>
      <EpisodeHead n="06" kicker="WHAT WE ARE NOT" id="not" heading="What we are not." />
      <Stagger className="mt-12 grid gap-5 md:grid-cols-2" gap={0.07}>
        {rest.map((line) => (
          <Item key={line}>
            <ObjectPlate className="h-full">
              <p className="font-newsreader text-[22px] leading-[1.35]">{line}</p>
            </ObjectPlate>
          </Item>
        ))}
      </Stagger>
      {last ? (
        <div className="mt-5">
          <ObjectPlate tone="iron">
            <p className="max-w-[28ch] font-newsreader text-[26px] leading-[1.25] md:text-[32px]">
              {last}
            </p>
          </ObjectPlate>
        </div>
      ) : null}
    </>
  );
}
