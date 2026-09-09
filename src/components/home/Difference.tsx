import Link from "next/link";
import { Episode, EpisodeHead } from "@/components/episode/Episode";
import { ledgerConcede, ledgerRows } from "@/content/home";

/**
 * Ledger as ruled rows. A table was a 36rem min-width and broke 375.
 * Remove the borders: the three lines still read.
 */
export function Difference() {
  return (
    <Episode labelledBy="difference" tone="paper">
      <EpisodeHead
        n="03"
        kicker="THE DIFFERENCE"
        id="difference"
        heading="They sell a person. We finish the product."
      >
        Everything they hide, we publish. One row we lose on purpose.
      </EpisodeHead>

      <ul className="mt-12 list-none p-0">
        {ledgerRows.map((row) => (
          <li key={row.label} className="border-t border-line py-4">
            <p className="font-plex-mono text-[11px] uppercase tracking-[0.06em] text-label">
              {row.label}
            </p>
            <p className="mt-2 font-newsreader text-[17px] leading-[1.4] text-quill">
              They: {row.they}
            </p>
            <p className="mt-1 font-newsreader text-[17px] leading-[1.4] text-ink">
              We: {row.we}
            </p>
          </li>
        ))}
      </ul>

      <p className="mt-10 border-t border-line pt-8">
        <span className="block font-plex-mono text-[11px] uppercase tracking-[0.06em] text-label">
          The conceded row
        </span>
        <span className="mt-2 block font-newsreader text-[22px] leading-[1.3] text-ink">
          {ledgerConcede.they} · {ledgerConcede.we}
        </span>
        <span className="mt-2 block font-newsreader text-[16px] text-quill">
          {ledgerConcede.note}
        </span>
      </p>

      <p className="mt-8">
        <Link href="/standard" className="aside-chip">
          The published standard
        </Link>
      </p>
    </Episode>
  );
}
