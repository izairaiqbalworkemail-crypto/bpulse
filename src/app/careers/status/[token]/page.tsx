import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { getCandidateStatus } from "@/lib/careers/store";
import { PageHero } from "@/components/PageHero";

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
      <PageHero
        kicker="Candidate status · private"
        title={`${status.name} · ${status.roleTitle}`}
        dek={`Current gate: ${status.gateName}. ${status.next}`}
        hideAction
      />
      <div className="grid-container pt-10">

        <section className="card mt-8 p-8">
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
