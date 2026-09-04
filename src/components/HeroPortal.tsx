"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { getDemoOverview } from "@/content/demo";
import { getSpecialist } from "@/content/specialists";

const spring = { type: "spring" as const, stiffness: 200, damping: 26 };

export function HeroPortal() {
  const reduce = useReducedMotion();
  const overview = getDemoOverview();
  const fill = `${Math.min(100, Math.max(0, overview.usedPct))}%`;

  return (
    <motion.div
      className="relative w-full"
      initial={reduce ? false : { opacity: 0, y: 40, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={reduce ? { duration: 0 } : { ...spring, delay: 0.32 }}
    >
      <div className="overflow-x-auto overflow-y-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:overflow-visible">
        <div className="min-w-[52rem] overflow-hidden rounded-[12px] bg-rag-card text-iron shadow-[var(--shadow-artifact)] md:min-w-0">
          <div className="flex items-center gap-3 border-b border-iron/10 px-3 py-2.5 md:px-4">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-[#e36a5c]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#f2c230]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#4a8f6f]" />
            </div>
            <p className="min-w-0 flex-1 truncate rounded-full bg-iron/[0.06] px-3 py-1 text-center font-plex-mono text-[12px] text-ink/70">
              app.bpulse.dev/northline
            </p>
            <p className="shrink-0 font-plex-mono text-[12px] text-ink/70">
              ◦ live sample
            </p>
          </div>

          <div className="grid min-h-[44rem] grid-cols-[10.5rem_1fr] md:min-h-[52rem] md:grid-cols-[12rem_1fr]">
            <nav
              aria-label="Sample portal views"
              className="border-r border-iron/10 py-3"
            >
              {overview.views.map((view) => {
                const href =
                  view.slug === "overview" ? "/demo" : `/demo/${view.slug}`;
                const current = view.slug === "overview";
                return (
                  <Link
                    key={view.slug}
                    href={href}
                    className={`block px-4 py-2 font-plex-sans text-[13px] ${
                      current
                        ? "bg-iron/[0.05] font-medium text-iron"
                        : "text-ink/70 hover:text-iron"
                    }`}
                  >
                    {view.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex flex-col px-5 py-5 md:px-7 md:py-6">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="font-plex-sans text-[15px] font-medium tracking-[0.04em] text-iron uppercase">
                  {overview.client}
                </h2>
                <p className="font-plex-mono text-[12px] tabular-nums text-ink/70">
                  day {overview.daysElapsed} of {overview.lockedDays}
                </p>
              </div>
              <p className="mt-1 font-plex-sans text-[13px] text-ink/70">
                {overview.engagement}
              </p>

              <ol className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-iron/10 pt-4">
                {overview.stages.map((stage) => {
                  const current = "current" in stage && Boolean(stage.current);
                  const tick = stage.done ? "✓" : current ? "●" : "○";
                  return (
                    <li
                      key={stage.id}
                      className="flex items-center gap-1.5 font-plex-mono text-[11px] uppercase tracking-[0.06em] text-ink/70"
                    >
                      <span aria-hidden="true">{tick}</span>
                      <span className={current ? "text-iron" : undefined}>
                        {stage.label}
                      </span>
                    </li>
                  );
                })}
              </ol>

              <div className="mt-5 flex items-center gap-3">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-iron/10">
                  <motion.div
                    className="h-full bg-signal"
                    initial={reduce ? { width: fill } : { width: 0 }}
                    animate={{ width: fill }}
                    transition={
                      reduce
                        ? { duration: 0 }
                        : {
                            delay: 0.72,
                            duration: 0.9,
                            ease: [0.16, 1, 0.3, 1],
                          }
                    }
                  />
                </div>
                <p className="shrink-0 font-plex-mono text-[12px] text-ink/70">
                  v{overview.scopeVersion} locked
                  {overview.signedDocs > 0
                    ? ` · ${overview.signedDocs} docs signed`
                    : null}
                </p>
              </div>

              <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-iron/10 pt-5">
                <div>
                  <dt className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/60">
                    Findings
                  </dt>
                  <dd className="mt-1 font-plex-sans text-[14px] text-iron">
                    {overview.findings.open} open · {overview.findings.closed}{" "}
                    closed
                    {overview.findings.deferred > 0
                      ? ` · ${overview.findings.deferred} deferred`
                      : null}
                  </dd>
                </div>
                <div>
                  <dt className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/60">
                    Deploy
                  </dt>
                  <dd className="mt-1 font-plex-sans text-[14px] text-iron">
                    {overview.staging?.env} {overview.staging?.status}
                    {overview.staging?.at && overview.staging.at !== "—"
                      ? ` · ${overview.staging.at}`
                      : null}
                    {overview.production
                      ? ` · prod ${overview.production.status}`
                      : null}
                  </dd>
                </div>
                <div>
                  <dt className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/60">
                    Next
                  </dt>
                  <dd className="mt-1 font-plex-sans text-[14px] text-iron">
                    {overview.nextMilestone}
                  </dd>
                </div>
                <div>
                  <dt className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/60">
                    Crew
                  </dt>
                  <dd className="mt-1.5 flex items-center gap-2">
                    {overview.crew.map((member) => {
                      const person = getSpecialist(member.id);
                      return person.photo ? (
                        <Image
                          key={member.id}
                          src={person.photo}
                          alt={person.name}
                          width={28}
                          height={28}
                          className="h-7 w-7 rounded-full object-cover"
                        />
                      ) : (
                        <span
                          key={member.id}
                          className="font-plex-mono text-[12px] text-ink/70"
                        >
                          {person.name}
                        </span>
                      );
                    })}
                  </dd>
                </div>
              </dl>

              {overview.latestCommit ? (
                <p className="mt-4 font-plex-mono text-[12px] text-ink/60">
                  {overview.latestCommit.hash} · {overview.latestCommit.message}{" "}
                  · {overview.latestCommit.date}
                </p>
              ) : null}

              <div className="mt-6 border-t border-iron/10 pt-4">
                <p className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/60">
                  Last update · {overview.lastUpdate.week} · sample
                </p>
                <p className="mt-2 font-newsreader text-[16px] leading-[1.4] text-iron">
                  {overview.lastUpdate.body}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
