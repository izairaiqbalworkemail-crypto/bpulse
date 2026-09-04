import Image from "next/image";
import { brand } from "@/config/brand";

type MarkProps = {
  /**
   * Pixel size of the rendered mark. Typical sizes: 200, 64, 32, 16.
   */
  size: number;
  /**
   * Kept for call-site compatibility. The public logo is the plate;
   * there is no generated mono variant.
   */
  mono?: boolean;
  /**
   * When true, apply the load-time strike animation (scale 1.04 → 1.00).
   */
  struck?: boolean;
  className?: string;
  "aria-label"?: string;
};

/**
 * The bpulse mark — the logo file in /public.
 *
 * Used in the Masthead, as the favicon source, and on error pages.
 * The file is the identity; this component only sizes it.
 */
export function Mark({
  size,
  mono: _mono,
  struck = false,
  className,
  "aria-label": ariaLabel = "bpulse",
}: MarkProps) {
  return (
    <Image
      src={brand.logo}
      alt={ariaLabel}
      width={size}
      height={size}
      className={`${struck ? "mark-strike" : ""} ${className ?? ""}`.trim()}
      priority={size >= 32}
    />
  );
}
