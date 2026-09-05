"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Episode, EpisodeHead } from "@/components/episode/Episode";
import { FitBand, type FitSelection } from "@/components/landing/FitBand";
import {
  Count,
  Item,
  Reveal,
  Rise,
  Stagger,
} from "@/components/landing/Reveal";
import { PulseCheckIntake } from "@/components/intake/PulseCheckIntake";
import { MatchDesk } from "@/components/match/MatchDesk";
import { PassAlong } from "@/components/PassAlong";
import { SealedStill } from "@/components/SealedStill";
import { SignalFrame } from "@/components/SignalFrame";
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
import type { Lot, Specialist } from "@/content/types";
import { scrollToSection } from "@/lib/scroll-section";

const linkQuiet =
  "font-plex-sans text-[15px] text-iron underline decoration-iron/30 underline-offset-4 hover:decoration-iron";

function LotStory({ lot, flip }: Readonly<{ lot: Lot; flip?: boolean }>) {
  return (
    <Link
      href={`/work/${lot.slug}`}
      className={`group grid items-center gap-10 md:grid-cols-2 md:gap-16 ${
        flip ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] bg-iron">
        {lot.imageUrl ? (
          <Image
            src={lot.imageUrl}
            alt={`${lot.client} public site`}
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        ) : null}
      </div>
      <div>
        <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">
          {lot.lotNumber} · {lot.grade.label.replace(/ on arrival$/i, "")}
        </p>
        <h3 className="mt-3 font-newsreader text-[32px] leading-[1.1] text-iron md:text-[40px]">
          {lot.client}
        </h3>
        <p className="mt-4 max-w-[36ch] font-newsreader text-[18px] leading-[1.5] text-ink">
          {lot.summary}
        </p>
        <p className="mt-6 font-plex-sans text-[15px] text-iron">Open the lot →</p>
      </div>
    </Link>
  );
}

function CrewFigure({ person }: Readonly<{ person: Specialist }>) {
  const reduce = useReducedMotion();
  const absent = person.photoStatus === "Photo pending" || !person.photo;
  const initials = person.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <Link href={`/team/${person.id}`} className="group block min-w-0">
      <div className="relative aspect-[3/4] overflow-hidden rounded-[20px] bg-iron">
        {absent ? (
          <div className="grid h-full place-items-center">
            <span className="font-newsreader text-[40px] text-rag">{initials}</span>
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={person.photo}
            alt={person.name}
            width={360}
            height={480}
            className={`h-full w-full object-cover object-top grayscale ${
              reduce
                ? ""
                : "transition-[filter,transform] duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
            }`}
          />
        )}
      </div>
      <p className="mt-4 font-newsreader text-[22px] leading-[1.15] text-iron">
        {person.name}
      </p>
      <p className="mt-1 font-newsreader text-[15px] text-ink">{person.role}</p>
    </Link>
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
      <Episode labelledBy="argument" tone="paper">
        <EpisodeHead
          n="01"
          kicker="The last twenty"
          id="argument"
          heading="Most products die at 80%."
        >
          Integration, compliance, handover. You keep the lock, the portal, and
          the keys.
        </EpisodeHead>
        <Stagger className="mt-16 divide-y divide-iron/10" delay={0.06} gap={0.06}>
          {controlCards.map((lock, index) => (
            <Item key={lock.title}>
              <Link
                href={lock.href}
                className="grid gap-3 py-8 md:grid-cols-[4rem_1fr_auto] md:items-baseline md:gap-10"
              >
                <span className="font-plex-mono text-[13px] text-ink/70">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block font-newsreader text-[24px] leading-[1.2] text-iron md:text-[28px]">
                    {lock.title}
                  </span>
                  <span className="mt-2 block max-w-[46ch] font-newsreader text-[17px] leading-[1.5] text-ink">
                    {lock.body}
                  </span>
                </span>
                <span className="font-plex-sans text-[15px] text-iron">
                  {lock.label} →
                </span>
              </Link>
            </Item>
          ))}
        </Stagger>
      </Episode>

      <Episode labelledBy="fit" tone="milk">
        <EpisodeHead
          n="02"
          kicker="Which is it"
          id="fit"
          heading="Pick the wound. The brief already knows."
        >
          One tap starts the Check with that situation on the record.
        </EpisodeHead>
        <Reveal delay={0.1} className="mt-14">
          <FitBand onStart={pickFit} />
        </Reveal>
      </Episode>

      <Episode labelledBy="catalogue" tone="paper">
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
        <div className="mt-16 flex flex-col gap-24">
          {lots.map((lot, index) => (
            <Reveal key={lot.slug} delay={0.04 + index * 0.06}>
              <LotStory lot={lot} flip={index === 1} />
            </Reveal>
          ))}
        </div>
      </Episode>

      <Episode labelledBy="path" tone="milk">
        <EpisodeHead
          n="04"
          kicker="The path"
          id="path"
          heading="Check. Close. Standing if you want it."
        >
          Lowest risk first. Nothing starts until you sign the lock.
        </EpisodeHead>
        <ol className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
          {homePath.map((step, index) => (
            <li key={step.name}>
              <Reveal delay={index * 0.08}>
                <Link href={step.href} className="group block">
                  <p className="font-plex-mono text-[13px] text-ink/70">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 font-newsreader text-[32px] leading-[1.1] text-iron">
                    {step.name}
                  </h3>
                  <p className="mt-2 font-plex-mono text-[12px] uppercase tracking-[0.06em] text-ink/70">
                    {step.meter}
                  </p>
                  <p className="mt-4 max-w-[32ch] font-newsreader text-[16px] leading-[1.5] text-ink">
                    {step.body}
                  </p>
                  <p className="mt-6 font-plex-sans text-[15px] text-iron">
                    {step.label} →
                  </p>
                </Link>
              </Reveal>
            </li>
          ))}
        </ol>
      </Episode>

      <Episode labelledBy="crew" tone="paper">
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
        <Stagger
          className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3"
          delay={0.06}
          gap={0.06}
        >
          {crew.map((person) => (
            <Item key={person.id}>
              <CrewFigure person={person} />
            </Item>
          ))}
        </Stagger>
        {more > 0 ? (
          <Reveal delay={0.12}>
            <p className="mt-12 font-newsreader text-[18px] text-ink">
              <Link href="/team" className={linkQuiet}>
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
        <div className="mt-14 grid items-start gap-16 lg:grid-cols-2">
          <ol className="flex flex-col gap-10">
            {[
              {
                n: "01",
                title: "You write the stuck part",
                body: "Staging never tried in production. Auth nobody left understands. The more specific, the closer the read.",
              },
              {
                n: "02",
                title: "We check our record",
                body: `${recordCount} engagements. If your words sit next to a lot we already took, that is the match — and we show you why.`,
              },
              {
                n: "03",
                title: "A named person, with a reason",
                body: "No percentage. No “AI.” If nothing in the record is close, Aneeb reads it himself.",
              },
            ].map((step) => (
              <li key={step.n}>
                <Reveal>
                  <p className="font-plex-mono text-[13px] text-ink/70">{step.n}</p>
                  <h3 className="mt-2 font-newsreader text-[26px] leading-[1.15] text-iron">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-[36ch] font-newsreader text-[17px] leading-[1.5] text-ink">
                    {step.body}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
          <Reveal delay={0.1}>
            <MatchDesk compact />
          </Reveal>
        </div>
      </Episode>

      <SignalFrame id="check" labelledBy="check">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <Reveal>
            <SealedStill caption="Written. Sealed. You leave with the keys." />
          </Reveal>
          <div className="min-w-0">
            <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-iron/70">
              07 · The Check
            </p>
            <Rise delay={0.06}>
              <h2
                id="check-heading"
                className="mt-4 max-w-[12ch] font-newsreader text-[40px] leading-[1.08] tracking-[-0.015em] text-iron md:text-[56px]"
              >
                Five days. A verdict.
              </h2>
            </Rise>
            <p className="mt-8 font-newsreader text-[72px] leading-none tracking-[-0.03em] text-iron md:text-[96px]">
              <Count prefix="$" to={offer.check.price} />
            </p>
            <p className="mt-6 max-w-[36ch] font-newsreader text-[20px] leading-[1.45] text-iron/80">
              Keep, repair, or rebuild. Credited on a Close within 30 days.
            </p>
            <p className="mt-8 font-plex-mono text-[13px] uppercase tracking-[0.06em] text-iron/70">
              {homeDays.map((day, index) => (
                <span key={day}>
                  {index > 0 ? " · " : null}
                  {day}
                </span>
              ))}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-5">
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
              {runner.photo ? (
                <span className="hidden items-center gap-3 sm:flex">
                  <Image
                    src={runner.photo}
                    alt={runner.name}
                    width={44}
                    height={44}
                    className="h-11 w-11 rounded-full object-cover object-top"
                  />
                  <span className="font-newsreader text-[16px] text-iron">
                    {runner.name}
                  </span>
                </span>
              ) : null}
            </div>
          </div>
        </div>
        <Reveal delay={0.1} className="mt-16">
          <div
            id="intake"
            className="scroll-mt-[5.75rem] rounded-[20px] bg-rag p-6 ring-1 ring-iron/10 md:scroll-mt-28 md:p-10"
          >
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
        <Reveal delay={0.12} className="mt-10">
          <VettedPay surface="signal" />
        </Reveal>
        <Reveal delay={0.14} className="mt-10">
          <PassAlong />
        </Reveal>
      </SignalFrame>
    </>
  );
}
