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
import { tieneMarcador } from "@/lib/utils";

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
  /**
   * Rutas de las fotos en /public/pedidos/<slug>/; la primera es la portada.
   * ambiente: true en las fotos que no son de producto sobre blanco (un stand,
   * gente usándolo): esas llenan su marco y se recortan un poco; las de
   * producto van siempre enteras.
   */
  fotos: { src: string; alt: string; ambiente?: boolean }[];
  /**
   * Códigos OW de productos del catálogo que se usaron en el pedido, si están
   * en la web (se muestran en su página). Sin esto, van los primeros del
   * catálogo del pedido, con otro titular.
   */
  productos?: string[];
};

export const mensajePedido = (cliente: string) =>
  mensajeWeb(`el pedido de ${cliente}`);

export const PEDIDOS: Pedido[] = [
  // Datos de ../Web OW/pedidos-reales/casa-fernandes/datos.md (10/11/2026).
  {
    slug: "casa-fernandes",
    cliente: "Casa Fernandes",
    rubro: "Productos para instalaciones sanitarias",
    producto: "Sets materos y mochilas",
    disenoDelCliente: "si",
    uso: "Regalo de fin de año",
    catalogo: "drinkware",
    necesitaba:
      "Un regalo de fin de año hecho en conjunto con marcas productoras del rubro, con las dos marcas en cada pieza.",
    hicimos:
      "Producimos sets materos y mochilas con los logos de Casa Fernandes y de cada marca. La matera y la mochila llevan los logos a todo color; el termo, el mate y la bombilla van grabados.",
    cierre: "Tu marca, en cada ronda.",
    fotos: [
      {
        src: "/pedidos/casa-fernandes/set-matero-con-porta-mates.jpg",
        alt: "Set matero de Casa Fernandes: termo, mate con bombilla, matera y porta mates",
      },
      {
        src: "/pedidos/casa-fernandes/set-matero-azul.jpg",
        alt: "Set matero de Casa Fernandes con matera azul, termo, mate y bombilla",
      },
      {
        src: "/pedidos/casa-fernandes/termo-mate-y-bombilla.jpg",
        ambiente: true,
        alt: "Termo, mate y bombilla grabados con el logo de Casa Fernandes, sobre las materas",
      },
      {
        src: "/pedidos/casa-fernandes/mochilas.jpg",
        alt: "Cuatro mochilas grises con el logo de Casa Fernandes y el de otra empresa en cada una",
      },
    ],
  },
  // Datos de ../Web OW/pedidos-reales/emprotur-fit/datos.md (10/11/2026).
  {
    slug: "emprotur-fit",
    cliente: "Emprotur",
    rubro: "Turismo",
    producto: "Kit de feria",
    disenoDelCliente: "mixto",
    uso: "Feria Internacional de Turismo (FIT)",
    catalogo: "marroquineria",
    necesitaba:
      "Un kit para presentar Las Grutas, Puerto del Este y San Antonio Oeste en la Feria Internacional de Turismo, con un solo diseño en cada pieza.",
    hicimos:
      "Adaptamos su diseño a cada pieza y armamos el kit en sublimación, tampografía y serigrafía: gorras, bolsos, botellas, mochilas, lapiceras, cintas para credencial y folletos. La almohada de viaje y el frisbee no estaban en el catálogo: los conseguimos para este pedido.",
    cierre: "Tu marca, en cada stand.",
    // Portada: el kit completo, como en los otros pedidos (Nachi, 12/11/2026).
    fotos: [
      {
        src: "/pedidos/emprotur-fit/kit-feria.jpg",
        alt: "Kit de Las Grutas, Puerto del Este y San Antonio Oeste: gorra, mochila, almohada de viaje, botella, frisbee, bolsos, lapiceras, cintas para credencial y folletos",
      },
      {
        src: "/pedidos/emprotur-fit/stand-fit-la-rural.jpg",
        ambiente: true,
        alt: "Stand de Río Negro en la Feria Internacional de Turismo, con el kit de Las Grutas, Puerto del Este y San Antonio Oeste",
      },
    ],
  },
  // Datos de ../Web OW/pedidos-reales/cevt/datos.md (10/11/2026).
  {
    slug: "cevt",
    cliente: "CEVT",
    rubro: "Cooperativa eléctrica",
    producto: "Kit de viaje",
    disenoDelCliente: "si",
    uso: "Regalo de fin de año",
    catalogo: "marroquineria",
    necesitaba:
      "La Cooperativa Eléctrica de Venado Tuerto buscaba un set completo de viaje para regalarles a sus trabajadores a fin de año.",
    hicimos:
      "Producimos el kit con el logo de CEVT en cada pieza, en grabado láser y sublimación: mochila, bolsa de tela, botella y vaso térmicos, toalla de viaje, organizador para cables y porta documentos.",
    cierre: "Tu marca, en cada viaje.",
    fotos: [
      {
        src: "/pedidos/cevt/kit-completo.jpg",
        alt: "Kit de CEVT: bolsa de tela, botella y vaso térmicos, toalla de viaje, organizador y porta documentos",
      },
      {
        src: "/pedidos/cevt/kit-con-mochila.jpg",
        alt: "Kit de CEVT con mochila gris, organizadores, toalla de viaje, botellas y vaso térmicos",
      },
      {
        src: "/pedidos/cevt/bolsa-de-tela.jpg",
        alt: "Bolsa de tela gris con el logo de CEVT en naranja",
      },
      {
        src: "/pedidos/cevt/mochila-y-organizadores.jpg",
        alt: "Mochila gris con organizador y porta documentos, con el logo de CEVT",
      },
    ],
  },
];

