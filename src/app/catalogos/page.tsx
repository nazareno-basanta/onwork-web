import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/sections/CtaBand";
import WhatsAppLink from "@/components/WhatsAppLink";
import { CATALOGOS } from "@/data/catalogos";
import { btn } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Catálogos de merchandising",
  description:
    "Catálogos de merchandising de On Work: drinkware, escritura, cuadernos y oficina. Y si no encontrás lo que buscás, hacemos búsquedas personalizadas.",
  alternates: { canonical: "/catalogos" },
  openGraph: { url: "/catalogos" },
};

export default function CatalogosPage() {
  return (
    <>
      <section className="py-20 md:py-28">
        <div className="container-ow">
          <Reveal>
            <p className="eyebrow">Catálogos</p>
            <h1 className="mt-4 max-w-4xl font-display text-[clamp(2.3rem,6vw,5rem)] font-extrabold leading-[1.02] tracking-tight">
              Catálogos de merchandising.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ow-black/75 md:text-xl">
              Una selección de lo que trabajamos habitualmente. Si lo que
              buscás no está acá, no hay problema: hacemos búsquedas
              personalizadas.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {CATALOGOS.map((c, i) => (
              <Reveal key={c.slug} delay={(i % 2) * 0.08}>
                <article
                  id={c.slug}
                  className="group flex h-full min-h-64 scroll-mt-24 flex-col justify-between rounded-3xl border-2 border-ow-black p-7 transition-colors duration-300 hover:bg-ow-yellow md:p-9"
                >
                  <div>
                    <p className="font-display text-sm font-extrabold opacity-50">
                      {c.anio}
                    </p>
                    <h2 className="mt-3 font-display text-3xl font-extrabold">
                      {c.titulo}
                    </h2>
                    <p className="mt-3 max-w-md text-ow-black/75">
                      {c.tarjeta}
                    </p>
                  </div>
                  <div className="mt-8">
                    {c.pdf ? (
                      <a
                        href={c.pdf}
                        target="_blank"
                        rel="noopener"
                        className={btn.black}
                      >
                        Ver catálogo <span aria-hidden>↗</span>
                      </a>
                    ) : (
                      <WhatsAppLink
                        tone="black"
                        message={`¡Hola On Work! Quiero recibir el catálogo de ${c.titulo}.`}
                      >
                        Pedir catálogo
                      </WhatsAppLink>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        titulo="¿No ves lo que buscás?"
        texto="Hacemos búsquedas personalizadas: contanos qué necesitás y lo conseguimos."
        mensaje="¡Hola On Work! Estoy buscando un producto específico y quería que me asesoren."
      />
    </>
  );
}
