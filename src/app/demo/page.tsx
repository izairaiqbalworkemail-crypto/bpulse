import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { demoClient, demoClock, stages } from "@/content/demo";

export const metadata: Metadata = buildMetadata({
  title: "Sample portal",
  description:
    "A labelled sample of the client portal: stage tracker, locked scope, and handover.",
  path: "/demo",
});

export default function DemoOverviewPage() {
  return (
    <section className="grid-container py-16 md:py-20">
      <p className="font-plex-mono text-[13px] uppercase tracking-[0.14em] text-ink/60">
        Sample · {demoClient.name}
      </p>
      <h2 className="mt-3 font-newsreader text-[clamp(1.75rem,3vw,2.5rem)] leading-title text-iron">
        {demoClient.engagement}
      </h2>
      <p className="mt-2 font-plex-mono text-data text-ink/70">
        Scope {demoClient.lockedScopeVersion} locked · {demoClient.band} · sample
      </p>

      <ol className="mt-10 grid gap-3 md:grid-cols-3">
        {stages.map((stage) => (
          <li
            key={stage.id}
            className="border-t border-iron/15 pt-4"
          >
            <p className="font-plex-mono text-[13px] text-ink/60">
              {"current" in stage && stage.current
                ? "Current"
                : stage.done
                  ? "Done"
                  : "Ahead"}
            </p>
            <p className="mt-1 font-newsreader text-lot-title text-iron">
              {stage.label}
            </p>
          </li>
        ))}
      </ol>

      <dl className="mt-12 grid gap-6 md:grid-cols-3">
        <div>
          <dt className="font-plex-mono text-[13px] text-ink/60">Days elapsed</dt>
          <dd className="mt-1 font-plex-mono text-lot-title text-iron">
            {demoClock.daysElapsed}
          </dd>
        </div>
        <div>
          <dt className="font-plex-mono text-[13px] text-ink/60">Days remaining</dt>
          <dd className="mt-1 font-plex-mono text-lot-title text-iron">
            {demoClock.daysRemaining}
          </dd>
        </div>
        <div>
          <dt className="font-plex-mono text-[13px] text-ink/60">Next milestone</dt>
          <dd className="mt-1 font-newsreader text-reading text-iron">
            {demoClock.nextMilestone}
          </dd>
        </div>
      </dl>
    </section>
  );
}
