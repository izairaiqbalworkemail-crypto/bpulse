import type { ReactNode } from "react";
import Link from "next/link";
import { Episode } from "@/components/episode/Episode";

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
 * Cocoa room after the caramel hero. The price is the object.
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
    <Episode tone="cocoa">
      <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-rag/70">
        {kicker}
      </p>
      <div
        className={`mt-8 grid items-end gap-12 ${
          facts && facts.length > 0
            ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)]"
            : ""
        }`}
      >
        <div className="min-w-0">
          {price ? (
            <p
              className={`font-newsreader leading-none tracking-[-0.03em] text-signal ${
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
              className={`max-w-[16ch] font-newsreader leading-[1.1] tracking-[-0.015em] text-rag ${
                price
                  ? "mt-6 text-[28px] md:text-[36px]"
                  : "text-[clamp(2.25rem,6vw,3.75rem)]"
              }`}
            >
              {title}
            </p>
          ) : null}
          <p className="mt-6 max-w-[42ch] font-newsreader text-[18px] leading-[1.5] text-rag/80 md:text-[20px]">
            {line}
          </p>
          {href && action ? (
            <p className="mt-10">
              {href.startsWith("#") ? (
                <a
                  href={href}
                  className="inline-flex min-h-12 items-center rounded-full bg-signal px-6 py-3 font-plex-sans text-[15px] font-medium text-iron"
                >
                  {action}
                </a>
              ) : (
                <Link
                  href={href}
                  className="inline-flex min-h-12 items-center rounded-full bg-signal px-6 py-3 font-plex-sans text-[15px] font-medium text-iron"
                >
                  {action}
                </Link>
              )}
            </p>
          ) : null}
        </div>
        {facts && facts.length > 0 ? (
          <ul className="flex flex-col gap-4">
            {facts.map((fact) => (
              <li
                key={fact.kicker}
                className="rounded-[20px] bg-iron-card px-6 py-5"
              >
                <p className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-rag/55">
                  {fact.kicker}
                </p>
                <p className="mt-2 font-newsreader text-[17px] leading-[1.4] text-rag">
                  {fact.body}
                </p>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </Episode>
  );
}
