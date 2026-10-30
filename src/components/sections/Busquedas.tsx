import { Circulo } from "@/components/Formas";
import Titular from "@/components/Titular";
import WhatsAppLink from "@/components/WhatsAppLink";
import Marquee from "@/components/ui/Marquee";
import { BUSQUEDAS } from "@/data/servicios";
import { sinViuda } from "@/lib/utils";

/**
 * "¿No está en el catálogo? Lo buscamos." Una cinta amarilla con productos
 * reales conseguidos fuera de catálogo muestra, sin explicarlo, que los
 * catálogos son solo una parte. Texto tinta sobre amarillo.
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
    <section aria-labelledby={id} className="overflow-hidden py-24 md:py-32">
      <div className="container-ow grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-16">
        <Titular id={id} className="text-[clamp(2.1rem,4.8vw,4rem)]">
          {titulo}
        </Titular>
        <div>
          <p className="text-lg text-ow-black/80">{sinViuda(texto)}</p>
          <WhatsAppLink tone="black" message={BUSQUEDAS.mensaje} className="mt-7">
            {BUSQUEDAS.boton}
          </WhatsAppLink>
        </div>
      </div>

      <div className="mt-16 -mx-[5%] w-[110%] -rotate-2 bg-ow-yellow py-5 md:py-6">
        <p className="sr-only">Algunos productos que conseguimos: {BUSQUEDAS.ejemplos.join(", ")}.</p>
        <Marquee aria-hidden className="[--duration:38s] [--gap:0rem]">
          <ul className="flex items-center">
            {BUSQUEDAS.ejemplos.map((e) => (
              <li
                key={e}
                className="flex items-center gap-8 pr-8 font-display text-[clamp(1.6rem,3.6vw,2.75rem)] font-extrabold whitespace-nowrap text-ow-black"
              >
                {e}
                <Circulo className="size-3 text-ow-black md:size-4" />
              </li>
            ))}
          </ul>
        </Marquee>
      </div>
    </section>
  );
}
