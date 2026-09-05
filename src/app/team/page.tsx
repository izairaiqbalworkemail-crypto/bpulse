import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { PortraitStrip } from "@/components/PortraitStrip";
import { PageClose } from "@/components/PageClose";
import { specialists } from "@/content/specialists";
import { crewCapability, crewCapabilityLine } from "@/content/crew-lines";
import {
  Atmosphere,
  AtmosphereNote,
} from "@/components/landing/Atmosphere";
import { Reveal } from "@/components/landing/Reveal";

export const metadata: Metadata = buildMetadata({
  title: "The crew",
  description:
    "The named specialists who do the work. No subcontracting to strangers mid-build.",
  path: "/team",
});

const groups = ["Integration", "Delivery", "Intelligence", "Operations"] as const;

export default function TeamPage() {
  return (
    <section className="w-full bg-rag">
      <PageHero
        kicker="The crew"
        title="The people who ship it."
        dek="Named. No grey boxes. A missing photograph is initials, not a hole."
        hideAction
      />

      <div className="relative overflow-hidden pb-24">
        <Atmosphere kind="paper" opacity={0.16} />
        <div className="relative w-full px-5 pt-8 md:px-8 md:pt-12">
          <PortraitStrip people={specialists} size="large" />
          <div className="mt-4">
            <AtmosphereNote />
          </div>
        </div>

        <div className="relative grid-container mt-20">
          {groups.map((group, index) => {
            const people = specialists.filter(
              (person) => crewCapability[person.id] === group
            );
            if (people.length === 0) return null;
            return (
              <Reveal key={group} delay={index * 0.06}>
              <div className="border-t border-iron/15 py-8">
                <p className="font-plex-mono text-[13px] uppercase tracking-[0.08em] text-ink/70">
                  {group}
                </p>
                <p className="mt-2 font-newsreader text-[16px] text-ink/80">
                  {crewCapabilityLine[group]}
                </p>
                <ul className="mt-4 flex flex-col">
                  {people.map((person) => (
                    <li key={person.id}>
                      <Link
                        href={`/team/${person.id}`}
                        className="flex flex-wrap items-baseline justify-between gap-3 border-b border-iron/15 py-3"
                      >
                        <span className="font-plex-sans text-[16px] text-iron underline decoration-iron/30 underline-offset-4">
                          {person.name}
                        </span>
                        <span className="font-newsreader text-[16px] text-ink/80">
                          {person.role}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              </Reveal>
            );
          })}
          <p className="mt-10 font-newsreader text-[18px] text-iron">
            Not sure who you need?{" "}
            <Link
              href="/match"
              className="underline decoration-iron/30 underline-offset-4 hover:decoration-iron"
            >
              Match it against the record
            </Link>
            .
          </p>
          <PageClose line="The name on the Check is the name on the Close." />
        </div>
      </div>
    </section>
  );
}
