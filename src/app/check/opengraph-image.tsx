import { ImageResponse } from "next/og";
import { palette } from "@/lib/brand/palette";
import { offer } from "@/content/offer";

export const alt = "The Check. A written read, then five days.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function CheckOg() {
  const price = `$${offer.check.price.toLocaleString("en-US")}`;
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          backgroundColor: palette.ink,
          padding: 64,
        }}
      >
        <div style={{ fontSize: 22, color: palette.paper, opacity: 0.7 }}>
          The Check · five days
        </div>
        <div
          style={{
            marginTop: 12,
            fontSize: 96,
            color: palette.paper,
            lineHeight: 0.95,
            letterSpacing: "-0.04em",
          }}
        >
          {price}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 32,
            color: palette.gold,
            maxWidth: 900,
            lineHeight: 1.2,
          }}
        >
          A conversation that produces a written read. Then a verdict.
        </div>
      </div>
    ),
    { ...size },
  );
}
