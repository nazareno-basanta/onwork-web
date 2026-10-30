import RotatingText from "@/components/ui/RotatingText";
import { FRASE_ROTATIVA } from "@/data/inicio";

/**
 * "Tu marca, en cada ___." La palabra rota dentro de un recuadro amarillo con
 * texto tinta; el punto final queda fijo en amarillo. Los lectores de
 * pantalla leen la frase completa con todas las palabras.
 */
export default function FraseRotativa() {
  const { inicio, palabras } = FRASE_ROTATIVA;

  return (
    <section className="py-24 md:py-32">
      <div className="container-ow">
        <p className="font-display text-[clamp(2.4rem,7vw,5.75rem)] leading-[1.05] font-extrabold tracking-tight">
          <span className="sr-only">
            {inicio} {palabras.join(", ")}.
          </span>
          <span aria-hidden>{inicio} </span>
          <RotatingText
            words={palabras}
            className="rounded-[0.18em] bg-ow-yellow px-[0.18em] pb-[0.06em] align-bottom"
          />
          <span aria-hidden className="text-ow-yellow">
            .
          </span>
        </p>
      </div>
    </section>
  );
}
