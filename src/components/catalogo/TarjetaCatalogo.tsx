import Image from "next/image";
import Link from "next/link";
import PortadaCatalogo from "@/components/PortadaCatalogo";
import type { Catalogo } from "@/data/catalogos";
import type { FotoProducto } from "@/data/productos";
import { urlCatalogo } from "@/lib/rutas";
import { textoWeb } from "@/lib/utils";

type Props = {
  catalogo: Catalogo;
  /** Foto de un producto del catálogo; sin foto (Cintas, Llaveros) va la portada en tinta. */
  foto?: FotoProducto;
  prioridad?: boolean;
  /** "h2" en el hub (las tarjetas son el contenido principal), "h3" dentro de una sección. */
  nivel?: "h2" | "h3";
};

/**
 * Tarjeta de un catálogo en el hub y en el Inicio: una sola acción, ir a la
 * página del catálogo (el PDF se descarga desde ahí). Foto de un producto en
 * marco blanco, nombre, una línea y cuántos modelos tiene el catálogo.
 */
export default function TarjetaCatalogo({ catalogo, foto, prioridad = false, nivel: Nivel = "h3" }: Props) {
  return (
    <Link href={urlCatalogo(catalogo.slug)} className="group flex h-full flex-col rounded-3xl">
      <div className="transition-[translate,box-shadow] duration-300 ease-ow group-hover:-translate-y-0.5">
        {foto ? (
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-white shadow-apoyado transition-shadow duration-300 ease-ow group-hover:shadow-levantado">
            <Image
              src={foto.src}
              alt=""
              fill
              unoptimized
              loading={prioridad ? "eager" : "lazy"}
              className="object-contain p-[10%]"
            />
          </div>
        ) : (
          <PortadaCatalogo catalogo={catalogo} cuadrada className="shadow-apoyado transition-shadow duration-300 ease-ow group-hover:shadow-levantado" />
        )}
      </div>
      <Nivel className="mt-5 font-display text-lg leading-tight font-bold text-pretty decoration-ow-yellow decoration-2 underline-offset-4 group-hover:underline sm:text-2xl">
        {catalogo.titulo}
      </Nivel>
      <p className="mt-2 text-sm text-ow-black/80 sm:text-base">{textoWeb(catalogo.tarjeta)}</p>
      <p className="mt-2 text-xs font-semibold text-ow-gray sm:text-sm">{catalogo.modelos} modelos</p>
    </Link>
  );
}
