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
  `Hola, vi el pedido de ${cliente} en la web. Necesito:`;

export const PEDIDOS: Pedido[] = [];
