import { ImageResponse } from "next/og";

// Imagen que se ve al compartir el link en WhatsApp, Instagram, LinkedIn, etc.
export const alt = "On Work — Merchandising que se hace notar";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FEB600",
          color: "#231F20",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 40, fontWeight: 800, letterSpacing: 6 }}>
          ON WORK!
        </div>
        <div style={{ display: "flex", fontSize: 108, fontWeight: 800, lineHeight: 1 }}>
          Merchandising que se hace notar.
        </div>
        <div style={{ display: "flex", fontSize: 34 }}>
          Comunicación & merchandising · Buenos Aires
        </div>
      </div>
    ),
    size,
  );
}
