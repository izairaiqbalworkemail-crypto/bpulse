"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Episode, EpisodeHead } from "@/components/episode/Episode";
import { landEase } from "@/components/landing/Reveal";
import { checkReports, type CheckReport } from "@/content/check-reports";

function ReportDocument({ report }: Readonly<{ report: CheckReport }>) {
  return (
    <article className="max-w-[66ch]">
      <header className="border-b border-iron/12 pb-6">
        <p className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 font-plex-mono text-[12px] uppercase tracking-[0.1em] text-ink/70">
          <span>Condition report</span>
          {report.prepared ? (
            <span>prepared {report.prepared}</span>
          ) : (
            <span>no date on file</span>
          )}
        </p>
        <p className="mt-4 font-newsreader text-[28px] leading-[1.15] text-iron md:text-[32px]">
          Verdict: {report.verdict}
        </p>
        <p className="mt-3 font-newsreader text-[17px] text-ink">{report.clientLine}</p>
        {report.preparedNote ? (
          <p className="mt-2 font-newsreader text-[15px] leading-[1.45] text-ink/80">
            {report.preparedNote}
          </p>
        ) : null}
      </header>

      <section className="border-b border-iron/12 py-8">
        <h3 className="font-plex-mono text-[11px] uppercase tracking-[0.1em] text-ink/70">
          The read
        </h3>
        <p className="mt-3 font-newsreader text-[19px] leading-[1.55] text-iron md:text-[20px]">
          {report.read}
        </p>
      </section>

      <section className="border-b border-iron/12 py-8">
        <h3 className="font-plex-mono text-[11px] uppercase tracking-[0.1em] text-ink/70">
          Findings
        </h3>
        {report.findings.length === 0 ? (
          <p className="mt-3 font-newsreader text-[19px] leading-[1.55] text-iron md:text-[20px]">
            None that require a Close. We do not invent a named keep file to
            prove this.
          </p>
        ) : (
          <ol className="mt-4">
            {report.findings.map((row) => (
              <li
                key={row.id}
                className="border-t border-iron/8 py-4 first:border-t-0 first:pt-0"
              >
                <p className="font-plex-mono text-[12px] text-ink/70">{row.n}</p>
                <p className="mt-1 font-newsreader text-[19px] leading-[1.45] text-iron md:text-[20px]">
                  {row.line}
                </p>
              </li>
            ))}
          </ol>
        )}
      </section>

      <section className="border-b border-iron/12 py-8">
        <h3 className="font-plex-mono text-[11px] uppercase tracking-[0.1em] text-ink/70">
          What it takes
        </h3>
        <p className="mt-3 font-newsreader text-[19px] leading-[1.55] text-iron md:text-[20px]">
          {report.takes}
        </p>
      </section>

      <section className="pt-8">
        <h3 className="font-plex-mono text-[11px] uppercase tracking-[0.1em] text-ink/70">
          Limits
        </h3>
        <ul className="mt-3">
          {report.limits.map((line) => (
            <li
              key={line}
              className="border-t border-iron/8 py-3 font-newsreader text-[17px] leading-[1.5] text-ink first:border-t-0 first:pt-0"
            >
              {line}
            </li>
          ))}
        </ul>
        <p className="mt-6 font-newsreader text-[16px] leading-[1.5] text-ink">
          {report.sourceNote}
        </p>
      </section>
    </article>
  );
}

export function CheckReports() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<(typeof checkReports)[number]["id"]>(
    "repair",
  );
  const report = checkReports.find((item) => item.id === active) ?? checkReports[0];

  return (
    <Episode labelledBy="deliverable" tone="paper">
      <EpisodeHead
        n="02"
        kicker="THE DELIVERABLE"
        id="deliverable"
        heading="A real report. In full."
      >
        Not a preview. One where we repaired it, and one where we said you
        don&apos;t need us.
      </EpisodeHead>

      <div className="mt-14">
        <div
          role="tablist"
          aria-label="Sample reports"
          className="flex flex-wrap gap-x-8 gap-y-3 border-b border-iron/10"
        >
          {checkReports.map((item, index) => {
            const on = item.id === active;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={on}
                aria-controls={`report-${item.id}`}
                id={`tab-${item.id}`}
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(item.id)}
                onKeyDown={(event) => {
                  if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
                    return;
                  }
                  event.preventDefault();
                  const next =
                    event.key === "ArrowRight"
                      ? (index + 1) % checkReports.length
                      : (index - 1 + checkReports.length) % checkReports.length;
                  const id = checkReports[next]?.id;
                  if (!id) return;
                  setActive(id);
                  document.getElementById(`tab-${id}`)?.focus();
                }}
                className={`-mb-px border-b pb-3 font-plex-sans text-[15px] transition-colors duration-200 ${
                  on
                    ? "border-iron text-iron"
                    : "border-transparent text-ink/70 hover:text-iron"
                }`}
              >
                {item.tab}
              </button>
            );
          })}
        </div>

        <div className="sr-only">
          {checkReports
            .filter((item) => item.id !== active)
            .map((item) => (
              <ReportDocument key={item.id} report={item} />
            ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={report.id}
            role="tabpanel"
            id={`report-${report.id}`}
            aria-labelledby={`tab-${report.id}`}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={
              reduce ? { duration: 0 } : { duration: 0.5, ease: landEase }
            }
            className="check-document mt-10 px-6 py-10 md:px-12 md:py-14"
          >
            <ReportDocument report={report} />
          </motion.div>
        </AnimatePresence>
      </div>
    </Episode>
  );
}
