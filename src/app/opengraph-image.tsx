import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Imagen que se ve al compartir el link en WhatsApp, Instagram, LinkedIn, etc.
// Usa el logo original (PNG generado desde public/brand/logo-onwork-recortado.svg):
// el logo nunca se tipea.
export const alt = "On Work, comunicación y merchandising";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/brand/logo-onwork-og.png"));
  const src = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FFFCEF",
          borderBottom: "24px solid #FEB600",
        }}
      >
        <img src={src} width={900} height={221} alt="" />
      </div>
    ),
    size,
  );
}
