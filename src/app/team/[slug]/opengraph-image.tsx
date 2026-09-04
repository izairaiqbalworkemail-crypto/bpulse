import { ImageResponse } from "next/og";
import { getSpecialist, specialists } from "@/content/specialists";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return specialists.map((person) => ({ slug: person.id }));
}

export default async function TeamOg({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const person = getSpecialist(slug);

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
        <div style={{ fontSize: 22, color: "#efeae0", opacity: 0.7 }}>
          {person.role}
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 56,
            color: "#efeae0",
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
            color: "#f2c230",
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
