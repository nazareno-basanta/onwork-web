/**
 * Ajustes a mano de los productos. Este archivo lo editás vos: npm run productos
 * nunca lo pisa (solo lo lee).
 *
 * Por código de producto, podés:
 *   foto: 3              la foto principal (el número de la hoja de contactos,
 *                        ../Web OW/fotos-productos.html)
 *   fotos: [3, 1, 5]     cuáles van y en qué orden (la primera es la principal);
 *                        reemplaza la elección automática
 *   descartar: [2, 4]    fotos que no van, aunque el script las haya aceptado
 *   ocultar: true        el producto no aparece en la web (sigue en el PDF)
 *   fotoDeColor: { Negro: 20 }   qué foto muestra la galería al elegir cada
 *                        color en la página del producto
 *   textos: { ... }      corregir un texto del Excel (nombre, tipo, descripción,
 *                        medidas, hojas, colores o sección)
 *   nota: "…"            un recordatorio para vos; no se ve en la web
 *
 * Si elegís una foto que el script dejó afuera (opaca en la hoja de contactos),
 * corré npm run productos para que la copie.
 *
 * Un producto sin ninguna foto válida no aparece en la web: queda solo en el
 * PDF (decisión de Nachi, 4/11/2026). Un texto del Excel que nombra a un
 * proveedor o a otra marca no pasa a la web: si querés reemplazarlo, escribilo
 * acá en textos.
 */
export type AjusteProducto = {
  foto?: number;
  fotos?: number[];
  descartar?: number[];
  ocultar?: boolean;
  /** Al elegir un color en la página del producto, la galería va a esta foto. */
  fotoDeColor?: Record<string, number>;
  textos?: {
    nombre?: string;
    seccion?: string;
    tipo?: string;
    descripcion?: string;
    medidas?: string;
    hojas?: string;
    colores?: string[];
  };
  nota?: string;
};

const MARCA_DE_AGUA =
  "Marca de agua o gráfica del proveedor: no va hasta que elijas las fotos limpias (con «fotos» en este archivo).";

