import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import Franja from "@/components/Franja";
import Icon from "@/components/Icon";
import Titular from "@/components/Titular";
import GaleriaProducto from "@/components/catalogo/GaleriaProducto";
import TarjetaProducto from "@/components/catalogo/TarjetaProducto";
import SumarConColor from "@/components/catalogo/SumarConColor";
import Cierre from "@/components/sections/Cierre";
import { CATALOGOS, CATALOGO_PAGINA, PRODUCTO_PAGINA } from "@/data/catalogos";
import { PRODUCTOS, aTarjeta, producto as buscarProducto, relacionados } from "@/data/productos";
import { urlProducto } from "@/lib/rutas";
import { descripcionProducto, tituloProducto } from "@/lib/seoProducto";
import { whatsappUrl } from "@/lib/site";
import { aSlug, textoWeb } from "@/lib/utils";

// Cada página se arma de antemano (generateStaticParams) y es estática del
// todo: una dirección que no existe espera la respuesta completa y da 404 (sin
// esto, Next manda primero una versión provisoria con código 200 y Google la
// tomaría como una página válida). Por eso tampoco hace falta el aviso de
// "navegación instantánea" del modo desarrollo.
export const ensureStatic = "navigation";
export const instant = false;

/** Una página por cada producto que se ve en la web (los demás quedan solo en el PDF). */
export function generateStaticParams() {
  return PRODUCTOS.map((p) => ({ slug: p.catalogo, producto: p.slug }));
}

type Params = PageProps<"/catalogos/[slug]/[producto]">["params"];

async function datos(params: Params) {
  const { slug, producto: slugProducto } = await params;
  const catalogo = CATALOGOS.find((c) => c.slug === slug);
  const producto = buscarProducto(slug, slugProducto);
  return catalogo && producto ? { catalogo, producto } : null;
}

export async function generateMetadata({ params }: PageProps<"/catalogos/[slug]/[producto]">): Promise<Metadata> {
  const d = await datos(params);
  if (!d) return {};
  const seo = { ...d.producto, colores: d.producto.colores.length, catalogo: d.catalogo.titulo };
  const titulo = tituloProducto(seo);
  const descripcion = descripcionProducto(seo);
  const url = urlProducto(d.producto);
  return {
    title: titulo,
    description: descripcion,
    alternates: { canonical: url },
    openGraph: {
      url,
      title: titulo,
      description: descripcion,
      // Logo + foto del producto, armada por npm run productos (sin ella, la del catálogo).
      images: [
        d.producto.compartir
          ? { url: d.producto.compartir, width: 1200, height: 630, alt: `${d.producto.nombre}, de On Work` }
          : { url: `/catalogos/${d.catalogo.slug}/opengraph-image`, width: 1200, height: 630 },
      ],
    },
  };
}

