import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import { Grade } from "@/components/primitives/Grade";
import { Credit } from "@/components/primitives/Credit";
import { StageRail } from "@/components/StageRail";
import { ProofRow } from "@/components/ProofRow";
import { BreadcrumbJsonLd } from "@/lib/JsonLd";
import { lots, getLot, figureDisclaimer } from "@/content/lots";
import { stagesForLot } from "@/content/catalogue";
import { getSpecialist } from "@/content/specialists";
import { brand } from "@/config/brand";
import { PageClose } from "@/components/PageClose";

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

      <section className="w-full bg-rag">
        <div className="grid-container pt-10 md:pt-14">
          <p className="font-plex-mono text-[13px] uppercase tracking-[0.08em] text-ink/70">
            {lot.lotNumber} · {lot.client}
            {disclaimer ? ` · ${disclaimer}` : null}
          </p>
          <h1 className="mt-3 max-w-[22ch] font-newsreader text-[24px] leading-[1.15] text-iron">
            {lot.title}
          </h1>
        </div>

        {lot.imageUrl ? (
          <div className="mt-8 w-full">
            <div className="relative aspect-[16/8] w-full overflow-hidden bg-iron/5">
              <Image
                src={lot.imageUrl}
                alt={`${lot.client} — project shot`}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </div>
          </div>
        ) : null}

        <div className="grid-container pb-24 pt-12 md:pb-32 md:pt-16">
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
            <ul className="mt-4 flex flex-col">
              {findings.map((finding) => (
                <li
                  key={finding.observed}
                  className="border-t border-iron/15 py-5"
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

          <div className="mt-14 max-w-[720px]">
            {lot.dataLines
              .filter((line) => line.label !== "Client")
              .map((line) => (
                <ProofRow
                  key={line.label}
                  value={line.value}
                  label={line.label}
                  source={lot.attribution.sourceUrl ?? lot.attribution.type}
                  unverified={Boolean(disclaimer)}
                />
              ))}
          </div>

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

          <div className="mt-14">
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
          </div>

          <PageClose line="This lot entered unfinished. Yours can too." />
        </div>
      </section>
    </>
  );
}
