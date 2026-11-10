import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import Titular from "@/components/Titular";
import ListaIdeas from "@/components/ideas/ListaIdeas";
import Cierre from "@/components/sections/Cierre";
import { HAY_IDEAS, IDEAS_INDICE, IDEAS_PAGINA, IDEAS_VISIBLES } from "@/data/ideas";
import { mostrarMarcadores, textoWeb } from "@/lib/utils";

export const metadata: Metadata = {
  title: IDEAS_INDICE.seo.titulo,
  description: IDEAS_INDICE.seo.descripcion,
  alternates: { canonical: "/ideas" },
  openGraph: { url: "/ideas" },
  // Mientras no haya notas publicadas, Google no indexa la página (sí sigue
  // sus links). Se indexa sola cuando se publica la primera.
  ...(!HAY_IDEAS && { robots: { index: false, follow: true } }),
};

export default function IdeasPage() {
  return (
    <>
      <section className="pt-10 pb-20 md:pt-14 md:pb-28">
        <div className="container-ow">
          <Breadcrumb items={[{ label: IDEAS_PAGINA.migas, href: "/ideas" }]} />
          <div className="mt-10 max-w-4xl">
            <Titular as="h1" className="text-[clamp(2.4rem,6.4vw,5.25rem)]">
              {IDEAS_INDICE.h1}
            </Titular>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ow-black/80 md:text-xl">
              {textoWeb(IDEAS_INDICE.bajada)}
            </p>
          </div>

          {IDEAS_VISIBLES.length > 0 ? (
            <ListaIdeas notas={IDEAS_VISIBLES} className="mt-16" />
          ) : (
            mostrarMarcadores && (
              <p className="mt-16 rounded-3xl border-2 border-dashed border-ow-black/30 p-8 font-display font-bold text-ow-gray">
                {IDEAS_INDICE.vacio}
              </p>
            )
          )}
        </div>
      </section>

      <Cierre />
    </>
  );
}
