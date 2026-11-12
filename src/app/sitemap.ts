import type { MetadataRoute } from "next";
import { CATALOGOS } from "@/data/catalogos";
import { PRODUCTOS } from "@/data/productos";
import { HAY_PEDIDOS, PEDIDOS_COMPLETOS } from "@/data/pedidos";
import { IDEAS_PUBLICADAS } from "@/data/ideas";
import { urlAutor, urlIdea, urlProducto } from "@/lib/rutas";
import { SITE } from "@/lib/site";

/**
 * Última edición de cada página (año-mes-día). Google la usa para saber qué
 * volver a leer: actualizala cuando cambies los textos de esa página.
 * (Sin priority ni changeFrequency: Google los ignora.)
 */
const EDICION = {
  // 10/11: el Inicio suma el carrusel de pedidos y cada catálogo, sus pedidos y sus notas de Ideas.
  inicio: "2026-11-10",
  catalogos: "2026-11-05",
  catalogo: "2026-11-10",
  producto: "2026-11-05",
  pdf: "2026-11-03",
  pedidos: "2026-11-10",
  nosotros: "2026-11-05",
  contacto: "2026-11-05",
  comoPedir: "2026-11-05",
};

// Mapa del sitio para Google: todas las páginas, los catálogos, cada producto,
// los pedidos y los PDF que ya estén publicados. /presupuesto no va (es de
// cada persona y no se indexa).
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${SITE.url}${path}`;
  const pagina = (path: string, fecha: string) => ({ url: url(path), lastModified: fecha });

  // Notas de Ideas publicadas: cada una con su fecha de actualización. /ideas y
  // la página de cada autor toman la fecha de su nota más nueva.
  const notas = IDEAS_PUBLICADAS.map((i) => ({ ...i, fecha: i.actualizado ?? i.publicado ?? EDICION.inicio }));
  const masNueva = (lista: typeof notas) => lista.map((n) => n.fecha).sort().at(-1) ?? EDICION.inicio;
  const autores = [...new Set(notas.map((n) => n.autor))];

  return [
    pagina("/", EDICION.inicio),
    pagina("/catalogos", EDICION.catalogos),
    ...CATALOGOS.map((c) => pagina(`/catalogos/${c.slug}`, EDICION.catalogo)),
    ...PRODUCTOS.map((p) => pagina(urlProducto(p), EDICION.producto)),
    ...CATALOGOS.filter((c) => c.pdf).map((c) => pagina(c.pdf!, EDICION.pdf)),
    // Cada pedido completo entra recién con 3 pedidos completos (antes no se indexan). La lista está en /ideas.
    ...(HAY_PEDIDOS ? PEDIDOS_COMPLETOS : []).map((p) => pagina(`/pedidos/${p.slug}`, EDICION.pedidos)),
    // /ideas entra recién con la primera nota publicada o los pedidos (antes no se indexa).
    ...(notas.length > 0 || HAY_PEDIDOS ? [pagina("/ideas", masNueva(notas))] : []),
    ...notas.map((n) => pagina(urlIdea(n.slug), n.fecha)),
    ...autores.map((a) => pagina(urlAutor(a), masNueva(notas.filter((n) => n.autor === a)))),
    pagina("/nosotros", EDICION.nosotros),
    pagina("/contacto", EDICION.contacto),
    pagina("/como-pedir", EDICION.comoPedir),
  ];
}
