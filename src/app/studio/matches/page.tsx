import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { listMatchLog } from "@/lib/match/store";
import { readSessionFromCookieHeader } from "@/lib/security/studio-auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Match log",
  robots: { index: false, follow: false },
};

export default async function MatchLogPage() {
  const headerStore = await headers();
  const session = readSessionFromCookieHeader(headerStore.get("cookie"));
  if (!session) notFound();

  const { events, outcomes } = await listMatchLog(80);
  const booked = outcomes.filter((row) => row.outcome === "booked").length;
  const checks = outcomes.filter((row) => row.outcome === "became_check").length;
  const viewed = Math.max(events.length, 1);

  return (
    <section className="w-full bg-paper pb-24">
      <div className="grid-container pt-14">
        <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-quill/70">
          Match system
        </p>
        <h1 className="mt-2 font-newsreader text-[38px] leading-[1.08] text-ink">
          Assignment records
        </h1>

        <div className="mt-8 overflow-x-auto border-y border-ink/20">
          <table className="min-w-[40rem] border-collapse text-left">
            <thead>
              <tr className="border-b border-ink/20">
                {[
                  "Metric",
                  "Value",
                  "Purpose",
                ].map((header) => (
                  <th
                    key={header}
                    className="py-2.5 pr-4 font-plex-mono text-[11px] uppercase tracking-[0.08em] text-quill/65"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-ink/10">
                <td className="py-3 pr-4 font-newsreader text-[18px] text-ink">Matches to calls booked</td>
                <td className="py-3 pr-4 font-newsreader text-[22px] text-ink">{booked} / {viewed}</td>
                <td className="py-3 pr-2 font-newsreader text-[16px] text-quill">Pipeline quality before human follow-up.</td>
              </tr>
              <tr className="border-b border-ink/10">
                <td className="py-3 pr-4 font-newsreader text-[18px] text-ink">Calls booked to Checks</td>
                <td className="py-3 pr-4 font-newsreader text-[22px] text-ink">{checks} / {Math.max(booked, 1)}</td>
                <td className="py-3 pr-2 font-newsreader text-[16px] text-quill">Conversion quality after briefing call.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-10 overflow-x-auto border-y border-ink/20">
          <table className="min-w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-ink/20">
                {[
                  "When",
                  "Confidence",
                  "Specialists",
                  "Description",
                ].map((header) => (
                  <th
                    key={header}
                    className="py-2.5 pr-4 font-plex-mono text-[11px] uppercase tracking-[0.08em] text-quill/65"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className="border-b border-ink/10 align-top">
                  <td className="py-3 pr-4 font-plex-mono text-[12px] text-quill/70">{event.createdAt.slice(0, 10)}</td>
                  <td className="py-3 pr-4 font-plex-mono text-[12px] text-quill/70">{event.confidence}</td>
                  <td className="py-3 pr-4 font-plex-mono text-[12px] text-quill/70">
                    {event.results.map((row) => row.specialistId).join(", ")}
                  </td>
                  <td className="py-3 pr-2 font-newsreader text-[16px] leading-[1.45] text-ink">{event.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
