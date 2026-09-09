import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
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
      <ol className="mt-4 flex flex-col gap-6">
        {scopeVersions.map((version) => (
          <li key={version.version} className="border-l-2 border-ink/15 pl-5">
            <p className="font-plex-mono text-data text-ink">
              v{version.version} · {version.dated}
            </p>
            <p className="mt-2 font-newsreader text-reading text-quill">
              {version.summary}
            </p>
          </li>
        ))}
      </ol>

      <h3 className="mt-12 font-plex-mono text-[13px] uppercase tracking-[0.14em] text-quill/60">
        Diff · v2.0 → v2.1
      </h3>
      <ul className="mt-4 flex flex-col gap-6">
        {scopeDiff.map((row) => (
          <li key={row.change} className="border-l-2 border-ink/15 pl-5">
            <p className="font-plex-mono text-[13px] text-quill/60">
              {row.order} · {row.price} · sample
            </p>
            <p className="mt-2 font-newsreader text-reading text-ink">
              {row.change}
            </p>
          </li>
        ))}
      </ul>

      <h3 className="mt-12 font-plex-mono text-[13px] uppercase tracking-[0.14em] text-quill/60">
        Change orders
      </h3>
      <ul className="mt-4 flex flex-col gap-6">
        {changeOrders.map((order) => (
          <li key={order.id} className="card p-6">
            <p className="font-plex-mono text-data text-ink">
              {order.id} · {order.price} · signed {order.signed}
            </p>
            <p className="mt-2 font-newsreader text-reading text-quill">
              {order.request}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
