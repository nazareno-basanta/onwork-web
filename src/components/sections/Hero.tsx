import Probador from "@/components/hero/Probador";
import { HERO } from "@/data/inicio";
import { SITE } from "@/lib/site";
import { sinViuda } from "@/lib/utils";

/**
 * Hero del Inicio: lo que hace On Work se muestra en vez de contarse.
 * La persona escribe su marca y la ve aplicada en los productos
 * ("Tu marca, en cada ___."), y el botón de WhatsApp sale con su marca.
 *
 * Grilla: en el celular va texto → escenario → formulario; en escritorio, el
 * texto y el formulario a la izquierda y el escenario a la derecha.
 */
export default function Hero() {
  const resto = HERO.titulo.slice(HERO.resaltado.length).trim().replace(/\.$/, "");

  return (
    <section className="overflow-hidden">
      <div className="container-ow grid grid-cols-1 gap-x-16 gap-y-10 py-12 [grid-template-areas:'texto'_'escenario'_'form'] md:py-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-start lg:py-20 lg:[grid-template-areas:'texto_escenario'_'form_escenario']">
        <div className="[grid-area:texto] lg:self-end">
          <h1 className="font-display text-[clamp(2.25rem,7vw,5.25rem)] leading-[0.98] font-extrabold tracking-tight">
            <span className="relative isolate inline-block">
              <span
                aria-hidden
                className="absolute inset-x-[-0.04em] bottom-[0.06em] -z-10 h-[0.34em] bg-ow-yellow"
              />
              {HERO.resaltado}
            </span>{" "}
            {sinViuda(resto)}
            <span className="text-ow-yellow">.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ow-black/80 md:text-xl">
            {sinViuda(HERO.bajada)}
          </p>
          <p className="mt-5 text-sm font-semibold text-ow-gray">{SITE.ubicacion}</p>
        </div>

        <Probador />
      </div>
    </section>
  );
}
