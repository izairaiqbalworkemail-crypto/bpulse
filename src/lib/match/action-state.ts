import type { MatchOutcome } from "./types";

export type MatchActionState = {
  outcome: MatchOutcome | null;
  eventId: string | null;
  /** Same value as eventId today — the unguessable /match/[token] token. */
  token: string | null;
  description: string;
  error: string | null;
};

export const emptyMatchState: MatchActionState = {
  outcome: null,
  eventId: null,
  token: null,
  description: "",
  error: null,
};