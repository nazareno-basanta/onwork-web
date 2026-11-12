import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { Children, isValidElement, type ReactElement, type ReactNode } from "react";
import Titular from "@/components/Titular";
import { textoWeb } from "@/lib/utils";

type ConHijos = ReactElement<{ children?: ReactNode }>;
const hijos = (nodo: ReactNode) =>
  Children.toArray(nodo).filter((n): n is ConHijos => isValidElement(n)).map((n) => n);

/**
 * Lee una tabla de Markdown (thead y tbody con sus filas) para armarla de
 * nuevo: devuelve los títulos de las columnas y, por fila, lo que va en cada
 * celda. Si la tabla no tiene esa forma, devuelve null.
 */
function leerTabla(children: ReactNode) {
  const partes = hijos(children);
  const cabeza = partes.find((p) => p.type === "thead");
  const cuerpo = partes.find((p) => p.type === "tbody");
  if (!cabeza || !cuerpo) return null;
  const titulos = hijos(hijos(cabeza.props.children)[0]?.props.children).map((th) => th.props.children);
  const filas = hijos(cuerpo.props.children).map((tr) => hijos(tr.props.children).map((td) => td.props.children));
  return titulos.length ? { titulos, filas } : null;
}

/**
 * Cómo se ven los textos de las notas de Ideas (src/data/ideas/*.mdx): cada
 * elemento de Markdown (## subtítulo, párrafo, lista, tabla, link) con los
 * estilos de la marca (DESIGN.md). Next.js necesita este archivo para leer
 * los .mdx.
 *
 * Como en el resto del sitio, los [marcadores] se ven en npm run dev y no en
 * la web publicada: un párrafo o subtítulo que es todo marcador no se muestra.
 */
const texto = (children: ReactNode) => (typeof children === "string" ? textoWeb(children) : children);

const link =
  "rounded-sm font-bold underline decoration-ow-yellow decoration-2 underline-offset-4 hover:decoration-ow-black";

const components: MDXComponents = {
  // Cada subtítulo es una pregunta: titular con su signo final en amarillo.
  h2: ({ children }) => {
    if (typeof children !== "string") {
      return <h2 className="mt-16 first:mt-0 font-display text-[clamp(1.7rem,3.4vw,2.6rem)] leading-none font-extrabold tracking-tight">{children}</h2>;
    }
    if (!textoWeb(children)) return null;
    return (
      <Titular as="h2" className="mt-16 text-[clamp(1.7rem,3.4vw,2.6rem)] first:mt-0">
        {children}
      </Titular>
    );
  },
  h3: ({ children }) => <h3 className="mt-10 font-display text-xl leading-tight font-bold md:text-2xl">{texto(children)}</h3>,
  p: ({ children }) => {
    const contenido = texto(children);
    return contenido ? <p className="mt-5 text-lg leading-relaxed text-ow-black/80">{contenido}</p> : null;
  },
  // Viñetas: un punto amarillo dibujado (no un carácter), como el de la diana.
  ul: ({ children }) => (
    <ul className="mt-5 space-y-2 text-lg leading-relaxed text-ow-black/80 [&>li]:relative [&>li]:pl-6 [&>li]:before:absolute [&>li]:before:top-[0.6em] [&>li]:before:left-0 [&>li]:before:size-2 [&>li]:before:rounded-full [&>li]:before:bg-ow-yellow">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-5 list-decimal space-y-2 pl-6 text-lg leading-relaxed text-ow-black/80 marker:font-display marker:font-extrabold marker:text-ow-black">
      {children}
    </ol>
  ),
  li: ({ children }) => <li>{texto(children)}</li>,
  // Tablas de comparación. Desde la tablet, tabla. En el celular cada fila es
  // una ficha: la primera celda como título y las demás con el nombre de su
  // columna arriba (ver .tabla-nota en globals.css). Antes la tabla se
  // deslizaba de costado y en 335 px cortaba la última columna a mitad de
  // palabra (crítica del 12/11/2026).
  table: ({ children }) => {
    const tabla = leerTabla(children);
    if (!tabla)
      return (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[28rem] border-collapse text-left">{children}</table>
        </div>
      );
    return (
      <table className="tabla-nota mt-8 w-full border-collapse text-left">
        <thead>
          <tr>
            {tabla.titulos.map((t, i) => (
              <th key={i} scope="col" className="border-b-2 border-ow-black py-3 pr-6 align-bottom font-display text-sm font-bold">
                {texto(t)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tabla.filas.map((celdas, f) => (
            <tr key={f}>
              {celdas.map((c, i) => (
                <td
                  key={i}
                  data-columna={typeof tabla.titulos[i] === "string" ? tabla.titulos[i] : undefined}
                  className="border-b border-ow-black/15 py-3 pr-6 align-top text-ow-black/80"
                >
                  {texto(c)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  },
  th: ({ children }) => (
    <th scope="col" className="border-b-2 border-ow-black py-3 pr-6 align-bottom font-display text-sm font-bold">
      {texto(children)}
    </th>
  ),
  td: ({ children }) => <td className="border-b border-ow-black/15 py-3 pr-6 align-top text-ow-black/80">{texto(children)}</td>,
  a: ({ href = "", children }) =>
    href.startsWith("/") ? (
      <Link href={href} className={link}>
        {children}
      </Link>
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer" className={link}>
        {children}
      </a>
    ),
  strong: ({ children }) => <strong className="font-bold text-ow-black">{children}</strong>,
  // Una cita textual, con quién la dijo: lo que más citan las IA.
  blockquote: ({ children }) => (
    <blockquote className="mt-8 border-l-4 border-ow-yellow pl-6 font-display text-xl leading-snug font-bold [&>p]:mt-0 [&>p]:text-ow-black">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-12 border-t-2 border-ow-black" />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
