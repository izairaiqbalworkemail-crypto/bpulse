import { ImageResponse } from "next/og";

export const alt = "Second Chair — we finish it. Then we make sure you can keep it.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function SecondChairOg() {
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
          Second Chair
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 56,
            color: "#f4eee6",
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            maxWidth: 980,
          }}
        >
          We finish it. Then we make sure you can keep it.
        </div>
        <div style={{ marginTop: 24, fontSize: 28, color: "#f2c230" }}>
          A named senior, on your repo. Not a course.
        </div>
      </div>
    ),
    { ...size },
  );
}
