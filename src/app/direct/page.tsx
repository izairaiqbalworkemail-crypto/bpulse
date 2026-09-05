import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Atmosphere } from "@/components/landing/Atmosphere";
import { BreadcrumbJsonLd } from "@/lib/JsonLd";
import { brand } from "@/config/brand";
import {
  crewCapability,
  crewCapabilityLine,
} from "@/content/crew-lines";
import { lots } from "@/content/lots";
import { specialists } from "@/content/specialists";
import { gateLine } from "@/lib/direct/gate";
import { firstName, initials, lotsForPerson } from "@/lib/lot-trace";

export const metadata: Metadata = buildMetadata({
  title: "Write someone directly",
  description:
    "A written intake, not a chatbot. Twelve specialists. Write to the person who will act on the answer.",
  path: "/direct",
});

const CAPABILITY_ORDER = [
  "Delivery",
  "Integration",
  "Intelligence",
  "Operations",
] as const;

export default function DirectPage() {
  const grouped = CAPABILITY_ORDER.map((capability) => ({
    capability,
    line: crewCapabilityLine[capability],
    people: specialists.filter(
      (person) => crewCapability[person.id] === capability,
    ),
  })).filter((group) => group.people.length > 0);

  return (
    <>
      <BreadcrumbJsonLd
        items={[{ name: "Direct", url: `${brand.url}/direct` }]}
      />
      <PageHero
        kicker="Direct line"
        title="Twelve specialists. Write to one."
        dek="A written intake, not a chatbot. Nobody is typing. The person you pick reads it and replies within one business day."
        hideAction
      />

      <section className="relative w-full overflow-hidden bg-rag pb-24">
        <Atmosphere kind="paper" opacity={0.16} />
        <div className="relative grid-container pt-10 md:pt-14">
          <p className="max-w-[48ch] font-newsreader text-[18px] leading-[1.5] text-ink">
            Not sure? Start with{" "}
            <Link
              href="/direct/aneeb"
              className="text-iron underline decoration-iron/30 underline-offset-4 hover:decoration-iron"
            >
              Aneeb
            </Link>
            . Don&apos;t know who you need?{" "}
            <Link
              href="/match"
              className="text-iron underline decoration-iron/30 underline-offset-4 hover:decoration-iron"
            >
              Match it against the record
            </Link>
            .
          </p>

          {grouped.map((group) => (
            <div key={group.capability} className="mt-14">
              <p className="font-plex-mono text-[13px] uppercase tracking-[0.08em] text-ink/70">
                {group.capability}
              </p>
              <p className="mt-2 max-w-[48ch] font-newsreader text-[17px] text-ink">
                {group.line}
              </p>
              <ul className="mt-6 grid gap-4 md:grid-cols-2">
                {group.people.map((person) => {
                  const gate = gateLine(person.id);
                  const shipped = lotsForPerson(person);
                  const namedLots =
                    shipped.length > 0
                      ? shipped
                      : lots.filter((lot) =>
                          person.record.some(
                            (row) =>
                              row.org.toLowerCase() === lot.client.toLowerCase(),
                          ),
                        );
                  const portrait =
                    person.photo && person.photoStatus === "Photo";
                  return (
                    <li key={person.id}>
                      <Link
                        href={`/direct/${person.id}`}
                        className="group flex h-full flex-col rounded-[16px] bg-rag-card p-6 shadow-[var(--shadow-card)] ring-1 ring-iron/10 transition-shadow hover:shadow-[var(--shadow-raised)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-iron"
                      >
                        <div className="flex items-start gap-4">
                          <span className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-[14px] bg-iron text-rag">
                            {portrait ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={person.photo}
                                alt=""
                                width={64}
                                height={64}
                                className="h-full w-full object-cover object-top"
                              />
                            ) : (
                              <span className="font-newsreader text-[22px]">
                                {initials(person.name)}
                              </span>
                            )}
                          </span>
                          <div className="min-w-0">
                            <h2 className="font-newsreader text-[22px] leading-[1.15] text-iron">
                              {person.name}
                            </h2>
                            <p className="mt-1 font-plex-sans text-[14px] text-ink">
                              {crewCapability[person.id]}
                            </p>
                            <p className="mt-1 font-plex-mono text-[12px] text-ink/70">
                              {gate.label}
                            </p>
                          </div>
                        </div>
                        {namedLots.length > 0 ? (
                          <p className="mt-4 font-plex-mono text-[12px] text-ink/70">
                            {namedLots.map((lot) => lot.client).join(" · ")}
                          </p>
                        ) : null}
                        <p className="mt-3 font-newsreader text-[16px] leading-[1.4] text-ink">
                          Write {firstName(person.name)} about {person.writeAbout}
                        </p>
                        <p className="mt-4 font-plex-mono text-[12px] uppercase tracking-[0.06em] text-ink/60">
                          {person.availability}
                        </p>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
