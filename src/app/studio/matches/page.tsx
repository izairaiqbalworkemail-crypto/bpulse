import type { Metadata } from "next";
import { listMatchLog } from "@/lib/match/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Match log",
  robots: { index: false, follow: false },
};

export default async function MatchLogPage() {
  const { events, outcomes } = await listMatchLog(50);
  const booked = outcomes.filter((row) => row.outcome === "booked").length;
  const checks = outcomes.filter((row) => row.outcome === "became_check").length;
  const viewed = Math.max(events.length, 1);

  return (
    <section className="w-full bg-rag">
      <div className="grid-container py-16 md:py-24">
        <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">
          Internal · not indexed
        </p>
        <h1 className="mt-3 font-newsreader text-[32px] leading-[1.1] text-iron">
          Match log
        </h1>
        <dl className="mt-8 grid gap-6 sm:grid-cols-2">
          <div>
            <dt className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">
              Match → call booked
            </dt>
            <dd className="mt-2 font-newsreader text-[28px] text-iron">
              {booked} / {viewed}
            </dd>
          </div>
          <div>
            <dt className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">
              Call booked → Check
            </dt>
            <dd className="mt-2 font-newsreader text-[28px] text-iron">
              {checks} / {Math.max(booked, 1)}
            </dd>
          </div>
        </dl>
        <ol className="mt-12 flex flex-col gap-3">
          {events.map((event) => (
            <li key={event.id} className="card px-6 py-6">
              <p className="font-plex-mono text-[12px] text-ink/70">
                {event.createdAt} · {event.confidence} ·{" "}
                {event.results.map((row) => row.specialistId).join(", ")}
              </p>
              <p className="mt-2 max-w-[60ch] font-newsreader text-[16px] leading-[1.45] text-iron">
                {event.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
