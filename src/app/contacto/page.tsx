import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import { Diana } from "@/components/Formas";
import Icon from "@/components/Icon";
import Titular from "@/components/Titular";
import WhatsAppLink from "@/components/WhatsAppLink";
import Preguntas from "@/components/sections/Preguntas";
import { CONTACTO } from "@/data/contacto";
import { MENSAJE_GENERAL, SITE } from "@/lib/site";
import { sinViuda } from "@/lib/utils";

export const metadata: Metadata = {
  title: CONTACTO.seo.titulo,
  description: CONTACTO.seo.descripcion,
  alternates: { canonical: "/contacto" },
  openGraph: { url: "/contacto" },
};

export default function ContactoPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden pt-10 pb-20 md:pt-14 md:pb-28">
        <Diana className="absolute top-24 -right-40 -z-10 hidden w-[32rem] text-ow-paper-soft lg:block" />
        <div className="container-ow">
          <Breadcrumb items={[{ label: "Contacto", href: "/contacto" }]} />
          <div className="mt-10 max-w-3xl">
            <Titular as="h1" className="text-[clamp(2.4rem,6.4vw,5.25rem)]">
              {CONTACTO.h1}
            </Titular>
            <p className="mt-7 text-lg leading-relaxed text-ow-black/80 md:text-xl">{sinViuda(CONTACTO.texto)}</p>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
              <WhatsAppLink tone="yellow" message={MENSAJE_GENERAL} magnetic className="px-8 py-4 text-base">
                {CONTACTO.boton}
              </WhatsAppLink>
              <p className="font-display text-lg font-bold">{SITE.whatsappVisible}</p>
            </div>
          </div>

          <div className="mt-20 grid gap-12 border-t-2 border-ow-black pt-12 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]">
            <div>
              <Titular className="text-2xl">{CONTACTO.datosTitulo}</Titular>
              <ul className="mt-5 space-y-2.5">
                {CONTACTO.datos.map((d) => (
                  <li key={d} className="flex items-center gap-3">
                    <span aria-hidden className="size-2 shrink-0 rounded-full bg-ow-yellow" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-8">
              <div>
                <h2 className="font-display text-lg font-bold">{CONTACTO.horarioTitulo}</h2>
                <p className="mt-2 text-ow-black/80">{CONTACTO.horario}</p>
              </div>
              <div>
                <h2 className="font-display text-lg font-bold">{CONTACTO.pagosTitulo}</h2>
                <p className="mt-2 text-ow-black/80">{sinViuda(CONTACTO.pagos)}</p>
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <h2 className="font-display text-lg font-bold">{CONTACTO.redesTitulo}</h2>
                <a
                  href={SITE.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex min-h-11 items-center gap-2 rounded-sm font-bold underline decoration-ow-yellow decoration-2 underline-offset-[6px] hover:decoration-ow-black"
                >
                  <Icon name="instagram" size={18} />
                  {SITE.instagramUsuario}
                </a>
                <p className="text-ow-black/80">{CONTACTO.mail}</p>
              </div>
              <p className="font-semibold text-ow-gray">{SITE.ubicacion}</p>
            </div>
          </div>
        </div>
      </section>

      <Preguntas className="bg-ow-paper-soft" />
    </>
  );
}
