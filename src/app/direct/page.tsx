import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Episode } from "@/components/episode/Episode";
import { LetterObject, LetterObjects } from "@/components/letter/LetterObject";
import { BreadcrumbJsonLd } from "@/lib/JsonLd";
import { brand } from "@/config/brand";
import {
  crewCapability,
  crewCapabilityLine,
} from "@/content/crew-lines";
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

      <Episode tone="paper">
        <p className="max-w-[46ch] font-newsreader text-[20px] leading-[1.4] text-ink">
          Not sure? Start with{" "}
          <Link
            href="/direct/aneeb"
            className="underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
          >
            Aneeb
          </Link>
          .
        </p>
        <p className="mt-4 font-newsreader text-[17px] text-quill">
          Don&apos;t know who you need?{" "}
          <Link
            href="/match"
            className="text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
          >
            Match it against our work
          </Link>
          .
        </p>

        {grouped.map((group) => (
          <div key={group.capability} className="mt-16">
            <p className="font-plex-mono text-[13px] uppercase tracking-[0.08em] text-quill/70">
              {group.capability}
            </p>
            <p className="mt-2 max-w-[48ch] font-newsreader text-[18px] leading-[1.4] text-quill">
              {group.line}
            </p>
            <LetterObjects className="mt-6 grid gap-5 md:grid-cols-2">
              {group.people.map((person) => {
                const gate = gateLine(person.id);
                const shipped = lotsForPerson(person);
                const portrait =
                  person.photo && person.photoStatus === "Photo";
                return (
                  <LetterObject
                    key={person.id}
                    href={`/direct/${person.id}`}
                    label={`Write ${person.name}`}
                  >
                    <div className="flex items-start gap-4">
                      <span className="grid h-20 w-16 shrink-0 place-items-center overflow-hidden bg-ink text-paper md:h-24 md:w-20">
                        {portrait ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={person.photo}
                            alt=""
                            width={80}
                            height={96}
                            className="h-full w-full object-cover object-top"
                          />
                        ) : (
                          <span className="font-newsreader text-[24px]">
                            {initials(person.name)}
                          </span>
                        )}
                      </span>
                      <div className="min-w-0">
                        <h2 className="font-newsreader text-[24px] leading-[1.1] text-ink">
                          {person.name}
                        </h2>
                        <p className="mt-1 font-plex-sans text-[14px] text-quill">
                          {crewCapability[person.id]}
                        </p>
                        <p className="mt-2 font-plex-mono text-[12px] text-quill/70">
                          {gate.label}
                        </p>
                      </div>
                    </div>
                    {shipped.length > 0 ? (
                      <p className="mt-5 font-plex-mono text-[12px] uppercase tracking-[0.06em] text-quill/60">
                        Work · {shipped.map((lot) => lot.client).join(" · ")}
                      </p>
                    ) : null}
                    <p className="mt-3 font-newsreader text-[17px] leading-[1.4] text-quill">
                      Write {firstName(person.name)} about {person.writeAbout}
                    </p>
                    <p className="mt-5 font-plex-mono text-[12px] uppercase tracking-[0.06em] text-quill/55">
                      {person.availability}
                    </p>
                  </LetterObject>
                );
              })}
            </LetterObjects>
          </div>
        ))}
      </Episode>
    </>
  );
}
