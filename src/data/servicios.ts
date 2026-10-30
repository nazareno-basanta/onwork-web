/**
 * Lo que hace On Work ("Qué hacemos"), las búsquedas a medida y casos reales.
 * Textos de ../Web OW/03-CONTENIDO-PAGINAS.md. Lo que está entre [corchetes]
 * falta confirmar.
 */
export type Servicio = {
  id: string;
  titulo: string;
  texto: string;
  /** Mensaje de WhatsApp propio del servicio. Sin mensaje, usa el general. */
  mensaje?: string;
};

export const SERVICIOS: Servicio[] = [
  {
    id: "merchandising",
    titulo: "Merchandising",
    texto:
      "Productos con tu marca para regalar, entregar en un evento o usar todos los días.",
    mensaje: "Hola, vi On Work en la web. Necesito merchandising con mi marca:",
  },
  {
    id: "indumentaria",
    titulo: "Indumentaria",
    texto:
      "Ropa de trabajo, uniformes, delantales y prendas de marca, hasta indumentaria técnica.",
    mensaje: "Hola, vi On Work en la web. Necesito indumentaria con mi marca:",
  },
  {
    id: "carteleria",
    titulo: "Cartelería",
    texto: "Comunicación visual para tu local, tu stand o tu evento.",
    mensaje: "Hola, vi On Work en la web. Necesito cartelería:",
  },
  {
    id: "tarjeteria",
    titulo: "Tarjetería",
    texto: "Tarjetas y papelería comercial con tu identidad.",
    mensaje: "Hola, vi On Work en la web. Necesito tarjetería:",
  },
  {
    id: "fotografia",
    titulo: "Fotografía de producto",
    texto:
      "Fotos de producto para tu catálogo, tu tienda online o tus redes. [confirmar alcance]",
    mensaje: "Hola, vi On Work en la web. Necesito fotos de producto:",
  },
];

/**
 * "¿No está en el catálogo? Lo buscamos." Los ejemplos son productos reales
 * que On Work consiguió fuera de catálogo: sumá solo pedidos reales.
 * [sumar otros pedidos reales]
 */
export const BUSQUEDAS = {
  titulo: "¿No está en el catálogo? Lo buscamos.",
  texto:
    "Cada marca necesita algo distinto. Contanos qué tenés en mente: buscamos el producto, lo producimos con tu marca y te lo enviamos.",
  ejemplos: [
    "Indumentaria de nieve",
    "Fundas para gafas de ski",
    "Almohadas de viaje",
    "Frisbees",
    "Delantales",
    "Gorras trucker",
    "Mochilas",
  ],
  boton: "Contanos qué buscás",
  mensaje:
    "Hola, vi On Work en la web. Busco un producto que no está en los catálogos:",
};

export type Caso = {
  titulo: string;
  lugar: string;
  texto: string;
  mensaje: string;
};

export const CASOS: Caso[] = [
  {
    titulo: "Indumentaria de nieve",
    lugar: "Patagonia",
    texto:
      "Un cliente patagónico necesitaba indumentaria de nieve con su marca. La buscamos, la desarrollamos y la entregamos.",
    mensaje:
      "Hola, vi On Work en la web. Necesito indumentaria técnica o de nieve con mi marca:",
  },
  {
    titulo: "Fundas para gafas de ski",
    lugar: "Patagonia",
    texto:
      "Un producto que no está en ningún catálogo común: lo rastreamos y lo producimos con identidad de marca.",
    mensaje:
      "Hola, vi On Work en la web. Busco un producto que no está en los catálogos:",
  },
];
