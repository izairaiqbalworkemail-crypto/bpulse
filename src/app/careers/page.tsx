import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { brand } from "@/config/brand";

export const metadata: Metadata = buildMetadata({
  title: "Careers",
  description:
    "Two ways to work with bpulse: join the crew, or found your own studio. No job boards. No automated screening.",
  path: "/careers",
});

const openings = [
  {
    capability: "Integration",
    role: "Senior Integration Engineer",
    status: "Open",
    location: "Lahore / Remote",
    note: "Third-party APIs, compliance paths, data pipelines. Must ship, not just architect.",
  },
  {
    capability: "Delivery",
    role: "Senior Delivery Engineer",
    status: "Open",
    location: "Lahore / Remote",
    note: "Last twenty percent hardening, edge cases, release checks. If prod is exciting, we haven't done our job.",
  },
  {
    capability: "Intelligence",
    role: "ML / AI Engineer",
    status: "Open",
    location: "Lahore / Remote",
    note: "RAG layers, eval frameworks, compliance-aware models. Production-grade, not demos.",
  },
];

const values = [
  {
    title: "No subcontracting",
    description:
      "The people who scope it are the same people who ship it. No handoff to strangers mid-build.",
  },
  {
    title: "Honest verdicts",
    description:
      "We may tell you that you don't need us. The fee is still credited. That's the business.",
  },
  {
    title: "Small crew, senior hands",
    description:
      "Twelve specialists. No interns. No automated screening. Every hire is a conversation.",
  },
  {
    title: "Location is flexible, standards are not",
    description:
      "We work from Lahore. We ship worldwide. The code doesn't care about your timezone.",
  },
];

