import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { TierTable } from "@/components/TierTable";
import { PageClose } from "@/components/PageClose";
import { edpulseTracks, edpulseJoinNote } from "@/content/process";

export const metadata: Metadata = buildMetadata({
  title: "Edpulse",
  description:
    "Explorer is free. Accelerator is the offer. Mastery is custom. Graduates who clear the gates join the crew.",
  path: "/edpulse",
});

const tiers = edpulseTracks.map((track) => ({
  name: track.name,
  price: track.price,
  body: track.body,
  featured: track.name === "Accelerator",
}));

export default function EdpulsePage() {
  return (
    <section className="w-full bg-rag">
      <PageHero
        kicker="Edpulse"
        title="The crew path."
        dek="Practice for the gates. Completing a track does not skip them."
        hideAction
      />

      <div className="grid-container pb-24 pt-6 md:pb-32">
        <TierTable tiers={tiers} />

        <p className="mt-12 max-w-[60ch] font-newsreader text-[18px] leading-[1.5] text-ink">
          {edpulseJoinNote}
        </p>

        <p className="mt-8 font-newsreader text-[16px] text-ink/80">
          Read the gates on{" "}
          <Link
            href="/standard"
            className="underline decoration-iron/40 underline-offset-4 hover:decoration-iron"
          >
            /standard
          </Link>
          .
        </p>
        <PageClose line="Hiring is a different door. The Check is for a product that is stuck." />
      </div>
    </section>
  );
}
