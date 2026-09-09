"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Item, Stagger } from "@/components/landing/Reveal";

/**
 * A discrete object: a person, a document, a specimen. Not a section.
 */
export function LetterObjects({
  children,
  className,
}: Readonly<{ children: ReactNode; className?: string }>) {
  return (
    <Stagger className={className} gap={0.07}>
      {children}
    </Stagger>
  );
}

export function LetterObject({
  href,
  children,
  label,
}: Readonly<{
  href?: string;
  children: ReactNode;
  label?: string;
}>) {
  const plate = <div className="letter-object">{children}</div>;

  return (
    <Item>
      {href ? (
        <Link href={href} className="letter-object-link" aria-label={label}>
          {plate}
        </Link>
      ) : (
        plate
      )}
    </Item>
  );
}
