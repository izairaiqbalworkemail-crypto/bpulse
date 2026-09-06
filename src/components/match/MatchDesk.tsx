"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { runMatchAction } from "@/app/match/actions";
import {
  emptyMatchState,
  type MatchActionState,
} from "@/lib/match/action-state";
import { type SignalId } from "@/content/signals";
import {
  Docket,
  DocketFile,
  DocketWrite,
} from "@/components/intake/docket/Docket";
import { MatchResult } from "@/components/match/MatchResult";
import { emptyDesk, loadDesk, saveDesk } from "@/lib/conversation/persist";
import type { MatchOutcome } from "@/lib/match/types";
import { track } from "@/lib/analytics/public";

const EXAMPLE =
  "We built a payroll tool over eight months. It works on staging. We've never deployed to production and nobody left knows how the auth was wired.";

const MATCH_ID = "match";

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
  const resultRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action, pending] = useActionState(
    runMatchAction,
    emptyMatchState,
  );
  const [draft, setDraft] = useState(() => {
    if (typeof window === "undefined") return "";
    return loadDesk(MATCH_ID).answers.description ?? "";
  });
  const [view, setView] = useState<"form" | "result">("form");
  const [removed, setRemoved] = useState<SignalId[]>([]);
  const [rerun, setRerun] = useState<MatchActionState | null>(null);
  const [busy, setBusy] = useState(false);
  const started = useRef(false);
  const completedFor = useRef<string | null>(null);
  const [session] = useState(() =>
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `session-${Date.now()}`,
  );

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    track("match.started", { surface: compact ? "match-compact" : "match" });
  }, [compact]);

  function remember(value: string) {
    setDraft(value);
    saveDesk(MATCH_ID, {
      answers: { description: value },
      seen: emptyDesk().seen,
    });
  }

  const current = rerun ?? state;
  const showResults = current.outcome != null && view === "result" && !pending;

  useEffect(() => {
    if (showResults) {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      if (current.eventId && completedFor.current !== current.eventId) {
        completedFor.current = current.eventId;
        track("match.completed", { surface: compact ? "match-compact" : "match" });
      }
    }
  }, [compact, current.eventId, showResults]);

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
    remember(current.description || draft);
    setView("form");
    setRemoved([]);
    setRerun(null);
  }

  return (
    <div className={compact ? "" : "max-w-[36rem]"}>
      {showResults && current.outcome ? (
        <div ref={resultRef}>
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
            className="mt-10 font-plex-sans text-[14px] text-ink/55 underline decoration-iron/20 underline-offset-4 hover:text-iron"
          >
            Describe it again
          </button>
        </div>
      ) : (
        <form
          ref={formRef}
          action={action}
          onSubmit={() => {
            setView("result");
            setRemoved([]);
            setRerun(null);
            saveDesk(MATCH_ID, {
              answers: { description: draft },
              seen: [],
            });
          }}
        >
          <input type="hidden" name="session" value={session} />
          <Docket
            kicker="The match"
            step={1}
            of={1}
            ask="What will not ship?"
            error={current.error}
            actions={
              <DocketFile submit disabled={pending}>
                {pending ? "Reading…" : "Read it"}
              </DocketFile>
            }
          >
            <DocketWrite
              name="description"
              value={draft}
              onChange={remember}
              onSubmit={() => formRef.current?.requestSubmit()}
              placeholder={EXAMPLE}
              type="textarea"
              rows={compact ? 3 : 3}
              maxLength={10_000}
            />
          </Docket>
        </form>
      )}
    </div>
  );
}
