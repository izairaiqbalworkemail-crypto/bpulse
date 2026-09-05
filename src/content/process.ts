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
    n: "00",
    title: "The diagnostic",
    mechanism:
      "Async written diagnostic in a 48-hour window. Broken repo, logs, and brief. Candidate writes a condition report with limits required.",
    costs: "Near-zero marginal cost at volume, before any senior interview time is spent.",
    proves: "They can read someone else's mess and say something true, specific, and bounded.",
  },
  {
    n: "01",
    title: "Structured technical interview",
    mechanism:
      "A senior human, same rubric every candidate. About 90 minutes within one week.",
    costs: "Two senior hours per candidate, every time. We do not outsource the first filter.",
    proves: "They can think in front of another senior. Not a vibe. Not a puzzle for its own sake.",
  },
  {
    n: "02",
    title: "Paid real-scope work sample",
    mechanism:
      "Paid. Real scope. The kind of work a Close actually contains. Candidates are never charged a fee at any stage.",
    costs: "We pay for the sample. That is cash out the door before anyone is on a client.",
    proves: "They can ship a slice of the work we sell, not a toy repo.",
  },
  {
    n: "03",
    title: "Blind two-peer review",
    mechanism: "Two peers review the sample independently. Both must agree. A single yes is not a pass.",
    costs: "Four more senior hours, and the right to lose a candidate we already paid.",
    proves: "The work holds when the interviewer is not in the room.",
  },
  {
    n: "04",
    title: "Ninety days on live client work",
    mechanism:
      "Supervised live client work before the person is client-facing. No exceptions for urgency.",
    costs:
      "Ninety days of senior supervision on a paying Close. This is the expensive gate. That is why it is the credible one.",
    proves: "They can hold a real engagement without becoming a risk to the client.",
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
  "Gate 0 pass threshold: tracking from our first cohort - published once we have enough scored submissions.";

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
    body: "For people already shipping. Scoped to the gap, priced in writing. Still the same five gates to join the crew.",
  },
] as const;

export const edpulseJoinNote =
  "Graduates who clear the five gates join the crew. Handover training is bundled into every Close — it is not an Edpulse upsell.";
