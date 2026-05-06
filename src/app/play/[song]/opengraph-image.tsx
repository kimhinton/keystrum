import { ImageResponse } from "next/og";
import { SONGS, getSong } from "@/lib/game/songs";

export const dynamic = "force-static";
export const alt = "keystrum song chord practice";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return SONGS.map((s) => ({ song: s.id }));
}

export default async function OgSongImage(
  { params }: { params: Promise<{ song: string }> }
) {
  const { song: songId } = await params;
  const song = getSong(songId);
  if (!song) {
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
  const chords = Object.values(song.chordMap).filter((v, i, a) => a.indexOf(v) === i);
  const chordColors: Record<string, string> = {
    Am: "#a78bfa",
    C: "#fb7185",
    Em: "#60a5fa",
    G: "#34d399",
    Dm: "#fbbf24",
    F: "#f472b6",
  };
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
            width: 700,
            height: 700,
            background: "radial-gradient(circle, rgba(255,56,100,0.22) 0%, rgba(255,56,100,0) 70%)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 36 }}>
          <div style={{ color: "white", fontSize: 30, fontWeight: 700, letterSpacing: "-0.02em", display: "flex" }}>
            keystrum
          </div>
          <div style={{ color: "#666", fontSize: 22, display: "flex" }}>practice mode</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div
            style={{
              color: "white",
              fontSize: 88,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex" }}>{song.title}</div>
          </div>
          <div style={{ color: "#a3a3a3", fontSize: 30, marginTop: 16, display: "flex", maxWidth: 950 }}>
            {song.subtitle}
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 36, alignItems: "center", flexWrap: "wrap" }}>
            {chords.map((ch, i) => (
              <div
                key={i}
                style={{
                  background: "#1b1c22",
                  border: `2px solid ${chordColors[ch] ?? "#2b2d36"}`,
                  borderRadius: 12,
                  padding: "10px 22px",
                  color: chordColors[ch] ?? "white",
                  fontSize: 38,
                  fontWeight: 700,
                  fontFamily: "ui-monospace, Menlo, Consolas, monospace",
                  display: "flex",
                }}
              >
                {ch}
              </div>
            ))}
            <div
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 999,
                padding: "8px 18px",
                color: "#aaa",
                fontSize: 22,
                fontFamily: "ui-monospace, Menlo, Consolas, monospace",
                marginLeft: 8,
                display: "flex",
              }}
            >
              {song.difficulty}
            </div>
          </div>

          <div style={{ marginTop: "auto", color: "#9a9a9a", fontSize: 26, display: "flex" }}>
            Practice on QWERTY keyboard · keystrum.app/play/{song.id}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
