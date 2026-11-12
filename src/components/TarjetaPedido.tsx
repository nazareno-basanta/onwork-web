import Image from "next/image";
import Link from "next/link";
import type { Pedido } from "@/data/pedidos";
import { cn } from "@/lib/utils";

/**
 * Tarjeta de un pedido real (Inicio, /ideas, catálogos y notas), con la misma
 * anatomía que la tarjeta de catálogo: la foto entera en un marco blanco
 * cuadrado ("Apoyado", "Levantado" al pasar el mouse) y debajo el rubro y el
 * título. Lleva a la página del pedido, no a un modal.
 * - horizontal: desde 640 px, la foto a la izquierda y el texto al costado
 *   (al pie de una nota, en el celular y la tablet).
 *
 * Antes el texto iba en una pastilla encima de la foto y en el celular tapaba
 * cerca de un tercio de los productos (crítica del 12/11/2026; Nachi eligió
 * pasar el texto abajo).
 */
export default function TarjetaPedido({
  pedido,
  etiqueta,
  prioridad = false,
  nivel: Nivel = "h3",
  horizontal = false,
}: {
  pedido: Pedido;
  /** En la lista de /ideas, antes del rubro, para distinguirla de las notas ("Pedido real · Turismo"). */
  etiqueta?: string;
  /** La primera tarjeta de /ideas se ve apenas carga: su foto se pide primero. */
  prioridad?: boolean;
  /** "h2" en /ideas (debajo del H1), "h3" dentro de una sección con titular propio. */
  nivel?: "h2" | "h3";
  horizontal?: boolean;
}) {
  const portada = pedido.fotos[0];

  return (
    <Link
      href={`/pedidos/${pedido.slug}`}
      className={cn(
        "group flex h-full flex-col rounded-3xl",
        horizontal && "sm:grid sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] sm:items-center sm:gap-8",
      )}
    >
      <div className="transition-[translate] duration-300 ease-ow group-hover:-translate-y-0.5">
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-white shadow-apoyado transition-shadow duration-300 ease-ow group-hover:shadow-levantado">
          {portada && (
            <Image
              src={portada.src}
              alt={portada.alt}
              fill
              preload={prioridad}
              sizes={horizontal ? "(min-width: 640px) 14rem, 90vw" : "(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 78vw"}
              // Entera, sin recortar productos, con un poco de aire alrededor.
              className="object-contain p-[5%] transition-transform duration-700 ease-ow group-hover:scale-[1.03]"
            />
          )}
        </div>
      </div>
      <div>
        <p className={cn("mt-5 text-sm font-semibold text-ow-gray", horizontal && "sm:mt-0")}>
          {etiqueta && <span className="font-display font-bold text-ow-black">{etiqueta} · </span>}
          {pedido.rubro}
        </p>
        <Nivel className="mt-1.5 font-display text-lg leading-tight font-bold text-pretty decoration-ow-yellow decoration-2 underline-offset-4 group-hover:underline sm:text-2xl">
          {pedido.producto} para {pedido.cliente}
        </Nivel>
      </div>
    </Link>
  );
}
