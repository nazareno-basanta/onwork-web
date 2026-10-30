/**
 * Estilos de botón compartidos (ver "Buttons" en DESIGN.md). Los definimos una
 * sola vez para que todos los botones del sitio se vean y se comporten igual.
 * La clase cursor-target hace que el cursor diana los encuadre.
 */
const base =
  "cursor-target inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 font-display text-sm font-bold tracking-wide " +
  "transition-[background-color,color,transform] duration-300 ease-ow hover:-translate-y-0.5";

export const btn = {
  yellow: `${base} bg-ow-yellow text-ow-black hover:bg-ow-black hover:text-ow-yellow`,
  black: `${base} bg-ow-black text-white hover:bg-ow-yellow hover:text-ow-black`,
  line: `${base} border-2 border-ow-black text-ow-black hover:bg-ow-black hover:text-white`,
  /** Contorno sobre fondos tinta. */
  lineLight: `${base} border-2 border-white text-white hover:bg-white hover:text-ow-black`,
} as const;

export type BtnTone = keyof typeof btn;
