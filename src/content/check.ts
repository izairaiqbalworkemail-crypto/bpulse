import { offer } from "@/content/offer";
import type { RailStage } from "@/content/types";

export const checkDays: RailStage[] = [
  {
    id: "day-1",
    label: "Day 1 · Read",
    status: "upcoming",
    detail:
      "We read the codebase, the deployment, the docs, and whatever else you hand over. You receive a written inventory of what exists.",
  },
  {
    id: "day-2",
    label: "Day 2 · Trace",
    status: "upcoming",
    detail:
      "We trace the integration paths, the compliance constraints, and the data flows. You receive the first map of where the product pulls apart.",
  },
  {
    id: "day-3",
    label: "Day 3 · Map",
    status: "upcoming",
    detail:
      "We map the condition: what arrived, what is wrong, what it would take to hold. Every finding is sourced.",
  },
  {
    id: "day-4",
    label: "Day 4 · Grade",
    status: "upcoming",
    detail:
      "We grade the condition on arrival. Incomplete, stalled, integration-blocked, or unstable. Sound or unsound.",
  },
  {
    id: "day-5",
    label: "Day 5 · Report",
    status: "upcoming",
    detail:
      "You receive the condition report and the verdict: keep, repair, or rebuild.",
  },
];

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
