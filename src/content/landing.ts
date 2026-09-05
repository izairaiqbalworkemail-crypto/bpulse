import { offer } from "@/content/offer";

/**
 * Home episodes. Every line is a control the buyer keeps,
 * or a condition already on the record. No invented figures.
 */
export const controlCards = [
  {
    title: "Nothing starts until you sign the lock",
    body: "Scope is written and signed before any code. A change is a change order — priced and re-signed. Nothing is absorbed silently.",
    href: "/demo/scope",
    label: "See a locked scope",
  },
  {
    title: "You watch every day of it",
    body: "Findings, commits, days on the clock — the same portal as the window above. Sample data is labelled sample throughout.",
    href: "/demo",
    label: "Open the sample portal",
  },
  {
    title: "The people who scope it ship it",
    body: "No handoff to strangers mid-build. The name on the Check is the name on the Close.",
    href: "/team",
    label: "Meet the crew",
  },
  {
    title: "You leave with the keys",
    body: "Runbooks, not guesswork. The codebase is yours. Handover is the point of the engagement, not an extra.",
    href: "/how-it-works",
    label: "How handover works",
  },
] as const;

/** One-line locks for the home plate. Full cards live in controlCards. */
export const homeLocks = [
  { title: "You sign the lock first", href: "/demo/scope" },
  { title: "You watch every day", href: "/demo" },
  { title: "Same hands throughout", href: "/team" },
  { title: "You leave with the keys", href: "/how-it-works" },
  { title: "Matched against the record", href: "/match" },
] as const;

/** Five Check days, names only — the essays live on /check. */
export const homeDays = ["Read", "Trace", "Map", "Grade", "Report"] as const;

export const homeLots = ["deepidv", "sully", "wearmeout"] as const;

/**
 * The six wounds behind the Trace. Verdict and prefill copy are
 * on-record wording from /check (incomplete, stalled,
 * integration-blocked, unstable, unsound). Situation ids keep the
 * intake seed mapping to the ConditionDesk situations.
 */
export const fitSymptoms = [
  {
    key: "staging-only" as const,
    label: "won't deploy",
    verdict: "Incomplete",
    situation: "stalled" as const,
    note: "It is built and staged. It still will not deploy.",
  },
  {
    key: "ghosted-dev" as const,
    label: "dev ghosted",
    verdict: "Stalled",
    situation: "stalled" as const,
    note: "The last person left. The build did not.",
  },
  {
    key: "single-owner" as const,
    label: "one person knows it",
    verdict: "Single point of failure",
    situation: "fragile" as const,
    note: "One person holds it. Nothing ships without them.",
  },
  {
    key: "almost-done" as const,
    label: "90% for months",
    verdict: "Integration-blocked",
    situation: "almost" as const,
    note: "It has been at ninety percent for months. The last part will not ship.",
  },
  {
    key: "real-data-break" as const,
    label: "dies on real data",
    verdict: "Unsound",
    situation: "fragile" as const,
    note: "It holds in the demo and breaks on real data.",
  },
  {
    key: "no-release-owner" as const,
    label: "no one owns release",
    verdict: "Ownerless",
    situation: "stalled" as const,
    note: "Nobody owns the release. It cannot reach production.",
  },
] as const;

export const homePath = [
  {
    name: offer.check.name,
    meter: `$${offer.check.price.toLocaleString("en-US")} · ${offer.check.duration}`,
    body: offer.check.description,
    href: "/check",
    label: "How the five days work",
    image: "/team/aneeb.jpg",
  },
  {
    name: offer.close.name,
    meter: `${offer.close.priceRange} · locked scope`,
    body: offer.close.description,
    href: "/how-it-works",
    label: "The six stages",
    image: "/project-shots/project-sully.png",
  },
  {
    name: offer.standing.name,
    meter: `${offer.standing.priceRange} · optional`,
    body: "You can run it without us. Standing is if you want us, not because you have to.",
    href: "/how-it-works",
    label: "After handover",
    image: "/team/hassan.jpg",
  },
] as const;

export const homeCrew = [
  "aneeb",
  "fizza",
  "najiullah",
  "hassan",
  "suhaib",
  "moiz",
] as const;

export const holdCards = [
  {
    title: "Done means deployed",
    body: "Not a staging URL that looks finished. Real users, a real URL, and a product you can show without a screenshot.",
    proof: "WearMeOut arrived looking done in demo mode. The last pass was production. It is live.",
    href: "/work/wearmeout",
    lot: "WearMeOut.ai",
  },
  {
    title: "The same hands, through production",
    body: "The seniors who meet you stay on the keyboard. No juniors learning at your expense.",
    proof: "Aneeb scoped Sully and stayed on the build through HIPAA production.",
    href: "/work/sully",
    lot: "Sully.ai",
  },
  {
    title: "No hostage codebases",
    body: "You walk away with a codebase you can run without us. You are never locked in.",
    proof: "SBA 504 shipped with a clean ownership handover. The hub runs without us.",
    href: "/work/sba504",
    lot: "SBA 504 Loan Hub",
  },
  {
    title: "It has to hold after we leave",
    body: "We are paid to reach production, not to send an invoice and disappear.",
    proof: "myUsta arrived unlaunched. It shipped on iOS and Android, Albania-wide.",
    href: "/work/myusta",
    lot: "myUsta",
  },
] as const;
