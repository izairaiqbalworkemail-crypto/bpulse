import Link from "next/link";
import { getDemoOverview } from "@/content/demo";
import { getSpecialist } from "@/content/specialists";
import { heroPortalView } from "@/lib/hero-portal-view";

function stageLabel(stage: { current?: boolean; done: boolean }) {
  if (stage.current) return "now";
  if (stage.done) return "done";
  return "ahead";
}

export function SamplePortal() {
  const overview = getDemoOverview();
  const view = heroPortalView(overview);
  const crew = overview.crew.map((member) => ({
    ...member,
    person: getSpecialist(member.id),
  }));

  return (
    <div className="mx-auto w-full max-w-[1000px] overflow-hidden rounded-[24px] border border-rag/10 bg-iron-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rag/10 px-5 py-3 md:px-7">
        <p className="font-plex-mono text-[11px] uppercase tracking-[0.12em] text-rag/70">
          {view.client}
          <span className="mx-2 text-rag/40">·</span>
          {view.engagement}
        </p>
        <p className="font-plex-mono text-[11px] uppercase tracking-[0.1em] text-rag/70">
          live sample
        </p>
      </div>

      <div className="grid gap-8 px-5 py-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:px-7">
        <div>
          <p className="font-plex-mono text-[12px] uppercase tracking-[0.1em] text-rag/70">
            {view.currentStage}
            <span className="mx-2">·</span>
            day {view.daysElapsed} of {view.lockedDays}
          </p>
          <p className="mt-3 font-newsreader text-[28px] leading-[1.1] text-rag md:text-[32px]">
            {view.usedPct}% of the lock used
          </p>
          <p className="mt-3 max-w-[36ch] font-newsreader text-[16px] leading-[1.4] text-rag/80">
            Next: {view.nextMilestone}
          </p>
          <p className="mt-4 font-plex-mono text-[12px] text-rag/70">
            Scope {view.scopeVersion} · {view.findingsOpen} findings open ·{" "}
            {view.deployLine}
          </p>
        </div>

        <ol className="flex flex-col">
          {view.stages.map((stage) => (
            <li
              key={stage.id}
              className="flex items-center justify-between gap-3 border-b border-rag/10 py-2.5 last:border-0"
            >
              <span className="font-newsreader text-[16px] text-rag">
                {stage.label}
              </span>
              <span className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-rag/70">
                {stageLabel(stage)}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-rag/10 px-5 py-4 md:px-7">
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
                  <span className="block font-newsreader text-[15px] text-rag">
                    {member.person.name}
                  </span>
                  <span className="block font-plex-mono text-[11px] uppercase tracking-[0.08em] text-rag/70">
                    {member.role}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/demo"
          className="font-plex-sans text-[14px] text-rag/80 underline decoration-rag/25 underline-offset-4 hover:text-rag hover:decoration-rag"
        >
          Explore the sample →
        </Link>
      </div>
    </div>
  );
}
