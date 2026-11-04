/**
 * Regalos empresariales de fin de año (/regalos-empresariales-fin-de-ano).
 * Título y descripción para Google: ../Web OW/04-SEO-Y-REDIRECCIONES.md.
 *
 * ⚠️ Los textos de la página los escribe Nachi: todo lo que está [entre
 * corchetes] falta. Mientras quede alguno, la página no se publica (en la web
 * da "página no encontrada", no está en el sitemap y nadie la enlaza). En
 * npm run dev se ve con los marcadores, para ir completándola.
 *
 * Cada bloque lleva a un catálogo (slug de src/data/catalogos.ts).
 */
import { tieneMarcador } from "@/lib/utils";

export const REGALOS = {
  seo: {
    titulo: "Regalos empresariales de fin de año 2026",
    descripcion:
      "Calendarios 2027, kits materos y artículos de escritorio con tu marca para regalar a tu equipo y tus clientes.",
  },
  miga: "[texto: nombre corto de la página para la ruta de navegación]",
  h1: "[texto: titular con la búsqueda «regalos empresariales de fin de año»]",
  bajada: "[texto: bajada de 1 o 2 líneas]",
  bloques: [
    {
      catalogo: "oficina",
      titulo: "[texto: titular del bloque de calendarios 2027]",
      texto: "[texto: 1 o 2 líneas]",
    },
    {
      catalogo: "drinkware",
      titulo: "[texto: titular del bloque del kit matero]",
      texto: "[texto: 1 o 2 líneas]",
    },
    {
      catalogo: "escritura",
      titulo: "[texto: titular del bloque de escritura]",
      texto: "[texto: 1 o 2 líneas]",
    },
  ],
  /** Franja que lleva a esta página desde /catalogos. */
  enlace: {
    titulo: "[texto: titular de la franja en /catalogos]",
    boton: "[texto: botón de la franja]",
  },
};

/** Todos los textos de un objeto, a cualquier profundidad. */
const textos = (valor: unknown): string[] =>
  typeof valor === "string"
    ? [valor]
    : valor && typeof valor === "object"
      ? Object.values(valor).flatMap(textos)
      : [];

/** La página se publica sola cuando no le queda ningún marcador. */
export const REGALOS_LISTA = !textos(REGALOS).some(tieneMarcador);
