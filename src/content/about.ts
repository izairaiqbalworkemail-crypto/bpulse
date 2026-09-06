import { specialists } from "./specialists";

/**
 * /about. Platform, not founder story. Every belief links to a record.
 * Do not invent a DeepIDV duration. Do not invent gate dates.
 */

export const aboutWhat = {
  heading: "A studio in Lahore.",
  dek: "Twelve engineers, admitted through a published standard, deployed into products that are built and will not ship.",
} as const;

export const aboutBeliefs = [
  {
    statement: "Done means deployed.",
    proof:
      "LOT 031, DeepIDV. Arrived with the compliance path demo-tight. Live now. Client-reported reach of 211 countries.",
    href: "/work/deepidv",
    mark: "the record",
  },
  {
    statement: "The people who scope it ship it.",
    proof:
      "No handoff exists between the Check and the build. The engineer who reads your repository leads the work. On Sully, the person who scoped it stayed through HIPAA production.",
    href: "/work/sully",
    mark: "the record",
  },
  {
    statement: "No hostage codebases.",
    proof:
      "Every deployment ends with a credentials transfer and a dated revocation log. You can open a working sample of that log before you pay anything.",
    href: "/demo/handover",
    mark: "the sample",
  },
  {
    statement: "Stays until it is live.",
    proof:
      "Handover training is included in every deployment, not sold as an upsell. The runbook and the training are part of the Close.",
    href: "/how-it-works",
    mark: "the process",
  },
] as const;

export const aboutOrigin = {
  body: [
    "I spent six years walking into products I did not know. Hospitals, crypto, verification, HR tools. Each time I was not the person who knew the domain. The stack changed. Learning the workflow properly turned out to be the skill, not the stack.",
    "A career would have kept me on one of those products. A studio is the only shape that lets the same people keep doing that work, under a published standard, for products that are built and will not ship.",
  ],
  signed: "Aneeb Iqbal",
} as const;

export const aboutCrewLine =
  "Twelve admitted. The standard is published and applies to all of them, every quarter.";

export const aboutWhere = [
  {
    fact: "Lahore, Punjab, Pakistan",
    note: "the studio",
  },
  {
    fact: "US and EU",
    note: "where we take work",
  },
  {
    fact: "UTC+5",
    note: "nine to thirteen hours ahead of US time, four to five ahead of Europe",
  },
  {
    fact: "One business day",
    note: "how fast anyone hears back",
  },
  {
    fact: "Bank transfer and card",
    note: "how we invoice",
  },
  {
    fact: "W-8BEN and PO on request",
    note: "before you ask",
  },
] as const;

export const aboutNot = [
  "We are not a marketplace. You do not get a résumé and a calendar link.",
  "We are not staff augmentation. We are accountable for the outcome, not the hours.",
  "We are not the cheapest. If price is the deciding factor, there are studios billing $15 an hour and we are not one.",
] as const;

export const aboutStart = {
  heading: "The Read.",
  line: "A written read of what is stuck. Free.",
  href: "/read",
  label: "Start",
} as const;

export const admittedCount = specialists.length;
