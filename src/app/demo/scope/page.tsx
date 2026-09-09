import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { LetterLedger } from "@/components/letter/LetterLedger";
import { changeOrders, demoClient, scopeDiff, scopeVersions } from "@/content/demo";

export const metadata: Metadata = buildMetadata({
  title: "The platform. Scope",
  description:
    "Versioned locked scope with a diff and priced change orders. Sample.",
  path: "/demo/scope",
});

export default function DemoScopePage() {
  return (
    <section className="grid-container py-16 md:py-20">
      <h2 className="font-newsreader text-[clamp(1.75rem,3vw,2.5rem)] leading-title text-ink">
        Locked scope
      </h2>
      <p className="mt-3 max-w-measure font-newsreader text-reading leading-reading text-quill">
        Version {demoClient.lockedScopeVersion}. Every change is logged, priced,
        and re-signed. Nothing is absorbed silently. Sample.
      </p>

      <h3 className="mt-12 font-plex-mono text-[13px] uppercase tracking-[0.14em] text-quill/60">
        Versions
      </h3>
      <div className="mt-4">
        <LetterLedger
          lines={scopeVersions.map((version) => ({
            id: `v-${version.version}`,
            kicker: `v${version.version}`,
            title: version.dated,
            body: version.summary,
          }))}
        />
      </div>

      <h3 className="mt-12 font-plex-mono text-[13px] uppercase tracking-[0.14em] text-quill/60">
        Diff · v2.0 to v2.1
      </h3>
      <div className="mt-4">
        <LetterLedger
          lines={scopeDiff.map((row) => ({
            id: row.change,
            kicker: `${row.order} · ${row.price}`,
            title: row.change,
            body: "sample",
          }))}
        />
      </div>

      <h3 className="mt-12 font-plex-mono text-[13px] uppercase tracking-[0.14em] text-quill/60">
        Change orders
      </h3>
      <div className="mt-4">
        <LetterLedger
          lines={changeOrders.map((order) => ({
            id: order.id,
            kicker: order.id,
            title: `${order.price} · signed ${order.signed}`,
            body: order.request,
          }))}
        />
      </div>
    </section>
  );
}
