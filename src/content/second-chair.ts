import type { RailStage } from "@/content/types";

export const secondChair = {
  name: "Second Chair",
  assignedId: "hassan",
  reframe:
    "The most common reason a rescued product breaks again is that the team can't maintain it. We finish it. Then we make sure you can keep it.",
  description:
    "A named senior engineer, on your repo. Not a course. Insurance on the build.",
} as const;

export const secondChairMonth: RailStage[] = [
  {
    id: "week-1",
    label: "Week 1 · The repo",
    status: "upcoming",
    detail:
      "The assigned engineer walks your codebase with you. What is load-bearing, what is leftover, what nobody should touch yet.",
  },
  {
    id: "week-2",
    label: "Week 2 · Review",
    status: "upcoming",
    detail:
      "You review machine-written and human-written diffs together. What a model gets confidently wrong. What never ships without a person.",
  },
  {
    id: "week-3",
    label: "Week 3 · The path",
    status: "upcoming",
    detail:
      "Staging, the deploy, the rollback. What to check before it goes live. How to tell a two-hour problem from a two-week one.",
  },
  {
    id: "week-4",
    label: "Week 4 · Hold",
    status: "upcoming",
    detail:
      "Your team ships a change. The session is a review of what went out, recorded so it survives the next person.",
  },
];

export const secondChairSkills = [
  {
    name: "Prompting for real work",
    body: "Not tricks. How to get a model to do something specific to your stack, and how to verify that it did.",
    example:
      "A support RAG that cites the wrong policy page. The session is how to pin the prompt to the file that is actually in the repo.",
  },
  {
    name: "Reviewing machine-written code",
    body: "The single most valuable skill this year. What to look for. What a model gets confidently wrong. What never reaches production without a human.",
    example:
      "An auth helper that looks finished and fails on the expired-token path. The session is the review, not the generate.",
  },
  {
    name: "Shipping safely",
    body: "What a deploy path is, what staging is for, what to check before it goes live, how to roll back.",
    example:
      "A Friday deploy that cannot be undone. The session is the checklist Hassan already runs on hospital and verification traffic.",
  },
  {
    name: "Thinking like a senior",
    body: "How to tell a two-hour problem from a two-week one, when to stop and ask, what done means.",
    example:
      "A 'quick' schema change that would lock the table. The session is stopping before the migration runs.",
  },
] as const;

export const secondChairTiers = [
  {
    name: "Handover training",
    price: "Included in every Close",
    body: "Two weeks with the engineer who built it. Recorded. Your team can run what we shipped.",
    featured: false,
  },
  {
    name: "Second Chair",
    price: "$2,400/month",
    body: "A named senior, weekly. Async between sessions. Curriculum from your codebase.",
    featured: true,
  },
  {
    name: "Second Chair · Team",
    price: "$6,000/month",
    body: "Up to six people. Weekly session plus a monthly review of what your team shipped that month.",
    featured: false,
  },
] as const;

/** No client has bought Second Chair yet. Proof does not render. */
export const secondChairProof: readonly { quote: string; name: string; role: string }[] =
  [];
