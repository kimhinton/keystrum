import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
            width: 124,
            height: 124,
            background: "#ff6b35",
            borderRadius: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#0b0b0f",
            fontSize: 92,
            fontWeight: 900,
            letterSpacing: "-0.04em",
            boxShadow: "0 12px 40px rgba(255,107,53,0.5)",
          }}
        >
          K
        </div>
      </div>
    ),
    { ...size },
  );
}
