"use client";

import { useId } from "react";

type MarkProps = {
  /**
   * Pixel size of the rendered mark. Typical sizes: 200, 64, 32, 16.
   */
  size: number;
  /**
   * Flat currentColor cut. Default is the 3D cream face + signal sides.
   */
  mono?: boolean;
  /**
   * When true, apply the load-time strike animation (scale 1.04 → 1.00).
   */
  struck?: boolean;
  className?: string;
  "aria-label"?: string;
};

const B_PATH =
  "M8 6.5h10.25c4.05 0 6.55 2.05 6.55 5.15 0 1.95-1.1 3.45-2.95 4.2 2.25.7 3.7 2.45 3.7 4.9 0 3.4-2.7 5.75-7.05 5.75H8V6.5Zm4.2 7.55h2.65c2.15 0 3.35-.95 3.35-2.4s-1.2-2.35-3.35-2.35H12.2v4.75Zm0 8.7h3.15c2.4 0 3.7-1.05 3.7-2.7s-1.3-2.6-3.7-2.6H12.2v5.3Z";

/**
 * The bpulse mark — constructed B, cream face, signal extrusion.
 */
export function Mark({
  size,
  mono = false,
  struck = false,
  className,
  "aria-label": ariaLabel = "bpulse",
}: MarkProps) {
  const uid = useId();
  const face = `${uid}-face`;
  const side = `${uid}-side`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      role="img"
      aria-label={ariaLabel}
      className={`${struck ? "mark-strike" : ""} ${className ?? ""}`.trim()}
    >
      {mono ? (
        <path fill="currentColor" fillRule="evenodd" d={B_PATH} />
      ) : (
        <>
          <defs>
            <linearGradient
              id={face}
              x1="8"
              y1="6"
              x2="24"
              y2="26"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#fff8ec" />
              <stop offset="0.42" stopColor="#efeae0" />
              <stop offset="1" stopColor="#d4cbb8" />
            </linearGradient>
            <linearGradient
              id={side}
              x1="16"
              y1="6"
              x2="18"
              y2="28"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#f6d56a" />
              <stop offset="0.55" stopColor="#f2c230" />
              <stop offset="1" stopColor="#c49212" />
            </linearGradient>
          </defs>
          <path
            fill={`url(#${side})`}
            fillRule="evenodd"
            transform="translate(1.15 1.35)"
            d={B_PATH}
          />
          <path fill={`url(#${face})`} fillRule="evenodd" d={B_PATH} />
        </>
      )}
    </svg>
  );
}
