/**
 * Los ocho catálogos 2026. De acá salen la página general /catalogos, la
 * sección Catálogos del Inicio y la página propia de cada uno
 * (/catalogos/<slug>). Textos de ../Web OW/03-CONTENIDO-PAGINAS.md.
 *
 * Lo que está entre [corchetes] es un dato que falta o algo a confirmar:
 * se ve así en la compu (npm run dev) y no aparece en la web publicada.
 *
 * Las secciones van en el orden del PDF y con el nombre de la columna
 * "Sección" del Excel (si cambia una, cambiala en los dos lados).
 *
 * Para publicar el PDF de un catálogo, copiá el archivo a /public/catalogos/
 * con el nombre del slug, sin año (ej: drinkware.pdf), así el link no cambia
 * en cada edición. La web lo encuentra sola y muestra el botón "Descargar
 * catálogo PDF"; si el archivo no está, el botón no aparece. (En la compu,
 * reiniciá npm run dev para que lo vea.)
 * ⚠️ Antes de publicar un PDF, revisá que no tenga precios internos ni códigos
 * de proveedor.
 */
import { mensajeWeb } from "@/lib/mensajes";

export type SeccionCatalogo = {
  nombre: string;
  /** Páginas del PDF donde está la sección: "03" o "04–06". */
  paginas?: string;
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
  /** Páginas del PDF. */
  paginas?: number;
  /** Modelos del catálogo completo (el PDF), no solo los que están en la web. */
  modelos: number;
  /**
   * Código del producto cuya foto va en la tarjeta del catálogo. Si no está,
   * va el primero. Los catálogos sin productos en la web muestran la portada.
   */
  producto?: string;
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
  /** Lo completa la web sola si el PDF está en /public/catalogos/. */
  pdf?: string;
};

const mensaje = (titulo: string) =>
  mensajeWeb(`el catálogo ${titulo}`);

