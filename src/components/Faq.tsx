import type { Pregunta } from "@/data/preguntas";
import { sinViuda } from "@/lib/utils";
import Icon from "./Icon";

/**
 * Preguntas frecuentes con <details>: accesible de base y con las respuestas
 * escritas en la página (Google las lee). Al abrir, el "+" gira a "×" y la
 * respuesta aparece con una transición de altura (solo CSS).
 */
export default function Faq({ preguntas }: { preguntas: Pregunta[] }) {
  return (
    <div className="border-t-2 border-ow-black">
      {preguntas.map((q) => (
        <details key={q.pregunta} className="faq group border-b-2 border-ow-black">
          <summary className="cursor-target flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 py-6 font-display text-lg font-extrabold md:text-xl [&::-webkit-details-marker]:hidden">
            {sinViuda(q.pregunta)}
            <span
              aria-hidden
              className="grid size-9 shrink-0 place-items-center rounded-full bg-ow-yellow transition-transform duration-300 ease-ow group-open:rotate-45"
            >
              <Icon name="mas" size={18} strokeWidth={2.5} />
            </span>
          </summary>
          <p className="max-w-2xl pb-6 text-ow-gray">{sinViuda(q.respuesta)}</p>
        </details>
      ))}
    </div>
  );
}
