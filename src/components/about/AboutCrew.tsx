"use client";

import Link from "next/link";
import { Item, Stagger } from "@/components/landing/Reveal";
import { EpisodeHead } from "@/components/episode/Episode";
import { ObjectPlate } from "@/components/objects/ObjectPlate";
import { aboutCrewLine } from "@/content/about";
import { crewCapability, crewCapabilityLine } from "@/content/crew-lines";
import { specialists } from "@/content/specialists";
import {
  admission,
  assignmentStatus,
  assignmentStatusLabel,
} from "@/lib/assignment";

const groups = ["Integration", "Delivery", "Intelligence", "Operations"] as const;

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function AboutCrew() {
  return (
    <>
      <EpisodeHead
        n="04"
        kicker="WHO IS ACCOUNTABLE"
        id="accountable"
        heading="The crew."
      >
        Grouped by capability. A missing photograph is initials, not a hole.
      </EpisodeHead>

      {groups.map((group) => {
        const people = specialists.filter((person) => crewCapability[person.id] === group);
        if (people.length === 0) return null;
        return (
          <div key={group} className="mt-14">
            <p className="font-plex-mono text-[12px] uppercase tracking-[0.1em] text-ink/70">
              {group}
            </p>
            <p className="mt-2 font-newsreader text-[16px] text-ink">
              {crewCapabilityLine[group]}
            </p>
            <Stagger className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" gap={0.07}>
              {people.map((person) => {
                const line = admission(person);
                const status = assignmentStatusLabel(assignmentStatus(person));
                const absent = person.photoStatus === "Photo pending" || !person.photo;
                return (
                  <Item key={person.id}>
                    <ObjectPlate href={`/team/${person.id}`} tone="iron" flush>
                      <figure>
                        {absent ? (
                          <div className="grid aspect-square place-items-center">
                            <span className="font-newsreader text-[48px] leading-none text-rag">
                              {initials(person.name)}
                            </span>
                          </div>
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={person.photo}
                            alt={person.name}
                            width={400}
                            height={400}
                            className="aspect-square w-full object-cover object-top"
                          />
                        )}
                      </figure>
                      <div className="border-t border-rag/12 px-5 py-4">
                        <p className="font-plex-sans text-[16px] underline decoration-rag/25 underline-offset-4">
                          {person.name}
                        </p>
                        <p className="mt-1 font-plex-mono text-[12px] uppercase tracking-[0.08em] text-rag/60">
                          {line.standing}
                        </p>
                        <p className="mt-1 font-plex-sans text-[14px] text-rag/75">{status}</p>
                      </div>
                    </ObjectPlate>
                  </Item>
                );
              })}
            </Stagger>
          </div>
        );
      })}

      <p className="mt-16 max-w-[48ch] font-newsreader text-[18px] leading-[1.45] text-iron">
        {aboutCrewLine}{" "}
        <Link
          href="/standard"
          className="underline decoration-iron/25 underline-offset-4 hover:decoration-iron"
        >
          The standard
        </Link>
        .
      </p>
    </>
  );
}
