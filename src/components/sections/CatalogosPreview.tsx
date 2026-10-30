import Link from "next/link";
import Reveal from "@/components/Reveal";
import { CATALOGOS } from "@/data/catalogos";
import { btn } from "@/lib/ui";

export default function CatalogosPreview() {
  return (
    <section
      aria-labelledby="catalogos-titulo"
      className="bg-ow-yellow py-24 md:py-32"
    >
      <div className="container-ow">
        <Reveal>
          <p className="eyebrow">Catálogos</p>
          <h2
            id="catalogos-titulo"
            className="mt-4 max-w-3xl font-display text-[clamp(2rem,5vw,4rem)] font-extrabold leading-[1.03] tracking-tight"
          >
            Lo que ya tenemos armado, para que arranques rápido.
          </h2>
        </Reveal>

        <ul className="mt-14 border-t-2 border-ow-black">
          {CATALOGOS.map((c, i) => (
            <li key={c.slug} className="border-b-2 border-ow-black">
              <Reveal delay={i * 0.06}>
                <Link
                  href={`/catalogos#${c.slug}`}
                  className="group flex items-baseline justify-between gap-6 py-6 transition-all duration-300 hover:px-4 hover:bg-ow-black hover:text-ow-yellow md:py-8"
                >
                  <span className="font-display text-[clamp(1.6rem,4vw,3rem)] font-extrabold leading-none">
                    {c.titulo}
                  </span>
                  <span className="shrink-0 whitespace-nowrap font-display text-sm font-bold">
                    {c.anio} <span aria-hidden>→</span>
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mt-12">
          <Link href="/catalogos" className={btn.black}>
            Ver todos los catálogos
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
