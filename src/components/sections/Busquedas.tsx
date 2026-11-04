import Titular from "@/components/Titular";
import WhatsAppLink from "@/components/WhatsAppLink";
import { BUSQUEDAS } from "@/data/servicios";
import { textoWeb } from "@/lib/utils";

/**
 * "¿No está en el catálogo? Lo buscamos." Titular, una línea y el botón de
 * WhatsApp: deja claro que los catálogos son solo una parte.
 * (Sin la cinta amarilla de ejemplos: la sacó Nachi el 4/11/2026.)
 */
export default function Busquedas({
  id = "busquedas",
  titulo = BUSQUEDAS.titulo,
  texto = BUSQUEDAS.texto,
}: {
  id?: string;
  titulo?: string;
  texto?: string;
}) {
  return (
    <section aria-labelledby={id} className="py-24 md:py-32">
      <div className="container-ow grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-16">
        <Titular id={id} className="text-[clamp(2.1rem,4.8vw,4rem)]">
          {titulo}
        </Titular>
        <div>
          <p className="text-lg text-ow-black/80">{textoWeb(texto)}</p>
          <WhatsAppLink tone="black" message={BUSQUEDAS.mensaje} className="mt-7">
            {BUSQUEDAS.boton}
          </WhatsAppLink>
        </div>
      </div>
    </section>
  );
}
