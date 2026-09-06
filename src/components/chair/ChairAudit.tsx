"use client";

import { Count, Item, Reveal, Stagger } from "@/components/landing/Reveal";
import { EpisodeHead } from "@/components/episode/Episode";
import { ObjectRow } from "@/components/objects/ObjectRow";
import { auditPrice, secondChairAudit } from "@/content/second-chair";

export function ChairAudit() {
  return (
    <>
      <div className="grid items-end gap-12 lg:grid-cols-[minmax(0,1fr)_14rem]">
        <EpisodeHead
          n="05"
          kicker="THE AUDIT"
          id="audit"
          tone="cocoa"
          heading={secondChairAudit.claim}
        />
        <Reveal delay={0.12}>
          <p className="font-plex-mono text-[40px] leading-none tabular-nums text-rag md:text-[48px]">
            <Count prefix="$" to={auditPrice} />
          </p>
        </Reveal>
      </div>
      <Reveal delay={0.18}>
        <p className="mt-6 font-plex-mono text-[13px] uppercase tracking-[0.08em] text-rag/70">
          {secondChairAudit.buyable}
        </p>
      </Reveal>
      <Stagger className="mt-12 flex flex-col gap-3" delay={0.1} gap={0.05}>
        {secondChairAudit.looks.map((row) => (
          <Item key={row.name}>
            <ObjectRow
              tone="iron"
              className="grid gap-2 md:grid-cols-[14rem_minmax(0,1fr)] md:items-baseline"
            >
              <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-rag/70">
                {row.name}
              </p>
              <p className="font-newsreader text-[18px] leading-[1.45] text-rag">
                {row.body}
              </p>
            </ObjectRow>
          </Item>
        ))}
      </Stagger>
    </>
  );
}
