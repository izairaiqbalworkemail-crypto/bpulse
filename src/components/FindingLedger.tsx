import type { ReportFinding } from "@/content/reports/types";

export function FindingLedger({ findings }: { findings: ReportFinding[] }) {
  return (
    <ol className="mt-6 flex flex-col gap-0">
      {findings.map((finding, index) => (
        <li key={finding.observed} className="border-t border-iron/15">
          <details className="group py-6" open>
            <summary className="cursor-pointer list-none">
              <p className="font-plex-mono text-[13px] uppercase tracking-[0.08em] text-ink/70">
                {String(index + 1).padStart(2, "0")} · {finding.severity}
              </p>
              <p className="mt-3 font-newsreader text-reading leading-reading text-iron">
                {finding.observed}
              </p>
              <p className="mt-2 font-plex-sans text-sm text-ink/60 group-open:hidden">
                Consequence and closing — open
              </p>
            </summary>
            <p className="mt-4 font-newsreader text-reading leading-reading text-ink">
              <span className="font-plex-sans text-sm text-ink/60">
                Consequence.{" "}
              </span>
              {finding.consequence}
            </p>
            <p className="mt-3 font-newsreader text-reading leading-reading text-ink">
              <span className="font-plex-sans text-sm text-ink/60">Closing. </span>
              {finding.closing}
            </p>
          </details>
        </li>
      ))}
    </ol>
  );
}