export default async function ProductoPage({ params }: PageProps<"/catalogos/[slug]/[producto]">) {
  const d = await datos(params);
  if (!d) notFound();
  const { catalogo, producto } = d;
  const mas = relacionados(producto);
  const mensaje = PRODUCTO_PAGINA.mensaje(producto.nombre, producto.codigo);

  const datosTecnicos = [
    { rotulo: PRODUCTO_PAGINA.medidas, valor: producto.medidas },
    { rotulo: PRODUCTO_PAGINA.hojas, valor: producto.hojas },
  ].filter((x) => textoWeb(x.valor));

  const link =
    "inline-flex min-h-11 items-center gap-1.5 rounded-sm font-display text-sm font-bold underline decoration-ow-yellow decoration-2 underline-offset-[6px] hover:decoration-ow-black";

  return (
    <>
      <section className="pt-10 pb-20 md:pt-14 md:pb-28">
        <div className="container-ow">
          <Breadcrumb
            items={[
              { label: "Catálogos", href: "/catalogos" },
              { label: catalogo.titulo, href: `/catalogos/${catalogo.slug}` },
              { label: producto.nombre, href: urlProducto(producto) },
            ]}
          />

          <div className="mt-8 grid items-start gap-10 md:mt-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
            {/* En escritorio la galería queda quieta mientras se leen los datos. */}
            <div className="min-w-0 lg:sticky lg:top-24">
              <GaleriaProducto fotos={producto.fotos} nombre={producto.nombre} />
            </div>

            <div className="min-w-0 lg:pt-4">
              <Titular as="h1" className="text-[clamp(2.2rem,5vw,4rem)]">
                {`${producto.nombre}.`}
              </Titular>
              {/* La pastilla del código va debajo del titular, junto al tipo (no como etiqueta arriba: ver DESIGN.md). */}
              <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-lg font-semibold text-ow-gray md:text-xl">
                {producto.tipo}
                <span className="rounded-full bg-ow-yellow px-3 py-1.5 font-display text-xs leading-none font-bold tracking-[0.14em] text-ow-black tabular-nums">
                  {producto.codigo}
                </span>
              </p>
              {textoWeb(producto.descripcion) && (
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-ow-black/80">{textoWeb(producto.descripcion)}</p>
              )}

              {datosTecnicos.length > 0 && (
                <dl className="mt-8 max-w-xl border-t-2 border-ow-black">
                  {datosTecnicos.map((x) => (
                    <div key={x.rotulo} className="grid gap-1 border-b-2 border-ow-black py-4 sm:grid-cols-[8rem_1fr] sm:gap-6">
                      <dt className="font-display text-sm font-bold">{x.rotulo}</dt>
                      <dd className="text-ow-black/80">{textoWeb(x.valor)}</dd>
                    </div>
                  ))}
                </dl>
              )}

              {/* El color se elige acá, junto al botón (con "A definir" de entrada). */}
              <div className="mt-8 max-w-xl">
                <SumarConColor
                  producto={{ codigo: producto.codigo, nombre: producto.nombre, catalogo: producto.catalogo }}
                  colores={producto.colores}
                  fotoDeColor={producto.fotoDeColor}
                />
              </div>

              <div className="mt-8 flex flex-col items-start gap-y-1 border-t border-ow-black/10 pt-6">
                <p className="flex flex-wrap items-center gap-x-3 text-ow-black/80">
                  {PRODUCTO_PAGINA.dudas}
                  <a href={whatsappUrl(mensaje)} target="_blank" rel="noopener noreferrer" className={link}>
                    <Icon name="whatsapp" size={18} />
                    {PRODUCTO_PAGINA.dudasLink}
                  </a>
                </p>
                {catalogo.pdf && (
                  <a href={catalogo.pdf} download className={link}>
                    <Icon name="descargar" size={18} />
                    {CATALOGO_PAGINA.botonPdf}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {mas.productos.length > 0 && (
        <section aria-labelledby="mas-productos" className="border-t border-ow-black/10 py-20 md:py-28">
          <div className="container-ow">
            <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
              <Titular id="mas-productos" className="text-[clamp(1.9rem,4vw,3.25rem)]">
                {PRODUCTO_PAGINA.mas(mas.deLaSeccion ? producto.seccion : catalogo.titulo)}
              </Titular>
              <Link
                href={`/catalogos/${catalogo.slug}${mas.deLaSeccion ? `#seccion-${aSlug(producto.seccion)}` : ""}`}
                className={link}
              >
                {mas.deLaSeccion ? PRODUCTO_PAGINA.verSeccion : PRODUCTO_PAGINA.verCatalogo}
                <Icon name="flecha-derecha" size={18} />
              </Link>
            </div>
            <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 lg:gap-x-8">
              {mas.productos.map((p) => (
                <li key={p.codigo}>
                  <TarjetaProducto producto={aTarjeta(p)} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <Franja />

      <Cierre titulo={catalogo.cierre} mensaje={mensaje} />
    </>
  );
}
