import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
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

const beliefs = [
  {
    title: "Done means deployed",
    description:
      "Not a staging URL that looks finished. Real users, a real URL, and a product you can show someone without a screenshot.",
  },
  {
    title: "The people who scope it ship it",
    description:
      "The seniors who meet you are the ones on the keyboard all the way through. No juniors learning at your expense.",
  },
  {
    title: "No hostage codebases",
    description:
      "You walk away with a codebase you can actually run and support yourself. You're never locked into us.",
  },
  {
    title: "Stays until it's live",
    description:
      "We're paid to reach production, not to send an invoice and disappear.",
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

      <PageHero
        kicker="About"
        title="We are the last twenty percent."
        dek={
          <>
            Everyone can demo. Ship is harder. {brand.legalName} is a senior
            studio in {brand.address.street}. {specialists.length} named
            specialists. {lots.length} lots. One rule: no invented proof.
          </>
        }
      />

      <section className="w-full bg-rag">

        {/* Principles */}
        <div className="grid-container pt-16 md:pt-20">
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

        {/* The four rules */}
        <div className="grid-container mt-20">
          <div className="border-t border-iron/15 pt-6">
            <p className="font-plex-mono text-[0.66rem] font-medium uppercase tracking-[0.14em] text-ink/70">
              Four rules we&apos;d rather lose a deal for than break
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
            {beliefs.map((b, i) => (
              <div key={b.title} className="flex items-start gap-4">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-signal/30 bg-signal/10 font-plex-mono text-sm font-medium text-signal">
                  {i + 1}
                </span>
                <div>
                  <h2 className="font-newsreader text-lot-title leading-title text-iron">
                    {b.title}
                  </h2>
                  <p className="mt-2 max-w-[48ch] font-newsreader text-reading leading-reading text-ink/70">
                    {b.description}
                  </p>
                </div>
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
