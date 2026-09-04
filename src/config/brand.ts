export const brand = {
  name: "bpulse",
  legalName: "Breakthrough Pulse",
  tagline: "We finish what starts.",
  description:
    "Senior software studio. We take over products stuck at 80% and ship them to production.",
  url: "https://bpulse.dev",
  logo: "/logo.png",
  ogImage: "https://bpulse.dev/og.png",

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
        "Verdict of keep, repair, or rebuild. Credited in full against a build within 30 days.",
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
