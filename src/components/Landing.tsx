"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import { PhotoFan } from "@/components/landing/PhotoFan";
import { Count, Lift, Reveal, Rise, Tilt, Wipe } from "@/components/landing/Reveal";
import {
  PulseCheckIntake,
  type PulseCheckSituation,
} from "@/components/intake/PulseCheckIntake";
import { PassAlong } from "@/components/PassAlong";
import { VettedPay } from "@/components/VettedPay";
import { Mark } from "@/components/primitives/Mark";
import { lotEntryState } from "@/content/catalogue";
import { checkRunner } from "@/content/check";
import {
  homeCrew,
  homeDays,
  homeFits,
  homeLocks,
  homeLots,
  homePath,
} from "@/content/landing";
import { getLot } from "@/content/lots";
import { offer } from "@/content/offer";
import { getSpecialist, specialists } from "@/content/specialists";
import type { Lot, Specialist } from "@/content/types";

const plate = "rounded-[24px]";
const title =
  "mt-2 max-w-[16ch] font-newsreader text-[28px] leading-[1.08] tracking-[-0.03em] text-iron md:text-[34px]";
const linkQuiet =
  "font-plex-sans text-[14px] text-iron underline decoration-iron/30 underline-offset-4 hover:decoration-iron";

function Episode({
  children,
  labelledBy,
}: Readonly<{ children: ReactNode; labelledBy: string }>) {
  return (
    <section aria-labelledby={labelledBy} className="bg-rag text-iron">
      <div className="grid-container py-14 md:py-16">{children}</div>
    </section>
  );
}

function EpisodeHead({
  n,
  kicker,
  id,
  heading,
  aside,
  children,
}: Readonly<{
  n: string;
  kicker: string;
  id: string;
  heading: string;
  aside?: ReactNode;
  children?: ReactNode;
}>) {
  return (
    <div className="flex items-end justify-between gap-6">
      <div className="min-w-0">
        <Reveal>
          <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">
            {n} · {kicker}
          </p>
        </Reveal>
        <Rise delay={0.06}>
          <h2 id={id} className={title}>
            {heading}
          </h2>
        </Rise>
        {children ? (
          <Reveal delay={0.1}>
            <p className="mt-3 max-w-[34ch] font-newsreader text-[16px] leading-[1.45] text-ink">
              {children}
            </p>
          </Reveal>
        ) : null}
        {aside ? <div className="mt-4 sm:hidden">{aside}</div> : null}
      </div>
      {aside ? <div className="hidden shrink-0 pb-1 sm:block">{aside}</div> : null}
    </div>
  );
}

