import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { Grade } from "@/components/primitives/Grade";
import { Credit } from "@/components/primitives/Credit";
import { StageRail } from "@/components/StageRail";
import { ProofRow } from "@/components/ProofRow";
import { BrowserShot } from "@/components/catalog/BrowserShot";
import { Trace } from "@/components/trace/Trace";
import { BreadcrumbJsonLd } from "@/lib/JsonLd";
import { lots, findLot, figureDisclaimer, caseNumber } from "@/content/lots";
import { stagesForLot } from "@/content/catalogue";
import { pageFrame } from "@/content/platform";
import { brand } from "@/config/brand";
import { assignedCrew, lotStatus } from "@/lib/assignment";
import { PageClose } from "@/components/PageClose";
import { Atmosphere } from "@/components/landing/Atmosphere";
import { Reveal } from "@/components/landing/Reveal";
import { PageHero } from "@/components/PageHero";
import { specFromLot, verifiedFigures } from "@/lib/lot-trace";
import { TrackOnMount } from "@/components/analytics/TrackOnMount";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  return lots.map((lot) => ({ slug: lot.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const lot = findLot(slug);
  if (!lot) notFound();
  return buildMetadata({
    title: lot.client,
    description: pageFrame.workSlug,
    path: `/work/${lot.slug}`,
  });
}

export default async function LotPage({ params }: Readonly<PageProps>) {
  const { slug } = await params;
  const lot = findLot(slug);
  if (!lot) notFound();
  const crew = assignedCrew(lot);
  const status = lotStatus(lot);
  const disclaimer = figureDisclaimer(lot);
  const figures = verifiedFigures(lot);
  const spec = specFromLot(lot);
  const findings = lot.highlights?.length
    ? lot.highlights.map((item) => ({
        observed: item,
        blocked: lot.grade.label,
      }))
    : [{ observed: lot.condition, blocked: lot.grade.label }];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Our work", url: `${brand.url}/work` },
          {
            name: lot.client,
            url: `${brand.url}/work/${lot.slug}`,
          },
        ]}
      />

      <PageHero
        kicker={`${caseNumber(lot)}`}
        title={lot.client}
        dek={pageFrame.workSlug}
      />

      <section className="relative w-full overflow-hidden bg-paper">
        <TrackOnMount event="lot.opened" props={{ slug: lot.slug }} />
        <div className="relative w-full bg-ink py-10 md:py-14">
          <div className="grid-container">
            <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-paper/55">
              The path through the work
            </p>
            <div className="mt-6">
              <Trace spec={spec} size="full" surface="ink" labelled />
            </div>
          </div>
        </div>

        <Atmosphere kind="desk" opacity={0.12} />
        <div className="relative grid-container pb-24 pt-10 md:pb-32 md:pt-14">
          <p className="font-plex-mono text-[13px] uppercase tracking-[0.08em] text-quill/70">
            {caseNumber(lot)}
            {disclaimer ? ` · ${disclaimer}` : null}
          </p>
          <p className="mt-3 max-w-[22ch] font-newsreader text-[28px] leading-[1.15] text-ink md:text-[32px]">
            {lot.title}
          </p>

          <dl className="mt-10 max-w-[52ch] border-t border-ink/12 pt-8">
            <div className="grid gap-2 py-4 sm:grid-cols-[8rem_minmax(0,1fr)]">
              <dt className="font-plex-mono text-[11px] uppercase tracking-[0.1em] text-quill/70">
                Assigned
              </dt>
              <dd className="font-newsreader text-[18px] leading-[1.4] text-ink">
                {crew.map((row, index) => (
                  <span key={row.person.id}>
                    {index > 0 ? " · " : null}
                    <Link
                      href={`/team/${row.person.id}`}
                      className="underline decoration-ink/25 underline-offset-4 hover:decoration-ink"
                    >
                      {row.person.name}
                    </Link>
                    , {row.capability}
                    {row.lead ? " · lead" : null}
                  </span>
                ))}
              </dd>
            </div>
            <div className="grid gap-2 border-t border-ink/8 py-4 sm:grid-cols-[8rem_minmax(0,1fr)]">
              <dt className="font-plex-mono text-[11px] uppercase tracking-[0.1em] text-quill/70">
                When we started
              </dt>
              <dd className="font-newsreader text-[18px] text-ink">
                {lot.grade.label}
                {lot.grade.date ? ` · ${lot.grade.date}` : null}
              </dd>
            </div>
            <div className="grid gap-2 border-t border-ink/8 py-4 sm:grid-cols-[8rem_minmax(0,1fr)]">
              <dt className="font-plex-mono text-[11px] uppercase tracking-[0.1em] text-quill/70">
                What shipped
              </dt>
              <dd className="font-newsreader text-[18px] text-ink">
                {status ?? "Duration is not published."}
              </dd>
            </div>
          </dl>

          <p className="mt-14 font-plex-mono text-[13px] uppercase tracking-[0.08em] text-quill/70">
            What was stuck
          </p>
          <div className="mt-3">
            <Grade
              grade={lot.grade.grade}
              label={lot.grade.label}
              date={lot.grade.date}
            />
          </div>
          <p className="mt-6 max-w-[66ch] font-newsreader text-[18px] leading-[1.55] text-quill">
            {lot.condition}
          </p>

          <div className="mt-14">
            <p className="font-plex-mono text-[13px] uppercase tracking-[0.08em] text-quill/70">
              Findings
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {findings.map((finding) => (
                <li
                  key={finding.observed}
                  className="card px-6 py-6"
                >
                  <p className="font-newsreader text-[18px] text-ink">
                    {finding.observed}
                  </p>
                  <p className="mt-2 max-w-[66ch] font-newsreader text-[16px] leading-[1.5] text-quill/80">
                    {finding.blocked}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-14">
            <p className="font-plex-mono text-[13px] uppercase tracking-[0.08em] text-quill/70">
              How far this engagement went
            </p>
            <StageRail stages={stagesForLot(lot.slug)} />
          </div>

          <div className="mt-14 max-w-[66ch]">
            <p className="font-plex-mono text-[13px] uppercase tracking-[0.08em] text-quill/70">
              What it took
            </p>
            <p className="mt-4 font-newsreader text-[18px] leading-[1.55] text-quill">
              {lot.outcome}
            </p>
          </div>

          {figures.length > 0 ? (
            <div className="mt-14 max-w-[720px]">
              {figures.map((line) => (
                <ProofRow
                  key={line.label}
                  value={line.value}
                  label={line.label}
                  source={lot.attribution.sourceUrl ?? lot.attribution.type}
                  unverified={Boolean(disclaimer)}
                />
              ))}
            </div>
          ) : null}

          {lot.imageUrl ? (
            <div className="mt-14 max-w-[28rem]">
              <BrowserShot
                src={lot.imageUrl}
                url={lot.clientUrl}
                client={lot.client}
              />
            </div>
          ) : null}

          {lot.limits && lot.limits.length > 0 ? (
            <div className="mt-14 max-w-[66ch]">
              <p className="font-plex-mono text-[13px] uppercase tracking-[0.08em] text-quill/70">
                Limits
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                {lot.limits.map((limit) => (
                  <li
                    key={limit}
                    className="font-newsreader text-[18px] leading-[1.55] text-quill"
                  >
                    {limit}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <Reveal className="mt-14">
            <p className="font-plex-mono text-[13px] uppercase tracking-[0.08em] text-quill/70">
              Assigned crew
            </p>
            <ul className="mt-4 flex flex-col gap-4">
              {crew.map((row) => (
                <li key={row.person.id}>
                  <Link href={`/team/${row.person.id}`} className="inline-block">
                    <Credit
                      name={row.person.name}
                      capability={`${row.capability}${row.lead ? " · lead" : ""}`}
                      portraitSrc={row.person.photo}
                      portraitAlt={row.person.name}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <PageClose line="This engagement entered unfinished. Yours can too." />
        </div>
      </section>
    </>
  );
}