export default function CareersPage() {
  return (
    <section className="w-full bg-rag">
      <PageHero
        kicker="Careers"
        title="Two paths"
        dek="Join the crew, or found your own studio. We help with both — and we are honest about which one fits."
        actionHref="/contact"
        actionLabel="Contact the crew"
      />

      {/* Two paths */}
      <div className="grid-container pt-16 md:pt-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Path 1: Join */}
          <div className="rounded-surface border border-iron/10 p-8 md:p-10">
            <p className="font-plex-mono text-[0.66rem] font-medium uppercase tracking-[0.14em] text-ink/70">
              Path 01
            </p>
            <h2 className="mt-3 font-newsreader text-[clamp(1.5rem,3vw,2rem)] leading-title tracking-tight text-iron">
              Join the crew
            </h2>
            <p className="mt-4 max-w-[44ch] font-newsreader text-reading leading-reading text-ink/70">
              We&apos;re hiring senior engineers who ship. No job boards. No
              automated screening. Every hire is a conversation with the people
              who&apos;d work alongside you.
            </p>
            <div className="mt-6 border-t border-iron/10 pt-6">
              <p className="font-plex-mono text-[0.66rem] font-medium uppercase tracking-[0.14em] text-ink/70">
                What we look for
              </p>
              <ul className="mt-3 flex flex-col gap-2.5">
                {[
                  "Senior hands — you've shipped production systems, not just demos",
                  "Honest about what you don't know — the Check demands it",
                  "Comfortable with small crew, high trust — no process theater",
                  "Location flexible, standards not — Lahore preferred but not required",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 font-plex-sans text-sm leading-relaxed text-ink/75"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-iron/40" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Path 2: Found */}
          <div className="rounded-surface border border-iron/10 p-8 md:p-10">
            <p className="font-plex-mono text-[0.66rem] font-medium uppercase tracking-[0.14em] text-ink/70">
              Path 02
            </p>
            <h2 className="mt-3 font-newsreader text-[clamp(1.5rem,3vw,2rem)] leading-title tracking-tight text-iron">
              Found your own studio
            </h2>
            <p className="mt-4 max-w-[44ch] font-newsreader text-reading leading-reading text-ink/70">
              We help senior engineers start their own product studios. We share
              what we know — pricing, positioning, the hard parts — because a
              stronger ecosystem benefits everyone.
            </p>
            <div className="mt-6 border-t border-iron/10 pt-6">
              <p className="font-plex-mono text-[0.66rem] font-medium uppercase tracking-[0.14em] text-ink/70">
                What we offer
              </p>
              <ul className="mt-3 flex flex-col gap-2.5">
                {[
                  "Pricing and positioning guidance — what to charge, how to scope",
                  "Compliance and legal templates — conditions of business, contracts",
                  "The hard lessons — what we got wrong, what we'd do differently",
                  "No equity, no strings — we help because we want the ecosystem to grow",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 font-plex-sans text-sm leading-relaxed text-ink/75"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-iron/40" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Open roles */}
      <div className="grid-container mt-24">
        <div className="border-t border-iron/15 pt-6">
          <h2 className="font-plex-mono text-data tracking-[0.08em] text-ink/70 uppercase">
            Open roles
          </h2>
          <p className="mt-2 max-w-[60ch] font-newsreader text-reading leading-reading text-ink/70">
            No job boards. No automated screening. If something here fits, reach
            out directly.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4">
          {openings.map((opening) => (
            <div
              key={opening.role}
              className="group grid grid-cols-1 gap-4 rounded-surface border border-iron/10 p-6 transition-all duration-200 hover:border-iron/25 sm:grid-cols-[1fr_auto] sm:items-start"
            >
              <div>
                <div className="flex items-center gap-3">
                  <p className="font-plex-mono text-[0.66rem] font-medium uppercase tracking-[0.14em] text-ink/70">
                    {opening.capability}
                  </p>
                  <span className="flex items-center gap-1.5 rounded-surface border border-sound/20 px-2 py-0.5 font-plex-mono text-[0.55rem] tracking-tight text-sound">
                    <span className="inline-block h-1 w-1 rounded-full bg-sound" />
                    {opening.status}
                  </span>
                </div>
                <h3 className="mt-2 font-newsreader text-lot-title leading-title text-iron">
                  {opening.role}
                </h3>
                <p className="mt-2 max-w-[56ch] font-newsreader text-reading leading-reading text-ink/70">
                  {opening.note}
                </p>
                <p className="mt-2 font-plex-mono text-[0.62rem] text-ink/70">
                  {opening.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Values */}
      <div className="grid-container mt-24">
        <div className="border-t border-iron/15 pt-6">
          <h2 className="font-plex-mono text-data tracking-[0.08em] text-ink/70 uppercase">
            How we work
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {values.map((v) => (
            <div key={v.title}>
              <h3 className="font-newsreader text-lot-title leading-title text-iron">
                {v.title}
              </h3>
              <p className="mt-3 max-w-[44ch] font-newsreader text-reading leading-reading text-ink/70">
                {v.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Close */}
      <div className="grid-container mt-24 mb-24">
        <div className="rounded-surface border border-iron/10 p-8 md:p-10">
          <h2 className="font-newsreader text-[clamp(1.5rem,3vw,2rem)] leading-title tracking-tight text-iron">
            Reach out
          </h2>
          <p className="mt-4 max-w-[48ch] font-newsreader text-reading leading-reading text-ink/70">
            No cover letters. No resumes on file. Just tell us what you&apos;ve
            shipped and what you&apos;d want to work on next.
          </p>
          <div className="mt-6 flex items-center gap-4">
            <Link
              href="/contact"
              className="inline-block rounded-full bg-iron px-8 py-4 font-plex-sans text-sm font-medium text-rag transition-colors duration-200 hover:bg-iron/80"
            >
              Contact the crew
            </Link>
            <span className="font-plex-mono text-[0.66rem] text-ink/70">
              or email{" "}
              <a
                  href={`mailto:${brand.contact.email}`}
                  className="underline-offset-4 hover:underline"
                >
                  {brand.contact.email}
                </a>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
