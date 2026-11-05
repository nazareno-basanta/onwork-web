import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import Titular from "@/components/Titular";
import Cierre from "@/components/sections/Cierre";
import ComoPedir from "@/components/sections/ComoPedir";
import Preguntas from "@/components/sections/Preguntas";
import Tecnicas from "@/components/sections/Tecnicas";
import { COMO_PEDIR_PAGINA } from "@/data/como-pedir";
import { textoWeb } from "@/lib/utils";

const T = COMO_PEDIR_PAGINA;

export const metadata: Metadata = {
  title: T.seo.titulo,
  description: T.seo.descripcion,
  alternates: { canonical: "/como-pedir" },
  openGraph: { url: "/como-pedir" },
};

const tituloSeccion = "text-[clamp(1.9rem,4vw,3.25rem)]";

/**
 * /como-pedir (fuera del menú; se llega desde el pie, el presupuesto y cada
 * catálogo): la misma línea de tiempo del Inicio, cómo mandar el logo, las
 * técnicas, las preguntas frecuentes y el cierre.
 */
export default function ComoPedirPage() {
  return (
    <>
      <section className="pt-10 pb-14 md:pt-14 md:pb-20">
        <div className="container-ow">
          <Breadcrumb items={[{ label: "Cómo pedir", href: "/como-pedir" }]} />
          <Titular as="h1" id="como-pedir-titulo" className="mt-10 text-[clamp(2.4rem,6.4vw,5.25rem)]">
            {T.h1}
          </Titular>
          <p className="mt-6 max-w-2xl font-display text-xl leading-snug font-bold text-pretty md:text-2xl">
            {textoWeb(T.bajada)}
          </p>
        </div>
      </section>

      <ComoPedir id="como-pedir-titulo" conTitulo={false} />

      <section aria-labelledby="logo" className="py-20 md:py-28">
        <div className="container-ow grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <Titular id="logo" className={tituloSeccion}>
            {T.logo.titulo}
          </Titular>
          <div>
            <dl className="border-t-2 border-ow-black">
              {T.logo.formas.map((f) => (
                <div
                  key={f.titulo}
                  className="grid gap-4 border-b-2 border-ow-black py-6 sm:grid-cols-[10rem_minmax(0,1fr)] sm:items-center"
                >
                  <dt className="font-display text-lg font-bold">{f.titulo}</dt>
                  <dd className="flex flex-wrap items-center gap-2">
                    {f.formatos.map((formato) => (
                      <span
                        key={formato}
                        className="rounded-full bg-ow-yellow px-3.5 py-1.5 font-display text-sm leading-none font-bold tracking-[0.14em]"
                      >
                        {formato}
                      </span>
                    ))}
                    {f.nota && <span className="ml-1 text-ow-black/80">{f.nota}</span>}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-lg text-ow-black/80">{textoWeb(T.logo.adaptamos)}</p>
          </div>
        </div>
      </section>

      <Tecnicas tituloClassName={tituloSeccion} />
      <Preguntas />
      <Cierre />
    </>
  );
}
