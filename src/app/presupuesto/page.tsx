import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import Titular from "@/components/Titular";
import ListaPresupuesto from "@/components/presupuesto/ListaPresupuesto";
import { PRESUPUESTO } from "@/data/presupuesto";
import { indicePresupuesto } from "@/data/productos";

// Página de cada persona (lo que sumó vive en su navegador): fuera del menú,
// del sitemap y de Google.
export const metadata: Metadata = {
  title: PRESUPUESTO.seo.titulo,
  description: PRESUPUESTO.seo.descripcion,
  alternates: { canonical: "/presupuesto" },
  robots: { index: false, follow: true },
};

export default function PresupuestoPage() {
  return (
    <>
      <section className="pt-10 pb-20 md:pt-14 md:pb-28">
        <div className="container-ow">
          <Breadcrumb items={[{ label: PRESUPUESTO.seo.titulo, href: "/presupuesto" }]} />
          <Titular as="h1" className="mt-10 max-w-4xl text-[clamp(2.4rem,6.4vw,5.25rem)]">
            {PRESUPUESTO.h1}
          </Titular>
          <ListaPresupuesto indice={indicePresupuesto()} />
        </div>
      </section>
      {/* La franja "Consultanos por cantidades…" va dentro del panel, junto al botón de enviar. */}
    </>
  );
}
