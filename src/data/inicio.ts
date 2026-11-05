/**
 * Textos del Inicio y del cierre que comparten todas las páginas.
 * Fuente: ../Web OW/03-CONTENIDO-PAGINAS.md (aprobado por Nachi).
 * Lo que está entre [corchetes] falta confirmar.
 */
export const HERO = {
  // Frase de Nachi (30/10/2026).
  titulo: "Merchandising que hace que tu marca se vea, se use, y se recuerde.",
  /** Partes del titular que se subrayan en amarillo al pasar el mouse. */
  subrayados: ["se vea", "se use", "se recuerde"],
  botonWhatsApp: "Escribinos por WhatsApp",
  botonCatalogos: "Ver catálogos",
  /** Segundo botón del hero (Nachi, 5/11/2026): lleva a Nosotros. */
  botonConocenos: "Conocenos",
};

/**
 * "Tu marca, en cada ___." Aparece dentro del amarillo al final del scroll
 * del hero; las palabras pasan cada vez más rápido y la frase termina
 * siempre en la última ("detalle"). Con menos movimiento queda fija en la
 * última. Palabras de Nachi (2/11/2026).
 */
export const FRASE_ROTATIVA = {
  inicio: "Tu marca, en cada",
  palabras: [
    "evento",
    "sorbo",
    "uniforme",
    "escritorio",
    "viaje",
    "stand",
    "ronda",
    "anotación",
    "acto",
    "llavero",
    "detalle",
  ],
};

export const QUE_HACEMOS = {
  titulo: "Todo lo que gira en torno a tu marca.",
};

export const CATALOGOS_INICIO = {
  titulo: "Una base para arrancar.",
  bajada:
    "Ocho catálogos con lo que más trabajamos. Son una parte de lo que hacemos: si lo que buscás no está, lo conseguimos.",
  boton: "Ver todos los catálogos",
};

export const PEDIDOS_INICIO = {
  titulo: "Pedidos reales.",
  bajada: "Así se ve la marca de nuestros clientes en cada producto.",
  boton: "Ver todos los pedidos",
};

/**
 * ✏️ Borrador para que Nachi corrija: "Cómo pedir", la línea de tiempo del
 * Inicio y de /como-pedir. Los títulos y textos de los pasos salen de
 * ../Web OW/06-PROMPT-CATALOGO-PRESUPUESTO.md; los mensajes de las maquetas
 * los redactó Claude (5/11/2026).
 * Las maquetas de los pasos 2 a 5 son el chat de WhatsApp: la web no tiene
 * botón de aprobar ni seguimiento, todo eso pasa por WhatsApp.
 */
export const COMO_PEDIR = {
  titulo: "Cómo pedir.",
  pasos: [
    {
      titulo: "Elegí los productos.",
      texto:
        "Recorré los catálogos y sumá al presupuesto lo que te interese, con una cantidad aproximada. Si no sabés por dónde empezar, escribinos igual.",
    },
    {
      titulo: "Envianos el presupuesto.",
      texto:
        "El mensaje se arma solo, con los productos y las cantidades. Sumale la fecha y, si lo tenés, tu logo.",
    },
    {
      titulo: "Te asesoramos y cotizamos.",
      texto:
        "Revisamos el pedido con vos y te cotizamos según la cantidad, la personalización y la fecha. Si algo no está en los catálogos, lo buscamos.",
    },
    {
      titulo: "Aprobás la prueba.",
      texto: "Te mostramos cómo queda tu marca en el producto antes de producir.",
    },
    {
      titulo: "Producimos y te lo enviamos.",
      texto:
        "Hacemos el pedido con tu marca y lo enviamos a donde lo necesites. Buenos Aires · Envíos a toda la Argentina.",
    },
  ],
  botonCatalogos: "Ver catálogos",
  botonWhatsApp: "Escribinos por WhatsApp",
  /** Para lectores de pantalla: la barra con los números de los pasos. */
  navPasos: "Pasos para pedir",
  /** Link a /como-pedir desde el presupuesto y la franja de los catálogos. */
  linkPagina: "Ver cómo pedir",
  /** En el pie. */
  pie: "Cómo pedir",
  /** Lo que se ve dentro de las maquetas (todo inventado como ejemplo). */
  maquetas: {
    /** Productos reales del presupuesto de ejemplo: código, cantidad y color. */
    presupuesto: [
      { codigo: "OW-DRK-01", cantidad: 50, color: "Negro" },
      { codigo: "OW-ESC-02", cantidad: 100, color: "Amarillo" },
      { codigo: "OW-CUA-01", cantidad: 100, color: "Negro" },
    ],
    chat: "On Work",
    hora: ["10:24", "10:41", "16:05", "11:30"],
    fecha: "15 de diciembre",
    comentarios: "Te paso el logo.",
    archivo: "logo.pdf",
    asesor: ["¡Hola! Gracias por el presupuesto.", "¿Tu logo va a un color o a todo color? Así te pasamos la cotización."],
    respuesta: "A dos colores.",
    prueba: "Así queda tu logo en el Borges.",
    aprobado: "¡Aprobado!",
    envio: "Tu pedido ya salió para Rosario.",
    envioDesde: "Buenos Aires",
    envioHasta: "Rosario",
    gracias: "¡Gracias!",
  },
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
