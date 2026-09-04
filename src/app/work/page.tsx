import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { ProjectGrid } from "@/components/ProjectGrid";
import { Lot } from "@/components/primitives/Lot";
import { Credit } from "@/components/primitives/Credit";
import { lots } from "@/content/lots";
import { getSpecialist } from "@/content/specialists";

export const metadata: Metadata = buildMetadata({
  title: "Catalogue of work",
  description:
    "Every lot in the catalogue. Real clients, real condition notes, real outcomes. What arrived, what was wrong, what it took.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <section className="w-full bg-rag">
      <PageHero
        kicker="Catalogue"
        title="Catalogue of work"
        dek="Lots from work we did. Figures are tagged with how they were sourced — six lots are still crew-reported, unverified. Where a number does not exist, we say so."
      />

      {/* Field logs per project — filterable grid */}
      <div className="grid-container pt-16 md:pt-20">
        <div className="mb-8">
          <h2 className="font-plex-mono text-data tracking-[0.08em] text-ink/70 uppercase">
            Field logs
          </h2>
          <p className="mt-2 max-w-[60ch] font-newsreader text-reading leading-reading text-ink/70">
            What each project actually looked like on arrival, and where it is
            now. Filter by arrival condition.
          </p>
        </div>

        <ProjectGrid lots={lots} />
      </div>

      {/* Detailed lots */}
      <div className="grid-container mt-24">
        <div className="mb-8 border-t border-iron/15 pt-6">
          <h2 className="font-plex-mono text-data tracking-[0.08em] text-ink/70 uppercase">
            Full condition reports
          </h2>
        </div>

        {lots.map((lot, i) => {
          const specialist = getSpecialist(lot.specialistId);
          return (
            <Lot
              key={lot.slug}
              lotNumber={lot.lotNumber}
              title={`${lot.client} — ${lot.title}`}
              condition={lot.condition}
              dataLines={lot.dataLines}
              conditionGrade={lot.grade}
              outcome={lot.outcome}
              limit={lot.limits?.join(" ")}
              specialist={
                <Credit
                  name={specialist.name}
                  capability={lot.specialistCapability}
                  portraitSrc={specialist.photo}
                  portraitAlt={specialist.name}
                />
              }
              href={`/work/${lot.slug}`}
              delayMs={i * 60}
            />
          );
        })}

        <div className="py-16">
          <p className="font-newsreader text-reading leading-reading text-ink/70">
            Want to know if we can help with your product?{" "}
            <Link
              href="/check"
              className="font-plex-sans text-sm font-medium text-iron underline-offset-4 hover:underline"
            >
              Start with a Check
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
