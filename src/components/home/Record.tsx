import Image from "next/image";
import Link from "next/link";
import { LotPlate } from "@/components/catalog/LotPlate";
import { Episode, EpisodeHead } from "@/components/episode/Episode";
import { Slide } from "@/components/landing/Reveal";
import { lots, figureDisclaimer } from "@/content/lots";

const featured = ["deepidv", "sully"] as const;

export function Record() {
  const plates = featured.map((slug) => lots.find((lot) => lot.slug === slug));
  const rest = lots.filter(
    (lot) => !featured.includes(lot.slug as (typeof featured)[number]),
  );

  return (
    <Episode labelledBy="record" tone="paper">
      <EpisodeHead
        n="04"
        kicker="THE RECORD"
        id="record"
        heading="What arrived unfinished."
        aside={
          <Link href="/work" className="aside-chip">
            The whole log
          </Link>
        }
      >
        Two lots at full treatment. The rest as rows. Crew-asserted figures stay
        tagged.
      </EpisodeHead>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {plates.map((lot, index) =>
          lot ? (
            <Slide key={lot.slug} from={index === 0 ? "left" : "right"}>
              <LotPlate lot={lot} />
            </Slide>
          ) : null,
        )}
      </div>

      <ul className="mt-10 divide-y divide-iron/8 border-y border-iron/8">
        {rest.map((lot) => {
          const tag = figureDisclaimer(lot);
          return (
            <li key={lot.slug}>
              <Link
                href={`/work/${lot.slug}`}
                className="flex items-center gap-4 py-4"
              >
                <span className="relative h-14 w-20 shrink-0 overflow-hidden rounded-[10px] bg-iron">
                  {lot.imageUrl ? (
                    <Image
                      src={lot.imageUrl}
                      alt=""
                      fill
                      className="object-cover object-top"
                      sizes="80px"
                    />
                  ) : null}
                </span>
                <span className="min-w-0 grow">
                  <span className="block font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/70">
                    {lot.lotNumber}
                    {tag ? ` · ${tag}` : null}
                  </span>
                  <span className="mt-0.5 block font-newsreader text-[20px] text-iron">
                    {lot.client}
                  </span>
                </span>
                <span className="hidden shrink-0 font-newsreader text-[15px] text-ink sm:block">
                  {lot.grade.label.replace(/ on arrival$/i, "")}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </Episode>
  );
}
