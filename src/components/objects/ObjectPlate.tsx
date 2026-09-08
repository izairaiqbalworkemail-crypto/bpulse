"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type Tone = "paper" | "ink" | "gold";

const toneClass: Record<Tone, string> = {
  paper: "card overflow-hidden",
  ink: "card-ink overflow-hidden",
  gold: "overflow-hidden rounded-[8px] border border-line bg-paper-card text-ink",
};

/**
 * A portable object. No lift, no scale, no glow.
 */
export function ObjectPlate({
  children,
  tone = "paper",
  href,
  onClick,
  className,
  flush = false,
}: Readonly<{
  children: ReactNode;
  tone?: Tone;
  href?: string;
  onClick?: () => void;
  className?: string;
  flush?: boolean;
}>) {
  const plate = (
    <div
      className={`${toneClass[tone]} ${flush ? "" : "p-9"} ${className ?? ""}`.trim()}
    >
      {children}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block" onClick={onClick}>
        {plate}
      </Link>
    );
  }

  return plate;
}
