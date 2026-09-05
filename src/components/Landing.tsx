"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useState, type ReactNode } from "react";
import { EightyDome } from "@/components/landing/EightyDome";
import { Count, Lift, Reveal, Rise, Wipe } from "@/components/landing/Reveal";
import {
  PulseCheckIntake,
  type PulseCheckSituation,
} from "@/components/intake/PulseCheckIntake";
import { PassAlong } from "@/components/PassAlong";
import { VettedPay } from "@/components/VettedPay";
import { lotEntryState } from "@/content/catalogue";
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

/**
 * Compact column. One object per episode. Hero stays the portal.
 */

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

function WorkCard({ lot }: Readonly<{ lot: Lot }>) {
  const reduce = useReducedMotion();
  const state = lotEntryState[lot.slug] ?? lot.grade.label;

  return (
    <Lift>
      <Wipe>
        <Link
          href={`/work/${lot.slug}`}
          className={`group relative block overflow-hidden bg-iron ${plate}`}
        >
          <div className="relative aspect-[4/5]">
            {lot.imageUrl ? (
              <Image
                src={lot.imageUrl}
                alt=""
                fill
                className={`object-cover ${
                  reduce ? "" : "transition-transform duration-700 group-hover:scale-[1.08]"
                }`}
                sizes="220px"
              />
            ) : (
              <div className="absolute inset-0 bg-iron-2" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-iron via-iron/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <p className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-rag/70">
                {lot.lotNumber} · {state}
              </p>
              <p className="mt-1 font-newsreader text-[20px] leading-[1.1] text-rag">
                {lot.client}
              </p>
            </div>
          </div>
        </Link>
      </Wipe>
    </Lift>
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
    <Lift>
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
    </Lift>
  );
}

export function Landing() {
  const lots = homeLots.map((slug) => getLot(slug));
  const crew = homeCrew.map((id) => getSpecialist(id));
  const more = specialists.length - crew.length;
  const [fit, setFit] = useState<PulseCheckSituation | null>(null);

  function pickFit(id: PulseCheckSituation) {
    setFit(id);
    document.getElementById("intake")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <Episode labelledBy="argument">
        <div className={`bg-rag-card p-6 shadow-[var(--shadow-card)] md:p-8 ${plate}`}>
          <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-center">
            <Reveal delay={0.08} className="shrink-0">
              <EightyDome compact />
            </Reveal>
            <div className="min-w-0 flex-1">
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
                  <Reveal key={lock.title} delay={0.1 + index * 0.04}>
                    <li>
                      <Link
                        href={lock.href}
                        className="flex items-center justify-between gap-3 rounded-full bg-rag px-4 py-2 font-newsreader text-[15px] text-iron ring-1 ring-iron/10 transition-colors hover:bg-white"
                      >
                        {lock.title}
                        <span aria-hidden="true">→</span>
                      </Link>
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
        <ul className="mt-8 space-y-2">
          {homeFits.map((card, index) => {
            const on = fit === card.id;
            const inner = (
              <>
                <span
                  aria-hidden="true"
                  className={`font-plex-mono text-[12px] ${on ? "text-signal" : "text-ink/70"}`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1 text-left">
                  <span className="block font-newsreader text-[18px] leading-[1.2] tracking-[-0.02em]">
                    {card.title}
                  </span>
                  <span
                    className={`mt-1 block font-newsreader text-[14px] leading-[1.4] ${
                      on ? "text-rag/80" : "text-ink"
                    }`}
                  >
                    {card.body}
                  </span>
                </span>
                <span aria-hidden="true" className="shrink-0">
                  →
                </span>
              </>
            );
            return (
              <Reveal key={card.id} delay={index * 0.04}>
                <li>
                  {card.door === "contact" ? (
                    <Link
                      href="/contact"
                      className={`flex w-full items-center gap-4 rounded-[20px] bg-rag-card px-4 py-3.5 text-iron shadow-[var(--shadow-card)]`}
                    >
                      {inner}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => pickFit(card.id)}
                      className={`flex w-full items-center gap-4 rounded-[20px] px-4 py-3.5 text-left shadow-[var(--shadow-card)] ${
                        on ? "bg-iron text-rag" : "bg-rag-card text-iron"
                      }`}
                    >
                      {inner}
                    </button>
                  )}
                </li>
              </Reveal>
            );
          })}
        </ul>
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
        <div className="mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {lots.map((lot, index) => (
            <Reveal
              key={lot.slug}
              delay={index * 0.08}
              className="w-[13.25rem] shrink-0 snap-start"
            >
              <WorkCard lot={lot} />
            </Reveal>
          ))}
        </div>
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
        <ol className="relative mt-8 border-l border-iron/15 pl-6">
          <motion.span
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-[-1px] w-px origin-top bg-iron/50"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ type: "spring", stiffness: 70, damping: 20, delay: 0.12 }}
          />
          {homePath.map((step, index) => (
            <Reveal key={step.name} delay={index * 0.07}>
              <li className="relative pb-8 last:pb-0">
                <span
                  aria-hidden="true"
                  className="absolute top-0 -left-[31px] grid h-6 w-6 place-items-center rounded-full bg-iron font-newsreader text-[12px] text-rag"
                >
                  {index + 1}
                </span>
                <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">
                  {step.meter}
                </p>
                <h3 className="mt-1 font-newsreader text-[22px] leading-[1.15] tracking-[-0.02em] text-iron">
                  {step.name}
                </h3>
                <p className="mt-2 max-w-[36ch] font-newsreader text-[15px] leading-[1.45] text-ink">
                  {step.body}
                </p>
                <Link href={step.href} className={`${linkQuiet} mt-3 inline-block`}>
                  {step.label}
                  <span aria-hidden="true"> →</span>
                </Link>
              </li>
            </Reveal>
          ))}
        </ol>
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
        <Reveal>
          <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">
            06 · The Check
          </p>
        </Reveal>
        <Rise delay={0.06}>
          <h2
            id="check"
            className="mt-2 max-w-[12ch] font-newsreader text-[28px] leading-[1.08] tracking-[-0.03em] text-iron md:text-[34px]"
          >
            Five days. A verdict.
          </h2>
        </Rise>
        <Reveal delay={0.1}>
          <p className="mt-4 font-newsreader text-[48px] leading-none tracking-[-0.04em] text-iron md:text-[56px]">
            <Count prefix="$" to={offer.check.price} />
          </p>
        </Reveal>
        <ol className="mt-5 flex flex-wrap gap-1.5">
          {homeDays.map((day, index) => (
            <Reveal key={day} delay={0.12 + index * 0.04}>
              <li className="rounded-full bg-rag-card px-3 py-1 font-plex-mono text-[11px] uppercase tracking-[0.06em] text-ink/80">
                {index + 1} · {day}
              </li>
            </Reveal>
          ))}
        </ol>
        <Reveal delay={0.18}>
          <p className="mt-4 max-w-[34ch] font-newsreader text-[16px] leading-[1.45] text-ink">
            Keep, repair, or rebuild. Credited on a Close within 30 days.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <a
              href="#intake"
              className="inline-flex items-center rounded-full bg-signal px-5 py-2.5 font-plex-sans text-[14px] font-medium text-iron"
            >
              Start on this desk
            </a>
            <Link href="/check" className={linkQuiet}>
              How the five days work
            </Link>
          </div>
        </Reveal>
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
