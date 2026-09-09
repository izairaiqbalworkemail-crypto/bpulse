import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { handover } from "@/content/demo";

export const metadata: Metadata = buildMetadata({
  title: "The platform. Handover",
  description:
    "Runbook, credentials transfer, and the access revocation log. Sample.",
  path: "/demo/handover",
});

export default function DemoHandoverPage() {
  return (
    <section className="bg-paper py-16 md:py-20">
      <div className="grid-container">
        <div className="border-y border-ink/20 py-8">
          <p className="font-plex-mono text-[12px] uppercase tracking-[0.12em] text-quill/60">
            Sample closeout ledger
          </p>
          <h2 className="mt-3 font-newsreader text-[clamp(1.75rem,3vw,2.5rem)] leading-title text-ink">
            Handover
          </h2>
          <p className="mt-3 max-w-measure font-newsreader text-reading leading-reading text-quill">
            {handover.runbook}
          </p>
        </div>

        <div className="mt-10 grid gap-8 border-t border-ink/10 pt-8 md:grid-cols-3">
          <article className="md:col-span-2">
            <p className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-quill/60">
              Credentials transfer
            </p>
            <p className="mt-2 font-newsreader text-[17px] text-quill">
              Every privileged account has an owner, cutoff date, and closeout status.
            </p>
          </article>
          <article>
            <p className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-quill/60">
              Exit rule
            </p>
            <p className="mt-2 font-newsreader text-[17px] text-quill">
              Access is temporary, documented, and revoked after handoff.
            </p>
          </article>
        </div>

        <div className="mt-6 overflow-x-auto border-y border-ink/20">
          <table className="min-w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-ink/20">
                {["Credential", "Held by", "Until", "Status"].map((header) => (
                  <th
                    key={header}
                    className="py-2.5 pr-4 font-plex-mono text-[11px] uppercase tracking-[0.08em] text-quill/65"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {handover.credentials.map((row) => (
                <tr key={row.item} className="border-b border-ink/10 align-top">
                  <td className="py-3 pr-4 font-newsreader text-[17px] text-ink">{row.item}</td>
                  <td className="py-3 pr-4 font-plex-mono text-[12px] text-quill/70">{row.heldBy}</td>
                  <td className="py-3 pr-4 font-plex-mono text-[12px] text-quill/70">{row.until}</td>
                  <td className="py-3 pr-2 font-plex-mono text-[12px] text-ship">tracked</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="mt-14 font-plex-mono text-[13px] uppercase tracking-[0.14em] text-quill/60">Access revocation log</h3>
        <p className="mt-3 max-w-measure font-newsreader text-reading leading-reading text-quill">
          Proof we no longer hold credentials after handover. No hostage codebases, written down and verified. This sample Close has not reached handover yet, so revocation dates are intentionally empty.
        </p>
        <div className="mt-6 overflow-x-auto border-y border-ink/20">
          <table className="min-w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-ink/20">
                {["Item", "Revoked on", "Note"].map((header) => (
                  <th
                    key={header}
                    className="py-2.5 pr-4 font-plex-mono text-[11px] uppercase tracking-[0.08em] text-quill/65"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {handover.revocation.map((row) => (
                <tr key={row.item} className="border-b border-ink/10 align-top">
                  <td className="py-3 pr-4 font-newsreader text-[17px] text-ink">{row.item}</td>
                  <td className="py-3 pr-4 font-plex-mono text-[12px] text-quill/70">{row.revokedOn}</td>
                  <td className="py-3 pr-2 font-newsreader text-[16px] leading-[1.45] text-quill">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-14 border-t border-ink/20 pt-6">
          <h3 className="font-plex-mono text-[13px] uppercase tracking-[0.14em] text-quill/60">Training</h3>
          <p className="mt-3 max-w-measure font-newsreader text-reading text-ink">{handover.training}</p>
        </div>
      </div>
    </section>
  );
}
