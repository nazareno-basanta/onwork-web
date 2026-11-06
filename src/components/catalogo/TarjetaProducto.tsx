import Image from "next/image";
import Link from "next/link";
import { TARJETA_PRODUCTO } from "@/data/catalogos";
import type { ProductoTarjeta } from "@/data/productos";
import { urlProducto } from "@/lib/rutas";

type Props = {
  producto: ProductoTarjeta;
  /** Las primeras tarjetas de la página cargan la foto enseguida. */
  prioridad?: boolean;
};

/**
 * Tarjeta de un producto en la grilla de un catálogo, en el buscador o en
 * "Más de…": foto entera en marco blanco, pastilla con el código, nombre,
 * tipo y cantidad de colores. Toda la tarjeta lleva a la página del producto:
 * ahí se ven los detalles, se elige el color y se suma al presupuesto (los
 * clientes de On Work comparan antes de pedir; no hay "Sumar" en la grilla).
 * El link está en el nombre y se estira sobre la tarjeta (así hay un solo
 * link, que se lee bien con lector de pantalla).
 *
 * Usa la foto chica del script (WebP de 480 px): se sirve tal cual, sin que
 * Vercel la vuelva a procesar.
 */
export default function TarjetaProducto({ producto, prioridad = false }: Props) {
  return (
    <article className="group relative flex h-full flex-col">
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-white shadow-apoyado transition-[translate,box-shadow] duration-300 ease-ow group-hover:-translate-y-0.5 group-hover:shadow-levantado">
        <Image
          src={producto.foto.chica}
          alt=""
          fill
          unoptimized
          loading={prioridad ? "eager" : "lazy"}
          className="object-contain p-[9%]"
        />
      </div>

      <span className="mt-4 self-start rounded-full bg-ow-yellow px-2.5 py-1 font-display text-xs leading-none font-bold tracking-[0.14em] tabular-nums">
        {producto.codigo}
      </span>
      <h3 className="mt-2.5 font-display text-base leading-snug font-bold text-pretty sm:text-lg">
        <Link
          href={urlProducto(producto)}
          className="foco-propio rounded-sm decoration-ow-yellow decoration-2 underline-offset-4 group-hover:underline after:absolute after:inset-0 after:rounded-3xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-ow-black"
        >
          {producto.nombre}
        </Link>
      </h3>
      {producto.tipo && <p className="mt-1 text-sm leading-snug text-ow-gray">{producto.tipo}</p>}
      {producto.colores > 0 && (
        <p className="mt-0.5 text-sm text-ow-gray">{TARJETA_PRODUCTO.colores(producto.colores)}</p>
      )}
    </article>
  );
}
