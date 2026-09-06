/**
 * The published ladder. One source for every price on the site.
 * Never discount. Never invent a market statistic as ours.
 */

export const ladderPrices = {
  read: 0,
  session: 400,
  check: 1500,
  slice: 7500,
  closeMin: 18000,
  closeMax: 95000,
  standingMin: 900,
  standingMax: 6000,
} as const;

export function money(n: number) {
  return `$${n.toLocaleString("en-US")}`;
}

export const closeRange = `${money(ladderPrices.closeMin)} to ${money(ladderPrices.closeMax)}`;
export const standingRange = `${money(ladderPrices.standingMin)} to ${money(ladderPrices.standingMax)} per month`;

export const noDiscount =
  "These are the prices. They are the same for everyone. We do not discount and we do not quote differently depending on who is asking.";

export const ladder = [
  {
    id: "read",
    name: "The Read",
    price: "Free",
    meter: "One business day",
    body: "You describe what is stuck. We write back a real read: what we think is happening, what we would look at, and what we could not tell from your description.",
    credit: "Nothing on it asks for a meeting.",
    href: "/read",
  },
  {
    id: "session",
    name: "The Session",
    price: money(ladderPrices.session),
    meter: "Ninety minutes",
    body: "Ninety minutes with a senior engineer, on your actual problem. You leave with a written scope and a range.",
    credit: "Credited against anything you buy in 30 days.",
    href: "/session",
  },
  {
    id: "check",
    name: "The Check",
    price: money(ladderPrices.check),
    meter: "Five business days",
    body: "Five days inside your repository. A written verdict: keep, repair or rebuild, with what each would take.",
    credit: "Credited in full against a build in 30 days.",
    href: "/check",
  },
  {
    id: "slice",
    name: "The First Slice",
    price: money(ladderPrices.slice),
    meter: "Two weeks",
    body: "One thing that works, in production, that you can show someone. Fixed price, fixed scope.",
    credit: "A beginning, not a finish.",
    href: "/first-slice",
  },
  {
    id: "close",
    name: "The Close",
    price: closeRange,
    meter: "Fixed scope",
    body: "The full deployment. Fixed scope, agreed in writing before any code.",
    credit: "The band is published. The number for your matter is written before we start.",
    href: "/how-it-works",
  },
  {
    id: "standing",
    name: "Standing",
    price: standingRange,
    meter: "After launch",
    body: "After launch, until you do not need us.",
    credit: "Optional. You can run it without us.",
    href: "/second-chair",
  },
] as const;

export type LadderRung = (typeof ladder)[number];
