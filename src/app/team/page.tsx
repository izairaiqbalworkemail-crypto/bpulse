import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { specialists } from "@/content/specialists";

export const metadata: Metadata = buildMetadata({
  title: "The crew",
  description:
    "The named specialists who do the work. No subcontracting to strangers mid-build.",
  path: "/team",
});

export default function TeamPage() {
  return (
    <section className="w-full bg-rag">
      <PageHero
        kicker="The crew"
        title="The people who ship it"
        dek="Named specialists. No subcontracting to strangers mid-build. A missing portrait means we do not have a usable photograph yet — not that the person is not real."
      />

      {/* ── Leadership ── */}
      <div className="grid-container pt-16 md:pt-20">
        <div className="border-t border-iron/15 pt-6">
          <p className="font-plex-mono text-[0.66rem] font-medium uppercase tracking-[0.14em] text-ink/70">
            Leadership
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {specialists
            .filter((s) => s.role.includes("Founder") || s.role.includes("Principal"))
            .map((s) => {
              const isAbsent = s.photoStatus === "Photo pending";
              return (
                <Link
                  key={s.id}
                  href={`/team/${s.id}`}
                  className="group relative overflow-hidden rounded-surface border border-iron/10 p-8 transition-all duration-300 hover:border-iron/25 hover:shadow-sm"
                >
                  <div className="flex items-start gap-6">
                    {isAbsent ? (
                      <div className="relative h-20 w-20 shrink-0 rounded-full bg-iron/5 ring-2 ring-iron/10" />
                    ) : (
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full ring-2 ring-iron/10 transition-all duration-300 group-hover:ring-signal/50">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={s.photo}
                          alt={s.name}
                          width={80}
                          height={80}
                          className="h-full w-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="font-plex-mono text-[0.66rem] font-medium uppercase tracking-[0.14em] text-ink/70">
                        {s.role}
                      </p>
                      <h2 className="mt-1 font-newsreader text-[clamp(1.25rem,2vw,1.5rem)] leading-title text-iron">
                        {s.name}
                      </h2>
                      <p className="mt-2 font-newsreader text-sm leading-relaxed text-ink/70 italic">
                        &ldquo;{s.funTitle}&rdquo;
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 max-w-[48ch] font-newsreader text-reading leading-reading text-ink/70">
                    {s.bio}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {s.stack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-surface border border-iron/10 px-2 py-0.5 font-plex-mono text-[0.6rem] tracking-tight text-iron/70"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="absolute bottom-4 right-6 font-plex-sans text-sm text-ink/70 transition-all duration-200 group-hover:text-iron group-hover:translate-x-1">
                    →
                  </div>
                </Link>
              );
            })}
        </div>
      </div>

      {/* ── Engineering ── */}
      <div className="grid-container mt-16">
        <div className="border-t border-iron/15 pt-6">
          <p className="font-plex-mono text-[0.66rem] font-medium uppercase tracking-[0.14em] text-ink/70">
            Engineering
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {specialists
            .filter(
              (s) =>
                !s.role.includes("Founder") &&
                !s.role.includes("Principal") &&
                !s.role.includes("Operations")
            )
            .map((s) => {
              const isAbsent = s.photoStatus === "Photo pending";
              return (
                <Link
                  key={s.id}
                  href={`/team/${s.id}`}
                  className="group flex flex-col rounded-surface border border-iron/10 p-6 transition-all duration-300 hover:border-iron/25 hover:shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    {isAbsent ? (
                      <div className="h-12 w-12 shrink-0 rounded-full bg-iron/5 ring-2 ring-iron/10" />
                    ) : (
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-iron/10 transition-all duration-300 group-hover:ring-signal/50">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={s.photo}
                          alt={s.name}
                          width={48}
                          height={48}
                          className="h-full w-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="font-newsreader text-lot-title leading-title text-iron">
                        {s.name}
                      </h3>
                      <p className="font-plex-mono text-[0.62rem] text-ink/70">
                        {s.role}
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 font-newsreader text-sm leading-relaxed text-ink/70 italic line-clamp-2">
                    &ldquo;{s.funTitle}&rdquo;
                  </p>

                  <p className="mt-2 font-newsreader text-sm leading-relaxed text-ink/60 line-clamp-2">
                    {s.bio}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {s.focus.slice(0, 3).map((f) => (
                      <span
                        key={f}
                        className="rounded-surface border border-iron/10 px-1.5 py-0.5 font-plex-mono text-[0.55rem] tracking-tight text-ink/70"
                      >
                        {f}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto pt-4 flex items-center gap-1.5 font-plex-sans text-sm text-ink/70 transition-all duration-200 group-hover:text-iron">
                    <span>View profile</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>

      {/* ── Operations ── */}
      <div className="grid-container mt-16">
        <div className="border-t border-iron/15 pt-6">
          <p className="font-plex-mono text-[0.66rem] font-medium uppercase tracking-[0.14em] text-ink/70">
            Operations
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {specialists
            .filter((s) => s.role.includes("Operations"))
            .map((s) => {
              const isAbsent = s.photoStatus === "Photo pending";
              return (
                <Link
                  key={s.id}
                  href={`/team/${s.id}`}
                  className="group flex items-center gap-6 rounded-surface border border-iron/10 p-6 transition-all duration-300 hover:border-iron/25 hover:shadow-sm"
                >
                  {isAbsent ? (
                    <div className="h-14 w-14 shrink-0 rounded-full bg-iron/5 ring-2 ring-iron/10" />
                  ) : (
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-iron/10 transition-all duration-300 group-hover:ring-signal/50">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={s.photo}
                        alt={s.name}
                        width={56}
                        height={56}
                        className="h-full w-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-newsreader text-lot-title leading-title text-iron">
                      {s.name}
                    </h3>
                    <p className="font-plex-mono text-[0.62rem] text-ink/70">
                      {s.role}
                    </p>
                    <p className="mt-1 font-newsreader text-sm leading-relaxed text-ink/70 italic">
                      &ldquo;{s.funTitle}&rdquo;
                    </p>
                  </div>
                  <span className="font-plex-sans text-sm text-ink/30 transition-all duration-200 group-hover:text-iron group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              );
            })}
        </div>
      </div>

      {/* ── Close ── */}
      <div className="grid-container mt-20 mb-24">
        <div className="border-t border-iron/15 pt-8">
          <p className="font-newsreader text-reading leading-reading text-ink/70">
            The Check may conclude that you don&apos;t need us. The fee is
            still credited. You walk away with a condition report on your product
            — what arrived, what&apos;s wrong, what it would take to hold.{" "}
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
