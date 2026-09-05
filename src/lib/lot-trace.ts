import { lots } from "@/content/lots";
import type { IndexProject, Lot, Specialist } from "@/content/types";

export const TRACE_SIZES = {
  full: { width: 480, height: 120 },
  card: { width: 280, height: 64 },
  inline: { width: 120, height: 24 },
} as const;

export type TraceSize = keyof typeof TRACE_SIZES;

export type TraceFinding = {
  label: string;
  text: string;
};

export type TraceSpec = {
  id: string;
  arrivalState: string;
  arrivalLabel: string;
  findings: TraceFinding[];
};

export type TraceMark = {
  x: number;
  y: number;
  t: number;
  label: string;
};

export type BuiltTrace = {
  path: string;
  marks: TraceMark[];
  description: string;
  width: number;
  height: number;
};

const STATE_BIAS: Record<string, number> = {
  incomplete: 0.16,
  stalled: 0.34,
  "integration-blocked": 0.58,
  unstable: 0.78,
  "taken over mid-flight": 0.3,
  "entered unfinished": 0.46,
  "from blank canvas": 0.12,
};

function digest(text: string): number {
  let hash = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function unit(hash: number, salt: number): number {
  return ((hash + salt * 0x9e3779b9) >>> 0) / 0xffffffff;
}

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

function peaksFor(spec: TraceSpec) {
  const n = Math.max(spec.findings.length, 1);
  return spec.findings.map((finding, index) => {
    const seed = digest(`${spec.id}:${finding.label}:${finding.text}`);
    const slot = (index + 1) / (n + 1);
    const jitter = (unit(seed, 1) - 0.5) * (0.7 / n);
    const center = Math.min(0.92, Math.max(0.08, slot + jitter));
    const spread = 0.045 + unit(seed, 2) * 0.035;
    const dir: 1 | -1 = unit(seed, 3) > 0.5 ? 1 : -1;
    const weight = 0.55 + (finding.text.length % 17) / 17 + unit(seed, 4) * 0.35;
    return { finding, center, spread, dir, weight };
  });
}

export function buildLotTrace(
  spec: TraceSpec,
  width: number,
  height: number,
): BuiltTrace {
  const sampleCount = 48;
  const baseline = height / 2;
  const maxDeflection = height * 0.36;
  const baseAmplitude = height * 0.11;
  const bias = STATE_BIAS[spec.arrivalState] ?? 0.25;
  const peaks = peaksFor(spec);
  const identity = digest(spec.id + spec.arrivalLabel + spec.findings.map((item) => item.text).join("|"));

  const points = Array.from({ length: sampleCount + 1 }, (_, index) => {
    const t = index / sampleCount;
    let deflection = Math.sin((t + unit(identity, 7)) * Math.PI) * baseAmplitude * (0.22 + bias);

    for (const peak of peaks) {
      const distance = t - peak.center;
      const bell = Math.exp(-(distance * distance) / (2 * peak.spread * peak.spread));
      deflection += peak.dir * bell * peak.weight * baseAmplitude;
    }

    const clamped = Math.max(-maxDeflection, Math.min(maxDeflection, deflection));
    return {
      x: Math.round(t * width * 1000) / 1000,
      y: Math.round((baseline + clamped) * 1000) / 1000,
    };
  });

  const marks = peaks.map((peak) => {
    const sample = Math.round(peak.center * sampleCount);
    const point = points[sample] ?? points[0];
    return {
      x: point.x,
      y: point.y,
      t: peak.center,
      label: peak.finding.label,
    };
  });

  const findingWords = spec.findings
    .map((item) => item.label)
    .filter(Boolean)
    .slice(0, 4)
    .join("; ");

  const description = findingWords
    ? `${spec.arrivalLabel}. The trace deflects at: ${findingWords}.`
    : spec.arrivalLabel;

  return {
    path: smoothPath(points),
    marks,
    description,
    width,
    height,
  };
}

export function specFromLot(lot: Lot): TraceSpec {
  const highlights = lot.highlights ?? [];
  const findings: TraceFinding[] = [
    { label: lot.grade.label, text: lot.condition },
    ...highlights.map((item) => ({ label: item, text: item })),
  ];
  return {
    id: lot.slug,
    arrivalState: lot.grade.state,
    arrivalLabel: lot.grade.label,
    findings,
  };
}

export function specFromIndex(project: IndexProject): TraceSpec {
  return {
    id: `index:${project.id}`,
    arrivalState: project.entryState,
    arrivalLabel: project.entryState,
    findings: [
      { label: project.entryState, text: project.line },
      { label: project.stack, text: project.stack },
    ],
  };
}

export function specFromLots(
  id: string,
  owned: Lot[],
  arrivalLabel: string,
): TraceSpec {
  const findings = owned.flatMap((lot) => [
    { label: `${lot.client} · ${lot.grade.label}`, text: lot.condition },
    ...(lot.highlights ?? []).map((item) => ({
      label: `${lot.client}: ${item}`,
      text: item,
    })),
  ]);
  return {
    id,
    arrivalState: owned[0]?.grade.state ?? "incomplete",
    arrivalLabel,
    findings: findings.length
      ? findings
      : [{ label: arrivalLabel, text: arrivalLabel }],
  };
}

function sameClient(org: string, client: string) {
  return org.trim().toLowerCase() === client.trim().toLowerCase();
}

/** Lots they own, plus lots named on their published record. */
export function lotsForPerson(person: Specialist): Lot[] {
  const owned = lots.filter(
    (lot) =>
      lot.specialistId === person.id ||
      person.record.some((row) => sameClient(row.org, lot.client)),
  );
  const seen = new Set<string>();
  return owned.filter((lot) => {
    if (seen.has(lot.slug)) return false;
    seen.add(lot.slug);
    return true;
  });
}

const SKIP_FIGURES = new Set([
  "Client",
  "Status",
  "Constraint",
  "Scope",
  "Stack",
  "Platform",
  "Phase",
]);

/** Client-listed numeric figures only. Crew-asserted lots show none. */
export function verifiedFigures(lot: Lot) {
  if (lot.attribution.type === "crew-asserted") return [];
  return lot.dataLines.filter(
    (line) => !SKIP_FIGURES.has(line.label) && /\d/.test(line.value),
  );
}

export function displayHost(url?: string) {
  if (!url) return "";
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  }
}

export function firstName(name: string) {
  return name.split(" ")[0] ?? name;
}

export function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
