import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { Diana } from "@/components/Formas";
import { CATALOGOS } from "@/data/catalogos";

// Imagen que se ve al compartir el link de un catálogo (WhatsApp, LinkedIn…):
// el mismo diseño que la del Inicio, con el nombre del catálogo. Logo original
// en PNG (nunca tipeado) y la diana de la marca cortada por el borde.
export const alt = "Catálogo de merchandising de On Work";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Montserrat ExtraBold desde Google Fonts, solo con las letras que se usan. */
async function montserrat(texto: string) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=Montserrat:wght@800&text=${encodeURIComponent(texto)}`,
  ).then((r) => r.text());
  const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
  if (!url) throw new Error("No se pudo cargar Montserrat para la imagen del catálogo");
  return fetch(url).then((r) => r.arrayBuffer());
}

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const catalogo = CATALOGOS.find((c) => c.slug === slug) ?? CATALOGOS[0];
  const linea = `Catálogo ${catalogo.anio}`;
  // Cada palabra es un bloque, y el punto amarillo va pegado a la última
  // (si no, en los nombres largos quedaría solo en otra línea).
  const palabras = catalogo.titulo.split(" ");

  const [logo, fuente] = await Promise.all([
    readFile(join(process.cwd(), "public/brand/logo-onwork-og.png")),
    montserrat(`${linea}${catalogo.titulo}.`),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#FFFCEF",
          borderBottom: "24px solid #FEB600",
          fontFamily: "Montserrat",
          position: "relative",
        }}
      >
        <Diana
          width={560}
          height={560}
          fill="#FEB600"
          style={{ position: "absolute", right: -190, top: 22 }}
        />
        <img src={`data:image/png;base64,${logo.toString("base64")}`} width={360} height={88} alt="" />
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 760 }}>
          <div style={{ fontSize: 40, color: "#5E6166" }}>{linea}</div>
          <div style={{ display: "flex", flexWrap: "wrap", marginTop: 12, fontSize: 92, lineHeight: 1.05, letterSpacing: -2, color: "#231F20" }}>
            {palabras.map((palabra, i) => (
              <div key={i} style={{ display: "flex", marginRight: i < palabras.length - 1 ? 24 : 0 }}>
                {palabra}
                {i === palabras.length - 1 && <span style={{ color: "#FEB600" }}>.</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Montserrat", data: fuente, weight: 800, style: "normal" }] },
  );
}
