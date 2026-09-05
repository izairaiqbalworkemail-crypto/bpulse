import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import {
  diagnosticScenarios,
  getDiagnosticByToken,
  openDiagnostic,
} from "@/lib/careers/store";
import { DiagnosticForm } from "@/components/careers/DiagnosticForm";
import { PageHero } from "@/components/PageHero";

type PageProps = {
  params: Promise<{ token: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { token } = await params;
  const exists = getDiagnosticByToken(token);
  if (!exists) return {};
  return buildMetadata({
    title: "Gate 0 diagnostic",
    description: "Private diagnostic brief and submission route.",
    path: `/careers/diagnostic/${token}`,
    robots: "noindex, nofollow",
  });
}

export default async function DiagnosticTokenPage({ params }: PageProps) {
  const { token } = await params;
  if (!/^[A-Za-z0-9]{16}$/.test(token)) notFound();
  const diagnostic = openDiagnostic(token);
  if (!diagnostic || !diagnostic.dueAt) notFound();

  const scenario = diagnosticScenarios[diagnostic.variant];
  if (!scenario) notFound();

  return (
    <section className="w-full bg-rag pb-24">
      <PageHero
        kicker="Gate 0 · Private diagnostic"
        title="Condition report diagnostic."
        dek={scenario.brief}
        hideAction
      />
      <div className="grid-container pt-10">

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="card p-6">
            <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">Repo tree</p>
            <ul className="mt-3 space-y-2 font-plex-mono text-[13px] text-ink/80">
              {scenario.tree.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section className="card p-6">
            <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">Logs</p>
            <p className="mt-2 font-plex-mono text-[12px] text-ink/65">build.log</p>
            <ul className="mt-2 space-y-1 font-plex-mono text-[13px] text-ink/80">
              {scenario.buildLog.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <p className="mt-4 font-plex-mono text-[12px] text-ink/65">runtime.log</p>
            <ul className="mt-2 space-y-1 font-plex-mono text-[13px] text-ink/80">
              {scenario.runtimeLog.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </section>
        </div>

        <section className="card mt-8 p-6">
          <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">Key files</p>
          <div className="mt-3 space-y-4">
            {Object.entries(scenario.keyFiles).map(([path, snippet]) => (
              <div key={path}>
                <p className="font-plex-mono text-[12px] text-ink/70">{path}</p>
                <pre className="mt-1 overflow-x-auto rounded-[10px] bg-iron p-3 font-plex-mono text-[12px] leading-[1.45] text-rag">
                  {snippet}
                </pre>
              </div>
            ))}
          </div>
        </section>

        <DiagnosticForm
          token={token}
          dueAt={diagnostic.dueAt}
          seeded={diagnostic.draft ?? diagnostic.payload}
          submitted={Boolean(diagnostic.submittedAt)}
        />
      </div>
    </section>
  );
}
