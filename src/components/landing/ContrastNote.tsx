type ContrastNoteProps = {
  they: string;
  we: string;
  surface?: "rag" | "iron" | "signal";
};

/**
 * One beat: how a talent network talks, how the studio talks.
 */
export function ContrastNote({
  they,
  we,
  surface = "rag",
}: Readonly<ContrastNoteProps>) {
  const mute =
    surface === "iron" ? "text-rag/70" : "text-ink/70";
  const live = surface === "iron" ? "text-rag" : "text-iron";
  const mark = surface === "iron" ? "text-signal" : "text-iron";

  return (
    <dl className="contrast-plate" data-surface={surface}>
      <div className="contrast-cell">
        <dt
          className={`font-plex-mono text-[11px] uppercase tracking-[0.12em] ${mute}`}
        >
          A network
        </dt>
        <dd
          className={`mt-2 max-w-[28ch] font-newsreader text-[17px] leading-[1.35] ${mute}`}
        >
          {they}
        </dd>
      </div>
      <div className="contrast-cell">
        <dt
          className={`font-plex-mono text-[11px] uppercase tracking-[0.12em] ${mark}`}
        >
          This studio
        </dt>
        <dd
          className={`mt-2 max-w-[28ch] font-newsreader text-[17px] leading-[1.35] ${live}`}
        >
          {we}
        </dd>
      </div>
    </dl>
  );
}
