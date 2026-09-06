type InOutPlateProps = {
  inLabel: string;
  inLines: readonly string[];
  outLabel: string;
  outLines: readonly string[];
};

/**
 * A ledger, not two marketing cards. In and out at equal weight.
 */
export function InOutPlate({
  inLabel,
  inLines,
  outLabel,
  outLines,
}: Readonly<InOutPlateProps>) {
  return (
    <div className="contrast-plate mt-14">
      <div className="contrast-cell px-6 py-8 md:px-8 md:py-10">
        <p className="font-plex-mono text-[12px] uppercase tracking-[0.1em] text-ink/70">
          {inLabel}
        </p>
        <ul className="mt-5">
          {inLines.map((line) => (
            <li
              key={line}
              className="border-t border-iron/10 py-3.5 font-newsreader text-[18px] leading-[1.45] text-iron first:border-t-0 first:pt-0"
            >
              {line}
            </li>
          ))}
        </ul>
      </div>
      <div className="contrast-cell px-6 py-8 md:px-8 md:py-10">
        <p className="font-plex-mono text-[12px] uppercase tracking-[0.1em] text-ink/70">
          {outLabel}
        </p>
        <ul className="mt-5">
          {outLines.map((line) => (
            <li
              key={line}
              className="border-t border-iron/10 py-3.5 font-newsreader text-[18px] leading-[1.45] text-iron first:border-t-0 first:pt-0"
            >
              {line}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
