import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import TarjetaPedido from "@/components/TarjetaPedido";
import Titular from "@/components/Titular";
import ListaBlog, { type ItemBlog } from "@/components/ideas/ListaBlog";
import TarjetaNota from "@/components/ideas/TarjetaNota";
import Busquedas from "@/components/sections/Busquedas";
import Cierre from "@/components/sections/Cierre";
import { HAY_IDEAS, IDEAS_INDICE, IDEAS_PAGINA, IDEAS_VISIBLES } from "@/data/ideas";
import { HAY_PEDIDOS, PEDIDOS_PAGINA, PEDIDOS_VISIBLES } from "@/data/pedidos";
import { mostrarMarcadores, textoWeb } from "@/lib/utils";

export const metadata: Metadata = {
  title: IDEAS_INDICE.seo.titulo,
  description: IDEAS_INDICE.seo.descripcion,
  // /ideas?ver=notas y ?ver=pedidos son la misma página filtrada: Google ve solo /ideas.
  alternates: { canonical: "/ideas" },
  openGraph: { url: "/ideas" },
  // Mientras no haya ni notas publicadas ni pedidos, Google no indexa la
  // página (sí sigue sus links). Se indexa sola cuando aparece lo primero.
  ...(!HAY_IDEAS && !HAY_PEDIDOS && { robots: { index: false, follow: true } }),
};

/**
 * Ideas: las notas y los pedidos reales juntos, como un blog (Nachi,
 * 12/11/2026). Van intercalados (pedido, nota, pedido…), todos con la misma
 * tarjeta: cuadrado arriba y texto abajo. Cada nota lleva de portada una foto
 * de su pedido real (o, sin pedido, su respuesta corta). Las notas, de la más
 * nueva a la más vieja. /pedidos redirige acá con el filtro de pedidos puesto.
 */
export default function IdeasPage() {
  const fecha = (i: (typeof IDEAS_VISIBLES)[number]) => i.actualizado ?? i.publicado ?? "";
  // Una foto no se repite en la lista: las portadas de los pedidos ya están
  // tomadas, y si la foto que le toca a una nota ya la usa otra tarjeta, esa
  // nota va clara, con su respuesta.
  const usadas = new Set(PEDIDOS_VISIBLES.map((p) => p.fotos[0]?.src));
  const portadaDe = (idea: (typeof IDEAS_VISIBLES)[number]) => {
    const fotos = PEDIDOS_VISIBLES.find((p) => p.slug === idea.pedido)?.fotos ?? [];
    const foto = fotos.find((f) => f.src === idea.portada) ?? fotos[1] ?? fotos[0];
    if (!foto || usadas.has(foto.src)) return undefined;
    usadas.add(foto.src);
    return foto;
  };
  const notas: ItemBlog[] = [...IDEAS_VISIBLES]
    .sort((a, b) => fecha(b).localeCompare(fecha(a)))
    .map((idea) => ({
      clave: `nota-${idea.slug}`,
      tipo: "notas",
      tarjeta: <TarjetaNota idea={idea} portada={portadaDe(idea)} etiqueta={IDEAS_INDICE.etiqueta} />,
    }));
  const pedidos: ItemBlog[] = PEDIDOS_VISIBLES.map((p, i) => ({
    clave: `pedido-${p.slug}`,
    tipo: "pedidos",
    tarjeta: <TarjetaPedido pedido={p} etiqueta={PEDIDOS_PAGINA.etiqueta} prioridad={i === 0} nivel="h2" />,
  }));
  const items: ItemBlog[] = [];
  for (let i = 0; i < Math.max(notas.length, pedidos.length); i++) {
    if (pedidos[i]) items.push(pedidos[i]);
    if (notas[i]) items.push(notas[i]);
  }

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

          {items.length > 0 ? (
            <ListaBlog
              items={items}
              filtros={IDEAS_INDICE.filtros}
              rotulo={IDEAS_INDICE.filtrar}
              className="mt-16"
            />
          ) : (
            mostrarMarcadores && (
              <p className="mt-16 rounded-3xl border-2 border-dashed border-ow-black/30 p-8 font-display font-bold text-ow-gray">
                {IDEAS_INDICE.vacio}
              </p>
            )
          )}
        </div>
      </section>

      <Busquedas id="busquedas-ideas" />

      <Cierre />
    </>
  );
}
