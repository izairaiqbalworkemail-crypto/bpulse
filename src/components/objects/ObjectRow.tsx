"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type Tone = "paper" | "iron" | "gold";

const toneClass: Record<Tone, string> = {
  paper: "object-row",
  iron: "object-row object-row-iron",
  gold: "object-row object-row-gold",
};

/**
 * A fact row. Hover is border, 150ms. Links wrap the whole row.
 */
export function ObjectRow({
  children,
  href,
  tone = "paper",
  className,
}: Readonly<{
  children: ReactNode;
  href?: string;
  tone?: Tone;
  className?: string;
}>) {
  const classes = `${toneClass[tone]} ${className ?? ""}`.trim();

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return <div className={classes}>{children}</div>;
}
