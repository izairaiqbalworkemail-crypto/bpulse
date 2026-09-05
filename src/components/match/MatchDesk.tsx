"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { runMatchAction } from "@/app/match/actions";
import { emptyMatchState } from "@/lib/match/action-state";
import { getCatalogue } from "@/content/catalogue";
import { getSpecialist } from "@/content/specialists";
import { storeMatchBrief } from "@/lib/match/session";
import { markIntakeJump } from "@/lib/scroll-section";
import { PressButton } from "@/components/PressButton";
import type { MatchConfidence, MatchResult } from "@/lib/match/types";

const EXAMPLE =
  "We built a payroll tool over eight months. It works on staging. We've never deployed to production and nobody left knows how the auth was wired.";

const EXAMPLES = [
  {
    label: "Staging only",
    text: EXAMPLE,
  },
  {
    label: "Auth nobody owns",
    text: "The product is live for a small team. SSO was wired by someone who left. Every new customer waits on a manual invite and we cannot see why tokens expire.",
  },
  {
    label: "Model in production",
    text: "We shipped a RAG assistant into the app. It hallucinates on policy questions. We have no evals and inference is too slow for the support queue.",
  },
] as const;

const recordCount = getCatalogue().length;

function logOutcome(
  eventId: string | null,
  outcome: "viewed" | "booked" | "chose_other" | "became_check" | "abandoned",
) {
  if (!eventId) return;
  void fetch("/api/match/outcome", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ matchEventId: eventId, outcome }),
  });
}

function confidenceLine(value: MatchConfidence): string {
  if (value === "strong") return "Close to work we have already done.";
  if (value === "partial") return "A partial read — check the reasons.";
  return "Nothing in our record closely matches this.";
}

