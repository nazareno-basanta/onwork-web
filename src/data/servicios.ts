/**
 * Lo que hace On Work ("Qué hacemos"), las búsquedas a medida y casos reales.
 * Textos de ../Web OW/03-CONTENIDO-PAGINAS.md. Lo que está entre [corchetes]
 * falta confirmar.
 */
import { mensajeWeb } from "@/lib/mensajes";

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
    mensaje: mensajeWeb("merchandising con mi marca"),
  },
  {
    id: "indumentaria",
    titulo: "Indumentaria",
    texto:
      "Ropa de trabajo, uniformes, delantales y prendas de marca, hasta indumentaria técnica.",
    mensaje: mensajeWeb("indumentaria con mi marca"),
  },
  {
    id: "carteleria",
    titulo: "Cartelería",
    texto: "Comunicación visual para tu local, tu stand o tu evento.",
    mensaje: mensajeWeb("cartelería"),
  },
  {
    id: "tarjeteria",
    titulo: "Tarjetería",
    texto: "Tarjetas y papelería comercial con tu identidad.",
    mensaje: mensajeWeb("tarjetería"),
  },
];

/** "¿No está en el catálogo? Lo buscamos." */
export const BUSQUEDAS = {
  titulo: "¿No está en el catálogo? Lo buscamos.",
  texto:
    "Cada marca necesita algo distinto. Contanos qué tenés en mente: buscamos el producto, lo producimos con tu marca y te lo enviamos.",
  boton: "Contanos qué buscás",
  mensaje:
    mensajeWeb("un producto que no está en los catálogos"),
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
      mensajeWeb("indumentaria técnica o de nieve con mi marca"),
  },
  {
    titulo: "Fundas para gafas de ski",
    lugar: "Patagonia",
    texto:
      "Un producto que no está en ningún catálogo común: lo rastreamos y lo producimos con identidad de marca.",
    mensaje:
      mensajeWeb("un producto que no está en los catálogos"),
  },
];
