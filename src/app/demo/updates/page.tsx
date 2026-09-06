import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { updates } from "@/content/demo";

export const metadata: Metadata = buildMetadata({
  title: "The platform — updates",
  description: "Three weekly written updates. Sample.",
  path: "/demo/updates",
});

export default function DemoUpdatesPage() {
  return (
    <section className="grid-container py-16 md:py-20">
      <h2 className="font-newsreader text-[clamp(1.75rem,3vw,2.5rem)] leading-title text-iron">
        Updates
      </h2>
      <ul className="mt-10 flex flex-col gap-10">
        {updates.map((update) => (
          <li key={update.week} className="card p-6">
            <p className="font-plex-mono text-[13px] uppercase tracking-[0.14em] text-ink/60">
              {update.week} · sample
            </p>
            <p className="mt-3 font-newsreader text-reading leading-reading text-iron">
              {update.body}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
