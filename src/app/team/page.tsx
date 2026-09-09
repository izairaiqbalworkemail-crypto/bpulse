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
import { LetterLedger } from "@/components/letter/LetterLedger";
import { Reveal } from "@/components/landing/Reveal";
import {
  admission,
  assignmentStatus,
  assignmentStatusLabel,
} from "@/lib/assignment";

export const metadata: Metadata = buildMetadata({
  title: "Our engineers",
  description: pageFrame.team,
  path: "/team",
});

const groups = ["Integration", "Delivery", "Intelligence", "Operations"] as const;

export default function TeamPage() {
  return (
    <>
      <PageHero
        kicker="Our engineers"
        title="These twelve ship."
        dek={pageFrame.team}
        cut="Team"
      />

      <Episode tone="paper">
        <PortraitStrip people={specialists} size="large" />
        <div className="mt-16">
          {groups.map((group, index) => {
            const people = specialists.filter(
              (person) => crewCapability[person.id] === group,
            );
            if (people.length === 0) return null;
            return (
              <Reveal key={group} delay={index * 0.06}>
                <div className="mb-12 border-t border-ink/12 pt-8">
                  <p className="font-plex-mono text-[13px] uppercase tracking-[0.08em] text-quill/70">
                    {group}
                  </p>
                  <p className="mt-2 font-newsreader text-[16px] text-quill">
                    {crewCapabilityLine[group]}
                  </p>
                  <div className="mt-6">
                    <LetterLedger
                      lines={people.map((person) => {
                        const line = admission(person);
                        const status = assignmentStatus(person);
                        return {
                          id: person.id,
                          title: person.name,
                          body: line.standing,
                          meta: assignmentStatusLabel(status),
                          href: `/team/${person.id}`,
                          ask: "Open",
                        };
                      })}
                    />
                  </div>
                </div>
              </Reveal>
            );
          })}
          <p className="mt-4 font-newsreader text-[18px] text-ink">
            The platform assigns from this bench.{" "}
            <Link
              href="/read"
              className="underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
            >
              Get my free read
            </Link>
            .
          </p>
          <PageClose line="The name on the Check is the name on the Close." />
        </div>
      </Episode>
    </>
  );
}
