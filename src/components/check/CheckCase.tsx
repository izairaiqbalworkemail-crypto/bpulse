import Link from "next/link";
import { Episode, EpisodeHead } from "@/components/episode/Episode";
import { Item, Reveal, Stagger } from "@/components/landing/Reveal";
import { checkGenericStarts } from "@/content/check";
import type { CheckCaseView } from "@/lib/check-case";

export function CheckCase({ view }: Readonly<{ view: CheckCaseView }>) {
  const personal = view.kind === "personal";

  return (
    <Episode labelledBy="case" tone="paper">
      <EpisodeHead
        n="05"
        kicker="YOUR CASE"
        id="case"
        heading={
          personal
            ? "Based on what you told us, we'd start here"
            : "Where every Check starts"
        }
      >
        {personal
          ? "Your words, quoted. The closest engagement on the record, if two signals match."
          : "No signals were passed. These four are generic — the same opening on every Check."}
      </EpisodeHead>

      {personal ? (
        <Stagger className="mt-14" gap={0.06}>
          {view.lines.map((line) => (
            <Item key={line.id} className="border-t border-iron/10 py-6 first:border-t-0 first:pt-0">
              <p className="max-w-[46ch] font-newsreader text-[22px] leading-[1.25] text-iron">
                {line.look}
              </p>
              {line.said ? (
                <p className="mt-2 max-w-[46ch] font-newsreader text-[17px] leading-[1.45] text-ink">
                  you said: “{line.said}”
                </p>
              ) : null}
            </Item>
          ))}
        </Stagger>
      ) : (
        <Stagger className="mt-14" gap={0.06}>
          {checkGenericStarts.map((row) => (
            <Item
              key={row.look}
              className="border-t border-iron/10 py-6 first:border-t-0 first:pt-0"
            >
              <p className="max-w-[46ch] font-newsreader text-[22px] leading-[1.25] text-iron">
                {row.look}
              </p>
              <p className="mt-2 max-w-[46ch] font-newsreader text-[17px] leading-[1.45] text-ink">
                Generic. {row.why}
              </p>
            </Item>
          ))}
        </Stagger>
      )}

      {view.closest ? (
        <Reveal className="mt-12">
          <article className="room-card max-w-[48ch] px-6 py-8 md:px-8">
            <p className="font-plex-mono text-[11px] uppercase tracking-[0.1em] text-ink/70">
              Closest engagement we&apos;ve run
            </p>
            <p className="mt-3 font-newsreader text-[22px] leading-[1.3] text-iron">
              {view.closest.lot.lotNumber} · {view.closest.lot.client} —{" "}
              {view.closest.shared} of your {view.closest.selected} signals.
            </p>
            <p className="mt-2 font-newsreader text-[17px] text-ink">
              {view.closest.lot.summary}
            </p>
            <p className="mt-4">
              <Link
                href={`/work/${view.closest.lot.slug}`}
                className="font-plex-sans text-[15px] text-iron underline decoration-iron/25 underline-offset-4 hover:decoration-iron"
              >
                The record →
              </Link>
            </p>
          </article>
        </Reveal>
      ) : null}
    </Episode>
  );
}
