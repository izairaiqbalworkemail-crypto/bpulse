"use client";

import { useEffect, useState } from "react";

/**
 * Scroll progress bar — fixed at top, shows page scroll progress.
 * Inspired by bpulse.dev's gradient progress bar.
 *
 * Uses the signal colour for the gradient, adapting to the catalogue theme.
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left"
      style={{
        background:
          "linear-gradient(to right, var(--color-signal), var(--color-iron), var(--color-signal))",
        transform: `scaleX(${progress})`,
      }}
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    />
  );
}
