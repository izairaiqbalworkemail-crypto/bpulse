/**
 * How we sit next to a vetted marketplace.
 * Their public model is a pool you hire. Ours is a studio you hand work to.
 * No invented figures — theirs or ours.
 */

import { brand } from "@/config/brand";

export const studio = {
  city: brand.address.street,
  country: brand.address.countryName,
  place: `${brand.address.street}, ${brand.address.countryName}`,
  placeLine: "A software studio in Lahore",
  notAMarketplace: "Not a talent marketplace",
} as const;

export const homeRooms = {
  lastTwenty: {
    n: "01",
    kicker: "The last twenty",
    heading: "A bench does not finish a product.",
    dek: "Talent networks add people to a stuck build. We take the unfinished twenty. Pull the gold line.",
    they: "Hire another contractor.",
    we: "Take the last twenty and own the ship.",
  },
  fit: {
    n: "02",
    kicker: "Which is it",
    heading: "This is not a staffing brief.",
    dek: "Pull the card that is already true. The Check opens with that situation written down.",
    they: "Write a hiring request.",
    we: "Name the wound that is already true.",
  },
  catalogue: {
    n: "03",
    kicker: "Work we actually did",
    heading: "Shipped work. Not rented profiles.",
    dek: "DeepIDV, Sully, WearMeOut — the public sites, as they shipped.",
    they: "Browse a network of cards.",
    we: "Open the lots we put in production.",
  },
  path: {
    n: "04",
    kicker: "The path",
    heading: "We sell a verdict. Then a lock.",
    dek: "Not hours on a bench. Check, Close, Standing if you want it.",
    they: "Scale up or down, no strings.",
    we: "Lowest risk first. Nothing starts until you sign.",
  },
  crew: {
    n: "05",
    kicker: "The same hands",
    heading: "Lahore. Named. Still on the keyboard.",
    they: "A global pool you do not meet.",
    we: "The people who scope it ship it.",
  },
  match: {
    n: "06",
    kicker: "The Match",
    heading: "Not a pool. The record.",
    they: "A match from a network.",
    we: "A named person, from work we already did.",
  },
  check: {
    n: "07",
    kicker: "The Check",
    heading: "Five days. A verdict.",
    they: "Talk to an expert, then hire.",
    we: "Keep, repair, or rebuild — written down.",
  },
} as const;

export const brandPosition = {
  claim: "A Lahore studio that finishes software. Not a marketplace that rents it.",
  dek: "A vetted marketplace sells access to a pool. You hire a person and you still own the ship. We are Breakthrough Pulse: named people in Pakistan, one desk, the last twenty percent of a product that looks finished and will not ship.",
  rows: [
    {
      they: "Hire the top 3%",
      we: "Finish the last 20%",
      note: "Their scarcity is a network. Ours is the unfinished mile.",
    },
    {
      they: "A global bench you browse",
      we: "A studio in Lahore you can name",
      note: "Faces, roles, and a city. Not a browseable network.",
    },
    {
      they: "You manage the hire",
      we: "We own the ship",
      note: "Same hands from scope through production.",
    },
    {
      they: "Match from a pool",
      we: "Match against our record",
      note: "No model. If nothing is close, Aneeb reads it.",
    },
  ],
} as const;
