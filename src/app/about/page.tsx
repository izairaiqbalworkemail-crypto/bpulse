import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/lib/JsonLd";
import { brand } from "@/config/brand";
import { specialists } from "@/content/specialists";
import { lots } from "@/content/lots";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Who bpulse is and why we work on the last twenty percent — the honest part of software that everyone avoids.",
  path: "/about",
});

const principles = [
  {
    title: "We do not invent proof",
    description:
      "Where a number exists, it is client-reported and traceable. Where it does not, we say so. A quiet number beats a false one.",
  },
  {
    title: "We hold out for honesty",
    description:
      "The Check may conclude that you don't need us. That answer is worth the price alone — and we give it.",
  },
  {
    title: "We finish what starts",
    description:
      "The first 80% is where products get exciting. The last 20% is where they die. We live in that last 20%.",
  },
];

const timeline = [
  {
    year: "The Check",
    title: "Start with a verdict",
    description:
      "Five business days. Read your product, map its condition, hand you a keep / repair / rebuild verdict. Credited in full against a build within 30 days.",
  },
  {
    year: "The Close",
    title: "Fixed scope, written down",
    description:
      "$18,000 to $95,000. Scope agreed in writing before any code. The people who scope it are the same people who ship it.",
  },
  {
    year: "The Handover",
    title: "Runbooks, not guesswork",
    description:
      "You get the code, the docs, and the knowledge to run it without us. If you need us again, it's because you want to, not because you have to.",
  },
];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "About", url: `${brand.url}/about` }]} />

      <section className="w-full bg-rag">
        <div className="h-px w-full bg-iron/15" />

        <div className="pt-40 pb-16 md:pt-48 md:pb-20">
          <div className="grid-container">
            <h1 className="font-newsreader text-[clamp(2rem,4vw+0.5rem,3.5rem)] leading-title tracking-tight text-iron">
              We are the last twenty percent.
            </h1>
            <p className="mt-5 max-w-[560px] font-newsreader text-reading leading-reading text-ink">
              Everyone can demo. Ship is harder. We are the studio that takes
              products stuck at 80% and carries them into production — with the
              honesty to say when something is already fine as it is.
            </p>

            <p className="mt-6 max-w-[520px] font-newsreader text-reading leading-reading text-ink/70">
              <strong className="text-iron">{brand.legalName}</strong> is a
              senior software studio in {brand.address.street},{" "}
              {brand.address.countryName}. {specialists.length} named specialists.
              {lots.length} lots shipped. One rule: no invented proof.
            </p>
          </div>
        </div>

        {/* Principles */}
        <div className="grid-container">
          <div className="border-t border-iron/15 pt-6">
            <p className="font-plex-mono text-[0.66rem] font-medium uppercase tracking-[0.14em] text-ink/70">
              How we work
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
            {principles.map((p) => (
              <div key={p.title}>
                <h2 className="font-newsreader text-lot-title leading-title text-iron">
                  {p.title}
                </h2>
                <p className="mt-3 max-w-[44ch] font-newsreader text-reading leading-reading text-ink/70">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* The journey */}
        <div className="grid-container mt-20">
          <div className="border-t border-iron/15 pt-6">
            <p className="font-plex-mono text-[0.66rem] font-medium uppercase tracking-[0.14em] text-ink/70">
              The journey
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-10">
            {timeline.map((t) => (
              <div key={t.year} className="grid grid-cols-1 gap-4 md:grid-cols-12">
                <div className="md:col-span-3">
                  <p className="font-plex-mono text-data tracking-[0.08em] text-ink/60 uppercase">
                    {t.year}
                  </p>
                </div>
                <div className="md:col-span-9">
                  <h3 className="font-newsreader text-lot-title leading-title text-iron">
                    {t.title}
                  </h3>
                  <p className="mt-2 max-w-[56ch] font-newsreader text-reading leading-reading text-ink/70">
                    {t.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Close */}
        <div className="grid-container mt-20 mb-24">
          <div className="rounded-surface border border-iron/10 p-8 md:p-10">
            <h2 className="font-newsreader text-[clamp(1.75rem,3vw,2.5rem)] leading-title tracking-tight text-iron">
              Start with a Check
            </h2>
            <p className="mt-4 max-w-[56ch] font-newsreader text-reading leading-reading text-ink/70">
              Read your product, map its condition, tell you the truth. Five
              business days. Credited in full against a build within 30 days.
            </p>
            <div className="mt-6">
              <Link
                href="/check"
                className="inline-flex items-center gap-3 rounded-full bg-signal px-8 py-4 font-plex-sans text-sm font-medium text-iron transition-all duration-200 hover:brightness-95 hover:gap-4"
              >
                Book a call
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
