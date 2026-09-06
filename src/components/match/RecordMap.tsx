"use client";

import Link from "next/link";
import { indexProjects } from "@/content/catalogue";
import { Reveal } from "@/components/Reveal";
import type { LotComparison } from "@/lib/match/types";

function hrefFor(row: LotComparison): string | null {
  if (row.kind === "lot") return `/work/${row.id}`;
  return indexProjects.find((project) => project.id === row.id)?.url ?? null;
}

export function RecordMap({
  comparisons,
  sameWay,
  closestId,
}: Readonly<{
  comparisons: LotComparison[];
  sameWay: number;
  closestId: string | null;
}>) {
  return (
    <Reveal
      as="section"
      id="match-record"
      label="The record, row by row"
      className="scroll-mt-24"
      delay={60}
    >
      <p className="kicker flex items-center gap-2">
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-partial pulse-dot" />
        The record, row by row
      </p>
      <p className="mt-2 max-w-[48ch] font-newsreader text-[16px] leading-[1.45] text-ink">
        {sameWay} of {comparisons.length} engagements arrived the same way.
        Every row below is tagged from its own condition text — nothing here is
        inferred.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="chip chip-soft">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-iron" />
          lot · a full engagement with a posted lot
        </span>
        <span className="chip chip-soft">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ink" />
          index · a one-line record from the old catalogue
        </span>
        {closestId ? (
          <span className="chip chip-soft">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-partial" />
            closest · the row your words sit nearest
          </span>
        ) : null}
      </div>

      <details open className="mt-5">
        <summary className="cursor-pointer font-plex-sans text-[14px] text-iron underline decoration-iron/30 underline-offset-4 hover:text-iron focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-iron">
          Full record map — {comparisons.length} rows
        </summary>
        <ul className="stagger mt-5 flex flex-col gap-2">
          {comparisons.map((row, index) => {
            const href = hrefFor(row);
            const closest = row.id === closestId;
            return (
              <li
                key={row.id}
                className={`panel-sub flex items-center gap-3 px-4 py-3 ${
                  closest ? "bg-partial/5 ring-1 ring-partial/25" : ""
                }`}
                style={{ transitionDelay: `${index * 55}ms` }}
              >
                <span
                  aria-hidden="true"
                  className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                    closest ? "bg-partial" : row.kind === "lot" ? "bg-iron" : "bg-ink"
                  }`}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-3">
                    <span className="font-plex-mono text-[10px] uppercase tracking-[0.06em] text-ink/50">
                      {row.kind}
                    </span>
                    {href ? (
                      <Link
                        href={href}
                        className="min-w-0 flex-1 truncate font-newsreader text-[15px] text-iron underline decoration-iron/30 underline-offset-2 hover:decoration-iron"
                      >
                        {row.client}
                      </Link>
                    ) : (
                      <span className="min-w-0 flex-1 truncate font-newsreader text-[15px] text-iron">
                        {row.client}
                      </span>
                    )}
                    {closest ? (
                      <span className="chip chip-solid shrink-0">closest</span>
                    ) : null}
                  </div>
                  {row.overlap.length > 0 ? (
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {row.overlap.map((id) => (
                        <li
                          key={id}
                          className="chip chip-soft text-[10px]"
                        >
                          {id.replaceAll("-", " ")}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-2 font-newsreader text-[13px] italic text-ink/55">
                      No shared condition in the words you wrote.
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </details>
    </Reveal>
  );
}