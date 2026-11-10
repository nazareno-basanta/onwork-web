/**
 * Quién firma las notas de Ideas (/ideas). Cada nota elige su autor según el
 * tema (decisión de Nachi, 10/11/2026):
 *   - Sergio: lo que pide muchos años en el rubro (técnicas, materiales,
 *     cómo elegir, plazos, ocasiones de siempre).
 *   - Nazareno: temas actuales, innovación, tendencias y diseño.
 *
 * A Google le importa saber quién escribe una guía: cada autor tiene una
 * página corta con su nombre y su rol. Datos concisos, sin fotos por ahora
 * (decisión de Nachi, 10/11/2026): el rol y, si suma, una línea de bio.
 */
export type Autor = {
  nombre: string;
  rol: string;
  /** Una línea, solo si suma algo al rol. */
  bio?: string;
  /** Foto cuadrada en /public/autores/ (ej. "/autores/sergio-basanta.webp"). Por ahora, sin fotos. */
  foto?: string;
  /** Perfiles públicos de la persona (LinkedIn, Instagram…), solo si los quiere mostrar. */
  perfiles?: string[];
};

/** Para sumar un autor: agregalo acá y en AUTORES. */
export type AutorId = "sergio-basanta" | "nazareno-basanta";

export const AUTORES: Record<AutorId, Autor> = {
  "sergio-basanta": {
    nombre: "Sergio Basanta",
    rol: "Cofundador de On Work",
    bio: "En comunicación y merchandising desde 1990.",
  },
  "nazareno-basanta": {
    nombre: "Nazareno Basanta",
    rol: "Diseñador gráfico de On Work",
  },
};

/** Textos fijos de la página de cada autor (/ideas/autores/<id>). Borrador de Claude (10/11/2026), para revisar. */
export const AUTOR_PAGINA = {
  notas: (nombre: string) => `Notas de ${nombre.split(" ")[0]}.`,
  /** Descripción para Google: nombre, rol, la bio si está y qué hay en la página. */
  descripcion: (autor: Autor) =>
    `${autor.nombre}, ${autor.rol.charAt(0).toLowerCase()}${autor.rol.slice(1)}.${
      autor.bio && !/\[[^\]]*\]/.test(autor.bio) ? ` ${autor.bio}` : ""
    } Sus notas en Ideas.`,
};
