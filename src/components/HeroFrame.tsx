import type { ReactNode } from "react";

type HeroFrameProps = {
  children: ReactNode;
  id?: string;
  labelledBy?: string;
};

/**
 * Cream margin. One graphite plate filling the first window.
 */
export function HeroFrame({ children, id, labelledBy }: Readonly<HeroFrameProps>) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className="story-inset bg-paper"
    >
      <div className="hero-plate on-ink relative flex min-h-[calc(100svh-1.25rem)] flex-col md:min-h-[calc(100svh-2rem)]">
        <div className="hero-watermark" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/bpulse-B.svg" alt="" />
        </div>
        {children}
      </div>
    </section>
  );
}
