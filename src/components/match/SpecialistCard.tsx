"use client";

import Link from "next/link";
import { getSpecialist } from "@/content/specialists";
import { gateLine } from "@/lib/direct/gate";
import { firstName } from "@/lib/lot-trace";
import { storeMatchBrief } from "@/lib/match/session";
import { markIntakeJump } from "@/lib/scroll-section";
import type { RankedResult, SignalHit } from "@/lib/match/types";

function logOutcome(
  eventId: string | null,
  outcome: "booked" | "chose_other" | "became_check",
) {
  if (!eventId) return;
  void fetch("/api/match/outcome", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ matchEventId: eventId, outcome }),
  });
}

export function SpecialistCard({
  row,
  description,
  eventId,
  hits,
  featured,
}: Readonly<{
  row: RankedResult;
  description: string;
  eventId: string | null;
  hits: SignalHit[];
  featured?: boolean;
}>) {
  const person = getSpecialist(row.specialistId);
  const first = firstName(person.name);
  const absent = person.photoStatus === "Photo pending" || !person.photo;
  const gate = gateLine(person.id);
  const open = hits.filter((hit) => !row.signals.includes(hit.signalId));
  const availabilityLine =
    person.availability === "available"
      ? "Free to take this on"
      : person.availability === "on an engagement"
        ? "Already on an engagement — the fit is as a handoff"
        : "Not taking new work right now";
  const isFounder = row.specialistId === "aneeb";

  function book() {
    storeMatchBrief(description, eventId ?? undefined);
    logOutcome(eventId, featured ? "booked" : "chose_other");
  }

  return (
    <article className={`card p-6 ${featured ? "card-hover" : ""}`}>
      <div className="flex gap-4">
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-[16px] bg-iron">
          {absent ? (
            <span className="grid h-full place-items-center font-newsreader text-[22px] text-rag">
              {person.name[0]}
            </span>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={person.photo}
              alt={person.name}
              width={64}
              height={64}
              className="h-full w-full object-cover object-top"
            />
          )}
        </div>
        <div className="min-w-0">
          <p className="font-newsreader text-[22px] leading-[1.15] text-iron">
            {person.name}
          </p>
          <p className="mt-1 font-newsreader text-[15px] text-ink">{person.role}</p>
<p className="mt-1 kicker">
          Lane · {row.capability} ·{" "}
          {person.domains.length > 0 ? person.domains.join(", ") : "generalist"}
        </p>
        <p className="mt-2 kicker">
          <Link
            href={gate.href}
            className="underline decoration-iron/30 underline-offset-4 hover:decoration-iron focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-iron"
          >
            {gate.label}
          </Link>
        </p>
        </div>
      </div>

      {row.signals.length > 0 ? (
        <p className="mt-5 kicker">
          Addresses {row.signals.length} of the conditions you described
        </p>
      ) : null}

      {open.length > 0 ? (
        <div className="mt-3">
          <p className="kicker">Leaves open</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {open.map((hit) => (
              <li
                key={hit.signalId}
                className="chip chip-line text-ink/70"
              >
                {hit.signalId.replaceAll("-", " ")}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <p className="mt-5 kicker">Why</p>
      <ul className="mt-3 flex flex-col gap-4">
        {row.evidence.map((line) => (
          <li
            key={line.claim}
            className="font-newsreader text-[16px] leading-[1.45] text-ink"
          >
            {line.claim}
            {line.lotSlug ? (
              <>
                {" "}
                <Link
                  href={`/work/${line.lotSlug}`}
                  className="underline decoration-iron/30 underline-offset-4 hover:decoration-iron focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-iron"
                >
                  See the lot
                </Link>
              </>
            ) : null}
          </li>
        ))}
      </ul>

      <p className="mt-5 kicker">{availabilityLine}</p>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Link
          href={`/direct/${person.id}`}
          onClick={book}
          className="btn btn-signal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-iron"
        >
          Book 20 minutes · write {first}
        </Link>
        <Link
          href="/check#intake"
          onClick={() => {
            markIntakeJump();
            storeMatchBrief(description, eventId ?? undefined);
            logOutcome(eventId, "became_check");
          }}
          className="min-h-11 font-plex-sans text-[14px] text-iron underline decoration-iron/30 underline-offset-4 hover:decoration-iron focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-iron"
        >
          {isFounder ? "Or start the Check" : "Or start a Check"}
        </Link>
      </div>
    </article>
  );
}