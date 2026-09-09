import Link from "next/link";
import { getDemoOverview } from "@/content/demo";
import { getSpecialist } from "@/content/specialists";
import { heroPortalView } from "@/lib/hero-portal-view";

function stageLabel(stage: { current?: boolean; done: boolean }) {
  if (stage.current) return "now";
  if (stage.done) return "done";
  return "ahead";
}

function stageTone(stage: { current?: boolean; done: boolean }) {
  if (stage.current) return "text-build";
  if (stage.done) return "text-ship";
  return "text-mist/55";
}

export function SamplePortal({
  compact = false,
}: Readonly<{ compact?: boolean }>) {
  const overview = getDemoOverview();
  const view = heroPortalView(overview);
  const crew = overview.crew.map((member) => ({
    ...member,
    person: getSpecialist(member.id),
  }));

  return (
    <div className="term-card w-full text-mist">
      <div className="term-bar">
        <span className="term-dot term-dot--red" aria-hidden="true" />
        <span className="term-dot term-dot--amber" aria-hidden="true" />
        <span className="term-dot term-dot--green" aria-hidden="true" />
        <p className="ml-auto font-plex-mono text-[11px] tracking-[0.12em] text-mist/70 uppercase">
          {view.client}
          <span className="mx-2 text-mist/35">·</span>
          {view.engagement}
        </p>
      </div>

      <div className={compact ? "px-5 py-6" : "grid gap-8 px-5 py-8 md:grid-cols-2"}>
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <p className="font-plex-mono text-[12px] tracking-[0.1em] text-mist/70 uppercase">
              {view.currentStage}
              <span className="mx-2">·</span>
              day {view.daysElapsed} of {view.lockedDays}
            </p>
            <span className="inline-flex items-center gap-2 rounded-full border border-ship/30 bg-ship/10 px-2.5 py-1 font-plex-mono text-[10px] uppercase tracking-[0.12em] text-ship">
              <span className="live-pulse inline-block h-1.5 w-1.5 rounded-full bg-ship" />
              live
            </span>
          </div>
          <p className="mt-3 font-newsreader text-[26px] leading-[1.1] text-mist md:text-[30px]">
            {view.usedPct}% of the lock used
          </p>
          <p className="mt-3 max-w-[36ch] font-plex-sans text-[15px] leading-[1.45] text-mist/75">
            Next: {view.nextMilestone}
          </p>
        </div>

        <ol className={compact ? "mt-6 flex flex-col" : "flex flex-col"}>
          {view.stages.map((stage) => (
            <li
              key={stage.id}
              className="flex items-center justify-between gap-3 border-b border-white/10 py-2.5 last:border-0"
            >
              <span className="flex items-center gap-2 font-newsreader text-[16px] text-mist">
                <span
                  className={`inline-block h-1.5 w-1.5 rounded-full ${
                    stage.current
                      ? "bg-build"
                      : stage.done
                        ? "bg-ship"
                        : "bg-white/15"
                  }`}
                  aria-hidden="true"
                />
                {stage.label}
              </span>
              <span
                className={`font-plex-mono text-[11px] tracking-[0.08em] uppercase ${stageTone(stage)}`}
              >
                {stageLabel(stage)}
              </span>
            </li>
          ))}
        </ol>
      </div>

      {compact ? (
        <div className="border-t border-white/10 px-5 py-4">
          <Link
            href="/demo"
            className="font-plex-sans text-[14px] text-mist underline decoration-mist/25 underline-offset-4 hover:decoration-mist"
          >
            Open the sample
          </Link>
        </div>
      ) : (
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 px-5 py-4">
          <ul className="flex flex-wrap gap-5">
            {crew.map((member) => (
              <li key={member.id}>
                <Link
                  href={`/team/${member.person.id}`}
                  className="flex items-center gap-3"
                >
                  {member.person.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={member.person.photo}
                      alt={member.person.name}
                      width={36}
                      height={36}
                      className="h-9 w-9 rounded-full object-cover object-top"
                    />
                  ) : null}
                  <span>
                    <span className="block font-newsreader text-[15px] text-mist">
                      {member.person.name}
                    </span>
                    <span className="block font-plex-mono text-[11px] tracking-[0.08em] text-mist/60 uppercase">
                      {member.role}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/demo"
            className="font-plex-sans text-[14px] text-mist/80 underline decoration-mist/25 underline-offset-4 hover:text-mist hover:decoration-mist"
          >
            Open the sample
          </Link>
        </div>
      )}
    </div>
  );
}