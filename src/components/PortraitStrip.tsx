"use client";

import Link from "next/link";
import { useReducedMotion } from "motion/react";
import type { Specialist } from "@/content/types";
import { Lift } from "@/components/landing/Reveal";

type PortraitStripProps = {
  people: Specialist[];
  size?: "default" | "large";
};

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function PortraitStrip({
  people,
  size = "default",
}: PortraitStripProps) {
  const reduce = useReducedMotion();
  const frame =
    size === "large"
      ? "h-36 w-36 md:h-44 md:w-44"
      : "h-24 w-24 md:h-28 md:w-28";

  return (
    <ul className="flex gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {people.map((person) => {
        const absent = person.photoStatus === "Photo pending" || !person.photo;
        return (
          <li key={person.id} className="w-[9.5rem] shrink-0 md:w-44">
            <Lift>
            <Link
              href={`/team/${person.id}`}
              className="group block underline-offset-4"
            >
              {absent ? (
                <div
                  className={`grid ${frame} place-items-center rounded-[20px] bg-iron text-rag`}
                >
                  <span className="font-newsreader text-[28px] leading-none tracking-[-0.03em] md:text-[36px]">
                    {initials(person.name)}
                  </span>
                </div>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={person.photo}
                  alt={person.name}
                  width={176}
                  height={176}
                  className={`${frame} rounded-[20px] object-cover object-top grayscale transition-[filter,transform] duration-500 group-hover:scale-[1.04] group-hover:grayscale-0`}
                />
              )}
              <p className="mt-3 font-plex-sans text-[15px] font-medium text-iron underline decoration-iron/30 group-hover:decoration-iron">
                {person.name}
              </p>
              <p className="mt-1 min-h-[2.6em] font-newsreader text-[14px] leading-[1.3] text-ink/80">
                <span className={reduce ? "" : "group-hover:hidden"}>
                  {person.role}
                </span>
                {reduce ? null : (
                  <span className="hidden italic group-hover:inline">
                    {person.philosophy}
                  </span>
                )}
              </p>
            </Link>
            </Lift>
          </li>
        );
      })}
    </ul>
  );
}
