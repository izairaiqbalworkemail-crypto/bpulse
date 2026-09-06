import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { StageRail } from "@/components/StageRail";
import { getDemoOverview } from "@/content/demo";
import type { RailStage } from "@/content/types";

export const metadata: Metadata = buildMetadata({
  title: "The platform",
  description:
    "The platform, live, with sample data. Stage tracker, locked scope, and handover.",
  path: "/demo",
});

export default function DemoOverviewPage() {
  const overview = getDemoOverview();

  return (
    <section className="grid-container py-16 md:py-20">
      <p className="font-plex-mono text-[13px] uppercase tracking-[0.14em] text-ink/60">
        Sample · {overview.client}
      </p>
      <h2 className="mt-3 font-newsreader text-[clamp(1.75rem,3vw,2.5rem)] leading-title text-iron">
        {overview.engagement}
      </h2>
      <p className="mt-2 font-plex-mono text-data text-ink/70">
        Scope {overview.scopeVersion} locked · {overview.band} · day{" "}
        {overview.daysElapsed} of {overview.lockedDays} · sample
      </p>

      <div className="mt-10">
        <StageRail
          stages={overview.stages.map((stage): RailStage => {
            const current = "current" in stage && Boolean(stage.current);
            const status = current
              ? "current"
              : stage.done
                ? "complete"
                : "upcoming";
            return { id: stage.id, label: stage.label, status };
          })}
        />
      </div>

      <ol className="mt-10 grid gap-3 md:grid-cols-3">
        {overview.stages.map((stage) => {
          const current = "current" in stage && Boolean(stage.current);
          const status = current ? "Current" : stage.done ? "Done" : "Ahead";
          return (
            <li key={stage.id} className="card p-5">
              <p className="font-plex-mono text-[13px] text-ink/60">{status}</p>
              <p className="mt-1 font-newsreader text-lot-title text-iron">
                {stage.label}
              </p>
            </li>
          );
        })}
      </ol>

      <dl className="mt-12 grid gap-6 md:grid-cols-3">
        <div>
          <dt className="font-plex-mono text-[13px] text-ink/60">Days elapsed</dt>
          <dd className="mt-1 font-plex-mono text-lot-title text-iron">
            {overview.daysElapsed}
          </dd>
        </div>
        <div>
          <dt className="font-plex-mono text-[13px] text-ink/60">Days remaining</dt>
          <dd className="mt-1 font-plex-mono text-lot-title text-iron">
            {overview.daysRemaining}
          </dd>
        </div>
        <div>
          <dt className="font-plex-mono text-[13px] text-ink/60">Next milestone</dt>
          <dd className="mt-1 font-newsreader text-reading text-iron">
            {overview.nextMilestone}
          </dd>
        </div>
        <div>
          <dt className="font-plex-mono text-[13px] text-ink/60">Findings</dt>
          <dd className="mt-1 font-plex-mono text-lot-title text-iron">
            {overview.findings.open} open · {overview.findings.closed} closed
          </dd>
        </div>
      </dl>
    </section>
  );
}
