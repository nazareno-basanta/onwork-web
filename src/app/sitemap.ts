import type { MetadataRoute } from "next";
import { CATALOGOS } from "@/data/catalogos";
import { HAY_PEDIDOS, PEDIDOS } from "@/data/pedidos";
import { SITE } from "@/lib/site";

/**
 * Última edición de cada página (año-mes-día). Google la usa para saber qué
 * volver a leer: actualizala cuando cambies los textos de esa página.
 * (Sin priority ni changeFrequency: Google los ignora.)
 */
const EDICION = {
  inicio: "2026-11-03",
  catalogos: "2026-11-03",
  catalogo: "2026-11-03",
  pdf: "2026-11-03",
  pedidos: "2026-11-03",
  nosotros: "2026-11-03",
  contacto: "2026-11-03",
};

// Mapa del sitio para Google: todas las páginas, los catálogos, los pedidos
// y los PDF que ya estén publicados.
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${SITE.url}${path}`;
  const pagina = (path: string, fecha: string) => ({ url: url(path), lastModified: fecha });

  return [
    pagina("/", EDICION.inicio),
    pagina("/catalogos", EDICION.catalogos),
    ...CATALOGOS.map((c) => pagina(`/catalogos/${c.slug}`, EDICION.catalogo)),
    ...CATALOGOS.filter((c) => c.pdf).map((c) => pagina(c.pdf!, EDICION.pdf)),
    // /pedidos entra recién cuando hay pedidos cargados (antes no se indexa).
    ...(HAY_PEDIDOS ? [pagina("/pedidos", EDICION.pedidos)] : []),
    ...PEDIDOS.map((p) => pagina(`/pedidos/${p.slug}`, EDICION.pedidos)),
    pagina("/nosotros", EDICION.nosotros),
    pagina("/contacto", EDICION.contacto),
  ];
}
