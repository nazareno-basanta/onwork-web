import Link from "next/link";
import Icon from "@/components/Icon";
import Titular from "@/components/Titular";
import { AUTORES } from "@/data/autores";
import { IDEAS_INDICE, IDEAS_PAGINA, TIPOS, type Idea } from "@/data/ideas";
import { urlIdea } from "@/lib/rutas";
import { fechaLarga, mostrarMarcadores, textoWeb } from "@/lib/utils";

const fecha = (idea: Idea) => idea.actualizado ?? idea.publicado;

/**
 * Lista de notas de Ideas (en /ideas y en la página de cada autor): una fila
 * por nota, separadas por filetes de 2 px en tinta, como las listas de
 * Nosotros. Lo último actualizado va primero. Toda la fila lleva a la nota: el
 * link está en el titular y se estira sobre la fila (un solo link por nota).
 */
export default function ListaIdeas({
  notas,
  titulos = "h2",
  className = "",
}: {
  notas: Idea[];
  /** h2 en /ideas (debajo del titular de la página); h3 si la lista va dentro de una sección con titular propio. */
  titulos?: "h2" | "h3";
  className?: string;
}) {
  const ordenadas = [...notas].sort((a, b) => (fecha(b) ?? "").localeCompare(fecha(a) ?? ""));

  return (
    <ul className={`border-t-2 border-ow-black ${className}`}>
      {ordenadas.map((idea) => {
        const f = fecha(idea);
        const respuesta = textoWeb(idea.respuesta);
        return (
          <li key={idea.slug} className="group relative border-b-2 border-ow-black py-8 md:py-10">
            <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_14rem_2.75rem] md:items-start md:gap-10">
              <div className="min-w-0">
                <Link
                  href={urlIdea(idea.slug)}
                  className="foco-propio rounded-sm after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-ow-black"
                >
                  <Titular
                    as={titulos}
                    className="text-[clamp(1.6rem,3vw,2.25rem)] decoration-ow-yellow decoration-2 underline-offset-[6px] group-hover:underline"
                  >
                    {idea.titulo}
                  </Titular>
                </Link>
                {respuesta && <p className="mt-4 line-clamp-3 max-w-[42rem] text-ow-black/80">{respuesta}</p>}
              </div>

              <p className="text-sm leading-snug text-ow-gray md:pt-1.5">
                <span className="font-display font-bold text-ow-black">{TIPOS[idea.tipo]}</span>
                {idea.borrador && mostrarMarcadores && (
                  <span className="ml-2 rounded-full bg-ow-black px-2.5 py-1 font-display text-xs font-bold text-white">
                    {IDEAS_INDICE.borrador}
                  </span>
                )}
                <br />
                {IDEAS_PAGINA.por} {AUTORES[idea.autor].nombre}
                {f && (
                  <>
                    <br />
                    <time dateTime={f}>{fechaLarga(f)}</time>
                  </>
                )}
              </p>

              {/* La flecha acompaña al hover de la fila; el link es el titular. */}
              <span
                aria-hidden="true"
                className="hidden size-11 items-center justify-center rounded-full bg-ow-yellow transition-transform duration-300 ease-ow group-hover:translate-x-1 md:flex"
              >
                <Icon name="flecha-derecha" size={20} />
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
