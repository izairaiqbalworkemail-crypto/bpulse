import { State } from "@/components/primitives/State";
import type { BuildState } from "@/lib/brand/states";

type GradeProps = {
  grade: "sound" | "unsound";
  label: string;
  date?: string;
};

/**
 * Arrival grade. Colour never appears without the word.
 * unsound is stuck. sound is shipped.
 */
export function Grade({ grade, label, date }: GradeProps) {
  const state: BuildState = grade === "sound" ? "ship" : "stuck";

  return (
    <div className="flex items-center gap-3">
      <State state={state} ground="paper" word={label} />
      {date ? (
        <span className="font-plex-mono text-caption text-quill">{date}</span>
      ) : null}
    </div>
  );
}
