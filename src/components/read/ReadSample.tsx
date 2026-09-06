"use client";

import Link from "next/link";
import { EpisodeHead } from "@/components/episode/Episode";
import { readSpecimen } from "@/content/read";

export function ReadSample() {
  return (
    <>
      <EpisodeHead
        n="02"
        kicker="WHAT YOU GET"
        id="sample"
        tone="cocoa"
        heading="A real read."
      />
      <article className="mt-12 max-w-[40rem]">
        <p className="font-plex-mono text-[12px] uppercase tracking-[0.1em] text-rag/50">
          {readSpecimen.kicker}
          <span className="ml-4 font-normal normal-case tracking-normal">
            prepared {readSpecimen.prepared}
          </span>
        </p>
        <h3 className="mt-4 max-w-[28ch] font-newsreader text-[28px] leading-[1.2] text-rag md:text-[32px]">
          {readSpecimen.title}
        </h3>

        <p className="mt-10 font-plex-mono text-[12px] uppercase tracking-[0.08em] text-rag/50">
          {readSpecimen.told.label}
        </p>
        <p className="mt-3 max-w-[58ch] font-newsreader text-[18px] leading-[1.45] text-rag md:text-[20px]">
          {readSpecimen.told.body}
        </p>

        <p className="mt-10 font-plex-mono text-[12px] uppercase tracking-[0.08em] text-rag/50">
          {readSpecimen.means.label}
        </p>
        <p className="mt-3 max-w-[58ch] font-newsreader text-[18px] leading-[1.45] text-rag md:text-[20px]">
          {readSpecimen.means.body}
        </p>
        <p className="mt-4">
          <Link
            href={readSpecimen.means.href}
            className="font-plex-sans text-[15px] text-rag underline decoration-rag/30 underline-offset-4"
          >
            {readSpecimen.means.see}
          </Link>
        </p>

        <p className="mt-10 font-plex-mono text-[12px] uppercase tracking-[0.08em] text-rag/50">
          {readSpecimen.look.label}
        </p>
        <ol className="mt-3 flex flex-col gap-3">
          {readSpecimen.look.items.map((item, index) => (
            <li
              key={item}
              className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-3 max-w-[58ch] font-newsreader text-[18px] leading-[1.4] text-rag"
            >
              <span className="font-plex-mono text-[13px] text-rag/50">
                {index + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>

        <div className="mt-12 border-t border-rag/15 pt-8">
          <h3 className="font-newsreader text-[24px] leading-[1.15] text-rag">
            {readSpecimen.not.label}
          </h3>
          <p className="mt-4 max-w-[58ch] font-newsreader text-[18px] leading-[1.45] text-rag/80">
            {readSpecimen.not.body}
          </p>
        </div>
      </article>
    </>
  );
}
