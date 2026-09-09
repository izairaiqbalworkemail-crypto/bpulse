import { specialists } from "@/content/specialists";
import type { SignalId } from "@/content/signals";

/**
 * Homepage chapters. Every figure traces to offer, lots, process, or notices.
 * Never name a marketplace.
 */

/** A H1 segment. Plain strings render as-is; `{ mark }` renders in the state colour. */
export type ClaimSegment =
  | string
  | { mark: string; tone: "stuck" | "diag" | "build" | "ship" };

export const pulseCopy = {
  n: "01",
  kicker: "Lahore studio",
  claim: ["Your build is ", { mark: "stuck", tone: "stuck" }, " at 80%"] as const,
  dek: "The last twenty percent eats calendars and confidence. That is where we work.",
  primary: "Get my free read",
  primaryHref: "/read",
  secondary: "See the work",
  secondaryHref: "/work",
  trust: [
    "fixed scope",
    "named people",
    "pay at handover",
    "a live portal",
  ] as const,
  portalHead: "bpulse/portal",
  portalRows: [
    { tone: "diag", label: "scope", value: "locked" },
    { tone: "build", label: "build", value: "watching" },
    { tone: "stuck", label: "the stall", value: "80%" },
    { tone: "ship", label: "handover", value: "cash ready" },
  ] as const,
  portalLegend: "url yours alone · watch every commit",
  portalUrl: "portal.bpulse.pk/u/v-7f",
  baseline: "the read is free · nothing on it asks for a meeting",
} as const;

export const whereCopy = {
  n: "02",
  kicker: "Start",
  heading: "Start at the matching offer.",
  dek: "If you are not sure, start at the Read.",
  recommended: "recommended",
  rows: [
    {
      if: "Not sure where you are",
      start: "The Read",
      href: "/read",
      recommended: true,
    },
    {
      if: "An idea, no code",
      start: "The Session",
      href: "/session",
      recommended: false,
    },
    {
      if: "A prototype that must become real",
      start: "The First Slice",
      href: "/first-slice",
      recommended: false,
    },
    {
      if: "A build that will not ship",
      start: "The Check",
      href: "/check",
      recommended: false,
    },
    {
      if: "A finished scope and a deadline",
      start: "The Close",
      href: "/how-it-works",
      recommended: false,
    },
    {
      if: "Shipped, team cannot maintain it",
      start: "Second Chair",
      href: "/second-chair",
      recommended: false,
    },
  ],
} as const;

export const suggestCopy = {
  kicker: "Suggestion",
  heading: "What is stuck.",
  dek: "Tap what is true, or write it. We name a start, a price, and a person. The Read is free if this is wrong.",
  picks: "What is true",
  write: "Or write it",
  placeholder: "It has been on staging for months. One person knows the release.",
  action: "Suggest my start",
  empty: "Tap a situation, or say what is stuck.",
  because: "If this is true",
  next: "Get my free read",
  match: "See the full match",
  matchHref: "/match",
} as const;

export const visibilityCopy = {
  n: "03",
  kicker: "Portal",
  heading: "A login you can watch.",
  dek: "Scope, progress, and the revocation log. Sample data. No account.",
  sample: "Sample",
  open: "Show me the sample",
  openHref: "/demo",
  vacant: "not yet",
  revocationNote: "Nothing revoked yet, this engagement is in build.",
  panes: [
    { id: "scope", label: "Scope lock", href: "/demo/scope" },
    { id: "progress", label: "Progress", href: "/demo/progress" },
    { id: "revocation", label: "Revocation log", href: "/demo/handover" },
  ],
} as const;

