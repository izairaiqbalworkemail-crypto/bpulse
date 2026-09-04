import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { edpulseJoinNote, edpulseTracks } from "@/content/process";

export const metadata: Metadata = buildMetadata({
  title: "Edpulse",
  description:
    "Explorer $0, Accelerator $4,900, Mastery custom. The crew path — graduates who clear the gates join.",
  path: "/edpulse",
});

export default function EdpulsePage() {
  return (
    <>
      <PageHero
        kicker="Edpulse"
        title="The crew path"
        dek="Three tracks. None of them sell a shortcut around the gates. Graduates who clear them join."
        actionHref="/standard"
        actionLabel="Read the gates"
      />

      <section className="grid-container py-16 md:py-24">
        <ol className="flex flex-col gap-14">
          {edpulseTracks.map((track) => (
            <li key={track.name} className="border-t border-iron/15 pt-8">
              <p className="font-plex-mono text-[13px] uppercase tracking-[0.14em] text-ink/60">
                {track.price}
              </p>
              <h2 className="mt-3 font-newsreader text-[clamp(1.75rem,3vw,2.5rem)] leading-title text-iron">
                {track.name}
              </h2>
              <p className="mt-4 max-w-measure font-newsreader text-reading leading-reading text-ink">
                {track.body}
              </p>
            </li>
          ))}
        </ol>

        <p className="mt-16 max-w-measure font-newsreader text-reading leading-reading text-iron">
          {edpulseJoinNote}
        </p>

        <p className="mt-8 font-newsreader text-reading text-ink">
          Handover training for a paying Close lives on{" "}
          <Link href="/how-it-works" className="underline-offset-4 hover:underline">
            How it works
          </Link>
          . It is already in the engagement.
        </p>
      </section>
    </>
  );
}
