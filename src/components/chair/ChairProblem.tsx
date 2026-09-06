"use client";

import { Reveal, Rise } from "@/components/landing/Reveal";
import { secondChair } from "@/content/second-chair";

export function ChairProblem() {
  return (
    <div className="grid items-end gap-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
      <div>
        <Reveal>
          <p className="font-plex-mono text-[12px] uppercase tracking-[0.14em] text-rag/70">
            01 · THE PROBLEM
          </p>
        </Reveal>
        <div className="episode-rule text-rag" aria-hidden="true" />
        <h2
          id="problem-heading"
          className="mt-8 max-w-[14ch] font-newsreader type-display text-[42px] leading-[1.06] text-rag md:text-[60px]"
        >
          <Rise delay={0.06}>
            <span className="block">{secondChair.problem[0]}</span>
          </Rise>
        </h2>
      </div>
      <Rise delay={0.16}>
        <p className="font-newsreader text-[26px] leading-[1.25] text-rag md:text-[28px]">
          {secondChair.problem[1]}
        </p>
        <p className="mt-4 font-newsreader text-[26px] leading-[1.25] text-rag/70 md:text-[28px]">
          {secondChair.problem[2]}
        </p>
        <p className="mt-8 max-w-[36ch] border-t border-rag/15 pt-6 font-newsreader text-[18px] leading-[1.45] text-rag/80">
          {secondChair.problemDek}
        </p>
      </Rise>
    </div>
  );
}
