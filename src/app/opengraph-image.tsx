import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "keystrum — Strum your keyboard";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const KEYBOARD_ROWS: string[][] = [
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L", ";"],
  ["Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"],
];

const CHORD_COLUMNS = ["Am", "C", "Em", "G", "Dm", "F"];
const CHORD_COLORS = ["#a78bfa", "#fb7185", "#60a5fa", "#34d399", "#fbbf24", "#f472b6"];

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0b0b0f",
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
            width: 700,
            height: 700,
            background: "radial-gradient(circle, rgba(255,107,53,0.28) 0%, rgba(255,107,53,0) 70%)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 36 }}>
          <div
            style={{
              width: 48,
              height: 48,
              background: "#ff6b35",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0b0b0f",
              fontSize: 32,
              fontWeight: 900,
            }}
          >
            K
          </div>
          <div style={{ color: "white", fontSize: 34, fontWeight: 700, letterSpacing: "-0.02em", display: "flex" }}>
            keystrum
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div
            style={{
              color: "white",
              fontSize: 92,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              marginBottom: 20,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex" }}>Strum your</div>
            <div style={{ display: "flex", color: "#ff6b35" }}>keyboard.</div>
          </div>

          <div style={{ color: "#a3a3a3", fontSize: 26, marginBottom: 44, display: "flex" }}>
            Four rows = four strings · Six columns = six chords
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: "auto" }}>
            {KEYBOARD_ROWS.map((row, rIdx) => (
              <div
                key={rIdx}
                style={{
                  display: "flex",
                  gap: 6,
                  paddingLeft: rIdx * 18,
                }}
              >
                {row.map((k, cIdx) => {
                  const isChord = cIdx < CHORD_COLUMNS.length;
                  return (
                    <div
                      key={k + cIdx}
                      style={{
                        width: 52,
                        height: 52,
                        background: "#1b1c22",
                        border: "1px solid #2b2d36",
                        borderRadius: 8,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: isChord ? "#ffffff" : "#8a8d99",
                        fontSize: 16,
                        fontWeight: 600,
                        fontFamily: "ui-monospace, Menlo, Consolas, monospace",
                        position: "relative",
                      }}
                    >
                      {k}
                      {isChord && rIdx === 3 && (
                        <div
                          style={{
                            position: "absolute",
                            top: -26,
                            left: 0,
                            right: 0,
                            textAlign: "center",
                            color: CHORD_COLORS[cIdx],
                            fontSize: 14,
                            fontWeight: 800,
                            fontFamily: "ui-sans-serif, system-ui, sans-serif",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          {CHORD_COLUMNS[cIdx]}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
