import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import TarjetaPedido from "@/components/TarjetaPedido";
import Titular from "@/components/Titular";
import WhatsAppLink from "@/components/WhatsAppLink";
import TarjetaProducto from "@/components/catalogo/TarjetaProducto";
import SumarKit from "@/components/ideas/SumarKit";
import Cierre from "@/components/sections/Cierre";
import Preguntas from "@/components/sections/Preguntas";
import { AUTORES } from "@/data/autores";
import { CATALOGOS } from "@/data/catalogos";
import { IDEAS_PAGINA, IDEAS_VISIBLES } from "@/data/ideas";
import { PEDIDOS_VISIBLES } from "@/data/pedidos";
import { PRODUCTOS, aTarjeta } from "@/data/productos";
import { articulo } from "@/lib/datosEstructurados";
import { mensajeWeb } from "@/lib/mensajes";
import { urlAutor, urlCatalogo, urlIdea, urlProducto } from "@/lib/rutas";
import { cn, fechaLarga, mostrarMarcadores, sinMarcadores, textoWeb } from "@/lib/utils";

/*
 * Una plantilla para todas las notas de Ideas (orden de los bloques: ver el
 * plan del blog). Como los pedidos, es estática del todo: una dirección que
 * no existe da 404 real. Next.js pide al menos una página de muestra: mientras
 * no haya notas publicadas se usa un marcador que da "página no encontrada".
 */
const SIN_IDEAS = "__sin-ideas__";

export const ensureStatic = "navigation";
export const instant = false;

export function generateStaticParams() {
  return IDEAS_VISIBLES.length > 0 ? IDEAS_VISIBLES.map((i) => ({ slug: i.slug })) : [{ slug: SIN_IDEAS }];
}

async function buscar(params: PageProps<"/ideas/[slug]">["params"]) {
  const { slug } = await params;
  return IDEAS_VISIBLES.find((i) => i.slug === slug) ?? null;
}

const link =
  "inline-flex min-h-11 items-center gap-1.5 rounded-sm font-display text-sm font-bold underline decoration-ow-yellow decoration-2 underline-offset-[6px] hover:decoration-ow-black";

export async function generateMetadata({ params }: PageProps<"/ideas/[slug]">): Promise<Metadata> {
  const idea = await buscar(params);
  if (!idea) return {};
  const url = urlIdea(idea.slug);
  const autor = AUTORES[idea.autor];
  return {
    title: idea.seo.titulo,
    description: idea.seo.descripcion,
    alternates: { canonical: url },
    authors: [{ name: autor.nombre }],
    openGraph: {
      type: "article",
      url,
      title: idea.seo.titulo,
      description: idea.seo.descripcion,
      publishedTime: idea.publicado,
      modifiedTime: idea.actualizado,
      authors: [autor.nombre],
    },
  };
}

