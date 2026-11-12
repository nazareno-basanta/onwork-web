import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import Icon from "@/components/Icon";
import Titular from "@/components/Titular";
import WhatsAppLink from "@/components/WhatsAppLink";
import TarjetaProducto from "@/components/catalogo/TarjetaProducto";
import Cierre from "@/components/sections/Cierre";
import { CATALOGOS } from "@/data/catalogos";
import { IDEAS_PAGINA } from "@/data/ideas";
import { PRODUCTOS, aTarjeta, productosDe } from "@/data/productos";
import { PEDIDOS_PAGINA, PEDIDOS_VISIBLES, mensajePedido, type Pedido } from "@/data/pedidos";
import { medidasFoto } from "@/lib/medidasFoto";
import { cn, textoWeb } from "@/lib/utils";

/*
 * Una plantilla para todos los pedidos. Next.js (con Cache Components) pide al
 * menos una página de muestra: mientras no haya pedidos cargados se usa un
 * marcador que devuelve "página no encontrada".
 */
const SIN_PEDIDOS = "__sin-pedidos__";

// Estática del todo, como los catálogos: una dirección que no existe espera la
// respuesta completa y da 404 (sin esto, Next manda primero una versión
// provisoria con código 200 y Google la tomaría como una página válida).
export const ensureStatic = "navigation";
export const instant = false;

export function generateStaticParams() {
  return PEDIDOS_VISIBLES.length > 0 ? PEDIDOS_VISIBLES.map((p) => ({ cliente: p.slug })) : [{ cliente: SIN_PEDIDOS }];
}

export async function generateMetadata({ params }: PageProps<"/pedidos/[cliente]">): Promise<Metadata> {
  const { cliente } = await params;
  const pedido = PEDIDOS_VISIBLES.find((p) => p.slug === cliente);
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

type FotoPedido = Pedido["fotos"][number] & { proporcion: number };

/**
 * Una foto del pedido en un marco blanco con su misma proporción (leída del
 * archivo), así nunca sobra blanco a los costados. Las de producto van
 * enteras, con aire alrededor; las de ambiente (un stand, gente) llenan el marco.
 */
function Foto({ foto, sizes, prioridad = false }: { foto: FotoPedido; sizes: string; prioridad?: boolean }) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-white shadow-apoyado" style={{ aspectRatio: foto.proporcion }}>
      <Image
        src={foto.src}
        alt={foto.alt}
        fill
        preload={prioridad}
        sizes={sizes}
        className={foto.ambiente ? "object-cover" : "object-contain p-[5%]"}
      />
    </div>
  );
}

/**
 * Una fila de fotos: cada una ocupa un ancho proporcional a su forma, así las
 * de la fila quedan de la misma altura (una apaisada al lado de una vertical,
 * sin huecos). En el celular van una debajo de la otra. Una foto sola que no
 * es apaisada no ocupa todo el ancho (quedaría enorme).
 */
function FilaFotos({ fotos, primera = false }: { fotos: FotoPedido[]; primera?: boolean }) {
  const columnas = fotos.map((f) => `${f.proporcion}fr`).join(" ");
  const sola = fotos.length === 1;
  return (
    <div
      className={cn(
        "grid gap-6 sm:[grid-template-columns:var(--columnas)]",
        sola && fotos[0].proporcion < 1.2 && "max-w-xl",
      )}
      style={{ "--columnas": columnas } as React.CSSProperties}
    >
      {fotos.map((foto, i) => (
        <Foto
          key={foto.src}
          foto={foto}
          prioridad={primera && i === 0}
          sizes={`(min-width: 1280px) ${Math.round(1216 / fotos.length)}px, (min-width: 640px) ${Math.round(100 / fotos.length)}vw, 100vw`}
        />
      ))}
    </div>
  );
}

