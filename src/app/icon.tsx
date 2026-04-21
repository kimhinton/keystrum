import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0E0E12",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 6,
        }}
      >
        <svg width="26" height="26" viewBox="0 0 130 130" style={{ display: "block" }}>
          <circle cx="32" cy="44" r="18" fill="#FF3864" />
          <circle cx="74" cy="32" r="13" fill="#FFC857" />
          <rect x="58" y="56" width="34" height="34" rx="10" fill="#7B2CBF" />
          <circle cx="102" cy="86" r="15" fill="#2EC4B6" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
