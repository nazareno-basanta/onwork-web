/**
 * Título y descripción para Google de la página de cada producto, armados con
 * los datos del Excel. Sin imports de la web, así se prueban con npm test.
 *
 * ✏️ El formato es un borrador de Claude (4/11/2026), para revisar:
 *   título: "Apóstoles · Mate térmico personalizado" (+ " | On Work")
 *   descripción: "Mate térmico Apóstoles con tu marca, en 2 colores. <descripción del Excel> Cotizá por WhatsApp."
 */

type DatosSeo = { nombre: string; tipo?: string; descripcion?: string; colores: number; catalogo: string };

const normalizar = (t: string) =>
  t
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();

/**
 * Primera palabra del tipo (o del nombre) → con qué concuerda "personalizado".
 * Solo los tipos que nombran el producto: "Plástico clásico", "Eco cuero" o
 * "Tapa dura" describen el material, y ahí no se agrega nada.
 */
const GENERO: Record<string, "o" | "a" | "os"> = {
  mate: "o", porta: "o", kit: "o", set: "o", termo: "o", vaso: "o", jarro: "o", coffee: "o",
  lapiz: "o", cuaderno: "o", anotador: "o", cubo: "o", taco: "o", memo: "o", estuche: "o",
  cutter: "o", bolso: "o", "bolso-mochila": "o", maletin: "o", neceser: "o", organizador: "o",
  carry: "o", paraguas: "o", yerbera: "a", matera: "a", mochila: "a", bombilla: "a",
  botella: "a", jarra: "a", taza: "a", carpeta: "a", calculadora: "a", carpa: "a",
  bandolera: "a", valija: "a", lunchera: "a", auriculares: "os", lapices: "os",
};

/** "Kit matero (termo 1,5 L + mate…)" → "Kit matero". */
const sinParentesis = (t: string) => t.replace(/\s*\([^)]*\)/g, "").trim();

/** "personalizado", "personalizada" o "personalizados", o null si el texto no empieza con un producto. */
function personalizado(texto: string) {
  const genero = GENERO[normalizar(texto).split(/\s+/)[0]];
  return genero ? `personalizad${genero}` : null;
}

export function tituloProducto({ nombre, tipo, catalogo }: DatosSeo) {
  if (!tipo) return `${nombre} · ${catalogo}`;
  const t = sinParentesis(tipo);
  // Paraguas y algunos más ya dicen el tipo en el nombre ("Paraguas golf manual").
  if (normalizar(nombre).startsWith(normalizar(t))) {
    const p = personalizado(nombre);
    return p ? `${nombre} ${p}` : `${nombre} · ${catalogo}`;
  }
  const p = personalizado(t);
  return p ? `${nombre} · ${t} ${p}` : `${nombre} · ${t} · ${catalogo}`;
}

const LARGO_DESCRIPCION = 158;
const CIERRE = "Cotizá por WhatsApp.";

/**
 * Si no entra, corta al final de la última oración que entra (si queda más
 * de la mitad) o en la última palabra entera, y cierra con "…".
 */
function cortar(texto: string, largo: number) {
  if (texto.length <= largo) return texto;
  const corte = texto.slice(0, largo);
  const oracion = corte.lastIndexOf(". ");
  if (oracion > largo / 2) return corte.slice(0, oracion + 1);
  const palabras = corte.slice(0, largo - 1);
  return `${palabras.slice(0, palabras.lastIndexOf(" ")).replace(/[\s,;:·.-]+$/, "")}…`;
}

export function descripcionProducto({ nombre, tipo, descripcion, colores }: DatosSeo) {
  const t = tipo ? sinParentesis(tipo) : "";
  const quien = !t || normalizar(nombre).startsWith(normalizar(t)) ? nombre : personalizado(t) ? `${t} ${nombre}` : `${nombre} · ${t}`;
  const enColores = colores > 1 ? `, en ${colores} colores` : "";
  const inicio = `${quien} con tu marca${enColores}.`;
  if (!descripcion) return `${inicio} ${CIERRE}`;
  const lugar = LARGO_DESCRIPCION - inicio.length - CIERRE.length - 2;
  const texto = cortar(descripcion.trim(), lugar);
  return `${inicio} ${/[.…!?]$/.test(texto) ? texto : `${texto}.`} ${CIERRE}`;
}
