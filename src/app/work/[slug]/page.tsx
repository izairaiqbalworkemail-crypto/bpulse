import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Grade } from "@/components/primitives/Grade";
import { Credit } from "@/components/primitives/Credit";
import { StageRail } from "@/components/StageRail";
import { ProofRow } from "@/components/ProofRow";
import { BrowserShot } from "@/components/catalog/BrowserShot";
import { Trace } from "@/components/trace/Trace";
import { BreadcrumbJsonLd } from "@/lib/JsonLd";
import { lots, getLot, figureDisclaimer } from "@/content/lots";
import { stagesForLot } from "@/content/catalogue";
import { getSpecialist, specialists } from "@/content/specialists";
import { brand } from "@/config/brand";
import { PageClose } from "@/components/PageClose";
import { PeopleRail } from "@/components/PeopleRail";
import {
  Atmosphere,
  AtmosphereNote,
} from "@/components/landing/Atmosphere";
import { Reveal } from "@/components/landing/Reveal";
import { PageHero } from "@/components/PageHero";
import { specFromLot, verifiedFigures } from "@/lib/lot-trace";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return lots.map((lot) => ({ slug: lot.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const lot = getLot(slug);
  return buildMetadata({
    title: `${lot.client} — ${lot.title}`,
    description: lot.summary,
    path: `/work/${lot.slug}`,
  });
}

export default async function LotPage({ params }: PageProps) {
  const { slug } = await params;
  const lot = getLot(slug);
  const specialist = getSpecialist(lot.specialistId);
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
          { name: "Catalogue", url: `${brand.url}/work` },
          {
            name: `${lot.client} — ${lot.title}`,
            url: `${brand.url}/work/${lot.slug}`,
          },
        ]}
      />

      <PageHero
        kicker={`${lot.lotNumber} · ${lot.grade.label}`}
        title={lot.client}
        dek={lot.title}
        hideAction
      />

      <section className="relative w-full overflow-hidden bg-rag">
        <div className="relative w-full bg-iron py-10 md:py-14">
          <div className="grid-container">
            <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-rag/55">
              The lot, as a trace
            </p>
            <div className="mt-6">
              <Trace spec={spec} size="full" surface="iron" labelled />
            </div>
          </div>
        </div>

        <Atmosphere kind="desk" opacity={0.12} />
        <div className="relative grid-container pb-24 pt-10 md:pb-32 md:pt-14">
          <p className="font-plex-mono text-[13px] uppercase tracking-[0.08em] text-ink/70">
            {lot.client}
            {disclaimer ? ` · ${disclaimer}` : null}
          </p>
          <p className="mt-3 max-w-[22ch] font-newsreader text-[28px] leading-[1.15] text-iron md:text-[32px]">
            {lot.title}
          </p>

          <div className="mt-10">
            <PeopleRail
              people={specialists.filter((person) => person.id === specialist.id)}
              line="The name on this lot"
            />
          </div>
          <div className="mt-3 mb-10">
            <AtmosphereNote />
          </div>
          <p className="font-plex-mono text-[13px] uppercase tracking-[0.08em] text-ink/70">
            What arrived
          </p>
          <div className="mt-3">
            <Grade
              grade={lot.grade.grade}
              label={lot.grade.label}
              date={lot.grade.date}
            />
          </div>
          <p className="mt-6 max-w-[66ch] font-newsreader text-[18px] leading-[1.55] text-ink">
            {lot.condition}
          </p>

          <div className="mt-14">
            <p className="font-plex-mono text-[13px] uppercase tracking-[0.08em] text-ink/70">
              Findings
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {findings.map((finding) => (
                <li
                  key={finding.observed}
                  className="card px-6 py-6"
                >
                  <p className="font-newsreader text-[18px] text-iron">
                    {finding.observed}
                  </p>
                  <p className="mt-2 max-w-[66ch] font-newsreader text-[16px] leading-[1.5] text-ink/80">
                    {finding.blocked}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-14">
            <p className="font-plex-mono text-[13px] uppercase tracking-[0.08em] text-ink/70">
              How far this engagement went
            </p>
            <StageRail stages={stagesForLot(lot.slug)} />
          </div>

          <div className="mt-14 max-w-[66ch]">
            <p className="font-plex-mono text-[13px] uppercase tracking-[0.08em] text-ink/70">
              What it took
            </p>
            <p className="mt-4 font-newsreader text-[18px] leading-[1.55] text-ink">
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
              <p className="font-plex-mono text-[13px] uppercase tracking-[0.08em] text-ink/70">
                Limits
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                {lot.limits.map((limit) => (
                  <li
                    key={limit}
                    className="font-newsreader text-[18px] leading-[1.55] text-ink"
                  >
                    {limit}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <Reveal className="mt-14">
            <p className="font-plex-mono text-[13px] uppercase tracking-[0.08em] text-ink/70">
              Crew
            </p>
            <div className="mt-4">
              <Link href={`/team/${specialist.id}`} className="inline-block">
                <Credit
                  name={specialist.name}
                  capability={lot.specialistCapability}
                  portraitSrc={specialist.photo}
                  portraitAlt={specialist.name}
                />
              </Link>
            </div>
          </Reveal>

          <PageClose line="This lot entered unfinished. Yours can too." />
        </div>
      </section>
    </>
  );
}
