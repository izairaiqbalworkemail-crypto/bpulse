import type { DeskState, ScriptId } from "./types";

const listeners = new Set<() => void>();
const cache = new Map<ScriptId, DeskState>();

function key(id: ScriptId) {
  return `bpulse:desk:${id}`;
}

function emit() {
  listeners.forEach((listener) => listener());
}

export function subscribeDesk(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

const EMPTY: DeskState = { answers: {}, seen: [] };

export function emptyDesk(): DeskState {
  return EMPTY;
}

function readDesk(id: ScriptId): DeskState {
  if (typeof window === "undefined") return emptyDesk();
  try {
    const raw = localStorage.getItem(key(id));
    if (!raw) return emptyDesk();
    const parsed = JSON.parse(raw) as DeskState;
    if (!parsed || typeof parsed !== "object") return emptyDesk();
    return {
      answers: parsed.answers ?? {},
      seen: Array.isArray(parsed.seen) ? parsed.seen : [],
    };
  } catch {
    return emptyDesk();
  }
}

export function loadDesk(id: ScriptId): DeskState {
  const next = readDesk(id);
  const prev = cache.get(id);
  if (prev && JSON.stringify(prev) === JSON.stringify(next)) return prev;
  cache.set(id, next);
  return next;
}

export function saveDesk(id: ScriptId, state: DeskState) {
  cache.set(id, state);
  try {
    localStorage.setItem(key(id), JSON.stringify(state));
    emit();
  } catch {
    /* private mode */
  }
}

export function clearDesk(id: ScriptId) {
  cache.set(id, EMPTY);
  try {
    localStorage.removeItem(key(id));
    emit();
  } catch {
    /* private mode */
  }
}
