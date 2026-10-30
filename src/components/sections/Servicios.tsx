import Reveal from "@/components/Reveal";
import WhatsAppLink from "@/components/WhatsAppLink";
import { SERVICIOS, CASOS } from "@/data/servicios";

export default function Servicios() {
  return (
    <section aria-labelledby="servicios-titulo" className="py-24 md:py-32">
      <div className="container-ow">
        <Reveal>
          <p className="eyebrow">Qué hacemos</p>
          <h2
            id="servicios-titulo"
            className="mt-4 max-w-4xl font-display text-[clamp(2rem,5vw,4rem)] font-extrabold leading-[1.03] tracking-tight"
          >
            Si lo imaginás, lo buscamos. Si existe, lo conseguimos.
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-ow-black/70">
            Trabajamos con muchísimos productos, así que no hay un catálogo que
            los abarque todos. Por eso asesoramos a cada cliente según lo que
            necesita.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SERVICIOS.map((s, i) => {
            const destacado = s.id === "busquedas";
            return (
              <Reveal
                key={s.id}
                delay={(i % 3) * 0.08}
                className={destacado ? "lg:col-span-2" : ""}
              >
                <article
                  className={`group flex h-full min-h-72 flex-col justify-between rounded-3xl border-2 border-ow-black p-7 transition-colors duration-300 md:p-9 ${
                    destacado
                      ? "bg-ow-black text-white hover:bg-ow-yellow hover:text-ow-black"
                      : "hover:bg-ow-yellow"
                  }`}
                >
                  <div>
                    <p className="font-display text-sm font-extrabold opacity-50">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-3 font-display text-3xl font-extrabold leading-tight">
                      {s.titulo}
                    </h3>
                    <p
                      className={`mt-4 max-w-md ${
                        destacado ? "opacity-80" : "text-ow-black/75"
                      }`}
                    >
                      {s.texto}
                    </p>
                  </div>
                  <div className="mt-8">
                    <WhatsAppLink
                      tone={destacado ? "yellow" : "black"}
                      message={s.mensaje}
                      className={
                        destacado ? "group-hover:!bg-ow-black group-hover:!text-white" : ""
                      }
                    >
                      Consultar
                    </WhatsAppLink>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-24">
          <Reveal>
            <p className="eyebrow">Casos reales</p>
            <h3 className="mt-4 max-w-3xl font-display text-[clamp(1.6rem,3.4vw,2.6rem)] font-extrabold leading-tight tracking-tight">
              Productos que no están en ningún catálogo.
            </h3>
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {CASOS.map((c, i) => (
              <Reveal key={c.titulo} delay={i * 0.1}>
                <article className="flex h-full flex-col justify-between rounded-3xl bg-ow-paper p-7 md:p-9">
                  <div>
                    <p className="eyebrow text-ow-black/50">{c.lugar}</p>
                    <h4 className="mt-3 font-display text-2xl font-extrabold">
                      {c.titulo}
                    </h4>
                    <p className="mt-3 text-ow-black/75">{c.texto}</p>
                  </div>
                  <div className="mt-7">
                    <WhatsAppLink tone="line" message={c.mensaje}>
                      Quiero algo así
                    </WhatsAppLink>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
