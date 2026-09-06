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
    check: {
      name: "The Check",
      price: 1500,
      currency: "USD",
      duration: "5 business days",
      description:
        "Verdict of keep, repair, or rebuild. Credited on a Close invoice within 30 days.",
    },
    close: {
      name: "The Close",
      priceRange: "$18,000–$95,000",
      description: "Fixed scope agreed in writing before any code.",
    },
    standing: {
      name: "Standing",
      priceRange: "$2,000–$6,000/month",
      description: "Post-launch support.",
    },
  },
} as const;
