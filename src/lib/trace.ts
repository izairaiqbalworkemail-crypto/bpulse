export type HeroPainKey =
  | "almost-done"
  | "staging-only"
  | "single-owner"
  | "ghosted-dev"
  | "real-data-break"
  | "no-release-owner";

const PAIN_WEIGHT: Record<HeroPainKey, 1 | 2 | 3> = {
  "almost-done": 2,
  "staging-only": 1,
  "single-owner": 3,
  "ghosted-dev": 3,
  "real-data-break": 1,
  "no-release-owner": 2,
};

const TRACE_PROFILE: Record<HeroPainKey, { center: number; spread: number; dir: 1 | -1 }> = {
  "almost-done": { center: 0.14, spread: 0.08, dir: -1 },
  "staging-only": { center: 0.29, spread: 0.07, dir: 1 },
  "single-owner": { center: 0.45, spread: 0.08, dir: -1 },
  "ghosted-dev": { center: 0.62, spread: 0.08, dir: 1 },
  "real-data-break": { center: 0.78, spread: 0.07, dir: -1 },
  "no-release-owner": { center: 0.9, spread: 0.07, dir: 1 },
};

function smoothPath(points: Array<{ x: number; y: number }>): string {
  if (points.length === 0) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

  const [first, ...rest] = points;
  let path = `M ${first.x} ${first.y}`;

  for (let i = 0; i < rest.length; i += 1) {
    const prev = i === 0 ? first : rest[i - 1];
    const current = rest[i];
    const cx = (prev.x + current.x) / 2;
    const cy = (prev.y + current.y) / 2;
    path += ` Q ${prev.x} ${prev.y} ${cx} ${cy}`;
  }

  const last = rest[rest.length - 1];
  path += ` T ${last.x} ${last.y}`;
  return path;
}

export function getHeroPainScore(selected: HeroPainKey[]): number {
  return selected.reduce((sum, key) => sum + PAIN_WEIGHT[key], 0);
}

export function getHeroSeverity(selected: HeroPainKey[]): number {
  const score = getHeroPainScore(selected);
  return Math.min(score / 12, 1);
}

export function buildHeroTracePath(selected: HeroPainKey[], width: number, height: number): string {
  const sampleCount = 48;
  const baseline = height / 2;
  const maxDeflection = height * 0.32;
  const baseAmplitude = height * 0.06;

  const points = Array.from({ length: sampleCount + 1 }, (_, index) => {
    const t = index / sampleCount;
    let deflection = 0;

    for (const key of selected) {
      const profile = TRACE_PROFILE[key];
      const weight = PAIN_WEIGHT[key];
      const distance = t - profile.center;
      const bell = Math.exp(-(distance * distance) / (2 * profile.spread * profile.spread));
      deflection += profile.dir * bell * weight * baseAmplitude;
    }

    const clampedDeflection = Math.max(-maxDeflection, Math.min(maxDeflection, deflection));

    return {
      x: Math.round(t * width * 1000) / 1000,
      y: Math.round((baseline + clampedDeflection) * 1000) / 1000,
    };
  });

  return smoothPath(points);
}
