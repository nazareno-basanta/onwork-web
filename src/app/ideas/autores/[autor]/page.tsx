import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import JsonLd from "@/components/JsonLd";
import Titular from "@/components/Titular";
import ListaIdeas from "@/components/ideas/ListaIdeas";
import Cierre from "@/components/sections/Cierre";
import { AUTORES, AUTOR_PAGINA, type AutorId } from "@/data/autores";
import { IDEAS_PAGINA, IDEAS_VISIBLES } from "@/data/ideas";
import { perfil } from "@/lib/datosEstructurados";
import { urlAutor } from "@/lib/rutas";
import { mostrarMarcadores, textoWeb } from "@/lib/utils";

/*
 * Página de quien firma las notas: nombre, rol, bio y sus notas. Existe solo
 * si la persona tiene alguna nota visible (en npm run dev, todos los autores,
 * para poder verla mientras se completa). Estática del todo, como las notas.
 */
const SIN_AUTORES = "__sin-autores__";

export const ensureStatic = "navigation";
export const instant = false;

const notasDe = (id: AutorId) => IDEAS_VISIBLES.filter((i) => i.autor === id);
const CON_PAGINA = (Object.keys(AUTORES) as AutorId[]).filter((id) => mostrarMarcadores || notasDe(id).length > 0);

export function generateStaticParams() {
  return CON_PAGINA.length > 0 ? CON_PAGINA.map((autor) => ({ autor })) : [{ autor: SIN_AUTORES }];
}

async function buscar(params: PageProps<"/ideas/autores/[autor]">["params"]) {
  const { autor } = await params;
  return CON_PAGINA.find((id) => id === autor) ?? null;
}

export async function generateMetadata({ params }: PageProps<"/ideas/autores/[autor]">): Promise<Metadata> {
  const id = await buscar(params);
  if (!id) return {};
  const autor = AUTORES[id];
  const url = urlAutor(id);
  const descripcion = AUTOR_PAGINA.descripcion(autor);
  return {
    title: `${autor.nombre}, ${autor.rol}`,
    description: descripcion,
    alternates: { canonical: url },
    openGraph: { type: "profile", url, title: autor.nombre, description: descripcion },
  };
}

export default async function AutorPage({ params }: PageProps<"/ideas/autores/[autor]">) {
  const id = await buscar(params);
  if (!id) notFound();
  const autor = AUTORES[id];
  const notas = notasDe(id);
  const bio = textoWeb(autor.bio);

  return (
    <>
      <section className="pt-10 pb-20 md:pt-14 md:pb-28">
        <div className="container-ow">
          <Breadcrumb
            items={[
              { label: IDEAS_PAGINA.migas, href: "/ideas" },
              { label: autor.nombre, href: urlAutor(id) },
            ]}
          />
          <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:gap-10">
            {autor.foto && (
              <Image
                src={autor.foto}
                alt={autor.nombre}
                width={160}
                height={160}
                priority
                className="size-32 shrink-0 rounded-full object-cover shadow-apoyado md:size-40"
              />
            )}
            <div className="max-w-3xl">
              <Titular as="h1" className="text-[clamp(2.4rem,6.4vw,5.25rem)]">
                {`${autor.nombre}.`}
              </Titular>
              <p className="mt-4 font-display text-lg font-bold md:text-xl">{autor.rol}</p>
            </div>
          </div>
          {bio && <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ow-black/80 md:text-xl">{bio}</p>}
          {autor.perfiles && autor.perfiles.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-1">
              {autor.perfiles.map((p) => (
                <li key={p}>
                  <a
                    href={p}
                    target="_blank"
                    rel="noopener noreferrer me"
                    className="inline-flex min-h-11 items-center rounded-sm font-display text-sm font-bold underline decoration-ow-yellow decoration-2 underline-offset-[6px] hover:decoration-ow-black"
                  >
                    {new URL(p).hostname.replace(/^www\./, "")}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {notas.length > 0 && (
        <section aria-labelledby="notas-autor" className="border-t border-ow-black/10 py-20 md:py-28">
          <div className="container-ow">
            <Titular id="notas-autor" className="text-[clamp(1.9rem,4vw,3.25rem)]">
              {AUTOR_PAGINA.notas(autor.nombre)}
            </Titular>
            <ListaIdeas notas={notas} titulos="h3" className="mt-12" />
          </div>
        </section>
      )}

      <JsonLd datos={perfil(id)} />
      <Cierre />
    </>
  );
}
