import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { handover } from "@/content/demo";

export const metadata: Metadata = buildMetadata({
  title: "Sample portal — handover",
  description:
    "Runbook, credentials transfer, and the access revocation log. Sample.",
  path: "/demo/handover",
});

export default function DemoHandoverPage() {
  return (
    <section className="grid-container py-16 md:py-20">
      <h2 className="font-newsreader text-[clamp(1.75rem,3vw,2.5rem)] leading-title text-iron">
        Handover
      </h2>
      <p className="mt-3 max-w-measure font-newsreader text-reading leading-reading text-ink">
        {handover.runbook}
      </p>

      <h3 className="mt-12 font-plex-mono text-[13px] uppercase tracking-[0.14em] text-ink/60">
        Credentials transfer
      </h3>
      <ul className="mt-4 flex flex-col gap-4">
        {handover.credentials.map((row) => (
          <li key={row.item} className="border-t border-iron/15 pt-3">
            <p className="font-newsreader text-reading text-iron">{row.item}</p>
            <p className="mt-1 font-plex-sans text-sm text-ink/60">
              Held by {row.heldBy} · until {row.until} · sample
            </p>
          </li>
        ))}
      </ul>

      <h3 className="mt-12 font-plex-mono text-[13px] uppercase tracking-[0.14em] text-ink/60">
        Access revocation log
      </h3>
      <p className="mt-3 max-w-measure font-newsreader text-reading leading-reading text-ink">
        Proof we no longer hold credentials after handover. No hostage
        codebases — written down, not asserted. Sample: this Close has not
        reached handover, so revocation dates are empty on purpose.
      </p>
      <ul className="mt-6 flex flex-col gap-6">
        {handover.revocation.map((row) => (
          <li key={row.item} className="border-t border-iron/15 pt-4">
            <p className="font-plex-mono text-[13px] text-ink/60">
              Revoked {row.revokedOn} · sample
            </p>
            <p className="mt-2 font-newsreader text-reading text-iron">
              {row.item}
            </p>
            <p className="mt-2 font-newsreader text-reading text-ink">{row.note}</p>
          </li>
        ))}
      </ul>

      <h3 className="mt-12 font-plex-mono text-[13px] uppercase tracking-[0.14em] text-ink/60">
        Training
      </h3>
      <p className="mt-3 font-newsreader text-reading text-iron">
        {handover.training}
      </p>
    </section>
  );
}
