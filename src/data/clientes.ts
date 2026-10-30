/**
 * Marcas que trabajaron con On Work (franja de logos del Inicio y de Nosotros).
 *
 * ⚠️ Solo marcas que Nachi confirmó una por una en
 * ../Web OW/logos-clientes/LEEME.md. Candidatas: La Continental, Nordelta,
 * Segafredo, UBA, UNPA, Renault, Remax, Royal Holiday, Howard Johnson,
 * Condigral, Abertec, Emprotur, Casa Fernandes.
 *
 * Cómo agregar una marca:
 *   1. Guardá el logo en /public/clientes/ (SVG o PNG con fondo transparente),
 *      con nombre en minúscula y guiones: la-continental.svg.
 *   2. Reemplazá un marcador por: { nombre: "La Continental", logo: "/clientes/la-continental.svg" }
 *   3. Si tiene pedido real con fotos, sumá  pedido: "<slug del pedido>".
 *
 * La web pasa todos los logos a una sola tinta, así que pueden venir en
 * cualquier color.
 */
export type Cliente = {
  /** Nombre de la marca: también es el texto alternativo del logo. */
  nombre: string;
  logo?: string;
  /** Slug del pedido real de esta marca, si tiene. */
  pedido?: string;
};

export const CLIENTES_ROTULO = "Algunas marcas con las que trabajamos";

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
