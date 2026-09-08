import type { ElementType, ReactNode } from "react";

type SurfaceProps = {
  as?: "div" | "article" | "aside" | "section" | "li";
  tone?: "paper" | "ink";
  hover?: boolean;
  className?: string;
  children: ReactNode;
};

/**
 * The shared card. Paper-card, 20px radius, objects only.
 */
export function Surface({
  as,
  tone = "paper",
  hover = false,
  className,
  children,
}: Readonly<SurfaceProps>) {
  const Tag = (as ?? "div") as ElementType;
  const toneClass = tone === "ink" ? "card-ink" : "card";
  const hoverClass = hover && tone === "paper" ? "card-hover" : "";
  return (
    <Tag className={`${toneClass} ${hoverClass} ${className ?? ""}`.trim()}>
      {children}
    </Tag>
  );
}
