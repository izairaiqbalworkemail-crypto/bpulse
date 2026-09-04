import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const outDir = resolve(root, "tooling/framer-cms");

const { lots } = await import("../src/content/lots.ts");
const { specialists } = await import("../src/content/specialists.ts");
const { notices } = await import("../src/content/notices.ts");
const { brand } = await import("../src/config/brand.ts");
const offer = {
  check: brand.offers.check,
  close: brand.offers.close,
  standing: brand.offers.standing,
};

function esc(value) {
  const raw = value == null ? "" : String(value);
  if (raw.includes(",") || raw.includes("\n") || raw.includes('"')) {
    return `"${raw.replaceAll('"', '""')}"`;
  }
  return raw;
}

function toCsv(headers, rows) {
  const head = headers.map(esc).join(",");
  const body = rows
    .map((row) => headers.map((header) => esc(row[header] ?? "")).join(","))
    .join("\n");
  return `${head}\n${body}\n`;
}

await mkdir(outDir, { recursive: true });

const projectRows = lots.map((lot) => ({
  slug: lot.slug,
  lotNumber: lot.lotNumber,
  client: lot.client,
  clientUrl: lot.clientUrl ?? "",
  logoUrl: lot.logoUrl ?? "",
  imageUrl: lot.imageUrl ?? "",
  title: lot.title,
  summary: lot.summary,
  condition: lot.condition,
  outcome: lot.outcome,
  gradeState: lot.grade.state,
  gradeColor: lot.grade.grade,
  gradeLabel: lot.grade.label,
  gradeDate: lot.grade.date ?? "",
  specialistId: lot.specialistId,
  specialistCapability: lot.specialistCapability,
  dataLines: lot.dataLines.map((line) => `${line.label}:${line.value}`).join(" | "),
  limits: (lot.limits ?? []).join(" | "),
  sources: lot.sources
    .map((source) => `${source.kind}:${source.org}:${source.url ?? ""}`)
    .join(" | "),
}));

const crewRows = specialists.map((spec) => ({
  id: spec.id,
  name: spec.name,
  role: spec.role,
  years: spec.years,
  photo: spec.photo ?? "",
  photoStatus: spec.photoStatus,
  funTitle: spec.funTitle,
  bio: spec.bio,
  philosophy: spec.philosophy,
  stack: spec.stack.join(" | "),
  focus: spec.focus.join(" | "),
  record: spec.record
    .map((item) => `${item.org}:${item.line}:${item.url ?? ""}`)
    .join(" | "),
  reviews: (spec.reviews ?? [])
    .map((review) => `${review.name}:${review.role}:${review.quote}`)
    .join(" | "),
}));

const noticeRows = notices.map((notice) => ({
  id: notice.id,
  question: notice.question,
  answer: notice.answer,
  sourceKind: notice.source?.kind ?? "",
  sourceOrg: notice.source?.org ?? "",
  sourceUrl: notice.source?.url ?? "",
}));

const offerRows = [
  {
    key: "check",
    name: offer.check.name,
    price: String(offer.check.price),
    currency: offer.check.currency,
    duration: offer.check.duration,
    priceRange: "",
    description: offer.check.description,
  },
  {
    key: "close",
    name: offer.close.name,
    price: "",
    currency: "USD",
    duration: "",
    priceRange: offer.close.priceRange,
    description: offer.close.description,
  },
  {
    key: "standing",
    name: offer.standing.name,
    price: "",
    currency: "USD",
    duration: "",
    priceRange: offer.standing.priceRange,
    description: offer.standing.description,
  },
];

await writeFile(
  resolve(outDir, "projects.csv"),
  toCsv(
    [
      "slug",
      "lotNumber",
      "client",
      "clientUrl",
      "logoUrl",
      "imageUrl",
      "title",
      "summary",
      "condition",
      "outcome",
      "gradeState",
      "gradeColor",
      "gradeLabel",
      "gradeDate",
      "specialistId",
      "specialistCapability",
      "dataLines",
      "limits",
      "sources",
    ],
    projectRows
  )
);

await writeFile(
  resolve(outDir, "crew.csv"),
  toCsv(
    [
      "id",
      "name",
      "role",
      "years",
      "photo",
      "photoStatus",
      "funTitle",
      "bio",
      "philosophy",
      "stack",
      "focus",
      "record",
      "reviews",
    ],
    crewRows
  )
);

await writeFile(
  resolve(outDir, "notices.csv"),
  toCsv(["id", "question", "answer", "sourceKind", "sourceOrg", "sourceUrl"], noticeRows)
);

await writeFile(
  resolve(outDir, "offers.csv"),
  toCsv(
    ["key", "name", "price", "currency", "duration", "priceRange", "description"],
    offerRows
  )
);

console.log("Framer CMS exports written to tooling/framer-cms");
