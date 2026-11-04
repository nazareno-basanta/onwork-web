import Faq, { preguntasVisibles } from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import Titular from "@/components/Titular";
import { PREGUNTAS, type Pregunta } from "@/data/preguntas";
import { PREGUNTAS_TITULO } from "@/data/inicio";
import { preguntasFrecuentes } from "@/lib/datosEstructurados";

/**
 * Bloque de preguntas frecuentes: titular a la izquierda y acordeón.
 * Con datosEstructurados, suma el FAQPage para los buscadores (Inicio y
 * catálogos), solo con las preguntas ya completas.
 */
export default function Preguntas({
  preguntas = PREGUNTAS,
  className = "",
  datosEstructurados = false,
}: {
  preguntas?: Pregunta[];
  className?: string;
  datosEstructurados?: boolean;
}) {
  const faq = datosEstructurados ? preguntasFrecuentes(preguntasVisibles(preguntas)) : null;

  return (
    <section aria-labelledby="preguntas" className={`py-24 md:py-32 ${className}`}>
      <div className="container-ow grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <Titular id="preguntas" className="text-[clamp(2.1rem,4.8vw,4rem)]">
          {PREGUNTAS_TITULO}
        </Titular>
        <Faq preguntas={preguntas} />
      </div>
      {faq && <JsonLd datos={faq} />}
    </section>
  );
}
