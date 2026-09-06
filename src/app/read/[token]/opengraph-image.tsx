import { ImageResponse } from "next/og";
import { getRead } from "@/lib/read/store";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function ReadOg({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const read = await getRead(token);
  const title = read?.title ?? "Preliminary read";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          backgroundColor: "#161614",
          padding: 64,
        }}
      >
        <div style={{ fontSize: 22, color: "#f4eee6", opacity: 0.7 }}>
          Preliminary read · bpulse
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 52,
            color: "#f4eee6",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            maxWidth: 980,
          }}
        >
          {title}
        </div>
        <div style={{ marginTop: 20, fontSize: 28, color: "#f2c230" }}>
          From your description. Not a diagnosis of unseen code.
        </div>
      </div>
    ),
    { ...size },
  );
}
