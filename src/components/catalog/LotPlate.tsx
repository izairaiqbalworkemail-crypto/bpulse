import Link from "next/link";
import { ProofRow } from "@/components/ProofRow";
import { BrowserShot } from "@/components/catalog/BrowserShot";
import { Trace } from "@/components/trace/Trace";
import { figureDisclaimer } from "@/content/lots";
import type { Lot } from "@/content/types";
import { specFromLot, verifiedFigures } from "@/lib/lot-trace";

type LotPlateProps = {
  lot: Lot;
  href?: string;
};

export function LotPlate({ lot, href = `/work/${lot.slug}` }: Readonly<LotPlateProps>) {
  const figures = verifiedFigures(lot);
  const disclaimer = figureDisclaimer(lot);
  const spec = specFromLot(lot);

  return (
    <article className="h-full rounded-[16px] bg-rag-card p-8 shadow-[var(--shadow-card)] ring-1 ring-iron/[0.08] transition-shadow hover:shadow-[var(--shadow-raised)]">
      <Link href={href} className="group flex h-full flex-col">
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">
            {lot.lotNumber}
          </p>
          <p className="font-plex-mono text-[12px] text-ink/70">
            {lot.grade.label.replace(/ on arrival$/i, "")}
            <span
              className="ml-2 inline-block h-1.5 w-1.5 rounded-full"
              style={{
                background:
                  lot.grade.grade === "sound"
                    ? "var(--color-sound)"
                    : "var(--color-unsound)",
              }}
              aria-hidden="true"
            />
          </p>
        </div>

        <div className="mt-5">
          <Trace spec={spec} size="card" surface="paper" />
        </div>

        <div className="mt-5 h-px w-full bg-iron/10" aria-hidden="true" />

        <h3 className="mt-5 font-newsreader text-[22px] leading-[1.15] text-iron underline decoration-iron/25 underline-offset-4 group-hover:decoration-iron">
          {lot.client}
        </h3>
        <p className="mt-2 font-newsreader text-[16px] leading-[1.4] text-ink">
          {lot.summary}
        </p>

        {figures.length > 0 ? (
          <div className="mt-5">
            {figures.map((line) => (
              <ProofRow
                key={line.label}
                value={line.value}
                label={line.label}
                source={lot.attribution.sourceUrl ?? lot.attribution.type}
                unverified={Boolean(disclaimer)}
              />
            ))}
          </div>
        ) : null}

        {lot.imageUrl ? (
          <div className="mt-6">
            <BrowserShot
              src={lot.imageUrl}
              url={lot.clientUrl}
              client={lot.client}
            />
          </div>
        ) : null}
      </Link>
    </article>
  );
}
