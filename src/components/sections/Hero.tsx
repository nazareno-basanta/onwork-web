import Link from "next/link";
import Reveal from "@/components/Reveal";
import HeroShapes from "@/components/HeroShapes";
import WhatsAppLink from "@/components/WhatsAppLink";
import { btn } from "@/lib/ui";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-ow grid items-center gap-10 py-14 md:grid-cols-[1.25fr_1fr] md:py-24">
        <div>
          <Reveal>
            <p className="eyebrow">Comunicación &amp; merchandising</p>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-5 font-display text-[clamp(2.6rem,7.2vw,6rem)] font-extrabold leading-[0.98] tracking-tight">
              <span className="relative isolate inline-block">
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-[0.08em] -z-10 h-[0.32em] bg-ow-yellow"
                />
                Merchandising
              </span>{" "}
              que se hace notar.
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-ow-black/75 md:text-xl">
              Asesoramos y conseguimos lo que tu marca necesita: merchandising,
              indumentaria, cartelería y todo lo que se te ocurra.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-9 flex flex-wrap gap-3">
              <WhatsAppLink tone="yellow">Contanos qué necesitás</WhatsAppLink>
              <Link href="/catalogos" className={btn.line}>
                Ver catálogos
              </Link>
            </div>
          </Reveal>
        </div>

        <HeroShapes />
      </div>
    </section>
  );
}
