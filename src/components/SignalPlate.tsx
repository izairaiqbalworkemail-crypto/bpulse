import type { ReactNode } from "react";
import Link from "next/link";
import { SealedStill } from "@/components/SealedStill";
import { SignalFrame } from "@/components/SignalFrame";

type SignalFact = {
  kicker: string;
  body: ReactNode;
};

type SignalPlateProps = {
  kicker: string;
  price?: string;
  title?: string;
  line: ReactNode;
  facts?: readonly SignalFact[];
  href?: string;
  action?: string;
};

/**
 * Gold window after the caramel hero. The still is the lock. The price is the ask.
 */
export function SignalPlate({
  kicker,
  price,
  title,
  line,
  facts,
  href,
  action,
}: Readonly<SignalPlateProps>) {
  return (
    <SignalFrame>
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
        <SealedStill caption="Written. Sealed. You leave with the keys." />
        <div className="min-w-0">
          <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-iron/70">
            {kicker}
          </p>
          {price ? (
            <p
              className={`mt-6 font-newsreader leading-none tracking-[-0.03em] text-iron ${
                price.length > 12
                  ? "text-[clamp(2.75rem,8vw,5.5rem)]"
                  : "text-[clamp(3.5rem,12vw,7rem)]"
              }`}
            >
              {price}
            </p>
          ) : null}
          {title ? (
            <p
              className={`max-w-[16ch] font-newsreader leading-[1.1] tracking-[-0.015em] text-iron ${
                price
                  ? "mt-6 text-[28px] md:text-[36px]"
                  : "mt-6 text-[clamp(2.25rem,6vw,3.75rem)]"
              }`}
            >
              {title}
            </p>
          ) : null}
          <p className="mt-6 max-w-[42ch] font-newsreader text-[18px] leading-[1.5] text-iron/80 md:text-[20px]">
            {line}
          </p>
          {href && action ? (
            <p className="mt-10">
              {href.startsWith("#") ? (
                <a
                  href={href}
                  className="inline-flex min-h-12 items-center rounded-full bg-iron px-6 py-3 font-plex-sans text-[15px] font-medium text-rag"
                >
                  {action}
                </a>
              ) : (
                <Link
                  href={href}
                  className="inline-flex min-h-12 items-center rounded-full bg-iron px-6 py-3 font-plex-sans text-[15px] font-medium text-rag"
                >
                  {action}
                </Link>
              )}
            </p>
          ) : null}
        </div>
      </div>
      {facts && facts.length > 0 ? (
        <ul className="mt-16 grid gap-0 border-t border-iron/15 sm:grid-cols-3">
          {facts.map((fact) => (
            <li
              key={fact.kicker}
              className="border-b border-iron/15 py-6 sm:border-b-0 sm:px-6 sm:py-8 sm:first:pl-0 sm:last:pr-0 sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:border-iron/15"
            >
              <p className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-iron/70">
                {fact.kicker}
              </p>
              <p className="mt-2 font-newsreader text-[17px] leading-[1.4] text-iron">
                {fact.body}
              </p>
            </li>
          ))}
        </ul>
      ) : null}
    </SignalFrame>
  );
}
