"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { getSpecialist } from "@/content/specialists";
import { indexProjects } from "@/content/catalogue";
import { getLot } from "@/content/lots";
import { offer } from "@/content/offer";
import { firstName } from "@/lib/lot-trace";
import { dominantComparison, sameWayCount } from "@/lib/match/engine";
import { SignalReadout } from "@/components/match/SignalReadout";
import { RecordMap } from "@/components/match/RecordMap";
import { SpecialistCard } from "@/components/match/SpecialistCard";
import { Reveal } from "@/components/Reveal";
import type { SignalId } from "@/content/signals";
import type {
  LotComparison,
  MatchConfidence,
  MatchOutcome,
} from "@/lib/match/types";

const STEP_MS = 350;
const STEPS = 4;

const SECTION_COLORS = {
  ink: "bg-ink",
  signal: "bg-signal",
  partial: "bg-partial",
  blocked: "bg-blocked",
  iron: "bg-iron",
} as const;

function SectionHead({
  label,
  tone,
  note,
}: Readonly<{
  label: string;
  tone: keyof typeof SECTION_COLORS;
  note?: string;
}>) {
  return (
    <div>
      <p className="kicker flex items-center gap-2">
        <span
          aria-hidden="true"
          className={`h-2 w-2 rounded-full ${SECTION_COLORS[tone]} pulse-dot`}
        />
        {label}
      </p>
      {note ? (
        <p className="mt-2 max-w-[48ch] font-newsreader text-[16px] leading-[1.45] text-ink">
          {note}
        </p>
      ) : null}
    </div>
  );
}

function confidenceLine(value: MatchConfidence): string {
  if (value === "strong") return "Close to work we have already done.";
  if (value === "partial") return "A partial read — check the reasons.";
  return "Nothing in our record closely matches this.";
}

function logOutcome(
  eventId: string | null,
  outcome: "viewed" | "abandoned",
) {
  if (!eventId) return;
  void fetch("/api/match/outcome", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ matchEventId: eventId, outcome }),
  });
}

function comparablePlate(comparison: LotComparison | null, readOnly: boolean) {
  if (!comparison) {
    return (
      <p className="font-newsreader text-[17px] leading-[1.45] text-ink">
        Nothing in the record came close enough to show a comparable engagement.
      </p>
    );
  }
  const href =
    comparison.kind === "lot"
      ? `/work/${comparison.id}`
      : indexProjects.find((p) => p.id === comparison.id)?.url;
  const lot =
    comparison.kind === "lot"
      ? (() => {
          try {
            return getLot(comparison.id);
          } catch {
            return null;
          }
        })()
      : null;

  const plate = (
    <>
      <p className="kicker">
        {lot
          ? `${lot.lotNumber} · ${comparison.client}`
          : `${comparison.client} · index`}
      </p>
      <p className="mt-2 font-newsreader text-[22px] leading-[1.2] text-iron">
        {comparison.title}
      </p>
      {lot ? (
        <p className="mt-2 font-newsreader text-[15px] leading-[1.45] text-ink">
          {lot.condition.split(".")[0]!}
        </p>
      ) : (
        <p className="mt-2 font-newsreader text-[15px] leading-[1.45] text-ink">
          {comparison.title.split(".")[0]!}
        </p>
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        {comparison.overlap.map((id) => (
          <span key={id} className="chip chip-soft">
            {id.replaceAll("-", " ")}
          </span>
        ))}
      </div>
    </>
  );

  if (readOnly) {
    return <div className="panel p-6">{plate}</div>;
  }
  return (
    <div className="panel p-6">
      {plate}
      {href ? (
        <p className="mt-5">
          <Link
            href={href}
            className="font-plex-sans text-[14px] text-iron underline decoration-iron/30 underline-offset-4 hover:decoration-iron"
          >
            {comparison.kind === "lot" ? "See the lot" : "See the record"}
          </Link>
        </p>
      ) : null}
    </div>
  );
}

function EmailThisRead({ token, eventId }: { token: string | null; eventId: string | null }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  async function send() {
    if (!token || !email) return;
    const requestId =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `match-email-${Date.now()}`;
    setStatus("sending");
    try {
      const response = await fetch("/api/match/email", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, email, requestId }),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? "It did not send.");
      }
      setStatus("sent");
      setMessage("On its way — and a copy is on Aneeb's desk.");
    } catch (error_) {
      logOutcome(eventId, "abandoned");
      setStatus("error");
      setMessage(error_ instanceof Error ? error_.message : "It did not send.");
    }
  }

  if (status === "sent") {
    return <p className="font-newsreader text-[15px] text-iron">{message}</p>;
  }

  return (
    <form
      className="flex flex-wrap items-center gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        if (status !== "sending") void send();
      }}
    >
      <label htmlFor="match-email" className="sr-only">
        Your email
      </label>
      <div className="w-64 sm:w-72">
        <input
          id="match-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@company.com"
          className="input"
        />
      </div>
      <button
        type="submit"
        disabled={!token || status === "sending"}
        className="btn btn-iron"
      >
        {status === "sending" ? "Sending…" : "Email me this read"}
      </button>
      {status === "error" ? (
        <p role="alert" className="font-newsreader text-[14px] text-iron">
          {message}
        </p>
      ) : null}
    </form>
  );
}

