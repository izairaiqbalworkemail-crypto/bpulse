import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { getCandidateStatus } from "@/lib/careers/store";

type PageProps = {
  params: Promise<{ token: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { token } = await params;
  const status = getCandidateStatus(token);
  if (!status) return {};
  return buildMetadata({
    title: "Application status",
    description: "Private gate status for an active application.",
    path: `/careers/status/${token}`,
    robots: "noindex, nofollow",
  });
}

export default async function CareersStatusPage({ params }: PageProps) {
  const { token } = await params;
  if (!/^[A-Za-z0-9]{16}$/.test(token)) notFound();
  const status = getCandidateStatus(token);
  if (!status) notFound();

  return (
    <section className="w-full bg-rag pb-24">
      <div className="grid-container pt-14">
        <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">Candidate status · private</p>
        <h1 className="mt-2 font-newsreader text-[36px] leading-[1.08] text-iron md:text-[46px]">
          {status.name} · {status.roleTitle}
        </h1>
        <p className="mt-4 font-newsreader text-[20px] text-iron">Current gate: {status.gateName}</p>
        <p className="mt-2 font-newsreader text-[17px] leading-[1.5] text-ink">{status.next}</p>

        <section className="mt-8 rounded-[16px] border border-iron/20 bg-rag-card p-5">
          <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">Timeline</p>
          <ul className="mt-3 space-y-3">
            {status.events.map((event) => (
              <li key={`${event.gate}-${event.occurredAt}`} className="border-l-2 border-iron/20 pl-4">
                <p className="font-newsreader text-[17px] text-iron">Gate {event.gate}: {event.outcome}</p>
                <p className="font-plex-mono text-[12px] text-ink/70">{new Date(event.occurredAt).toLocaleString()}</p>
              </li>
            ))}
          </ul>
          <p className="mt-5 font-plex-mono text-[12px] text-ink/70">
            Last updated {new Date(status.updatedAt).toLocaleString()}
          </p>
        </section>
      </div>
    </section>
  );
}
