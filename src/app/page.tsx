import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Hero } from "@/components/Hero";
import { FieldLog } from "@/components/FieldLog";
import { ProjectCard } from "@/components/ProjectCard";
import { Notice } from "@/components/primitives/Notice";
import { lots } from "@/content/lots";
import { specialists } from "@/content/specialists";
import { notices } from "@/content/notices";
import { offer } from "@/content/offer";

export const metadata: Metadata = buildMetadata({
  title: "The catalogue",
  description:
    "Senior software studio in Lahore. We take over products stuck at 80% and ship them to production. The condition report on work we actually did.",
  path: "/",
});

const capabilities = [
  {
    name: "Integration",
    tagline: "the model works in a notebook and dies in production",
    description:
      "Third-party APIs, compliance paths, data pipelines — the connections that make a product real. When integrations pull in every direction, we hold the centre.",
    details: [
      "OAuth and API integration across fragmented third-party systems",
      "Compliance-ready data pipelines (HIPAA, SOC 2, KYC/AML)",
      "Legacy-to-modern migration without downtime",
    ],
  },
  {
    name: "Delivery",
    tagline: "if prod is exciting, i haven't done my job",
    description:
      "The last twenty percent: deployment hardening, edge cases, release checks, ownership handover. If prod is exciting, we haven't done our job.",
    details: [
      "Zero-downtime deployment pipelines and rollback strategies",
      "Edge case mapping and failure mode analysis",
      "Ownership handover with runbooks, not guesswork",
    ],
  },
  {
    name: "Intelligence",
    tagline: "a model is a decision you can measure, not magic you trust",
    description:
      "AI and ML that actually ships — RAG layers, eval frameworks, compliance-aware models. Not demos. Production-grade intelligence that holds under load.",
    details: [
      "RAG architectures with evaluation frameworks",
      "Compliance-aware AI for regulated industries",
      "Production monitoring and drift detection",
    ],
  },
];

const stats = [
  { value: String(lots.length), label: "builds pushed past the last 20%" },
  { value: String(specialists.length), label: "senior hands scoping and shipping" },
  { value: offer.check.duration, label: "the Check — verdict on your build" },
  { value: "In-house", label: "ship happens here, no handoff" },
];

const processSteps = [
  {
    step: "01",
    title: "The Check",
    duration: offer.check.duration,
    description:
      "We read your product, map its condition, and hand you a verdict: keep, repair, or rebuild. Credited in full against a build within 30 days.",
  },
  {
    step: "02",
    title: "The Build",
    duration: "Scoped per lot",
    description:
      "Fixed scope agreed in writing before any code. The people who scope it are the same people who ship it. No handoff to strangers.",
  },
  {
    step: "03",
    title: "The Handover",
    duration: "End of engagement",
    description:
      "Runbooks, not guesswork. You get the code, the docs, and the knowledge to run it without us. That is the point.",
  },
];

