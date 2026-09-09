import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { LetterLedger } from "@/components/letter/LetterLedger";
import { updates } from "@/content/demo";

export const metadata: Metadata = buildMetadata({
  title: "The platform. Updates",
  description: "Three weekly written updates. Sample.",
  path: "/demo/updates",
});

export default function DemoUpdatesPage() {
  return (
    <section className="grid-container py-16 md:py-20">
      <h2 className="font-newsreader text-[clamp(1.75rem,3vw,2.5rem)] leading-title text-ink">
        Updates
      </h2>
      <div className="mt-10">
        <LetterLedger
          lines={updates.map((update) => ({
            id: update.week,
            kicker: `${update.week} · sample`,
            title: update.week,
            body: update.body,
          }))}
        />
      </div>
    </section>
  );
}
