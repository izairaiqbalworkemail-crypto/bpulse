import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { DataLine } from "@/components/primitives/DataLine";
import { Grade } from "@/components/primitives/Grade";
import { Credit } from "@/components/primitives/Credit";
import { BreadcrumbJsonLd } from "@/lib/JsonLd";
import { lots, getLot, figureDisclaimer } from "@/content/lots";
import { getSpecialist } from "@/content/specialists";
import { brand } from "@/config/brand";

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
        kicker={lot.lotNumber}
        title={lot.client}
        dek={lot.title}
      />

      {/* Image */}
      {lot.imageUrl && (
        <section className="w-full bg-rag">
          <div className="grid-container">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-surface bg-iron/5">
              <Image
                src={lot.imageUrl}
                alt={`${lot.client} project shot`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1180px"
              />
            </div>
          </div>
        </section>
      )}

      {/* Condition on arrival */}
      <section className="w-full bg-rag py-16 md:py-24">
        <div className="grid-container">
          <div className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="font-plex-mono text-data tracking-[0.08em] text-ink/70 uppercase">
                Condition on arrival
              </p>
              <div className="mt-4">
                <Grade
                  grade={lot.grade.grade}
                  label={lot.grade.label}
                  date={lot.grade.date}
                />
              </div>
            </div>
            <div className="md:col-span-8">
              <p className="max-w-[66ch] font-newsreader text-reading leading-reading text-ink">
                {lot.condition}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Data lines */}
      <section className="w-full bg-rag py-8 md:py-12">
        <div className="grid-container">
          <dl className="flex max-w-[480px] flex-col gap-3">
            {lot.dataLines.map((line) => (
              <DataLine key={line.label} {...line} />
            ))}
          </dl>
          {figureDisclaimer(lot) ? (
            <p className="mt-4 font-plex-mono text-caption text-ink/60">
              {figureDisclaimer(lot)}
            </p>
          ) : null}
        </div>
      </section>

      {/* Outcome */}
      <section className="w-full bg-rag py-16 md:py-24">
        <div className="grid-container">
          <div className="max-w-[66ch] border-t border-iron/15 pt-8">
            <p className="font-plex-mono text-data tracking-[0.08em] text-ink/70 uppercase">
              Shipped
            </p>
            <p className="mt-4 font-newsreader text-reading leading-reading text-ink">
              {lot.outcome}
            </p>
          </div>
        </div>
      </section>

      {/* Limits — at equal visual weight */}
      {lot.limits && lot.limits.length > 0 && (
        <section className="w-full bg-rag py-16 md:py-24">
          <div className="grid-container">
            <div className="max-w-[66ch] border-t border-iron/15 pt-8">
              <p className="font-plex-mono text-data tracking-[0.08em] text-ink/70 uppercase">
                Limits
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                {lot.limits.map((limit, i) => (
                  <li
                    key={i}
                    className="font-newsreader text-reading leading-reading text-ink"
                  >
                    {limit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Sources */}
      <section className="w-full bg-rag py-8 md:py-12">
        <div className="grid-container">
          <div className="max-w-[66ch] border-t border-iron/15 pt-8">
            <p className="font-plex-mono text-data tracking-[0.08em] text-ink/70 uppercase">
              Sources
            </p>
            <ul className="mt-4 flex flex-col gap-2">
              {lot.sources.map((src, i) => (
                <li key={i} className="font-plex-mono text-caption text-ink/60">
                  {src.kind} · {src.org}
                  {src.url && (
                    <>
                      {" "}
                      ·{" "}
                      <a
                        href={src.url}
                        className="underline-offset-4 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {src.url}
                      </a>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Specialist */}
      <section className="w-full bg-rag py-16 md:py-24">
        <div className="grid-container">
          <div className="max-w-[66ch] border-t border-iron/15 pt-8">
            <p className="font-plex-mono text-data tracking-[0.08em] text-ink/70 uppercase">
              Specialist
            </p>
            <div className="mt-4">
              <Credit
                name={specialist.name}
                capability={lot.specialistCapability}
                portraitSrc={specialist.photo}
                portraitAlt={specialist.name}
              />
              <Link
                href={`/team/${specialist.id}`}
                className="mt-2 inline-block font-plex-sans text-sm text-ink/60 underline-offset-4 hover:underline"
              >
                View profile →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-rag py-16 md:py-24">
        <div className="grid-container">
          <div className="border-t border-iron/15 pt-8">
            <p className="font-newsreader text-reading leading-reading text-ink">
              Think your product might need the same?{" "}
              <Link
                href="/check"
                className="font-plex-sans text-sm font-medium text-iron underline-offset-4 hover:underline"
              >
                Start with a Check
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
