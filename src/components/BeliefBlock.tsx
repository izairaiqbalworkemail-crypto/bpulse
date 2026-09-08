"use client";

import Link from "next/link";
import { Reveal, Rise } from "@/components/landing/Reveal";

type BeliefBlockProps = {
  statement: string;
  body?: string;
  example: string;
  href: string;
  lot: string;
};

export function BeliefBlock({
  statement,
  body,
  example,
  href,
  lot,
}: BeliefBlockProps) {
  return (
    <Reveal>
      <article className="mb-12 border-t border-ink/10 pt-10 md:pt-14">
        <Rise>
          <h2 className="max-w-[18ch] font-newsreader type-display text-[32px] leading-[1.08] text-ink md:text-[56px]">
            {statement}
          </h2>
        </Rise>
        {body ? (
          <p className="mt-4 max-w-[60ch] font-newsreader text-[16px] leading-[1.5] text-quill/80 md:text-[18px]">
            {body}
          </p>
        ) : null}
        <p className="mt-5 max-w-[60ch] font-newsreader text-[18px] leading-[1.45] text-quill">
          {example}{" "}
          <Link
            href={href}
            className="underline decoration-ink/40 underline-offset-4 hover:decoration-ink"
          >
            {lot}
          </Link>
        </p>
      </article>
    </Reveal>
  );
}
