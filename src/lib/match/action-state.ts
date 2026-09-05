import type { MatchResult } from "./types";

export type MatchActionState = {
  results: MatchResult[] | null;
  eventId: string | null;
  description: string;
  error: string | null;
};

export const emptyMatchState: MatchActionState = {
  results: null,
  eventId: null,
  description: "",
  error: null,
};
