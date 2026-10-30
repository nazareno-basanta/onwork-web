import { Diana } from "@/components/Formas";
import Reveal from "@/components/Reveal";
import Titular from "@/components/Titular";
import WhatsAppLink from "@/components/WhatsAppLink";
import { CIERRE } from "@/data/inicio";
import { sinViuda } from "@/lib/utils";

type Props = {
  titulo?: string;
  texto?: string;
  /** Mensaje de WhatsApp propio de la página. */
  mensaje?: string;
};

/**
 * Cierre de página en tinta: titular, una línea y el botón de WhatsApp con
 * efecto imán. La diana grande, cortada por el borde, es la única forma.
 */
export default function Cierre({ titulo = CIERRE.titulo, texto = CIERRE.texto, mensaje }: Props) {
  return (
    <section
      aria-labelledby="cierre-titulo"
      data-cursor-tone="claro"
      className="relative isolate overflow-hidden bg-ow-black py-24 text-white md:py-32"
    >
      <Diana className="absolute top-1/2 -right-[18%] -z-10 w-[min(70vw,34rem)] -translate-y-1/2 text-ow-yellow md:-right-[8%]" />
      <div className="container-ow">
        <Reveal>
          <Titular id="cierre-titulo" className="max-w-3xl text-[clamp(2.4rem,6.5vw,5.25rem)]">
            {titulo}
          </Titular>
          <p className="mt-6 max-w-lg text-lg text-white/75">{sinViuda(texto)}</p>
          <div className="mt-10">
            <WhatsAppLink tone="yellow" message={mensaje} magnetic className="px-8 py-4 text-base">
              {CIERRE.boton}
            </WhatsAppLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
