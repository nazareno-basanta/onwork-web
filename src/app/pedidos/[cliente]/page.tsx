import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import Icon from "@/components/Icon";
import Titular from "@/components/Titular";
import Cierre from "@/components/sections/Cierre";
import { CATALOGOS } from "@/data/catalogos";
import { PEDIDOS, PEDIDOS_PAGINA, mensajePedido } from "@/data/pedidos";
import { textoWeb } from "@/lib/utils";

/*
 * Una plantilla para todos los pedidos. Next.js (con Cache Components) pide al
 * menos una página de muestra: mientras no haya pedidos cargados se usa un
 * marcador que devuelve "página no encontrada".
 */
const SIN_PEDIDOS = "__sin-pedidos__";

export function generateStaticParams() {
  return PEDIDOS.length > 0 ? PEDIDOS.map((p) => ({ cliente: p.slug })) : [{ cliente: SIN_PEDIDOS }];
}

export async function generateMetadata({ params }: PageProps<"/pedidos/[cliente]">): Promise<Metadata> {
  const { cliente } = await params;
  const pedido = PEDIDOS.find((p) => p.slug === cliente);
  if (!pedido) return {};
  const titulo = `${pedido.producto} para ${pedido.cliente}`;
  const url = `/pedidos/${pedido.slug}`;
  return {
    title: titulo,
    description: pedido.necesitaba,
    alternates: { canonical: url },
    openGraph: { url, title: titulo, description: pedido.necesitaba },
  };
}

export default async function PedidoPage({ params }: PageProps<"/pedidos/[cliente]">) {
  const { cliente } = await params;
  const pedido = PEDIDOS.find((p) => p.slug === cliente);
  if (!pedido) notFound();

  const catalogo = CATALOGOS.find((c) => c.slug === pedido.catalogo);
  const [portada, ...resto] = pedido.fotos;

  return (
    <>
      <section className="pt-10 pb-16 md:pt-14">
        <div className="container-ow">
          <Breadcrumb
            items={[
              { label: "Pedidos reales", href: "/pedidos" },
              { label: pedido.cliente, href: `/pedidos/${pedido.slug}` },
            ]}
          />
          <p className="mt-10 text-sm font-semibold text-ow-gray">{pedido.rubro}</p>
          <Titular as="h1" className="mt-3 max-w-4xl text-[clamp(2.2rem,5.6vw,4.75rem)]">
            {`${pedido.producto} para ${pedido.cliente}.`}
          </Titular>
        </div>
      </section>

      {portada && (
        <div className="container-ow">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-white shadow-apoyado md:aspect-[16/9]">
            <Image src={portada.src} alt={portada.alt} fill priority sizes="(min-width: 1280px) 1216px, 100vw" className="object-contain" />
          </div>
        </div>
      )}

      <section className="py-20 md:py-28">
        <div className="container-ow grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <Titular className="text-[clamp(1.7rem,3.4vw,2.6rem)]">{PEDIDOS_PAGINA.necesitaba}</Titular>
            <p className="mt-5 text-lg text-ow-black/80">{textoWeb(pedido.necesitaba)}</p>
          </div>
          <div>
            <Titular className="text-[clamp(1.7rem,3.4vw,2.6rem)]">{PEDIDOS_PAGINA.hicimos}</Titular>
            <p className="mt-5 text-lg text-ow-black/80">{textoWeb(pedido.hicimos)}</p>
          </div>
        </div>
      </section>

      {resto.length > 0 && (
        <div className="container-ow grid gap-6 pb-20 sm:grid-cols-2 md:pb-28">
          {resto.map((foto) => (
            <div key={foto.src} className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-white shadow-apoyado">
              <Image src={foto.src} alt={foto.alt} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-contain" />
            </div>
          ))}
        </div>
      )}

      {catalogo && (
        <section className="bg-ow-paper-soft py-16">
          <div className="container-ow flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-display text-xl font-bold">{PEDIDOS_PAGINA.productos}</p>
            <Link
              href={`/catalogos/${catalogo.slug}`}
              className="inline-flex min-h-11 items-center gap-2 rounded-sm font-display font-bold underline decoration-ow-yellow decoration-2 underline-offset-[6px] hover:decoration-ow-black"
            >
              {PEDIDOS_PAGINA.verCatalogo} {catalogo.titulo}
              <Icon name="flecha-derecha" size={18} />
            </Link>
          </div>
        </section>
      )}

      <Cierre titulo={pedido.cierre} mensaje={mensajePedido(pedido.cliente)} />
    </>
  );
}
