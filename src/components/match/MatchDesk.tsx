"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import { runMatchAction } from "@/app/match/actions";
import {
  emptyMatchState,
  type MatchActionState,
} from "@/lib/match/action-state";
import { getCatalogue } from "@/content/catalogue";
import { type SignalId } from "@/content/signals";
import { PressButton } from "@/components/PressButton";
import { MatchResult } from "@/components/match/MatchResult";
import type { MatchOutcome } from "@/lib/match/types";

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
  const [view, setView] = useState<"form" | "result">("form");
  const [removed, setRemoved] = useState<SignalId[]>([]);
  const [rerun, setRerun] = useState<MatchActionState | null>(null);
  const [busy, setBusy] = useState(false);
  const [session] = useState(() =>
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `session-${Date.now()}`,
  );

  const current = rerun ?? state;
  const showResults = current.outcome != null && view === "result" && !pending;

  useEffect(() => {
    if (showResults) {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showResults]);

  async function toggleSignal(id: SignalId, remove: boolean) {
    if (busy || !current.description) return;
    const next = remove
      ? removed.includes(id)
        ? removed
        : [...removed, id]
      : removed.filter((item) => item !== id);
    setRemoved(next);
    setBusy(true);
    try {
      const response = await fetch("/api/match/signals", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          description: current.description,
          remove: next,
          session,
        }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        outcome?: MatchOutcome;
        eventId?: string;
        token?: string;
        error?: string;
      };
      if (!response.ok || !data.ok || !data.outcome) {
        throw new Error(data.error ?? "The match did not re-run.");
      }
      setRerun({
        outcome: data.outcome,
        eventId: data.eventId ?? null,
        token: data.token ?? null,
        description: current.description,
        error: null,
      });
    } catch {
      setRemoved(remove ? removed.filter((item) => item !== id) : removed);
    } finally {
      setBusy(false);
    }
  }

  function again() {
    logOutcome(current.eventId, "abandoned");
    setDraft(current.description || draft);
    setView("form");
    setRemoved([]);
    setRerun(null);
  }

  return (
    <div className={compact ? "" : "mx-auto max-w-[40rem]"}>
      {showResults && current.outcome ? (
        <div ref={resultRef} className="mt-2">
          <MatchResult
            key={current.eventId ?? "run"}
            outcome={current.outcome}
            eventId={current.eventId}
            token={current.token}
            description={current.description || draft}
            removed={removed}
            onToggleSignal={toggleSignal}
          />
          <button
            type="button"
            onClick={again}
            className="mt-10 font-plex-sans text-[14px] text-iron underline decoration-iron/30 underline-offset-4 hover:decoration-iron focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-iron"
          >
            Describe it again
          </button>
        </div>
      ) : (
        <form
          action={action}
          onSubmit={() => {
            setView("result");
            setRemoved([]);
            setRerun(null);
          }}
          className="mt-2"
        >
          <input type="hidden" name="session" value={session} />
          <label htmlFor={labelId} className="kicker flex items-center gap-2">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-signal pulse-dot" />
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
            className="input mt-3 resize-y"
          />
          <p className="mt-2 font-plex-mono text-[11px] text-ink/70">
            Specific is what makes the read good. This never goes in the URL.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {EXAMPLES.map((item) => (
              <PressButton
                key={item.label}
                onPress={() => setDraft(item.text)}
                className="chip chip-line min-h-9 touch-manipulation font-plex-sans text-[13px] hover:bg-rag hover:text-iron focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-iron"
              >
                Try: {item.label}
              </PressButton>
            ))}
          </div>
          {current.error ? (
            <p role="alert" className="mt-3 font-newsreader text-[15px] text-iron">
              {current.error}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={pending}
            className="btn btn-signal mt-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-iron"
          >
            {pending ? "Reading the record…" : "Read it against the record"}
          </button>
          <p className="mt-4 font-plex-mono text-[11px] text-ink/65">
            Matched against {recordCount} real engagements. Not a model. Not a
            score.
          </p>
        </form>
      )}
    </div>
  );
}