/** Une clases de Tailwind ignorando las vacías: cn("a", cond && "b"). */
export function cn(...clases: (string | false | null | undefined)[]) {
  return clases.filter(Boolean).join(" ");
}

/**
 * Sin viudas: une las dos últimas palabras con un espacio duro (U+00A0),
 * así la última palabra de un párrafo o titular nunca queda sola en una línea.
 */
export function sinViuda(texto: string) {
  const i = texto.lastIndexOf(" ");
  return i === -1 ? texto : `${texto.slice(0, i)} ${texto.slice(i + 1)}`;
}
