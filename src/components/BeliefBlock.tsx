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
      <article className="card mb-4 px-8 py-10 md:px-10 md:py-14">
        <Rise>
          <h2 className="max-w-[18ch] font-newsreader text-[32px] leading-[1.08] tracking-[-0.03em] text-iron md:text-[56px]">
            {statement}
          </h2>
        </Rise>
        {body ? (
          <p className="mt-4 max-w-[60ch] font-newsreader text-[16px] leading-[1.5] text-ink/80 md:text-[18px]">
            {body}
          </p>
        ) : null}
        <p className="mt-5 max-w-[60ch] font-newsreader text-[18px] leading-[1.45] text-ink">
          {example}{" "}
          <Link
            href={href}
            className="underline decoration-iron/40 underline-offset-4 hover:decoration-iron"
          >
            {lot}
          </Link>
        </p>
      </article>
    </Reveal>
  );
}
