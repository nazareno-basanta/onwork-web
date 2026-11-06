import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { Trio } from "@/components/Formas";
import Titular from "@/components/Titular";
import Cierre from "@/components/sections/Cierre";
import Clientes from "@/components/sections/Clientes";
import Tecnicas from "@/components/sections/Tecnicas";
import { NOSOTROS, QUE_HACEMOS_NOSOTROS, VALORES } from "@/data/nosotros";
import { HAY_PEDIDOS } from "@/data/pedidos";
import { SERVICIOS } from "@/data/servicios";
import { btn } from "@/lib/ui";
import { textoWeb } from "@/lib/utils";

export const metadata: Metadata = {
  title: NOSOTROS.seo.titulo,
  description: NOSOTROS.seo.descripcion,
  alternates: { canonical: "/nosotros" },
  openGraph: { url: "/nosotros" },
};

const tituloSeccion = "text-[clamp(1.9rem,4vw,3.25rem)]";

export default function NosotrosPage() {
  return (
    <>
      <section className="pt-10 pb-20 md:pt-14 md:pb-28">
        <div className="container-ow">
          <Breadcrumb items={[{ label: "Nosotros", href: "/nosotros" }]} />
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16">
            <Titular as="h1" className="text-[clamp(2.4rem,6.4vw,5.25rem)]">
              {NOSOTROS.h1}
            </Titular>
            <div>
              <Trio className="h-9 w-auto" />
              <p className="mt-6 font-display text-xl leading-snug font-bold md:text-2xl">
                {textoWeb(NOSOTROS.bajada)}
              </p>
              <p className="mt-5 text-lg leading-relaxed text-ow-black/80">{textoWeb(NOSOTROS.historia)}</p>
            </div>
          </div>
        </div>
      </section>

      <Clientes />

      <section aria-labelledby="valores" className="py-20 md:py-28">
        <div className="container-ow">
          <Titular id="valores" className={tituloSeccion}>
            {VALORES.titulo}
          </Titular>
          <ul className="mt-12 grid border-t-2 border-ow-black md:grid-cols-2 md:gap-x-12">
            {VALORES.items.map((v) => (
              <li key={v.titulo} className="border-b-2 border-ow-black py-7">
                <h3 className="font-display text-xl font-bold md:text-2xl">{v.titulo}</h3>
                <p className="mt-2 max-w-md text-ow-black/80">{textoWeb(v.texto)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Tecnicas tituloClassName={tituloSeccion} />

      <section aria-labelledby="que-hacemos-nosotros" className="py-20 md:py-28">
        <div className="container-ow grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            {/* En la compu, el titular y los botones quedan fijos mientras se recorre la lista (como en el Inicio). */}
            <div className="lg:sticky lg:top-28">
              <Titular id="que-hacemos-nosotros" className={tituloSeccion}>
                {QUE_HACEMOS_NOSOTROS.titulo}
              </Titular>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/catalogos" className={btn.black}>
                  {QUE_HACEMOS_NOSOTROS.botonCatalogos}
                </Link>
                {HAY_PEDIDOS && (
                  <Link href="/pedidos" className={btn.line}>
                    {QUE_HACEMOS_NOSOTROS.botonPedidos}
                  </Link>
                )}
              </div>
            </div>
          </div>
          <ul className="border-t-2 border-ow-black">
            {SERVICIOS.map((s) => (
              <li key={s.id} className="border-b-2 border-ow-black py-6">
                <h3 className="font-display text-xl font-bold">{s.titulo}</h3>
                <p className="mt-1.5 text-ow-black/80">{textoWeb(s.texto)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Cierre />
    </>
  );
}
