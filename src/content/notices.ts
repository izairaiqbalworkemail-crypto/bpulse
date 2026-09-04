import type { Notice } from "./types";

export const notices: Notice[] = [
  {
    id: "no-fake-metrics",
    question: "Where are your big numbers?",
    answer:
      "On the lots that have them, they are client-reported and traceable to the client's own site or engagement record. On the lots that do not — Mythos Archive and SBA 504 among them — there is no invented proof. A quiet number beats a false one.",
  },
  {
    id: "what-is-a-lot",
    question: "Why does every engagement read like an auction lot?",
    answer:
      "Because this is a condition report, not a marketing deck. Each lot records what arrived, what was wrong, and what it took to hold. The reference is a catalogue page: a real object, an honest condition note, a grade anchored to a date.",
  },
  {
    id: "what-happens-to-source",
    question: "What happens to the source I hand over?",
    answer:
      "It stays between us. During a Check we read it, map it, and report the condition. The condition report is yours. We do not publish a single line of your codebase to the catalogue without written consent.",
  },
  {
    id: "who-does-the-work",
    question: "Who actually does the work?",
    answer:
      "The named specialists on the team page. No subcontracting to strangers mid-build. If a specialist without a portrait is named, it is because we do not have a usable photograph of them yet — not because they are not real.",
  },
  {
    id: "what-we-wont-take",
    question: "What do you turn down?",
    answer:
      "Work where the honest condition is 'fine as it is'. We finish what starts — if nothing is stuck at eighty, there is nothing for us to do, and we will tell you so rather than bill you for finding nothing.",
  },
  {
    id: "what-are-we-bad-at",
    question: "What are you bad at?",
    answer:
      "Brand identity, marketing design, and anything that lives in the space between a product and its audience. We are engineers — we build and fix what exists. If you need a logo, a deck, or a go-to-market strategy, we will tell you who does that better than we do. We are also not cheap by local standards, and we will not pretend otherwise: the price reflects the seniority of the people doing the work.",
  },
];
