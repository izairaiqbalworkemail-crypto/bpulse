import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { PortraitStrip } from "@/components/PortraitStrip";
import { PageClose } from "@/components/PageClose";
import { specialists } from "@/content/specialists";
import { crewCapability, crewCapabilityLine } from "@/content/crew-lines";
import { pageFrame } from "@/content/platform";
import { Episode } from "@/components/episode/Episode";
import { Reveal } from "@/components/landing/Reveal";
import {
  admission,
  assignmentStatus,
  assignmentStatusLabel,
} from "@/lib/assignment";

export const metadata: Metadata = buildMetadata({
  title: "Admitted to the standard",
  description: pageFrame.team,
  path: "/team",
});

const groups = ["Integration", "Delivery", "Intelligence", "Operations"] as const;

export default function TeamPage() {
  return (
    <>
      <PageHero
        kicker="Admitted"
        title="Admitted to the standard."
        dek={pageFrame.team}
        hideAction
      />

      <Episode tone="cocoa">
        <PortraitStrip people={specialists} size="large" />
      </Episode>

      <Episode tone="paper">
        <div>
          {groups.map((group, index) => {
            const people = specialists.filter(
              (person) => crewCapability[person.id] === group,
            );
            if (people.length === 0) return null;
            return (
              <Reveal key={group} delay={index * 0.06}>
                <div className="mb-12 border-t border-iron/12 pt-8">
                  <p className="font-plex-mono text-[13px] uppercase tracking-[0.08em] text-ink/70">
                    {group}
                  </p>
                  <p className="mt-2 font-newsreader text-[16px] text-ink">
                    {crewCapabilityLine[group]}
                  </p>
                  <ul className="mt-6 flex flex-col">
                    {people.map((person) => {
                      const line = admission(person);
                      const status = assignmentStatus(person);
                      return (
                        <li key={person.id}>
                          <Link
                            href={`/team/${person.id}`}
                            className="grid gap-1 border-b border-iron/10 py-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-baseline"
                          >
                            <span>
                              <span className="block font-plex-sans text-[16px] text-iron underline decoration-iron/30 underline-offset-4">
                                {person.name}
                              </span>
                              <span className="mt-1 block font-newsreader text-[15px] text-ink">
                                {line.standing}
                              </span>
                            </span>
                            <span className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">
                              {assignmentStatusLabel(status)}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Reveal>
            );
          })}
          <p className="mt-4 font-newsreader text-[18px] text-iron">
            The platform assigns from this bench.{" "}
            <Link
              href="/match"
              className="underline decoration-iron/30 underline-offset-4 hover:decoration-iron"
            >
              Describe what’s stuck
            </Link>
            .
          </p>
          <PageClose line="The name on the Check is the name on the Close." />
        </div>
      </Episode>
    </>
  );
}
