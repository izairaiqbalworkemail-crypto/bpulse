type ProofRowProps = {
  value: string;
  label: string;
  source: string;
  unverified?: boolean;
};

export function ProofRow({ value, label, source, unverified }: ProofRowProps) {
  return (
    <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-iron/15 py-3">
      <span className="font-plex-mono text-[16px] tabular-nums text-iron">
        {value}
      </span>
      <span className="font-newsreader text-[16px] text-ink">{label}</span>
      <span className="font-plex-mono text-[12px] text-ink/70">
        {unverified ? "crew-reported, unverified · " : null}
        {source}
      </span>
    </p>
  );
}
