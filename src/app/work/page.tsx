import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
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
      <div className="h-px w-full bg-iron/15" />

      <div className="pt-40 pb-16 md:pt-48 md:pb-20">
        <div className="grid-container">
          <h1 className="font-newsreader text-[clamp(2rem,4vw+0.5rem,3.5rem)] leading-title tracking-tight text-iron">
            Catalogue of work
          </h1>
          <p className="mt-4 max-w-[560px] font-newsreader text-reading leading-reading text-ink">
            Every lot is a real engagement. Real client, real condition on
            arrival, real outcome. No invented proof. Where a number does not
            exist, we say so.
          </p>
        </div>
      </div>

      {/* Field logs per project — filterable grid */}
      <div className="grid-container">
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
