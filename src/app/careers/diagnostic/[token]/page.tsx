import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { diagnosticScenarios } from "@/lib/careers/store";
import {
  getDiagnosticContextData,
  getDiagnosticByTokenData,
  openDiagnosticData,
} from "@/lib/careers/repo";
import { DiagnosticForm } from "@/components/careers/DiagnosticForm";
import { PageHero } from "@/components/PageHero";
import { TrackOnMount } from "@/components/analytics/TrackOnMount";

type PageProps = {
  params: Promise<{ token: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { token } = await params;
  const exists = await getDiagnosticByTokenData(token);
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
  const diagnostic = await openDiagnosticData(token);
  if (!diagnostic || !diagnostic.dueAt) notFound();
  const context = await getDiagnosticContextData(token);

  const variant = diagnostic.variant as keyof typeof diagnosticScenarios;
  const scenario = diagnosticScenarios[variant];
  if (!scenario) notFound();

  return (
    <section className="w-full bg-rag pb-24">
      <TrackOnMount event="diagnostic.opened" props={{ surface: "careers-gate0" }} />
      <div className="border-b border-iron/15 bg-[radial-gradient(120%_100%_at_0%_0%,rgba(179,152,97,0.2),transparent_56%)]">
        <PageHero
          kicker="Gate 0 · Private diagnostic"
          title="Condition report diagnostic"
          dek={scenario.brief}
          hideAction
        />
      </div>
      <div className="grid-container pt-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.9fr)]">
          <section className="card border-iron/15 p-6">
            <p className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/65">
              Assignment dossier
            </p>
            <p className="mt-2 font-newsreader text-[23px] leading-[1.2] text-iron">
              Ship-read with evidence. Prioritize launch blockers first.
            </p>
            <div className="mt-4 grid gap-2 text-[15px] md:grid-cols-2">
              <p className="font-newsreader text-ink"><span className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/60">Company</span><br />{scenario.company}</p>
              <p className="font-newsreader text-ink"><span className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/60">Role track</span><br />{context?.roleTitle ?? "Candidate"}</p>
              <p className="font-newsreader text-ink"><span className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/60">Gate</span><br />{context?.gateName ?? "Diagnostic"}</p>
              <p className="font-newsreader text-ink"><span className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/60">Candidate</span><br />{context?.candidateName ?? "Private"}</p>
            </div>
          </section>
          <section className="card border-iron/15 p-6">
            <p className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/65">
              Submission window
            </p>
            <p className="mt-2 font-newsreader text-[18px] leading-[1.45] text-ink">
              You have 48 hours after first open. Submit one clear report with 3 to 5 findings.
            </p>
            <div className="mt-5 border-t border-iron/10 pt-4">
              <p className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/60">Status link</p>
              {context?.statusToken ? (
                <a href={`/careers/status/${context.statusToken}`} className="mt-1 inline-flex font-plex-sans text-[14px] text-ink underline decoration-iron/25 underline-offset-4 hover:decoration-iron">
                  {`/careers/status/${context.statusToken}`}
                </a>
              ) : (
                <p className="mt-1 font-newsreader text-[15px] text-ink/70">Not available yet</p>
              )}
            </div>
          </section>
        </div>

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
          <div className="mt-3 grid gap-4">
            {Object.entries(scenario.keyFiles).map(([path, snippet]) => (
              <div key={path} className="rounded-[12px] border border-iron/12 bg-rag p-3">
                <p className="font-plex-mono text-[12px] text-ink/70">{path}</p>
                <pre className="mt-1 overflow-x-auto rounded-[10px] bg-iron p-3 font-plex-mono text-[12px] leading-[1.45] text-rag">
                  {String(snippet)}
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
          statusToken={context?.statusToken ?? null}
          roleTitle={context?.roleTitle ?? null}
          candidateName={context?.candidateName ?? null}
        />
      </div>
    </section>
  );
}
