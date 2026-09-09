import type { ReactNode } from "react";

type HeroFrameProps = {
  children: ReactNode;
  id?: string;
  labelledBy?: string;
};

/**
 * Interior chapter. Edge to glass. Half the window. Then paper.
 * Home keeps the framed poster. No cropped name. No plate.
 */
export function HeroFrame({
  children,
  id,
  labelledBy,
}: Readonly<HeroFrameProps>) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className="letter-chapter"
    >
      <div className="letter-window is-chapter on-ink">{children}</div>
    </section>
  );
}
