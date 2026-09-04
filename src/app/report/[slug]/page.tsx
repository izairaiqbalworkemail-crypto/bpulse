import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FindingLedger } from "@/components/FindingLedger";
import { getReport } from "@/content/reports";
import { getSpecialist } from "@/content/specialists";
import { logReportView } from "@/lib/report-views";
import { brand } from "@/config/brand";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const report = getReport(slug);
  if (!report) return { robots: { index: false, follow: false } };
  return {
    title: `${report.company} — bpulse report`,
    description: report.theRead,
    robots: { index: false, follow: false },
    alternates: { canonical: `https://report.bpulse.dev/${report.slug}` },
  };
}

export default async function ReportPage({ params }: PageProps) {
  const { slug } = await params;
  const report = getReport(slug);
  if (!report) notFound();

  await logReportView(report.slug);
  const specialist = getSpecialist(report.specialistId);

  return (
    <article className="report-page bg-rag text-ink">
      <div className="mx-auto max-w-[720px] px-6 py-16 md:py-24">
        <header className="border-b border-iron/15 pb-8">
          <p className="font-plex-mono text-[13px] uppercase tracking-[0.14em] text-ink/60">
            Private diagnostic · not for index
          </p>
          <p className="mt-3 font-plex-sans text-sm text-ink/70">
            Prepared for {report.company} · {report.preparedOn} ·{" "}
            {report.preparedBy}
          </p>
        </header>

        <section className="mt-10">
          <h1 className="font-newsreader text-[25px] leading-[1.35] text-iron">
            {report.theRead}
          </h1>
        </section>

        <section className="mt-12">
          <h2 className="font-plex-mono text-[13px] uppercase tracking-[0.14em] text-ink/60">
            Surfaces read
          </h2>
          <ul className="mt-4 flex flex-col gap-2">
            {report.surfacesRead.map((surface) => (
              <li
                key={surface}
                className="font-plex-sans text-sm leading-relaxed text-ink"
              >
                {surface}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="font-plex-mono text-[13px] uppercase tracking-[0.14em] text-ink/60">
            Findings
          </h2>
          <FindingLedger findings={[...report.findings]} />
        </section>

        <section className="mt-14 border-t border-iron/15 pt-8">
          <h2 className="font-plex-mono text-[13px] uppercase tracking-[0.14em] text-ink/60">
            What it takes
          </h2>
          <p className="mt-2 font-plex-sans text-sm text-ink/60">
            An estimate, not a quote. The Check is what turns this into a number
            we will stand behind.
          </p>
          <p className="mt-4 font-newsreader text-reading leading-reading text-iron">
            {report.whatItTakes.scope}
          </p>
          <p className="mt-4 font-plex-mono text-data text-iron">
            {report.whatItTakes.weeks} · {report.whatItTakes.band}
          </p>
        </section>

        <section className="mt-14 border-t border-iron/15 pt-8">
          <h2 className="font-plex-mono text-[13px] uppercase tracking-[0.14em] text-ink/60">
            Who would do it
          </h2>
          <p className="mt-4 font-newsreader text-reading leading-reading text-iron">
            <Link
              href={`${brand.url}/team/${specialist.id}`}
              className="underline-offset-4 hover:underline"
            >
              {specialist.name}
            </Link>
            , {specialist.role}. {report.pod} pod.
          </p>
        </section>

        <section className="mt-14 border-t border-iron/15 pt-8">
          <h2 className="font-plex-mono text-[13px] uppercase tracking-[0.14em] text-ink/60">
            Limits
          </h2>
          <p className="mt-2 font-plex-sans text-sm text-ink/60">
            Equal weight to everything above. This is what we could not see.
          </p>
          <ul className="mt-4 flex flex-col gap-3">
            {report.limits.map((limit) => (
              <li
                key={limit}
                className="font-newsreader text-reading leading-reading text-iron"
              >
                {limit}
              </li>
            ))}
          </ul>
        </section>

        <div className="report-cta mt-16 border-t border-iron/15 pt-8">
          <Link
            href={`${brand.url}/check`}
            className="inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3 font-plex-sans text-[15px] font-medium text-iron"
          >
            Book the Check
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <p className="report-print-url mt-16 hidden font-plex-mono text-[12px] text-ink/60">
          https://report.bpulse.dev/{report.slug}
        </p>
      </div>
    </article>
  );
}
