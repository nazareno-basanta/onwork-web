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
  "OW-OFI-12": { descartar: [3] }, // Minetti: "China"
  "OW-OFI-17": { descartar: [1, 3] }, // Planetario: código de modelo y "Hecho en China"
  "OW-OFI-18": { descartar: [4] }, // Kavanagh Mini: "Impresión full color"
  "OW-OFI-19": { descartar: [4, 5] }, // Kavanagh: aviso del proveedor e "Impresión full color"
  "OW-OFI-20": { descartar: [4, 5] }, // Gran Kavanagh: ídem
  "OW-OFI-21": { descartar: [4] }, // Kavanagh Portalápiz: "Impresión full color"
  "OW-OFI-22": { descartar: [13, 14] }, // Colón: dirección web e "Impresión full color"
  "OW-OFI-23": { descartar: [8] }, // Cervantes: aviso del proveedor
  "OW-OFI-24": { descartar: [3, 5] }, // Colón Tarjetero: "Colores especiales" e "Impresión full color"

  // Gran Borges: la foto 1 tenía escritos los nombres del importador.
  "OW-CUA-03": { fotos: [3, 2], nota: "La foto 1 tiene texto del importador: no va." },
};