type Props = {
  outcome: MatchOutcome;
  eventId: string | null;
  token: string | null;
  description: string;
  removed: SignalId[];
  onToggleSignal: (id: SignalId, remove: boolean) => void;
  readOnly?: boolean;
};

export function MatchResult({
  outcome,
  eventId,
  token,
  description,
  removed,
  onToggleSignal,
  readOnly = false,
}: Readonly<Props>) {
  const [shown, setShown] = useState(readOnly ? STEPS : 0);
  const logged = useRef(false);

  useEffect(() => {
    if (readOnly) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 1; i <= STEPS; i += 1) {
      timers.push(setTimeout(() => setShown(i), i * STEP_MS));
    }
    return () => timers.forEach((timer) => clearTimeout(timer));
  }, [readOnly]);

  useEffect(() => {
    if (shown < STEPS || logged.current) return;
    logged.current = true;
    logOutcome(eventId, "viewed");
  }, [shown, eventId]);

  const lead = outcome.results[0];
  const rest = outcome.results.slice(1);
  const leadPerson = lead ? getSpecialist(lead.specialistId) : null;
  const leadName = leadPerson ? firstName(leadPerson.name) : "Aneeb";
  const leadSignals = new Set(lead?.signals ?? []);
  const dominant = dominantComparison(outcome.comparisons);
  const sameWay = sameWayCount(outcome.comparisons);
  const disc = outcome.confidence === "exploratory" ? undefined : outcome.shape;

  const steps = [
    {
      label: "Read your words",
      count: `${outcome.extraction.count} of 21 signals`,
      note: "Repeatable conditions we have seen in real engagements.",
      href: "#match-signals",
      tone: "ink" as const,
    },
    {
      label: "Checked the record",
      count: `${sameWay} of 24 engagements arrived the same way`,
      note: "Lots and indexed work, tagged from their own condition text.",
      href: "#match-record",
      tone: "partial" as const,
    },
    {
      label: "Ranked who could take it",
      count:
        outcome.confidence === "exploratory"
          ? "No one on file is close"
          : `${outcome.results.length} on the bench fit`,
      note: "Signal match first, then capability, domain, stack, and availability.",
      href: "#match-bench",
      tone: "signal" as const,
    },
    {
      label: "Shaped it",
      count: disc?.estimate ?? "No shape yet — nobody close",
      note: "A range, not a quote. No figure on record for a comparable engagement.",
      href: "#match-shape",
      tone: "iron" as const,
    },
  ];

  return (
    <div className="flex flex-col gap-14">
      <Reveal>
        <p className="kicker flex items-center gap-2">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-signal pulse-dot" />
          The read
        </p>
        <h2 className="mt-3 max-w-[34ch] font-newsreader type-display-m text-[32px] leading-[1.1] text-iron md:text-[40px]">
          {outcome.confidence === "exploratory"
            ? "Nothing on record comes close — Aneeb reads it himself."
            : `${leadName} could take this. The reason is on the record.`}
        </h2>
        <p className="mt-3 font-plex-mono text-[12px] text-ink/70">
          {confidenceLine(outcome.confidence)} No score. Not a model.
        </p>
      </Reveal>

      <Reveal as="section" label="The words we read" delay={60}>
        <SectionHead label="What you wrote" tone="ink" />
        <blockquote className="panel-sub mt-3 px-4 py-3 font-newsreader text-[15px] italic leading-[1.5] text-ink">
          “{description}”
        </blockquote>
      </Reveal>

      <Reveal as="section" label="Analysis" delay={60}>
        <SectionHead label="What we checked, in order" tone="signal" />
        <ol className="stagger mt-5 flex flex-col gap-3">
          {steps.map((step, index) => (
            <li
              key={step.label}
              className="panel-sub flex items-start gap-4 px-4 py-3"
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              <span
                aria-hidden="true"
                className={`mt-1 h-2 w-2 shrink-0 rounded-full ${SECTION_COLORS[step.tone]}`}
              />
              <span className="font-plex-mono text-[12px] tabular-nums text-ink/50">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <p className="font-plex-sans text-[14px] text-iron">{step.label}</p>
                <div className="mt-1">
                  {shown > index || readOnly ? (
                    step.href ? (
                      <a
                        href={step.href}
                        className="font-newsreader text-[16px] leading-[1.4] text-iron underline decoration-iron/30 underline-offset-4 hover:decoration-iron"
                      >
                        {step.count}
                      </a>
                    ) : (
                      <p className="font-newsreader text-[16px] leading-[1.4] text-iron">
                        {step.count}
                      </p>
                    )
                  ) : (
                    <p className="font-newsreader text-[15px] italic text-ink/50">
                      Checking the record…
                    </p>
                  )}
                </div>
                {shown > index || readOnly ? (
                  <p className="mt-0.5 font-newsreader text-[13px] text-ink/60">
                    {step.note}
                  </p>
                ) : null}
              </div>
              {shown > index || readOnly ? (
                <span className="ml-auto shrink-0 font-plex-mono text-[10px] uppercase tracking-[0.06em] text-ink/40">
                  live
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </Reveal>

      <Reveal
        as="section"
        id="match-signals"
        label="What we heard"
        className="scroll-mt-24"
        delay={60}
      >
        <SectionHead
          label="What we heard — your words, our names for it"
          tone="blocked"
          note="Heard from the words you wrote, not typed about yourself. Each one sits in an engagement we have already taken."
        />
        {outcome.extraction.count > 0 ? (
          <div className="mt-5">
            <SignalReadout
              hits={outcome.extraction.hits}
              removed={removed}
              confidence={outcome.confidence}
              leadSignals={leadSignals}
              leadName={leadName}
              comparisons={outcome.comparisons}
              onToggleSignal={readOnly ? undefined : onToggleSignal}
            />
            {!readOnly ? (
              <p className="mt-4 font-plex-mono text-[12px] text-ink/65">
                Set one aside and the rest of this page re-runs against what is
                left.
              </p>
            ) : null}
          </div>
        ) : (
          <p className="mt-5 font-newsreader text-[16px] text-ink/70">
            Fewer than two recognised conditions in the words — that is why the
            read stays thin and a person takes it.
          </p>
        )}
      </Reveal>

      <Reveal
        as="section"
        id="match-compare"
        label="Comparable engagement"
        className="scroll-mt-24"
        delay={60}
      >
        <SectionHead
          label="Comparable engagement"
          tone="partial"
          note="The closest thing in the record to the condition you described."
        />
        <div className="mt-5 anim-fade-up">{comparablePlate(dominant, readOnly)}</div>
      </Reveal>

      <RecordMap
        comparisons={outcome.comparisons}
        sameWay={sameWay}
        closestId={dominant?.id ?? null}
      />

      {lead ? (
        <Reveal
          as="section"
          id="match-bench"
          label="Who could take it"
          className="scroll-mt-24"
          delay={60}
        >
          <SectionHead
            label="Who could take it"
            tone="signal"
            note={
              outcome.confidence === "exploratory"
                ? `${leadPerson?.name ?? "Aneeb"} is the fallback the record leaves us: no fabrication, a named person.`
                : `Matched on what they have shipped before, not a score.`
            }
          />
          <div className="mt-5">
            <SpecialistCard
              row={lead}
              description={description}
              eventId={eventId}
              hits={outcome.extraction.hits}
              featured
            />
          </div>
          {rest.length > 0 ? (
            <details className="mt-6">
              <summary className="cursor-pointer font-plex-sans text-[14px] text-iron underline decoration-iron/30 underline-offset-4 hover:decoration-iron focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-iron">
                Two others who could take this
              </summary>
              <ul className="mt-4 flex flex-col gap-4">
                {rest.map((row) => (
                  <li key={row.specialistId}>
                    <SpecialistCard
                      row={row}
                      description={description}
                      eventId={eventId}
                      hits={outcome.extraction.hits}
                    />
                  </li>
                ))}
              </ul>
            </details>
          ) : null}
        </Reveal>
      ) : null}

      {disc ? (
        <Reveal
          as="section"
          id="match-shape"
          label="The shape"
          className="scroll-mt-24"
          delay={60}
        >
          <SectionHead label="The shape" tone="ink" />
          <div className="panel mt-5 p-6">
            <p className="font-newsreader text-[26px] leading-[1.2] text-iron">
              {disc.estimate}
            </p>
            <p className="mt-3 max-w-[46ch] font-newsreader text-[16px] leading-[1.45] text-ink">
              {disc.consequence}
            </p>
            <p className="mt-4 kicker">
              Read from {outcome.extraction.count} distinct conditions · a range,
              not a quote · no figure on file for a comparable engagement
            </p>
          </div>
        </Reveal>
      ) : null}

      <Reveal as="section" label="Close" delay={60}>
        <div className="panel overflow-hidden">
          <div className="bg-iron px-6 py-8 md:px-8">
            <p className="font-newsreader text-[22px] leading-[1.3] text-rag">
              Twenty minutes on the phone, or the brief on a named person&apos;s
              desk.
            </p>
            <p className="mt-2 max-w-[46ch] font-newsreader text-[15px] leading-[1.45] text-rag/85">
              No score decides this. The Check is a fixed{" "}
              {"$" + offer.check.price.toLocaleString("en-US")} and takes five
              days; a person reads it within one business day.
            </p>
          </div>
          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-4">
              {token ? (
                <p className="font-plex-mono text-[12px] text-ink/70">
                  Private link: {`/match/${token.slice(0, 8)}…`} — keep it, it
                  reopens this read. It is not indexed.
                </p>
              ) : null}
              <EmailThisRead token={token} eventId={eventId} />
            </div>
          </div>
        </div>
        <p className="mt-6 font-plex-mono text-[10px] uppercase tracking-[0.08em] text-ink/45">
          Deterministic by construction · every signal, row, and name in this
          read traces to the record or is marked as read by hand · no model, no
          score
        </p>
      </Reveal>
    </div>
  );
}