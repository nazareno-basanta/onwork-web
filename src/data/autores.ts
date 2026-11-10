/**
 * Quién firma las notas de Ideas (/ideas). Cada nota elige su autor según el
 * tema (decisión de Nachi, 10/11/2026):
 *   - Sergio: lo que pide muchos años en el rubro (técnicas, materiales,
 *     cómo elegir, plazos, ocasiones de siempre).
 *   - Nazareno: temas actuales, innovación, tendencias y diseño.
 *
 * A Google le importa saber quién escribe una guía: cada autor va a tener
 * una página corta con su nombre, rol, bio y foto. Solo con el OK de cada
 * persona. Lo que está entre [corchetes] falta completar.
 */
export type Autor = {
  nombre: string;
  rol: string;
  /** 2 o 3 líneas: quién es y qué hace en On Work. */
  bio: string;
  /** Foto cuadrada en /public/autores/ (ej. "/autores/sergio-basanta.webp"). */
  foto?: string;
  /** Perfiles públicos de la persona (LinkedIn, Instagram…), solo si los quiere mostrar. */
  perfiles?: string[];
};

/** Para sumar un autor: agregalo acá y en AUTORES. */
export type AutorId = "sergio-basanta" | "nazareno-basanta";

export const AUTORES: Record<AutorId, Autor> = {
  "sergio-basanta": {
    nombre: "Sergio Basanta",
    rol: "Fundador de On Work",
    bio: "[Bio de Sergio: 2 o 3 líneas sobre su experiencia en el rubro]",
  },
  "nazareno-basanta": {
    nombre: "Nazareno Basanta",
    rol: "Diseñador gráfico de On Work",
    bio: "[Bio de Nazareno: 2 o 3 líneas sobre qué hace en On Work]",
  },
};

/** Textos fijos de la página de cada autor (/ideas/autores/<id>). Borrador de Claude (10/11/2026), para revisar. */
export const AUTOR_PAGINA = {
  notas: (nombre: string) => `Notas de ${nombre.split(" ")[0]}.`,
  /** Descripción para Google mientras la bio esté en marcadores. */
  descripcion: (autor: Autor) => `${autor.nombre}, ${autor.rol.charAt(0).toLowerCase()}${autor.rol.slice(1)}. Sus notas en Ideas.`,
};
