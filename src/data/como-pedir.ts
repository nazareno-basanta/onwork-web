/**
 * ✏️ Borrador para que Nachi corrija: textos de /como-pedir (5/11/2026).
 * La línea de tiempo usa COMO_PEDIR (src/data/inicio.ts), la misma del Inicio.
 * "Cómo mandarnos tu logo" sale de ../Web OW/06-PROMPT-CATALOGO-PRESUPUESTO.md
 * y de lo que confirmó Nachi: On Work adapta el logo si hace falta.
 */
export const COMO_PEDIR_PAGINA = {
  h1: "Cómo pedir.",
  bajada: "Armás el presupuesto en la web, lo mandás por WhatsApp y te acompañamos hasta la entrega.",
  seo: {
    titulo: "Cómo pedir merchandising con tu logo",
    descripcion:
      "Elegí productos de los catálogos, armá tu presupuesto y mandalo por WhatsApp. Te asesoramos, aprobás la prueba y enviamos a toda la Argentina.",
  },
  logo: {
    titulo: "Cómo mandarnos tu logo.",
    formas: [
      { titulo: "Mejor en vector", formatos: [".AI", ".EPS", ".PDF", ".SVG"] },
      { titulo: "Si no lo tenés", formatos: [".PNG", ".JPG"], nota: "En alta resolución." },
    ],
    adaptamos: "Si hace falta, adaptamos tu logo.",
  },
};
