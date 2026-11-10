import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import Franja from "@/components/Franja";
import Icon from "@/components/Icon";
import TarjetaPedido from "@/components/TarjetaPedido";
import Titular from "@/components/Titular";
import WhatsAppLink from "@/components/WhatsAppLink";
import NavSecciones from "@/components/catalogo/NavSecciones";
import SumarLinea from "@/components/catalogo/SumarLinea";
import TarjetaProducto from "@/components/catalogo/TarjetaProducto";
import ListaIdeas from "@/components/ideas/ListaIdeas";
import JsonLd from "@/components/JsonLd";
import Busquedas from "@/components/sections/Busquedas";
import Cierre from "@/components/sections/Cierre";
import Preguntas from "@/components/sections/Preguntas";
import { CATALOGOS, CATALOGO_PAGINA, type Catalogo } from "@/data/catalogos";
import { IDEAS_PAGINA, ideasDeCatalogo } from "@/data/ideas";
import { PEDIDOS } from "@/data/pedidos";
import { PREGUNTAS } from "@/data/preguntas";
import { aTarjeta, secciones as seccionesDe, type SeccionConProductos } from "@/data/productos";
import { listaDeProductos } from "@/lib/datosEstructurados";
import { urlProducto } from "@/lib/rutas";
import { whatsappUrl } from "@/lib/site";
import { btn } from "@/lib/ui";
import { aSlug, textoWeb } from "@/lib/utils";

// Cada página se arma de antemano (generateStaticParams) y es estática del
// todo: una dirección que no existe espera la respuesta completa y da 404 (sin
// esto, Next manda primero una versión provisoria con código 200 y Google la
// tomaría como una página válida). Por eso tampoco hace falta el aviso de
// "navegación instantánea" del modo desarrollo.
export const ensureStatic = "navigation";
export const instant = false;

/** Una sola plantilla para los ocho catálogos, generada desde src/data/catalogos.ts. */
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

const idSeccion = (nombre: string) => `seccion-${aSlug(nombre)}`;

/** "Descargar catálogo PDF": solo si el PDF está subido (si no, no aparece). */
function BotonPdf({ catalogo, className }: { catalogo: Catalogo; className?: string }) {
  if (!catalogo.pdf) return null;
  return (
    <a href={catalogo.pdf} download className={className ?? btn.line}>
      <Icon name="descargar" size={18} />
      {CATALOGO_PAGINA.botonPdf}
    </a>
  );
}

