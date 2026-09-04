type GradeProps = {
  /**
   * The two-token scale: "sound" (green) or "unsound" (red). On the catalogue,
   * this encodes the condition on arrival — see the state vocabulary. Colour
   * is never shown alone — always with a word.
   */
  grade: "sound" | "unsound";
  /**
   * The word that accompanies the dot. Required — colour never carries
   * meaning alone.
   */
  label: string;
  /**
   * The date the lot arrived (or the engagement start where the source is
   * silent). Optional — where no date survives in the source, it is omitted
   * rather than inferred, and the lot's limits line says so.
   */
  date?: string;
};

/**
 * A lot grade: a word plus an 8px dot. Never a pill, never a badge.
 *
 * On this catalogue the grade records condition ON ARRIVAL, not condition
 * today. Constraint enforces: `label` is required so a grade can never be
 * rendered as colour-alone. Uses the plain CSS custom properties
 * --color-sound / --color-unsound (kept outside @theme so no Tailwind colour
 * utility exists to misuse).
 */
export function Grade({ grade, label, date }: GradeProps) {
  const color =
    grade === "sound" ? "var(--color-sound)" : "var(--color-unsound)";

  return (
    <div className="flex items-center gap-3">
      <span
        aria-hidden="true"
        className="h-2 w-2 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span className="font-plex-sans text-sm font-medium text-iron">
        {label}
      </span>
      {date && (
        <span className="font-plex-mono text-caption text-ink/60">{date}</span>
      )}
    </div>
  );
}
