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
