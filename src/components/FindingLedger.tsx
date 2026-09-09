import type { ReportFinding } from "@/content/reports/types";
import { State } from "@/components/primitives/State";

export function FindingLedger({ findings }: { findings: ReportFinding[] }) {
  return (
    <ol className="mt-6 flex flex-col gap-3">
      {findings.map((finding, index) => (
        <li key={finding.observed} className="letter-object px-6">
          <details className="group py-6" open>
            <summary className="cursor-pointer list-none">
              <p className="flex flex-wrap items-center gap-3 font-plex-mono text-[13px] uppercase tracking-[0.08em] text-quill">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <State state="stuck" ground="paper" word={finding.severity} />
              </p>
              <p className="mt-3 font-newsreader text-reading leading-reading text-ink">
                {finding.observed}
              </p>
              <p className="mt-2 font-plex-sans text-sm text-quill/60 group-open:hidden">
                Consequence and closing — open
              </p>
            </summary>
            <p className="mt-4 font-newsreader text-reading leading-reading text-quill">
              <span className="font-plex-sans text-sm text-quill/60">
                Consequence.{" "}
              </span>
              {finding.consequence}
            </p>
            <p className="mt-3 font-newsreader text-reading leading-reading text-quill">
              <span className="font-plex-sans text-sm text-quill/60">Closing. </span>
              {finding.closing}
            </p>
          </details>
        </li>
      ))}
    </ol>
  );
}
