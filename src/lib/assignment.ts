import { crewCapability } from "@/content/crew-lines";
import { getSpecialist, specialists } from "@/content/specialists";
import type { AssignmentStatus } from "@/content/vocabulary";
import type { SignalId } from "@/content/signals";
import type { Lot, Specialist } from "@/content/types";
import { gateLine } from "@/lib/direct/gate";
import { lotsForPerson } from "@/lib/lot-trace";

export function assignmentStatus(person: Specialist): AssignmentStatus {
  if (person.availability === "on an engagement") return "assigned";
  if (person.availability === "not taking new work") return "limited";
  return "available";
}

export function assignmentStatusLabel(status: AssignmentStatus): string {
  if (status === "assigned") return "Assigned";
  if (status === "limited") return "Limited";
  return "Available";
}

export function admission(person: Specialist) {
  const gate = gateLine(person.id);
  return {
    standing: gate.clientFacing
      ? "Client-facing · Gate 4"
      : "Operations · not client-facing",
    review: "Standing review is quarterly, against delivered work.",
    dateNote: "Clearance dates are not on the public record.",
    href: "/standard" as const,
  };
}

export function lotStatus(lot: Lot): string | null {
  return lot.dataLines.find((line) => line.label === "Status")?.value ?? null;
}

export function assignmentHistory(person: Specialist) {
  return lotsForPerson(person).map((lot) => ({
    lot,
    capability:
      lot.specialistId === person.id
        ? lot.specialistCapability
        : crewCapability[person.id],
    lead: lot.specialistId === person.id,
    status: lotStatus(lot),
    arrived: lot.grade.label,
    date: lot.grade.date ?? null,
  }));
}

export function signalsClosed(person: Specialist): SignalId[] {
  const ids = new Set<SignalId>();
  for (const lot of lotsForPerson(person)) {
    for (const signal of lot.signals) ids.add(signal);
  }
  return [...ids];
}

export function assignedCrew(lot: Lot) {
  const lead = getSpecialist(lot.specialistId);
  const others = specialists.filter(
    (person) =>
      person.id !== lot.specialistId &&
      lotsForPerson(person).some((item) => item.slug === lot.slug),
  );
  return [
    { person: lead, capability: lot.specialistCapability, lead: true as const },
    ...others.map((person) => ({
      person,
      capability: crewCapability[person.id],
      lead: false as const,
    })),
  ];
}
