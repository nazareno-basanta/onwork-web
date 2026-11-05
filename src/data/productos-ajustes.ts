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
  "Marca de agua o gráfica del proveedor: no va hasta que elijas las fotos limpias (fotos: [...]).";

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
  },
  // Fotos con texto que no va en la web (revisadas con reconocimiento de
  // texto el 5/11/2026): nombre del proveedor, avisos del proveedor
  // ("Producto con opción de color especial…", "¡Consúltenos!"), "Impresión
  // full color" (no se aclara la personalización producto por producto),
  // infografías, logos de otras marcas, "Hecho en China" y rótulos en inglés.
  "OW-DRK-16": { descartar: [2] }, // Montecarlo: infografía de bombillas
  "OW-DRK-23": { descartar: [4, 5, 6, 7, 8, 10] }, // Ushuaia: proveedor, "sublimar" y certificación
  "OW-ESC-06": { descartar: [13] }, // Cerati: aviso del proveedor
  "OW-MAR-09": { descartar: [3] }, // Huemul: logo de otra empresa
  "OW-MAR-12": { descartar: [4, 5, 6] }, // Belvedere: FRONT / SIDE / BACK y colores en inglés
  // Más fotos con texto (5/11/2026: "ninguna foto con texto"): carteles, medidas, ejemplos "TU LOGO aquí".
  "OW-ESC-17": { descartar: [3] }, // Ramírez: "Recycled"
  "OW-ESC-23": { descartar: [9] }, // Troilo: "Tinta negra"
  "OW-MAR-27": { descartar: [1, 5, 6] }, // Chenque: "100%"
  "OW-MAR-29": { descartar: [2] }, // Perito: pasaporte con texto
  // Fitz Roy: la 1 queda (el "PASSPORT" está grabado en el producto y es la foto del PDF).
  "OW-MAR-30": { descartar: [3] },
  "OW-OFI-06": { descartar: [1, 2, 4, 5] }, // Fuentes: días de la semana impresos
  // Trevelin: la versión editada por Nachi para el catálogo (sacada del PDF; la original tenía medidas).
  "OW-DRK-27": { fotos: [3] },
  "OW-OFI-12": { descartar: [3] }, // Minetti: "China"
  "OW-OFI-17": { descartar: [1, 3] }, // Planetario: código de modelo y "Hecho en China"
  "OW-OFI-18": { descartar: [1, 3, 4, 5] }, // Kavanagh Mini: "Impresión full color" y "LOGO / TU CALENDARIO aquí"
  "OW-OFI-19": { descartar: [1, 4, 5, 6] }, // Kavanagh: aviso del proveedor, "Impresión full color" y "LOGO AQUÍ"
  "OW-OFI-20": { descartar: [1, 4, 5, 6] }, // Gran Kavanagh: ídem
  "OW-OFI-21": { descartar: [1, 4, 5] }, // Kavanagh Portalápiz: "Impresión full color" y "LOGO AQUÍ"
  "OW-OFI-22": { descartar: [1, 13, 14, 15] }, // Colón: dirección web, "Impresión full color" y "AQUÍ"
  "OW-OFI-23": { descartar: [1, 2, 3, 4, 6, 7, 8, 10] }, // Cervantes: aviso del proveedor y "TU LOGO aquí"
  "OW-OFI-24": { descartar: [1, 3, 5, 6] }, // Colón Tarjetero: "Colores especiales", "Impresión full color" y "AQUÍ"

  // Máximo 20 fotos por producto y una por color y por toma, como en Borges
  // (Nachi, 5/11/2026): la foto de todos los colores, una serie con un color
  // por foto y, si hace falta, una de cada uso (abierto, soporte, sin tapa).
  "OW-ESC-01": { fotos: [26, 15, 27, 29, 31, 33, 35, 37, 39, 41, 46] }, // Gardel Silver (sin las de "Tinta azul")
  "OW-ESC-02": {
    fotos: [7, 15, 14, 10, 9, 16, 17, 11, 13, 12], // Gardel Color (sin la de "Tinta azul")
    fotoDeColor: { Amarillo: 15, Azul: 14, Blanco: 10, Naranja: 9, Negro: 16, Rojo: 17, Rosa: 11, Verde: 13, Violeta: 12 },
  },
  "OW-ESC-03": {
    fotos: [30, 17, 11, 15, 19, 16, 10, 12, 14, 13, 18], // Gardel White (sin las de "Tinta negra")
    fotoDeColor: { "Grip: amarillo": 17, Azul: 11, Blanco: 15, Celeste: 19, Naranja: 16, Negro: 10, Rojo: 12, Rosa: 14, Verde: 13, Violeta: 18 },
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
};
