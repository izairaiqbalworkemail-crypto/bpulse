"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useState, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import { LotPlate } from "@/components/catalog/LotPlate";
import {
  Atmosphere,
  AtmosphereNote,
} from "@/components/landing/Atmosphere";
import { FitBand, type FitSelection } from "@/components/landing/FitBand";
import { PhotoFan } from "@/components/landing/PhotoFan";
import { PeopleRail } from "@/components/PeopleRail";
import {
  Count,
  Item,
  Lift,
  Reveal,
  Rise,
  Stagger,
  Tilt,
  Wipe,
} from "@/components/landing/Reveal";
import { PulseCheckIntake } from "@/components/intake/PulseCheckIntake";
import { MatchDesk } from "@/components/match/MatchDesk";
import { PassAlong } from "@/components/PassAlong";
import { VettedPay } from "@/components/VettedPay";
import { getCatalogue } from "@/content/catalogue";
import { checkRunner } from "@/content/check";
import {
  homeCrew,
  homeDays,
  homeLocks,
  homeLots,
  homePath,
} from "@/content/landing";
import { getLot } from "@/content/lots";
import { offer } from "@/content/offer";
import { getSpecialist, specialists } from "@/content/specialists";
import type { Specialist } from "@/content/types";
import { scrollToSection } from "@/lib/scroll-section";

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
    <section
      id={labelledBy}
      aria-labelledby={`${labelledBy}-heading`}
      className="relative scroll-mt-[5.75rem] overflow-hidden bg-rag text-iron md:scroll-mt-28"
    >
      <Atmosphere kind="light" opacity={0.22} />
      <div className="relative grid-container py-14 md:py-16">{children}</div>
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
          <h2 id={`${id}-heading`} className={title}>
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
        {aside ? (
          <Reveal delay={0.16} className="mt-4 sm:hidden">
            {aside}
          </Reveal>
        ) : null}
      </div>
      {aside ? (
        <Reveal delay={0.16} className="hidden shrink-0 pb-1 sm:block">
          {aside}
        </Reveal>
      ) : null}
    </div>
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
  const recordCount = getCatalogue().length;
  const crew = homeCrew.map((id) => getSpecialist(id));
  const more = specialists.length - crew.length;
  const runner = getSpecialist(checkRunner.id);
  const [fit, setFit] = useState<FitSelection | null>(null);

  function pickFit(picked: FitSelection) {
    setFit(picked);
    scrollToSection("intake");
  }

  useLayoutEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, "", "/");
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Episode labelledBy="argument">
        <Reveal>
        <div className={`relative overflow-hidden bg-rag-card p-6 shadow-[var(--shadow-card)] md:p-8 ${plate}`}>
          <Atmosphere kind="paper" opacity={0.22} />
          <div className="relative grid items-center gap-8 sm:grid-cols-[1fr_1.1fr]">
            <Reveal delay={0.06}>
              <PhotoFan
                shots={lots
                  .filter((lot) => lot.imageUrl)
                  .map((lot) => ({
                    src: lot.imageUrl as string,
                    alt: `${lot.client} public site`,
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
                  <li key={lock.title}>
                    <Reveal delay={0.18 + index * 0.07}>
                      <Lift>
                        <Link
                          href={lock.href}
                          className="flex items-center justify-between gap-3 rounded-full bg-rag px-4 py-2 font-newsreader text-[15px] text-iron ring-1 ring-iron/10 transition-colors hover:bg-white"
                        >
                          {lock.title}
                          <span aria-hidden="true">→</span>
                        </Link>
                      </Lift>
                    </Reveal>
                  </li>
                ))}
              </ul>
              <Reveal delay={0.28} className="mt-6">
                <PeopleRail
                  people={crew.slice(0, 4)}
                  line="The names on the Check"
                />
              </Reveal>
              <div className="mt-4">
                <AtmosphereNote />
              </div>
            </div>
          </div>
        </div>
        </Reveal>
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
        <Reveal delay={0.1} className="mt-8">
          <FitBand onStart={pickFit} />
        </Reveal>
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
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {lots.map((lot, index) => (
            <Reveal key={lot.slug} delay={0.1 + index * 0.08}>
              <LotPlate lot={lot} />
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
        <Stagger className="mt-8 grid gap-3" delay={0.1} gap={0.1}>
          {homePath.map((step, index) => (
            <Item key={step.name}>
              <Tilt>
                <Link
                  href={step.href}
                  className={`group grid min-h-[10.5rem] overflow-hidden bg-iron sm:grid-cols-[1fr_10rem] ${plate}`}
                >
                  <div className="relative z-10 flex min-h-[10.5rem] flex-col justify-between p-5">
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
                  <Wipe className="relative min-h-[10.5rem]">
                    <Image
                      src={step.image}
                      alt=""
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                      sizes="160px"
                    />
                  </Wipe>
                </Link>
              </Tilt>
            </Item>
          ))}
        </Stagger>
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
        <Stagger className="mt-8 grid grid-cols-3 gap-3" delay={0.1} gap={0.07}>
          {crew.map((person) => (
            <Item key={person.id}>
              <CrewCard person={person} />
            </Item>
          ))}
        </Stagger>
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

      <Episode labelledBy="match">
        <EpisodeHead
          n="06"
          kicker="The Match"
          id="match"
          heading="Who should take this? Check the record."
          aside={
            <Link href="/match" className={linkQuiet}>
              The full desk
            </Link>
          }
        >
          Not a guess and not a model. We read what you write against{" "}
          {recordCount} real engagements, then name the person and
          the reason.
        </EpisodeHead>
        <Reveal delay={0.1} className="mt-8">
          <div
            className={`bg-rag-card p-5 shadow-[var(--shadow-card)] ring-1 ring-iron/10 md:p-8 ${plate}`}
          >
            <MatchDesk compact />
          </div>
        </Reveal>
      </Episode>

      <Episode labelledBy="check">
        <Reveal>
          <div
            className={`relative grid overflow-hidden bg-iron text-rag sm:grid-cols-[1fr_11rem] ${plate}`}
          >
            <div className="relative p-6 md:p-8">
              <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-rag/70">
                07 · The Check
              </p>
              <Rise delay={0.06}>
                <h2
                  id="check-heading"
                  className="mt-2 max-w-[12ch] font-newsreader text-[28px] leading-[1.08] tracking-[-0.03em] text-signal md:text-[34px]"
                >
                  Five days. A verdict.
                </h2>
              </Rise>
              <p className="mt-4 font-newsreader text-[48px] leading-none tracking-[-0.04em] text-signal md:text-[56px]">
                <Count prefix="$" to={offer.check.price} />
              </p>
              <ol className="mt-5 flex flex-wrap gap-1.5">
                {homeDays.map((day, index) => (
                  <li key={day}>
                    <Reveal delay={0.2 + index * 0.05}>
                      <span className="inline-block rounded-full border border-rag/20 bg-iron/40 px-3 py-1 font-plex-mono text-[11px] uppercase tracking-[0.06em] text-rag/80">
                        {index + 1} · {day}
                      </span>
                    </Reveal>
                  </li>
                ))}
              </ol>
              <p className="mt-4 max-w-[34ch] font-newsreader text-[16px] leading-[1.45] text-rag/80">
                Keep, repair, or rebuild. Credited on a Close within 30 days.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => scrollToSection("intake")}
                  className="inline-flex items-center rounded-full bg-signal px-5 py-2.5 font-plex-sans text-[14px] font-medium text-iron"
                >
                  Start on this desk
                </button>
                <Link
                  href="/check"
                  className="font-plex-sans text-[14px] text-rag/80 underline decoration-rag/30 underline-offset-4 hover:text-rag"
                >
                  How the five days work
                </Link>
              </div>
            </div>
            {runner.photo ? (
              <Wipe className="relative min-h-[14rem] sm:min-h-full">
                <Image
                  src={runner.photo}
                  alt={runner.name}
                  fill
                  className="object-cover object-top"
                  sizes="176px"
                />
              </Wipe>
            ) : null}
          </div>
        </Reveal>
        <Reveal delay={0.1} className="mt-8">
          <div id="intake" className="scroll-mt-[5.75rem] pb-24 md:scroll-mt-28">
            <PulseCheckIntake
              key={fit ? `${fit.situation}:${fit.note}` : "open"}
              source="home"
              prefill={
                fit ? { situation: fit.situation, stuckNote: fit.note } : undefined
              }
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
