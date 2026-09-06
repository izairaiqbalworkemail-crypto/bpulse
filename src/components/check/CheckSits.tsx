import Link from "next/link";
import { ladder, noDiscount } from "@/content/ladder";

const neighbors = ladder.filter((rung) =>
  rung.id === "session" || rung.id === "check" || rung.id === "slice",
);

export function CheckSits() {
  return (
    <section
      id="sits"
      aria-labelledby="sits-heading"
      className="ribbon relative bg-rag text-iron"
    >
      <div className="stage-container py-16 md:py-20">
        <h2
          id="sits-heading"
          className="font-plex-mono text-[12px] uppercase tracking-[0.14em] text-ink/70"
        >
          Where this sits
        </h2>
        <ol className="mt-8 flex flex-col gap-3">
          {neighbors.map((rung) => {
            const here = rung.id === "check";
            const row = (
              <div className="grid gap-2 md:grid-cols-[8.5rem_7.5rem_minmax(0,1fr)] md:items-baseline md:gap-8">
                <p className="font-plex-sans text-[16px] text-iron">
                  {here ? (
                    <span className="font-medium">{rung.name}</span>
                  ) : (
                    <Link
                      href={rung.href}
                      className="underline decoration-iron/20 underline-offset-4 hover:decoration-iron"
                    >
                      {rung.name}
                    </Link>
                  )}
                </p>
                <p className="font-plex-mono text-[15px] tabular-nums text-iron">
                  {rung.price}
                </p>
                <p className="max-w-[48ch] font-plex-sans text-[16px] leading-[1.5] text-ink">
                  {here ? "You are here. " : null}
                  {rung.credit}
                </p>
              </div>
            );

            return (
              <li key={rung.id}>
                {here ? <div className="offer-here">{row}</div> : (
                  <div className="border-t border-iron/10 py-5">{row}</div>
                )}
              </li>
            );
          })}
        </ol>
        <p className="mt-8 max-w-[52ch] font-plex-sans text-[15px] leading-[1.55] text-ink">
          {noDiscount}
        </p>
      </div>
    </section>
  );
}
