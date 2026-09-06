"use client";

import Link from "next/link";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { Item, Slide, Stagger, landEase } from "@/components/landing/Reveal";
import { ObjectRow } from "@/components/objects/ObjectRow";
import type { Specialist } from "@/content/types";
import { secondChair } from "@/content/second-chair";
import { assignmentHistory } from "@/lib/assignment";

type History = ReturnType<typeof assignmentHistory>;

/**
 * The page's large object: a real engineer, untreated, square.
 */
export function TeacherObject({
  person,
  first,
  standing,
  dateNote,
  history,
  closed,
}: Readonly<{
  person: Specialist;
  first: string;
  standing: string;
  dateNote: string;
  history: History;
  closed: number;
}>) {
  const reduce = useReducedMotion();
  const plate = useRef<HTMLDivElement>(null);
  const inView = useInView(plate, { once: true, margin: "-16% 0px" });

  return (
    <div className="mt-12 grid items-start gap-12 lg:grid-cols-[minmax(0,28rem)_minmax(0,1fr)]">
      <motion.div
        ref={plate}
        className="overflow-hidden"
        initial={reduce ? false : { clipPath: "inset(8% 8% 8% 8%)", scale: 1.04 }}
        animate={
          inView || reduce
            ? { clipPath: "inset(0% 0% 0% 0%)", scale: 1 }
            : { clipPath: "inset(8% 8% 8% 8%)", scale: 1.04 }
        }
        transition={
          reduce ? { duration: 0 } : { duration: 0.85, ease: landEase }
        }
      >
        <figure className="teacher-plate">
        {person.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={person.photo}
            alt={person.name}
            width={560}
            height={560}
            className="aspect-square w-full object-cover object-top"
          />
        ) : (
          <div className="grid aspect-square place-items-center">
            <span className="font-newsreader text-[72px] leading-none text-rag">
              {first[0]}
            </span>
          </div>
        )}
        <figcaption className="border-t border-rag/12 px-5 py-4">
          <p className="font-newsreader text-[20px] text-rag">{person.name}</p>
          <p className="mt-1 font-plex-mono text-[12px] uppercase tracking-[0.08em] text-rag/70">
            {person.role}
          </p>
        </figcaption>
        </figure>
      </motion.div>

      <Slide from="right" delay={0.1}>
        <p className="max-w-[38ch] font-newsreader text-[24px] leading-[1.3] text-rag md:text-[26px]">
          {secondChair.teachLine}
        </p>
        <blockquote className="mt-8 max-w-[40ch] border-l border-rag/20 pl-5 font-newsreader text-[20px] leading-[1.4] text-rag">
          {person.philosophy}
        </blockquote>
        <p className="mt-6 max-w-[46ch] font-plex-sans text-[16px] leading-[1.55] text-rag/75">
          {standing}. {dateNote}
        </p>
        <p className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
          <Link
            href="/standard"
            className="font-plex-sans text-[14px] underline decoration-rag/30 underline-offset-4"
          >
            The standard
          </Link>
          <Link
            href={`/team/${person.id}`}
            className="font-plex-sans text-[14px] underline decoration-rag/30 underline-offset-4"
          >
            Assignment record
          </Link>
        </p>
        {history.length > 0 ? (
          <Stagger className="mt-10 flex flex-col gap-2" gap={0.05}>
            {history.map((row) => (
              <Item key={row.lot.slug}>
                <ObjectRow href={`/work/${row.lot.slug}`} tone="iron">
                  <p className="font-plex-sans text-[16px] text-rag">
                    {row.lot.client}
                  </p>
                  <p className="mt-1 font-plex-sans text-[14px] text-rag/70">
                    {row.capability}
                    {row.lead ? ". Lead." : "."}
                  </p>
                </ObjectRow>
              </Item>
            ))}
          </Stagger>
        ) : null}
        {closed > 0 ? (
          <p className="mt-6 font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">
            Signals closed · {closed}
          </p>
        ) : null}
      </Slide>
    </div>
  );
}
