import type { RailStage } from "@/content/types";
import { ladderPrices, money } from "@/content/ladder";

export const chairPrices = {
  onCall: ladderPrices.standingMin,
  secondChair: 2400,
  team: ladderPrices.standingMax,
  audit: 4000,
} as const;

export const auditPrice = chairPrices.audit;

export const secondChair = {
  name: "Second Chair",
  assignedId: "hassan",
  problem: [
    "Most rescued products break again within a year.",
    "Not because the code was wrong.",
    "Because the team could not maintain it.",
  ],
  problemDek:
    "Handover is two weeks. Then the people who built it leave. The team that remains has to hold a system they did not write, and the next change is where it breaks.",
  promise: [
    "Every agency wants you dependent.",
    "This one is designed to make you not need us.",
  ],
  promiseWhat: [
    "A named engineer, the one who deployed into your product or one who knows it.",
    "They teach your team to maintain what was built and build the next thing themselves.",
    "Not a course. Not a platform. Capability transfer, after a deployment.",
    "Cancel any month. If it is working, you will stop needing it. That is the point.",
  ],
  teachLine:
    "You would work with Hassan. He owned the compliance-grade infrastructure on DeepIDV. He would teach your team on your repository, not a sample one.",
  concede:
    "A platform has a thousand courses. We have one engineer and your repository.",
} as const;

export const secondChairMonth: RailStage[] = [
  {
    id: "week-1",
    label: "Week 1 · Your repository",
    status: "upcoming",
    detail:
      "We read what you shipped since we left. The session is about your code, not a curriculum.",
  },
  {
    id: "week-2",
    label: "Week 2 · Review",
    status: "upcoming",
    detail:
      "Your team brings machine written code. We review it together against the criteria we use internally.",
  },
  {
    id: "week-3",
    label: "Week 3 · Shipping",
    status: "upcoming",
    detail:
      "Whatever is closest to production. Deploy path, rollback, what to check before it goes live.",
  },
  {
    id: "week-4",
    label: "Week 4 · Judgement",
    status: "upcoming",
    detail:
      "The decisions that came up this month. Which were two hour problems and which were two week ones.",
  },
];

export const secondChairSkills = [
  {
    name: "Prompting for real work",
    body: "Not tricks. Getting a model to do something specific to your stack, and verifying that it did.",
  },
  {
    name: "Reviewing machine written code",
    body: "The most valuable skill in 2026. What models get confidently wrong, and what never reaches production without a human.",
  },
  {
    name: "Shipping safely",
    body: "What a deploy path is, what staging is for, what to check before it goes live, how to roll back.",
  },
  {
    name: "Thinking like a senior",
    body: "Telling a two hour problem from a two week one, when to stop and ask, what done means.",
  },
] as const;

export const secondChairTiers = [
  {
    id: "handover",
    name: "Handover",
    price: "Included",
    meter: "Every deployment",
    body: "Two weeks with the engineer who built it. Recorded. Your team can run what we shipped.",
  },
  {
    id: "on-call",
    name: "On Call",
    price: `${money(ladderPrices.standingMin)} per month`,
    meter: "One named engineer, async",
    body: "Ask anything about your codebase, answered within one business day. One person. Cancel any month.",
  },
  {
    id: "second-chair",
    name: "Second Chair",
    price: `${money(chairPrices.secondChair)} per month`,
    meter: "Weekly sixty minutes, plus async",
    body: "Weekly session on your repository, plus async between. Up to three people. Cancel any month.",
  },
  {
    id: "team",
    name: "Second Chair Team",
    price: `${money(ladderPrices.standingMax)} per month`,
    meter: "Up to eight people",
    body: "Weekly session plus a monthly review of what your team shipped. Cancel any month.",
  },
  {
    id: "audit",
    name: "Capability Audit",
    price: money(auditPrice),
    meter: "Buyable on its own",
    body: "We read three months of your commits, pull requests and deploys against the same criteria we use for admission. Written report on what changed. No subscription required.",
  },
] as const;

export const secondChairAudit = {
  claim:
    "Training you cannot measure is a line item nobody defends at the next budget.",
  buyable: "Buyable on its own, with no subscription.",
  looks: [
    {
      name: "Review depth",
      body: "Are machine written pull requests actually reviewed.",
    },
    {
      name: "Deploy discipline",
      body: "Is anything reaching production unchecked.",
    },
    {
      name: "Test truthfulness",
      body: "Would the tests catch a real regression.",
    },
    {
      name: "Documentation",
      body: "Could someone new change this safely.",
    },
    {
      name: "Judgement",
      body: "Are the right things being escalated.",
    },
  ],
} as const;

export const secondChairCompare = {
  columns: ["Self paced", "Live cohort", "A large practice", "Second Chair"],
  rows: [
    {
      label: "Your codebase",
      cells: ["No", "No", "Sometimes", "Always"],
    },
    {
      label: "Who teaches",
      cells: ["Recorded", "A trainer", "A team", "The engineer who built it"],
    },
    {
      label: "Measured",
      cells: ["Completion", "Attendance", "Rarely", "Quarterly audit"],
    },
    {
      label: "Price per year",
      cells: [
        "Typically $400 to $800 per seat",
        "Typically $500 to $1,000 per seat",
        "Often $250,000 and up",
        `${money(ladderPrices.standingMin * 12)} to ${money(ladderPrices.standingMax * 12)}`,
      ],
    },
    {
      label: "Designed to end",
      cells: ["n/a", "n/a", "No", "Yes"],
    },
  ],
} as const;

export const secondChairQuestions = [
  {
    q: "What if our team is already good?",
    a: "Then the audit says so and you cancel. We would rather find that in month one.",
  },
  {
    q: "Is this how you keep us paying?",
    a: "It is cancellable monthly and the audit is buyable alone. If it were a retention device, neither would be true.",
  },
  {
    q: "What if the engineer leaves?",
    a: "Every session is recorded and every audit is written. The material survives the person, on both sides.",
  },
  {
    q: "We did not use you for the build.",
    a: "Then it starts with a Check. We cannot teach a codebase we have not read.",
  },
  {
    q: "What is this actually bad at?",
    a: "It does not work for a team under real deadline pressure who cannot protect an hour a week. If you cannot hold the hour, do not buy the month.",
  },
] as const;

/** No client has bought Second Chair yet. Proof does not render. */
export const secondChairProof: readonly { quote: string; name: string; role: string }[] =
  [];