/** La sección sale con 3 pedidos completos (../Web OW/pedidos-reales/LEEME.md). */
export const MINIMO_PEDIDOS = 3;

/** Un pedido está completo cuando no le queda ningún [marcador] en sus textos. */
const completo = (p: Pedido) =>
  ![p.rubro, p.producto, p.uso, p.necesitaba, p.hicimos, p.cierre, ...p.fotos.map((f) => f.alt)].some((t) =>
    tieneMarcador(t),
  );

/** Los pedidos que ya pueden estar en la web publicada. */
export const PEDIDOS_COMPLETOS = PEDIDOS.filter(completo);

/**
 * Hasta tener 3 pedidos completos, "Pedidos reales" no aparece en el menú, el
 * pie, el Inicio ni el sitemap, /pedidos no se indexa y las páginas de cada
 * pedido no están en la web publicada. Todo aparece solo con el tercero.
 */
export const HAY_PEDIDOS = PEDIDOS_COMPLETOS.length >= MINIMO_PEDIDOS;

/**
 * Los que tienen página: en npm run dev, todos (para revisarlos, con sus
 * marcadores); en la web publicada, los completos y solo cuando la sección ya salió.
 */
export const PEDIDOS_VISIBLES =
  process.env.NODE_ENV !== "production" ? PEDIDOS : HAY_PEDIDOS ? PEDIDOS_COMPLETOS : [];

/** Textos de /pedidos y de la página de cada pedido (03-CONTENIDO-PAGINAS.md). */
export const PEDIDOS_PAGINA = {
  h1: "Pedidos reales.",
  bajada: "Así se ve la marca de nuestros clientes en cada producto.",
  /** ✏️ Borrador de Claude (12/11/2026): marca los pedidos en la lista de /ideas, donde van mezclados con las notas. */
  etiqueta: "Pedido real",
  vacio:
    "[Pedidos reales: sumá al menos 3 carpetas en Web OW/pedidos-reales/ con el OK de cada cliente]",
  necesitaba: "Qué necesitaba.",
  hicimos: "Qué hicimos.",
  /** Botón de WhatsApp junto a lo que hicimos. Mismo texto que en el resto del sitio. */
  botonWhatsApp: "Escribinos por WhatsApp",
  productos: "Productos de este pedido.",
  /** ✏️ Borrador de Claude (12/11/2026): cuando el pedido no tiene sus productos cargados, van los primeros de su catálogo. */
  productosLinea: "Productos de la misma línea.",
  verCatalogo: "Ver el catálogo",
  seo: {
    titulo: "Pedidos reales de merchandising",
    descripcion:
      "Pedidos reales de On Work: cómo se ve la marca de cada cliente en cada producto.",
  },
};
