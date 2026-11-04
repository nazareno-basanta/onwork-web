import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import Franja from "@/components/Franja";
import Icon from "@/components/Icon";
import PortadaCatalogo from "@/components/PortadaCatalogo";
import TarjetaPedido from "@/components/TarjetaPedido";
import Titular from "@/components/Titular";
import WhatsAppLink from "@/components/WhatsAppLink";
import Busquedas from "@/components/sections/Busquedas";
import Cierre from "@/components/sections/Cierre";
import Preguntas from "@/components/sections/Preguntas";
import TiltedCard from "@/components/ui/TiltedCard";
import { CATALOGOS, CATALOGO_PAGINA, mensajePedirPdf } from "@/data/catalogos";
import { PEDIDOS } from "@/data/pedidos";
import { PREGUNTAS } from "@/data/preguntas";
import { btn } from "@/lib/ui";
import { textoWeb } from "@/lib/utils";

/** Una sola plantilla para los siete catálogos, generada desde src/data/catalogos.ts. */
export function generateStaticParams() {
  return CATALOGOS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/catalogos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const catalogo = CATALOGOS.find((c) => c.slug === slug);
  if (!catalogo) return {};
  const url = `/catalogos/${catalogo.slug}`;
  return {
    title: catalogo.seo.titulo,
    description: catalogo.seo.descripcion,
    alternates: { canonical: url },
    openGraph: { url, title: catalogo.seo.titulo, description: catalogo.seo.descripcion },
  };
}

/** Páginas del PDF como se leen: "pág. 03" o "págs. 04–06". */
const paginas = (p: string) => (p.includes("–") ? `págs. ${p}` : `pág. ${p}`);

// En la página de un catálogo van las preguntas que tienen que ver con pedir:
// mínimos, plazos, precios y búsquedas fuera de catálogo.
const PREGUNTAS_CATALOGO = PREGUNTAS.slice(0, 4);

export default async function CatalogoPage({ params }: PageProps<"/catalogos/[slug]">) {
  const { slug } = await params;
  const catalogo = CATALOGOS.find((c) => c.slug === slug);
  if (!catalogo) notFound();

  const pedidos = PEDIDOS.filter((p) => p.catalogo === catalogo.slug);

  return (
    <>
      <section className="pt-10 pb-20 md:pt-14 md:pb-28">
        <div className="container-ow">
          <Breadcrumb
            items={[
              { label: "Catálogos", href: "/catalogos" },
              { label: catalogo.titulo, href: `/catalogos/${catalogo.slug}` },
            ]}
          />

          <div className="mt-10 grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-20">
            <div className="mx-auto w-full max-w-[18rem] sm:max-w-xs lg:order-2 lg:mx-0 lg:max-w-sm lg:justify-self-end">
              <TiltedCard>
                <PortadaCatalogo catalogo={catalogo} priority />
              </TiltedCard>
            </div>

            <div className="lg:order-1">
              <Titular as="h1" className="text-[clamp(2.2rem,5.6vw,4.75rem)]">
                {catalogo.h1}
              </Titular>
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ow-black/80 md:text-xl">
                {textoWeb(catalogo.bajada)}
              </p>
              <p className="mt-5 text-sm font-semibold text-ow-gray">
                Catálogo {catalogo.titulo} {catalogo.anio} · {catalogo.paginas} páginas · {catalogo.modelos} modelos
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <WhatsAppLink tone="yellow" message={catalogo.mensaje}>
                  {CATALOGO_PAGINA.botonWhatsApp}
                </WhatsAppLink>
                {catalogo.pdf ? (
                  <a href={catalogo.pdf} target="_blank" rel="noopener" className={btn.line}>
                    <Icon name="documento" size={18} />
                    {CATALOGO_PAGINA.botonPdf}
                  </a>
                ) : (
                  <WhatsAppLink tone="line" message={mensajePedirPdf(catalogo.titulo)}>
                    {CATALOGO_PAGINA.botonPedirPdf}
                  </WhatsAppLink>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="secciones" className="bg-ow-paper-soft py-20 md:py-28">
        <div className="container-ow">
          <Titular id="secciones" className="text-[clamp(1.9rem,4vw,3.25rem)]">
            {CATALOGO_PAGINA.secciones}
          </Titular>
          <ol className="mt-12 grid border-t-2 border-ow-black md:grid-cols-2 md:gap-x-12">
            {catalogo.secciones.map((s) => (
              <li key={s.nombre} className="border-b-2 border-ow-black py-6 md:py-7">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                  <h3 className="font-display text-xl font-bold md:text-2xl">{s.nombre}</h3>
                  <span className="rounded-full bg-ow-yellow px-3 py-1 font-display text-xs font-bold tracking-[0.14em] uppercase">
                    {paginas(s.paginas)}
                  </span>
                </div>
                {textoWeb(s.texto) && <p className="mt-2 max-w-md text-ow-black/80">{textoWeb(s.texto)}</p>}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {catalogo.kit && (
        <section aria-labelledby="kit" className="py-20 md:py-28">
          <div className="container-ow flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <Titular id="kit" className="text-[clamp(1.9rem,4vw,3.25rem)]">
                {catalogo.kit.titulo}
              </Titular>
              <p className="mt-4 text-lg text-ow-black/80">{textoWeb(catalogo.kit.texto)}</p>
            </div>
            <WhatsAppLink tone="black" message={catalogo.mensaje}>
              {CATALOGO_PAGINA.botonKit}
            </WhatsAppLink>
          </div>
        </section>
      )}

      {pedidos.length > 0 && (
        <section aria-labelledby="pedidos-linea" className="py-20 md:py-28">
          <div className="container-ow">
            <Titular id="pedidos-linea" className="text-[clamp(1.9rem,4vw,3.25rem)]">
              {CATALOGO_PAGINA.pedidos}
            </Titular>
            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pedidos.map((p) => (
                <li key={p.slug}>
                  <TarjetaPedido pedido={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <Preguntas preguntas={PREGUNTAS_CATALOGO} className="border-t border-ow-black/10" datosEstructurados />

      <Franja />

      <Busquedas id="busquedas-catalogo" />

      <Cierre titulo={catalogo.cierre} mensaje={catalogo.mensaje} />
    </>
  );
}