export const readingSymptoms = [
  {
    key: "staging-only" as const,
    signal: "staging-only" as SignalId,
    verdict: "Incomplete",
    label: "It only runs on staging",
  },
  {
    key: "no-deploy-path" as const,
    signal: "no-deploy-path" as SignalId,
    verdict: "Unshipped",
    label: "There is no path to production",
  },
  {
    key: "single-point-knowledge" as const,
    signal: "single-point-knowledge" as SignalId,
    verdict: "Fragile",
    label: "One person knows it",
  },
  {
    key: "no-release-owner" as const,
    signal: "no-release-owner" as SignalId,
    verdict: "Ownerless",
    label: "Nobody owns the release",
  },
  {
    key: "scope-unbounded" as const,
    signal: "scope-unbounded" as SignalId,
    verdict: "Unbounded",
    label: "It has been at ninety percent for months",
  },
  {
    key: "third-party-sprawl" as const,
    signal: "third-party-sprawl" as SignalId,
    verdict: "Integration-blocked",
    label: "The integrations will not hold",
  },
] as const;

export const readingNote =
  "A rough self-check. The written Read is free and arrives in one business day.";

export const ledgerRows = [
  {
    label: "What you get",
    they: "A person",
    we: "A finished product",
  },
  {
    label: "Who manages the work",
    they: "You",
    we: "We do",
  },
  {
    label: "What it costs",
    they: "Quoted after a call",
    we: "Published band",
  },
  {
    label: "Their margin",
    they: "Not disclosed",
    we: "Fixed scope, one number",
  },
  {
    label: "The vetting",
    they: "Self-reported acceptance %",
    we: "Published standard. Gate line per person",
  },
  {
    label: "If it goes wrong",
    they: "A replacement engineer",
    we: "Our scope, our problem",
  },
  {
    label: "What you can see",
    they: "Status updates",
    we: "A live portal",
  },
] as const;

export const ledgerConcede = {
  they: `Thousands of engineers`,
  we: `${specialists.length} named people`,
  note: "They have a network. We have twelve. That is the honest row.",
} as const;

export const homeQuestions = [
  {
    q: "What are you bad at?",
    a: "Brand identity, marketing design, and anything that lives between a product and its audience. We are engineers. We build and fix what exists. If you need a logo, a deck, or a go-to-market, we will tell you who does that better. We also turn down work that is fine as it is: if nothing is stuck at eighty, there is nothing for us to do.",
  },
  {
    q: "Why are you cheaper than a US studio?",
    a: "The Read is free. The Session is $400. The Check is $1,500. A Close is a published band, agreed in writing. We are a studio in Lahore, not a US firm with US overhead. We are also not cheap by local standards: the price is the seniority of the people on the keyboard.",
  },
  {
    q: "What happens if you disappear?",
    a: "You already have the repo. Handover writes the runbook and the access revocation log. You can watch a working sample of that log before you pay anything.",
  },
  {
    q: "Who owns the code?",
    a: "You do. The sample portal shows an IP assignment in the documents drawer. We revoke what we held on handover day. No hostage codebases.",
  },
  {
    q: "You are twelve people. What if my project is bigger?",
    a: "Then the Check says so. We take work the named crew can finish. If the honest read is that you need a bench we do not have, we will write that down rather than staff a fiction.",
  },
] as const;

export const termsCredit =
  "The Check may conclude you do not need us. The fee is still credited or returned.";

export const proofCopy = {
  n: "04",
  kicker: "Proof",
  heading: "Tap what is true.",
  dek: "Two that match a published case will open it.",
  empty: "Two or more that match a published case will open it.",
  skip: "Or skip this. The Read is free.",
  skipHref: "/read",
  none: "No published case shares two of these yet.",
  other: "A published case shares this. It is on Work.",
  open: "Read the case",
  featuredSlug: "deepidv",
} as const;

