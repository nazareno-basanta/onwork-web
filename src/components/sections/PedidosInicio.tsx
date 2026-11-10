import Link from "next/link";
import TarjetaPedido from "@/components/TarjetaPedido";
import Titular from "@/components/Titular";
import CardsCarousel from "@/components/ui/CardsCarousel";
import { PEDIDOS_INICIO } from "@/data/inicio";
import { PEDIDOS_VISIBLES } from "@/data/pedidos";
import { btn } from "@/lib/ui";
import { textoWeb } from "@/lib/utils";

/**
 * Pedidos reales en carrusel (3 a 6). Si todavía no hay pedidos cargados en
 * src/data/pedidos.ts, la sección no se muestra: no se inventan.
 */
export default function PedidosInicio() {
  if (PEDIDOS_VISIBLES.length === 0) return null;

  return (
    <section aria-labelledby="pedidos-inicio" className="overflow-hidden py-24 md:py-32">
      <div className="container-ow">
        <div className="max-w-3xl">
          <Titular id="pedidos-inicio" className="text-[clamp(2.1rem,4.8vw,4rem)]">
            {PEDIDOS_INICIO.titulo}
          </Titular>
          <p className="mt-6 text-lg text-ow-black/80">{textoWeb(PEDIDOS_INICIO.bajada)}</p>
        </div>
        <div className="mt-12">
          <CardsCarousel label="Pedidos reales">
            {PEDIDOS_VISIBLES.slice(0, 6).map((p) => (
              <TarjetaPedido key={p.slug} pedido={p} />
            ))}
          </CardsCarousel>
        </div>
        <Link href="/pedidos" className={`${btn.line} mt-10`}>
          {PEDIDOS_INICIO.boton}
        </Link>
      </div>
    </section>
  );
}
