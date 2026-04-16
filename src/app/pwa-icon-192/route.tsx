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
            width: 140,
            height: 140,
            background: "#ff6b35",
            borderRadius: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#0b0b0f",
            fontSize: 100,
            fontWeight: 900,
            letterSpacing: "-0.04em",
            boxShadow: "0 12px 40px rgba(255,107,53,0.5)",
          }}
        >
          K
        </div>
      </div>
    ),
    { width: 192, height: 192 },
  );
}
