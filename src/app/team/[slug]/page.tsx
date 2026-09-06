import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PersonJsonLd, BreadcrumbJsonLd } from "@/lib/JsonLd";
import { specialists, getSpecialist } from "@/content/specialists";
import { crewAttach, crewJourney } from "@/content/crew-lines";
import { Trace } from "@/components/trace/Trace";
import { lotsForPerson, specFromLots } from "@/lib/lot-trace";
import { PeopleRail } from "@/components/PeopleRail";
import {
  Atmosphere,
  AtmosphereNote,
} from "@/components/landing/Atmosphere";
import { Tilt } from "@/components/landing/Reveal";
import { PageHero } from "@/components/PageHero";
import { brand } from "@/config/brand";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return specialists.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const specialist = getSpecialist(slug);
  return buildMetadata({
    title: specialist.name,
    description: `${specialist.role} at bpulse. ${specialist.philosophy}`,
    path: `/team/${specialist.id}`,
  });
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export default async function SpecialistPage({ params }: PageProps) {
  const { slug } = await params;
  const specialist = getSpecialist(slug);
  const specialistLots = lotsForPerson(specialist);
  const absent = specialist.photoStatus === "Photo pending" || !specialist.photo;
  const journey = crewJourney[specialist.id] ?? specialist.bio;
  const attach = crewAttach[specialist.id] ?? [];
  const firstName = specialist.name.split(" ")[0] ?? specialist.name;

  return (
    <>
      <PersonJsonLd name={specialist.name} jobTitle={specialist.role} />
      <BreadcrumbJsonLd
        items={[
          { name: "The crew", url: `${brand.url}/team` },
          { name: specialist.name, url: `${brand.url}/team/${specialist.id}` },
        ]}
      />

      <PageHero
        kicker={specialist.role}
        title={specialist.name}
        dek={specialist.philosophy}
        actionHref={`/direct/${specialist.id}`}
        actionLabel={`Write ${firstName}`}
      />

      <section className="relative w-full overflow-hidden bg-rag">
        <Atmosphere kind="paper" opacity={0.16} />
        <div className="relative grid-container pb-24 pt-10 md:pb-32 md:pt-16">
          <PeopleRail
            people={specialists.filter((person) => person.id !== specialist.id)}
            line="The rest of the crew"
          />
          <div className="mt-3 mb-10">
            <AtmosphereNote />
          </div>
          <Tilt>
            <div className="card-iron mx-auto max-w-[20rem]">
            {absent ? (
              <div className="grid h-64 w-full place-items-center md:h-80">
                <span className="font-newsreader type-display-xl text-[72px] leading-none">
                  {initials(specialist.name)}
                </span>
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={specialist.photo}
                alt={specialist.name}
                width={320}
                height={400}
                className="h-64 w-full object-cover object-top grayscale md:h-80"
              />
            )}
            </div>
          </Tilt>

          <div className="mt-16 grid gap-12 md:grid-cols-2">
            <div>
              <p className="font-plex-mono text-[13px] uppercase tracking-[0.08em] text-ink/70">
                Journey
              </p>
              <p className="mt-3 max-w-[48ch] font-newsreader text-[18px] leading-[1.55] text-ink">
                {journey}
              </p>
            </div>
            {attach.length > 0 ? (
              <div>
                <p className="font-plex-mono text-[13px] uppercase tracking-[0.08em] text-ink/70">
                  Working with them
                </p>
                <ul className="mt-3 flex flex-col gap-3">
                  {attach.map((line) => (
                    <li
                      key={line}
                      className="max-w-[48ch] font-newsreader text-[18px] leading-[1.55] text-ink"
                    >
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          {specialist.id === "hamza" ? (
            <section className="card mt-14 p-8">
              <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">Legal scope</p>
              <p className="mt-2 max-w-[58ch] font-newsreader text-[18px] leading-[1.5] text-iron">
                Hamza owns legal and risk routing for NDAs, IP assignment, and procurement legal questions.
                The standard forms on /legal are active; each executed set is reviewed by a solicitor
                in the client jurisdiction before completion.
              </p>
              <p className="mt-3 font-plex-sans text-[14px] text-ink">
                See <Link href="/legal" className="underline underline-offset-4">/legal</Link> for the register.
              </p>
            </section>
          ) : null}

          {specialistLots.length > 0 ? (
            <div className="mt-16">
              <p className="font-plex-mono text-[13px] uppercase tracking-[0.08em] text-ink/70">
                The lots, as a trace
              </p>
              <div className="card-iron mt-4 px-6 py-8">
                <Trace
                  spec={specFromLots(
                    specialist.id,
                    specialistLots,
                    `Lots ${firstName} worked on`,
                  )}
                  size="full"
                  surface="iron"
                  labelled
                />
              </div>
              <p className="mt-10 font-plex-mono text-[13px] uppercase tracking-[0.08em] text-ink/70">
                Lots they shipped
              </p>
              <ul className="mt-4">
                {specialistLots.map((lot) => (
                  <li key={lot.slug}>
                    <Link
                      href={`/work/${lot.slug}`}
                      className="flex items-baseline justify-between gap-4 border-b border-iron/20 py-4"
                    >
                      <span className="font-plex-sans text-[16px] text-iron underline decoration-iron/30 underline-offset-4">
                        {lot.client}
                      </span>
                      <span className="font-newsreader text-[16px] text-ink/80">
                        {lot.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {specialist.reviews && specialist.reviews.length > 0 ? (
            <div className="mt-16">
              <p className="font-plex-mono text-[13px] uppercase tracking-[0.08em] text-ink/70">
                Client quotes
              </p>
              <ul className="mt-4 flex flex-col gap-8">
                {specialist.reviews.map((review) => {
                  const slack = review.source?.toLowerCase().startsWith("slack:");
                  return (
                    <li key={review.quote} className="card max-w-[60ch] px-8 py-8">
                      <blockquote className="font-newsreader text-[18px] leading-[1.5] text-ink">
                        “{review.quote}”
                      </blockquote>
                      <p className="mt-2 font-plex-mono text-[13px] text-ink/70">
                        {slack ? review.source : `${review.name}, ${review.role}`}
                        {review.source && !slack ? ` · ${review.source}` : null}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}

          <div className="mt-20">
            <p className="mb-4 font-plex-mono text-[13px] uppercase tracking-[0.08em] text-ink/70">
              Direct line · {firstName}
            </p>
            <Link
              href={`/direct/${specialist.id}`}
              className="inline-flex min-h-11 items-center rounded-full bg-signal px-5 py-2.5 font-plex-sans text-[14px] font-medium text-iron"
            >
              Write {firstName}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
