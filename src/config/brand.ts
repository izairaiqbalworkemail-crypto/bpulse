import {
  closeRange,
  ladderPrices,
  standingRange,
} from "@/content/ladder";

export const brand = {
  name: "bpulse",
  legalName: "Breakthrough Pulse",
  tagline: "We finish what starts.",
  description:
    "Lahore software studio. Named people take products stuck at 80% and ship them to production.",
  url: "https://bpulse.dev",
  logo: "/bpulse-brand/icon/bpulse-icon-512.png",
  ogImage: "/bpulse-brand/social/bpulse-og.png",
  profile: "/bpulse-brand/icon/bpulse-icon.svg",
  cover: "/bpulse-brand/social/bpulse-og.svg",
  assets: {
    markDark: "/bpulse-brand/mark/bpulse-mark-dark.svg",
    markLight: "/bpulse-brand/mark/bpulse-mark-light.svg",
    markMono: "/bpulse-brand/mark/bpulse-mark-mono.svg",
    lockupDark: "/bpulse-brand/lockup/bpulse-lockup-dark.svg",
    lockupLight: "/bpulse-brand/lockup/bpulse-lockup-light.svg",
    icon: "/bpulse-brand/icon/bpulse-icon.svg",
    favicon: "/bpulse-brand/favicon/bpulse-favicon.svg",
    og: "/bpulse-brand/social/bpulse-og.svg",
  },

  address: {
    street: "Lahore",
    region: "Punjab",
    country: "PK",
    countryName: "Pakistan",
  },

  contact: {
    email: "contact@bpulse.dev",
  },

  capabilities: [
    { name: "Integration", slug: "integration" },
    { name: "Delivery", slug: "delivery" },
    { name: "Intelligence", slug: "intelligence" },
  ],

  offers: {
    read: {
      name: "The Read",
      price: ladderPrices.read,
      currency: "USD",
      duration: "one business day",
      description:
        "A written read of what you described. Free. Nothing on it asks for a meeting.",
    },
    session: {
      name: "The Session",
      price: ladderPrices.session,
      currency: "USD",
      duration: "ninety minutes",
      description:
        "A senior engineer on your actual problem. Written scope and a range. Credited against anything you buy in 30 days.",
    },
    check: {
      name: "The Check",
      price: ladderPrices.check,
      currency: "USD",
      duration: "5 business days",
      description:
        "Verdict of keep, repair or rebuild. Credited in full against a build in 30 days.",
    },
    slice: {
      name: "The First Slice",
      price: ladderPrices.slice,
      currency: "USD",
      duration: "two weeks",
      description:
        "One thing that works, in production, that you can show someone. A beginning, not a finish.",
    },
    close: {
      name: "The Close",
      priceRange: closeRange,
      description: "Fixed scope agreed in writing before any code.",
    },
    standing: {
      name: "Standing",
      priceRange: standingRange,
      description: "After launch, until you do not need us.",
    },
  },
} as const;
