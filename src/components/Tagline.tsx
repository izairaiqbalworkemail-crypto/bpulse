"use client";

import { useInView } from "@/hooks/useInView";

/**
 * The tagline — full-width, the first thing after the masthead.
 * Massive type, centered, minimal padding. Animates on scroll.
 */
export function Tagline() {
  const { ref, isInView } = useInView({ threshold: 0.3 });

  return (
    <section
      ref={ref}
      className="relative w-full bg-rag overflow-hidden"
    >
      <div className="py-16 md:py-24">
        <div className="grid-container">
          <h1
            className={`font-newsreader text-[clamp(3rem,8vw+1rem,7rem)] leading-[0.95] tracking-tighter text-iron transition-all duration-700 ease-out ${
              isInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            We finish
            <br />
            <span className="text-iron/40">what starts.</span>
          </h1>
        </div>
      </div>

      {/* Subtle gradient line at bottom */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-iron/20 to-transparent" />
    </section>
  );
}
