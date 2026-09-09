import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { PersonJsonLd, BreadcrumbJsonLd } from "@/lib/JsonLd";
import { specialists, findSpecialist } from "@/content/specialists";
import { getSignal } from "@/content/signals";
import { crewAttach, crewJourney } from "@/content/crew-lines";
import { pageFrame } from "@/content/platform";
import { Trace } from "@/components/trace/Trace";
import { Atmosphere } from "@/components/landing/Atmosphere";
import { PageHero } from "@/components/PageHero";
import { Episode } from "@/components/episode/Episode";
import { LetterLedger } from "@/components/letter/LetterLedger";
import { brand } from "@/config/brand";
import {
  admission,
  assignmentHistory,
  assignmentStatus,
  assignmentStatusLabel,
  signalsClosed,
} from "@/lib/assignment";
import { specFromLots } from "@/lib/lot-trace";
import { caseNumber } from "@/content/lots";
import { TrackOnMount } from "@/components/analytics/TrackOnMount";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  return specialists.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const specialist = findSpecialist(slug);
  if (!specialist) notFound();
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
  const specialist = findSpecialist(slug);
  if (!specialist) notFound();
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
          { name: "Our engineers", url: `${brand.url}/team` },
          { name: specialist.name, url: `${brand.url}/team/${specialist.id}` },
        ]}
      />

      <PageHero
        kicker={`${specialist.role} · ${assignmentStatusLabel(status)}`}
        title={specialist.name}
        dek={pageFrame.teamSlug}
        actionHref="/read"
        actionLabel="Get my free read"
      />

      <Episode tone="paper">
        <TrackOnMount event="crew.opened" props={{ slug: specialist.id }} />
        <Atmosphere kind="paper" opacity={0.16} />
        <div className="relative">
          <div className="grid items-start gap-12 md:grid-cols-[14rem_minmax(0,1fr)]">
            <div className="overflow-hidden bg-ink">
              {absent ? (
                <div className="grid aspect-[3/4] place-items-center">
                  <span className="font-newsreader type-display-xl text-[64px] leading-none text-paper">
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
              <p className="font-plex-mono text-[12px] uppercase tracking-[0.1em] text-quill/70">
                How they hire
              </p>
              <p className="mt-3 font-newsreader text-[28px] leading-[1.15] text-ink">
                {line.standing}
              </p>
              <p className="mt-2 max-w-[42ch] font-newsreader text-[17px] leading-[1.45] text-quill">
                {line.review} {line.dateNote}
              </p>
              <p className="mt-4">
                <Link
                  href={line.href}
                  className="font-plex-sans text-[14px] text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink"
                >
                  The standard
                </Link>
              </p>
              <p className="mt-8 font-plex-mono text-[12px] uppercase tracking-[0.1em] text-quill/70">
                Currently
              </p>
              <p className="mt-2 font-newsreader text-[18px] text-ink">
                {assignmentStatusLabel(status)}
                {status === "assigned"
                  ? " · on a project. Next available date is not published."
                  : " · available now."}
              </p>
            </div>
          </div>

          {history.length > 0 ? (
            <div className="mt-16">
              <p className="font-plex-mono text-[12px] uppercase tracking-[0.1em] text-quill/70">
                Assignment history
              </p>
              <div className="mt-6">
                <LetterLedger
                  lines={history.map((row) => ({
                    id: row.lot.slug,
                    kicker: caseNumber(row.lot),
                    title: row.lot.client,
                    body: `${row.capability}${row.lead ? " · lead" : ""}${
                      row.arrived
                        ? ` · ${row.arrived.replace(/ on arrival$/i, "")}`
                        : ""
                    }`,
                    meta: row.status ?? "status not on file",
                    href: `/work/${row.lot.slug}`,
                    ask: "Open",
                  }))}
                />
              </div>
            </div>
          ) : (
            <p className="mt-16 max-w-[42ch] font-newsreader text-[17px] text-quill">
              No published case yet.
            </p>
          )}

          {closed.length > 0 ? (
            <div className="mt-16">
              <p className="font-plex-mono text-[12px] uppercase tracking-[0.1em] text-quill/70">
                What they fixed
              </p>
              <p className="mt-2 max-w-[46ch] font-newsreader text-[16px] text-quill">
                Drawn from work we have published. This is what they have
                already fixed.
              </p>
              <div className="mt-4">
                <LetterLedger
                  lines={closed.map((id) => ({
                    id,
                    title: getSignal(id).says,
                  }))}
                />
              </div>
            </div>
          ) : null}

          <div className="mt-16 border-t border-ink/12 pt-10">
            <p className="font-plex-mono text-[12px] uppercase tracking-[0.1em] text-quill/70">
              How they work
            </p>
            <p className="mt-4 max-w-[20ch] font-newsreader type-display-m text-[32px] leading-[1.15] text-ink md:text-[40px]">
              {specialist.philosophy}
            </p>
            <p className="mt-6 max-w-[48ch] font-newsreader text-[18px] leading-[1.55] text-quill">
              {journey}
            </p>
            {attach.length > 0 ? (
              <ul className="mt-6 flex flex-col gap-3">
                {attach.map((item) => (
                  <li
                    key={item}
                    className="max-w-[48ch] font-newsreader text-[17px] leading-[1.5] text-quill"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {specialist.id === "hamza" ? (
            <section className="mt-14 border-t border-ink/12 pt-8">
              <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-quill/70">
                Legal scope
              </p>
              <p className="mt-2 max-w-[58ch] font-newsreader text-[18px] leading-[1.5] text-ink">
                Hamza owns the legal register. He handles NDAs and IP
                assignment, answers client legal questions, and instructs
                external counsel.
              </p>
              <p className="mt-3 font-plex-sans text-[14px] text-quill">
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
              <p className="font-plex-mono text-[12px] uppercase tracking-[0.1em] text-quill/70">
                The work they have finished
              </p>
              <div className="mt-4">
                <Trace
                  spec={specFromLots(
                    specialist.id,
                    history.map((row) => row.lot),
                    `Engagements ${firstName} was assigned to`,
                  )}
                  size="full"
                  surface="paper"
                  labelled
                />
              </div>
            </div>
          ) : null}

          {specialist.reviews && specialist.reviews.length > 0 ? (
            <div className="mt-16">
              <p className="font-plex-mono text-[12px] uppercase tracking-[0.1em] text-quill/70">
                Client quotes
              </p>
              <ul className="mt-4 flex flex-col gap-8">
                {specialist.reviews.map((review) => {
                  const slack = review.source?.toLowerCase().startsWith("slack:");
                  return (
                    <li key={review.quote} className="max-w-[60ch] border-t border-ink/10 pt-6">
                      <blockquote className="font-newsreader text-[18px] leading-[1.5] text-quill">
                        “{review.quote}”
                      </blockquote>
                      <p className="mt-2 font-plex-mono text-[13px] text-quill/70">
                        {slack ? review.source : `${review.name}, ${review.role}`}
                        {review.source && !slack ? ` · ${review.source}` : null}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}

          <div className="mt-20 border-t border-ink/12 pt-10">
            <p className="mb-3 font-plex-mono text-[12px] uppercase tracking-[0.1em] text-quill/70">
              Direct line · {firstName}
            </p>
            <p className="max-w-[42ch] font-newsreader text-[17px] text-quill">
              The platform vouches. {firstName} is still reachable by name.
            </p>
            <Link
              href={`/direct/${specialist.id}`}
              className="mt-5 inline-block font-plex-sans text-[15px] text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink"
            >
              Write {firstName}
            </Link>
          </div>
        </div>
      </Episode>
    </>
  );
}
