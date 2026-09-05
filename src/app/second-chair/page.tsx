import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import { ServiceJsonLd } from "@/lib/JsonLd";
import { PageHero } from "@/components/PageHero";
import { SignalPlate } from "@/components/SignalPlate";
import { StageRail } from "@/components/StageRail";
import { TierTable } from "@/components/TierTable";
import { Atmosphere } from "@/components/landing/Atmosphere";
import { Reveal } from "@/components/landing/Reveal";
import { Desk } from "@/components/conversation/Desk";
import {
  secondChair,
  secondChairMonth,
  secondChairProof,
  secondChairSkills,
  secondChairTiers,
} from "@/content/second-chair";
import { getSpecialist } from "@/content/specialists";
import { lots } from "@/content/lots";

export const metadata: Metadata = buildMetadata({
  title: "Second Chair",
  description: secondChair.description,
  path: "/second-chair",
});

export default function SecondChairPage() {
  const person = getSpecialist(secondChair.assignedId);
  const first = person.name.split(" ")[0] ?? person.name;
  const theirLots = lots.filter((lot) =>
    person.record.some((row) => row.org.toLowerCase() === lot.client.toLowerCase()),
  );

  return (
    <>
      <ServiceJsonLd
        name={secondChair.name}
        description={secondChair.description}
        price="2400"
      />

      <PageHero
        kicker="Second Chair"
        title="We finish it. Then we make sure you can keep it."
        dek={secondChair.reframe}
        hideAction
      />

      <SignalPlate
        kicker="Second Chair · monthly"
        price="$2,400"
        title="A named senior, on your repo."
        line={secondChair.description}
        facts={[
          {
            kicker: "Handover",
            body: "Included in every Close. Two weeks with the engineer who built it.",
          },
          {
            kicker: "Second Chair",
            body: "$2,400/month. Weekly. Async between sessions. Curriculum from your codebase.",
          },
          {
            kicker: "Team",
            body: "$6,000/month. Up to six people, plus a monthly review of what they shipped.",
          },
        ]}
        href="#intake"
        action={`Write ${first}`}
      />

      <section className="relative w-full overflow-hidden bg-rag">
        <Atmosphere kind="paper" opacity={0.16} />
        <div className="relative grid-container py-16 md:py-24">
          <Reveal>
            <p className="font-plex-mono text-[13px] uppercase tracking-[0.08em] text-ink/70">
              The assigned engineer
            </p>
          </Reveal>
          <Reveal className="mt-6">
            <div className="card">
              <div className="grid gap-8 p-6 md:grid-cols-[16rem_1fr] md:p-8">
                {person.photo ? (
                  <div className="card-iron aspect-[4/5]">
                    <Image
                      src={person.photo}
                      alt={person.name}
                      width={480}
                      height={600}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                ) : null}
                <div>
                  <p className="font-newsreader text-[36px] leading-[1.1] text-iron">
                    You&apos;d work with {first}
                  </p>
                  <p className="mt-2 font-newsreader text-[18px] text-ink">
                    {person.role}
                  </p>
                  <p className="mt-4 max-w-[40ch] font-newsreader text-[20px] leading-[1.4] text-iron">
                    {person.philosophy}
                  </p>
                  <p className="mt-4 font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">
                    <Link
                      href="/standard"
                      className="underline decoration-iron/30 underline-offset-4"
                    >
                      Client-facing · Gate 4
                    </Link>
                  </p>
                  <p className="mt-6 max-w-[46ch] font-newsreader text-[16px] leading-[1.5] text-ink">
                    {person.bio} A named senior. Not a cohort. Not a queue.
                  </p>
                  {theirLots.length > 0 ? (
                    <ul className="mt-6 flex flex-col gap-2">
                      {theirLots.map((lot) => (
                        <li key={lot.slug}>
                          <Link
                            href={`/work/${lot.slug}`}
                            className="font-plex-sans text-[15px] text-iron underline decoration-iron/30 underline-offset-4"
                          >
                            {lot.client} · {lot.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <p className="mt-6">
                    <Link
                      href={`/team/${person.id}`}
                      className="font-plex-sans text-[14px] text-iron underline decoration-iron/30 underline-offset-4"
                    >
                      Full profile
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="mt-16">
            <p className="font-plex-mono text-[13px] uppercase tracking-[0.08em] text-ink/70">
              What a month looks like
            </p>
          </Reveal>
          <StageRail stages={secondChairMonth} label="A month in Second Chair" />

          <div className="mt-16 flex flex-col gap-10">
            {secondChairSkills.map((skill) => (
              <Reveal key={skill.name}>
                <div className="card px-8 py-10">
                  <h2 className="font-newsreader text-[28px] leading-[1.15] text-iron">
                    {skill.name}
                  </h2>
                  <p className="mt-3 max-w-[58ch] font-newsreader text-[18px] leading-[1.45] text-ink">
                    {skill.body}
                  </p>
                  <p className="mt-4 max-w-[58ch] font-newsreader text-[16px] leading-[1.5] text-ink/80">
                    {skill.example}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16">
            <TierTable
              tiers={secondChairTiers}
              caption="Handover is included. Second Chair is the one that renews."
            />
          </Reveal>

          {secondChairProof.length > 0 ? (
            <div className="mt-16">
              <p className="font-plex-mono text-[13px] uppercase tracking-[0.08em] text-ink/70">
                Proof
              </p>
              <ul className="mt-6 flex flex-col gap-8">
                {secondChairProof.map((item) => (
                  <li key={item.quote} className="card max-w-[60ch] px-8 py-8">
                    <blockquote className="font-newsreader text-[20px] leading-[1.4] text-iron">
                      “{item.quote}”
                    </blockquote>
                    <p className="mt-2 font-plex-mono text-[13px] text-ink/70">
                      {item.name}, {item.role}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div id="intake" className="mt-20 scroll-mt-[5.75rem] md:scroll-mt-28">
            <p className="mb-4 font-plex-mono text-[13px] uppercase tracking-[0.08em] text-ink/70">
              Direct line · {first}
            </p>
            <Desk scriptId="second-chair" ending="enquiry" />
          </div>
        </div>
      </section>
    </>
  );
}
