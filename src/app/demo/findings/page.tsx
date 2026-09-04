import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { demoFindings } from "@/content/demo";

export const metadata: Metadata = buildMetadata({
  title: "Sample portal — findings",
  description: "Open, closed, and deferred findings. Sample.",
  path: "/demo/findings",
});

export default function DemoFindingsPage() {
  return (
    <section className="grid-container py-16 md:py-20">
      <h2 className="font-newsreader text-[clamp(1.75rem,3vw,2.5rem)] leading-title text-iron">
        Findings
      </h2>
      <p className="mt-3 max-w-measure font-newsreader text-reading leading-reading text-ink">
        Same shape as a report finding. Owner and date on each. Sample.
      </p>
      <ul className="mt-10 flex flex-col gap-10">
        {demoFindings.map((finding) => (
          <li key={finding.observed} className="border-t border-iron/15 pt-5">
            <p className="font-plex-mono text-[13px] uppercase tracking-[0.08em] text-ink/60">
              {finding.status} · {finding.owner} · {finding.date} · sample
            </p>
            <p className="mt-3 font-newsreader text-reading leading-reading text-iron">
              {finding.observed}
            </p>
            <p className="mt-3 font-newsreader text-reading leading-reading text-ink">
              {finding.closing}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
