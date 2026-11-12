import Link from "next/link";
import { Diana } from "@/components/Formas";
import Titular from "@/components/Titular";
import Icon from "@/components/Icon";
import WhatsAppLink from "@/components/WhatsAppLink";
import { PRESUPUESTO } from "@/data/presupuesto";
import { BUSQUEDAS } from "@/data/servicios";
import { textoWeb } from "@/lib/utils";

/**
 * "¿No está en el catálogo? Lo buscamos." Titular, una línea y el botón de
 * WhatsApp: deja claro que los catálogos son solo una parte.
 * (Sin la cinta amarilla de ejemplos: la sacó Nachi el 4/11/2026.)
 *
 * Desde el 12/11/2026 va en franja amarilla, para que se distinga de las
 * secciones de al lado, con una diana grande cortada por el borde de la que
 * salen anillos, como un radar (ver .radar-onda en globals.css). Sobre
 * amarillo, el signo del titular va en tinta y el botón pasa a blanco al
 * pasar el mouse.
 */
export default function Busquedas({
  id = "busquedas",
  titulo = BUSQUEDAS.titulo,
  texto = BUSQUEDAS.texto,
  conPresupuesto = false,
}: {
  id?: string;
  titulo?: string;
  texto?: string;
  /** Suma el link al campo "Otro" del presupuesto (en el hub de catálogos). */
  conPresupuesto?: boolean;
}) {
  return (
    <section aria-labelledby={id} className="relative overflow-hidden bg-ow-yellow py-24 md:py-32">
      {/* El radar: en el celular, chico en la esquina de abajo; desde la tablet, grande a la derecha. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-14 -bottom-16 size-40 md:top-1/2 md:bottom-auto md:-right-24 md:size-72 md:-translate-y-1/2 lg:-right-28 lg:size-[26rem]"
      >
        {[0, 1, 2].map((i) => (
          <span key={i} className="radar-onda" style={{ "--i": i } as React.CSSProperties} />
        ))}
        <Diana className="relative size-full text-ow-black" />
      </div>

      <div className="container-ow relative">
        <div className="max-w-2xl md:max-w-[58%] lg:max-w-[52%]">
          <Titular id={id} claseSigno="text-ow-black" className="text-[clamp(2.1rem,4.8vw,4rem)]">
            {titulo}
          </Titular>
          <p className="mt-6 max-w-xl text-lg text-ow-black/80">{textoWeb(texto)}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <WhatsAppLink tone="blackOnYellow" message={BUSQUEDAS.mensaje}>
              {BUSQUEDAS.boton}
            </WhatsAppLink>
            {conPresupuesto && (
              <Link
                href="/presupuesto#presupuesto-otro"
                className="inline-flex min-h-11 items-center gap-1.5 rounded-sm font-display text-sm font-bold underline decoration-ow-black/30 decoration-2 underline-offset-[6px] hover:decoration-ow-black"
              >
                {PRESUPUESTO.sumarOtro}
                <Icon name="flecha-derecha" size={18} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
