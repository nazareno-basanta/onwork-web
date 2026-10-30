import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import Franja from "@/components/Franja";
import TarjetaCatalogo from "@/components/TarjetaCatalogo";
import Titular from "@/components/Titular";
import Busquedas from "@/components/sections/Busquedas";
import Cierre from "@/components/sections/Cierre";
import { CATALOGOS, CATALOGOS_HUB } from "@/data/catalogos";
import { sinViuda } from "@/lib/utils";

export const metadata: Metadata = {
  title: CATALOGOS_HUB.seo.titulo,
  description: CATALOGOS_HUB.seo.descripcion,
  alternates: { canonical: "/catalogos" },
  openGraph: { url: "/catalogos" },
};

export default function CatalogosPage() {
  return (
    <>
      <section className="pt-10 pb-20 md:pt-14 md:pb-28">
        <div className="container-ow">
          <Breadcrumb items={[{ label: "Catálogos", href: "/catalogos" }]} />
          <div className="mt-10 max-w-4xl">
            <Titular as="h1" className="text-[clamp(2.4rem,6.4vw,5.25rem)]">
              {CATALOGOS_HUB.h1}
            </Titular>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ow-black/80 md:text-xl">
              {sinViuda(CATALOGOS_HUB.bajada)}
            </p>
          </div>

          <ul className="mt-16 grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-8 sm:gap-y-16 lg:grid-cols-3 xl:grid-cols-4">
            {CATALOGOS.map((c, i) => (
              <li key={c.slug}>
                <TarjetaCatalogo catalogo={c} priority={i < 2} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Franja />

      <Busquedas id="busquedas-catalogos" titulo={CATALOGOS_HUB.banda.titulo} texto={CATALOGOS_HUB.banda.texto} />

      <Cierre />
    </>
  );
}
