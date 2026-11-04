import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import TarjetaCatalogo from "@/components/TarjetaCatalogo";
import Titular from "@/components/Titular";
import Busquedas from "@/components/sections/Busquedas";
import Cierre from "@/components/sections/Cierre";
import Preguntas from "@/components/sections/Preguntas";
import { CATALOGOS } from "@/data/catalogos";
import { PREGUNTAS } from "@/data/preguntas";
import { REGALOS, REGALOS_LISTA } from "@/data/regalos";
import { mostrarMarcadores, textoWeb } from "@/lib/utils";

const RUTA = "/regalos-empresariales-fin-de-ano";

export const metadata: Metadata = {
  title: REGALOS.seo.titulo,
  description: REGALOS.seo.descripcion,
  alternates: { canonical: RUTA },
  openGraph: { url: RUTA, title: REGALOS.seo.titulo, description: REGALOS.seo.descripcion },
  // Mientras le falten textos, Google no la indexa.
  ...(!REGALOS_LISTA && { robots: { index: false, follow: true } }),
};

// Para regalos de fin de año importan sobre todo mínimos, plazos y precios.
const PREGUNTAS_REGALOS = PREGUNTAS.slice(0, 4);

/**
 * Página estacional (noviembre y diciembre, la búsqueda más fuerte del año).
 * Tres bloques que llevan a los catálogos que más se regalan, y después
 * preguntas, búsquedas a medida y cierre, como en el resto del sitio.
 */
export default function RegalosPage() {
  if (!REGALOS_LISTA && !mostrarMarcadores) notFound();

  const bloques = REGALOS.bloques.flatMap((b) => {
    const catalogo = CATALOGOS.find((c) => c.slug === b.catalogo);
    return catalogo ? [{ ...b, catalogo }] : [];
  });

  return (
    <>
      <section className="pt-10 pb-20 md:pt-14 md:pb-28">
        <div className="container-ow">
          <Breadcrumb items={[{ label: REGALOS.miga, href: RUTA }]} />
          <div className="mt-10 max-w-4xl">
            <Titular as="h1" className="text-[clamp(2.4rem,6.4vw,5.25rem)]">
              {REGALOS.h1}
            </Titular>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ow-black/80 md:text-xl">
              {textoWeb(REGALOS.bajada)}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-ow-paper-soft py-20 md:py-28">
        <ul className="container-ow grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {/* Cada bloque usa tres filas de la grilla (titular, texto, portada):
              así las portadas quedan alineadas aunque los textos midan distinto. */}
          {bloques.map((b) => (
            <li key={b.catalogo.slug} className="row-span-3 grid grid-rows-subgrid gap-y-0">
              <Titular className="text-[clamp(1.6rem,3vw,2.25rem)]">{b.titulo}</Titular>
              <p className="mt-3 mb-8 text-ow-black/80">{textoWeb(b.texto)}</p>
              <div className="max-w-[18rem]">
                <TarjetaCatalogo catalogo={b.catalogo} />
              </div>
            </li>
          ))}
        </ul>
      </section>

      <Preguntas preguntas={PREGUNTAS_REGALOS} />

      <Busquedas id="busquedas-regalos" />

      <Cierre />
    </>
  );
}
