"use client";

import Link from "next/link";
import { CrewPortrait } from "@/components/home/CrewPortrait";
import { Episode, EpisodeHead } from "@/components/episode/Episode";
import { Item, Stagger } from "@/components/landing/Reveal";
import {
  crewCommitments,
  crewGates,
  passRateNote,
  standingReview,
} from "@/content/process";
import { specialists } from "@/content/specialists";
import { gateLine } from "@/lib/direct/gate";

export function StandardRail() {
  return (
    <Episode labelledBy="standard" tone="cocoa">
      <EpisodeHead
        n="05"
        kicker="THE STANDARD"
        id="standard"
        tone="cocoa"
        heading="The process, not a percentage."
        aside={
          <Link href="/standard" className="aside-chip aside-chip-rag">
            The full standard
          </Link>
        }
      >
        {passRateNote} {standingReview}
      </EpisodeHead>

      <ol className="mt-14 border-l border-rag/12">
        {crewGates.map((gate) => (
          <li key={gate.n} className="grid gap-2 py-7 pl-6 md:grid-cols-[4rem_minmax(0,1fr)]">
            <p className="font-plex-mono text-[12px] text-rag/70">{gate.n}</p>
            <div>
              <h3 className="font-newsreader text-[24px] leading-[1.15] text-rag">
                {gate.title}
              </h3>
              <p className="mt-2 max-w-[50ch] font-newsreader text-[16px] leading-[1.5] text-rag/80">
                {gate.mechanism}
              </p>
              <p className="mt-3 max-w-[50ch] font-newsreader text-[15px] text-rag/70">
                Costs us: {gate.costs}
              </p>
              <p className="mt-1 max-w-[50ch] font-newsreader text-[15px] text-rag/70">
                Proves: {gate.proves}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <ul className="mt-6 grid gap-6 sm:grid-cols-3">
        {crewCommitments.map((line) => (
          <li
            key={line}
            className="font-newsreader text-[15px] leading-[1.45] text-rag/80"
          >
            {line}
          </li>
        ))}
      </ul>

      <Stagger
        className="mt-16 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 md:gap-x-8"
        gap={0.06}
      >
        {specialists.map((person) => {
          const gate = gateLine(person.id);
          return (
            <Item key={person.id}>
              <CrewPortrait person={person} line={gate.label} />
            </Item>
          );
        })}
      </Stagger>
    </Episode>
  );
}
