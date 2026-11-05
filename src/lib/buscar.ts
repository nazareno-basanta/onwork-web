/**
 * Búsqueda de productos sin importar tildes ni mayúsculas: "Botella Termica"
 * encuentra "Botella térmica". Con varias palabras, tienen que estar todas
 * ("mate acero" no trae los mates de algarrobo). Entiende plurales ("termos")
 * y las palabras con que la gente busca ("lapicera" → bolígrafos). Los
 * resultados se ordenan por dónde coinciden: primero el nombre y el tipo,
 * después la descripción. Sin imports de la web, así la usa el buscador en el
 * navegador y se prueba con npm test.
 */
export const normalizar = (texto: string) =>
  texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();

export const palabrasDe = (texto: string) => normalizar(texto).split(/[\s,;/]+/).filter(Boolean);

/** El texto donde se busca, ya normalizado. */
export const textoDeBusqueda = (campos: (string | undefined)[]) => normalizar(campos.filter(Boolean).join(" "));

/**
 * Cómo dice la gente lo que busca, y cómo está escrito en los catálogos.
 * (Para sumar una palabra: en minúscula y sin tildes.)
 */
const SINONIMOS: Record<string, string[]> = {
  lapicera: ["boligrafo"],
  lapiceras: ["boligrafo"],
  lapicero: ["boligrafo"],
  birome: ["boligrafo"],
  biromes: ["boligrafo"],
  roller: ["boligrafo"],
  lapices: ["lapiz"],
  libreta: ["cuaderno", "anotador"],
  libretas: ["cuaderno", "anotador"],
  agenda: ["cuaderno", "anotador"],
  agendas: ["cuaderno", "anotador"],
  block: ["anotador", "notas"],
  credencial: ["credencial", "identificador"],
  credenciales: ["credencial", "identificador"],
  lanyard: ["cinta"],
  pin: ["pines"],
  calendario: ["calendario", "carpa"],
  almanaque: ["calendario"],
  valijas: ["valija", "carry"],
  vianda: ["lunchera"],
  vasito: ["vaso"],
  botellita: ["botella"],
};

/** Las formas de una palabra que valen: ella, sin plural y sus sinónimos. */
export function alternativas(palabra: string) {
  const formas = new Set([palabra]);
  // "anotadores" → "anotador" (pero "mates" no pasa a "mat": la raíz tiene que tener 4 letras o más).
  if (palabra.length >= 6 && palabra.endsWith("es")) formas.add(palabra.slice(0, -2));
  if (palabra.length > 3 && palabra.endsWith("s")) formas.add(palabra.slice(0, -1));
  // Sinónimos también mientras se escribe: "lapic" ya trae los bolígrafos de "lapicera".
  for (const [clave, sinonimos] of Object.entries(SINONIMOS)) {
    if (clave === palabra || (palabra.length >= 4 && clave.startsWith(palabra))) sinonimos.forEach((s) => formas.add(s));
  }
  return [...formas];
}

/** Un campo del índice: su texto (normalizado) y cuánto pesa una coincidencia ahí. */
export type Campo = [texto: string, peso: number];

/** ×3 si es la palabra entera ("bolso"), ×2 si es el comienzo de una ("bolsón"), ×1 si está en el medio. */
function multiplicador(texto: string, forma: string) {
  const palabras = texto.split(/[^a-z0-9]+/);
  if (palabras.includes(forma)) return 3;
  return palabras.some((p) => p.startsWith(forma)) ? 2 : 1;
}

/**
 * Cuánto coincide algo con la búsqueda: suma, por cada palabra, el mejor
 * campo donde aparece (más si es la palabra entera o su comienzo). Si alguna
 * palabra no aparece en ningún campo, no coincide (null).
 */
export function puntaje(campos: Campo[], palabras: string[]) {
  if (palabras.length === 0) return null;
  let total = 0;
  for (const palabra of palabras) {
    let mejor = 0;
    for (const forma of alternativas(palabra)) {
      for (const [texto, peso] of campos) {
        if (!texto.includes(forma)) continue;
        const veces = multiplicador(texto, forma);
        // En los campos de poco peso (la descripción, el catálogo) no cuenta un pedazo del medio
        // de otra palabra: "lapicera" no tiene que traer los cuadernos con "portabolígrafo".
        if (veces === 1 && peso < 3) continue;
        mejor = Math.max(mejor, peso * veces);
      }
    }
    if (mejor === 0) return null;
    total += mejor;
  }
  return total;
}

/** Los que coinciden, de mayor a menor puntaje (con el mismo puntaje, en el orden de los catálogos). */
export function ordenar<T extends { campos: Campo[] }>(items: T[], texto: string) {
  const palabras = palabrasDe(texto);
  return items
    .map((item, i) => ({ item, i, p: puntaje(item.campos, palabras) }))
    .filter((x): x is { item: T; i: number; p: number } => x.p !== null)
    .sort((a, b) => b.p - a.p || a.i - b.i)
    .map((x) => x.item);
}
