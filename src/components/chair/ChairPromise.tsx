"use client";

import { Item, Reveal, Rise, Stagger } from "@/components/landing/Reveal";
import { ObjectPlate } from "@/components/objects/ObjectPlate";
import { ObjectRow } from "@/components/objects/ObjectRow";
import { secondChair, secondChairSkills } from "@/content/second-chair";

export function ChairPromise() {
  return (
    <>
      <Reveal>
        <p className="font-plex-mono text-[12px] uppercase tracking-[0.14em] text-quill/70">
          02 · THE PROMISE
        </p>
      </Reveal>
      <div className="episode-rule text-ink" aria-hidden="true" />
      <Rise delay={0.06}>
        <h2
          id="promise-heading"
          className="mt-6 max-w-[16ch] font-newsreader type-display text-[36px] leading-[1.08] text-ink md:text-[48px]"
        >
          {secondChair.promise[0]} {secondChair.promise[1]}
        </h2>
      </Rise>
      <Stagger className="mt-12 flex flex-col gap-3" delay={0.12} gap={0.05}>
        {secondChair.promiseWhat.map((item, index) => (
          <Item key={item}>
            <ObjectRow className="grid grid-cols-[2.5rem_minmax(0,1fr)] items-baseline gap-4">
              <span className="font-plex-mono text-[12px] tabular-nums text-quill/55">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-newsreader text-[19px] leading-[1.4] text-ink">
                {item}
              </span>
            </ObjectRow>
          </Item>
        ))}
      </Stagger>
      <Stagger className="mt-10 grid gap-4 md:grid-cols-2" delay={0.2} gap={0.06}>
        {secondChairSkills.map((skill) => (
          <Item key={skill.name}>
            <ObjectPlate>
              <p className="font-newsreader text-[20px] leading-[1.25] text-ink">
                {skill.name}
              </p>
              <p className="mt-3 max-w-[40ch] font-plex-sans text-[15px] leading-[1.55] text-quill">
                {skill.body}
              </p>
            </ObjectPlate>
          </Item>
        ))}
      </Stagger>
    </>
  );
}