export default async function CatalogoPage({ params }: PageProps<"/catalogos/[slug]">) {
  const { slug } = await params;
  const catalogo = CATALOGOS.find((c) => c.slug === slug);
  if (!catalogo) notFound();

  const secciones = seccionesDe(catalogo.slug);
  const conProductos = secciones.some((s) => s.productos.length > 0);
  const pedidos = PEDIDOS.filter((p) => p.catalogo === catalogo.slug);
  const ideas = ideasDeCatalogo(catalogo.slug);

  return (
    <>
      {/* Encabezado acotado: los productos tienen que asomar en la primera pantalla.
          En escritorio, la bajada y los botones van al lado del titular. */}
      <section className="pt-8 pb-8 md:pt-10 md:pb-12">
        <div className="container-ow">
          <Breadcrumb
            items={[
              { label: "Catálogos", href: "/catalogos" },
              { label: catalogo.titulo, href: `/catalogos/${catalogo.slug}` },
            ]}
          />

          <div className="mt-6 grid gap-x-16 gap-y-5 md:mt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,27rem)] lg:items-end">
            <Titular as="h1" className="text-[clamp(2rem,4.2vw,3.5rem)]">
              {catalogo.h1}
            </Titular>
            <div>
              <p className="max-w-2xl text-base leading-relaxed text-ow-black/80 md:text-lg">
                {textoWeb(catalogo.bajada)}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <WhatsAppLink tone="yellow" message={catalogo.mensaje}>
                  {CATALOGO_PAGINA.botonWhatsApp}
                </WhatsAppLink>
                <BotonPdf catalogo={catalogo} />
                {catalogo.pdf && catalogo.paginas && (
                  <span className="text-sm font-semibold text-ow-gray">PDF · {catalogo.paginas} páginas</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {conProductos && (
        <JsonLd
          datos={listaDeProductos(
            `Catálogo ${catalogo.titulo} ${catalogo.anio}`,
            secciones.flatMap((s) => s.productos).map((p) => ({ nombre: p.nombre, url: urlProducto(p) })),
          )}
        />
      )}
      {conProductos ? (
        <ProductosPorSeccion catalogo={catalogo} secciones={secciones} />
      ) : (
        <ListaDeSecciones catalogo={catalogo} />
      )}

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

      {/* Notas de Ideas que nombran este catálogo: llevan de la guía al producto y del producto a la guía. */}
      {ideas.length > 0 && (
        <section aria-labelledby="ideas-catalogo" className="border-t border-ow-black/10 py-20 md:py-28">
          <div className="container-ow">
            <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
              <Titular id="ideas-catalogo" className="text-[clamp(1.9rem,4vw,3.25rem)]">
                {IDEAS_PAGINA.relacionadas}
              </Titular>
              <Link
                href="/ideas"
                className="inline-flex min-h-11 items-center gap-1.5 rounded-sm font-display text-sm font-bold underline decoration-ow-yellow decoration-2 underline-offset-[6px] hover:decoration-ow-black"
              >
                {IDEAS_PAGINA.verTodas}
                <Icon name="flecha-derecha" size={18} />
              </Link>
            </div>
            <ListaIdeas notas={ideas} titulos="h3" className="mt-12" />
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

/**
 * Los productos, sección por sección y en el orden del PDF, con la barra de
 * secciones fija arriba. La barra deja de estar fija cuando terminan los
 * productos (vive dentro de este bloque).
 */
function ProductosPorSeccion({ catalogo, secciones }: { catalogo: Catalogo; secciones: SeccionConProductos[] }) {
  return (
    <div className="pb-8 md:pb-12">
      <NavSecciones secciones={secciones.map((s) => ({ id: idSeccion(s.nombre), nombre: s.nombre }))} />

      <div className="container-ow">
        {secciones.map((s, i) => (
          <section
            key={s.nombre}
            id={idSeccion(s.nombre)}
            aria-labelledby={`${idSeccion(s.nombre)}-titulo`}
            className={`scroll-mt-36 ${i === 0 ? "pt-10 md:pt-12" : "pt-14 md:pt-20"}`}
          >
            <div data-titulo-seccion tabIndex={-1} className="max-w-3xl rounded-sm">
              <Titular id={`${idSeccion(s.nombre)}-titulo`} className="text-[clamp(1.75rem,3.6vw,2.75rem)]">
                {`${s.nombre}.`}
              </Titular>
              {textoWeb(s.texto) && <p className="mt-3 text-lg text-ow-black/80">{textoWeb(s.texto)}</p>}
            </div>

            {s.productos.length > 0 ? (
              <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:mt-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-14">
                {s.productos.map((p, j) => (
                  <li key={p.codigo}>
                    <TarjetaProducto producto={aTarjeta(p)} prioridad={i === 0 && j < 4} />
                  </li>
                ))}
              </ul>
            ) : (
              <SeccionFueraDeLaWeb catalogo={catalogo} seccion={s.nombre} />
            )}
          </section>
        ))}
      </div>
    </div>
  );
}

/** Una sección cuyos productos no están en la web (quedaron solo en el PDF). */
function SeccionFueraDeLaWeb({ catalogo, seccion }: { catalogo: Catalogo; seccion: string }) {
  const link =
    "inline-flex min-h-11 items-center gap-1.5 rounded-sm font-display text-sm font-bold underline decoration-ow-yellow decoration-2 underline-offset-[6px] hover:decoration-ow-black";
  return (
    <div className="mt-6 flex flex-col items-start gap-x-5 gap-y-1 rounded-3xl bg-ow-paper-soft px-7 py-6 sm:flex-row sm:flex-wrap sm:items-center md:px-9">
      <p className="text-ow-black/80">
        {catalogo.pdf ? CATALOGO_PAGINA.lineaEnElPdf : CATALOGO_PAGINA.lineaSinPdf}
      </p>
      <SumarLinea seccion={seccion} catalogo={catalogo.titulo} />
      {catalogo.pdf ? (
        <BotonPdf catalogo={catalogo} className={link} />
      ) : (
        <a
          href={whatsappUrl(CATALOGO_PAGINA.mensajeLinea(seccion, catalogo.titulo))}
          target="_blank"
          rel="noopener noreferrer"
          className={link}
        >
          <Icon name="whatsapp" size={18} />
          {CATALOGO_PAGINA.consultarLinea}
        </a>
      )}
    </div>
  );
}

/**
 * Catálogos sin productos en la web (Cintas, Llaveros): la lista de secciones
 * con su texto, como un índice del PDF.
 */
function ListaDeSecciones({ catalogo }: { catalogo: Catalogo }) {
  return (
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
                {/* Las páginas sirven solo si el PDF se puede descargar. */}
                {catalogo.pdf && s.paginas && (
                  <span className="rounded-full bg-ow-yellow px-3 py-1 font-display text-xs font-bold tracking-[0.14em] uppercase">
                    {paginas(s.paginas)}
                  </span>
                )}
              </div>
              {textoWeb(s.texto) && <p className="mt-2 max-w-md text-ow-black/80">{textoWeb(s.texto)}</p>}
              <div className="mt-2">
                <SumarLinea seccion={s.nombre} catalogo={catalogo.titulo} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
