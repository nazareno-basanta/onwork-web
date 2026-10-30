import Faq from "@/components/Faq";
import Titular from "@/components/Titular";
import { PREGUNTAS, type Pregunta } from "@/data/preguntas";
import { PREGUNTAS_TITULO } from "@/data/inicio";

/** Bloque de preguntas frecuentes: titular a la izquierda y acordeón. */
export default function Preguntas({
  preguntas = PREGUNTAS,
  className = "",
}: {
  preguntas?: Pregunta[];
  className?: string;
}) {
  return (
    <section aria-labelledby="preguntas" className={`py-24 md:py-32 ${className}`}>
      <div className="container-ow grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <Titular id="preguntas" className="text-[clamp(2.1rem,4.8vw,4rem)]">
          {PREGUNTAS_TITULO}
        </Titular>
        <Faq preguntas={preguntas} />
      </div>
    </section>
  );
}
