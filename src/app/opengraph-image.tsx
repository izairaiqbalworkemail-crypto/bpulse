import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { brand } from "@/config/brand";

export const alt = `${brand.name} — ${brand.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          backgroundColor: "#EFEAE0",
          padding: 64,
        }}
      >
        <img
          src={logoSrc}
          width={72}
          height={72}
          alt=""
          style={{ marginBottom: 24, display: "block" }}
        />
        <div
          style={{
            fontSize: 56,
            fontFamily: "Georgia, serif",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: "#10161C",
            maxWidth: 900,
          }}
        >
          We finish what starts.
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 20,
            fontFamily: "Arial, sans-serif",
            color: "#38424E",
            maxWidth: 900,
          }}
        >
          {brand.description}
        </div>
      </div>
    ),
    { ...size },
  );
}