function ResultCard({
  row,
  description,
  eventId,
  featured,
}: Readonly<{
  row: MatchResult;
  description: string;
  eventId: string | null;
  featured?: boolean;
}>) {
  const person = getSpecialist(row.specialistId);
  const first = person.name.split(" ")[0] ?? person.name;
  const absent = person.photoStatus === "Photo pending" || !person.photo;

  function book() {
    storeMatchBrief(description, eventId ?? undefined);
    logOutcome(eventId, featured ? "booked" : "chose_other");
  }

  return (
    <article
      className={`rounded-[20px] bg-rag-card p-5 shadow-[var(--shadow-card)] ${
        featured ? "" : "ring-1 ring-iron/10"
      }`}
    >
      <div className="flex gap-4">
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-[14px] bg-iron">
          {absent ? (
            <span className="grid h-full place-items-center font-newsreader text-[22px] text-rag">
              {first[0]}
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
          <p className="mt-1 font-newsreader text-[15px] text-ink">
            {person.role}
          </p>
          <p className="mt-2 font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/70">
            <Link
              href="/standard"
              className="underline decoration-iron/30 underline-offset-4 hover:decoration-iron focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-iron"
            >
              Client-facing · Gate 4
            </Link>
          </p>
        </div>
      </div>

      <p className="mt-5 font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/70">
        Why
      </p>
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

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Link
          href={`/team/${person.id}#intake`}
          onClick={() => {
            markIntakeJump();
            book();
          }}
          className="inline-flex min-h-11 touch-manipulation items-center rounded-full bg-signal px-5 py-2.5 font-plex-sans text-[14px] font-medium text-iron focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-iron"
        >
          Write {first}
        </Link>
        <Link
          href="/check#intake"
          onClick={() => {
            markIntakeJump();
            storeMatchBrief(description, eventId ?? undefined);
            logOutcome(eventId, "became_check");
          }}
          className="min-h-11 touch-manipulation font-plex-sans text-[14px] text-iron underline decoration-iron/30 underline-offset-4 hover:decoration-iron focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-iron"
        >
          Or start a Check
        </Link>
      </div>
    </article>
  );
}

export function MatchDesk({
  compact = false,
}: Readonly<{ compact?: boolean }>) {
  const labelId = useId();
  const resultRef = useRef<HTMLDivElement>(null);
  const [state, action, pending] = useActionState(
    runMatchAction,
    emptyMatchState,
  );
  const [draft, setDraft] = useState("");
  const [hide, setHide] = useState(false);
  const [session] = useState(() =>
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `session-${Date.now()}`,
  );

  const lead = hide ? undefined : state.results?.[0];
  const rest = hide ? [] : (state.results?.slice(1) ?? []);
  const description = state.description || draft;
  const eventId = hide ? null : state.eventId;

  useEffect(() => {
    if (lead && eventId) logOutcome(eventId, "viewed");
  }, [lead, eventId]);

  useEffect(() => {
    if (lead) {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [lead]);

  function again() {
    logOutcome(eventId, "abandoned");
    setHide(true);
    setDraft(state.description || draft);
  }

  return (
    <div className={compact ? "" : "mx-auto max-w-[40rem]"}>
      {lead ? (
        <div ref={resultRef} className="mt-2">
          <p className="font-newsreader text-[20px] leading-[1.35] text-iron">
            {lead.confidence === "weak"
              ? "Nothing in our record closely matches this. Aneeb will read it himself — here is his direct line."
              : `Based on what you described, we would put you with ${getSpecialist(lead.specialistId).name}.`}
          </p>
          <p className="mt-2 font-plex-mono text-[12px] text-ink/70">
            {confidenceLine(lead.confidence)}
          </p>
          <div className="mt-6">
            <ResultCard
              row={lead}
              description={description}
              eventId={eventId}
              featured
            />
          </div>
          {rest.length > 0 ? (
            <details className="mt-6">
              <summary className="cursor-pointer font-plex-sans text-[14px] text-iron underline decoration-iron/30 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-iron">
                Two others who could take this
              </summary>
              <ul className="mt-4 flex flex-col gap-4">
                {rest.map((row) => (
                  <li key={row.specialistId}>
                    <ResultCard
                      row={row}
                      description={description}
                      eventId={eventId}
                    />
                  </li>
                ))}
              </ul>
            </details>
          ) : null}
          <button
            type="button"
            onClick={again}
            className="mt-8 font-plex-sans text-[14px] text-iron underline decoration-iron/30 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-iron"
          >
            Describe it again
          </button>
        </div>
      ) : (
        <form
          action={action}
          onSubmit={() => setHide(false)}
          className="mt-2"
        >
          <input type="hidden" name="session" value={session} />
          <label htmlFor={labelId} className="font-plex-sans text-[15px] text-iron">
            Describe the stuck part
          </label>
          <textarea
            id={labelId}
            name="description"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder={EXAMPLE}
            rows={compact ? 6 : 8}
            maxLength={10_000}
            autoComplete="off"
            spellCheck
            className="mt-3 w-full resize-y rounded-[16px] bg-rag-card px-4 py-3 font-newsreader text-[16px] leading-[1.45] text-iron outline-none ring-1 ring-iron/15 focus:ring-iron/40 focus-visible:ring-2 focus-visible:ring-iron"
          />
          <p className="mt-2 font-plex-mono text-[11px] text-ink/70">
            Specific is what makes the read good. This never goes in the URL.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {EXAMPLES.map((item) => (
              <PressButton
                key={item.label}
                onPress={() => setDraft(item.text)}
                className="min-h-11 touch-manipulation rounded-full bg-rag px-3 py-1.5 font-plex-sans text-[13px] text-iron ring-1 ring-iron/15 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-iron"
              >
                Try: {item.label}
              </PressButton>
            ))}
          </div>
          {state.error ? (
            <p role="alert" className="mt-3 font-newsreader text-[15px] text-iron">
              {state.error}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={pending}
            className="relative z-10 mt-6 inline-flex min-h-11 touch-manipulation items-center rounded-full bg-signal px-5 py-2.5 font-plex-sans text-[14px] font-medium text-iron disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-iron"
          >
            {pending ? "Reading the record…" : "Read it against the record"}
          </button>
          <p className="mt-3 font-newsreader text-[14px] text-ink/70">
            Matched against {recordCount} real engagements. Not a model. Not a
            score.
          </p>
        </form>
      )}
    </div>
  );
}
