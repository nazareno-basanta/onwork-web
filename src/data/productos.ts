/**
 * Productos de la web: une lo que sale de los Excel
 * (productos.generated.json, lo arma npm run productos) con los ajustes a mano
 * (productos-ajustes.ts). Las páginas leen los productos desde acá.
 *
 * Solo aparecen los productos que tienen al menos una foto y no están
 * ocultos: los demás quedan solo en el PDF del catálogo.
 */
import { normalizar, ordenar, textoDeBusqueda, type Campo } from "@/lib/buscar";
import { aSlug } from "@/lib/utils";
import { CATALOGOS } from "./catalogos";
import { AJUSTES } from "./productos-ajustes";
import datos from "./productos.generated.json";

/** src: la foto de 1200 px (galería). chica: la de 480 px (tarjetas, miniaturas, presupuesto). */
export type FotoProducto = { n: number; src: string; chica: string; ancho: number; alto: number };

export type Producto = {
  codigo: string;
  slug: string;
  nombre: string;
  /** Slug del catálogo (src/data/catalogos.ts). */
  catalogo: string;
  seccion: string;
  tipo?: string;
  descripcion?: string;
  medidas?: string;
  /** Solo en Cuadernos. */
  hojas?: string;
  colores: string[];
  /** La primera es la principal. */
  fotos: FotoProducto[];
  /** Imagen para compartir el link (1200 × 630, la arma npm run productos). */
  compartir?: string;
  /** Al elegir un color en la página del producto: qué foto (posición en fotos) muestra la galería. */
  fotoDeColor?: Record<string, number>;
  /** Orden del Excel, que es el del PDF. */
  orden: number;
};

/**
 * La sección se escribe como en catalogos.ts cuando es la misma (el Excel de
 * Marroquinería dice "Mochilas Notebook"; la web, "Mochilas notebook").
 */
function nombreDeSeccion(catalogo: string, seccion: string) {
  const enLaWeb = CATALOGOS.find((c) => c.slug === catalogo)?.secciones.find(
    (s) => normalizar(s.nombre) === normalizar(seccion),
  );
  return enLaWeb?.nombre ?? seccion;
}

/**
 * "Ver fotos" en la columna Colores quiere decir que los colores están en las
 * fotos: en la web no se muestra como un color (ni en el presupuesto).
 */
const sinVerFotos = (colores: string[]) =>
  colores.map((c) => c.replace(/\s*\(ver fotos\)/i, "").trim()).filter((c) => c && !/^ver fotos$/i.test(c));

function conAjustes(p: Producto) {
  const ajuste = AJUSTES[p.codigo] ?? {};
  let fotos = p.fotos;
  if (ajuste.fotos) fotos = ajuste.fotos.flatMap((n) => fotos.filter((f) => f.n === n));
  if (ajuste.descartar) fotos = fotos.filter((f) => !ajuste.descartar!.includes(f.n));
  const principal = fotos.find((f) => f.n === ajuste.foto);
  if (principal) fotos = [principal, ...fotos.filter((f) => f !== principal)];

  const ajustado: Producto = { ...p, ...ajuste.textos, fotos };
  if (ajuste.fotoDeColor) {
    const porColor = Object.entries(ajuste.fotoDeColor)
      .map(([color, n]) => [color, fotos.findIndex((f) => f.n === n)] as const)
      .filter(([, i]) => i >= 0);
    ajustado.fotoDeColor = Object.fromEntries(porColor);
  }
  ajustado.seccion = nombreDeSeccion(p.catalogo, ajustado.seccion);
  ajustado.colores = sinVerFotos(ajustado.colores);
  return { producto: ajustado, oculto: !!ajuste.ocultar };
}

/** Todos los productos que se ven en la web, en el orden de los catálogos. */
export const PRODUCTOS: Producto[] = (datos as Producto[])
  .map(conAjustes)
  .filter(({ producto, oculto }) => !oculto && producto.fotos.length > 0)
  .map(({ producto }) => producto);

/** Lo que muestra la tarjeta de un producto (también la del buscador, que va al navegador). */
export type ProductoTarjeta = Pick<Producto, "codigo" | "slug" | "nombre" | "catalogo" | "tipo"> & {
  foto: FotoProducto;
  colores: number;
};

export const aTarjeta = (p: Producto): ProductoTarjeta => ({
  codigo: p.codigo,
  slug: p.slug,
  nombre: p.nombre,
  catalogo: p.catalogo,
  tipo: p.tipo,
  foto: p.fotos[0],
  colores: p.colores.length,
});

/** Los productos de un catálogo, en el orden del PDF. */
export function productosDe(catalogo: string) {
  return PRODUCTOS.filter((p) => p.catalogo === catalogo);
}

/**
 * La foto de la tarjeta de un catálogo: la del producto que diga `producto`
 * en catalogos.ts, o la del primero. Sin productos en la web (Cintas,
 * Llaveros), no hay foto y la tarjeta muestra la portada.
 */
export function fotoDeCatalogo(slug: string) {
  const elegido = CATALOGOS.find((c) => c.slug === slug)?.producto;
  const lista = productosDe(slug);
  return (lista.find((p) => p.codigo === elegido) ?? lista[0])?.fotos[0];
}

export function producto(catalogo: string, slug: string) {
  return PRODUCTOS.find((p) => p.catalogo === catalogo && p.slug === slug);
}

/**
 * "Más de <sección>": hasta 4 productos de la misma sección, en el orden del
 * PDF y empezando por los que siguen al actual. Si la sección tiene menos,
 * se completa con otros del mismo catálogo (y el título pasa a ser el del
 * catálogo).
 */
