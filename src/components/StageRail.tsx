import type { RailStage } from "@/content/types";

type StageRailProps = {
  stages: readonly RailStage[];
  label?: string;
};

function mark(status: RailStage["status"]) {
  if (status === "complete") return "✓";
  if (status === "current") return "●";
  return "○";
}

export function StageRail({ stages, label = "Stages" }: StageRailProps) {
  return (
    <ol
      aria-label={label}
      className="flex flex-col gap-4 border-t border-iron/15 pt-5 md:flex-row md:flex-wrap md:items-start md:gap-x-8 md:gap-y-3"
    >
      {stages.map((stage) => (
        <li key={stage.id} className="min-w-0 md:flex-1">
          <p
            className={`flex items-center gap-2 font-plex-mono text-[13px] uppercase tracking-[0.06em] ${
              stage.status === "upcoming" ? "text-ink/70" : "text-iron"
            }`}
          >
            <span aria-hidden="true">{mark(stage.status)}</span>
            {stage.label}
          </p>
          {stage.detail ? (
            <p className="mt-2 max-w-[40ch] font-newsreader text-[16px] leading-[1.5] text-ink/80">
              {stage.detail}
            </p>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
