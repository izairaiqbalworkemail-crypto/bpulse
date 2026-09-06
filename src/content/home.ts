import { specialists } from "@/content/specialists";
import type { SignalId } from "@/content/signals";

/**
 * Homepage chapters. Every figure traces to offer, lots, process, or notices.
 * Never name a marketplace.
 */

export const pulseCopy = {
  n: "01",
  kicker: "THE PULSE",
  claim: ["Everyone gets to 80%.", "We ship the rest."] as const,
  dek: "They vet the person. We're accountable for the product.",
  primary: "Start the Check",
  secondary: "Open a live sample",
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
  "A rough self-check. The real read takes five days.";

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
    q: "Why are you cheaper than a US studio?",
    a: "The Check is $1,500. A Close is a published band, agreed in writing. We are a studio in Lahore, not a US firm with US overhead. We are also not cheap by local standards: the price is the seniority of the people on the keyboard.",
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
    q: "You're twelve people — what if my project is bigger?",
    a: "Then the Check says so. We take work the named crew can finish. If the honest read is that you need a bench we do not have, we will write that down rather than staff a fiction.",
  },
  {
    q: "Why should I trust a studio in Lahore?",
    a: "You should not, on the city. You should open the lots, read the standard, and watch the sample portal. The people are named. The prices are on this page.",
  },
  {
    q: "What are you bad at?",
    a: "Brand identity, marketing design, and anything that lives between a product and its audience. We are engineers — we build and fix what exists. If you need a logo, a deck, or a go-to-market, we will tell you who does that better. We also turn down work that is fine as it is: if nothing is stuck at eighty, there is nothing for us to do.",
  },
] as const;

export const termsCredit =
  "The Check may conclude you don't need us. The fee is still credited or returned.";
