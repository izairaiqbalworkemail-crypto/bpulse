import {
  STATE_COLOR,
  STATE_WORDS,
  type BuildState,
  type StateGround,
} from "@/lib/brand/states";

type StateProps = {
  state: BuildState;
  ground: StateGround;
  /** Required in meaning. Colour never appears without a word. */
  word?: string;
  /** Landing uses the word. A bare dot is a bug. */
  mark?: "dot" | "word";
};

/**
 * A build state. Colour always sits on a word.
 * Dots are optional. On the home page they read as decoration.
 */
export function State({
  state,
  ground,
  word,
  mark = "dot",
}: Readonly<StateProps>) {
  const label = word ?? STATE_WORDS[state];
  const color = STATE_COLOR[ground][state];

  return (
    <span
      className="inline-flex items-center gap-2 font-plex-mono text-[13px] uppercase leading-[1.45] tracking-[0.06em]"
      style={{ color }}
    >
      {mark === "dot" ? (
        <span
          aria-hidden="true"
          className="h-2 w-2 shrink-0 rounded-full"
          style={{ backgroundColor: color }}
        />
      ) : null}
      <span>{label}</span>
    </span>
  );
}
