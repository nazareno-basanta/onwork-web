/**
 * Lo que hace On Work y casos reales. Cada tarjeta lleva un mensaje de
 * WhatsApp ya escrito, así el cliente llega a la conversación con contexto.
 */
export type Servicio = {
  id: string;
  titulo: string;
  texto: string;
  mensaje: string;
};

export const SERVICIOS: Servicio[] = [
  {
    id: "merchandising",
    titulo: "Merchandising",
    texto:
      "Productos con la marca de tu empresa, pensados para que se usen y se recuerden.",
    mensaje: "¡Hola On Work! Quiero cotizar merchandising para mi empresa.",
  },
  {
    id: "indumentaria",
    titulo: "Indumentaria",
    texto:
      "Ropa de trabajo, uniformes y prendas de marca, hasta indumentaria técnica.",
    mensaje: "¡Hola On Work! Necesito indumentaria con la marca de mi empresa.",
  },
  {
    id: "carteleria",
    titulo: "Cartelería",
    texto: "Cartelería y comunicación visual para tu local, evento o empresa.",
    mensaje: "¡Hola On Work! Quiero consultar por cartelería.",
  },
  {
    id: "tarjeteria",
    titulo: "Tarjetería",
    texto: "Tarjetas y papelería corporativa con identidad cuidada.",
    mensaje: "¡Hola On Work! Quiero consultar por tarjetería y papelería.",
  },
  {
    id: "busquedas",
    titulo: "Búsquedas personalizadas",
    texto:
      "¿Necesitás algo puntual? Lo buscamos, lo conseguimos y te asesoramos de punta a punta.",
    mensaje:
      "¡Hola On Work! Estoy buscando un producto específico y quería que me asesoren.",
  },
];

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
      "¡Hola On Work! Necesito indumentaria técnica o de nieve para mi empresa.",
  },
  {
    titulo: "Fundas para gafas de ski",
    lugar: "Patagonia",
    texto:
      "Un producto que no está en ningún catálogo común: lo rastreamos y lo producimos con identidad de marca.",
    mensaje:
      "¡Hola On Work! Busco un producto muy específico, similar a fundas para gafas de ski.",
  },
];
