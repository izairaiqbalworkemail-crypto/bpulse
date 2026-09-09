import {
  KEYSTONE_RING,
  KEYSTONE_VIEWBOX,
  KEYSTONE_WEDGE,
} from "@/lib/brand/keystone";
import { palette } from "@/lib/brand/palette";

type MarkProps = {
  size: number;
  /** Ground the mark sits on. Ink gets the paper ring. Paper gets the ink ring. */
  ground?: "ink" | "paper";
  /** Flat currentColor cut. Stamp only. */
  mono?: boolean;
  struck?: boolean;
  className?: string;
  "aria-label"?: string;
};

/**
 * The keystone: an unfinished ring locked by a flat gold wedge.
 */
export function Mark({
  size,
  ground = "ink",
  mono = false,
  struck = false,
  className,
  "aria-label": ariaLabel = "bpulse",
}: Readonly<MarkProps>) {
  const cls = `${struck ? "mark-strike" : ""} ${className ?? ""}`.trim();
  let ring: string = palette.paper;
  if (mono) ring = "currentColor";
  else if (ground === "paper") ring = palette.ink;
  const wedge = mono ? "currentColor" : palette.gold;

  return (
    <svg
      width={size}
      height={size}
      viewBox={KEYSTONE_VIEWBOX}
      fill="none"
      role="img"
      aria-label={ariaLabel}
      className={cls || undefined}
    >
      <path fill={ring} d={KEYSTONE_RING} />
      <path fill={wedge} d={KEYSTONE_WEDGE} />
    </svg>
  );
}
