"use client";

import { Item, Stagger } from "@/components/landing/Reveal";
import { ObjectRow } from "@/components/objects/ObjectRow";
import { secondChairMonth } from "@/content/second-chair";

/**
 * Four weeks as a sequence of objects. Not a syllabus card.
 */
export function WeekSpine() {
  return (
    <Stagger className="mt-12" delay={0.08} gap={0.07}>
      {secondChairMonth.map((week, index) => (
        <Item key={week.id} className="py-2 first:pt-0 last:pb-0">
          <ObjectRow className="grid grid-cols-[3.25rem_minmax(0,1fr)] items-baseline gap-6">
            <span className="relative z-10 font-plex-mono text-[13px] tabular-nums text-ink/55">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="font-newsreader text-[24px] leading-[1.2] text-iron md:text-[26px]">
                {week.label}
              </p>
              <p className="mt-2 max-w-[48ch] font-plex-sans text-[16px] leading-[1.55] text-ink">
                {week.detail}
              </p>
            </div>
          </ObjectRow>
        </Item>
      ))}
    </Stagger>
  );
}
