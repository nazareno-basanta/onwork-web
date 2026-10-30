import Link from "next/link";
import type { Catalogo } from "@/data/catalogos";
import { whatsappUrl } from "@/lib/site";
import { sinViuda } from "@/lib/utils";
import Icon from "./Icon";
import PortadaCatalogo from "./PortadaCatalogo";
import TiltedCard from "./ui/TiltedCard";

/**
 * Tarjeta de catálogo: la portada como objeto que se inclina (Tilted Card),
 * nombre, una línea, "N páginas · PDF · edición 2026" y dos acciones claras
 * (no una tarjeta-link gigante): ver el PDF y ver el detalle.
 */
export default function TarjetaCatalogo({ catalogo, priority }: { catalogo: Catalogo; priority?: boolean }) {
  const detalle = `/catalogos/${catalogo.slug}`;

  return (
    <article className="flex flex-col">
      <Link
        href={detalle}
        aria-label={`Catálogo ${catalogo.titulo}`}
        className="cursor-target block rounded-xl"
        data-cursor-label="Ver detalle"
      >
        <TiltedCard>
          <PortadaCatalogo catalogo={catalogo} priority={priority} />
        </TiltedCard>
      </Link>

      <h3 className="mt-5 font-display text-lg leading-tight font-bold sm:mt-6 sm:text-2xl">{catalogo.titulo}</h3>
      <p className="mt-2 text-sm text-ow-black/80 sm:text-base">{sinViuda(catalogo.tarjeta)}</p>
      <p className="mt-2 text-xs text-ow-gray sm:text-sm">
        {catalogo.paginas} páginas · {catalogo.modelos} modelos · PDF · edición {catalogo.anio}
      </p>

      <div className="mt-3 flex flex-col items-start gap-x-5 font-display text-sm font-bold sm:mt-5 sm:flex-row sm:flex-wrap">
        {catalogo.pdf ? (
          <a
            href={catalogo.pdf}
            target="_blank"
            rel="noopener"
            className="cursor-target inline-flex min-h-11 items-center gap-1.5 rounded-sm underline decoration-ow-yellow decoration-2 underline-offset-[6px] hover:decoration-ow-black"
          >
            <Icon name="documento" size={18} />
            Ver PDF
          </a>
        ) : (
          <a
            href={whatsappUrl(`Hola, quiero el PDF del catálogo ${catalogo.titulo}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-target inline-flex min-h-11 items-center gap-1.5 rounded-sm underline decoration-ow-yellow decoration-2 underline-offset-[6px] hover:decoration-ow-black"
          >
            <Icon name="whatsapp" size={18} />
            Pedir el PDF
          </a>
        )}
        <Link
          href={detalle}
          className="cursor-target inline-flex min-h-11 items-center gap-1.5 rounded-sm underline decoration-ow-yellow decoration-2 underline-offset-[6px] hover:decoration-ow-black"
        >
          Ver detalle
          <Icon name="flecha-derecha" size={18} />
        </Link>
      </div>
    </article>
  );
}
