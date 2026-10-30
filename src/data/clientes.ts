/**
 * Empresas que confiaron en On Work (carrusel de la home).
 *
 * Cómo agregar un cliente real:
 *   1. Guardá el logo en /public/clientes/ (SVG o PNG con fondo transparente).
 *   2. Reemplazá un placeholder por: { nombre: "Nombre", logo: "/clientes/archivo.svg" }
 *
 * El sitio convierte todos los logos a una sola tinta (monocromático) de forma
 * automática, así que pueden venir en cualquier color.
 */
export type Cliente = {
  nombre: string;
  logo?: string;
};

export const CLIENTES: Cliente[] = [
  { nombre: "Cliente 01" },
  { nombre: "Cliente 02" },
  { nombre: "Cliente 03" },
  { nombre: "Cliente 04" },
  { nombre: "Cliente 05" },
  { nombre: "Cliente 06" },
  { nombre: "Cliente 07" },
  { nombre: "Cliente 08" },
];
