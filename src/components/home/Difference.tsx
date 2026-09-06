import Link from "next/link";
import { Episode, EpisodeHead } from "@/components/episode/Episode";
import { ledgerConcede, ledgerRows } from "@/content/home";

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

      <div className="mt-12 overflow-x-auto">
        <table className="w-full min-w-[36rem] border-collapse text-left">
          <thead>
            <tr className="border-b border-iron/12">
              <th className="py-3 pr-6 font-plex-mono text-[11px] font-normal uppercase tracking-[0.1em] text-ink/70">
                <span className="sr-only">Criterion</span>
              </th>
              <th className="py-3 pr-6 font-plex-mono text-[11px] font-normal uppercase tracking-[0.1em] text-ink/70">
                A vetted marketplace
              </th>
              <th className="py-3 font-plex-mono text-[11px] font-normal uppercase tracking-[0.1em] text-iron">
                bpulse
              </th>
            </tr>
          </thead>
          <tbody>
            {ledgerRows.map((row) => (
              <tr key={row.label} className="border-b border-iron/8">
                <th className="py-4 pr-6 font-plex-sans text-[13px] font-normal text-ink/70">
                  {row.label}
                </th>
                <td className="py-4 pr-6 font-newsreader text-[17px] text-ink">
                  {row.they}
                </td>
                <td className="py-4 font-newsreader text-[17px] text-iron">
                  {row.we}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-10 max-w-[48ch] border-t border-iron/12 pt-8">
        <span className="block font-plex-mono text-[11px] uppercase tracking-[0.1em] text-ink/70">
          The conceded row
        </span>
        <span className="mt-2 block font-newsreader text-[22px] leading-[1.3] text-iron">
          {ledgerConcede.they} · {ledgerConcede.we}
        </span>
        <span className="mt-2 block font-newsreader text-[16px] text-ink">
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
