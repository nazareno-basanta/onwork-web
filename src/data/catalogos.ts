/**
 * Los siete catálogos 2026. De acá salen la página general /catalogos, la
 * sección Catálogos del Inicio y la página propia de cada uno
 * (/catalogos/<slug>). Textos de ../Web OW/03-CONTENIDO-PAGINAS.md.
 *
 * Lo que está entre [corchetes] es un dato que falta o algo a confirmar:
 * se ve así en la web hasta que lo completes.
 *
 * Para publicar el PDF de un catálogo:
 *   1. Copiá el archivo a /public/catalogos/ con el nombre del slug,
 *      sin año (ej: drinkware.pdf), así el link no cambia en cada edición.
 *   2. Agregá  pdf: "/catalogos/drinkware.pdf"  en ese catálogo.
 * Mientras no tenga `pdf`, la web ofrece pedirlo por WhatsApp.
 * ⚠️ Antes de publicar un PDF, revisá que no tenga precios internos ni códigos
 * de proveedor.
 */
export type SeccionCatalogo = {
  nombre: string;
  /** Páginas del PDF donde está la sección, como se muestran: "03" o "04–06". */
  paginas: string;
  /** Texto de la sección (una o dos líneas). */
  texto?: string;
};

export type Catalogo = {
  slug: string;
  /** Nombre del catálogo: "Drinkware", "Cuadernos y anotadores". */
  titulo: string;
  /** Una línea para la tarjeta del catálogo. */
  tarjeta: string;
  /** Título principal de la página del catálogo (la búsqueda de Google). */
  h1: string;
  bajada: string;
  anio: number;
  paginas: number;
  modelos: number;
  secciones: SeccionCatalogo[];
  kit?: { titulo: string; texto: string };
  /** Frase de cierre: "Tu marca, en cada ___." */
  cierre: string;
  /** Título y descripción para Google (../Web OW/04-SEO-Y-REDIRECCIONES.md). */
  seo: { titulo: string; descripcion: string };
  /** Mensaje que llega precargado al tocar WhatsApp en esta página. */
  mensaje: string;
  /** Portada (página 1 del PDF), en /public/catalogos/portadas/. */
  portada?: string;
  pdf?: string;
};

const mensaje = (titulo: string) =>
  `Hola, vi el catálogo ${titulo} en la web. Necesito:`;

