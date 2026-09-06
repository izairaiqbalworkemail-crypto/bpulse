"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Lift } from "@/components/landing/Reveal";

type Tone = "paper" | "iron" | "signal";

const toneClass: Record<Tone, string> = {
  paper: "lift-card room-card overflow-hidden",
  iron: "lift-card room-card-iron overflow-hidden",
  signal: "lift-card overflow-hidden rounded-[24px] border border-iron/10 bg-signal text-iron",
};

/**
 * A real object on the page. Lift on hover. Gold only when tone is signal.
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
      className={`${toneClass[tone]} ${flush ? "" : "p-6 md:p-8"} ${className ?? ""}`.trim()}
    >
      {children}
    </div>
  );

  if (href) {
    return (
      <Lift>
        <Link href={href} className="block" onClick={onClick}>
          {plate}
        </Link>
      </Lift>
    );
  }

  return <Lift>{plate}</Lift>;
}
