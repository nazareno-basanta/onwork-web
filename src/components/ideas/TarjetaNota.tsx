import Image from "next/image";
import Link from "next/link";
import { Diana } from "@/components/Formas";
import { AUTORES } from "@/data/autores";
import { IDEAS_INDICE, type Idea } from "@/data/ideas";
import { urlIdea } from "@/lib/rutas";
import { cn, mostrarMarcadores, textoWeb } from "@/lib/utils";

/**
 * Tarjeta de una nota en /ideas, con la misma anatomía que la de un pedido
 * (crítica del 12/11/2026; Nachi eligió esta dirección): arriba un cuadrado
 * y debajo "Nota · autor" y el titular. Toda la tarjeta lleva a la nota.
 * - Con pedido real: el cuadrado es una foto de ese pedido, a sangre (la
 *   prueba real como portada).
 * - Sin pedido: el cuadrado es crema suave, con la diana de la marca arriba
 *   (crece apenas al pasar el mouse) y la respuesta corta de la nota abajo.
 * Antes era una losa tinta 3:4 con más de la mitad vacía, y en la grilla
 * armaba un damero mitad negro.
 */
/**
 * La respuesta de la nota hasta un final de oración: la primera oración y las
 * que siguen mientras no pase de ~200 caracteres. Así no se corta a mitad de
 * palabra (crítica del 12/11/2026).
 */
function hastaOracion(texto: string) {
  const oraciones = texto.match(/[^.!?]+[.!?]+(?=\s|$)/g)?.map((o) => o.trim()) ?? [texto];
  let fragmento = oraciones[0];
  for (const o of oraciones.slice(1)) {
    if (`${fragmento} ${o}`.length > 200) break;
    fragmento = `${fragmento} ${o}`;
  }
  return fragmento;
}

export default function TarjetaNota({
  idea,
  portada,
  etiqueta,
}: {
  idea: Idea;
  /** Foto de su pedido real, si tiene. */
  portada?: { src: string; alt: string };
  /** "Nota", para distinguirla de los pedidos en la lista. */
  etiqueta: string;
}) {
  const fragmento = hastaOracion(idea.respuesta);
  // Si queda corta, va más grande: llena el cuadrado como una cita.
  const corta = fragmento.length <= 100;
  return (
    <Link href={urlIdea(idea.slug)} className="group flex h-full flex-col rounded-3xl">
      <div className="transition-[translate] duration-300 ease-ow group-hover:-translate-y-0.5">
        {portada ? (
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-white shadow-apoyado transition-shadow duration-300 ease-ow group-hover:shadow-levantado">
            <Image
              src={portada.src}
              alt={portada.alt}
              fill
              sizes="(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 90vw"
              className="object-cover object-[50%_35%] transition-transform duration-700 ease-ow group-hover:scale-[1.03]"
            />
          </div>
        ) : (
          <div className="flex aspect-square flex-col justify-between rounded-3xl bg-ow-paper-soft p-7 shadow-apoyado transition-shadow duration-300 ease-ow group-hover:shadow-levantado md:p-9">
            {/* La diana de la marca marca el comienzo, como un punto de mira. */}
            <Diana className="size-10 shrink-0 origin-top-left text-ow-black transition-transform duration-500 ease-ow group-hover:scale-110 md:size-12" />
            <p
              className={cn(
                "line-clamp-8 leading-snug text-pretty text-ow-black/85",
                corta ? "font-display text-xl font-semibold md:text-2xl" : "text-base font-medium md:text-lg",
              )}
            >
              {textoWeb(fragmento)}
            </p>
          </div>
        )}
      </div>
      <p className="mt-5 text-sm font-semibold text-ow-gray">
        <span className="font-display font-bold text-ow-black">{etiqueta} · </span>
        {AUTORES[idea.autor].nombre}
        {idea.borrador && mostrarMarcadores && (
          <span className="ml-2 rounded-full bg-ow-black px-2.5 py-1 font-display text-xs font-bold text-white">
            {IDEAS_INDICE.borrador}
          </span>
        )}
      </p>
      <h2 className="mt-1.5 font-display text-lg leading-tight font-bold text-pretty decoration-ow-yellow decoration-2 underline-offset-4 group-hover:underline sm:text-2xl">
        {idea.titulo}
      </h2>
    </Link>
  );
}
