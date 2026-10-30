import Image from "next/image";
import type { Catalogo } from "@/data/catalogos";
import { cn } from "@/lib/utils";

/**
 * Portada de un catálogo. Si ya existe la imagen de la página 1 del PDF
 * (catalogo.portada), se usa esa. Mientras tanto se arma con el mismo sistema
 * de las portadas impresas: A4 vertical en tinta, wordmark blanco,
 * "Catálogo" + la categoría y "2026" en amarillo.
 * Los tamaños de letra son relativos al ancho de la portada (cqw).
 */
export default function PortadaCatalogo({
  catalogo,
  className,
  priority = false,
}: {
  catalogo: Catalogo;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative aspect-[210/297] w-full overflow-hidden rounded-xl bg-ow-black shadow-portada [container-type:inline-size]",
        className,
      )}
    >
      {catalogo.portada ? (
        <Image
          src={catalogo.portada}
          alt={`Portada del catálogo ${catalogo.titulo} ${catalogo.anio}`}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 80vw"
          className="object-cover"
        />
      ) : (
        <div aria-hidden className="flex h-full flex-col justify-between p-[8cqw] text-white">
          <Image
            src="/brand/wordmark-onwork-blanco.svg"
            alt=""
            width={698}
            height={111}
            className="h-auto w-[34cqw]"
          />
          <div>
            <p className="font-display text-[15cqw] leading-[0.95] font-extrabold tracking-tight">
              Catálogo
            </p>
            <p className="mt-[2cqw] font-display text-[8cqw] leading-[1.05] font-bold text-balance">
              {catalogo.titulo}
            </p>
            <p className="mt-[5cqw] font-display text-[14cqw] leading-none font-extrabold text-ow-yellow">
              {catalogo.anio}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
