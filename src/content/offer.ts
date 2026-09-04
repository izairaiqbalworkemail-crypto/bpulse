import { brand } from "@/config/brand";
import type { Offer } from "./types";

const b = brand.offers;

export const offer: Offer = {
  check: {
    name: b.check.name,
    price: b.check.price,
    currency: b.check.currency,
    duration: b.check.duration,
    description: b.check.description,
  },
  close: {
    name: b.close.name,
    priceRange: b.close.priceRange,
    description: b.close.description,
  },
  standing: {
    name: b.standing.name,
    priceRange: b.standing.priceRange,
    description: b.standing.description,
  },
};
