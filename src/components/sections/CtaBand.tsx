import Image from "next/image";
import Reveal from "@/components/Reveal";
import WhatsAppLink from "@/components/WhatsAppLink";

type Props = {
  titulo?: string;
  texto?: string;
  mensaje?: string;
};

/** Cierre de página: invita a escribir por WhatsApp. */
export default function CtaBand({
  titulo = "¿Tenés algo en mente?",
  texto = "Contanos qué necesitás y te respondemos por WhatsApp.",
  mensaje,
}: Props) {
  return (
    <section className="bg-ow-black py-24 text-white md:py-32">
      <div className="container-ow grid items-center gap-10 md:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <h2 className="font-display text-[clamp(2.2rem,6vw,5rem)] font-extrabold leading-[1] tracking-tight">
            {titulo}
          </h2>
          <p className="mt-6 max-w-lg text-lg text-white/70">{texto}</p>
          <WhatsAppLink tone="yellow" message={mensaje} className="mt-9">
            Escribinos por WhatsApp
          </WhatsAppLink>
        </Reveal>

        <Reveal delay={0.15} className="hidden md:block">
          <Image
            src="/brand/isotipo-onwork-blanco.svg"
            alt=""
            width={190}
            height={255}
            className="mx-auto h-64 w-auto"
          />
        </Reveal>
      </div>
    </section>
  );
}
