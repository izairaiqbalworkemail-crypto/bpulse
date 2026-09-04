import type { Lot } from "./types";

/**
 * Nine lots, curated from the studio's own portfolio source. Every figure is
 * client-reported and traceable via `sources`. Where the source is silent on
 * a number or a date, `limits` says so — nothing is invented.
 *
 * Each lot is graded on its condition ON ARRIVAL — the state of the object
 * when it came through the door. Arrival dates are only shown where recorded;
 * otherwise they are omitted and the limits line says so.
 */
export const lots: Lot[] = [
  {
    slug: "deepidv",
    lotNumber: "LOT 031",
    client: "DeepIDV",
    clientUrl: "https://deepidv.com",
    logoUrl: "/logos/deepidv.svg",
    imageUrl: "/project-shots/project-deepidv.png",
    title: "Verification engine and its compliance suite",
    summary:
      "A verification platform spanning KYC, liveness, deepfake, and fraud workflows.",
    condition:
      "Arrived with the compliance path demo-tight, not proven against production data. Multiple workflow types and third-party integrations were pulling in every direction, and the verification flows were still being tightened toward production-ready compliance.",
    dataLines: [
      { label: "Client", value: "DeepIDV" },
      { label: "Status", value: "Ongoing product ownership" },
      { label: "Reach", value: "211+ countries" },
      { label: "Verdict latency", value: "sub-150ms" },
      { label: "Constraint", value: "agentic compliance" },
    ],
    grade: {
      state: "integration-blocked",
      grade: "unsound",
      label: "Integration-blocked on arrival",
      date: "Aug 2026",
    },
    outcome:
      "A live verification platform handling KYC, liveness, deepfake screening, and fraud checks as a cohesive product, with the compliance path carried toward production.",
    detail:
      "Agentic compliance suite, n8n automation, Shopify integrations, AWS ownership.",
    highlights: ["KYC + liveness", "deepfake defense", "fraud workflows"],
    limits: [
      "Reach and latency figures are client-reported on deepidv.com (checked 5 September 2026: 211+ countries, decision in under 150ms).",
      "Arrival date not recorded in the source; Aug 2026 is the earliest verifiable reference (ledger field note), not a confirmed arrival date.",
      "Detail and highlights above come from the studio's prior portfolio data (bpulse projects.json), not from a fresh re-audit.",
    ],
    attribution: {
      type: "client-listing",
      sourceUrl: "https://deepidv.com",
    },
    specialistId: "mehak",
    specialistCapability: "Intelligence",
    sources: [
      { kind: "client-engagement", org: "DeepIDV", url: "https://deepidv.com" },
      { kind: "field-note", org: "DeepIDV" },
    ],
  },
  {
    slug: "sully",
    lotNumber: "LOT 034",
    client: "Sully.ai",
    clientUrl: "https://sully.ai",
    logoUrl: "/logos/sully.svg",
    imageUrl: "/project-shots/project-sully.png",
    title: "AI employee platform for hospitals",
    summary:
      "An AI employee platform for hospitals spanning triage, scribe, coding, and EHR-integrated operations.",
    condition:
      "Built for hospitals, where a software error is not an inconvenience but a compliance and patient-safety risk. Arrived unable to ship cleanly: the work needed integration notes and ownership clarity so new contributors could move it into production without guesswork.",
    dataLines: [
      { label: "Client", value: "Sully.ai" },
      { label: "Status", value: "Ongoing product ownership" },
      { label: "Reach", value: "450+ healthcare orgs" },
      { label: "Clinical tasks", value: "5M+ run" },
      { label: "Constraint", value: "HIPAA-constrained" },
    ],
    grade: {
      state: "stalled",
      grade: "sound",
      label: "Stalled on arrival",
      date: "Jul 2026",
    },
    outcome:
      "An AI employee platform in real use by medical teams, under role-based access, real-time clinical dashboards, and production-grade model work.",
    detail:
      "Role-based access control under HIPAA, real-time clinical dashboards, model fine-tuning.",
    highlights: ["HIPAA access control", "clinical dashboards", "EHR integrations"],
    limits: [
      "Reach and clinical-task figures are client-reported on sully.ai; we did not independently audit the counts.",
      "Arrival date not recorded in the source; Jul 2026 is the earliest verifiable reference (handover field note), not a confirmed arrival date.",
      "Detail and highlights above come from the studio's prior portfolio data (bpulse projects.json), not from a fresh re-audit.",
    ],
    specialistId: "aneeb",
    specialistCapability: "Delivery",
    attribution: {
      type: "client-listing",
      sourceUrl: "https://sully.ai",
    },
    sources: [
      { kind: "client-engagement", org: "Sully.ai", url: "https://sully.ai" },
      { kind: "review", org: "Sully.ai" },
    ],
  },
  {
    slug: "myusta",
    lotNumber: "LOT 028",
    client: "myUsta",
    clientUrl: "https://app.myusta.al",
    imageUrl: "/project-shots/project-myusta.png",
    title: "Tradesperson marketplace for Albania",
    summary:
      "A marketplace matching people with trusted tradespeople across Albania.",
    condition:
      "Arrived as a two-sided marketplace that had to launch cold on both sides at once — matching customers with tradespeople they could trust before either side showed up. Built but not yet live.",
    dataLines: [
      { label: "Client", value: "myUsta" },
      { label: "Status", value: "Shipped" },
      { label: "Platform", value: "iOS + Android" },
      { label: "Reach", value: "Albania-wide" },
    ],
    grade: {
      state: "stalled",
      grade: "sound",
      label: "Unlaunched on arrival",
    },
    outcome:
      "A live tradesperson marketplace delivered web and mobile for the Albanian market.",
    limits: [
      "No transaction or user counts are on record in the source; the live-on-both-stores and Albania-wide claims are the extent of the verified reach.",
      "No arrival or engagement-start date is recorded in the source; none is shown rather than inferred.",
    ],
    specialistId: "aneeb",
    specialistCapability: "Delivery",
    attribution: {
      type: "client-listing",
      sourceUrl: "https://app.myusta.al",
    },
    sources: [
      { kind: "client-engagement", org: "myUsta", url: "https://app.myusta.al" },
      { kind: "review", org: "myUsta" },
    ],
  },
  {
    slug: "wearmeout",
    lotNumber: "LOT 036",
    client: "WearMeOut.ai",
    clientUrl: "https://wearmeout-frontend.onrender.com/",
    logoUrl: "/logos/wearmeout.svg",
    imageUrl: "/project-shots/project-wearmeout.png",
    title: "AI custom t-shirt platform, taken to production",
    summary:
      "Frontend delivery and production readiness for a Firebase + React product.",
    condition:
      "Arrived looking done in demo mode but not production-ready: the remaining pass was final interaction polish, deployment hardening, and release checks — the actual last twenty percent, still open.",
    dataLines: [
      { label: "Client", value: "WearMeOut.ai" },
      { label: "Status", value: "LIVE" },
      { label: "Scope", value: "frontend + production" },
      { label: "Platform", value: "Firebase · React" },
    ],
    grade: {
      state: "incomplete",
      grade: "sound",
      label: "Incomplete on arrival",
      date: "Aug 2026",
    },
    outcome:
      "A React product taken across the line to production, live after the production-readiness pass.",
    limits: [
      "No user numbers in the source; the verified claim is a React product taken across the line to production.",
      "Arrival date not recorded in the source; Aug 2026 is the earliest verifiable reference (field note), not a confirmed arrival date.",
    ],
    specialistId: "fizza",
    specialistCapability: "Integration",
    attribution: { type: "crew-asserted" },
    sources: [
      { kind: "client-engagement", org: "WearMeOut.ai" },
      { kind: "field-note", org: "WearMeOut.ai" },
      { kind: "review", org: "WearMeOut.ai" },
    ],
  },
  {
    slug: "mythos-archive",
    lotNumber: "LOT 037",
    client: "Mythos Archive",
    clientUrl: "https://www.mythosarchive.org/",
    logoUrl: "/logos/mythos-archive.svg",
    imageUrl: "/project-shots/project-mythos-archive.png",
    title: "Interactive archive, grounded in verified sources",
    summary:
      "Phase 7 AI storytelling and archive experience built around verified historical sources.",
    condition:
      "Arrived as an archival storytelling experience that had to stay faithful to verified historical sources, with the source-attribution and audit layer still open: translating historical-source structure into an interface people can actually navigate.",
    dataLines: [
      { label: "Client", value: "Mythos Archive" },
      { label: "Status", value: "Shipped" },
      { label: "Scope", value: "interactive web experience" },
      { label: "Phase", value: "Phase 7" },
    ],
    grade: {
      state: "incomplete",
      grade: "sound",
      label: "Incomplete on arrival",
      date: "Aug 2026",
    },
    outcome:
      "A launched, polished interactive experience with the source-links audit and attribution pass completed.",
    limits: [
      "No verifiable usage or traffic figures exist for this lot. It is an experience, not a metric, and we do not invent proof for it.",
      "Arrival date not recorded in the source; Aug 2026 is the earliest verifiable reference (ramp field note), not a confirmed arrival date.",
    ],
    specialistId: "fizza",
    specialistCapability: "Intelligence",
    attribution: { type: "crew-asserted" },
    sources: [
      { kind: "client-engagement", org: "Mythos Archive" },
      { kind: "field-note", org: "Mythos Archive" },
      { kind: "review", org: "Mythos Archive" },
    ],
  },
  {
    slug: "sba504",
    lotNumber: "LOT 038",
    client: "SBA 504 Loan Hub",
    clientUrl: "https://sba504loanhub.com",
    imageUrl: "/project-shots/project-sba504.png",
    title: "An unbiased SBA 504 loan information hub",
    summary:
      "A comprehensive, unbiased SBA 504 loan information hub for small-business owners.",
    condition:
      "Arrived as a small-business loan-information product that still needed its technical SEO, lead capture, and a clean ownership handover before it could stand as a comprehensive, unbiased hub.",
    dataLines: [
      { label: "Client", value: "SBA 504 Loan Hub" },
      { label: "Status", value: "Shipped" },
      { label: "Stack", value: "Astro · Sanity · Vercel" },
      { label: "Scope", value: "info platform + lead capture" },
    ],
    grade: {
      state: "incomplete",
      grade: "sound",
      label: "Incomplete on arrival",
    },
    outcome:
      "A live loan-information platform, deployed with full technical SEO, lead capture, and a clean ownership handover.",
    limits: [
      "SBA 504 is an information hub: there is no user or traffic metric in the source, and we do not invent one.",
      "No arrival or engagement-start date is recorded in the source; none is shown rather than inferred.",
    ],
    specialistId: "fizza",
    specialistCapability: "Delivery",
    attribution: { type: "crew-asserted" },
    sources: [
      { kind: "client-engagement", org: "SBA 504 Loan Hub" },
      { kind: "review", org: "SBA 504 Lead-Gen Site" },
    ],
  },
  {
    slug: "clearance",
    lotNumber: "LOT 039",
    client: "Clearance.ai",
    clientUrl: "https://clearance.ai",
    logoUrl: "/logos/clearance.svg",
    imageUrl: "/project-shots/project-clearance.png",
    title: "AI-powered clearance automation platform",
    summary:
      "An AI platform automating clearance processes for enterprise clients.",
    condition:
      "Arrived with the AI pipeline functional but the compliance and deployment layers still open. The core model worked; the production wrapper did not.",
    dataLines: [
      { label: "Client", value: "Clearance.ai" },
      { label: "Status", value: "Shipped" },
      { label: "Stack", value: "Python · React · AWS" },
      { label: "Scope", value: "AI pipeline + compliance" },
    ],
    grade: {
      state: "incomplete",
      grade: "sound",
      label: "Incomplete on arrival",
    },
    outcome:
      "A production-ready clearance automation platform with compliance paths and deployment hardening completed.",
    limits: [
      "Client-reported figures not available in the source.",
    ],
    specialistId: "najiullah",
    specialistCapability: "Intelligence",
    attribution: { type: "crew-asserted" },
    sources: [
      { kind: "client-engagement", org: "Clearance.ai" },
    ],
  },
  {
    slug: "evidero",
    lotNumber: "LOT 040",
    client: "Evidero",
    clientUrl: "https://evidero.com",
    logoUrl: "/logos/evidero.svg",
    imageUrl: "/project-shots/project-evidero.png",
    title: "Evidence management platform",
    summary:
      "A platform for managing, tracking, and presenting digital evidence in legal and compliance contexts.",
    condition:
      "Arrived with the data model solid but the presentation layer and user workflows unfinished. The hard part was done; the last mile was not.",
    dataLines: [
      { label: "Client", value: "Evidero" },
      { label: "Status", value: "Shipped" },
      { label: "Stack", value: "React · Node.js · PostgreSQL" },
      { label: "Scope", value: "evidence management" },
    ],
    grade: {
      state: "incomplete",
      grade: "sound",
      label: "Incomplete on arrival",
    },
    outcome:
      "A live evidence management platform with complete user workflows and presentation layer.",
    limits: [
      "No user metrics in the source.",
    ],
    specialistId: "fizza",
    specialistCapability: "Delivery",
    attribution: { type: "crew-asserted" },
    sources: [
      { kind: "client-engagement", org: "Evidero" },
    ],
  },
  {
    slug: "fullscript",
    lotNumber: "LOT 041",
    client: "Fullscript",
    clientUrl: "https://fullscript.com",
    logoUrl: "/logos/fullscript.svg",
    imageUrl: "/project-shots/project-fullscript.png",
    title: "Healthcare product workflows for supplements and labs",
    summary:
      "Designed and built healthcare product workflows for supplement recommendations, lab ordering, and patient adherence tracking.",
    condition:
      "Arrived with the supplement catalog solid but the lab integration and adherence tracking layers still needed work. The product logic was there; the connections were not.",
    dataLines: [
      { label: "Client", value: "Fullscript" },
      { label: "Status", value: "Shipped" },
      { label: "Stack", value: "React · Node.js · Healthcare APIs" },
      { label: "Scope", value: "product workflows" },
    ],
    grade: {
      state: "incomplete",
      grade: "sound",
      label: "Incomplete on arrival",
    },
    outcome:
      "Production-ready healthcare product workflows with lab integration and adherence tracking.",
    limits: [
      "Client-reported figures not available in the source.",
    ],
    specialistId: "mehak",
    specialistCapability: "Integration",
    attribution: { type: "crew-asserted" },
    sources: [
      { kind: "client-engagement", org: "Fullscript" },
    ],
  },
];

export function figureDisclaimer(lot: Lot): string | null {
  if (lot.attribution.type === "crew-asserted") {
    return "crew-reported, unverified";
  }
  return null;
}

const lotMap = new Map(lots.map((lot) => [lot.slug, lot]));

export function getLot(slug: string): Lot {
  const lot = lotMap.get(slug);
  if (!lot) throw new Error(`Unknown lot: ${slug}`);
  return lot;
}

export function getFeaturedLots(): Lot[] {
  return lots.slice(0, 2);
}

/**
 * All lots except the hero lead — the rest of the catalogue for the landing.
 */
export function getOtherLots(leadSlug: string): Lot[] {
  return lots.filter((lot) => lot.slug !== leadSlug);
}
