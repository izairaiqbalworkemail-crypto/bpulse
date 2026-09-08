/**
 * First-60-word framing for every interior page.
 * Each sentence says what the page is a view into.
 */
export const pageFrame = {
  howItWorks:
    "This page is how we work together: the Read, the Session, the Check, scope lock, build, handover, and after launch. You engage a process. People execute it.",
  work: "Work we finished. Every case shows who was on it, and what was stuck when we started.",
  workSlug:
    "One case. Who did the work, what was stuck, what shipped, and what we still cannot claim.",
  team: "These twelve people have cleared the standard. Pick a name, or describe what is stuck. A missing photograph is initials, not a hole.",
  teamSlug:
    "One of our engineers: how they got here, work they have finished, what they fixed, and a direct line.",
  match:
    "Describe what is stuck. We name who has fixed that kind of thing before, and why.",
  check:
    "The Check sits between the Session and the First Slice. $1,500. Five business days. A written verdict: keep, repair or rebuild, and a real report on this page, readable in full.",
  read: "Tell us what is stuck. We write back in one business day: what we think is happening, what we would look at first, and what we cannot tell from a description. No call. No pitch inside it.",
  session:
    "Ninety minutes with a senior engineer, on your actual problem. $400. You leave with a written scope and a range, credited against anything you buy in 30 days.",
  slice:
    "The First Slice is $7,500. Two weeks. One thing that works, in production, that you can show someone. It is a beginning, not a finish.",
  standard:
    "How we decide who is client-facing. Five gates, then a quarterly review.",
  demo: "This is the platform, live, with sample data. Eight views of a locked Close. Nothing here is a live engagement.",
  secondChair:
    "Capability transfer after a project. A named engineer on your repository. On Call starts at $900 a month. Cancel any month.",
  careers:
    "Applying to the standard. Five gates, what each costs us, and no candidate fee, said here, in public.",
  notices:
    "The uncomfortable questions, all visible. The last one is what the platform is bad at.",
  contact:
    "An intake the platform routes. Aneeb Iqbal reads it within one business day.",
  security:
    "Operational claims on this page point to the same facts in /legal.",
  legal:
    "The forms the platform actually signs. Every claim here points to a named document.",
  legalData:
    "Where data lives, what leaves Pakistan, and why EU and UK clients need Standard Contractual Clauses. Pakistan has no enacted data protection law. We say that here.",
  about:
    "A studio in Lahore. Twelve engineers, through a published standard, put on products that are built and will not ship.",
  pricing:
    "How we work together. Free to $95,000. The same prices for everyone. No form to see them.",
} as const;

export const guarantees = [
  {
    claim: "Scope is locked and versioned",
    proof: "every change priced and re-signed",
    href: "/demo/scope",
  },
  {
    claim: "Assignment is public",
    proof: "who, why, and whether they are available now",
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
    claim: "The crew is our engineers, not a pool",
    proof: "the standard is published",
    href: "/standard",
  },
] as const;
