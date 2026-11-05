/**
 * Textos de /nosotros. Fuente: ../Web OW/03-CONTENIDO-PAGINAS.md.
 * Lo que está entre [corchetes] falta confirmar.
 */
export const NOSOTROS = {
  h1: "Una empresa familiar, desde 1990.",
  // Antes era la bajada del hero del Inicio (movida acá por Nachi, 30/10/2026).
  bajada:
    "Desde 1990 hacemos que tu marca se vea, se use y se recuerde. Merchandising, indumentaria, cartelería y tarjetería para marcas de todos los tamaños.",
  historia:
    "On Work nació en 1990 de la mano de dos amigos recién egresados del colegio que eligieron las ventas. Empezaron con serigrafía y, con los años, sumaron técnicas, productos y servicios. Hoy es una empresa familiar que resuelve todo lo que gira en torno a la imagen de una marca.",
  seo: {
    titulo: "Empresa familiar de merchandising desde 1990",
    descripcion:
      "Desde 1990 acompañamos a marcas de todos los tamaños con merchandising, indumentaria, cartelería y tarjetería.",
  },
};

/**
 * Línea de tiempo: solo hitos confirmados. Mientras los intermedios sigan
 * entre corchetes, la página muestra la historia en texto y no la línea de
 * tiempo (ver ../Web OW/componentes/08-timeline-nosotros.md).
 */
export const HITOS = [
  { anio: "1990", texto: "Empezamos con serigrafía." },
  { anio: "[año]", texto: "[hito: técnica, servicio o cliente que marcó un cambio]" },
  { anio: "[año]", texto: "[hito]" },
  { anio: "2026", texto: "Catálogos propios en ocho líneas." },
];

export const VALORES = {
  titulo: "Cómo trabajamos.",
  items: [
    { titulo: "Buen servicio", texto: "Respondemos rápido y cumplimos lo que acordamos." },
    {
      titulo: "Atención personalizada",
      texto: "Cada pedido lo sigue una persona, de la consulta a la entrega. [confirmar]",
    },
    { titulo: "Resolver", texto: "Si el producto no está en el catálogo, lo buscamos." },
    {
      titulo: "Acompañar con experiencia",
      texto: "Desde 1990 asesorando a marcas de todos los tamaños.",
    },
  ],
};

export const TECNICAS = {
  titulo: "Técnicas con las que trabajamos.",
  nota: "[confirmar que siguen vigentes: sale de la web actual]",
  lista: [
    "Serigrafía",
    "Tampografía",
    "Impresión digital de gran formato",
    "Offset digital",
    "Sublimación",
    "Bordado",
    "Grabado láser",
    "Impresión UV",
    "Pantógrafo",
  ],
};

export const QUE_HACEMOS_NOSOTROS = {
  titulo: "Qué hacemos.",
  botonCatalogos: "Ver catálogos",
  botonPedidos: "Ver pedidos reales",
};
