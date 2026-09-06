import { brand } from "@/config/brand";
import type { Offer } from "./types";

const b = brand.offers;

export const offer: Offer = {
  read: {
    name: b.read.name,
    price: b.read.price,
    currency: b.read.currency,
    duration: b.read.duration,
    description: b.read.description,
  },
  session: {
    name: b.session.name,
    price: b.session.price,
    currency: b.session.currency,
    duration: b.session.duration,
    description: b.session.description,
  },
  check: {
    name: b.check.name,
    price: b.check.price,
    currency: b.check.currency,
    duration: b.check.duration,
    description: b.check.description,
  },
  slice: {
    name: b.slice.name,
    price: b.slice.price,
    currency: b.slice.currency,
    duration: b.slice.duration,
    description: b.slice.description,
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
