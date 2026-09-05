import Link from "next/link";
import type { ReactNode } from "react";
import { offer } from "@/content/offer";

/**
 * Honest payment + trust strip. No invented certs.
 * The Check is invoiced by a person. The crew is gated on /standard.
 */
export function VettedPay({
  compact = false,
  surface = "paper",
}: Readonly<{ compact?: boolean; surface?: "paper" | "signal" }>) {
  const price = `$${offer.check.price.toLocaleString("en-US")}`;

  const items: { kicker: string; body: ReactNode }[] = [
    {
      kicker: "This screen",
      body: "No card. Nothing is charged here.",
    },
    {
      kicker: "The invoice",
      body: `${price} is billed by a named person, by hand.`,
    },
    {
      kicker: "If we Close",
      body: "The fee is credited on that invoice within 30 days.",
    },
    {
      kicker: "Who touches it",
      body: (
        <>
          Named crew, gated in public.{" "}
          <Link
            href="/standard"
            className="underline decoration-iron/30 underline-offset-4 hover:decoration-iron"
          >
            The five gates
          </Link>
          .
        </>
      ),
    },
  ];

  if (surface === "signal") {
    return (
      <ul className="grid grid-cols-2 gap-0 border-t border-iron/15">
        {items.map((item) => (
          <li
            key={item.kicker}
            className="border-b border-iron/15 px-0 py-5 odd:pr-6 even:border-l even:border-iron/15 even:pl-6"
          >
            <p className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-iron/70">
              {item.kicker}
            </p>
            <p className="mt-1.5 font-newsreader text-[15px] leading-[1.35] text-iron">
              {item.body}
            </p>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-2">
      {items.map((item) => (
        <li key={item.kicker} className={`card ${compact ? "px-4 py-3" : "px-5 py-4"}`}>
          <p className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-ink/70">
            {item.kicker}
          </p>
          <p className="mt-1.5 font-newsreader text-[15px] leading-[1.35] text-iron">
            {item.body}
          </p>
        </li>
      ))}
    </ul>
  );
}
