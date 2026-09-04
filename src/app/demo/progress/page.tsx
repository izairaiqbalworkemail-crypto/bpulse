import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { progress } from "@/content/demo";

export const metadata: Metadata = buildMetadata({
  title: "Sample portal — progress",
  description: "Sample commits, deploys, and burndown. Not a live feed.",
  path: "/demo/progress",
});

export default function DemoProgressPage() {
  return (
    <section className="grid-container py-16 md:py-20">
      <h2 className="font-newsreader text-[clamp(1.75rem,3vw,2.5rem)] leading-title text-iron">
        Progress
      </h2>
      <p className="mt-3 max-w-measure font-newsreader text-reading leading-reading text-ink">
        Sample data. When a real portal ships, unwired integrations show “not
        connected” — as production does here.
      </p>

      <h3 className="mt-12 font-plex-mono text-[13px] uppercase tracking-[0.14em] text-ink/60">
        Commits · sample
      </h3>
      <ul className="mt-4 flex flex-col gap-4">
        {progress.commits.map((commit) => (
          <li key={commit.hash} className="border-t border-iron/15 pt-3">
            <p className="font-plex-mono text-data text-iron">{commit.hash}</p>
            <p className="mt-1 font-newsreader text-reading text-ink">
              {commit.message}
            </p>
            <p className="mt-1 font-plex-sans text-sm text-ink/60">{commit.date}</p>
          </li>
        ))}
      </ul>

      <h3 className="mt-12 font-plex-mono text-[13px] uppercase tracking-[0.14em] text-ink/60">
        Environments
      </h3>
      <ul className="mt-4 flex flex-col gap-4">
        {progress.deploys.map((deploy) => (
          <li key={deploy.env} className="border-t border-iron/15 pt-3">
            <p className="font-plex-mono text-data text-iron">
              {deploy.env} · {deploy.status}
            </p>
            <p className="mt-1 font-plex-sans text-sm text-ink/60">{deploy.at}</p>
          </li>
        ))}
      </ul>

      <p className="mt-12 font-newsreader text-reading text-iron">
        {progress.burndown}
      </p>
    </section>
  );
}