export const AJUSTES: Record<string, AjusteProducto> = {
  // Marca de agua o gráfica del proveedor (aviso de Nachi). "Gaiman"
  // (Drinkware) y "Olleros" (Marroquinería) ya no están en los Excel: si
  // cambiaron de nombre, sumalos acá con su código nuevo.
  "OW-DRK-21": { fotos: [], nota: MARCA_DE_AGUA }, // Calafate
  "OW-DRK-29": { fotos: [], nota: MARCA_DE_AGUA }, // Madryn
  "OW-DRK-37": { fotos: [], nota: MARCA_DE_AGUA }, // Callao Glitter
  "OW-DRK-39": { fotos: [], nota: MARCA_DE_AGUA }, // Defensa
  "OW-PAR-07": { fotos: [], nota: MARCA_DE_AGUA },

  // Borges: la pila de colores de principal, una foto de frente por color
  // (la misma toma) y un abierto; sin una toma distinta por cada color
  // (Nachi, 5/11/2026).
  "OW-CUA-01": {
    fotos: [9, 24, 27, 21, 33, 28, 25, 20, 22, 32, 26, 31, 30, 29, 11],
    fotoDeColor: {
      Amarillo: 24,
      Azul: 27,
      Blanco: 21,
      "Celeste pastel": 33,
      Gris: 28,
      Naranja: 25,
      Negro: 20,
      Rojo: 22,
      "Rosa pastel": 32,
      Verde: 26,
      "Verde pastel": 31,
      Violeta: 30,
      "Violeta pastel": 29,
    },
    // Sin "el más pedido": es una cifra de pedidos sin fuente (Nachi, 18/11/2026).
    textos: {
      descripcion:
        "Cuaderno A5: tapa dura forrada en eco cuero soft mate, banda elástica al tono y señalador. Hojas lisas o rayadas.",
    },
  },
  // Fotos con texto que no va en la web (revisadas con reconocimiento de
  // texto el 5/11/2026): nombre del proveedor, avisos del proveedor
  // ("Producto con opción de color especial…", "¡Consúltenos!"), "Impresión
  // full color" (no se aclara la personalización producto por producto),
  // infografías, logos de otras marcas, "Hecho en China" y rótulos en inglés.
  "OW-DRK-16": { descartar: [2] }, // Montecarlo: infografía de bombillas
  // Ushuaia: proveedor, "sublimar" y certificación. Solo Blanco y Negro tienen foto propia: Gris va a
  // la de cuatro botellas (12) y Azul, Rojo, Verde y Plateado a la de cinco (3), donde se ven.
  "OW-DRK-23": {
    descartar: [4, 5, 6, 7, 8, 10],
    fotoDeColor: { Blanco: 13, Negro: 14, Gris: 12, Azul: 3, Rojo: 3, Verde: 3, Plateado: 3 },
  },
  "OW-ESC-06": {
    descartar: [13],
    fotoDeColor: { Rojo: 6, Verde: 7, Rosa: 8, Amarillo: 9, Azul: 10, Blanco: 11, Negro: 12, Violeta: 14 },
  }, // Cerati: aviso del proveedor
  "OW-MAR-09": { descartar: [3] }, // Huemul: logo de otra empresa
  "OW-MAR-12": { descartar: [4, 5, 6] }, // Belvedere: FRONT / SIDE / BACK y colores en inglés
  // Más fotos con texto (5/11/2026: "ninguna foto con texto"): carteles, medidas, ejemplos "TU LOGO aquí".
  "OW-ESC-17": { descartar: [3], fotoDeColor: { Negro: 2, Gris: 4, Blanco: 5, "Azul marino": 6 } }, // Ramírez: "Recycled"
  // Troilo: "Tinta negra". En el Excel, "Tapas: amarillo, azul… violeta y más" quedó partido por las comas.
  "OW-ESC-23": {
    descartar: [9],
    textos: { colores: ["Amarillo", "Azul", "Naranja", "Negro", "Rojo", "Verde", "Violeta"] },
    fotoDeColor: { Amarillo: 1, Azul: 2, Naranja: 5, Negro: 6, Rojo: 7, Verde: 8 }, // Violeta: sin foto
  },
  "OW-MAR-27": { descartar: [1, 5, 6] }, // Chenque: "100%"
  "OW-MAR-29": { descartar: [2] }, // Perito: pasaporte con texto
  // Fitz Roy: la 1 queda (el "PASSPORT" está grabado en el producto y es la foto del PDF).
  "OW-MAR-30": { descartar: [3] },
  "OW-OFI-06": { descartar: [1, 2, 4, 5] }, // Fuentes: días de la semana impresos
  // Trevelin: la versión editada por Nachi para el catálogo (sacada del PDF; la original tenía medidas).
  "OW-DRK-27": { fotos: [3] },
  "OW-OFI-12": { descartar: [3], fotoDeColor: { Blanco: 1, Azul: 4 } }, // Minetti: "China" (Rojo: sin foto)
  "OW-OFI-17": { descartar: [1, 3] }, // Planetario: código de modelo y "Hecho en China"
  "OW-OFI-18": { descartar: [1, 3, 4, 5] }, // Kavanagh Mini: "Impresión full color" y "LOGO / TU CALENDARIO aquí"
  // Kavanagh: aviso del proveedor, "Impresión full color" y "LOGO AQUÍ" (Cristal: sin foto).
  "OW-OFI-19": { descartar: [1, 4, 5, 6], fotoDeColor: { Blanco: 2, Negro: 3 } },
  "OW-OFI-20": { descartar: [1, 4, 5, 6], fotoDeColor: { Blanco: 2, Negro: 3 } }, // Gran Kavanagh: ídem
  // Kavanagh Portalápiz: "Impresión full color" y "LOGO AQUÍ" (Cristal: sin foto).
  "OW-OFI-21": { descartar: [1, 4, 5], fotoDeColor: { Blanco: 2, Negro: 3 } },
  // Colón: dirección web, "Impresión full color" y "AQUÍ". Celeste va al azul opaco (4) y
  // Translúcidos al rojo translúcido (6): a confirmar.
  "OW-OFI-22": {
    descartar: [1, 13, 14, 15],
    fotoDeColor: { Blanco: 2, Amarillo: 3, Celeste: 4, Negro: 5, Translúcidos: 6, Rojo: 10, Cristal: 11, "Eco beige": 12 },
  },
  // Cervantes: aviso del proveedor y "TU LOGO aquí". Translúcidos va al azul translúcido (5): a confirmar.
  "OW-OFI-23": { descartar: [1, 2, 3, 4, 6, 7, 8, 10], fotoDeColor: { Translúcidos: 5, Cristal: 9 } },
  // Colón Tarjetero: "Colores especiales", "Impresión full color" y "AQUÍ".
  "OW-OFI-24": { descartar: [1, 3, 5, 6], fotoDeColor: { Blanco: 2, Negro: 4 } },

  // Máximo 20 fotos por producto y una por color y por toma, como en Borges
  // (Nachi, 5/11/2026): la foto de todos los colores, una serie con un color
  // por foto y, si hace falta, una de cada uso (abierto, soporte, sin tapa).
  // Gardel Silver (sin las de "Tinta azul"). En el Excel el color era una sola frase:
  // "Cuerpo plata (grip: amarillo, azul…) o negro" (Nachi, 18/11/2026: "Plata y amarillo", etc.).
  "OW-ESC-01": {
    fotos: [26, 15, 27, 29, 31, 33, 35, 37, 39, 41, 46],
    textos: {
      colores: [
        "Plata y amarillo",
        "Plata y azul",
        "Plata y naranja",
        "Plata y negro",
        "Plata y rojo",
        "Plata y rosa",
        "Plata y verde",
        "Plata y violeta",
        "Negro",
      ],
    },
    fotoDeColor: {
      "Plata y amarillo": 29,
      "Plata y azul": 27,
      "Plata y naranja": 37,
      "Plata y negro": 41,
      "Plata y rojo": 33,
      "Plata y rosa": 31,
      "Plata y verde": 35,
      "Plata y violeta": 39,
      Negro: 46,
    },
  },
  "OW-ESC-02": {
    fotos: [7, 15, 14, 10, 9, 16, 17, 11, 13, 12], // Gardel Color (sin la de "Tinta azul")
    fotoDeColor: { Amarillo: 15, Azul: 14, Blanco: 10, Naranja: 9, Negro: 16, Rojo: 17, Rosa: 11, Verde: 13, Violeta: 12 },
  },
  "OW-ESC-03": {
    fotos: [30, 17, 11, 15, 19, 16, 10, 12, 14, 13, 18], // Gardel White (sin las de "Tinta negra")
    fotoDeColor: { Amarillo: 17, Azul: 11, Blanco: 15, Celeste: 19, Naranja: 16, Negro: 10, Rojo: 12, Rosa: 14, Verde: 13, Violeta: 18 },
    // En el Excel, "Grip: amarillo, azul…" quedó partido por las comas: solo el color (Nachi, 18/11/2026).
    textos: { colores: ["Amarillo", "Azul", "Blanco", "Celeste", "Naranja", "Negro", "Rojo", "Rosa", "Verde", "Violeta"] },
  },
  "OW-ESC-05": {
    fotos: [17, 2, 3, 5, 6, 7, 8, 1, 9, 10], // Pappo
    fotoDeColor: { Amarillo: 2, Azul: 3, Celeste: 5, Naranja: 6, Negro: 7, Rojo: 8, Rosa: 1, Verde: 9, Violeta: 10 },
  },
  "OW-ESC-11": {
    fotos: [6, 13, 12, 11, 10, 9, 8, 7], // Yupanqui
    fotoDeColor: { Amarillo: 13, Azul: 12, Naranja: 11, Negro: 10, Rojo: 9, Verde: 8, Violeta: 7 },
  },
  "OW-ESC-19": {
    fotos: [1, 5, 10, 2, 8, 4], // Pugliese
    fotoDeColor: { Azul: 5, Negro: 10, Plateado: 2 },
  },
  "OW-ESC-20": {
    fotos: [1, 2, 9, 17, 8, 14, 5, 3, 4], // Salgán
    fotoDeColor: { Azul: 2, Celeste: 9, Naranja: 17, Rojo: 8, Verde: 14, Violeta: 5 },
  },
  "OW-CUA-02": { fotos: [11, 5, 1, 8, 10], fotoDeColor: { Azul: 11, Blanco: 5, Negro: 1, Rojo: 8 } }, // Borges Pocket
  "OW-CUA-11": { fotos: [1, 10, 4, 7, 3], fotoDeColor: { Azul: 1, Negro: 10, Rojo: 4, Verde: 7 } }, // Sábato
  "OW-CUA-15": { fotos: [7, 17, 12, 2, 8, 9], fotoDeColor: { Azul: 7, Negro: 17, Rojo: 12, Verde: 2 } }, // Quino
  "OW-CUA-17": { fotos: [4, 3, 8, 12, 15, 2], fotoDeColor: { Azul: 3, Negro: 8, Rojo: 12, Verde: 15 } }, // Walsh
  "OW-CUA-20": { fotos: [1, 2, 11, 10, 8], fotoDeColor: { Natural: 1, Negro: 2 } }, // Hernández
  "OW-OFI-16": { fotos: [1, 2, 10, 9, 3], fotoDeColor: { Negro: 10, Azul: 2, Rojo: 9 } }, // Bolsa (sin la caja)
  "OW-MAR-26": { fotos: [11, 2, 7, 4, 10], fotoDeColor: { Crema: 2, Negro: 7 } }, // Olivia

  // Gran Borges: la foto 1 tenía escritos los nombres del importador.
  "OW-CUA-03": { fotos: [3], nota: "La foto 1 tiene texto del importador y la 2, medidas: no van." },

  // Textos del Excel que chocan con las reglas de marca (PRODUCT.md): sin
  // "premium" (tono de proveedor) ni afirmaciones ambientales (Nachi, 18/11/2026).
  "OW-DRK-01": {
    textos: { descripcion: "Mate térmico importado, de acero con boca de acero inoxidable." },
    fotoDeColor: { Negro: 1, Blanco: 2 },
  }, // Apóstoles
  // Cafrune (también "Clip: violeta, azul…" partido por las comas en el Excel: solo el color).
  "OW-ESC-15": {
    textos: {
      descripcion: "Cuerpo de bamboo con clip de fibra de trigo y ABS. Retráctil, tinta negra.",
      colores: ["Violeta", "Azul", "Celeste", "Blanco", "Rosa", "Rojo", "Naranja", "Amarillo", "Verde"],
    },
    fotoDeColor: { Violeta: 2, Verde: 3, Rosa: 4, Rojo: 5, Naranja: 6, Celeste: 7, Blanco: 8, Azul: 9, Amarillo: 10 },
  },
  "OW-MAR-01": { textos: { tipo: "Mochila porta notebook" } }, // Aconcagua

  // Colores que el Excel partió por las comas ("Clip: amarillo, azul…"): solo el color (Nachi, 18/11/2026).
  "OW-ESC-07": {
    textos: { colores: ["Amarillo", "Azul", "Naranja", "Negro", "Rojo", "Rosa", "Verde", "Violeta"] },
    fotoDeColor: { Amarillo: 1, Azul: 2, Negro: 3, Rojo: 4, Rosa: 5, Verde: 6, Naranja: 8, Violeta: 9 },
  }, // Cerati Mix
  // Troilo Color: "Varios" no es un color; sin opciones, queda "A definir" y se ve por WhatsApp.
  "OW-ESC-24": { textos: { colores: [] } },

  // Drinkware: qué foto muestra la galería (y la lista del presupuesto) al
  // elegir cada color. Propuesta de Claude mirando las fotos (18/11/2026),
  // para que Nachi la revise. Sin foto propia: Bolsón Plateado y Callao Azul marino.
  "OW-DRK-05": { fotoDeColor: { Azul: 1, Negro: 2, "Verde militar": 3, Gris: 4 } }, // Luján
  "OW-DRK-06": { fotoDeColor: { Negro: 1, "Verde militar": 2, Azul: 3 } }, // Iguazú
  "OW-DRK-07": { fotoDeColor: { "Verde militar": 1, Negro: 2, Azul: 3 } }, // Paraná
  "OW-DRK-09": { fotoDeColor: { "Verde militar": 1, Negro: 2, Azul: 3 } }, // Bermejo
  "OW-DRK-13": { fotoDeColor: { Gris: 1, Negro: 2, "Verde militar": 3, Azul: 4 } }, // Arrecifes
  "OW-DRK-14": { fotoDeColor: { Azul: 1, Negro: 2, "Verde militar": 3 } }, // Limay
  "OW-DRK-17": { fotoDeColor: { Plateado: 1, Negro: 2 } }, // Oberá
  "OW-DRK-18": { fotoDeColor: { Negro: 2, Blanco: 3 } }, // Oberá con Manija
  "OW-DRK-19": { fotoDeColor: { Blanco: 3, Negro: 4 } }, // Virasoro
  "OW-DRK-22": { fotoDeColor: { Blanco: 3, Negro: 5 } }, // Trelew
  "OW-DRK-24": { fotoDeColor: { Negro: 1, Rojo: 2, Blanco: 3, Azul: 4 } }, // Ushuaia Matte
  "OW-DRK-26": { fotoDeColor: { Blanco: 2, Negro: 3, Gris: 4 } }, // Bolsón (la 4 es gris claro: a confirmar)
  "OW-DRK-28": { fotoDeColor: { Azul: 1, Rojo: 2, Blanco: 3, Negro: 4 } }, // Angostura
  "OW-DRK-30": { fotoDeColor: { Negro: 2, Blanco: 4 } }, // Recoleta
  "OW-DRK-31": { fotoDeColor: { Negro: 2, Blanco: 4 } }, // Recoleta con Manija
  "OW-DRK-33": { fotoDeColor: { Blanco: 2, Negro: 3 } }, // San Telmo
  "OW-DRK-34": { fotoDeColor: { Blanco: 1, Negro: 2 } }, // Chacarita
  "OW-DRK-36": { fotoDeColor: { Negro: 2, Azul: 3, Fucsia: 4, Rojo: 5 } }, // Callao

  // Escritura: ídem (propuesta de Claude, 18/11/2026, para revisar). Sin foto propia: Troilo Violeta.
  "OW-ESC-04": { fotoDeColor: { Azul: 4, Rojo: 6, Verde: 8, Blanco: 10, Negro: 12 } }, // Gardel Touch
  "OW-ESC-08": { fotoDeColor: { Azul: 2, Verde: 4, Blanco: 6, Negro: 8, Violeta: 10, Rojo: 12 } }, // Prodan
  "OW-ESC-09": { fotoDeColor: { Azul: 2, Celeste: 3, Rojo: 6, Verde: 8, Blanco: 10, Violeta: 12 } }, // Moura
  "OW-ESC-10": { fotoDeColor: { Azul: 1, Rojo: 2, Verde: 3 } }, // Sandro
  "OW-ESC-12": { fotoDeColor: { Negro: 2, Rojo: 3, Azul: 4 } }, // Yupanqui Touch
  "OW-ESC-13": { fotoDeColor: { Azul: 1, Kaki: 2, Rojo: 3 } }, // Sosa
  "OW-ESC-18": { fotoDeColor: { Blanco: 2, Negro: 3 } }, // Guarany
  "OW-ESC-21": { fotoDeColor: { Negro: 5, Blanco: 6 } }, // Goyeneche
  "OW-ESC-22": { fotoDeColor: { Blanco: 2, Negro: 4 } }, // D'Arienzo
  "OW-ESC-31": { fotoDeColor: { "Gris plata": 4, Blanco: 5, Azul: 6 } }, // Ginastera
  "OW-ESC-32": { fotoDeColor: { Negro: 1, Gris: 2 } }, // Barbieri
  "OW-ESC-33": { fotoDeColor: { Plateado: 1, Azul: 4 } }, // Mores
  "OW-ESC-35": { fotoDeColor: { Plata: 1, Negro: 2 } }, // Set Piazzolla

  // Cuadernos, Oficina, Marroquinería y Paraguas: ídem (propuesta de Claude,
  // 18/11/2026, para revisar). Lanín, Torre, Chapelco, Perito y el paraguas
  // automático con mango soft tienen fotos de un solo color: no se asignan.
  "OW-CUA-07": { fotoDeColor: { Blanco: 1, Negro: 2 } }, // Cortázar
  "OW-CUA-12": { fotoDeColor: { Azul: 1, Rojo: 4, "Verde (detalle)": 7 } }, // Lugones
  "OW-CUA-13": { fotoDeColor: { Negro: 2, Gris: 5, Azul: 6 } }, // Ocampo
  "OW-CUA-14": { fotoDeColor: { Negro: 4, Natural: 7 } }, // Puig
  "OW-CUA-18": { fotoDeColor: { Natural: 4, Azul: 5, Blanco: 6, Negro: 7, Rojo: 8, Verde: 9 } }, // Storni Flex
  // Fontanarrosa: el color es el del elástico y el bolígrafo.
  "OW-CUA-19": { fotoDeColor: { Violeta: 2, Verde: 3, Negro: 4, Rojo: 5, Azul: 6, Naranja: 7 } },
  "OW-OFI-08": { fotoDeColor: { Negro: 2, Natural: 3, Blanco: 4 } }, // Bencich
  "OW-OFI-09": { fotoDeColor: { Natural: 3, Negro: 7 } }, // Alas
  "OW-OFI-10": { fotoDeColor: { Azul: 1, Gris: 5 } }, // Roverano
  "OW-OFI-11": { fotoDeColor: { Azul: 1, Translúcido: 2 } }, // Catalinas
  "OW-OFI-15": { fotoDeColor: { Azul: 1, Rojo: 3, Verde: 5, Negro: 7 } }, // Correo
  "OW-MAR-05": { fotoDeColor: { Gris: 1, Negro: 3 } }, // Domuyo (Azul: sin foto)
  "OW-MAR-06": { fotoDeColor: { Azul: 1, "Gris oscuro": 2, Gris: 3 } }, // Chaltén (Celeste, Rosa, Rojo, Verde: sin foto)
  "OW-MAR-11": { fotoDeColor: { Gris: 1, Negro: 2 } }, // Mirador (Azul: sin foto)
  "OW-MAR-31": { fotoDeColor: { Negro: 2, "Azul marino": 3 } }, // Otto
  // Paraguas ejecutivo de madera (Azul y Bordó: sin foto).
  "OW-PAR-01": { fotoDeColor: { "Azul marino": 1, Verde: 2, Negro: 4, Gris: 8, "Azul francia": 9 } },
  "OW-PAR-02": { fotoDeColor: { "Azul marino": 1, Blanco: 2, Negro: 7 } }, // Ejecutivo con mango de goma (Rojo: sin foto)
  "OW-PAR-03": { fotoDeColor: { Azul: 1, "Gris claro": 2, Negro: 7 } }, // Ejecutivo con mango plástico
  "OW-PAR-04": { fotoDeColor: { Gris: 1, "Azul marino": 2, Negro: 7 } }, // Plegable con mosquetón (la 1 es gris oscuro: a confirmar)
  "OW-PAR-05": {
    fotoDeColor: { Celeste: 3, Blanco: 4, Amarillo: 5, "Violeta (colores pastel)": 6, Verde: 7, Rosa: 8, Negro: 9 },
  }, // Compacto automático
  "OW-PAR-06": { fotoDeColor: { Gris: 1, Negro: 6, Azul: 7 } }, // Mini manual
  // Golf automático: Blanco, Negro, Rojo y blanco y Verde y blanco van a la foto de todos (3).
  "OW-PAR-10": {
    fotoDeColor: {
      Azul: 1,
      "Celeste y blanco": 2,
      Blanco: 3,
      Negro: 3,
      "Rojo y blanco": 3,
      "Verde y blanco": 3,
      Violeta: 4,
      Naranja: 5,
      Verde: 6,
    },
  },
  "OW-PAR-11": { fotoDeColor: { "Verde claro": 1, Naranja: 5 } }, // Golf automático metálico
  // Golf antiviento (Azul francia: sin foto propia).
  "OW-PAR-12": {
    fotoDeColor: {
      Azul: 1,
      Negro: 4,
      "Blanco y azul": 5,
      "Celeste y blanco": 6,
      "Blanco y azul francia": 7,
      "Blanco y rojo": 8,
      "Verde inglés y blanco": 9,
    },
  },
  "OW-PAR-13": { fotoDeColor: { "Rojo y blanco": 1, Blanco: 2, Azul: 3 } }, // Golf manual (Celeste y blanco, Negro, Verde y blanco: sin foto)
  "OW-PAR-14": { fotoDeColor: { Azul: 1, Plateado: 8 } }, // Golf manual con mango soft (Negro: sin foto)
  // Golf con mango de foam (Blanco: sin foto).
  "OW-PAR-15": { fotoDeColor: { "Blanco y negro": 1, "Rojo y blanco": 3, "Verde y blanco": 4, "Azul y blanco": 5, Negro: 6 } },
};
