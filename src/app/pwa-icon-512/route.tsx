import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0b0b0f",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            width: 360,
            height: 360,
            background: "#ff6b35",
            borderRadius: 72,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#0b0b0f",
            fontSize: 260,
            fontWeight: 900,
            letterSpacing: "-0.04em",
            boxShadow: "0 24px 80px rgba(255,107,53,0.5)",
          }}
        >
          K
        </div>
      </div>
    ),
    { width: 512, height: 512 },
  );
}
