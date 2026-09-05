import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getReport } from "@/content/reports";

export const alt = "bpulse report";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ slug: string }> };

export default async function ReportOgImage({ params }: Props) {
  const { slug } = await params;
  const report = getReport(slug);
  const company = report?.company ?? "bpulse";
  const read = report?.theRead ?? "A private diagnostic.";
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
          backgroundColor: "#EFEAE0",
          padding: 64,
        }}
      >
        <img
          src={iconSrc}
          width={64}
          height={64}
          alt=""
          style={{ position: "absolute", top: 64, left: 64 }}
        />
        <div
          style={{
            fontSize: 20,
            fontFamily: "Arial, sans-serif",
            color: "#38424E",
            marginBottom: 16,
          }}
        >
          bpulse report · {company}
        </div>
        <div
          style={{
            fontSize: 36,
            fontFamily: "Georgia, serif",
            lineHeight: 1.25,
            color: "#10161C",
            maxWidth: 1000,
          }}
        >
          {read.slice(0, 220)}
        </div>
      </div>
    ),
    { ...size }
  );
}
