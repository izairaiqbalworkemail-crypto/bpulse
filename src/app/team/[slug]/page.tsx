import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PersonJsonLd, BreadcrumbJsonLd } from "@/lib/JsonLd";
import { PageHero } from "@/components/PageHero";
import { specialists, getSpecialist } from "@/content/specialists";
import { lots } from "@/content/lots";
import { CrewSession } from "@/components/intake/CrewSession";
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
    description: `${specialist.role} at bpulse. ${specialist.bio}`,
    path: `/team/${specialist.id}`,
  });
}

export default async function SpecialistPage({ params }: PageProps) {
  const { slug } = await params;
  const specialist = getSpecialist(slug);

  const specialistLots = lots.filter(
    (lot) => lot.specialistId === specialist.id
  );

  const isAbsent = specialist.photoStatus === "Photo pending";

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
        dek={<>&ldquo;{specialist.funTitle}&rdquo;</>}
        actionHref="#intake"
        actionLabel="Work with them"
      />

      <section className="w-full bg-rag">
        <div className="grid-container pt-16 pb-24 md:pt-20 md:pb-32">
            {/* Split layout: bio left, intake right */}
            <div className="grid grid-cols-1 gap-x-12 gap-y-16 lg:grid-cols-[1fr_0.95fr] lg:gap-14">
              {/* Left: Bio */}
              <div>

                {/* Photo + commitment */}
                <div className="flex items-center gap-4">
                  {isAbsent ? (
                    <div className="relative h-[104px] w-[104px] shrink-0 rounded-2xl bg-iron/5 ring-1 ring-iron/10" />
                  ) : (
                    <div className="relative shrink-0">
                      <div className="h-[104px] w-[104px] overflow-hidden rounded-2xl ring-1 ring-iron/10">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={specialist.photo}
                          alt={specialist.name}
                          width={104}
                          height={104}
                          className="h-full w-full object-cover grayscale"
                        />
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-2 rounded-lg border border-iron/10 bg-rag/40 px-3 py-2 font-plex-mono text-[0.6rem] tracking-[0.12em] text-iron">
                    replies within one business day
                  </div>
                </div>

                {/* Bio */}
                <p className="mt-5 max-w-[48ch] font-plex-sans text-sm leading-relaxed text-ink/70">
                  {specialist.bio}
                </p>

                {/* Philosophy */}
                <p className="mt-4 max-w-[46ch] font-newsreader text-reading leading-reading text-ink/70 italic">
                  &ldquo;{specialist.philosophy}&rdquo;
                </p>

                {/* Record */}
                {specialist.record.length > 0 && (
                  <div className="mt-6 border-t border-iron/10 pt-5">
                    <p className="font-plex-mono text-[0.66rem] font-medium uppercase tracking-[0.14em] text-ink/70">
                      The record
                    </p>
                    <ul className="mt-3 flex flex-col gap-3">
                      {specialist.record.map((r) => (
                        <li
                          key={r.org}
                          className="group/rec flex items-start gap-3 rounded-surface border border-transparent p-3 -mx-3 transition-all duration-200 hover:border-iron/10 hover:bg-iron/[0.02]"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-iron/40" />
                          <div>
                            <span className="font-plex-sans text-sm font-semibold text-iron/90">
                              {r.org}
                            </span>
                            <p className="mt-1 font-newsreader text-sm leading-relaxed text-ink/70">
                              {r.line}
                            </p>
                            {r.url && (
                              <a
                                href={r.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-1 inline-flex items-center gap-1 font-plex-mono text-[0.6rem] text-ink/70 transition-colors hover:text-iron"
                              >
                                {r.url.replace("https://", "")}
                                <span className="text-[0.5rem]">↗</span>
                              </a>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Stack tags */}
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {specialist.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-surface border border-iron/10 px-2 py-0.5 font-plex-mono text-[0.66rem] tracking-tight text-iron/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Focus */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {specialist.focus.map((f) => (
                    <span
                      key={f}
                      className="rounded-surface border border-iron/10 px-2 py-0.5 font-plex-mono text-[0.66rem] tracking-tight text-ink/60"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                {/* Fun facts */}
                {specialist.funFacts && specialist.funFacts.length > 0 && (
                  <div className="mt-6 border-t border-iron/10 pt-5">
                    <p className="font-plex-mono text-[0.66rem] font-medium uppercase tracking-[0.14em] text-ink/70">
                      Fun facts
                    </p>
                    <ul className="mt-3 flex flex-col gap-1.5">
                      {specialist.funFacts.map((fact) => (
                        <li
                          key={fact}
                          className="font-plex-sans text-sm leading-relaxed text-ink/65"
                        >
                          {fact}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Trust note */}
                <p className="mt-5 max-w-[40ch] font-plex-sans text-[0.8rem] leading-relaxed text-ink/45">
                  Yes, it&apos;s really {specialist.name.split(" ")[0]}. You&apos;re
                  talking to the person on the team, not a support line.
                </p>

                <Link
                  href="/team"
                  className="mt-5 inline-flex items-center gap-1.5 font-plex-mono text-[0.66rem] font-medium uppercase tracking-[0.14em] text-ink/60 transition-colors hover:text-iron"
                >
                  See the whole crew →
                </Link>

                {/* Lots worked on */}
                {specialistLots.length > 0 && (
                  <div className="mt-10 border-t border-iron/10 pt-6">
                    <p className="font-plex-mono text-[0.66rem] font-medium uppercase tracking-[0.14em] text-ink/70">
                      Lots worked on
                    </p>
                    <div className="mt-4 flex flex-col gap-3">
                      {specialistLots.map((lot) => (
                        <Link
                          key={lot.slug}
                          href={`/work/${lot.slug}`}
                          className="group/lot flex items-center gap-4 rounded-surface border border-iron/10 px-5 py-4 transition-all duration-200 hover:border-iron/25 hover:bg-iron/[0.02]"
                        >
                          <span className="font-plex-mono text-[0.68rem] text-ink/70">
                            {lot.lotNumber}
                          </span>
                          <span className="h-px flex-1 bg-iron/10" />
                          <div className="text-right">
                            <span className="font-newsreader text-sm font-medium text-iron group-hover/lot:text-ink transition-colors">
                              {lot.client}
                            </span>
                            <span className="block font-newsreader text-[0.75rem] text-ink/70">
                              {lot.title}
                            </span>
                          </div>
                          <span className="text-iron/30 transition-transform duration-200 group-hover/lot:translate-x-1">
                            →
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right: Intake form as chat-like widget */}
              <div id="intake">
                <div className="mb-4 flex items-center gap-2">
                  <span className="font-plex-mono text-[0.66rem] font-medium uppercase tracking-[0.14em] text-ink/60">
                    Direct line
                  </span>
                  <span className="h-px flex-1 bg-iron/10" />
                  <span className="font-plex-mono text-[0.66rem] text-ink/70">
                    #{specialist.id}-dm
                  </span>
                </div>

                <div className="overflow-hidden rounded-surface border border-iron/10 bg-rag">
                  <CrewSession type="work" workWith={specialist.id} />
                </div>
              </div>
            </div>
        </div>
      </section>

      {/* Reviews */}
      {specialist.reviews && specialist.reviews.length > 0 && (
        <section className="w-full bg-rag py-16 md:py-24">
          <div className="grid-container">
            <h2 className="font-plex-mono text-data tracking-[0.08em] text-ink/70 uppercase border-t border-iron/15 pt-6">
              Reviews
            </h2>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {specialist.reviews.map((review, i) => (
                <blockquote
                  key={i}
                  className="flex h-full flex-col overflow-hidden rounded-surface border border-iron/10 p-6 transition-all duration-200 hover:border-iron/20"
                >
                  <p className="font-newsreader text-reading leading-reading text-ink italic">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                  <footer className="mt-4 mt-auto">
                    <p className="font-plex-sans text-sm font-medium text-iron">
                      {review.name}
                    </p>
                    <p className="font-plex-mono text-[0.62rem] text-ink/70">
                      {review.role}
                    </p>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
