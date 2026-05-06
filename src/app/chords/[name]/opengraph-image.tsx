import { ImageResponse } from "next/og";
import { buildChordInfo, getChordBySlug, getChordSlug } from "@keystrum/layout";

export const dynamic = "force-static";
export const alt = "keystrum guitar chord — virtual guitar online";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return buildChordInfo().map((c) => ({ name: getChordSlug(c.name) }));
}

export default async function OgChordImage(
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;
  const c = getChordBySlug(name);
  if (!c) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#0E0E12",
            color: "white",
            fontSize: 60,
          }}
        >
          keystrum
        </div>
      ),
      { ...size }
    );
  }
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0E0E12",
          display: "flex",
          flexDirection: "column",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          padding: "70px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 800,
            height: 800,
            background: `radial-gradient(circle, ${c.color}40 0%, ${c.color}00 70%)`,
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 36 }}>
          <div style={{ color: "white", fontSize: 30, fontWeight: 700, letterSpacing: "-0.02em", display: "flex" }}>
            keystrum
          </div>
          <div style={{ color: "#666", fontSize: 22, display: "flex" }}>chord dictionary</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div
            style={{
              color: c.color,
              fontSize: 260,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              display: "flex",
            }}
          >
            {c.name}
          </div>
          <div
            style={{
              color: "white",
              fontSize: 54,
              fontWeight: 600,
              marginTop: 14,
              display: "flex",
            }}
          >
            {c.label} guitar chord
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 28, flexWrap: "wrap" }}>
            {c.notes.map((n, i) => (
              <div
                key={i}
                style={{
                  background: `${c.color}1a`,
                  border: `2px solid ${c.color}66`,
                  borderRadius: 12,
                  padding: "10px 20px",
                  color: c.color,
                  fontSize: 32,
                  fontWeight: 700,
                  fontFamily: "ui-monospace, Menlo, Consolas, monospace",
                  display: "flex",
                }}
              >
                {n}
              </div>
            ))}
          </div>

          <div style={{ marginTop: "auto", color: "#9a9a9a", fontSize: 26, display: "flex" }}>
            Practice {c.name} on your QWERTY keyboard · keystrum.app
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
