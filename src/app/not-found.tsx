import type { Metadata } from "next";
import Link from "next/link";
import { Diana } from "@/components/Formas";
import Icon from "@/components/Icon";
import Titular from "@/components/Titular";
import WhatsAppLink from "@/components/WhatsAppLink";
import { CATALOGOS_HUB } from "@/data/catalogos";
import { NO_ENCONTRADA as T } from "@/data/no-encontrada";
import { btn } from "@/lib/ui";
import { textoWeb } from "@/lib/utils";

export const metadata: Metadata = {
  title: T.titulo,
  robots: { index: false },
};

/**
 * Página de error 404 (una dirección que no existe). Va con el header y el pie
 * del sitio, como cualquier página, y ofrece tres salidas: buscar el producto
 * (lleva al buscador de /catalogos con lo escrito, y anda sin JavaScript),
 * escribir por WhatsApp o ir a los catálogos.
 */
export default function NoEncontrada() {
  return (
    <section className="relative isolate overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32">
      <Diana className="absolute top-8 -right-56 -z-10 w-[28rem] text-ow-paper-soft md:top-16 md:-right-40 md:w-[38rem]" />
      <div className="container-ow">
        <div className="max-w-3xl">
          <Titular as="h1" className="text-[clamp(2.6rem,7.2vw,6rem)]">
            {T.h1}
          </Titular>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-pretty text-ow-black/80 md:text-xl">{textoWeb(T.texto)}</p>

          {/* Un formulario común: al enviarlo abre /catalogos?q=…#buscar, que ya muestra los resultados. */}
          <form role="search" action="/catalogos#buscar" className="mt-12 max-w-2xl">
            <label htmlFor="buscar-404" className="font-display text-lg leading-snug font-bold">
              {CATALOGOS_HUB.buscador.etiqueta}
            </label>
            <div className="relative mt-3">
              <Icon name="buscar" size={22} className="pointer-events-none absolute top-1/2 left-5 -translate-y-1/2 text-ow-gray" />
              <input
                id="buscar-404"
                name="q"
                type="search"
                required
                placeholder={CATALOGOS_HUB.buscador.ejemplo}
                autoComplete="off"
                enterKeyHint="search"
                className="h-14 w-full rounded-full border-2 border-ow-black bg-white pr-16 pl-14 text-base placeholder:text-ow-gray focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ow-black md:text-lg [&::-webkit-search-cancel-button]:appearance-none"
              />
              <button
                type="submit"
                aria-label={T.buscar}
                className="absolute top-1/2 right-1.5 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-ow-black text-white transition-colors duration-300 ease-ow hover:bg-ow-yellow hover:text-ow-black"
              >
                <Icon name="flecha-derecha" size={20} />
              </button>
            </div>
          </form>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <WhatsAppLink message={T.mensaje}>{T.whatsapp}</WhatsAppLink>
            <Link href="/catalogos" className={btn.line}>
              {T.catalogos}
            </Link>
            <Link
              href="/"
              className="inline-flex min-h-11 items-center rounded-sm font-display text-sm font-bold underline decoration-ow-yellow decoration-2 underline-offset-[6px] hover:decoration-ow-black"
            >
              {T.inicio}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
