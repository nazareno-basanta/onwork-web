/**
 * Textos del Inicio y del cierre que comparten todas las páginas.
 * Fuente: ../Web OW/03-CONTENIDO-PAGINAS.md (aprobado por Nachi).
 * Lo que está entre [corchetes] falta confirmar.
 */
export const HERO = {
  titulo: "Merchandising que se hace notar.",
  /** Palabra del título que lleva el resaltado amarillo. */
  resaltado: "Merchandising",
  bajada:
    "Desde 1990 hacemos que tu marca se vea, se use y se recuerde. Merchandising, indumentaria, cartelería y tarjetería para marcas de todos los tamaños.",
  botonWhatsApp: "Escribinos por WhatsApp",
  botonCatalogos: "Ver catálogos",
};

/**
 * Probador del hero: la persona escribe su marca y la ve aplicada en los
 * productos. Textos en borrador para que Nachi los revise.
 */
export const PROBADOR = {
  label: "Probá con tu marca",
  placeholder: "El nombre de tu marca",
  /** Lo que se imprime mientras el campo está vacío (sistema de mockups). */
  ejemplo: "LOGO AQUÍ",
  /** Cómo empieza la frase cuando todavía no escribió nada. */
  tuMarca: "Tu marca",
  elegir: "Elegí un producto",
  largoMaximo: 18,
  /** Mensaje de WhatsApp cuando escribió su marca. */
  mensaje: (marca: string) => `Hola, vi On Work en la web. Mi marca es ${marca} y necesito:`,
};

/**
 * Productos del probador del hero y su palabra de "Tu marca, en cada ___.".
 * El dibujo de cada uno está en src/components/hero/Productos.tsx (mismo id).
 */
export const PRODUCTOS_HERO = [
  { id: "taza", nombre: "Taza", palabra: "sorbo" },
  { id: "credencial", nombre: "Credencial", palabra: "evento" },
  { id: "llavero", nombre: "Llavero", palabra: "llave" },
  { id: "delantal", nombre: "Delantal", palabra: "turno" },
  { id: "calendario", nombre: "Calendario", palabra: "escritorio" },
  { id: "banner", nombre: "Banner", palabra: "stand" },
  { id: "cuaderno", nombre: "Cuaderno", palabra: "anotación" },
] as const;

export type ProductoHeroId = (typeof PRODUCTOS_HERO)[number]["id"];

export const QUE_HACEMOS = {
  titulo: "Todo lo que gira en torno a tu marca.",
};

export const CATALOGOS_INICIO = {
  titulo: "Una base para arrancar.",
  bajada:
    "Siete catálogos con lo que más trabajamos. Son una parte de lo que hacemos: si lo que buscás no está, lo conseguimos.",
  boton: "Ver todos los catálogos",
};

export const PEDIDOS_INICIO = {
  titulo: "Pedidos reales.",
  bajada: "Así se ve la marca de nuestros clientes en cada producto.",
  boton: "Ver todos los pedidos",
};

export const COMO_TRABAJAMOS = {
  titulo: "Cómo trabajamos.",
  pasos: [
    {
      titulo: "Contanos tu proyecto.",
      texto:
        "Por WhatsApp, con una idea clara o con una duda. No hace falta tener todo definido.",
    },
    {
      titulo: "Te asesoramos y cotizamos.",
      texto:
        "Elegimos juntos el producto y la personalización según tu marca, la cantidad y la fecha.",
    },
    {
      titulo: "Producimos y te lo enviamos.",
      texto:
        "Hacemos el pedido con tu marca y lo enviamos a donde lo necesites, en toda la Argentina.",
    },
  ],
};

export const DESDE_1990 = {
  titulo: "Una empresa familiar, desde 1990.",
  texto:
    "Empezamos con serigrafía y fuimos sumando técnicas, productos y servicios. Hoy acompañamos a cada marca de la consulta a la entrega.",
  link: "Conocé On Work",
};

export const PREGUNTAS_TITULO = "Preguntas frecuentes.";

/** Cierre de todas las páginas. */
export const CIERRE = {
  titulo: "Contanos tu proyecto.",
  texto: "Te asesoramos en todo lo que tu marca necesite.",
  boton: "Escribinos por WhatsApp",
};

/** Franja que acompaña a los catálogos. */
export const FRANJA_CATALOGOS =
  "Consultanos por cantidades, plazos de entrega y disponibilidad de colores.";
