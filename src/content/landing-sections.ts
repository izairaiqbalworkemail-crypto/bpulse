import { ladderPrices, money } from "./ladder";

/**
 * Copy for the redesigned landing sections. Prices trace to the ladder.
 * Same voice as the rest of the site: published, plain, no invented figures.
 */

/** The dark interrupt: pick a situation, get a start. */
export const stuckCopy = {
  label: "Suggestion",
  heading: "What is stuck.",
  dek: "Tap what is true. We name the start, the price, and the person.",
  placeholder: "Not sure? The Read is free and tells you in writing.",
  resultLink: "Start here",
} as const;

/** The five situations on the "What is stuck?" selector. Prices from the ladder. */
export const stuckChips = [
  {
    icon: "1",
    label: "An idea, no code",
    name: "The Session",
    price: money(ladderPrices.session),
    desc: "It sounds like you're just exploring. Ninety minutes with a senior engineer, a written scope and a range.",
    href: "/session",
    image: "/landing/stuck-state-1.jpg",
  },
  {
    icon: "2",
    label: "A prototype that must become real",
    name: "The First Slice",
    price: money(ladderPrices.slice),
    desc: "A stuck prototype usually means one thing shipped and working, in production, fixed price.",
    href: "/first-slice",
    image: "/landing/stuck-state-2.jpg",
  },
  {
    icon: "3",
    label: "A build that will not ship",
    name: "The Check",
    price: money(ladderPrices.check),
    desc: "That's exactly what a five-day diagnostic is built to answer: keep, repair, or rebuild.",
    href: "/check",
    image: "/landing/stuck-state-3.jpg",
  },
  {
    icon: "4",
    label: "A finished scope and a deadline",
    name: "The Close",
    price: "$18k–$95k",
    desc: "You're ready for the full project — fixed scope, agreed in writing before any code.",
    href: "/how-it-works",
    image: "/landing/stuck-state-4.jpg",
  },
  {
    icon: "5",
    label: "Shipped, team can't maintain it",
    name: "Standing",
    price: "$900–$6,000/mo",
    desc: "You want support after launch. Cancel any month, no departing fee.",
    href: "/second-chair",
    image: "/landing/stuck-state-5.jpg",
  },
] as const;

/** The short process copy beside the photograph. */
export const processSteps = [
  {
    n: "01",
    label: "Read",
    body: "You describe what's stuck. A senior engineer writes back within one business day. Free.",
  },
  {
    n: "02",
    label: "Diagnose",
    body: "Five days inside your repository. A written verdict: keep, repair, or rebuild.",
  },
  {
    n: "03",
    label: "Build",
    body: "The people who scoped it ship it. Weekly updates, a login, commits when connected.",
  },
  {
    n: "04",
    label: "Handover",
    body: "Runbook, credentials transfer, training — then we revoke what we held.",
  },
] as const;

/** The comparison. Them on paper, us on ink. */
export const compareCopy = {
  them: {
    title: "Typical agency",
    rows: [
      "Juniors on the keyboard, seniors on the sales call",
      "Scope creeps quietly, invoices don't",
      "No visibility until the big reveal",
      "Handover is a folder and a goodbye",
    ],
  },
  us: {
    title: "bpulse",
    rows: [
      "Named seniors, Gate 4 before anyone is client-facing",
      "Fixed scope; a change is a signed change order",
      "A login you can watch, updated weekly",
      "Runbook, training, and a revocation log on handover day",
    ],
  },
} as const;

/**
 * The hero portal rotation. Three real engagements from the lots catalogue —
 * one mid-build, one in test, one shipped — so the panel plays the whole arc.
 * Portal URLs are sample-style (the real ones are private); the work, the
 * stacks, and the month marks trace to the lots data. Day counters and
 * percentages are the panel's own clock, not client-reported figures.
 */
export const heroProjects = [
  {
    name: "DeepIDV",
    tag: "portal.bpulse.pk/u/dv-7f — deepidv",
    stage: "Build",
    pct: 61,
    actions: [
      "Wiring KYC + liveness…",
      "Screening deepfake defense…",
      "Connecting fraud workflows…",
    ],
    day: "Day 41 of 90",
    next: "Next: compliance path to production",
    logTitle: "Scope — verification suite",
    rows: [
      { label: "KYC + liveness flows", dated: "Aug 2026" },
      { label: "n8n + Shopify integrations", dated: "Aug 2026" },
    ],
    revocation: { label: "AWS ownership", status: "secured" },
    done: false,
  },
  {
    name: "Sully.ai",
    tag: "portal.bpulse.pk/u/su-3a — sully",
    stage: "Test",
    pct: 84,
    actions: [
      "Hardening role-based access…",
      "Wiring clinical dashboards…",
      "Fine-tuning models…",
    ],
    day: "Day 26 of 40",
    next: "Next: EHR integrations",
    logTitle: "Test pass — clinical suite",
    rows: [
      { label: "HIPAA access control", dated: "Jul 2026" },
      { label: "Real-time dashboards", dated: "Jul 2026" },
    ],
    revocation: { label: "Staging access", status: "revoked" },
    done: false,
  },
  {
    name: "WearMeOut.ai",
    tag: "portal.bpulse.pk/u/wo-9k — wearmeout",
    stage: "Ship",
    pct: 100,
    actions: [
      "Running release checks…",
      "Hardening for production…",
      "Deploying to production…",
    ],
    day: "Day 18 of 18",
    next: "Next: monitoring window",
    logTitle: "Release — production",
    rows: [
      { label: "Deployed to production", dated: "Aug 2026" },
      { label: "Release hardening pass", dated: "Aug 2026" },
    ],
    revocation: { label: "Staging keys", status: "rotated" },
    done: true,
  },
] as const;

/** Glyphs for the FAQ questions, one per card, in homeQuestions order. */
export const faqIcons = ["?", "$", "!", "⌘", "12"] as const;

/** Glyphs for the pricing questions, in pricingQuestions order. */
export const pricingFaqIcons = ["$", "±", "⚖", "?", "US"] as const;
