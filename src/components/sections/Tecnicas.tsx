import Titular from "@/components/Titular";
import { TECNICAS } from "@/data/nosotros";

/** "Técnicas con las que trabajamos." en pastillas, sobre crema suave (Nosotros y Cómo pedir). */
export default function Tecnicas({ tituloClassName = "text-[clamp(1.9rem,4vw,3.25rem)]" }: { tituloClassName?: string }) {
  return (
    <section aria-labelledby="tecnicas" className="bg-ow-paper-soft py-20 md:py-28">
      <div className="container-ow">
        <Titular id="tecnicas" className={tituloClassName}>
          {TECNICAS.titulo}
        </Titular>
        <ul className="mt-10 flex flex-wrap gap-3">
          {TECNICAS.lista.map((t) => (
            <li
              key={t}
              className="rounded-full border-2 border-ow-black px-5 py-2.5 font-display text-sm font-bold md:text-base"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
