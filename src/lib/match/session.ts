export const MATCH_BRIEF_KEY = "bpulse:match:brief";
export const MATCH_EVENT_KEY = "bpulse:match:event";

export function storeMatchBrief(brief: string, eventId?: string) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(MATCH_BRIEF_KEY, brief);
  if (eventId) sessionStorage.setItem(MATCH_EVENT_KEY, eventId);
}

export function readMatchBrief(): { brief: string; eventId: string | null } {
  if (typeof window === "undefined") return { brief: "", eventId: null };
  return {
    brief: sessionStorage.getItem(MATCH_BRIEF_KEY) ?? "",
    eventId: sessionStorage.getItem(MATCH_EVENT_KEY),
  };
}
