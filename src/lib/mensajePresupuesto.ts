/**
 * Arma el mensaje de WhatsApp del presupuesto. Formato de Nachi
 * (../Web OW/06-PROMPT-CATALOGO-PRESUPUESTO.md):
 *
 *   Hola, armé un presupuesto en la web de On Work:
 *
 *   Drinkware
 *   • 100 × Apóstoles (OW-DRK-01) · Negro
 *
 *   Otro: …
 *
 *   Comentarios:
 *
 * "Comentarios" queda vacío para que la persona lo complete en WhatsApp antes
 * de enviar. Sin "Fecha" ni "(WEB)": Nachi los sacó del mensaje (5/11/2026).
 * La web ya dice de dónde viene ("en la web de On Work").
 *
 * Si el link queda muy largo, se compacta por etapas y lo último que se pierde
 * son los colores (lo que la persona eligió):
 *   1. sin títulos de catálogo y con separadores simples ("-", "x"), que
 *      ocupan menos en el link: "- 100 x Apóstoles (OW-DRK-01) - Negro"
 *   2. sin el nombre (el asesor se guía por el código): "- 100 x OW-DRK-01 - Negro"
 *   3. sin colores: "- 100 x OW-DRK-01"
 * "Copiar la lista" copia siempre el mensaje completo (nivel 0).
 * Pruebas: mensajePresupuesto.test.ts (npm test).
 */

export type LineaMensaje = {
  cantidad: number;
  nombre: string;
  codigo: string;
  /** Vacío o ausente si es "A definir". */
  color?: string;
};

/** Un catálogo con sus líneas, ya en el orden de la web. */
export type GrupoMensaje = { catalogo: string; lineas: LineaMensaje[] };

/** 0 = completo · 1 = sin títulos · 2 = sin nombres · 3 = sin colores. */
export type NivelMensaje = 0 | 1 | 2 | 3;

/** Largo máximo del texto codificado en el link antes de compactar. */
export const LARGO_MAXIMO = 1800;

const ENCABEZADO = "Hola, armé un presupuesto en la web de On Work:";

function linea(l: LineaMensaje, nivel: NivelMensaje) {
  const color = nivel < 3 && l.color ? l.color : "";
  if (nivel === 0) return `• ${l.cantidad} × ${l.nombre} (${l.codigo})${color ? ` · ${color}` : ""}`;
  const producto = nivel === 1 ? `${l.nombre} (${l.codigo})` : l.codigo;
  return `- ${l.cantidad} x ${producto}${color ? ` - ${color}` : ""}`;
}

export function armarConNivel(grupos: GrupoMensaje[], otro: string, nivel: NivelMensaje) {
  const conLineas = grupos.filter((g) => g.lineas.length > 0);
  const bloques = [ENCABEZADO];
  if (nivel === 0) {
    for (const g of conLineas) bloques.push([g.catalogo, ...g.lineas.map((l) => linea(l, 0))].join("\n"));
  } else {
    bloques.push(conLineas.flatMap((g) => g.lineas.map((l) => linea(l, nivel))).join("\n"));
  }
  if (otro.trim()) bloques.push(`Otro: ${otro.trim().replace(/\s+/g, " ")}`);
  bloques.push("Comentarios: ");
  return bloques.join("\n\n");
}

/**
 * El mensaje para el link de WhatsApp, en el primer nivel que entra en el
 * largo máximo (si ni el último entra, va igual: la página avisa y ofrece
 * copiar la lista).
 */
export function armarMensajePresupuesto(grupos: GrupoMensaje[], otro = "") {
  for (const nivel of [0, 1, 2] as const) {
    const texto = armarConNivel(grupos, otro, nivel);
    if (encodeURIComponent(texto).length <= LARGO_MAXIMO) return { texto, nivel, completo: armarConNivel(grupos, otro, 0) };
  }
  return { texto: armarConNivel(grupos, otro, 3), nivel: 3 as NivelMensaje, completo: armarConNivel(grupos, otro, 0) };
}
