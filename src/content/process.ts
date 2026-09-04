export const closeStages = [
  {
    id: "discovery",
    label: "Discovery",
    demoHref: "/demo",
    happens:
      "We read what exists — the product, the repo if you have one, the thing that is stuck. You see the same questions we use on a Check.",
    receive: "A written read of the arrival state. Not a pitch.",
    sign: "Nothing yet. Discovery is how we decide whether a Close is honest.",
    see: "Overview in the portal: current stage, next milestone, days on the clock.",
  },
  {
    id: "nda",
    label: "NDA",
    demoHref: "/demo/documents",
    happens:
      "If we need the repo, the credentials, or the customer data to be sure, we sign first.",
    receive: "The dated NDA, with signature status visible to both sides.",
    sign: "The NDA. You can download the stub on the sample to see the shape.",
    see: "Documents: dated, signed or waiting, never implied.",
  },
  {
    id: "scope",
    label: "Scope locked",
    demoHref: "/demo/scope",
    happens:
      "Scope is versioned and signed before any code. A change is a change order — priced and re-signed. Nothing is absorbed silently.",
    receive: "Scope vN, the diff from the last version, and every change order with its price.",
    sign: "The locked scope, and each change order after that.",
    see: "The scope lock and the diff. This is why a client accepts a written number.",
  },
  {
    id: "build",
    label: "Build",
    demoHref: "/demo/progress",
    happens:
      "The people who scoped it ship it. Findings stay open, closed, or deferred with an owner and a date.",
    receive: "Weekly written updates. Commits and environment status when they are connected.",
    sign: "Nothing new unless a change order lands.",
    see: "Progress, findings, and updates. Unwired integrations say “not connected.”",
  },
  {
    id: "handover",
    label: "Handover",
    demoHref: "/demo/handover",
    happens:
      "Runbook, credentials transfer, training. Then we revoke what we held. No hostage codebases — written down.",
    receive: "The runbook, the transfer log, the access revocation log, and the training.",
    sign: "Handover acceptance. Training is bundled into every Close.",
    see: "The revocation log with dates. Empty dates mean handover has not happened yet.",
  },
  {
    id: "standing",
    label: "Standing",
    demoHref: "/demo",
    happens:
      "Optional post-launch support, priced in writing. You can run it without us. Standing is if you want us, not because you have to.",
    receive: "A written standing agreement, or nothing. Both are fine.",
    sign: "Only if you take Standing.",
    see: "The stage tracker moves to Standing. The revocation log stays.",
  },
] as const;

export const crewGates = [
  {
    n: "01",
    title: "Structured technical interview",
    body: "A senior human, same rubric every candidate. Not a vibe check. Not a puzzle for its own sake.",
  },
  {
    n: "02",
    title: "Paid real-scope work sample",
    body: "Paid. Real scope. The kind of work a Close actually contains. Candidates are never charged a fee at any stage.",
  },
  {
    n: "03",
    title: "Blind two-peer review",
    body: "Two peers review independently. Both must agree. A single yes is not a pass.",
  },
  {
    n: "04",
    title: "Ninety days on live client work",
    body: "Under supervision, before the person is client-facing. No exceptions for urgency.",
  },
] as const;

export const standingReview =
  "Quarterly standing review against real delivered work — not a self-assessment, not a pulse survey.";

export const crewCommitments = [
  "Candidates are never charged a fee at any stage.",
  "No multiple-choice test is ever a pass/fail gate.",
  "Nobody is client-facing before Gate 4, no exceptions for urgency.",
] as const;

export const passRateNote =
  "Pass rate: tracking from our first cohort — published here once it's real.";

export const edpulseTracks = [
  {
    name: "Explorer",
    price: "$0",
    body: "The open path. Learn the Close discipline — arrival state, limits, a written scope — without paying to sit in a room.",
  },
  {
    name: "Accelerator",
    price: "$4,900",
    body: "A paid cohort that works a real-scope sample. Completing it does not skip the gates. It is practice for them.",
  },
  {
    name: "Mastery",
    price: "Custom",
    body: "For people already shipping. Scoped to the gap, priced in writing. Still the same four gates to join the crew.",
  },
] as const;

export const edpulseJoinNote =
  "Graduates who clear the four gates join the crew. Handover training is bundled into every Close — it is not an Edpulse upsell.";