export const CATALOGOS: Catalogo[] = [
  {
    slug: "drinkware",
    seo: {
      titulo: "Mates, termos y botellas personalizados",
      descripcion:
        "Catálogo Drinkware 2026: mates, termos, botellas, jarros y tazas con tu marca. 41 modelos. Cotizá por WhatsApp.",
    },
    titulo: "Drinkware",
    tarjeta: "Mates, termos, botellas, jarros y tazas.",
    h1: "Mates, termos y botellas personalizados.",
    bajada:
      "Mates, termos, botellas, jarros y tazas para que tu marca acompañe cada ronda, cada viaje y cada café. 41 modelos en seis líneas, con variantes de color.",
    anio: 2026,
    paginas: 16,
    modelos: 41,
    secciones: [
      { nombre: "Mates", paginas: "03", texto: "Térmicos, de acero y de algarrobo." },
      {
        nombre: "Accesorios materos",
        paginas: "04–06",
        texto:
          "Materas, porta mates, mochilas materas, sets de yerbera y azucarera, y bombilla.",
      },
      {
        nombre: "Termos",
        paginas: "07–08",
        texto: "Termos de acero, autocebante y de 1 litro.",
      },
      {
        nombre: "Botellas y vasos térmicos",
        paginas: "09–11",
        texto:
          "Botellas térmicas, vasos de 1200 ml y botellas con tapa de bambú.",
      },
      {
        nombre: "Jarros de café",
        paginas: "12–13",
        texto: "Jarros térmicos, con y sin manija.",
      },
      {
        nombre: "Tazas de cerámica",
        paginas: "14–15",
        texto: "Tazas mágicas, con color interno y con glitter.",
      },
    ],
    kit: { titulo: "Armá tu kit matero.", texto: "Mate, termo y matera." },
    cierre: "Tu marca, en cada sorbo. [confirmar]",
    mensaje: mensaje("Drinkware"),
  },
  {
    slug: "escritura",
    seo: {
      titulo: "Lapiceras y bolígrafos personalizados",
      descripcion:
        "Catálogo Escritura 2026: bolígrafos, lápices y set ejecutivo con tu marca. 35 modelos. Cotizá por WhatsApp.",
    },
    titulo: "Escritura",
    tarjeta: "Bolígrafos, lápices y set ejecutivo.",
    h1: "Lapiceras y bolígrafos personalizados.",
    bajada:
      "Bolígrafos plásticos, ecológicos, metálicos y multifunción, lápices y un set ejecutivo. 35 modelos en nueve líneas.",
    anio: 2026,
    paginas: 13,
    modelos: 35,
    secciones: [
      {
        nombre: "Línea Lanín",
        paginas: "03",
        texto: "Plata, color, blanco y con puntero táctil. [2 líneas por sección: completar]",
      },
      { nombre: "Plásticos", paginas: "04–05", texto: "[2 líneas por sección: completar]" },
      { nombre: "Ecológicos", paginas: "06", texto: "[2 líneas por sección: completar]" },
      { nombre: "Bamboo y aluminio", paginas: "07", texto: "[2 líneas por sección: completar]" },
      { nombre: "Multifunción", paginas: "08", texto: "[2 líneas por sección: completar]" },
      { nombre: "Con capuchón", paginas: "09", texto: "[2 líneas por sección: completar]" },
      { nombre: "Lápices", paginas: "10", texto: "[2 líneas por sección: completar]" },
      { nombre: "Metálicos y escritorio", paginas: "11", texto: "[2 líneas por sección: completar]" },
      {
        nombre: "Set ejecutivo",
        paginas: "12",
        texto: "Bolígrafo y roller. [2 líneas por sección: completar]",
      },
    ],
    cierre: "Tu marca, en cada firma. [propuesta]",
    mensaje: mensaje("Escritura"),
  },
  {
    // ⚠️ Ningún texto de este catálogo puede sugerir que se personalizan las
    // hojas por dentro.
    slug: "cuadernos",
    seo: {
      titulo: "Cuadernos y anotadores personalizados",
      descripcion:
        "Catálogo Cuadernos y anotadores 2026: tapa dura, flexible, multifunción y ecológicos con tu marca. 25 modelos.",
    },
    titulo: "Cuadernos y anotadores",
    tarjeta: "Cuadernos, libretas y anotadores.",
    h1: "Cuadernos y anotadores personalizados.",
    bajada:
      "Cuadernos de tapa dura y flexible, con texturas, multifunción, ecológicos y anotadores. 25 modelos para que tu marca acompañe cada reunión.",
    anio: 2026,
    paginas: 11,
    modelos: 25,
    secciones: [
      { nombre: "Línea Borges", paginas: "03–04", texto: "[2 líneas por sección: completar]" },
      { nombre: "Tapas de diseño", paginas: "05", texto: "[2 líneas por sección: completar]" },
      { nombre: "Texturas y detalles", paginas: "06", texto: "[2 líneas por sección: completar]" },
      { nombre: "Multifunción", paginas: "07–08", texto: "[2 líneas por sección: completar]" },
      { nombre: "Ecológicos", paginas: "09", texto: "[2 líneas por sección: completar]" },
      { nombre: "Anotadores", paginas: "10", texto: "[2 líneas por sección: completar]" },
    ],
    cierre: "Tu marca, en cada anotación.",
    mensaje: mensaje("Cuadernos y anotadores"),
  },
  {
    // [definir qué PDF se publica: el completo o el "-selection"]
    slug: "oficina",
    seo: {
      titulo: "Calendarios 2027 y artículos de escritorio",
      descripcion:
        "Catálogo Oficina y escritorio 2026: sets, notas, útiles y calendarios 2027 con tu marca. 24 modelos.",
    },
    titulo: "Oficina y escritorio",
    tarjeta: "Sets de escritorio, notas, útiles y calendarios 2027.",
    h1: "Calendarios 2027 y artículos de escritorio personalizados.",
    bajada:
      "Sets de escritorio, notas y señaladores, útiles, tecnología y calendarios 2027 para que tu marca quede a la vista todos los días.",
    anio: 2026,
    paginas: 10,
    modelos: 24,
    secciones: [
      { nombre: "Sets de escritorio", paginas: "03–04" },
      { nombre: "Notas y señaladores", paginas: "05–06" },
      { nombre: "Útiles y tecnología", paginas: "07" },
      {
        nombre: "Calendarios 2027",
        paginas: "08",
        texto: "Línea Kavanagh en Mini, regular, Gran y con portalápiz.",
      },
      { nombre: "Escritorio con tu marca", paginas: "09" },
    ],
    cierre: "Tu marca, en cada escritorio.",
    mensaje: mensaje("Oficina y escritorio"),
  },
  {
    slug: "marroquineria",
    seo: {
      titulo: "Mochilas, bolsos y neceseres personalizados",
      descripcion:
        "Catálogo Marroquinería 2026: mochilas, bolsos, neceseres y artículos de viaje con tu marca. 27 modelos.",
    },
    titulo: "Marroquinería",
    tarjeta: "Mochilas, bolsos, neceseres y artículos de viaje.",
    h1: "Mochilas, bolsos y neceseres personalizados.",
    bajada:
      "Mochilas para notebook y livianas, bolsos y bandoleras, neceseres, organizadores y artículos de viaje y almuerzo. 27 modelos.",
    anio: 2026,
    paginas: 12,
    modelos: 27,
    secciones: [
      { nombre: "Mochilas notebook", paginas: "03–05", texto: "[2 líneas por sección: completar]" },
      { nombre: "Mochilas livianas", paginas: "06", texto: "[2 líneas por sección: completar]" },
      { nombre: "Bolsos y bandoleras", paginas: "07–08", texto: "[2 líneas por sección: completar]" },
      {
        nombre: "Neceseres y organizadores",
        paginas: "09–10",
        texto: "[2 líneas por sección: completar]",
      },
      { nombre: "Viaje y almuerzo", paginas: "11", texto: "[2 líneas por sección: completar]" },
    ],
    cierre: "Tu marca, en cada viaje. [propuesta]",
    mensaje: mensaje("Marroquinería"),
  },
  {
    slug: "cintas",
    seo: {
      titulo: "Cintas para credenciales e identificadores",
      descripcion:
        "Catálogo Cintas e identificación 2026: cintas sublimadas, identificadores, pines y medallas. 19 modelos.",
    },
    titulo: "Cintas e identificación",
    tarjeta: "Cintas para credenciales, identificadores, pines y medallas.",
    h1: "Cintas para credenciales, pines e identificadores.",
    bajada:
      "Cintas sublimadas, identificadores, pines, botones, medallas y pulseras para acreditaciones y eventos. 19 modelos.",
    anio: 2026,
    paginas: 9,
    modelos: 19,
    secciones: [
      {
        nombre: "Cintas sublimadas",
        paginas: "03",
        texto:
          "Cinta gros de 20 mm (estándar) o 25 mm, y raso de 25 mm. Impresión simple o doble faz según modelo y material.",
      },
      {
        nombre: "Cintas largas",
        paginas: "04",
        texto:
          "Con anzuelo, mosquetón, broche, mosquetón y broche, o mosquetón plástico.",
      },
      {
        nombre: "Cintas cortas",
        paginas: "05",
        texto: "Con broche (20 cm), mosquetón plástico o mosquetón de zamak.",
      },
      {
        nombre: "Identificadores",
        paginas: "06",
        texto: "Metálico, intercambiable y portacredencial retráctil.",
      },
      {
        nombre: "Pines",
        paginas: "07",
        texto: "Redondo, cuadrado, rectangular y matrizado.",
      },
      { nombre: "Botones, medallas y pulseras", paginas: "08" },
    ],
    kit: {
      titulo: "Armá tu kit de acreditación.",
      texto: "Cinta, identificador y pin.",
    },
    cierre: "Tu marca, en cada evento.",
    mensaje: mensaje("Cintas e identificación"),
  },
  {
    slug: "llaveros",
    seo: {
      titulo: "Llaveros y destapadores personalizados",
      descripcion:
        "Catálogo Llaveros 2026: cuero, metal, PVC, destapadores y línea automotor con tu marca. 36 modelos.",
    },
    titulo: "Llaveros",
    tarjeta: "Llaveros de cuero, metal, PVC y destapadores.",
    h1: "Llaveros y destapadores personalizados.",
    bajada:
      "Llaveros de cuero, metal, PVC, con tira, de alta gama y plastisol, destapadores y línea automotor. 36 modelos.",
    anio: 2026,
    paginas: 13,
    modelos: 36,
    secciones: [
      { nombre: "Etiquetas Domes", paginas: "03" },
      { nombre: "Cuero", paginas: "04", texto: "Cuero o símil cuero." },
      { nombre: "Metal", paginas: "05", texto: "Simple o doble faz." },
      {
        nombre: "PVC",
        paginas: "06–07",
        texto:
          "Redondo, rectangular, ovalado, cuadrado, pera, casa, camiseta y Argentina.",
      },
      { nombre: "Con tira", paginas: "08" },
      { nombre: "Alta gama y plastisol", paginas: "09" },
      { nombre: "Destapadores", paginas: "10–11" },
      {
        nombre: "Línea automotor",
        paginas: "12",
        texto: "Marco patente, portadocumentos y portacredenciales.",
      },
    ],
    cierre: "Tu marca, en cada llave.",
    mensaje: mensaje("Llaveros"),
  },
];

