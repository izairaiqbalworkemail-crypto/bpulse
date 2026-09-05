"use client";

import { useEffect, useId, useState } from "react";
import { useReducedMotion } from "motion/react";
import {
  TRACE_SIZES,
  buildLotTrace,
  type TraceSize,
  type TraceSpec,
} from "@/lib/lot-trace";

type TraceProps = {
  spec: TraceSpec;
  size?: TraceSize;
  surface?: "iron" | "paper";
  labelled?: boolean;
  className?: string;
};

export function Trace({
  spec,
  size = "card",
  surface = "paper",
  labelled = false,
  className,
}: Readonly<TraceProps>) {
  const reduce = useReducedMotion();
  const titleId = useId();
  const [entered, setEntered] = useState(false);
  const box = TRACE_SIZES[size];
  const built = buildLotTrace(spec, box.width, box.height);
  const stroke = surface === "iron" ? "#f2c230" : "#10161c";
  const drawn = Boolean(reduce) || entered;

  useEffect(() => {
    if (reduce) return;
    const node = document.getElementById(titleId);
    const svg = node?.closest("svg");
    if (!svg) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(svg);
    return () => observer.disconnect();
  }, [reduce, titleId]);

  return (
    <figure className={className}>
      <svg
        viewBox={`0 0 ${built.width} ${built.height}`}
        width="100%"
        height="100%"
        role="img"
        aria-labelledby={titleId}
        className="block overflow-visible"
      >
        <title id={titleId}>{built.description}</title>
        <line
          x1="0"
          y1={built.height / 2}
          x2={built.width}
          y2={built.height / 2}
          stroke={stroke}
          strokeOpacity="0.12"
          strokeWidth="1"
        />
        <path
          d={built.path}
          fill="none"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={drawn ? 0 : 1}
          style={{
            transition: reduce ? undefined : "stroke-dashoffset 900ms ease-out",
          }}
        />
        {labelled
          ? built.marks.map((mark) => (
              <text
                key={`${mark.label}-${mark.t}`}
                x={mark.x}
                y={Math.max(12, mark.y - 8)}
                textAnchor="middle"
                fill={stroke}
                fontSize="9"
                fontFamily="IBM Plex Mono, ui-monospace, monospace"
                opacity="0.7"
              >
                {mark.label}
              </text>
            ))
          : null}
      </svg>
      <figcaption className="sr-only">{built.description}</figcaption>
    </figure>
  );
}
