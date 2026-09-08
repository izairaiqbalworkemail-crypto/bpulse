"use client";

import Link from "next/link";
import { Reveal, Rise, Stagger, Item } from "@/components/landing/Reveal";
import { afterCopy } from "@/content/home";
import { standingRange } from "@/content/ladder";
import { getSpecialist } from "@/content/specialists";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function After() {
  const person = getSpecialist(afterCopy.engineerId);
  const absent = person.photoStatus === "Photo pending" || !person.photo;

  return (
    <section
      id="after"
      aria-labelledby="after-heading"
      className="bg-paper"
    >
      <div className="stage-container py-20 md:py-28">
        <div className="mx-auto max-w-[52rem]">
          <Reveal>
            <p className="font-plex-mono text-[11px] uppercase tracking-[0.14em] text-quill/70">
              {afterCopy.n} · {afterCopy.kicker}
            </p>
          </Reveal>
          <Rise delay={0.05}>
            <h2
              id="after-heading"
              className="mt-4 max-w-[26ch] font-newsreader text-[clamp(1.7rem,3.2vw,2.55rem)] leading-[1.08] tracking-[-0.02em] text-ink"
            >
              {afterCopy.heading}
            </h2>
          </Rise>
          <Reveal delay={0.09}>
            <p className="mt-4 max-w-[46ch] font-plex-sans text-[16px] leading-[1.55] text-quill">
              {afterCopy.lede}
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="on-ink mt-12 overflow-hidden rounded-[24px] border border-paper/10 bg-ink text-paper">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-5 py-4 md:px-7">
                <Link
                  href={`/team/${person.id}`}
                  className="inline-flex min-w-0 items-center gap-3"
                >
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-paper/15 bg-ink-2">
                    {absent ? (
                      <span className="grid h-full place-items-center font-newsreader text-[14px] text-paper">
                        {initials(person.name)}
                      </span>
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={person.photo}
                        alt={person.name}
                        width={80}
                        height={80}
                        className="h-full w-full object-cover object-top"
                      />
                    )}
                  </div>
                  <span className="truncate font-plex-mono text-[11px] uppercase tracking-[0.14em] text-paper/72">
                    {afterCopy.linked}
                  </span>
                </Link>

                <span className="rounded-full border border-paper/18 px-3 py-1 font-plex-mono text-[10px] uppercase tracking-[0.14em] text-paper/70">
                  {person.availability}
                </span>
              </div>

              <div className="px-5 py-5 md:px-7">
                <p className="max-w-[70ch] font-plex-sans text-[15px] leading-[1.5] text-paper/78">
                  {afterCopy.teach}
                </p>

                <Stagger className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" gap={0.05}>
                  {afterCopy.track.map((step) => (
                    <Item key={step.step}>
                      <div className="h-full rounded-[14px] border border-paper/10 bg-ink-card px-3 py-3">
                        <p className="font-plex-mono text-[10px] uppercase tracking-[0.14em] text-ember/90">
                          {step.step}
                        </p>
                        <p className="mt-1 font-newsreader text-[17px] leading-[1.18] text-paper">
                          {step.title}
                        </p>
                        <p className="mt-1 font-plex-sans text-[13px] leading-[1.4] text-paper/62">
                          {step.note}
                        </p>
                      </div>
                    </Item>
                  ))}
                </Stagger>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 px-5 py-4 md:px-7">
                <p className="font-plex-mono text-[12px] uppercase tracking-[0.12em] text-paper/68">
                  {standingRange} · {afterCopy.cancel}
                </p>
                <Link href={afterCopy.href} className="btn btn-paper min-h-10 px-5 text-[14px]">
                  {afterCopy.open}
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-4 font-plex-sans text-[13px] leading-[1.45] text-quill/70">
              {afterCopy.proof}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