export function relacionados(p: Producto, cuantos = 4) {
  const delCatalogo = productosDe(p.catalogo).filter((x) => x.codigo !== p.codigo);
  const desde = (lista: Producto[]) => {
    const i = lista.findIndex((x) => x.orden > p.orden);
    return i <= 0 ? lista : [...lista.slice(i), ...lista.slice(0, i)];
  };
  const misma = desde(delCatalogo.filter((x) => x.seccion === p.seccion));
  if (misma.length >= cuantos) return { deLaSeccion: true, productos: misma.slice(0, cuantos) };
  const otros = desde(delCatalogo.filter((x) => x.seccion !== p.seccion));
  return { deLaSeccion: misma.length > 0 && otros.length === 0, productos: [...misma, ...otros].slice(0, cuantos) };
}

export type SeccionConProductos = { nombre: string; texto?: string; productos: Producto[] };

/**
 * Las secciones de un catálogo con sus productos, en el orden de
 * catalogos.ts (el del PDF). Incluye las que no tienen productos en la web
 * (quedan solo en el PDF). Si un producto tiene una sección que no está en
 * catalogos.ts, va al final con ese nombre.
 */
export function secciones(catalogo: string): SeccionConProductos[] {
  const grupos: SeccionConProductos[] = (CATALOGOS.find((c) => c.slug === catalogo)?.secciones ?? []).map((s) => ({
    nombre: s.nombre,
    texto: s.texto,
    productos: [],
  }));
  for (const p of productosDe(catalogo)) {
    const grupo = grupos.find((g) => g.nombre === p.seccion);
    if (grupo) grupo.productos.push(p);
    else grupos.push({ nombre: p.seccion, productos: [p] });
  }
  return grupos;
}

const tituloDe = (catalogo: string) => CATALOGOS.find((c) => c.slug === catalogo)?.titulo ?? catalogo;

/** Lo que el buscador del hub necesita de cada producto (va al navegador). */
export type ProductoBuscable = ProductoTarjeta & { campos: Campo[] };

/**
 * Todos los productos con sus campos de búsqueda y cuánto pesa cada uno: el
 * nombre, el código y el tipo primero; después la sección, el catálogo y la
 * descripción.
 */
export function indiceBusqueda(): ProductoBuscable[] {
  return PRODUCTOS.map((p) => ({
    ...aTarjeta(p),
    campos: [
      [textoDeBusqueda([p.nombre]), 5],
      [normalizar(p.codigo), 5],
      [textoDeBusqueda([p.tipo]), 4],
      [textoDeBusqueda([p.seccion]), 3],
      [textoDeBusqueda([tituloDe(p.catalogo)]), 2],
      [textoDeBusqueda([p.descripcion]), 1],
    ],
  }));
}

/**
 * Los catálogos y sus secciones, para que el buscador pueda decir "Está en el
 * catálogo Llaveros" cuando lo buscado no tiene productos en la web (Cintas,
 * Llaveros, o una sección que quedó solo en el PDF).
 */
export type LugarBuscable = {
  catalogo: string;
  titulo: string;
  /** La sección, si coincide una sección y no el catálogo entero. */
  seccion?: { nombre: string; id: string };
  /** Sin productos en la web: está solo en el PDF. */
  soloPdf: boolean;
  campos: Campo[];
};

// Los marcadores de textos pendientes (lo que va entre corchetes) no se buscan.
const sinCorchetes = (texto?: string) => texto?.replace(/\[[^\]]*\]/g, "");

export function indiceLugares(): LugarBuscable[] {
  return CATALOGOS.flatMap((c) => {
    const enLaWeb = productosDe(c.slug);
    const catalogo: LugarBuscable = {
      catalogo: c.slug,
      titulo: c.titulo,
      soloPdf: enLaWeb.length === 0,
      campos: [
        [textoDeBusqueda([c.titulo]), 5],
        [textoDeBusqueda([sinCorchetes(c.tarjeta)]), 3],
      ],
    };
    const secciones: LugarBuscable[] = c.secciones.map((s) => ({
      catalogo: c.slug,
      titulo: c.titulo,
      seccion: { nombre: s.nombre, id: `seccion-${aSlug(s.nombre)}` },
      soloPdf: !enLaWeb.some((p) => p.seccion === s.nombre),
      campos: [
        [textoDeBusqueda([s.nombre]), 4],
        [textoDeBusqueda([sinCorchetes(s.texto)]), 1],
      ],
    }));
    return [catalogo, ...secciones];
  });
}

/**
 * Busca en todos los catálogos por nombre, tipo, sección, código, catálogo o
 * descripción, sin importar tildes ni mayúsculas (ver lib/buscar.ts).
 */
export function buscar(texto: string) {
  return ordenar(indiceBusqueda(), texto);
}

/** Lo mínimo de cada producto para el presupuesto (se manda al navegador). */
export type ProductoPresupuesto = {
  codigo: string;
  nombre: string;
  slug: string;
  catalogo: string;
  catalogoTitulo: string;
  foto: FotoProducto;
  colores: string[];
  /** La foto chica de cada color que tiene la suya (el Borges rojo se ve rojo en el presupuesto). */
  fotoPorColor?: Record<string, string>;
};

/** Todos los productos de la web, en el orden de la web, para el presupuesto. */
export function indicePresupuesto(): ProductoPresupuesto[] {
  return PRODUCTOS.map((p) => ({
    codigo: p.codigo,
    nombre: p.nombre,
    slug: p.slug,
    catalogo: p.catalogo,
    catalogoTitulo: tituloDe(p.catalogo),
    foto: p.fotos[0],
    colores: p.colores,
    ...(p.fotoDeColor && {
      fotoPorColor: Object.fromEntries(Object.entries(p.fotoDeColor).map(([color, i]) => [color, p.fotos[i]?.chica ?? p.fotos[0].chica])),
    }),
  }));
}
