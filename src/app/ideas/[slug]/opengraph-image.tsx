import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { Diana } from "@/components/Formas";
import { AUTORES } from "@/data/autores";
import { IDEAS_VISIBLES, TIPOS } from "@/data/ideas";

// Imagen que se ve al compartir el link de una nota (WhatsApp, LinkedIn…): el
// mismo diseño que la de los catálogos, con el titular de la nota y quién la
// firma. Logo original en PNG (nunca tipeado) y la diana cortada por el borde.
export const alt = "Nota de Ideas de On Work";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Montserrat ExtraBold desde Google Fonts, solo con las letras que se usan. */
async function montserrat(texto: string) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=Montserrat:wght@800&text=${encodeURIComponent(texto)}`,
  ).then((r) => r.text());
  const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
  if (!url) throw new Error("No se pudo cargar Montserrat para la imagen de la nota");
  return fetch(url).then((r) => r.arrayBuffer());
}

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idea = IDEAS_VISIBLES.find((i) => i.slug === slug);
  if (!idea) return new Response(null, { status: 404 });

  const linea = `${TIPOS[idea.tipo]} · ${AUTORES[idea.autor].nombre}`;
  // El signo final (punto o pregunta) va en amarillo, pegado a la última palabra.
  const final = /[.?!]$/.test(idea.titulo) ? idea.titulo.slice(-1) : "";
  const palabras = (final ? idea.titulo.slice(0, -1) : idea.titulo).split(" ");
  // Los titulares largos van un poco más chicos, para que entren al lado de la diana.
  const tamano = idea.titulo.length > 60 ? 56 : 68;

  const [logo, fuente] = await Promise.all([
    readFile(join(process.cwd(), "public/brand/logo-onwork-og.png")),
    montserrat(`${linea}${idea.titulo}`),
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
        <Diana width={560} height={560} fill="#FEB600" style={{ position: "absolute", right: -190, top: 22 }} />
        <img src={`data:image/png;base64,${logo.toString("base64")}`} width={360} height={88} alt="" />
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 740 }}>
          <div style={{ fontSize: 34, color: "#5E6166" }}>{linea}</div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              marginTop: 12,
              fontSize: tamano,
              lineHeight: 1.05,
              letterSpacing: -1.5,
              color: "#231F20",
            }}
          >
            {palabras.map((palabra, i) => (
              <div key={i} style={{ display: "flex", marginRight: i < palabras.length - 1 ? 18 : 0 }}>
                {palabra}
                {i === palabras.length - 1 && final && <span style={{ color: "#FEB600" }}>{final}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Montserrat", data: fuente, weight: 800, style: "normal" }] },
  );
}