export const happensCopy = {
  n: "05",
  kicker: "What happens",
  heading: "Read, diagnose, build, handover.",
  dek: "What we do, what you sign, what you receive.",
  stages: [
    {
      id: "read",
      label: "Read",
      do: "You describe what is stuck. A senior engineer writes back: what we think is happening, what we would look at, and what we could not tell from your description.",
      sign: "Nothing. The Read is free.",
      receive: "A written read at a private URL, within one business day.",
    },
    {
      id: "diagnose",
      label: "Diagnose",
      do: "Five days inside your repository. A written verdict: keep, repair or rebuild, with what each would take.",
      sign: "Payment for the Check. Credited in full against a build in 30 days.",
      receive: "The written report, a readout, and a fixed quote if you want the work.",
    },
    {
      id: "build",
      label: "Build",
      do: "The people who scoped it ship it. Scope stays locked. A change is a change order, priced and re-signed.",
      sign: "The locked scope, and each change order after that.",
      receive: "Weekly written updates. A login. Commits when they are connected.",
    },
    {
      id: "handover",
      label: "Handover",
      do: "Runbook, credentials transfer, training. Then we revoke what we held.",
      sign: "Handover acceptance. Training is bundled into every Close.",
      receive: "The runbook, the transfer log, the access revocation log, and the training.",
    },
  ],
} as const;

export const termsCopy = {
  n: "06",
  kicker: "Terms",
  heading: "Every price, published.",
  route:
    "If you have an idea and no code, start at the Session. If you are not sure, start at the Read.",
  recommended: "recommended",
} as const;

export const whoCopy = {
  n: "07",
  kicker: "Who",
  heading: "Named people. A published standard.",
  ids: ["hassan", "aneeb", "mehak"] as const,
  standard: [
    "Gate 0 pass threshold: tracking from our first cohort, published once we have enough scored submissions.",
    "Nobody is client-facing before Gate 4. No exceptions for urgency.",
    "Candidates are never charged a fee at any stage.",
  ],
  standardHref: "/standard",
  standardLabel: "Read the standard",
} as const;

export const afterCopy = {
  n: "08",
  kicker: "After",
  heading: "Built so you do not need us.",
  lede: "Your repo, your keys, your team taught on your code. Then we revoke what we held.",
  engineerId: "hassan",
  teach:
    "You would work with Hassan. He owned the compliance-grade infrastructure on DeepIDV. He would teach your team on your repository, not a sample one.",
  track: [
    { step: "01", title: "Your repo", note: "Yours from the first commit. No hostage code." },
    { step: "02", title: "Your keys", note: "Documented access, revoked on handover day." },
    { step: "03", title: "Your team", note: "Taught on your code, on your join, not a deck." },
    { step: "04", title: "The door", note: "You can cancel any month. No departing fee." },
  ] as const,
  proof: "Proof we revoke: watch the access log on the sample portal before you pay anything.",
  cancel: "Cancel any month.",
  standing: "Pay month to month,",
  href: "/second-chair",
  open: "See how Second Chair works",
  linked: "Hassan · DevOps · the handover partner",
} as const;

export const doubtCopy = {
  n: "09",
  kicker: "Questions",
  heading: "What we are bad at.",
  dek: "Straight answers. The first question is the honest one.",
  band: "Not sure yet?",
  bandNote:
    "The Read is free, lands in one business day, and tells you in writing what is actually stuck.",
  ask: "Get my free read",
  askHref: "/read",
} as const;

export const footerNav = {
  work: [
    { label: "Work", href: "/work" },
    { label: "Team", href: "/team" },
    { label: "Process", href: "/how-it-works" },
    { label: "Match", href: "/match" },
  ],
  start: [
    { label: "The Read", href: "/read" },
    { label: "The Session", href: "/session" },
    { label: "The Check", href: "/check" },
    { label: "The First Slice", href: "/first-slice" },
    { label: "Pricing", href: "/pricing" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "The standard", href: "/standard" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Legal", href: "/legal" },
    { label: "Where data goes", href: "/legal/data" },
    { label: "Terms", href: "/legal/terms" },
    { label: "Privacy", href: "/legal/privacy-policy" },
  ],
} as const;
