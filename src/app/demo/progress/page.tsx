import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { LetterLedger } from "@/components/letter/LetterLedger";
import { progress } from "@/content/demo";

export const metadata: Metadata = buildMetadata({
  title: "The platform. Progress",
  description: "Sample commits, deploys, and burndown. Not a live feed.",
  path: "/demo/progress",
});

export default function DemoProgressPage() {
  return (
    <section className="grid-container py-16 md:py-20">
      <h2 className="font-newsreader text-[clamp(1.75rem,3vw,2.5rem)] leading-title text-ink">
        Progress
      </h2>
      <p className="mt-3 max-w-measure font-newsreader text-reading leading-reading text-quill">
        Sample data. When a real portal ships, unwired integrations show “not
        connected”, as production does here.
      </p>

      <h3 className="mt-12 font-plex-mono text-[13px] uppercase tracking-[0.14em] text-quill/60">
        Commits · sample
      </h3>
      <div className="mt-4">
        <LetterLedger
          lines={progress.commits.map((commit) => ({
            id: commit.hash,
            kicker: commit.hash,
            title: commit.message,
            meta: commit.date,
          }))}
        />
      </div>

      <h3 className="mt-12 font-plex-mono text-[13px] uppercase tracking-[0.14em] text-quill/60">
        Environments
      </h3>
      <div className="mt-4">
        <LetterLedger
          lines={progress.deploys.map((deploy) => ({
            id: deploy.env,
            kicker: deploy.env,
            title: deploy.status,
            meta: deploy.at,
          }))}
        />
      </div>

      <p className="mt-12 font-newsreader text-reading text-ink">
        {progress.burndown}
      </p>
    </section>
  );
}
