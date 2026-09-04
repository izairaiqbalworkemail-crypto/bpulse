type DataLineProps = {
  /**
   * Label on the left in Plex Sans 14px.
   */
  label: string;
  /**
   * Value on the right in Plex Mono tabular.
   */
  value: string;
  /**
   * When true, value renders in mono (default). Set false for reading text values.
   */
  mono?: boolean;
};

/**
 * The site's most characteristic small detail.
 *
 * Mono key-value row: label left in Plex Sans, value right in Plex Mono
 * tabular, hairline leader between. Appears wherever a fact is stated.
 *
 * Constraint enforces: the leader (dotted) cannot be interrupted textually —
 * it is a border-based dotted rule, so label and value are two separate cells
 * never flowing into one another.
 */
export function DataLine({ label, value, mono = true }: DataLineProps) {
  return (
    <div className="flex items-baseline gap-3">
      <dt className="shrink-0 font-plex-sans text-sm text-ink/70">{label}</dt>
      <dd
        className={`grow border-b border-dotted border-iron/20 ${
          mono
            ? "font-plex-mono text-data text-iron"
            : "font-newsreader text-reading text-iron"
        }`}
      />
      <dd
        className={`shrink-0 ${
          mono
            ? "font-plex-mono text-data text-iron"
            : "font-newsreader text-reading text-iron"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}
