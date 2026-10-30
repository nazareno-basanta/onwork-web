import { Diana, Flechas, Signo } from "@/components/Formas";
import Titular from "@/components/Titular";
import StickyScroll from "@/components/ui/StickyScroll";
import { COMO_TRABAJAMOS } from "@/data/inicio";

/*
 * Mientras no haya fotos reales de cada paso (un chat de WhatsApp, una prueba,
 * una entrega), cada paso se acompaña con una forma de la marca:
 * el signo (contanos), la diana (asesoramos, damos en el blanco) y las
 * flechas (producimos y enviamos).
 */
const FORMAS = [Signo, Diana, Flechas];

function Panel({ i }: { i: number }) {
  const Forma = FORMAS[i];
  return (
    <div className="relative grid aspect-square w-full max-w-sm place-items-center rounded-3xl bg-white/5 lg:max-w-none">
      <Forma className="h-[62%] w-auto text-ow-yellow" />
    </div>
  );
}

/** Los tres pasos sobre tinta, con el panel fijo que cambia (Sticky Scroll). */
export default function ComoTrabajamos() {
  const pasos = COMO_TRABAJAMOS.pasos.map((p, i) => ({ ...p, panel: <Panel i={i} /> }));

  return (
    <section
      aria-labelledby="como-trabajamos"
      data-cursor-tone="claro"
      className="bg-ow-black py-24 text-white md:py-32 lg:pb-16"
    >
      <div className="container-ow">
        <Titular id="como-trabajamos" className="text-[clamp(2.1rem,4.8vw,4rem)]">
          {COMO_TRABAJAMOS.titulo}
        </Titular>
        <StickyScroll pasos={pasos} className="mt-14 lg:mt-0" />
      </div>
    </section>
  );
}
