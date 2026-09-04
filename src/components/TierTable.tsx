type Tier = {
  name: string;
  price: string;
  body: string;
  featured?: boolean;
};

type TierTableProps = {
  tiers: readonly Tier[];
  caption?: string;
};

export function TierTable({ tiers, caption }: TierTableProps) {
  return (
    <div className="border-t border-iron/20">
      {caption ? (
        <p className="pt-4 font-plex-mono text-[13px] uppercase tracking-[0.08em] text-ink/70">
          {caption}
        </p>
      ) : null}
      <div className="mt-2 divide-y divide-iron/15">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`grid gap-4 py-8 md:grid-cols-[10rem_8rem_1fr] md:items-baseline ${
              tier.featured ? "bg-signal/15 px-5 md:-mx-5" : ""
            }`}
          >
            <p
              className={`font-newsreader ${
                tier.featured
                  ? "text-[24px] leading-[1.15] text-iron"
                  : "text-[18px] text-ink"
              }`}
            >
              {tier.name}
            </p>
            <p
              className={`font-plex-mono tabular-nums ${
                tier.featured
                  ? "text-[24px] text-iron"
                  : "text-[16px] text-ink/80"
              }`}
            >
              {tier.price}
            </p>
            <p className="max-w-[52ch] font-newsreader text-[16px] leading-[1.5] text-ink/80">
              {tier.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
