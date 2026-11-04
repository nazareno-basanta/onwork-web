/**
 * Pedidos reales. Cada pedido tiene su página en /pedidos/<slug> y su tarjeta
 * en el carrusel del Inicio y de /pedidos.
 *
 * Cómo sumar un pedido:
 *   1. Completá ../Web OW/pedidos-reales/<cliente>/datos.md (plantilla en
 *      ../Web OW/pedidos-reales/_plantilla/datos.md) y sumá sus fotos.
 *   2. Las fotos van a /public/pedidos/<slug>/ (la primera es la portada).
 *   3. Agregá el pedido acá abajo con esos datos.
 *
 * ⚠️ Solo pedidos con el OK del cliente para aparecer con su nombre (y de las
 * personas que salgan en las fotos). Si el diseño lo trajo el cliente, el
 * texto dice "producimos", nunca "diseñamos".
 *
 * Candidatos: Condigral (delantales), Emprotur en la FIT, Casa Fernandes
 * (sets materos), Abertec (taza mágica), cliente patagónico (indumentaria de
 * nieve y fundas para gafas de ski).
 */
import { mensajeWeb } from "@/lib/mensajes";

export type Pedido = {
  slug: string;
  /** Nombre del cliente, como se escribe. */
  cliente: string;
  /** Usuario de Instagram, solo si el cliente lo confirmó. */
  instagram?: string;
  rubro: string;
  /** Producto o productos, para el título: "[Producto] para [Cliente]". */
  producto: string;
  /** "si" | "no" | "mixto": define si el texto dice "producimos". */
  disenoDelCliente: "si" | "no" | "mixto";
  /** Para qué lo usaron: evento, uniforme, regalo… */
  uso?: string;
  /** Slug del catálogo relacionado, si aplica. */
  catalogo?: string;
  /** Qué necesitaba (1 o 2 líneas). */
  necesitaba: string;
  /** Qué hicimos (2 o 3 líneas). */
  hicimos: string;
  /** Frase de cierre: "Tu marca, en cada ___." */
  cierre: string;
  /** Rutas de las fotos en /public/pedidos/<slug>/; la primera es la portada. */
  fotos: { src: string; alt: string }[];
};

export const mensajePedido = (cliente: string) =>
  mensajeWeb(`el pedido de ${cliente}`);

export const PEDIDOS: Pedido[] = [];

/**
 * Mientras no haya pedidos, "Pedidos reales" no aparece en el menú, el pie, el
 * Inicio ni el sitemap, y /pedidos no se indexa. Todo vuelve solo al cargar el
 * primero.
 */
export const HAY_PEDIDOS = PEDIDOS.length > 0;

/** Textos de /pedidos y de la página de cada pedido (03-CONTENIDO-PAGINAS.md). */
export const PEDIDOS_PAGINA = {
  h1: "Pedidos reales.",
  bajada: "Así se ve la marca de nuestros clientes en cada producto.",
  vacio:
    "[Pedidos reales: sumá al menos 3 carpetas en Web OW/pedidos-reales/ con el OK de cada cliente]",
  necesitaba: "Qué necesitaba.",
  hicimos: "Qué hicimos.",
  productos: "Productos de este pedido.",
  verCatalogo: "Ver el catálogo",
  seo: {
    titulo: "Pedidos reales de merchandising",
    descripcion:
      "Pedidos reales de On Work: cómo se ve la marca de cada cliente en cada producto.",
  },
};
