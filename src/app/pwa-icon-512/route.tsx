import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#18181F",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 420,
            height: 420,
            background: "radial-gradient(circle, rgba(123,44,191,0.45) 0%, rgba(123,44,191,0) 70%)",
            display: "flex",
          }}
        />
        <svg width="380" height="380" viewBox="0 0 130 130" style={{ display: "block", position: "relative" }}>
          <circle cx="32" cy="44" r="16" fill="#FF3864" />
          <circle cx="72" cy="30" r="11" fill="#FFC857" />
          <rect x="60" y="58" width="28" height="28" rx="8" fill="#7B2CBF" />
          <circle cx="98" cy="82" r="13" fill="#2EC4B6" />
          <rect x="22" y="80" width="22" height="22" rx="6" fill="#FFC857" transform="rotate(15 33 91)" />
          <circle cx="76" cy="106" r="8" fill="#FF3864" />
        </svg>
      </div>
    ),
    { width: 512, height: 512 },
  );
}
