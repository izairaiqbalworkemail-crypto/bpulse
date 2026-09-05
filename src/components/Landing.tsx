"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { LotPlate } from "@/components/catalog/LotPlate";
import { Episode, EpisodeHead } from "@/components/episode/Episode";
import { FitBand, type FitSelection } from "@/components/landing/FitBand";
import {
  Count,
  Item,
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
  controlCards,
  homeCrew,
  homeDays,
  homeLots,
  homePath,
} from "@/content/landing";
import { getLot } from "@/content/lots";
import { offer } from "@/content/offer";
import { getSpecialist, specialists } from "@/content/specialists";
import type { Specialist } from "@/content/types";
import { scrollToSection } from "@/lib/scroll-section";

const linkQuiet =
  "font-plex-sans text-[15px] text-iron underline decoration-iron/30 underline-offset-4 hover:decoration-iron";
const linkQuietRag =
  "font-plex-sans text-[15px] text-rag underline decoration-rag/35 underline-offset-4 hover:decoration-rag";

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
    <Tilt intensity={6}>
      <Link href={`/team/${person.id}`} className="group block h-full">
        <article className="card flex h-full flex-col overflow-hidden">
          <Wipe>
            <div className="relative aspect-[4/5] bg-iron">
              {absent ? (
                <div className="grid h-full place-items-center">
                  <span className="font-newsreader text-[48px] leading-none text-rag">
                    {initials}
                  </span>
                </div>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={person.photo}
                  alt={person.name}
                  width={480}
                  height={600}
                  className={`h-full w-full object-cover object-top grayscale ${
                    reduce
                      ? ""
                      : "transition-[filter,transform] duration-700 group-hover:scale-[1.04] group-hover:grayscale-0"
                  }`}
                />
              )}
            </div>
          </Wipe>
          <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
            <div>
              <h3 className="font-newsreader text-[26px] leading-[1.15] text-iron">
                {person.name}
              </h3>
              <p className="mt-2 font-newsreader text-[16px] leading-[1.4] text-ink">
                {person.role}
              </p>
            </div>
            <p className="mt-6 font-plex-sans text-[14px] text-iron/70">
              Profile →
            </p>
          </div>
        </article>
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
      <Episode labelledBy="argument" tone="cocoa">
        <EpisodeHead
          n="01"
          kicker="The last twenty"
          id="argument"
          heading="Most products die at 80%."
          tone="cocoa"
        >
          Integration, compliance, handover. You keep the lock, the portal, and
          the keys.
        </EpisodeHead>
        <Stagger className="mt-12 grid gap-5 md:grid-cols-2" delay={0.08} gap={0.08}>
          {controlCards.map((lock) => (
            <Item key={lock.title}>
              <Link
                href={lock.href}
                className="group flex h-full min-h-[16rem] flex-col justify-between rounded-[24px] bg-iron-card p-8 shadow-[var(--shadow-card)] md:p-10"
              >
                <div>
                  <h3 className="max-w-[18ch] font-newsreader text-[26px] leading-[1.15] text-rag md:text-[30px]">
                    {lock.title}
                  </h3>
                  <p className="mt-4 max-w-[36ch] font-newsreader text-[17px] leading-[1.5] text-rag/75">
                    {lock.body}
                  </p>
                </div>
                <p className="mt-8 font-plex-sans text-[15px] text-signal">
                  {lock.label} →
                </p>
              </Link>
            </Item>
          ))}
        </Stagger>
      </Episode>

      <Episode labelledBy="fit" tone="paper">
        <EpisodeHead
          n="02"
          kicker="Which is it"
          id="fit"
          heading="Pick the wound. The brief already knows."
        >
          One tap starts the Check with that situation on the record.
        </EpisodeHead>
        <Reveal delay={0.1} className="mt-12">
          <FitBand onStart={pickFit} />
        </Reveal>
      </Episode>

      <Episode labelledBy="catalogue" tone="milk">
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
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {lots.map((lot, index) => (
            <Reveal
              key={lot.slug}
              delay={0.1 + index * 0.08}
              className={index === 0 ? "lg:col-span-2" : undefined}
            >
              <LotPlate lot={lot} compact={index !== 0} />
            </Reveal>
          ))}
        </div>
      </Episode>

      <Episode labelledBy="path" tone="paper">
        <EpisodeHead
          n="04"
          kicker="The path"
          id="path"
          heading="Check. Close. Standing if you want it."
        >
          Lowest risk first. Nothing starts until you sign the lock.
        </EpisodeHead>
        <Stagger className="mt-12 grid gap-6" delay={0.1} gap={0.1}>
          {homePath.map((step, index) => (
            <Item key={step.name}>
              <Tilt>
                <Link
                  href={step.href}
                  className="card-iron group grid min-h-[18rem] md:grid-cols-[1fr_18rem]"
                >
                  <div className="relative z-10 flex min-h-[18rem] flex-col justify-between p-8 md:p-10">
                    <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-rag/70">
                      {String(index + 1).padStart(2, "0")} · {step.meter}
                    </p>
                    <div>
                      <h3 className="font-newsreader text-[32px] leading-[1.1] tracking-[-0.015em] text-rag md:text-[40px]">
                        {step.name}
                      </h3>
                      <p className="mt-3 max-w-[42ch] font-newsreader text-[17px] leading-[1.45] text-rag/80">
                        {step.body}
                      </p>
                      <p className="mt-5 font-plex-sans text-[15px] text-signal">
                        {step.label} →
                      </p>
                    </div>
                  </div>
                  <Wipe className="relative min-h-[14rem] md:min-h-full">
                    <Image
                      src={step.image}
                      alt=""
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                      sizes="288px"
                    />
                  </Wipe>
                </Link>
              </Tilt>
            </Item>
          ))}
        </Stagger>
      </Episode>

      <Episode labelledBy="crew" tone="cocoa">
        <EpisodeHead
          n="05"
          kicker="The same hands"
          id="crew"
          heading="The people who scope it ship it."
          tone="cocoa"
          aside={
            <Link href="/team" className={linkQuietRag}>
              The whole crew
            </Link>
          }
        >
          {specialists.length} named people. No handoff mid-build.
        </EpisodeHead>
        <Stagger
          className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
          delay={0.1}
          gap={0.07}
        >
          {crew.map((person) => (
            <Item key={person.id}>
              <CrewCard person={person} />
            </Item>
          ))}
        </Stagger>
        {more > 0 ? (
          <Reveal delay={0.16}>
            <p className="mt-10 font-newsreader text-[18px] text-rag/80">
              <Link href="/team" className={linkQuietRag}>
                {more} more on the crew page
              </Link>
            </p>
          </Reveal>
        ) : null}
      </Episode>

      <Episode labelledBy="match" tone="milk">
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
          {recordCount} real engagements, then name the person and the reason.
        </EpisodeHead>
        <Reveal delay={0.1} className="mt-12">
          <div className="card p-8 md:p-12">
            <MatchDesk compact />
          </div>
        </Reveal>
      </Episode>

      <Episode labelledBy="check" tone="signal">
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_16rem]">
          <div>
            <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-iron/70">
              07 · The Check
            </p>
            <Rise delay={0.06}>
              <h2
                id="check-heading"
                className="mt-3 max-w-[12ch] font-newsreader text-[32px] leading-[1.1] tracking-[-0.015em] text-iron md:text-[42px]"
              >
                Five days. A verdict.
              </h2>
            </Rise>
            <p className="mt-6 font-newsreader text-[64px] leading-none tracking-[-0.03em] text-iron md:text-[80px]">
              <Count prefix="$" to={offer.check.price} />
            </p>
            <ol className="mt-8 flex flex-wrap gap-2">
              {homeDays.map((day, index) => (
                <li key={day}>
                  <Reveal delay={0.2 + index * 0.05}>
                    <span className="inline-block rounded-full bg-iron/[0.08] px-4 py-2 font-plex-mono text-[12px] uppercase tracking-[0.06em] text-iron/80">
                      {index + 1} · {day}
                    </span>
                  </Reveal>
                </li>
              ))}
            </ol>
            <p className="mt-6 max-w-[38ch] font-newsreader text-[18px] leading-[1.5] text-iron/85">
              Keep, repair, or rebuild. Credited on a Close within 30 days.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => scrollToSection("intake")}
                className="inline-flex min-h-12 items-center rounded-full bg-iron px-6 py-3 font-plex-sans text-[15px] font-medium text-rag"
              >
                Start on this desk
              </button>
              <Link
                href="/check"
                className="font-plex-sans text-[15px] text-iron/80 underline decoration-iron/30 underline-offset-4 hover:text-iron"
              >
                How the five days work
              </Link>
            </div>
          </div>
          {runner.photo ? (
            <Wipe className="relative min-h-[20rem] overflow-hidden rounded-[24px]">
              <Image
                src={runner.photo}
                alt={runner.name}
                fill
                className="object-cover object-top"
                sizes="256px"
              />
            </Wipe>
          ) : null}
        </div>
        <Reveal delay={0.1} className="mt-16">
          <div id="intake" className="scroll-mt-[5.75rem] md:scroll-mt-28">
            <PulseCheckIntake
              key={fit ? `${fit.situation}:${fit.note}` : "open"}
              source="home"
              prefill={
                fit
                  ? { situation: fit.situation, stuckNote: fit.note }
                  : undefined
              }
            />
          </div>
        </Reveal>
        <Reveal delay={0.14} className="mt-8">
          <VettedPay />
        </Reveal>
        <Reveal delay={0.18} className="mt-8">
          <PassAlong />
        </Reveal>
      </Episode>
    </>
  );
}
