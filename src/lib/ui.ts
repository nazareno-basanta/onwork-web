/**
 * Estilos de botón compartidos. Los definimos una sola vez para que todos
 * los botones del sitio se vean y se comporten igual.
 */
const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-display text-sm font-bold tracking-wide " +
  "transition-all duration-300 hover:-translate-y-0.5 " +
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ow-black";

export const btn = {
  yellow: `${base} bg-ow-yellow text-ow-black hover:bg-ow-black hover:text-ow-yellow`,
  black: `${base} bg-ow-black text-white hover:bg-ow-yellow hover:text-ow-black`,
  line: `${base} border-2 border-ow-black text-ow-black hover:bg-ow-black hover:text-white`,
} as const;

export type BtnTone = keyof typeof btn;
