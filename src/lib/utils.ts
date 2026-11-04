/** Une clases de Tailwind ignorando las vacías: cn("a", cond && "b"). */
export function cn(...clases: (string | false | null | undefined)[]) {
  return clases.filter(Boolean).join(" ");
}

/**
 * Sin viudas: une las dos últimas palabras con un espacio duro (U+00A0),
 * así la última palabra de un párrafo o titular nunca queda sola en una línea.
 * No las une si el texto tiene solo dos palabras o si juntas son muy largas:
 * en el celular quedarían más anchas que la pantalla.
 */
export function sinViuda(texto: string) {
  const palabras = texto.split(" ");
  if (palabras.length < 3) return texto;
  const ultimas = palabras.slice(-2).join(" ");
  if (ultimas.length > 18) return texto;
  return `${palabras.slice(0, -2).join(" ")} ${palabras.at(-2)} ${palabras.at(-1)}`;
}

/**
 * Marcadores pendientes: lo que está [entre corchetes] en src/data/ es un dato
 * o un texto que falta. Se ven mientras trabajamos (npm run dev) y nunca en la
 * web publicada, para que Google no los indexe. La lista completa sale con
 * npm run marcadores.
 */
export const mostrarMarcadores = process.env.NODE_ENV !== "production";

const MARCADOR = /\s*\[[^\]]*\]/g;

/** ¿Tiene algún marcador pendiente? */
export function tieneMarcador(texto?: string) {
  return !!texto && /\[[^\]]*\]/.test(texto);
}

/** ¿Es todo marcador? ("[dato]", "[confirmar: …]"). Un texto vacío también cuenta. */
export function esMarcador(texto?: string) {
  return !texto || texto.replace(MARCADOR, "").trim() === "";
}

/** En la web publicada saca los marcadores; mientras trabajamos los deja. */
export function sinMarcadores(texto: string) {
  return mostrarMarcadores ? texto : texto.replace(MARCADOR, "").trim();
}

/**
 * Texto de src/data listo para la web: sin marcadores en producción y sin
 * viudas. Si no queda nada (era todo marcador), devuelve null y el párrafo no
 * se muestra.
 */
export function textoWeb(texto?: string) {
  if (!texto) return null;
  const limpio = sinMarcadores(texto);
  return limpio ? sinViuda(limpio) : null;
}