const LISTA: Catalogo[] = [
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
      {
        nombre: "Mates",
        paginas: "03",
        texto: "Mates térmicos, de acero y de algarrobo, ideales para eventos o kits de bienvenida con nivel premium.",
      },
      {
        nombre: "Accesorios materos",
        paginas: "04–06",
        texto: "Materas, porta mates, yerberas y bombillas para completar el kit matero.",
      },
      {
        nombre: "Termos",
        paginas: "07–08",
        texto: "Termos y autocebantes de acero inoxidable de 750 ml a 1 litro, pensados para el mate de todos los días.",
      },
      {
        nombre: "Botellas y vasos térmicos",
        paginas: "09–11",
        texto: "Botellas y vasos de acero con doble pared para llevar la bebida fría o caliente a todos lados.",
      },
      {
        nombre: "Jarros de café",
        paginas: "12–13",
        texto: "Jarros térmicos con tapa para llevar el café a todos lados.",
      },
      {
        nombre: "Tazas de cerámica",
        paginas: "14–15",
        texto: "Tazas de cerámica clásicas y mágicas.",
      },
    ],
    kit: { titulo: "Armá tu kit matero.", texto: "Mate, termo y matera." },
    cierre: "Tu marca, en cada sorbo.",
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
        nombre: "Línea Gardel",
        paginas: "03",
        texto: "Nuestro clásico: bolígrafo retráctil con grip de goma, clip metálico y detalles cromados. Cuatro versiones, con tinta azul o negra según el color.",
      },
      {
        nombre: "Plásticos",
        paginas: "04–05",
        texto: "Livianos, coloridos y económicos: los más elegidos para eventos, ferias y entregas masivas.",
      },
      {
        nombre: "Ecológicos",
        paginas: "06",
        texto: "Cartón reciclado, fibra de trigo y plástico reciclado para comunicar una marca responsable.",
      },
      {
        nombre: "Bamboo y aluminio",
        paginas: "07",
        texto: "Bamboo, fibra de trigo y aluminio reciclado: la versión premium de la línea ecológica.",
      },
      {
        nombre: "Multifunción",
        paginas: "08",
        texto: "Bolígrafos que no solo escriben: sostienen el celular, sanitizan o resaltan. Regalos útiles que se usan todos los días.",
      },
      {
        nombre: "Con capuchón",
        paginas: "09",
        texto: "El bolígrafo de siempre, en cuatro versiones. Simple, liviano, un clásico.",
      },
      {
        nombre: "Lápices",
        paginas: "10",
        texto: "Lápices de madera y ecológicos para kits escolares, capacitaciones y eventos.",
      },
      {
        nombre: "Metálicos y escritorio",
        paginas: "11",
        texto: "Terminaciones metálicas y sets de escritorio para regalos empresariales con presencia.",
      },
      {
        nombre: "Set ejecutivo",
        paginas: "12",
        texto: "Bolígrafo y roller metálicos en estuche: un regalo empresarial listo para entregar.",
      },
    ],
    cierre: "Tu marca, en cada trazo.",
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
      {
        nombre: "Línea Borges",
        paginas: "03–04",
        texto: "Nuestro clásico: tapa dura de eco cuero, banda elástica y señalador, en tres tamaños.",
      },
      {
        nombre: "Tapa dura de diseño",
        paginas: "05–06",
        texto: "Dos materiales, mármol y brillo: tapas que se destacan solas. Denim, bambú y cierre magnético para un cuaderno con carácter propio.",
      },
      {
        nombre: "Multifunción",
        paginas: "07–08",
        texto: "Cuadernos que organizan: notas adhesivas, banderitas y soporte para celular, todo a mano.",
      },
      {
        nombre: "Ecológicos",
        paginas: "09",
        texto: "Kraft y cartón reforzado, con bolígrafo ecológico incluido.",
      },
      {
        nombre: "Anotadores",
        paginas: "10",
        texto: "Formatos chicos para el bolsillo, el escritorio o el próximo evento.",
      },
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
      {
        nombre: "Sets de escritorio",
        paginas: "03–04",
        texto: "Organizadores que reúnen notas, señaladores y portalápices en un solo objeto. Ideales para kits de bienvenida y regalos empresariales.",
      },
      {
        nombre: "Notas y señaladores",
        paginas: "05–06",
        texto: "Notas adhesivas, señaladores y memos para el día a día en la oficina.",
      },
      {
        nombre: "Útiles y tecnología",
        paginas: "07",
        texto: "Lápices, herramientas y tecnología para completar el escritorio.",
      },
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
    paginas: 13,
    modelos: 27,
    secciones: [
      {
        nombre: "Mochilas notebook",
        paginas: "03–05",
        texto: "Mochilas con compartimiento acolchado para notebook, ideales para el trabajo y la facultad.",
      },
      {
        nombre: "Mochilas livianas",
        paginas: "06",
        texto: "Mochilas simples y livianas para el día a día, los paseos y las escapadas.",
      },
      {
        nombre: "Bolsos y bandoleras",
        paginas: "07–08",
        texto: "Bolsos de viaje, bandoleras y maletines para moverse con comodidad.",
      },
      {
        nombre: "Neceseres y organizadores",
        paginas: "09–10",
        texto: "Neceseres para tener todo en su lugar, en casa o de viaje. Organizadores y accesorios para viajar con todo ordenado y a mano.",
      },
      {
        nombre: "Viaje y aire libre",
        paginas: "11–12",
        texto: "Carry on y valijas de cabina para viajar livianos y con todo en su lugar.",
      },
    ],
    cierre: "Tu marca, en cada viaje.",
    mensaje: mensaje("Marroquinería"),
  },
  {
    // Paraguas: la tarjeta, las secciones y el cierre salen del PDF del
    // catálogo; el H1, la bajada y el SEO son borradores de Claude (4/11/2026).
    slug: "paraguas",
    seo: {
      titulo: "Paraguas personalizados",
      descripcion:
        "Catálogo Paraguas 2026: paraguas ejecutivos, plegables y golf con tu marca. 15 modelos. Cotizá por WhatsApp.",
    },
    titulo: "Paraguas",
    tarjeta: "Paraguas ejecutivos, plegables y de golf.",
    h1: "Paraguas personalizados.",
    bajada:
      "Paraguas ejecutivos, plegables y golf para que tu marca acompañe cada día de lluvia. 15 modelos en tres líneas, con variantes de color.",
    anio: 2026,
    paginas: 8,
    modelos: 15,
    secciones: [
      {
        nombre: "Ejecutivos",
        paginas: "03",
        texto: "Paraguas ejecutivos de uso diario, con mango curvo.",
      },
      {
        nombre: "Plegables y otros formatos",
        paginas: "04–05",
        texto: "Paraguas que se pliegan para guardarlos en la mochila o la cartera.",
      },
      {
        nombre: "Golf",
        paginas: "06–07",
        texto: "Paraguas grandes, automáticos y antiviento, para una mayor cobertura.",
      },
    ],
    cierre: "Tu marca, en cada lluvia.",
    mensaje: mensaje("Paraguas"),
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

// Los PDF que están en /public/catalogos/ (los busca next.config.ts al
// arrancar la web).
const PDF_PUBLICADOS = (process.env.CATALOGOS_PDF ?? "").split(",").filter(Boolean);

export const CATALOGOS: Catalogo[] = LISTA.map((c) => ({
  ...c,
  pdf: PDF_PUBLICADOS.includes(c.slug) ? `/catalogos/${c.slug}.pdf` : undefined,
}));

/** Textos de la página general /catalogos. */
export const CATALOGOS_HUB = {
  h1: "Catálogos de merchandising 2026.",
  // (Ya no se muestra: Nachi sacó la bajada del hub el 5/11/2026.)
  bajada:
    "Estos ocho catálogos son una base con lo que más trabajamos. No son todo: si buscás algo que no está, lo conseguimos para tu marca.",
  // (Ya no se usa: desde el Prompt 3 la banda del hub es la de búsquedas a
  // medida, "¿No está en el catálogo? Lo buscamos.". Queda por si la querés volver a usar.)
  banda: {
    titulo: "¿No ves lo que buscás?",
    texto: "Hacemos búsquedas a medida: contanos qué necesitás y lo conseguimos.",
  },
  // ✏️ Borradores de Claude (4/11/2026), para revisar:
  buscador: {
    etiqueta: "Buscá un producto en todos los catálogos",
    ejemplo: "Ej.: mate, mochila, paraguas, OW-DRK-01",
    resultados: (n: number, q: string) => (n === 1 ? `1 producto para «${q}»` : `${n} productos para «${q}»`),
    sinResultados: (q: string) => `No encontramos «${q}» en los catálogos.`,
    loBuscamos: "Lo buscamos para tu marca: sumalo a tu presupuesto o escribinos.",
    /** Lo buscado está en un catálogo o una sección sin productos en la web (solo en el PDF). */
    enCatalogo: (donde: string) => `Está en ${donde}.`,
    enCatalogoTexto: "Sus modelos no están en la web: sumalo a tu presupuesto o escribinos y te pasamos las opciones.",
    tambienEn: "También en:",
    borrar: "Borrar la búsqueda",
    /** Título (solo para lectores de pantalla) de los resultados. */
    resultadosTitulo: "Resultados de la búsqueda",
    mensaje: (q: string) => mensajeWeb(`un producto que no está en los catálogos: ${q}`),
  },
  seo: {
    titulo: "Catálogos de merchandising 2026",
    descripcion:
      "Ocho catálogos para ver online: drinkware, escritura, cuadernos, oficina, marroquinería, paraguas, cintas y llaveros. Y si no está, lo conseguimos.",
  },
};

/**
 * Rótulos de la página de cada catálogo. Los botones salen de
 * 03-CONTENIDO-PAGINAS.md; los títulos de bloque son borradores para revisar.
 */
export const CATALOGO_PAGINA = {
  botonPdf: "Descargar catálogo PDF",
  botonWhatsApp: "Escribinos por WhatsApp",
  /** Título de la lista de secciones en los catálogos sin productos en la web (Cintas, Llaveros). */
  secciones: "Qué hay en este catálogo.",
  botonKit: "Cotizá tu kit",
  pedidos: "Pedidos reales de esta línea.",
  // ✏️ Borradores de Claude (4/11/2026), para revisar:
  /** Nombre de la barra de secciones para lectores de pantalla. */
  navSecciones: "Secciones del catálogo",
  /** Debajo de una sección que no tiene productos en la web (Set ejecutivo, por ejemplo). */
  lineaEnElPdf: "Los modelos de esta línea están en el catálogo PDF.",
  /** Lo mismo, si el PDF todavía no está subido. */
  lineaSinPdf: "Los modelos de esta línea no están en la web.",
  consultarLinea: "Consultanos por esta línea",
  mensajeLinea: (seccion: string, catalogo: string) => mensajeWeb(`la línea ${seccion} del catálogo ${catalogo}`),
};

/** Textos de la tarjeta de cada producto. */
export const TARJETA_PRODUCTO = {
  colores: (n: number) => (n === 1 ? "1 color" : `${n} colores`),
};

/**
 * Textos de la página de cada producto (/catalogos/<catálogo>/<producto>).
 * "¿Dudas con este producto?", "Escribinos por WhatsApp" y "Más de…" salen
 * del prompt 06; el resto son borradores de Claude (4/11/2026).
 */
export const PRODUCTO_PAGINA = {
  medidas: "Medidas",
  hojas: "Hojas",
  colores: "Colores",
  /** ✏️ Borrador: debajo de los colores, si el producto tiene más de uno. */
  colorAyuda: "Si todavía no lo sabés, dejalo en «A definir»: lo ves después en tu presupuesto.",
  dudas: "¿Dudas con este producto?",
  dudasLink: "Escribinos por WhatsApp",
  mensaje: (nombre: string, codigo: string) => mensajeWeb(`el producto ${nombre} (${codigo})`),
  mas: (de: string) => `Más de ${de}.`,
  /** ✏️ Borradores: el link al lado de "Más de…". */
  verSeccion: "Ver la sección completa",
  verCatalogo: "Ver el catálogo completo",
};
