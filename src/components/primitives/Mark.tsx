type MarkProps = {
  /**
   * Rendered height in pixels. Width follows the extruded B.
   */
  size: number;
  /**
   * Ground the mark sits on. Iron gets the cream face. Rag gets the iron face.
   * Gold extrusion stays in both.
   */
  ground?: "iron" | "rag";
  /**
   * Flat currentColor cut. Favicon / stamp only.
   */
  mono?: boolean;
  struck?: boolean;
  className?: string;
  "aria-label"?: string;
};

const FACE =
  "M8 6.5h10.25c4.05 0 6.55 2.05 6.55 5.15 0 1.95-1.1 3.45-2.95 4.2 2.25.7 3.7 2.45 3.7 4.9 0 3.4-2.7 5.75-7.05 5.75H8V6.5Zm4.2 7.55h2.65c2.15 0 3.35-.95 3.35-2.4s-1.2-2.35-3.35-2.35H12.2v4.75Zm0 8.7h3.15c2.4 0 3.7-1.05 3.7-2.7s-1.3-2.6-3.7-2.6H12.2v5.3Z";

/**
 * The mark the studio provided: cream face, gold side.
 * Source geometry: /public/mark.svg and /public/bpulse-B.svg.
 */
export function Mark({
  size,
  ground = "iron",
  mono = false,
  struck = false,
  className,
  "aria-label": ariaLabel = "bpulse",
}: Readonly<MarkProps>) {
  const width = Math.round((size * 32) / 32);
  const cls = `${struck ? "mark-strike" : ""} ${className ?? ""}`.trim();
  const uid = `bpulse-mark-${ground}-${size}-${mono ? "m" : "c"}`;

  if (mono) {
    return (
      <svg
        width={width}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        role="img"
        aria-label={ariaLabel}
        className={cls}
      >
        <path fill="currentColor" fillRule="evenodd" d={FACE} />
      </svg>
    );
  }

  const face =
    ground === "rag"
      ? { start: "#3c2a1d", mid: "#2f2118", end: "#3c2a1d" }
      : { start: "#fff8ec", mid: "#f4eee6", end: "#d4cbb8" };

  return (
    <svg
      width={width}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      role="img"
      aria-label={ariaLabel}
      className={cls}
    >
      <defs>
        <linearGradient
          id={`${uid}-face`}
          x1="8"
          y1="6"
          x2="24"
          y2="26"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor={face.start} />
          <stop offset="0.42" stopColor={face.mid} />
          <stop offset="1" stopColor={face.end} />
        </linearGradient>
        <linearGradient
          id={`${uid}-side`}
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
        fill={`url(#${uid}-side)`}
        fillRule="evenodd"
        transform="translate(1.15 1.35)"
        d={FACE}
      />
      <path fill={`url(#${uid}-face)`} fillRule="evenodd" d={FACE} />
    </svg>
  );
}
