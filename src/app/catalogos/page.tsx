import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import Franja from "@/components/Franja";
import Titular from "@/components/Titular";
import BuscadorProductos from "@/components/catalogo/BuscadorProductos";
import TarjetaCatalogo from "@/components/catalogo/TarjetaCatalogo";
import Busquedas from "@/components/sections/Busquedas";
import Cierre from "@/components/sections/Cierre";
import { CATALOGOS, CATALOGOS_HUB } from "@/data/catalogos";
import { fotoDeCatalogo, indiceBusqueda, indiceLugares } from "@/data/productos";

export const metadata: Metadata = {
  title: CATALOGOS_HUB.seo.titulo,
  description: CATALOGOS_HUB.seo.descripcion,
  alternates: { canonical: "/catalogos" },
  openGraph: { url: "/catalogos" },
};

/**
 * /catalogos: el buscador de productos de todos los catálogos, una tarjeta
 * por catálogo y la banda de búsquedas a medida (lo que no está, lo
 * conseguimos).
 */
export default function CatalogosPage() {
  return (
    <>
      {/* Encabezado acotado, como el de cada catálogo: el buscador y las tarjetas suben. */}
      <section className="pt-8 pb-20 md:pt-10 md:pb-28">
        <div className="container-ow">
          <Breadcrumb items={[{ label: "Catálogos", href: "/catalogos" }]} />
          {/* Sin bajada (Nachi, 5/11/2026): el titular, el buscador y los catálogos. */}
          <Titular as="h1" className="mt-6 max-w-4xl text-[clamp(2rem,4.2vw,3.5rem)] md:mt-8">
            {CATALOGOS_HUB.h1}
          </Titular>

          <BuscadorProductos productos={indiceBusqueda()} lugares={indiceLugares()} />

          <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-8 sm:gap-y-16 lg:grid-cols-4">
            {CATALOGOS.map((c, i) => (
              <li key={c.slug}>
                <TarjetaCatalogo catalogo={c} foto={fotoDeCatalogo(c.slug)} prioridad={i < 4} nivel="h2" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Franja />

      <Busquedas id="busquedas-catalogos" conPresupuesto />

      <Cierre />
    </>
  );
}
