import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { handover } from "@/content/demo";

export const metadata: Metadata = buildMetadata({
  title: "The platform — handover",
  description:
    "Runbook, credentials transfer, and the access revocation log. Sample.",
  path: "/demo/handover",
});

export default function DemoHandoverPage() {
  return (
    <section className="bg-rag bg-[radial-gradient(130%_100%_at_100%_0%,rgba(171,151,108,0.18),transparent_55%)] py-16 md:py-20">
      <div className="grid-container">
        <div className="border-y border-iron/20 py-8">
          <p className="font-plex-mono text-[12px] uppercase tracking-[0.12em] text-ink/60">
            Sample closeout ledger
          </p>
          <h2 className="mt-3 font-newsreader text-[clamp(1.75rem,3vw,2.5rem)] leading-title text-iron">
            Handover
          </h2>
          <p className="mt-3 max-w-measure font-newsreader text-reading leading-reading text-ink">
            {handover.runbook}
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <article className="card p-5 md:col-span-2">
            <p className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/60">
              Credentials transfer
            </p>
            <p className="mt-2 font-newsreader text-[17px] text-ink">
              Every privileged account has an owner, cutoff date, and closeout status.
            </p>
          </article>
          <article className="card p-5">
            <p className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/60">
              Exit rule
            </p>
            <p className="mt-2 font-newsreader text-[17px] text-ink">
              Access is temporary, documented, and revoked after handoff.
            </p>
          </article>
        </div>

        <div className="mt-6 overflow-x-auto border-y border-iron/20">
          <table className="min-w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-iron/20">
                {["Credential", "Held by", "Until", "Status"].map((header) => (
                  <th
                    key={header}
                    className="py-2.5 pr-4 font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/65"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {handover.credentials.map((row) => (
                <tr key={row.item} className="border-b border-iron/10 align-top">
                  <td className="py-3 pr-4 font-newsreader text-[17px] text-iron">{row.item}</td>
                  <td className="py-3 pr-4 font-plex-mono text-[12px] text-ink/70">{row.heldBy}</td>
                  <td className="py-3 pr-4 font-plex-mono text-[12px] text-ink/70">{row.until}</td>
                  <td className="py-3 pr-2 font-plex-mono text-[12px] text-signal-ink">tracked</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="mt-14 font-plex-mono text-[13px] uppercase tracking-[0.14em] text-ink/60">Access revocation log</h3>
        <p className="mt-3 max-w-measure font-newsreader text-reading leading-reading text-ink">
          Proof we no longer hold credentials after handover. No hostage codebases, written down and verified. This sample Close has not reached handover yet, so revocation dates are intentionally empty.
        </p>
        <div className="mt-6 overflow-x-auto border-y border-iron/20">
          <table className="min-w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-iron/20">
                {["Item", "Revoked on", "Note"].map((header) => (
                  <th
                    key={header}
                    className="py-2.5 pr-4 font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/65"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {handover.revocation.map((row) => (
                <tr key={row.item} className="border-b border-iron/10 align-top">
                  <td className="py-3 pr-4 font-newsreader text-[17px] text-iron">{row.item}</td>
                  <td className="py-3 pr-4 font-plex-mono text-[12px] text-ink/70">{row.revokedOn}</td>
                  <td className="py-3 pr-2 font-newsreader text-[16px] leading-[1.45] text-ink">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-14 border-t border-iron/20 pt-6">
          <h3 className="font-plex-mono text-[13px] uppercase tracking-[0.14em] text-ink/60">Training</h3>
          <p className="mt-3 max-w-measure font-newsreader text-reading text-iron">{handover.training}</p>
        </div>
      </div>
    </section>
  );
}
