"use client";

import { useEffect, useRef, useState } from "react";
import { DataLine } from "@/components/primitives/DataLine";
import { Grade } from "@/components/primitives/Grade";
import type { Lot } from "@/content/types";

type HeroArtifactProps = {
  lot: Lot;
};

/**
 * The condition report artifact — three report leaves in a stack, offset and
 * slightly rotated. The top leaf carries real DeepIDV content. Built entirely
 * in HTML and CSS. No image file, no canvas, no library, no 3D engine.
 *
 * Depth comes from: offset and rotation between leaves, a 1px hairline on each
 * leaf edge, one contact shadow on the bottom leaf, and a specular sheen across
 * the top leaf.
 *
 * Motion:
 * 1. The settle — leaves arrive from a tighter stack into their offset
 *    positions. 520ms, staggered 70ms, cubic-bezier(.69,0,0,1). Once.
 * 2. The tilt — on pointer movement, the stack rotates on X and Y by a max of
 *    3°. Never on touch devices. Disabled under reduced motion.
 */
export function HeroArtifact({ lot }: HeroArtifactProps) {
  const stackRef = useRef<HTMLDivElement>(null);
  const [settled, setSettled] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const isTouchRef = useRef(false);

  // Detect touch device — use ref to avoid setState in effect
  useEffect(() => {
    isTouchRef.current =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
  }, []);

  // Settle animation — trigger once after mount
  useEffect(() => {
    const timer = setTimeout(() => setSettled(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Tilt on pointer movement (not touch)
  useEffect(() => {
    if (isTouchRef.current) return;

    const el = stackRef.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      setTilt({
        x: Math.max(-3, Math.min(3, dy * -3)),
        y: Math.max(-3, Math.min(3, dx * 3)),
      });
    };

    const onLeave = () => setTilt({ x: 0, y: 0 });

    window.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [isTouchRef]);

  const leaves = [
    { rotate: -3, offsetX: -8, offsetY: -4, zIndex: 1 },
    { rotate: -1, offsetX: -3, offsetY: -1, zIndex: 2 },
    { rotate: 2, offsetX: 5, offsetY: 2, zIndex: 3 },
  ];

  return (
    <div
      ref={stackRef}
      className="artifact-stack"
      style={{
        transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
    >
      {leaves.map((leaf, i) => (
        <div
          key={i}
          className={`artifact-leaf ${settled ? "artifact-leaf--settled" : ""}`}
          style={{
            "--leaf-rotate": `${leaf.rotate}deg`,
            "--leaf-offset-x": `${leaf.offsetX}px`,
            "--leaf-offset-y": `${leaf.offsetY}px`,
            "--leaf-index": leaf.zIndex,
            "--leaf-stagger": `${i * 70}ms`,
          } as React.CSSProperties}
        >
          {i === 2 ? (
            /* Top leaf — fully legible, real content */
            <div className="artifact-leaf-content">
              <div className="flex items-baseline justify-between">
                <span className="font-plex-mono text-data tracking-[0.08em] text-iron/60 uppercase">
                  {lot.lotNumber}
                </span>
                <span className="font-plex-mono text-caption text-iron/40">
                  condition report
                </span>
              </div>

              <h2 className="mt-4 font-newsreader text-[clamp(1.25rem,2vw+0.75rem,1.75rem)] leading-title tracking-tight text-iron">
                {lot.client}
              </h2>

              <p className="mt-1 font-newsreader text-reading leading-reading text-ink/70">
                {lot.title}
              </p>

              <div className="my-4 h-px w-full bg-iron/15" />

              <p className="font-plex-mono text-caption tracking-[0.08em] text-ink/60 uppercase">
                Condition on arrival
              </p>

              <p className="mt-2 max-w-[42ch] font-newsreader text-sm leading-reading text-ink">
                {lot.condition.length > 200
                  ? lot.condition.slice(0, 200) + "…"
                  : lot.condition}
              </p>

              <dl className="mt-4 flex flex-col gap-2">
                {lot.dataLines.slice(0, 3).map((line) => (
                  <DataLine key={line.label} {...line} />
                ))}
              </dl>

              <div className="mt-4 flex items-center justify-between">
                <Grade
                  grade={lot.grade.grade}
                  label={lot.grade.label}
                  date={lot.grade.date}
                />
              </div>

              {/* Specular sheen — material property, not decoration */}
              <div className="artifact-sheen" aria-hidden="true" />
            </div>
          ) : (
            /* Background leaves — show structure but less content */
            <div className="artifact-leaf-content artifact-leaf-content--bg">
              <div className="flex items-baseline justify-between">
                <span className="font-plex-mono text-data tracking-[0.08em] text-iron/30 uppercase">
                  {lot.lotNumber}
                </span>
                <span className="font-plex-mono text-caption text-iron/20">
                  condition report
                </span>
              </div>
              <div className="mt-3 h-3 w-24 bg-iron/8" />
              <div className="mt-2 h-2 w-32 bg-iron/5" />
              <div className="my-3 h-px w-full bg-iron/10" />
              <div className="space-y-2">
                <div className="h-2 w-full bg-iron/5" />
                <div className="h-2 w-3/4 bg-iron/5" />
                <div className="h-2 w-5/6 bg-iron/5" />
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Contact shadow on the bottom leaf only */}
      <div className="artifact-shadow" aria-hidden="true" />
    </div>
  );
}
