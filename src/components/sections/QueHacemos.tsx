import Icon from "@/components/Icon";
import Titular from "@/components/Titular";
import { QUE_HACEMOS } from "@/data/inicio";
import { SERVICIOS } from "@/data/servicios";
import { MENSAJE_GENERAL, whatsappUrl } from "@/lib/site";
import { sinViuda } from "@/lib/utils";

/**
 * "Qué hacemos" como índice, no como cinco tarjetas iguales: el titular queda
 * fijo a la izquierda y cada servicio es una fila que lleva a WhatsApp con su
 * mensaje. Al pasar el mouse, la flecha entra en el círculo amarillo.
 */
export default function QueHacemos() {
  return (
    <section aria-labelledby="que-hacemos" className="bg-ow-paper-soft py-24 md:py-32">
      <div className="container-ow grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <div>
          <Titular id="que-hacemos" className="text-[clamp(2.1rem,4.8vw,4rem)] lg:sticky lg:top-28">
            {QUE_HACEMOS.titulo}
          </Titular>
        </div>

        <ul className="border-t-2 border-ow-black">
          {SERVICIOS.map((s) => (
            <li key={s.id} className="border-b-2 border-ow-black">
              <a
                href={whatsappUrl(s.mensaje ?? MENSAJE_GENERAL)}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid grid-cols-[1fr_auto] items-center gap-6 rounded-sm py-7 md:py-8"
              >
                <span>
                  <span className="block font-display text-[clamp(1.5rem,2.6vw,2.1rem)] leading-tight font-bold">
                    {s.titulo}
                  </span>
                  <span className="mt-2 block max-w-lg text-ow-black/75">{sinViuda(s.texto)}</span>
                </span>
                <span
                  aria-hidden
                  className="grid size-12 place-items-center rounded-full border-2 border-ow-black transition-colors duration-300 ease-ow group-hover:border-ow-yellow group-hover:bg-ow-yellow"
                >
                  <Icon
                    name="flecha-diagonal"
                    size={20}
                    className="transition-transform duration-300 ease-ow group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
                <span className="sr-only">Consultar por WhatsApp</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
