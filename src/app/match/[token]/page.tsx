import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MatchResult } from "@/components/match/MatchResult";
import { runMatch } from "@/lib/match/engine";
import { getMatch } from "@/lib/match/store";
import type { MatchStage, MatchUrgency } from "@/lib/match/types";

type PageProps = {
  params: Promise<{ token: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { token } = await params;
  const match = await getMatch(token);
  return {
    title: match ? "A saved match read" : "The Match",
    description:
      "A read of what you described, matched against real engagements from their own condition text. Not a model. Not a score.",
    robots: { index: false, follow: false, nocache: true },
  };
}

export default async function MatchTokenPage({ params }: PageProps) {
  const { token } = await params;
  const match = await getMatch(token);
  if (!match) notFound();

  const outcome =
    match.outcome ??
    runMatch({
      description: match.description,
      stage: match.stage as MatchStage | undefined,
      stack: match.stack,
      urgency: match.urgency as MatchUrgency | undefined,
    });
  const description = match.description;

  return (
    <article className="w-full bg-rag">
      <div className="grid-container pb-24 pt-12 md:pt-16">
        <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">
          The Match · a saved read
        </p>
        <p className="mt-2 font-newsreader text-[15px] leading-[1.45] text-ink/70">
          Matched while you were on the site. This link is not indexed and is
          only reachable from the address you kept.
        </p>
        <div className="mx-auto mt-10 max-w-[40rem]">
          <MatchResult
            outcome={outcome}
            eventId={match.id}
            token={match.id}
            description={description}
            removed={[]}
            onToggleSignal={() => {}}
            readOnly
          />
        </div>
      </div>
    </article>
  );
}