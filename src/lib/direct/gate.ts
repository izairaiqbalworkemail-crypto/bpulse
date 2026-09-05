import { crewCapability } from "@/content/crew-lines";

/** Honest gate line. We do not invent a clearance date. */
export function gateLine(specialistId: string) {
  if (crewCapability[specialistId] === "Operations") {
    return {
      label: "Operations · not client-facing",
      href: "/standard",
      clientFacing: false,
    };
  }
  return {
    label: "Client-facing · Gate 4",
    href: "/standard",
    clientFacing: true,
  };
}
