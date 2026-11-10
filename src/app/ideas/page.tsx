import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import Icon from "@/components/Icon";
import Titular from "@/components/Titular";
import Cierre from "@/components/sections/Cierre";
import { AUTORES } from "@/data/autores";
import { HAY_IDEAS, IDEAS_INDICE, IDEAS_PAGINA, IDEAS_VISIBLES, TIPOS } from "@/data/ideas";
import { urlIdea } from "@/lib/rutas";
import { fechaLarga, mostrarMarcadores, textoWeb } from "@/lib/utils";

export const metadata: Metadata = {
  title: IDEAS_INDICE.seo.titulo,
  description: IDEAS_INDICE.seo.descripcion,
  alternates: { canonical: "/ideas" },
  openGraph: { url: "/ideas" },
  // Mientras no haya notas publicadas, Google no indexa la página (sí sigue
  // sus links). Se indexa sola cuando se publica la primera.
  ...(!HAY_IDEAS && { robots: { index: false, follow: true } }),
};

const fecha = (i: (typeof IDEAS_VISIBLES)[number]) => i.actualizado ?? i.publicado;

/** Lo último actualizado, primero. */
const NOTAS = [...IDEAS_VISIBLES].sort((a, b) => (fecha(b) ?? "").localeCompare(fecha(a) ?? ""));

/*
 * Lista de notas de Ideas: una fila por nota, separadas por filetes de 2 px en
 * tinta, como las listas de Nosotros. Toda la fila lleva a la nota: el link
 * está en el titular y se estira sobre la fila (un solo link por nota).
 */
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

          {NOTAS.length > 0 ? (
            <ul className="mt-16 border-t-2 border-ow-black">
              {NOTAS.map((idea) => {
                const autor = AUTORES[idea.autor];
                const f = fecha(idea);
                const respuesta = textoWeb(idea.respuesta);
                return (
                  <li key={idea.slug} className="group relative border-b-2 border-ow-black py-8 md:py-10">
                    <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_14rem_2.75rem] md:items-start md:gap-10">
                      <div className="min-w-0">
                        <Link
                          href={urlIdea(idea.slug)}
                          className="foco-propio rounded-sm after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-ow-black"
                        >
                          <Titular
                            as="h2"
                            className="text-[clamp(1.6rem,3vw,2.25rem)] decoration-ow-yellow decoration-2 underline-offset-[6px] group-hover:underline"
                          >
                            {idea.titulo}
                          </Titular>
                        </Link>
                        {respuesta && (
                          <p className="mt-4 line-clamp-3 max-w-[42rem] text-ow-black/80">{respuesta}</p>
                        )}
                      </div>

                      <p className="text-sm leading-snug text-ow-gray md:pt-1.5">
                        <span className="font-display font-bold text-ow-black">{TIPOS[idea.tipo]}</span>
                        {idea.borrador && mostrarMarcadores && (
                          <span className="ml-2 rounded-full bg-ow-black px-2.5 py-1 font-display text-xs font-bold text-white">
                            {IDEAS_INDICE.borrador}
                          </span>
                        )}
                        <br />
                        {IDEAS_PAGINA.por} {autor.nombre}
                        {f && (
                          <>
                            <br />
                            <time dateTime={f}>{fechaLarga(f)}</time>
                          </>
                        )}
                      </p>

                      {/* La flecha acompaña al hover de la fila; el link es el titular. */}
                      <span
                        aria-hidden="true"
                        className="hidden size-11 items-center justify-center rounded-full bg-ow-yellow transition-transform duration-300 ease-ow group-hover:translate-x-1 md:flex"
                      >
                        <Icon name="flecha-derecha" size={20} />
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
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
