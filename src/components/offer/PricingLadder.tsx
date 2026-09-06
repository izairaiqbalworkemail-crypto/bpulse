"use client";

import Link from "next/link";
import { Item, Stagger } from "@/components/landing/Reveal";
import { ladder, noDiscount, type LadderRung } from "@/content/ladder";

export function PricingLadder({
  highlight,
  onGold = false,
}: Readonly<{ highlight?: LadderRung["id"]; onGold?: boolean }>) {
  return (
    <div>
      <Stagger className="flex flex-col gap-3" gap={0.05}>
        {ladder.map((rung) => {
          const here = rung.id === highlight;
          const row = (
            <div className="grid gap-2 md:grid-cols-[9rem_8.5rem_minmax(0,1fr)] md:items-baseline md:gap-8">
              <p className="font-plex-sans text-[16px] text-current">
                {here ? (
                  <span className="font-medium">{rung.name}</span>
                ) : (
                  <Link
                    href={rung.href}
                    className="underline decoration-current/25 underline-offset-4 hover:decoration-current"
                  >
                    {rung.name}
                  </Link>
                )}
              </p>
              <p className="font-plex-mono text-[15px] tabular-nums">{rung.price}</p>
              <div className="max-w-[46ch]">
                <p className="font-plex-mono text-[11px] uppercase tracking-[0.08em] opacity-60">
                  {rung.meter}
                  {here ? " · you are here" : ""}
                </p>
                <p className="mt-1 font-plex-sans text-[16px] leading-[1.5] opacity-80">
                  {rung.body}
                </p>
                <p className="mt-1 font-plex-sans text-[15px] leading-[1.45] opacity-70">
                  {rung.credit}
                </p>
              </div>
            </div>
          );

          return (
            <Item key={rung.id}>
              {here ? (
                <div className={onGold ? "offer-here bg-rag text-iron" : "offer-here"}>
                  {row}
                </div>
              ) : (
                <div className="border-t border-current/12 py-6 first:border-t-0 first:pt-0">
                  {row}
                </div>
              )}
            </Item>
          );
        })}
      </Stagger>
      <p className="mt-10 max-w-[52ch] font-plex-sans text-[15px] leading-[1.55] opacity-80">
        {noDiscount}
      </p>
    </div>
  );
}
