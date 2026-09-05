import { ImageResponse } from "next/og";
import { lots, getLot } from "@/content/lots";
import { TRACE_SIZES, buildLotTrace, specFromLot } from "@/lib/lot-trace";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return lots.map((lot) => ({ slug: lot.slug }));
}

export default async function LotOg({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lot = getLot(slug);
  const built = buildLotTrace(
    specFromLot(lot),
    TRACE_SIZES.full.width,
    TRACE_SIZES.full.height,
  );

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          backgroundColor: "#0d1218",
          padding: 64,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 80,
            left: 64,
            right: 64,
            display: "flex",
          }}
        >
          <svg
            width="1072"
            height="268"
            viewBox={`0 0 ${built.width} ${built.height}`}
          >
            <line
              x1="0"
              y1={built.height / 2}
              x2={built.width}
              y2={built.height / 2}
              stroke="#efeae0"
              strokeOpacity="0.12"
              strokeWidth="1"
            />
            <path
              d={built.path}
              fill="none"
              stroke="#f2c230"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div style={{ fontSize: 22, color: "#efeae0", opacity: 0.65 }}>
          {lot.lotNumber}
        </div>
        <div
          style={{
            marginTop: 12,
            fontSize: 56,
            color: "#efeae0",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
          }}
        >
          {lot.client}
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 24,
            color: "#f2c230",
          }}
        >
          {lot.grade.label}
        </div>
      </div>
    ),
    { ...size },
  );
}
