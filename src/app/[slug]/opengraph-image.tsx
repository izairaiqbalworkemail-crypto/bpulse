import { ImageResponse } from "next/og";

import { classifyArrivalState } from "@/lib/trace";
import { getResolvedReport, reportSignalCatalog } from "@/content/reports";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

function stateText(state: ReturnType<typeof classifyArrivalState>) {
  if (state === "integration-blocked") return "Integration-blocked";
  if (state === "stalled") return "Stalled";
  if (state === "incomplete") return "Incomplete";
  return "Unstable";
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const resolved = getResolvedReport(slug);
  if (!resolved) {
    return new ImageResponse(
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#10161C",
          color: "#EFEAE0",
          fontSize: 42,
        }}
      >
        Private report
      </div>,
      size
    );
  }

  const score = resolved.report.signals.reduce(
    (sum, key) => sum + reportSignalCatalog[key].weight,
    0
  );
  const state = classifyArrivalState(Math.max(0, Math.min(score, 12)));

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#10161C",
        color: "#EFEAE0",
        padding: "56px",
      }}
    >
      <div style={{ fontSize: 22, letterSpacing: "0.08em", textTransform: "uppercase" }}>
        private diagnostic
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        <div style={{ fontSize: 72, lineHeight: 1.05 }}>{resolved.report.company}</div>
        <div style={{ fontSize: 34, color: "#F2C230" }}>
          {stateText(state)} on arrival
        </div>
      </div>
      <div style={{ fontSize: 22, opacity: 0.8 }}>
        report.bpulse.dev/{resolved.report.slug}
      </div>
    </div>,
    size
  );
}
