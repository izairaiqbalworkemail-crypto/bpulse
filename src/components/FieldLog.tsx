"use client";

import { DataLine } from "@/components/primitives/DataLine";

type FieldLogFigure = {
  label: string;
  value: string;
  source: string;
};

type FieldLogProps = {
  /**
   * Density: "compact" for the hero overlap, "full" for section 2.
   */
  density?: "compact" | "full";
  figures?: FieldLogFigure[];
};

const defaultFigures: FieldLogFigure[] = [
  {
    label: "Sully.ai reach",
    value: "450+ healthcare orgs",
    source: "client-reported · sully.ai",
  },
  {
    label: "Clinical tasks run",
    value: "5M+",
    source: "client-reported · sully.ai",
  },
  {
    label: "DeepIDV verdict latency",
    value: "sub-150ms",
    source: "client-reported · deepidv.com · checked 5 Sep 2026",
  },
  {
    label: "DeepIDV reach",
    value: "211+ countries",
    source: "client-reported · deepidv.com · checked 5 Sep 2026",
  },
  {
    label: "myUsta platforms",
    value: "iOS + Android",
    source: "client-engagement · myusta.al",
  },
];

/**
 * The field log — sourced figures only, rendered as DataLine rows. Appears
 * twice: compact overlapping the hero's bottom hairline, and full density as
 * section 2 of the landing page.
 *
 * Every figure carries its SourceRef visible as a small attribution line.
 * No untraceable claims. No logo marquee.
 */
export function FieldLog({ density = "full", figures }: FieldLogProps) {
  const items = figures ?? defaultFigures;

  return (
    <div
      className={
        density === "compact"
          ? "py-8"
          : "py-24 md:py-32"
      }
    >
      {density === "full" && (
        <div className="grid-container mb-12">
          <h2 className="font-plex-mono text-data tracking-[0.08em] text-ink/70 uppercase">
            The field log
          </h2>
          <p className="mt-4 max-w-measure font-newsreader text-reading leading-reading text-ink">
            Sourced figures from the lots. Every number below is traceable to a
            client site or engagement record. Where we do not have a number, we
            say so.
          </p>
        </div>
      )}

      <div className={density === "full" ? "grid-container" : ""}>
        <div className="flex flex-col gap-3">
          {items.map((fig) => (
            <div key={fig.label} className="flex flex-col gap-1">
              <DataLine label={fig.label} value={fig.value} />
              <p className="font-plex-mono text-caption text-ink/70">
                {fig.source}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
