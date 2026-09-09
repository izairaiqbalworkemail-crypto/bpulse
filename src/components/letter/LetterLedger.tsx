"use client";

import Link from "next/link";
import { Item, Stagger } from "@/components/landing/Reveal";

export type LetterLine = {
  id: string;
  kicker?: string;
  title: string;
  body?: string;
  meta?: string;
  href?: string;
  ask?: string;
  here?: boolean;
};

/**
 * A ruled object. Hairlines, not a card stack. Children rise in.
 */
export function LetterLedger({
  lines,
  tone = "paper",
}: Readonly<{
  lines: readonly LetterLine[];
  tone?: "paper" | "ink";
}>) {
  return (
    <Stagger
      className={`letter-ledger${tone === "ink" ? " is-ink" : ""}`}
      gap={0.055}
    >
      {lines.map((line) => {
        const inner = (
          <>
            {line.kicker || line.meta ? (
              <span className="letter-ledger-head">
                {line.kicker ? (
                  <span className="letter-ledger-kicker">{line.kicker}</span>
                ) : null}
                {line.meta ? (
                  <span className="letter-ledger-meta">{line.meta}</span>
                ) : null}
              </span>
            ) : null}
            <span className="letter-ledger-title">{line.title}</span>
            {line.body ? (
              <span className="letter-ledger-body">{line.body}</span>
            ) : null}
            {line.ask ? (
              <span className="letter-ledger-ask">{line.ask}</span>
            ) : null}
          </>
        );

        const rowClass = `letter-ledger-row${line.href ? " is-link" : ""}${line.here ? " is-here" : ""}`;

        return (
          <Item key={line.id}>
            {line.href ? (
              <Link id={line.id} href={line.href} className={rowClass}>
                {inner}
              </Link>
            ) : (
              <div id={line.id} className={rowClass}>
                {inner}
              </div>
            )}
          </Item>
        );
      })}
    </Stagger>
  );
}
