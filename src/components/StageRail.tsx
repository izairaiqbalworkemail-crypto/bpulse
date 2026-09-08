"use client";

import type { RailStage } from "@/content/types";
import { Reveal } from "@/components/landing/Reveal";
import { State } from "@/components/primitives/State";

type StageRailProps = {
  stages: readonly RailStage[];
  label?: string;
};

function StageMark({ status }: Readonly<{ status: RailStage["status"] }>) {
  if (status === "complete") {
    return <State state="ship" ground="paper" word="done" />;
  }
  if (status === "current") {
    return <State state="build" ground="paper" word="current" />;
  }
  return (
    <span className="font-plex-mono text-[13px] uppercase tracking-[0.06em] text-quill">
      ahead
    </span>
  );
}

export function StageRail({ stages, label = "Stages" }: StageRailProps) {
  return (
    <ol
      aria-label={label}
      className="flex flex-col gap-4 border-t border-ink/15 pt-5 md:flex-row md:flex-wrap md:items-start md:gap-x-8 md:gap-y-3"
    >
      {stages.map((stage, index) => (
        <li key={stage.id} className="min-w-0 md:flex-1">
          <Reveal delay={index * 0.05}>
            <p
              className={`flex items-center gap-2 font-plex-mono text-[13px] uppercase tracking-[0.06em] ${
                stage.status === "upcoming" ? "text-quill/70" : "text-ink"
              }`}
            >
              <StageMark status={stage.status} />
              <span>{stage.label}</span>
            </p>
            {stage.detail ? (
              <p className="mt-2 max-w-[40ch] font-newsreader text-[16px] leading-[1.5] text-quill/80">
                {stage.detail}
              </p>
            ) : null}
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
