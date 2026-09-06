export const analyticsEvents = [
  "PAGE",
  "read.started",
  "read.submitted",
  "session.started",
  "check.started",
  "check.submitted",
  "slice.started",
  "match.started",
  "match.completed",
  "contact.started",
  "direct.started",
  "careers.started",
  "diagnostic.opened",
  "diagnostic.submitted",
  "pricing.viewed",
  "pricing.rung.clicked",
  "demo.opened",
  "demo.view.changed",
  "report.opened",
  "lot.opened",
  "crew.opened",
  "standard.opened",
  "gate0.opened",
  "intake.step.abandoned",
  "intake.resumed",
  "intake.error",
] as const;

export type AnalyticsEvent = (typeof analyticsEvents)[number];

type EventProps = Record<string, string | number | boolean | null | undefined>;

const blockedKey = /(email|company|name|description|body|text|message|note|token)/i;

const allowedEventProps: Record<AnalyticsEvent, readonly string[]> = {
  PAGE: ["path"],
  "read.started": ["surface"],
  "read.submitted": ["surface"],
  "session.started": ["surface"],
  "check.started": ["surface"],
  "check.submitted": ["surface"],
  "slice.started": ["surface"],
  "match.started": ["surface"],
  "match.completed": ["surface"],
  "contact.started": ["surface"],
  "direct.started": ["surface", "specialist"],
  "careers.started": ["surface"],
  "diagnostic.opened": ["surface"],
  "diagnostic.submitted": ["surface"],
  "pricing.viewed": ["surface"],
  "pricing.rung.clicked": ["rung"],
  "demo.opened": ["surface"],
  "demo.view.changed": ["view"],
  "report.opened": ["slug"],
  "lot.opened": ["slug"],
  "crew.opened": ["slug"],
  "standard.opened": ["surface"],
  "gate0.opened": ["surface"],
  "intake.step.abandoned": ["surface", "step"],
  "intake.resumed": ["surface"],
  "intake.error": ["surface", "field"],
};

export function cleanAnalyticsProps(
  event: AnalyticsEvent,
  props?: EventProps,
): Record<string, string | number | boolean> {
  const result: Record<string, string | number | boolean> = {};
  if (!props) return result;

  const allowed = new Set(allowedEventProps[event]);
  for (const [key, value] of Object.entries(props)) {
    if (!allowed.has(key)) continue;
    if (blockedKey.test(key)) continue;
    if (value === null || value === undefined) continue;
    if (typeof value === "string") {
      const safe = value.trim();
      if (!safe || safe.length > 120) continue;
      if (/@/.test(safe)) continue;
      result[key] = safe;
      continue;
    }
    if (typeof value === "number" || typeof value === "boolean") {
      result[key] = value;
    }
  }

  return result;
}
