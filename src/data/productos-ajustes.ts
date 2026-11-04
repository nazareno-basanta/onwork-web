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
};
