/**
 * Catálogos publicados en la web.
 *
 * Para publicar un catálogo en PDF:
 *   1. Copiá el archivo a /public/catalogos/ (ej: drinkware-2026.pdf).
 *   2. Agregá  pdf: "/catalogos/drinkware-2026.pdf"  en el catálogo.
 *
 * Mientras no tenga `pdf`, la tarjeta muestra un botón para pedirlo por WhatsApp.
 * ⚠️ Antes de publicar un PDF, revisá que no tenga precios internos ni códigos
 * de proveedor que no quieras mostrar públicamente.
 */
export type Catalogo = {
  slug: string;
  titulo: string;
  descripcion: string;
  anio: number;
  pdf?: string;
};

export const CATALOGOS: Catalogo[] = [
  {
    slug: "drinkware",
    titulo: "Drinkware",
    descripcion: "Botellas, termos, vasos y mugs para personalizar.",
    anio: 2026,
  },
  {
    slug: "escritura",
    titulo: "Escritura",
    descripcion: "Bolígrafos y artículos de escritura con tu marca.",
    anio: 2026,
  },
  {
    slug: "cuadernos",
    titulo: "Cuadernos y anotadores",
    descripcion: "Cuadernos, libretas y anotadores corporativos.",
    anio: 2026,
  },
  {
    slug: "oficina",
    titulo: "Oficina y escritorio",
    descripcion: "Accesorios de oficina y escritorio personalizables.",
    anio: 2026,
  },
];
