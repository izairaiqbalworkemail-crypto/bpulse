import { offer } from "@/content/offer";

export const checkDays = [
  {
    day: "Day 1",
    title: "Access and orientation",
    body: "Repo, environments, deploy history, a 45-minute call with whoever built it. You receive nothing today.",
  },
  {
    day: "Day 2",
    title: "Reading",
    body: "Every entry point, the deploy path, the data layer, the auth surface. Findings start being filed.",
  },
  {
    day: "Day 3",
    title: "Pressure",
    body: "We try to run it the way your users will. What breaks is the report.",
  },
  {
    day: "Day 4",
    title: "Drafting",
    body: "Findings ranked by what actually blocks launch. Scoping what closing each one takes.",
  },
  {
    day: "Day 5",
    title: "Delivery",
    body: "The written report, a 45-minute readout, and a fixed quote for the work if you want it.",
  },
] as const;

export const offerTiers = [
  {
    name: offer.check.name,
    price: `$${offer.check.price.toLocaleString("en-US")}`,
    body: `${offer.check.duration}. ${offer.check.description}`,
    featured: true,
  },
  {
    name: offer.close.name,
    price: offer.close.priceRange,
    body: offer.close.description,
    featured: false,
  },
  {
    name: offer.standing.name,
    price: offer.standing.priceRange,
    body: offer.standing.description,
    featured: false,
  },
];

export const checkBadOutcome =
  "The Check may conclude that you do not need us. The product is messy but holding, and a week of senior cleanup would finish it — no studio required. We will tell you that. The fee is still credited on a Close invoice within 30 days, or returned if you do not take a Close.";

export const checkRunner = {
  id: "aneeb",
  line: "Founder readout on day 5. The person who scopes a Close is the person who signs the report.",
};

export const checkNoHandoff =
  "The person who reads your build is the person who would lead the work. There is no handoff between the Check and the build.";

export const checkOffer = {
  verdict:
    "A written verdict — keep, repair or rebuild — with what each would take.",
  credit: "Credited in full against a build within 30 days.",
  facts: [
    "5 days",
    "1 senior engineer",
    "written verdict",
    "credited in 30",
  ],
} as const;

export const checkGenericStarts = [
  {
    look: "Whether a production environment has ever existed",
    why: "Most unfinished products have never left staging.",
  },
  {
    look: "How the auth is wired, and whether it is written down anywhere",
    why: "Handover dies here more often than in the feature list.",
  },
  {
    look: "Staging and production drift",
    why: "What works in one environment is not the product.",
  },
  {
    look: "Who owns the release, and whether a deploy path exists",
    why: "A build without an owner does not ship.",
  },
] as const;

export const checkQuestions = [
  {
    q: "What if the verdict is “rebuild”?",
    a: "Then we say so, and we tell you what it costs. You are free to take that to anyone.",
  },
  {
    q: "What if you find nothing?",
    a: "It has happened. We refund the fee and say so in writing.",
  },
  {
    q: "Is this a way to sell me a build?",
    a: "It's credited against one, so it's cheaper for us if you build. It's also the reason we can be honest — we're not paid to find problems.",
  },
  {
    q: "Who owns the report?",
    a: "You do. Take it to another studio if you want.",
  },
  {
    q: "What if we're not ready to start?",
    a: "The credit lasts 30 days. After that the report is still yours.",
  },
  {
    q: "You're in Lahore. Why should I trust this?",
    a: "The studio is in Lahore. The engineer who would read your repo is named on this page, with a public record you can open. The price is published. The report is yours to take anywhere. If the verdict is keep, we say so and refund. Distance is real. The work is the same: one senior engineer reads the build and writes what they found.",
  },
] as const;

export const checkNext = {
  heading: "What happens next",
  steps: [
    "You reserve a slot. No payment yet.",
    "We confirm within one business day and send an invoice.",
    "Payment clears, we agree a start date.",
    "Day 1 begins.",
  ],
  pay: "We take bank transfer and card. If your procurement needs a PO or a W-8BEN, say so and we'll have it ready before the invoice.",
} as const;
