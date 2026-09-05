import Link from "next/link";
import { BrowserShot } from "@/components/catalog/BrowserShot";
import { Surface } from "@/components/primitives/Surface";
import { Trace } from "@/components/trace/Trace";
import type { Lot } from "@/content/types";
import { specFromLot, verifiedFigures } from "@/lib/lot-trace";

type LotPlateProps = {
  lot: Lot;
  href?: string;
  compact?: boolean;
};

function FigureLine({ value, label }: Readonly<{ value: string; label: string }>) {
  return (
    <p className="flex items-baseline gap-3">
      <span className="shrink-0 font-plex-mono text-[15px] tabular-nums text-iron">
        {value}
      </span>
      <span
        className="min-w-4 grow border-b border-dotted border-iron/20"
        aria-hidden="true"
      />
      <span className="shrink-0 font-newsreader text-[15px] text-ink">{label}</span>
    </p>
  );
}

export function LotPlate({
  lot,
  href = `/work/${lot.slug}`,
  compact = false,
}: Readonly<LotPlateProps>) {
  const figures = verifiedFigures(lot);
  const spec = specFromLot(lot);
  const gradeWord = lot.grade.label.replace(/ on arrival$/i, "");
  const proof = figures[0];

  return (
    <Surface as="article" hover className="h-full">
      <Link href={href} className="group flex h-full min-w-0 flex-col p-8">
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">
            {lot.lotNumber}
          </p>
          <p className="font-plex-mono text-[12px] text-ink/70">
            {gradeWord}
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

        <div className={`relative ${compact ? "mt-5" : "mt-6"}`}>
          <Trace spec={spec} size={compact ? "card" : "full"} surface="paper" />
          {proof ? (
            <p className="absolute bottom-2 left-0 rounded-[12px] bg-rag/95 px-3 py-2 shadow-[var(--shadow-card)]">
              <span className="block font-plex-mono text-[18px] leading-none text-iron">
                {proof.value}
              </span>
              <span className="mt-1 block font-plex-sans text-[11px] text-ink">
                {proof.label}
              </span>
            </p>
          ) : null}
        </div>

        <div className="mt-6 h-px w-full bg-iron/[0.08]" aria-hidden="true" />

        <h3 className="mt-5 font-newsreader text-[24px] leading-[1.1] text-iron underline decoration-iron/25 underline-offset-4 group-hover:decoration-iron">
          {lot.client}
        </h3>
        <p className="mt-2 font-newsreader text-[16px] leading-[1.4] text-ink">
          {lot.summary}
        </p>

        {figures.length > 1 ? (
          <div className="mt-5 flex flex-col gap-2">
            {figures.slice(1).map((line) => (
              <FigureLine
                key={line.label}
                value={line.value}
                label={line.label}
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
    </Surface>
  );
}
