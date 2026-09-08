"use client";

import Link from "next/link";
import { offer } from "@/content/offer";
import { Lift, Reveal, Rise } from "@/components/landing/Reveal";

/**
 * The last object on pages that do not run a conversation.
 * Proof pages: the Read first, then the Check.
 */
export function PageClose({
  line = "Five short questions. A written reply in one business day.",
}: Readonly<{ line?: string }>) {
  const price = `$${offer.check.price.toLocaleString("en-US")}`;

  return (
    <Reveal>
      <aside className="mt-14 border-t border-ink/10 pt-10">
        <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-quill/70">
          The Read · Free
        </p>
        <Rise delay={0.06}>
          <p className="mt-2 max-w-[28ch] font-newsreader text-[24px] leading-[1.15] tracking-[-0.03em] text-ink md:text-[28px]">
            {line}
          </p>
        </Rise>
        <div className="mt-8 flex flex-wrap items-center gap-5">
          <Lift>
            <Link
              href="/read"
              className="inline-flex items-center rounded-full bg-gold px-6 py-3 font-plex-sans text-[15px] font-medium text-ink"
            >
              Get my free read
            </Link>
          </Lift>
          <Link
            href="/check"
            className="font-plex-sans text-[15px] text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
          >
            Or reserve the Check · {price}
          </Link>
        </div>
      </aside>
    </Reveal>
  );
}
