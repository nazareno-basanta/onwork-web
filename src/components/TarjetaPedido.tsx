import Image from "next/image";
import Link from "next/link";
import type { Pedido } from "@/data/pedidos";

/**
 * Tarjeta alta de un pedido real: la foto completa (sin recortar productos) y
 * el texto en una pastilla sobre la zona de abajo. Lleva a la página del
 * pedido, no a un modal.
 */
export default function TarjetaPedido({ pedido }: { pedido: Pedido }) {
  const portada = pedido.fotos[0];

  return (
    <Link
      href={`/pedidos/${pedido.slug}`}
      className="group relative block aspect-[3/4] overflow-hidden rounded-3xl bg-white shadow-apoyado transition-shadow duration-300 ease-ow hover:shadow-levantado"
    >
      {portada && (
        <Image
          src={portada.src}
          alt={portada.alt}
          fill
          sizes="(min-width: 768px) 24rem, 78vw"
          // Entera (sin recortar productos) y un poco hacia arriba, así la
          // pastilla de abajo queda sobre el blanco y no sobre el producto.
          className="object-contain object-[50%_30%] transition-transform duration-700 ease-ow group-hover:scale-[1.03]"
        />
      )}
      <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-ow-paper px-4 py-3">
        <p className="text-sm font-semibold text-ow-gray">{pedido.rubro}</p>
        <p className="font-display text-lg leading-tight font-bold">
          {pedido.producto} para {pedido.cliente}
        </p>
      </div>
    </Link>
  );
}
