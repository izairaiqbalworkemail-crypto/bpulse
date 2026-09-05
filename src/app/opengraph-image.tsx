import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { brand } from "@/config/brand";

export const alt = `${brand.name} — ${brand.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const cover = await readFile(
    join(process.cwd(), "public/bpulse-brand/social/bpulse-og.png")
  );
  const coverSrc = `data:image/png;base64,${cover.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
        }}
      >
        <img
          src={coverSrc}
          width={1200}
          height={630}
          alt=""
          style={{ display: "block" }}
        />
      </div>
    ),
    { ...size },
  );
}
