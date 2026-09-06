import { lots } from "./lots";
import { LOT_PATTERNS } from "./read-patterns";

/**
 * /read. The free rung. The specimen is an anonymised read, not a description
 * of one. Counts come from the catalogue.
 */

const before = LOT_PATTERNS.beforeProduction.length;
const catalogue = lots.length;

export const readOffer = {
  heading: "Write Aneeb.",
  dek: "Tell us what is stuck. What we think is happening, what we would look at first, and what we cannot tell yet.",
  pledge: "He reads it himself. One business day. No call. No pitch inside it.",
} as const;

export const readWhy = {
  heading: "Why it is free.",
  body: "Thirty minutes of a senior engineer, written and sent. It is free because it is the best demonstration of judgement we have, and because most people who read one do not need us.",
  next: "If you do, the Check is where it goes next.",
} as const;

export const readAfter = {
  steps: [
    "You send it. We read it, usually the same day.",
    "A named engineer writes the read and sends it to you.",
    "That is the end of it, unless you reply.",
  ],
  pledge: "We will not add you to anything. We will not follow up twice.",
} as const;

export const readStart = {
  heading: "Send it.",
  href: "#offer",
  label: "Write Aneeb",
} as const;

/**
 * The published specimen. Same shape as a real read. Company redacted.
 * Prepared date is a specimen date, not a live filing.
 */
export const readSpecimen = {
  kicker: "A READ",
  prepared: "4 Sep 2026",
  title: "[Company redacted], from your description",
  told: {
    label: "WHAT YOU TOLD US",
    body: "An eight month build, working on staging, never deployed to production. The developer who wired the auth left in March. Your board meeting is in five weeks.",
  },
  means: {
    label: "WHAT THAT USUALLY MEANS",
    body: `${before} of the ${catalogue} builds we have taken over arrived the same way. In each, the gap was smaller than it looked from inside: a deploy path that was never written down, not a rebuild.`,
    href: "/work/deepidv",
    see: "see 031, DeepIDV",
  },
  look: {
    label: "WHAT WE WOULD LOOK AT FIRST",
    items: [
      "Whether a production environment has ever existed",
      "Whether the auth wiring is documented anywhere",
      "What the staging and production drift actually is",
    ],
  },
  not: {
    label: "WHAT THIS IS NOT",
    body: "This is built from what you typed. We have not seen your code, your logs or your infrastructure. We cannot tell you whether this is one week or ten until we look.",
  },
} as const;