export default async function PedidoPage({ params }: PageProps<"/pedidos/[cliente]">) {
  const { cliente } = await params;
  const pedido = PEDIDOS_VISIBLES.find((p) => p.slug === cliente);
  if (!pedido) notFound();

  const catalogo = CATALOGOS.find((c) => c.slug === pedido.catalogo);
  // Las fotos van en filas de a dos (la última, de a tres si son impares); la
  // primera fila arriba de los textos y el resto abajo. (Críticas del
  // 12/11/2026: antes la portada cuadrada iba en un marco 16:9 con mucho
  // blanco, y después, en marcos 4:5 fijos donde las apaisadas quedaban chicas.)
  const fotos: FotoPedido[] = await Promise.all(
    pedido.fotos.map(async (f) => {
      const m = await medidasFoto(f.src);
      return { ...f, proporcion: m ? m.ancho / m.alto : 0.8 };
    }),
  );
  const filas: FotoPedido[][] = [];
  for (let i = 0; i < fotos.length; i += 2) filas.push(fotos.slice(i, i + 2));
  if (filas.length > 1 && filas.at(-1)!.length === 1) filas.at(-2)!.push(...filas.pop()!);
  const [arriba, ...abajo] = filas;
  // Productos del catálogo para mostrar: los del pedido, si están cargados; si
  // no, los primeros del catálogo del pedido.
  const elegidos = pedido.productos?.flatMap((codigo) => PRODUCTOS.filter((p) => p.codigo === codigo)) ?? [];
  const productos = (elegidos.length > 0 ? elegidos : catalogo ? productosDe(catalogo.slug) : []).slice(0, 4);

  return (
    <>
      <section className="pt-10 pb-16 md:pt-14">
        <div className="container-ow">
          <Breadcrumb
            items={[
              { label: IDEAS_PAGINA.migas, href: "/ideas" },
              { label: pedido.cliente, href: `/pedidos/${pedido.slug}` },
            ]}
          />
          <p className="mt-10 text-sm font-semibold text-ow-gray">{pedido.rubro}</p>
          <Titular as="h1" className="mt-3 max-w-4xl text-[clamp(2.2rem,5.6vw,4.75rem)]">
            {`${pedido.producto} para ${pedido.cliente}.`}
          </Titular>
        </div>
      </section>

      {arriba && (
        <div className="container-ow">
          <FilaFotos fotos={arriba} primera />
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
            {/* Antes la página solo llevaba a WhatsApp desde el cierre. */}
            <WhatsAppLink tone="yellow" message={mensajePedido(pedido.cliente)} className="mt-8">
              {PEDIDOS_PAGINA.botonWhatsApp}
            </WhatsAppLink>
          </div>
        </div>
      </section>

      {abajo.length > 0 && (
        <div className="container-ow space-y-6 pb-20 md:pb-28">
          {abajo.map((fila) => (
            <FilaFotos key={fila[0].src} fotos={fila} />
          ))}
        </div>
      )}

      {/* Productos del catálogo, con su link (crítica del 12/11/2026: antes era
          un titular "Productos de este pedido." con un solo link). */}
      {catalogo && (
        <section aria-labelledby="productos-pedido" className="border-t border-ow-black/10 py-20 md:py-28">
          <div className="container-ow">
            <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
              <Titular id="productos-pedido" className="text-[clamp(1.9rem,4vw,3.25rem)]">
                {pedido.productos?.length ? PEDIDOS_PAGINA.productos : PEDIDOS_PAGINA.productosLinea}
              </Titular>
              <Link
                href={`/catalogos/${catalogo.slug}`}
                className="inline-flex min-h-11 items-center gap-2 rounded-sm font-display font-bold underline decoration-ow-yellow decoration-2 underline-offset-[6px] hover:decoration-ow-black"
              >
                {PEDIDOS_PAGINA.verCatalogo} {catalogo.titulo}
                <Icon name="flecha-derecha" size={18} />
              </Link>
            </div>
            {productos.length > 0 && (
              <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 lg:gap-x-8">
                {productos.map((p) => (
                  <li key={p.codigo}>
                    <TarjetaProducto producto={aTarjeta(p)} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      <Cierre titulo={pedido.cierre} mensaje={mensajePedido(pedido.cliente)} />
    </>
  );
}