export default async function IdeaPage({ params }: PageProps<"/ideas/[slug]">) {
  const idea = await buscar(params);
  if (!idea) notFound();

  // El texto de la nota, escrito en Markdown (src/data/ideas/<slug>.mdx).
  const { default: Texto } = await import(`@/data/ideas/${idea.slug}.mdx`);

  const autor = AUTORES[idea.autor];
  const fecha = idea.actualizado ?? idea.publicado;
  const productos = (idea.productos ?? []).flatMap((codigo) => PRODUCTOS.filter((p) => p.codigo === codigo));
  const catalogos = (idea.catalogos ?? []).flatMap((slug) => CATALOGOS.filter((c) => c.slug === slug));
  const pedido = PEDIDOS_VISIBLES.find((p) => p.slug === idea.pedido);
  const mensaje = mensajeWeb(`la nota "${sinMarcadores(idea.seo.titulo)}"`);
  const respuesta = textoWeb(idea.respuesta);

  return (
    <>
      <article>
        <header className="pt-10 pb-14 md:pt-14 md:pb-16">
          <div className="container-ow">
            <Breadcrumb
              items={[
                { label: IDEAS_PAGINA.migas, href: "/ideas" },
                { label: sinMarcadores(idea.titulo), href: urlIdea(idea.slug) },
              ]}
            />
            {idea.borrador && mostrarMarcadores && (
              <p className="mt-8 inline-flex rounded-full bg-ow-black px-4 py-2 text-sm font-bold text-white">
                {IDEAS_PAGINA.borrador}
              </p>
            )}
            <Titular as="h1" className="mt-10 max-w-4xl text-[clamp(2.2rem,5.6vw,4.75rem)]">
              {idea.titulo}
            </Titular>
            {/* La respuesta corta: lo primero que se lee, y lo que citan Google y las IA. */}
            {respuesta && <p className="mt-8 max-w-[42rem] text-lg leading-relaxed md:text-xl">{respuesta}</p>}

            <div className="mt-10 flex max-w-[42rem] items-center gap-4 border-t-2 border-ow-black pt-5">
              {autor.foto && (
                <Image src={autor.foto} alt="" width={48} height={48} className="size-12 rounded-full object-cover" />
              )}
              <p className="text-sm leading-snug text-ow-gray">
                <span className="font-display font-bold text-ow-black">
                  {IDEAS_PAGINA.por}{" "}
                  <Link
                    href={urlAutor(idea.autor)}
                    className="rounded-sm underline decoration-ow-yellow decoration-2 underline-offset-4 hover:decoration-ow-black"
                  >
                    {autor.nombre}
                  </Link>
                </span>
                {", "}
                {autor.rol}
                {fecha && (
                  <>
                    <br />
                    {IDEAS_PAGINA.actualizado} <time dateTime={fecha}>{fechaLarga(fecha)}</time>
                  </>
                )}
              </p>
            </div>
          </div>
        </header>

        {/* En la compu, al costado y fijo mientras se lee: el pedido real de la
            nota o, si no tiene, los productos de su kit, siempre con WhatsApp.
            Antes la mitad derecha quedaba vacía durante toda la nota (críticas
            del 12/11/2026). */}
        <div className="pb-20 md:pb-28">
          <div className={cn("container-ow", (pedido || productos.length > 0) && "lg:grid lg:grid-cols-[minmax(0,42rem)_minmax(0,20rem)] lg:justify-between lg:gap-16")}>
            <div className="max-w-[42rem]">
              <Texto />
            </div>
            {pedido && (
              <aside aria-labelledby="pedido-al-costado" className="hidden lg:block">
                <div className="sticky top-28">
                  <h2 id="pedido-al-costado" className="font-display text-xl leading-tight font-extrabold">
                    {IDEAS_PAGINA.pedido}
                  </h2>
                  <div className="mt-6">
                    <TarjetaPedido pedido={pedido} />
                  </div>
                  <WhatsAppLink tone="yellow" message={mensaje} className="mt-8">
                    {IDEAS_PAGINA.botonWhatsApp}
                  </WhatsAppLink>
                </div>
              </aside>
            )}
            {!pedido && productos.length > 0 && (
              <aside aria-labelledby="kit-al-costado" className="hidden lg:block">
                <div className="sticky top-28">
                  <h2 id="kit-al-costado" className="font-display text-xl leading-tight font-extrabold">
                    {IDEAS_PAGINA.kit.titulo}
                  </h2>
                  <ul className="mt-6 space-y-3">
                    {productos.map((p) => (
                      <li key={p.codigo}>
                        <Link href={urlProducto(p)} className="group flex items-center gap-4 rounded-2xl">
                          <span className="relative size-16 shrink-0 overflow-hidden rounded-2xl bg-white shadow-apoyado">
                            <Image src={p.fotos[0].chica} alt="" fill unoptimized className="object-contain p-1.5" />
                          </span>
                          <span className="min-w-0">
                            <span className="block font-display leading-tight font-bold decoration-ow-yellow decoration-2 underline-offset-4 group-hover:underline">
                              {p.nombre}
                            </span>
                            <span className="block text-sm text-ow-gray">{p.tipo}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <SumarKit codigos={productos.map((p) => p.codigo)} nota={idea.slug} />
                  </div>
                  <WhatsAppLink tone="yellow" message={mensaje} className="mt-3">
                    {IDEAS_PAGINA.botonWhatsApp}
                  </WhatsAppLink>
                </div>
              </aside>
            )}
          </div>
        </div>
        {/* Datos del artículo para Google: titular, fechas, autor y On Work como editor. */}
        <JsonLd datos={articulo(idea)} />
      </article>

      {productos.length > 0 && (
        <section aria-labelledby="kit" className="border-t border-ow-black/10 py-20 md:py-28">
          <div className="container-ow">
            <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-6">
              <Titular id="kit" className="text-[clamp(1.9rem,4vw,3.25rem)]">
                {IDEAS_PAGINA.kit.titulo}
              </Titular>
              <SumarKit codigos={productos.map((p) => p.codigo)} nota={idea.slug} />
            </div>
            <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 lg:gap-x-8">
              {productos.map((p) => (
                <li key={p.codigo}>
                  <TarjetaProducto producto={aTarjeta(p)} />
                </li>
              ))}
            </ul>
            {catalogos.length > 0 && (
              <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-1">
                {catalogos.map((c) => (
                  <li key={c.slug}>
                    <Link href={urlCatalogo(c.slug)} className={link}>
                      {IDEAS_PAGINA.verCatalogo(c.titulo)}
                      <Icon name="flecha-derecha" size={18} />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      {/* En el celular y la tablet, el pedido va acá, con la foto al costado del texto. */}
      {pedido && (
        <section aria-labelledby="pedido" className="border-t border-ow-black/10 py-20 md:py-28 lg:hidden">
          <div className="container-ow">
            <Titular id="pedido" className="text-[clamp(1.9rem,4vw,3.25rem)]">
              {IDEAS_PAGINA.pedido}
            </Titular>
            <div className="mt-10 max-w-2xl">
              <TarjetaPedido pedido={pedido} horizontal />
            </div>
          </div>
        </section>
      )}

      {idea.preguntas && idea.preguntas.length > 0 && (
        <Preguntas preguntas={idea.preguntas} className="border-t border-ow-black/10" datosEstructurados />
      )}

      <Cierre titulo={idea.cierre} mensaje={mensaje} />
    </>
  );
}
