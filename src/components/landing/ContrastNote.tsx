type ContrastNoteProps = {
  they: string;
  we: string;
  surface?: "paper" | "ink" | "gold";
};

/**
 * One beat: how a talent network talks, how the studio talks.
 */
export function ContrastNote({
  they,
  we,
  surface = "paper",
}: Readonly<ContrastNoteProps>) {
  const mute =
    surface === "ink" ? "text-paper/70" : "text-quill/70";
  const live = surface === "ink" ? "text-paper" : "text-ink";
  const mark = surface === "ink" ? "text-paper" : "text-headline";

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
