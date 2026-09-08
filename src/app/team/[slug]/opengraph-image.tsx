import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { findSpecialist, specialists } from "@/content/specialists";
import { palette } from "@/lib/brand/palette";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export const dynamicParams = false;

export function generateStaticParams() {
  return specialists.map((person) => ({ slug: person.id }));
}

export default async function TeamOg({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const person = findSpecialist(slug);
  if (!person) {
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "flex-end",
            backgroundColor: palette.ink,
            color: palette.paper,
            padding: 64,
            fontSize: 48,
          }}
        >
          Not in the catalogue
        </div>
      ),
      { ...size },
    );
  }
  const icon = await readFile(
    join(process.cwd(), "public/bpulse-brand/icon/bpulse-icon-512.png")
  );
  const iconSrc = `data:image/png;base64,${icon.toString("base64")}`;

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
        <img
          src={iconSrc}
          width={72}
          height={72}
          alt=""
          style={{ position: "absolute", top: 64, left: 64 }}
        />
        <div style={{ fontSize: 22, color: palette.paper, opacity: 0.7 }}>
          {person.role}
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 56,
            color: palette.paper,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
          }}
        >
          {person.name}
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 32,
            color: palette.gold,
            maxWidth: 900,
            lineHeight: 1.2,
          }}
        >
          {person.philosophy}
        </div>
      </div>
    ),
    { ...size },
  );
}
