import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import TarjetaPedido from "@/components/TarjetaPedido";
import Titular from "@/components/Titular";
import Busquedas from "@/components/sections/Busquedas";
import Cierre from "@/components/sections/Cierre";
import { HAY_PEDIDOS, PEDIDOS_PAGINA, PEDIDOS_VISIBLES } from "@/data/pedidos";
import { mostrarMarcadores, textoWeb } from "@/lib/utils";

export const metadata: Metadata = {
  title: PEDIDOS_PAGINA.seo.titulo,
  description: PEDIDOS_PAGINA.seo.descripcion,
  alternates: { canonical: "/pedidos" },
  openGraph: { url: "/pedidos" },
  // Mientras no haya pedidos cargados, Google no indexa la página (sí sigue
  // sus links). Se indexa sola cuando se suma el primero.
  ...(!HAY_PEDIDOS && { robots: { index: false, follow: true } }),
};

export default function PedidosPage() {
  return (
    <>
      <section className="pt-10 pb-20 md:pt-14 md:pb-28">
        <div className="container-ow">
          <Breadcrumb items={[{ label: "Pedidos reales", href: "/pedidos" }]} />
          <div className="mt-10 max-w-4xl">
            <Titular as="h1" className="text-[clamp(2.4rem,6.4vw,5.25rem)]">
              {PEDIDOS_PAGINA.h1}
            </Titular>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ow-black/80 md:text-xl">
              {textoWeb(PEDIDOS_PAGINA.bajada)}
            </p>
          </div>

          {PEDIDOS_VISIBLES.length > 0 ? (
            <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {PEDIDOS_VISIBLES.map((p) => (
                <li key={p.slug}>
                  <TarjetaPedido pedido={p} />
                </li>
              ))}
            </ul>
          ) : (
            mostrarMarcadores && (
              <p className="mt-16 rounded-3xl border-2 border-dashed border-ow-black/30 p-8 font-display font-bold text-ow-gray">
                {PEDIDOS_PAGINA.vacio}
              </p>
            )
          )}
        </div>
      </section>

      <Busquedas id="busquedas-pedidos" />

      <Cierre />
    </>
  );
}
