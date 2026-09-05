"use client";

import Link from "next/link";
import { Reveal, Tilt } from "@/components/landing/Reveal";
import type { Specialist } from "@/content/types";

/**
 * Real named people. Missing photos stay initials.
 */
export function PeopleRail({
  people,
  line,
  tone = "ink",
}: Readonly<{ people: Specialist[]; line?: string; tone?: "ink" | "rag" }>) {
  const nameClass =
    tone === "rag"
      ? "text-rag/90"
      : "text-iron";
  const lineClass =
    tone === "rag" ? "text-rag/60" : "text-ink/70";

  return (
    <div>
      {line ? (
        <p className={`mb-3 font-plex-mono text-[11px] uppercase tracking-[0.08em] ${lineClass}`}>
          {line}
        </p>
      ) : null}
      <ul className="flex flex-wrap gap-3">
        {people.map((person, index) => {
          const absent = person.photoStatus === "Photo pending" || !person.photo;
          const initials = person.name
            .split(" ")
            .filter(Boolean)
            .slice(0, 2)
            .map((part) => part[0]?.toUpperCase() ?? "")
            .join("");
          return (
            <li key={person.id}>
              <Reveal delay={index * 0.05}>
                <Tilt intensity={6}>
                  <Link href={`/team/${person.id}`} className="group block w-[4.5rem]">
                    <span className="relative block aspect-square overflow-hidden rounded-full bg-iron">
                      {absent ? (
                        <span className="grid h-full place-items-center font-newsreader text-[18px] text-rag">
                          {initials}
                        </span>
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={person.photo}
                          alt={person.name}
                          width={72}
                          height={72}
                          className="h-full w-full object-cover object-top grayscale transition-[filter,transform] duration-500 group-hover:scale-105 group-hover:grayscale-0"
                        />
                      )}
                    </span>
                    <span className={`mt-1.5 block truncate font-plex-sans text-[11px] font-medium ${nameClass}`}>
                      {person.name.split(" ")[0]}
                    </span>
                  </Link>
                </Tilt>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
