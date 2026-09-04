import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { DataLine } from "@/components/primitives/DataLine";
import { Grade } from "@/components/primitives/Grade";
import { buildMetadata } from "@/lib/seo";
import { buildTracePath, classifyArrivalState, traceDescription } from "@/lib/trace";
import { getResolvedReport, reportSignalCatalog, reports } from "@/content/reports";

type ReportPageProps = {
  params: Promise<{ slug: string }>;
};

function stateLabel(state: ReturnType<typeof classifyArrivalState>) {
  if (state === "integration-blocked") return "Integration-blocked on arrival";
  if (state === "stalled") return "Stalled on arrival";
  if (state === "incomplete") return "Incomplete on arrival";
  return "Unstable on arrival";
}

function stateGrade(state: ReturnType<typeof classifyArrivalState>) {
  return state === "integration-blocked" || state === "unstable"
    ? "unsound"
    : "sound";
}

export async function generateStaticParams() {
  return reports.map((report) => ({ slug: report.slug }));
}

export async function generateMetadata({ params }: ReportPageProps): Promise<Metadata> {
  const { slug } = await params;
  const resolved = getResolvedReport(slug);
  if (!resolved) {
    return buildMetadata({
      title: "Private diagnostic",
      description: "Private report.",
      path: `/${slug}`,
      robots: { index: false, follow: false },
    });
  }

  return buildMetadata({
    title: `${resolved.report.company} diagnostic`,
    description: resolved.report.summary,
    path: `/${slug}`,
    robots: { index: false, follow: false },
    image: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://report.bpulse.dev"}/${slug}/opengraph-image`,
  });
}

export default async function ReportPage({ params }: ReportPageProps) {
  const { slug } = await params;
  const resolved = getResolvedReport(slug);
  if (!resolved) notFound();

  const { report, lot, specialist } = resolved;
  const score = report.signals.reduce(
    (sum, key) => sum + reportSignalCatalog[key].weight,
    0
  );
  const state = classifyArrivalState(Math.max(0, Math.min(score, 12)));
  const deflections = report.signals.map((key) => reportSignalCatalog[key].deflection);
  const trace = buildTracePath(deflections);

  return (
    <main className="min-h-screen bg-rag py-16 md:py-24">
      <article className="grid-container rounded-[16px] border border-iron/15 bg-rag-card p-8 shadow-[var(--shadow-card)] md:p-12">
        <p className="font-plex-mono text-caption tracking-[0.08em] text-ink/70 uppercase">
          Private diagnostic
        </p>
        <h1 className="mt-3 font-newsreader text-[clamp(2rem,4vw,3.5rem)] leading-title tracking-tight text-iron">
          {report.company}
        </h1>
        <p className="mt-2 font-newsreader text-reading leading-reading text-ink">
          Prepared for the {report.role}. {report.summary}
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <DataLine label="Lot reference" value={lot.lotNumber} />
          <DataLine label="Generated" value={report.generatedOn} />
          <DataLine label="Specialist" value={specialist.name} mono={false} />
          <DataLine label="State" value={stateLabel(state)} mono={false} />
        </div>

        <div className="mt-10">
          <svg
            viewBox="0 0 120 40"
            role="img"
            aria-label={traceDescription(state, report.signals.length)}
            className="w-full"
          >
            <path d="M0 20 L120 20" className="hero-trace-baseline" />
            <path d={trace} className="hero-trace-line" />
          </svg>
        </div>

        <ul className="mt-8 space-y-3">
          {report.findings.map((finding) => (
            <li key={finding} className="font-newsreader text-reading leading-reading text-ink">
              {finding}
            </li>
          ))}
        </ul>

        <div className="mt-8 border-t border-iron/15 pt-6">
          <Grade
            grade={stateGrade(state)}
            label={stateLabel(state)}
            date={report.generatedOn}
          />
          <p className="mt-4 font-newsreader text-reading leading-reading text-ink">
            This report is private. It is shared directly with the recipient and
            must not be indexed or linked publicly.
          </p>
          <p className="mt-3 font-plex-mono text-caption text-ink/70">
            Need to respond? Use `/api/intake` from Framer forms with this slug as
            `context.reportSlug`.
          </p>
          <Link
            href="mailto:contact@bpulse.dev"
            className="mt-6 inline-flex rounded-full bg-iron px-6 py-3 font-plex-sans text-sm font-medium text-rag"
          >
            Contact bpulse
          </Link>
        </div>
      </article>
    </main>
  );
}
