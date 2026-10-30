import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/sections/CtaBand";
import WhatsAppLink from "@/components/WhatsAppLink";
import { SERVICIOS } from "@/data/servicios";
import { btn } from "@/lib/ui";

// Esta es la página pensada para posicionar la palabra "merchandising" en Google.
export const metadata: Metadata = {
  title: "Merchandising personalizado para empresas en Buenos Aires",
  description:
    "Merchandising personalizado y corporativo: productos con la marca de tu empresa, indumentaria, cartelería y búsquedas a medida. Asesoramiento de principio a fin.",
  alternates: { canonical: "/merchandising" },
  openGraph: { url: "/merchandising" },
};

const PASOS = [
  {
    titulo: "Nos contás qué necesitás",
    texto:
      "Por WhatsApp, con una idea clara o con una duda. No hace falta tener todo definido.",
  },
  {
    titulo: "Buscamos y te asesoramos",
    texto:
      "Encontramos el producto indicado para tu marca, tu público y tu presupuesto.",
  },
  {
    titulo: "Lo hacemos realidad",
    texto:
      "Personalizamos con la identidad de tu empresa y lo dejamos listo para usar.",
  },
];

const PREGUNTAS = [
  {
    p: "¿Trabajan con productos en stock o a pedido?",
    r: "Las dos cosas. Tenemos catálogos armados con productos que trabajamos habitualmente, y además hacemos búsquedas personalizadas cuando necesitás algo puntual.",
  },
  {
    p: "¿Solo hacen merchandising?",
    r: "No. Además de merchandising personalizado, trabajamos indumentaria, cartelería y tarjetería. Asesoramos en todo lo que necesite tu marca.",
  },
  {
    p: "¿Cómo pido una cotización?",
    r: "Escribinos por WhatsApp contando qué necesitás. Te respondemos y seguimos la conversación por ahí.",
  },
];

export default function MerchandisingPage() {
  return (
    <>
      <section className="py-20 md:py-28">
        <div className="container-ow">
          <Reveal>
            <p className="eyebrow">Merchandising</p>
            <h1 className="mt-4 max-w-5xl font-display text-[clamp(2.3rem,6vw,5rem)] font-extrabold leading-[1.02] tracking-tight">
              Merchandising personalizado para empresas en Buenos Aires.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ow-black/75 md:text-xl">
              En On Work creamos y conseguimos merchandising con la identidad de
              tu marca. Desde productos clásicos hasta ideas que nadie más
              tiene: nos ocupamos de todo el camino, desde la idea hasta la
              entrega.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <WhatsAppLink message="¡Hola On Work! Quiero cotizar merchandising para mi empresa.">
                Cotizar merchandising
              </WhatsAppLink>
              <Link href="/catalogos" className={btn.line}>
                Ver catálogos
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-ow-paper py-20 md:py-28">
        <div className="container-ow grid gap-12 md:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-[clamp(1.7rem,3.6vw,2.8rem)] font-extrabold leading-tight tracking-tight">
              ¿Qué es el merchandising corporativo?
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="space-y-5 text-lg leading-relaxed text-ow-black/75">
            <p>
              El merchandising corporativo son los productos con el nombre, el
              logo o la identidad de una marca que se entregan a clientes,
              equipos o invitados: desde una taza o un cuaderno hasta una
              campera o una pieza pensada especialmente para un evento.
            </p>
            <p>
              Un buen merchandising no es solo un regalo: es una forma de que
              tu marca se use, se vea y se recuerde todos los días.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-ow">
          <Reveal>
            <h2 className="max-w-3xl font-display text-[clamp(1.7rem,3.6vw,2.8rem)] font-extrabold leading-tight tracking-tight">
              Qué podemos hacer por tu marca
            </h2>
          </Reveal>
          <ul className="mt-12 grid gap-x-10 gap-y-8 md:grid-cols-2">
            {SERVICIOS.map((s, i) => (
              <li key={s.id}>
                <Reveal delay={(i % 2) * 0.08}>
                  <h3 className="font-display text-xl font-extrabold">
                    {s.titulo}
                  </h3>
                  <p className="mt-2 text-ow-black/75">{s.texto}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-ow-black py-20 text-white md:py-28">
        <div className="container-ow">
          <Reveal>
            <p className="eyebrow text-ow-yellow">Cómo trabajamos</p>
            <h2 className="mt-4 max-w-3xl font-display text-[clamp(1.7rem,3.6vw,2.8rem)] font-extrabold leading-tight tracking-tight">
              De la idea al producto, sin vueltas.
            </h2>
          </Reveal>
          <ol className="mt-12 grid gap-8 md:grid-cols-3">
            {PASOS.map((paso, i) => (
              <li key={paso.titulo}>
                <Reveal delay={i * 0.1}>
                  <p className="font-display text-5xl font-extrabold text-ow-yellow">
                    {i + 1}
                  </p>
                  <h3 className="mt-4 font-display text-xl font-extrabold">
                    {paso.titulo}
                  </h3>
                  <p className="mt-2 text-white/70">{paso.texto}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-ow max-w-4xl">
          <Reveal>
            <h2 className="font-display text-[clamp(1.7rem,3.6vw,2.8rem)] font-extrabold leading-tight tracking-tight">
              Preguntas frecuentes
            </h2>
          </Reveal>
          <div className="mt-10 border-t-2 border-ow-black">
            {PREGUNTAS.map((q) => (
              <details key={q.p} className="group border-b-2 border-ow-black py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-lg font-extrabold md:text-xl">
                  {q.p}
                  <span
                    aria-hidden
                    className="grid size-9 shrink-0 place-items-center rounded-full bg-ow-yellow transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl text-ow-black/75">{q.r}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        titulo="Hablemos de tu merchandising."
        texto="Contanos qué necesitás y armamos la mejor opción para tu marca."
        mensaje="¡Hola On Work! Quiero cotizar merchandising para mi empresa."
      />
    </>
  );
}
