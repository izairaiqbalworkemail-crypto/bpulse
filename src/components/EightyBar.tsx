"use client";

import { animate, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

/**
 * The stall. Fills once in 1100ms and stops at 80%.
 * Gradient one: stuck into diagnosis. Reduced motion sits at 80.
 */
export function EightyBar({
  tone = "paper",
}: Readonly<{ tone?: "dark" | "paper" }>) {
  const reduce = useReducedMotion();
  const [pct, setPct] = useState(reduce === false ? 0 : 80);
  const onDark = tone === "dark";

  useEffect(() => {
    if (reduce !== false) {
      return;
    }
    const rise = animate(0, 80, {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (value) => setPct(value),
    });
    return () => {
      rise.stop();
    };
  }, [reduce]);

  return (
    <div
      className="w-full"
      role="img"
      aria-label="Build stalled at 80 percent"
    >
      <div
        className={`relative h-5 font-plex-mono text-[12px] uppercase tracking-[0.16em] ${
          onDark ? "text-mist/70" : "text-quill"
        }`}
      >
        <span className="absolute left-0">stall</span>
        <span
          className={`absolute tabular-nums ${onDark ? "text-mist" : "text-ink"}`}
          style={{ left: `${pct}%`, transform: "translateX(-50%)" }}
        >
          {Math.round(pct)}%
        </span>
      </div>

      <div className="eighty-track mt-3" data-on-dark={onDark}>
        <div className="eighty-fill" style={{ width: `${pct}%` }} />
        <span className="stall-pip" aria-hidden="true" />
      </div>
    </div>
  );
}
