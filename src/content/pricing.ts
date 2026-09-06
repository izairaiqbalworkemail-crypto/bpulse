import {
  closeRange,
  ladder,
  ladderPrices,
  money,
  noDiscount,
  standingRange,
} from "./ladder";

/**
 * /pricing. One page, every published price, no form to see them.
 */

export const pricingLadder = [
  {
    id: "read",
    name: "The Read",
    price: "Free",
    href: "/read",
    body: "Describe what is stuck. We write back a real read in one business day. No call, no form beyond your email.",
  },
  {
    id: "session",
    name: "The Session",
    price: money(ladderPrices.session),
    href: "/session",
    body: "Ninety minutes with a senior engineer on your actual problem. You leave with a written scope and a range. Credited against anything you buy in 30 days.",
  },
  {
    id: "check",
    name: "The Check",
    price: money(ladderPrices.check),
    href: "/check",
    body: "Five days inside your repository. Keep, repair or rebuild, in writing, with what each would take. Credited in full against a build in 30 days.",
  },
  {
    id: "slice",
    name: "The First Slice",
    price: money(ladderPrices.slice),
    href: "/first-slice",
    body: "Two weeks. One thing that works, in production, that you can show someone. Fixed price, fixed scope.",
  },
  {
    id: "close",
    name: "The Close",
    price: closeRange,
    href: "/how-it-works",
    body: "The full deployment. Fixed scope agreed in writing before any code.",
  },
  {
    id: "standing",
    name: "Standing",
    price: standingRange,
    href: "/second-chair",
    body: "After launch, until you do not need us.",
  },
] as const;

export const pricingRule = {
  statement: noDiscount,
  why: [
    "A ladder means nobody has to negotiate.",
    "A published price means you know what you are getting before you talk to anyone.",
  ],
} as const;

export const pricingRoute = [
  { if: "An idea and no code", start: "The Session", href: "/session" },
  { if: "A build that will not deploy", start: "The Check", href: "/check" },
  {
    if: "A prototype that needs to become real",
    start: "The First Slice",
    href: "/first-slice",
  },
  { if: "A finished scope and a deadline", start: "The Close", href: "/how-it-works" },
  {
    if: "Something we shipped, and questions",
    start: "Standing",
    href: "/second-chair",
  },
  { if: "No idea where you are", start: "The Read", href: "/read" },
] as const;

export const pricingIncluded = {
  note: "None of this is an upsell.",
  items: [
    "Fixed scope in writing before any code",
    "Scope locked and versioned, every change priced and re-signed",
    "A named engineer, with a published credential",
    "Live progress in the portal, read from the repository",
    "IP assigned in writing",
    "Access revoked at handover, with a dated log",
    "Handover training in every deployment",
  ],
} as const;

export const pricingExcluded = [
  {
    title: "Design",
    body: "We are engineers. If you need a brand or a product designer, we will say so and help you find one.",
  },
  {
    title: "Ongoing feature work at agency scale",
    body: "Above eight people we are the wrong shape.",
  },
  {
    title: `Anything under ${money(ladderPrices.session)}`,
    body: "We do not do free scoping calls, and The Read is where free ends.",
  },
] as const;

export const pricingPay = {
  steps: [
    "You reserve. No payment yet.",
    "We confirm within one business day and invoice.",
    "Payment clears, we agree a start date.",
    "Work begins.",
  ],
  note: "Bank transfer and card. If procurement needs a PO or a W-8BEN, say so and it will be ready before the invoice.",
} as const;

export const pricingQuestions = [
  {
    q: "Why credited and not refunded?",
    a: "The Session and the Check credit against anything you buy in 30 days because the work is used if you continue. If the Check says keep and you do not build, the fee is returned. Credit is the default. A refund is the honest exit.",
  },
  {
    q: "What happens if the scope changes?",
    a: "Scope is locked and versioned. Every change is priced and re-signed before we do it. Nothing moves on a handshake.",
  },
  {
    q: "Does the price change if you are in the EU?",
    a: "No. These are the prices, in US dollars, the same for everyone. What changes for an EU client is the paperwork: Standard Contractual Clauses, because Pakistan has no EU adequacy decision. That is a legal fact, not a surcharge.",
  },
  {
    q: "What if we are wrong about the estimate?",
    a: "A Close is a fixed number, written before any code. If the work will not fit that number, we say so before we start, not after. The Session and the Check exist so that number is not a guess.",
  },
  {
    q: "Why are you cheaper than a US studio?",
    a: `The Read is free. The Session is ${money(ladderPrices.session)}. The Check is ${money(ladderPrices.check)}. A Close is a published band, agreed in writing. We are a studio in Lahore, not a US firm with US overhead. We are also not cheap by local standards: the price is the seniority of the people on the keyboard.`,
  },
] as const;

export const pricingStart = {
  heading: "The Read.",
  line: "If you do not know which rung, start free.",
  href: "/read",
  label: "Start",
} as const;

export const pricingRungIds = pricingLadder.map((rung) => rung.id);

/** Keep the page ladder aligned with the canonical six rungs. */
export const pricingMatchesLadder = pricingLadder.every(
  (rung, index) => rung.id === ladder[index]?.id && rung.href === ladder[index]?.href,
);
