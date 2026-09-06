/**
 * First-60-word framing for every interior page.
 * Each sentence says what the page is a view into.
 */
export const pageFrame = {
  howItWorks:
    "This page is the platform end to end: intake, assignment, scope lock, build, handover, standing. You engage a process. People execute it.",
  work: "This is the delivery record the platform maintains. Every engagement shows who was assigned, and how the work arrived.",
  workSlug:
    "This is the platform’s file on one engagement. Assignment first. Outcome and limits at equal weight.",
  team: "These twelve people have cleared the standard. The platform assigns from this bench. A missing photograph is initials, not a hole.",
  teamSlug:
    "This is the platform’s assignment record for a named person: admission, engagements on file, signals closed, and a direct line.",
  match:
    "Describe what’s stuck. The platform assigns from the record — who has closed those signals, and why.",
  check:
    "The Check is the platform’s way in. $1,500. Five business days. A written verdict — keep, repair or rebuild — and a real report on this page, readable in full.",
  standard:
    "Admission. How the platform decides who is client-facing. Five gates, then quarterly standing review.",
  demo: "This is the platform, live, with sample data. Eight views of a locked Close. Nothing here is a live engagement.",
  secondChair:
    "Capability transfer. The platform does not leave you dependent. Handover training is bundled into every Close; Second Chair is optional after.",
  careers:
    "Applying to the standard. Five gates, what each costs us, and no candidate fee — said here, in public.",
  notices:
    "The uncomfortable questions, all visible. The last one is what the platform is bad at.",
  contact:
    "An intake the platform routes. Aneeb Iqbal reads it within one business day.",
  security:
    "Operational claims on this page trace to the same facts in /legal.",
  legal:
    "The forms the platform actually signs. Every claim here traces to a named document.",
  legalData:
    "Where data lives, what leaves Pakistan, and why EU and UK clients need Standard Contractual Clauses. Pakistan has no enacted data protection law. We say that here.",
} as const;

export const guarantees = [
  {
    claim: "Scope is locked and versioned",
    proof: "every change priced and re-signed",
    href: "/demo/scope",
  },
  {
    claim: "Assignment is on the record",
    proof: "who, why, and their standing",
    href: "/work",
  },
  {
    claim: "Progress comes from the repo",
    proof: "not from a status someone typed",
    href: "/demo/progress",
  },
  {
    claim: "Access is revoked at handover",
    proof: "with a dated log",
    href: "/demo/handover",
  },
  {
    claim: "The crew is admitted, not sourced",
    proof: "the standard is published",
    href: "/standard",
  },
] as const;
