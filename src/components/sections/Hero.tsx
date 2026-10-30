import Link from "next/link";
import HeroDiana from "@/components/HeroDiana";
import WhatsAppLink from "@/components/WhatsAppLink";
import { HERO } from "@/data/inicio";
import { SITE } from "@/lib/site";
import { btn } from "@/lib/ui";
import { sinViuda } from "@/lib/utils";

/**
 * Hero del Inicio: H1 con "Merchandising" resaltado y el punto en amarillo,
 * la bajada, WhatsApp como acción principal y, a la derecha, la diana con el
 * signo que da en el blanco (la animación protagonista de esta sección).
 */
export default function Hero() {
  const resto = HERO.titulo.slice(HERO.resaltado.length).trim().replace(/\.$/, "");

  return (
    <section className="overflow-hidden">
      <div className="container-ow grid items-center gap-12 py-14 md:py-20 lg:grid-cols-[1.2fr_1fr] lg:gap-16 lg:py-24">
        <div>
          <h1 className="font-display text-[clamp(2.25rem,9.4vw,6rem)] leading-[0.98] font-extrabold tracking-tight">
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

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-ow-black/80 md:text-xl">
            {sinViuda(HERO.bajada)}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <WhatsAppLink tone="yellow">{HERO.botonWhatsApp}</WhatsAppLink>
            <Link href="/catalogos" className={btn.line}>
              {HERO.botonCatalogos}
            </Link>
          </div>

          <p className="mt-8 text-sm font-semibold text-ow-gray">{SITE.ubicacion}</p>
        </div>

        <div className="mx-auto w-full max-w-[16rem] sm:max-w-xs lg:max-w-none">
          <HeroDiana />
        </div>
      </div>
    </section>
  );
}
