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
 * Cocoa window after the paper hero. The still is the lock. The price is the ask.
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
          <p className="font-plex-mono text-[12px] uppercase tracking-[0.06em] text-label">
            {kicker}
          </p>
          {price ? (
            <p
              className={`mt-6 font-newsreader leading-none tracking-[-0.03em] text-paper ${
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
              className={`max-w-[16ch] font-newsreader leading-[1.1] tracking-[-0.015em] text-paper ${
                price
                  ? "mt-6 text-[28px] md:text-[36px]"
                  : "mt-6 text-[clamp(2.25rem,6vw,3.75rem)]"
              }`}
            >
              {title}
            </p>
          ) : null}
          <p className="mt-6 max-w-[42ch] font-plex-sans text-[17px] leading-[1.5] text-read md:text-[18px]">
            {line}
          </p>
          {href && action ? (
            <p className="mt-10">
              {href.startsWith("#") ? (
                <a href={href} className="btn btn-gold min-h-12 px-6 text-[15px]">
                  {action}
                </a>
              ) : (
                <Link href={href} className="btn btn-gold min-h-12 px-6 text-[15px]">
                  {action}
                </Link>
              )}
            </p>
          ) : null}
        </div>
      </div>
      {facts && facts.length > 0 ? (
        <ul className="mt-16 grid gap-0 border-t border-paper/20 sm:grid-cols-3">
          {facts.map((fact) => (
            <li
              key={fact.kicker}
              className="border-b border-paper/20 py-6 sm:border-b-0 sm:px-6 sm:py-8 sm:first:pl-0 sm:last:pr-0 sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:border-paper/20"
            >
              <p className="font-plex-mono text-[11px] uppercase tracking-[0.06em] text-label">
                {fact.kicker}
              </p>
              <p className="mt-2 font-plex-sans text-[17px] leading-[1.4] text-read">
                {fact.body}
              </p>
            </li>
          ))}
        </ul>
      ) : null}
    </SignalFrame>
  );
}
