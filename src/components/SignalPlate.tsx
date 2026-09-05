import type { ReactNode } from "react";
import Link from "next/link";

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
 * The yellow complete plate. Price first. Only real figures.
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
    <section className="w-full bg-signal text-iron">
      <div className="grid-container py-16 md:py-20">
        <p className="font-plex-mono text-[12px] uppercase tracking-[0.08em] text-iron/70">
          {kicker}
        </p>
        <div
          className={`mt-6 grid items-end gap-10 ${
            facts && facts.length > 0
              ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]"
              : ""
          }`}
        >
          <div className="min-w-0">
            {price ? (
              <p
                className={`font-newsreader leading-none tracking-[-0.045em] ${
                  price.length > 12
                    ? "text-[clamp(2.5rem,9vw,5rem)]"
                    : "text-[clamp(3.25rem,14vw,6.5rem)]"
                }`}
              >
                {price}
              </p>
            ) : null}
            {title ? (
              <p
                className={`max-w-[16ch] font-newsreader leading-[1.08] tracking-[-0.03em] ${
                  price
                    ? "mt-6 text-[28px] md:text-[34px]"
                    : "text-[clamp(2.25rem,6vw,3.75rem)]"
                }`}
              >
                {title}
              </p>
            ) : null}
            <p className="mt-5 max-w-[42ch] font-newsreader text-[18px] leading-[1.45] text-iron/90">
              {line}
            </p>
            {href && action ? (
              <p className="mt-8">
                {href.startsWith("#") ? (
                  <a
                    href={href}
                    className="inline-flex min-h-11 items-center rounded-full bg-iron px-5 py-2.5 font-plex-sans text-[14px] font-medium text-rag"
                  >
                    {action}
                  </a>
                ) : (
                  <Link
                    href={href}
                    className="inline-flex min-h-11 items-center rounded-full bg-iron px-5 py-2.5 font-plex-sans text-[14px] font-medium text-rag"
                  >
                    {action}
                  </Link>
                )}
              </p>
            ) : null}
          </div>
          {facts && facts.length > 0 ? (
            <ul className="flex flex-col gap-3">
              {facts.map((fact) => (
                <li
                  key={fact.kicker}
                  className="rounded-[20px] bg-iron/[0.07] px-5 py-4"
                >
                  <p className="font-plex-mono text-[11px] uppercase tracking-[0.08em] text-iron/65">
                    {fact.kicker}
                  </p>
                  <p className="mt-1.5 font-newsreader text-[16px] leading-[1.35] text-iron">
                    {fact.body}
                  </p>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}
