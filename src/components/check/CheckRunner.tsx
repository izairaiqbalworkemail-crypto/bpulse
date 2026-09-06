import Link from "next/link";
import { Episode, EpisodeHead } from "@/components/episode/Episode";
import { Item, Reveal, Stagger } from "@/components/landing/Reveal";
import { checkNoHandoff, checkRunner } from "@/content/check";
import { getSignal } from "@/content/signals";
import { getSpecialist } from "@/content/specialists";
import {
  admission,
  assignmentHistory,
  signalsClosed,
} from "@/lib/assignment";

function Initials({ name }: Readonly<{ name: string }>) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
  return (
    <span className="grid h-full w-full place-items-center bg-iron-card font-newsreader text-[48px] text-rag">
      {initials}
    </span>
  );
}

export function CheckRunner() {
  const person = getSpecialist(checkRunner.id);
  const line = admission(person);
  const led = assignmentHistory(person).filter((row) => row.lead);
  const closed = signalsClosed(person);
  const absent = person.photoStatus === "Photo pending" || !person.photo;

  return (
    <Episode labelledBy="runner" tone="cocoa">
      <EpisodeHead
        n="04"
        kicker="WHO RUNS IT"
        id="runner"
        tone="cocoa"
        heading={person.name}
      >
        {person.role}. The name on the Check is the name on the Close.
      </EpisodeHead>

      <div className="mt-14 grid items-start gap-12 md:grid-cols-[16rem_minmax(0,1fr)]">
        <Reveal>
          <div className="aspect-square overflow-hidden bg-iron-card">
            {absent ? (
              <Initials name={person.name} />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={person.photo}
                alt={person.name}
                width={320}
                height={320}
                className="h-full w-full object-cover object-top"
              />
            )}
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="font-plex-mono text-[12px] uppercase tracking-[0.1em] text-rag/70">
              Admission
            </p>
            <p className="mt-3 font-newsreader text-[24px] leading-[1.2] text-rag">
              {line.standing}
            </p>
            <p className="mt-2 max-w-[46ch] font-newsreader text-[17px] leading-[1.45] text-rag/80">
              {line.review} {line.dateNote}
            </p>
          </Reveal>

          <Reveal delay={0.08} className="mt-10">
            <p className="font-plex-mono text-[12px] uppercase tracking-[0.1em] text-rag/70">
              Deployments led
            </p>
          </Reveal>
          <Stagger className="mt-3" gap={0.05}>
            {led.map((row) => (
              <Item
                key={row.lot.slug}
                className="border-t border-rag/12 py-3 font-newsreader text-[17px] text-rag first:border-t-0 first:pt-0"
              >
                <Link
                  href={`/work/${row.lot.slug}`}
                  className="underline decoration-rag/25 underline-offset-4 hover:decoration-rag"
                >
                  {row.lot.client}
                </Link>
                {row.status ? (
                  <span className="text-rag/70"> · {row.status}</span>
                ) : null}
              </Item>
            ))}
          </Stagger>

          <Reveal delay={0.1} className="mt-10">
            <p className="font-plex-mono text-[12px] uppercase tracking-[0.1em] text-rag/70">
              Signals closed
            </p>
          </Reveal>
          <Stagger className="mt-3" gap={0.04}>
            {closed.map((id) => (
              <Item
                key={id}
                className="border-t border-rag/12 py-3 font-newsreader text-[17px] leading-[1.4] text-rag first:border-t-0 first:pt-0"
              >
                {getSignal(id).says}
              </Item>
            ))}
          </Stagger>

          <Reveal delay={0.12} className="mt-10">
            <p className="font-plex-mono text-[12px] uppercase tracking-[0.1em] text-rag/70">
              Philosophy
            </p>
            <p className="mt-3 max-w-[42ch] font-newsreader text-[22px] leading-[1.3] text-rag">
              {person.philosophy}
            </p>
            <p className="mt-8 max-w-[46ch] border-t border-rag/12 pt-8 font-newsreader text-[18px] leading-[1.45] text-rag">
              {checkNoHandoff}
            </p>
            <p className="mt-6">
              <Link
                href={`/team/${person.id}`}
                className="font-plex-sans text-[15px] text-rag underline decoration-rag/25 underline-offset-4 hover:decoration-rag"
              >
                The full record →
              </Link>
            </p>
          </Reveal>
        </div>
      </div>
    </Episode>
  );
}
