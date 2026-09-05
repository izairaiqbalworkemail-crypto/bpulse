import type { ElementType, ReactNode } from "react";

type SurfaceProps = {
  as?: "div" | "article" | "aside" | "section" | "li";
  tone?: "paper" | "iron";
  hover?: boolean;
  className?: string;
  children: ReactNode;
};

/**
 * The shared card. 24px radius, rag or iron, soft lift.
 * Use this instead of one-off rounded boxes.
 */
export function Surface({
  as,
  tone = "paper",
  hover = false,
  className,
  children,
}: Readonly<SurfaceProps>) {
  const Tag = (as ?? "div") as ElementType;
  const toneClass = tone === "iron" ? "card-iron" : "card";
  const hoverClass = hover && tone === "paper" ? "card-hover" : "";
  return (
    <Tag className={`${toneClass} ${hoverClass} ${className ?? ""}`.trim()}>
      {children}
    </Tag>
  );
}
