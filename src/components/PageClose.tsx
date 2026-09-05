"use client";

import Link from "next/link";
import { offer } from "@/content/offer";
import { VettedPay } from "@/components/VettedPay";
import { Lift, Reveal, Rise } from "@/components/landing/Reveal";

/**
 * The last object on pages that do not run a conversation.
 * Same ask everywhere — Check, then a person.
 */
export function PageClose({
  line = "Five days to know what it takes. A named person replies within one business day.",
}: Readonly<{ line?: string }>) {
  const price = `$${offer.check.price.toLocaleString("en-US")}`;

  return (
    <Reveal>
      <aside className="card mt-14 px-8 py-10">
        <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-ink/70">
          The Check · {price}
        </p>
        <Rise delay={0.06}>
          <p className="mt-2 max-w-[28ch] font-newsreader text-[24px] leading-[1.15] tracking-[-0.03em] text-iron md:text-[28px]">
            {line}
          </p>
        </Rise>
        <div className="mt-8 flex flex-wrap items-center gap-5">
          <Lift>
            <Link
              href="/check"
              className="inline-flex items-center rounded-full bg-signal px-6 py-3 font-plex-sans text-[15px] font-medium text-iron"
            >
              {`Start the Check · ${price}`}
            </Link>
          </Lift>
          <Link
            href="/contact"
            className="font-plex-sans text-[15px] text-iron underline decoration-iron/30 underline-offset-4 hover:decoration-iron"
          >
            Or write the studio
          </Link>
        </div>
        <div className="mt-8">
          <VettedPay compact />
        </div>
      </aside>
    </Reveal>
  );
}
