import type { ProductoHero } from "@/components/CarruselHero";
import HeroScroll from "@/components/HeroScroll";
import { HERO } from "@/data/inicio";
import { PRODUCTOS } from "@/data/productos";
import { urlProducto } from "@/lib/rutas";

/**
 * Hero del Inicio (ver HeroScroll: la diana que se agranda con el scroll, con
 * el carrusel de productos destacados que pasa por detrás del isotipo).
 * Los productos salen de HERO.destacados, con su foto chica y su página.
 */
export default function Hero() {
  const productos: ProductoHero[] = HERO.destacados.flatMap(({ codigo, foto }) => {
    const p = PRODUCTOS.find((x) => x.codigo === codigo);
    const f = p && ((foto && p.fotos.find((x) => x.n === foto)) || p.fotos[0]);
    return p && f ? [{ codigo: p.codigo, nombre: p.nombre, src: f.chica, url: urlProducto(p) }] : [];
  });
  return <HeroScroll productos={productos} />;
}