export default function Home() {
  const allLots = lots.slice(0, 6);

  return (
    <>
      {/* ── Section 1: Operable hero self-check ── */}
      <Hero />

      {/* ── Section 3: Stats bar ── */}
      <section className="w-full bg-rag">
        <div className="py-10 md:py-14">
          <div className="grid-container">
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.value}>
                  <p className="font-newsreader text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-none tracking-tight text-iron tabular-nums">
                    {stat.value}
                  </p>
                  <p className="mt-2 max-w-[22ch] font-plex-sans text-sm leading-relaxed text-ink/70">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="h-px w-full bg-iron/15" />
      </section>

      {/* ── Section 4: The field log ── */}
      <section className="w-full bg-rag">
        <FieldLog density="full" />
      </section>

      {/* ── Section 5: The problem ── */}
      <section className="w-full bg-rag py-24 md:py-40">
        <div className="grid-container relative z-10">
          <div className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-12">
            <div className="md:col-span-8">
              <h2 className="font-newsreader text-[clamp(1.75rem,3vw+0.75rem,2.5rem)] leading-title tracking-tight text-iron">
                Most products die at 80%.
              </h2>
              <p className="mt-8 max-w-[560px] font-newsreader text-reading leading-reading text-ink">
                The first eighty percent is the exciting part — the architecture,
                the greenfield build, the demo that works on a laptop. The last
                twenty percent is integration testing, compliance paths, edge
                cases, deployment hardening, and the ownership handover that lets
                someone else run it without guesswork. That is where products get
                stuck. That is where we work.
              </p>
            </div>
            <div className="md:col-span-4" />
          </div>
        </div>
      </section>

      {/* ── Section 6: The catalogue — project cards ── */}
      <section className="w-full bg-rag" aria-labelledby="catalogue">
        <div className="grid-container">
          <div className="flex items-center justify-between border-t border-iron/15 pt-6">
            <div>
              <h2
                id="catalogue"
                className="font-plex-mono text-data tracking-[0.08em] text-ink/70 uppercase"
              >
                Builds we took across the line — at every stage
              </h2>
              <p className="mt-2 max-w-[60ch] font-newsreader text-reading leading-reading text-ink/70">
                Zero-shot builds, half-finished rewrites, stalled handovers.
                Every lot entered at a different state. None of them stayed there.
              </p>
            </div>
            <Link
              href="/work"
              className="hidden font-plex-sans text-sm text-ink/60 transition-colors duration-200 hover:text-iron md:block"
            >
              See the whole log →
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allLots.map((lot, i) => (
              <ProjectCard key={lot.slug} lot={lot} index={i} />
            ))}
          </div>

          <div className="py-12">
            <Link
              href="/work"
              className="font-plex-sans text-sm font-medium text-ink/70 transition-colors duration-200 hover:text-iron"
            >
              View the full catalogue →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Section 7: The three capabilities ── */}
      <section
        className="w-full bg-rag py-24 md:py-40 section-elevated"
        aria-labelledby="capabilities"
      >
        <div className="grid-container relative z-10">
          <h2
            id="capabilities"
            className="font-plex-mono text-data tracking-[0.08em] text-ink/70 uppercase"
          >
            What we do
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {capabilities.map((cap) => (
              <div
                key={cap.name}
                className="group rounded-surface border border-iron/10 p-8 transition-all duration-300 hover:border-iron/25 hover:bg-iron/[0.02]"
              >
                <p className="font-plex-mono text-[0.66rem] font-medium uppercase tracking-[0.14em] text-ink/70">
                  {cap.name}
                </p>
                <h3 className="mt-3 font-newsreader text-lot-title leading-title text-iron">
                  {cap.name}
                </h3>
                <p className="mt-2 font-newsreader text-sm leading-reading text-ink/60 italic">
                  &ldquo;{cap.tagline}&rdquo;
                </p>
                <p className="mt-4 max-w-[44ch] font-newsreader text-reading leading-reading text-ink">
                  {cap.description}
                </p>
                <ul className="mt-5 flex flex-col gap-2">
                  {cap.details.map((d) => (
                    <li
                      key={d}
                      className="flex items-start gap-2 font-plex-sans text-sm leading-relaxed text-ink/65"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 8: How it works — process ── */}
      <section className="w-full bg-iron py-24 md:py-40" aria-labelledby="process">
        <div className="grid-container">
          <h2
            id="process"
            className="font-plex-mono text-data tracking-[0.08em] text-rag/60 uppercase"
          >
            How it works
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {processSteps.map((step) => (
              <div key={step.step} className="relative">
                <p className="font-plex-mono text-[3rem] font-bold leading-none text-rag/10">
                  {step.step}
                </p>
                <h3 className="mt-2 font-newsreader text-lot-title leading-title text-rag">
                  {step.title}
                </h3>
                <p className="mt-1 font-plex-mono text-[0.66rem] text-rag/50">
                  {step.duration}
                </p>
                <p className="mt-4 max-w-[40ch] font-newsreader text-reading leading-reading text-rag/70">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 border-t border-rag/15 pt-8">
            <Link
              href="/check"
              className="inline-flex items-center gap-3 rounded-full bg-signal px-8 py-4 font-plex-sans text-sm font-medium text-iron transition-all duration-200 hover:brightness-95 hover:gap-4"
            >
              Start with a check
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Section 9: Conditions of business ── */}
      <section
        className="w-full bg-rag py-24 md:py-40"
        aria-labelledby="conditions"
      >
        <div className="grid-container">
          <div className="grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-12">
            <div className="md:col-span-7">
              <h2
                id="conditions"
                className="font-newsreader text-[clamp(1.75rem,3vw+0.75rem,2.5rem)] leading-title tracking-tight text-iron"
              >
                {offer.check.name}
              </h2>
              <p className="mt-2 font-plex-mono text-hero-lot leading-none tracking-tight text-signal">
                ${offer.check.price.toLocaleString()}
              </p>
              <p className="mt-2 font-plex-mono text-data text-ink/60">
                {offer.check.duration} · credited on a Close invoice within 30
                days
              </p>

              <p className="mt-8 max-w-[560px] font-newsreader text-reading leading-reading text-ink">
                {offer.check.description}
              </p>

              <p className="mt-6 max-w-[560px] font-newsreader text-reading leading-reading text-ink/70">
                The Check may conclude that you don&apos;t need us. The fee is
                still credited. You walk away with a condition report on your
                product — what arrived, what&apos;s wrong, what it would take to
                hold. That is worth the price alone.
              </p>

              <div className="mt-10 flex items-center gap-6">
                <Link
                  href="/check"
                  className="inline-flex items-center gap-3 rounded-full bg-signal px-8 py-4 font-plex-sans text-sm font-medium text-iron transition-all duration-200 hover:brightness-95 hover:gap-4"
                >
                  Start with a check
                  <span>→</span>
                </Link>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="flex flex-col gap-6 border-t border-iron/15 pt-6">
                <div>
                  <p className="font-plex-mono text-data text-ink/60 uppercase">
                    {offer.close.name}
                  </p>
                  <p className="mt-1 font-plex-mono text-lot-title text-iron">
                    {offer.close.priceRange}
                  </p>
                  <p className="mt-1 font-newsreader text-reading leading-reading text-ink/70">
                    {offer.close.description}
                  </p>
                </div>
                <div className="border-t border-iron/15 pt-6">
                  <p className="font-plex-mono text-data text-ink/60 uppercase">
                    {offer.standing.name}
                  </p>
                  <p className="mt-1 font-plex-mono text-lot-title text-iron">
                    {offer.standing.priceRange}
                  </p>
                  <p className="mt-1 font-newsreader text-reading leading-reading text-ink/70">
                    {offer.standing.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 10: The crew ── */}
      <section
        className="w-full bg-rag py-24 md:py-40"
        aria-labelledby="crew"
      >
        <div className="grid-container relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2
                id="crew"
                className="font-plex-mono text-data tracking-[0.08em] text-ink/70 uppercase"
              >
                The crew
              </h2>
              <p className="mt-2 max-w-[60ch] font-newsreader text-reading leading-reading text-ink/70">
                Small crew, senior hands. The people who scope it are the same
                people who ship it.
              </p>
            </div>
            <Link
              href="/team"
              className="hidden font-plex-sans text-sm text-ink/60 transition-colors duration-200 hover:text-iron md:block"
            >
              See the whole crew →
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {specialists.slice(0, 10).map((s) => {
              const isAbsent = s.photoStatus === "Photo pending";
              return (
                <Link
                  key={s.id}
                  href={`/team/${s.id}`}
                  className="group flex flex-col items-center text-center"
                >
                  {isAbsent ? (
                    <div className="h-16 w-16 rounded-full bg-iron/5 ring-2 ring-iron/10" />
                  ) : (
                    <div className="relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-iron/10 transition-all duration-300 group-hover:ring-signal/50 group-hover:-translate-y-1 group-hover:shadow-lg">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={s.photo}
                        alt={s.name}
                        width={64}
                        height={64}
                        className="h-full w-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0 group-hover:scale-110"
                      />
                    </div>
                  )}
                  <p className="mt-3 font-plex-sans text-sm font-medium text-iron group-hover:text-ink transition-colors duration-200">
                    {s.name}
                  </p>
                  <p className="font-plex-mono text-[0.62rem] text-ink/70">
                    {s.role.split("·")[0].trim()}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Section 11: Notices ── */}
      <section
        className="w-full bg-rag py-24 md:py-40"
        aria-labelledby="notices"
      >
        <div className="grid-container">
          <div className="flex items-center justify-between border-t border-iron/15 pt-6">
            <h2
              id="notices"
              className="font-plex-mono text-data tracking-[0.08em] text-ink/70 uppercase"
            >
              Notices
            </h2>
            <Link
              href="/notices"
              className="font-plex-mono text-caption text-ink/60 underline-offset-4 hover:underline"
            >
              All notices
            </Link>
          </div>

          {notices.map((notice) => (
            <Notice
              key={notice.id}
              question={notice.question}
              answer={notice.answer}
            />
          ))}
        </div>
      </section>

      {/* ── Section 12: Close and colophon ── */}
      <section className="w-full bg-iron py-24 md:py-40">
        <div className="grid-container relative z-10">
          <div className="flex flex-col items-start gap-8">
            <h2 className="max-w-[20ch] font-newsreader text-[clamp(2rem,4vw+0.5rem,3.5rem)] leading-title tracking-tight text-rag">
              Ready to ship?
            </h2>
            <p className="max-w-[480px] font-newsreader text-reading leading-reading text-rag/70">
              Start with a Check. We will read your product, map its condition,
              and tell you what it would take to hold — in five business days.
            </p>
            <Link
              href="/check"
              className="inline-flex items-center gap-3 rounded-full bg-signal px-8 py-4 font-plex-sans text-sm font-medium text-iron transition-all duration-200 hover:brightness-95 hover:gap-4"
            >
              Book a call
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
