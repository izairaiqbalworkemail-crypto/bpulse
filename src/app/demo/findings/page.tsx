import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { FindingsFilter } from "@/components/FindingsFilter";

export const metadata: Metadata = buildMetadata({
  title: "The platform — findings",
  description: "Open, closed, and deferred findings. Sample.",
  path: "/demo/findings",
});

export default function DemoFindingsPage() {
  return (
    <section className="grid-container py-16 md:py-20">
      <h2 className="font-newsreader text-[clamp(1.75rem,3vw,2.5rem)] leading-title text-iron">
        Findings
      </h2>
      <p className="mt-3 max-w-measure font-newsreader text-reading leading-reading text-ink">
        Sample. Twenty-four findings across open, closed, and deferred. Not a
        live client ledger.
      </p>
      <div className="mt-10">
        <FindingsFilter />
      </div>
    </section>
  );
}