/** Textos de la página general /catalogos. */
export const CATALOGOS_HUB = {
  h1: "Catálogos de merchandising 2026.",
  bajada:
    "Estos siete catálogos son una base con lo que más trabajamos. No son todo: si buscás algo que no está, lo conseguimos para tu marca.",
  banda: {
    titulo: "¿No ves lo que buscás?",
    texto: "Hacemos búsquedas a medida: contanos qué necesitás y lo conseguimos.",
  },
  seo: {
    titulo: "Catálogos de merchandising 2026",
    descripcion:
      "Siete catálogos para ver online: drinkware, escritura, cuadernos, oficina, marroquinería, cintas y llaveros. Y si no está, lo conseguimos.",
  },
};

/**
 * Rótulos de la página de cada catálogo. Los botones salen de
 * 03-CONTENIDO-PAGINAS.md; los títulos de bloque son borradores para revisar.
 */
export const CATALOGO_PAGINA = {
  botonPdf: "Ver catálogo PDF",
  botonPedirPdf: "Pedir el PDF",
  botonWhatsApp: "Cotizá por WhatsApp",
  secciones: "Qué hay en este catálogo.",
  botonKit: "Cotizá tu kit",
  pedidos: "Pedidos reales de esta línea.",
};

/** Mensaje de WhatsApp para pedir un PDF que todavía no está publicado. */
export const mensajePedirPdf = (titulo: string) => `Hola, quiero el PDF del catálogo ${titulo}.`;
