/**
 * Productos de la web: une lo que sale de los Excel
 * (productos.generated.json, lo arma npm run productos) con los ajustes a mano
 * (productos-ajustes.ts). Las páginas leen los productos desde acá.
 *
 * Solo aparecen los productos que tienen al menos una foto y no están
 * ocultos: los demás quedan solo en el PDF del catálogo.
 */
import { CATALOGOS } from "./catalogos";
import { AJUSTES } from "./productos-ajustes";
import datos from "./productos.generated.json";

export type FotoProducto = { n: number; src: string; ancho: number; alto: number };

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
  /** Orden del Excel, que es el del PDF. */
  orden: number;
};

const normalizar = (texto: string) =>
  texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

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

function conAjustes(p: Producto) {
  const ajuste = AJUSTES[p.codigo] ?? {};
  let fotos = p.fotos;
  if (ajuste.fotos) fotos = ajuste.fotos.flatMap((n) => fotos.filter((f) => f.n === n));
  if (ajuste.descartar) fotos = fotos.filter((f) => !ajuste.descartar!.includes(f.n));
  const principal = fotos.find((f) => f.n === ajuste.foto);
  if (principal) fotos = [principal, ...fotos.filter((f) => f !== principal)];

  const ajustado: Producto = { ...p, ...ajuste.textos, fotos };
  ajustado.seccion = nombreDeSeccion(p.catalogo, ajustado.seccion);
  return { producto: ajustado, oculto: !!ajuste.ocultar };
}

/** Todos los productos que se ven en la web, en el orden de los catálogos. */
export const PRODUCTOS: Producto[] = (datos as Producto[])
  .map(conAjustes)
  .filter(({ producto, oculto }) => !oculto && producto.fotos.length > 0)
  .map(({ producto }) => producto);

/** Los productos de un catálogo, en el orden del PDF. */
export function productosDe(catalogo: string) {
  return PRODUCTOS.filter((p) => p.catalogo === catalogo);
}

export function producto(catalogo: string, slug: string) {
  return PRODUCTOS.find((p) => p.catalogo === catalogo && p.slug === slug);
}

/** Las secciones de un catálogo con sus productos, en el orden del PDF. */
export function secciones(catalogo: string) {
  const grupos: { nombre: string; productos: Producto[] }[] = [];
  for (const p of productosDe(catalogo)) {
    const grupo = grupos.find((g) => g.nombre === p.seccion);
    if (grupo) grupo.productos.push(p);
    else grupos.push({ nombre: p.seccion, productos: [p] });
  }
  return grupos;
}

/**
 * Busca en todos los catálogos por nombre, tipo, sección o código, sin
 * importar tildes ni mayúsculas. Con varias palabras, tienen que estar todas.
 */
export function buscar(texto: string) {
  const palabras = normalizar(texto).split(/\s+/).filter(Boolean);
  if (palabras.length === 0) return [];
  return PRODUCTOS.filter((p) => {
    const donde = normalizar([p.nombre, p.tipo, p.seccion, p.codigo].filter(Boolean).join(" "));
    return palabras.every((palabra) => donde.includes(palabra));
  });
}
