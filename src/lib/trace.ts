export type ArrivalState =
  | "incomplete"
  | "stalled"
  | "integration-blocked"
  | "unstable";

export function classifyArrivalState(weightedScore: number): ArrivalState {
  if (weightedScore <= 3) return "incomplete";
  if (weightedScore <= 6) return "stalled";
  if (weightedScore <= 9) return "integration-blocked";
  return "unstable";
}

export function buildTracePath(deflections: number[]): string {
  const baseY = 20;
  const startX = 0;
  const endX = 120;
  const innerStart = 12;
  const span = 96;
  const step = span / Math.max(1, deflections.length - 1);

  const points = deflections.map((value, index) => {
    const x = innerStart + step * index;
    const y = baseY - value;
    return { x, y };
  });

  if (points.length === 0) {
    return `M ${startX} ${baseY} L ${endX} ${baseY}`;
  }

  let d = `M ${startX} ${baseY} L ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i += 1) {
    const prev = points[i - 1];
    const next = points[i];
    const cx = (prev.x + next.x) / 2;
    d += ` Q ${cx} ${prev.y}, ${next.x} ${next.y}`;
  }
  d += ` L ${endX} ${baseY}`;
  return d;
}

export function traceDescription(
  state: ArrivalState,
  selections: number
): string {
  const prefix =
    selections === 0
      ? "No pain statements selected."
      : `${selections} pain statement${selections === 1 ? "" : "s"} selected.`;

  const stateLine =
    state === "incomplete"
      ? "Arrival state: incomplete."
      : state === "stalled"
        ? "Arrival state: stalled."
        : state === "integration-blocked"
          ? "Arrival state: integration-blocked."
          : "Arrival state: unstable.";

  return `${prefix} ${stateLine}`;
}