function WorkCard({
  lot,
  featured = false,
}: Readonly<{ lot: Lot; featured?: boolean }>) {
  const reduce = useReducedMotion();
  const state = lotEntryState[lot.slug] ?? lot.grade.label;

  return (
    <Tilt>
      <Wipe>
        <Link
          href={`/work/${lot.slug}`}
          className={`group relative block overflow-hidden bg-iron ${plate}`}
        >
          <div className={featured ? "relative aspect-[16/10]" : "relative aspect-[4/5]"}>
            {lot.imageUrl ? (
              <Image
                src={lot.imageUrl}
                alt=""
                fill
                className={`object-cover ${
                  reduce ? "" : "transition-transform duration-700 group-hover:scale-[1.08]"
                }`}
                sizes={featured ? "(max-width: 768px) 100vw, 480px" : "220px"}
              />
            ) : (
              <div className="absolute inset-0 bg-iron-2" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-iron via-iron/35 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <p className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-rag/70">
                {lot.lotNumber} · {state}
              </p>
              <p className="mt-1 font-newsreader text-[20px] leading-[1.1] text-rag md:text-[22px]">
                {lot.client}
              </p>
            </div>
          </div>
        </Link>
      </Wipe>
    </Tilt>
  );
}

function CrewCard({ person }: Readonly<{ person: Specialist }>) {
  const reduce = useReducedMotion();
  const absent = person.photoStatus === "Photo pending" || !person.photo;
  const initials = person.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <Tilt intensity={8}>
      <Link href={`/team/${person.id}`} className="group block">
        <Wipe>
          <div className={`relative aspect-[3/4] overflow-hidden bg-iron ${plate}`}>
            {absent ? (
              <div className="grid h-full place-items-center">
                <span className="font-newsreader text-[32px] leading-none text-rag">
                  {initials}
                </span>
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={person.photo}
                alt={person.name}
                width={240}
                height={320}
                className={`h-full w-full object-cover object-top grayscale ${
                  reduce
                    ? ""
                    : "transition-[filter,transform] duration-700 group-hover:scale-[1.06] group-hover:grayscale-0"
                }`}
              />
            )}
          </div>
        </Wipe>
        <p className="mt-2 font-plex-sans text-[14px] font-medium text-iron">
          {person.name}
        </p>
        <p className="mt-0.5 font-newsreader text-[13px] leading-[1.3] text-ink/80">
          {person.role}
        </p>
      </Link>
    </Tilt>
  );
}

export function Landing() {
  const lots = homeLots.map((slug) => getLot(slug));
  const [lead, ...restLots] = lots;
  const crew = homeCrew.map((id) => getSpecialist(id));
  const more = specialists.length - crew.length;
  const runner = getSpecialist(checkRunner.id);
  const [fit, setFit] = useState<PulseCheckSituation | null>(null);

  function pickFit(id: PulseCheckSituation) {
    setFit(id);
    document.getElementById("intake")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <Episode labelledBy="argument">
        <div className={`overflow-hidden bg-rag-card p-6 shadow-[var(--shadow-card)] md:p-8 ${plate}`}>
          <div className="grid items-center gap-8 sm:grid-cols-[1fr_1.1fr]">
            <Reveal delay={0.06}>
              <PhotoFan
                shots={lots.map((lot) => ({
                  src: lot.imageUrl ?? "/project-shots/project-deepidv.png",
                  alt: lot.client,
                }))}
              />
            </Reveal>
            <div className="min-w-0">
              <EpisodeHead
                n="01"
                kicker="The last twenty"
                id="argument"
                heading="Most products die at 80%."
              >
                Integration, compliance, handover. You keep the lock, the
                portal, and the keys.
              </EpisodeHead>
              <ul className="mt-6 space-y-2">
                {homeLocks.map((lock, index) => (
                  <Reveal key={lock.title} delay={0.12 + index * 0.04}>
                    <li>
                      <Lift>
                        <Link
                          href={lock.href}
                          className="flex items-center justify-between gap-3 rounded-full bg-rag px-4 py-2 font-newsreader text-[15px] text-iron ring-1 ring-iron/10 transition-colors hover:bg-white"
                        >
                          {lock.title}
                          <span aria-hidden="true">→</span>
                        </Link>
                      </Lift>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Episode>

      <Episode labelledBy="fit">
        <EpisodeHead
          n="02"
          kicker="Which is it"
          id="fit"
          heading="Pick the wound. The brief already knows."
        >
          One tap starts the Check with that situation on the record.
        </EpisodeHead>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {homeFits.map((card, index) => {
            const on = fit === card.id;
            const copy = (
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-rag/70">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-1 font-newsreader text-[22px] leading-[1.15] tracking-[-0.02em] text-rag">
                  {card.title}
                </h3>
                <p className="mt-1.5 max-w-[28ch] font-newsreader text-[14px] leading-[1.4] text-rag/80">
                  {card.body}
                </p>
              </div>
            );
            const frame = (
              <div
                className={`relative min-h-[13.5rem] overflow-hidden ${plate} ${
                  on ? "ring-2 ring-signal" : ""
                }`}
              >
                {card.image ? (
                  <Image
                    src={card.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                ) : (
                  <div className="absolute inset-0 grid place-items-center bg-iron">
                    <Mark size={64} />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-iron via-iron/45 to-iron/10" />
                {copy}
              </div>
            );
            return (
              <Reveal key={card.id} delay={index * 0.06}>
                <Tilt>
                  {card.door === "contact" ? (
                    <Link href="/contact" className="block">
                      {frame}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => pickFit(card.id)}
                      className="block w-full text-left"
                    >
                      {frame}
                    </button>
                  )}
                </Tilt>
              </Reveal>
            );
          })}
        </div>
      </Episode>

      <Episode labelledBy="catalogue">
        <EpisodeHead
          n="03"
          kicker="Work we actually did"
          id="catalogue"
          heading="Every lot entered unfinished."
          aside={
            <Link href="/work" className={linkQuiet}>
              The whole log
            </Link>
          }
        >
          DeepIDV, Sully, WearMeOut.
        </EpisodeHead>
        {lead ? (
          <div className="mt-8 grid gap-3 md:grid-cols-12">
            <Reveal className="md:col-span-7">
              <WorkCard lot={lead} featured />
            </Reveal>
            <div className="grid gap-3 sm:grid-cols-2 md:col-span-5 md:grid-cols-1">
              {restLots.map((lot, index) => (
                <Reveal key={lot.slug} delay={0.08 + index * 0.08}>
                  <WorkCard lot={lot} />
                </Reveal>
              ))}
            </div>
          </div>
        ) : null}
      </Episode>

      <Episode labelledBy="path">
        <EpisodeHead
          n="04"
          kicker="The path"
          id="path"
          heading="Check. Close. Standing if you want it."
        >
          Lowest risk first. Nothing starts until you sign the lock.
        </EpisodeHead>
        <div className="mt-8 grid gap-3">
          {homePath.map((step, index) => (
            <Reveal key={step.name} delay={index * 0.08}>
              <Tilt>
                <Link
                  href={step.href}
                  className={`group relative block min-h-[9.5rem] overflow-hidden ${plate}`}
                >
                  <Image
                    src={step.image}
                    alt=""
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.05]"
                    sizes="820px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-iron via-iron/75 to-iron/25" />
                  <div className="relative flex h-full min-h-[9.5rem] flex-col justify-between p-5">
                    <p className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-rag/70">
                      {String(index + 1).padStart(2, "0")} · {step.meter}
                    </p>
                    <div>
                      <h3 className="font-newsreader text-[26px] leading-[1.1] tracking-[-0.02em] text-rag">
                        {step.name}
                      </h3>
                      <p className="mt-1.5 max-w-[36ch] font-newsreader text-[15px] leading-[1.4] text-rag/80">
                        {step.body}
                      </p>
                      <p className="mt-3 font-plex-sans text-[14px] text-signal">
                        {step.label} →
                      </p>
                    </div>
                  </div>
                </Link>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </Episode>

      <Episode labelledBy="crew">
        <EpisodeHead
          n="05"
          kicker="The same hands"
          id="crew"
          heading="The people who scope it ship it."
          aside={
            <Link href="/team" className={linkQuiet}>
              The whole crew
            </Link>
          }
        >
          {specialists.length} named people. No handoff mid-build.
        </EpisodeHead>
        <div className="mt-8 grid grid-cols-3 gap-3">
          {crew.map((person, index) => (
            <Reveal key={person.id} delay={index * 0.05}>
              <CrewCard person={person} />
            </Reveal>
          ))}
        </div>
        {more > 0 ? (
          <Reveal delay={0.16}>
            <p className="mt-6 font-newsreader text-[15px] text-ink">
              <Link href="/team" className={linkQuiet}>
                {more} more on the crew page
              </Link>
            </p>
          </Reveal>
        ) : null}
      </Episode>

      <Episode labelledBy="check">
        <Tilt>
          <div className={`relative overflow-hidden bg-iron text-rag ${plate}`}>
            {runner.photo ? (
              <Image
                src={runner.photo}
                alt=""
                fill
                className="object-cover object-top opacity-35"
                sizes="820px"
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-r from-iron via-iron/85 to-iron/55" />
            <div className="relative p-6 md:p-8">
              <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-rag/70">
                06 · The Check
              </p>
              <Rise delay={0.06}>
                <h2
                  id="check"
                  className="mt-2 max-w-[12ch] font-newsreader text-[28px] leading-[1.08] tracking-[-0.03em] text-rag md:text-[34px]"
                >
                  Five days. A verdict.
                </h2>
              </Rise>
              <p className="mt-4 font-newsreader text-[48px] leading-none tracking-[-0.04em] text-signal md:text-[56px]">
                <Count prefix="$" to={offer.check.price} />
              </p>
              <ol className="mt-5 flex flex-wrap gap-1.5">
                {homeDays.map((day, index) => (
                  <li
                    key={day}
                    className="rounded-full border border-rag/20 bg-iron/40 px-3 py-1 font-plex-mono text-[11px] uppercase tracking-[0.06em] text-rag/80"
                  >
                    {index + 1} · {day}
                  </li>
                ))}
              </ol>
              <p className="mt-4 max-w-[34ch] font-newsreader text-[16px] leading-[1.45] text-rag/80">
                Keep, repair, or rebuild. Credited on a Close within 30 days.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-4">
                <a
                  href="#intake"
                  className="inline-flex items-center rounded-full bg-signal px-5 py-2.5 font-plex-sans text-[14px] font-medium text-iron"
                >
                  Start on this desk
                </a>
                <Link
                  href="/check"
                  className="font-plex-sans text-[14px] text-rag/80 underline decoration-rag/30 underline-offset-4 hover:text-rag"
                >
                  How the five days work
                </Link>
              </div>
            </div>
          </div>
        </Tilt>
        <Reveal delay={0.1} className="mt-8">
          <div id="intake">
            <PulseCheckIntake
              key={fit ?? "open"}
              source="home"
              prefill={fit ? { situation: fit } : undefined}
            />
          </div>
        </Reveal>
        <Reveal delay={0.14} className="mt-6">
          <VettedPay />
        </Reveal>
        <Reveal delay={0.18} className="mt-6">
          <PassAlong />
        </Reveal>
      </Episode>
    </>
  );
}
