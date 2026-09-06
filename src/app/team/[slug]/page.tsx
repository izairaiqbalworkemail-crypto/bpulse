import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PersonJsonLd, BreadcrumbJsonLd } from "@/lib/JsonLd";
import { specialists, getSpecialist } from "@/content/specialists";
import { crewAttach, crewJourney } from "@/content/crew-lines";
import { pageFrame } from "@/content/platform";
import { Trace } from "@/components/trace/Trace";
import { Atmosphere } from "@/components/landing/Atmosphere";
import { PageHero } from "@/components/PageHero";
import { brand } from "@/config/brand";
import {
  admission,
  assignmentHistory,
  assignmentStatus,
  assignmentStatusLabel,
  signalsClosed,
} from "@/lib/assignment";
import { specFromLots } from "@/lib/lot-trace";
import { TrackOnMount } from "@/components/analytics/TrackOnMount";

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
    description: pageFrame.teamSlug,
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

export default async function SpecialistPage({ params }: Readonly<PageProps>) {
  const { slug } = await params;
  const specialist = getSpecialist(slug);
  const history = assignmentHistory(specialist);
  const closed = signalsClosed(specialist);
  const line = admission(specialist);
  const status = assignmentStatus(specialist);
  const absent = specialist.photoStatus === "Photo pending" || !specialist.photo;
  const journey = crewJourney[specialist.id] ?? specialist.bio;
  const attach = crewAttach[specialist.id] ?? [];
  const firstName = specialist.name.split(" ")[0] ?? specialist.name;

  return (
    <>
      <PersonJsonLd name={specialist.name} jobTitle={specialist.role} />
      <BreadcrumbJsonLd
        items={[
          { name: "Admitted", url: `${brand.url}/team` },
          { name: specialist.name, url: `${brand.url}/team/${specialist.id}` },
        ]}
      />

      <PageHero
        kicker={`${specialist.role} · ${assignmentStatusLabel(status)}`}
        title={specialist.name}
        dek={pageFrame.teamSlug}
        actionHref={`/direct/${specialist.id}`}
        actionLabel={`Write ${firstName}`}
      />

      <section className="relative w-full overflow-hidden bg-rag">
        <TrackOnMount event="crew.opened" props={{ slug: specialist.id }} />
        <Atmosphere kind="paper" opacity={0.16} />
        <div className="relative grid-container pb-24 pt-10 md:pb-32 md:pt-16">
          <div className="grid items-start gap-12 md:grid-cols-[14rem_minmax(0,1fr)]">
            <div className="overflow-hidden bg-iron">
              {absent ? (
                <div className="grid aspect-[3/4] place-items-center">
                  <span className="font-newsreader type-display-xl text-[64px] leading-none text-rag">
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
                  className="aspect-[3/4] w-full object-cover object-top"
                />
              )}
            </div>

            <div>
              <p className="font-plex-mono text-[12px] uppercase tracking-[0.1em] text-ink/70">
                Admission
              </p>
              <p className="mt-3 font-newsreader text-[28px] leading-[1.15] text-iron">
                {line.standing}
              </p>
              <p className="mt-2 max-w-[42ch] font-newsreader text-[17px] leading-[1.45] text-ink">
                {line.review} {line.dateNote}
              </p>
              <p className="mt-4">
                <Link
                  href={line.href}
                  className="font-plex-sans text-[14px] text-iron underline decoration-iron/25 underline-offset-4 hover:decoration-iron"
                >
                  The standard →
                </Link>
              </p>
              <p className="mt-8 font-plex-mono text-[12px] uppercase tracking-[0.1em] text-ink/70">
                Currently
              </p>
              <p className="mt-2 font-newsreader text-[18px] text-iron">
                {assignmentStatusLabel(status)}
                {status === "assigned"
                  ? " · on an engagement. Available-from dates are not on the public record."
                  : " · the platform can assign."}
              </p>
            </div>
          </div>

          {history.length > 0 ? (
            <div className="mt-16">
              <p className="font-plex-mono text-[12px] uppercase tracking-[0.1em] text-ink/70">
                Assignment history
              </p>
              <ul className="mt-6 border-t border-iron/12">
                {history.map((row) => (
                  <li key={row.lot.slug} className="border-b border-iron/10">
                    <Link
                      href={`/work/${row.lot.slug}`}
                      className="grid gap-1 py-4 md:grid-cols-[6rem_minmax(0,1fr)_auto] md:items-baseline"
                    >
                      <span className="font-plex-mono text-[12px] text-ink/70">
                        {row.lot.lotNumber.replace(/^LOT\s/, "")}
                      </span>
                      <span>
                        <span className="block font-newsreader text-[20px] text-iron">
                          {row.lot.client}
                        </span>
                        <span className="mt-1 block font-newsreader text-[15px] text-ink">
                          {row.capability}
                          {row.lead ? " · lead" : null}
                          {row.arrived ? ` · ${row.arrived.replace(/ on arrival$/i, "")}` : null}
                        </span>
                      </span>
                      <span className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">
                        {row.status ?? "status not on file"}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="mt-16 max-w-[42ch] font-newsreader text-[17px] text-ink">
              No engagement on the public record yet.
            </p>
          )}

          {closed.length > 0 ? (
            <div className="mt-16">
              <p className="font-plex-mono text-[12px] uppercase tracking-[0.1em] text-ink/70">
                Signals closed
              </p>
              <p className="mt-2 max-w-[46ch] font-newsreader text-[16px] text-ink">
                Drawn from engagements on the record. This is what the
                assignment engine reads.
              </p>
              <p className="mt-4 font-newsreader text-[18px] leading-[1.5] text-iron">
                {closed.map((id) => id.replaceAll("-", " ")).join(" · ")}
              </p>
            </div>
          ) : null}

          <div className="mt-16 border-t border-iron/12 pt-10">
            <p className="font-plex-mono text-[12px] uppercase tracking-[0.1em] text-ink/70">
              How they work
            </p>
            <p className="mt-4 max-w-[20ch] font-newsreader type-display-m text-[32px] leading-[1.15] text-iron md:text-[40px]">
              {specialist.philosophy}
            </p>
            <p className="mt-6 max-w-[48ch] font-newsreader text-[18px] leading-[1.55] text-ink">
              {journey}
            </p>
            {attach.length > 0 ? (
              <ul className="mt-6 flex flex-col gap-3">
                {attach.map((item) => (
                  <li
                    key={item}
                    className="max-w-[48ch] font-newsreader text-[17px] leading-[1.5] text-ink"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {specialist.id === "hamza" ? (
            <section className="mt-14 border-t border-iron/12 pt-8">
              <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">
                Legal scope
              </p>
              <p className="mt-2 max-w-[58ch] font-newsreader text-[18px] leading-[1.5] text-iron">
                Hamza owns the legal register. He handles NDAs and IP
                assignment, answers client legal questions, and instructs
                external counsel.
              </p>
              <p className="mt-3 font-plex-sans text-[14px] text-ink">
                See{" "}
                <Link href="/legal" className="underline underline-offset-4">
                  /legal
                </Link>{" "}
                for the register.
              </p>
            </section>
          ) : null}

          {history.length > 0 ? (
            <div className="mt-16">
              <p className="font-plex-mono text-[12px] uppercase tracking-[0.1em] text-ink/70">
                The engagements, as a trace
              </p>
              <div className="mt-4 bg-iron px-6 py-8">
                <Trace
                  spec={specFromLots(
                    specialist.id,
                    history.map((row) => row.lot),
                    `Engagements ${firstName} was assigned to`,
                  )}
                  size="full"
                  surface="iron"
                  labelled
                />
              </div>
            </div>
          ) : null}

          {specialist.reviews && specialist.reviews.length > 0 ? (
            <div className="mt-16">
              <p className="font-plex-mono text-[12px] uppercase tracking-[0.1em] text-ink/70">
                Client quotes
              </p>
              <ul className="mt-4 flex flex-col gap-8">
                {specialist.reviews.map((review) => {
                  const slack = review.source?.toLowerCase().startsWith("slack:");
                  return (
                    <li key={review.quote} className="max-w-[60ch] border-t border-iron/10 pt-6">
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

          <div className="mt-20 border-t border-iron/12 pt-10">
            <p className="mb-3 font-plex-mono text-[12px] uppercase tracking-[0.1em] text-ink/70">
              Direct line · {firstName}
            </p>
            <p className="max-w-[42ch] font-newsreader text-[17px] text-ink">
              The platform vouches. {firstName} is still reachable by name.
            </p>
            <Link
              href={`/direct/${specialist.id}`}
              className="mt-5 inline-flex min-h-11 items-center rounded-full bg-signal px-5 py-2.5 font-plex-sans text-[14px] font-medium text-iron"
            >
              Write {firstName}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
