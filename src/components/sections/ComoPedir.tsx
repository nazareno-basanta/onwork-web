import Link from "next/link";
import Icon from "@/components/Icon";
import Titular from "@/components/Titular";
import WhatsAppLink from "@/components/WhatsAppLink";
import Acordeon from "@/components/como-pedir/Acordeon";
import LineaDeTiempo from "@/components/como-pedir/LineaDeTiempo";
import { maquetasComoPedir } from "@/components/como-pedir/Maquetas";
import { COMO_PEDIR } from "@/data/inicio";
import { btn } from "@/lib/ui";
import { cn } from "@/lib/utils";

/**
 * "Cómo pedir" sobre tinta: los cinco pasos en una línea de tiempo, cada uno
 * con su maqueta, y al final "Ver catálogos" y WhatsApp. Va en el Inicio (en
 * lugar de "Cómo trabajamos") y en /como-pedir. En /como-pedir va sin titular
 * propio (conTitulo={false}): el H1 de la página ya dice "Cómo pedir." y los
 * pasos pasan a ser H2.
 * En el Inicio, en el celular (cortoEnCelular), va el acordeón: los cinco
 * pasos cerrados salvo uno, y al tocar se abre cada maqueta (Nachi,
 * 12/11/2026; antes era una lista quieta, porque con las cinco maquetas a la
 * vista eran más de cinco pantallas). En la tablet y la compu, la línea completa.
 */
export default function ComoPedir({
  id = "como-pedir",
  conTitulo = true,
  cortoEnCelular = false,
}: {
  id?: string;
  conTitulo?: boolean;
  cortoEnCelular?: boolean;
}) {
  const maquetas = maquetasComoPedir();
  const pasos = COMO_PEDIR.pasos.map((p, i) => ({ ...p, maqueta: maquetas[i] }));

  return (
    <section aria-labelledby={id} className={`bg-ow-black pb-24 text-white md:pb-32 ${conTitulo ? "pt-24 md:pt-32" : "pt-12 md:pt-16 lg:pt-6"}`}>
      {conTitulo && (
        <div className="container-ow">
          <Titular id={id} className="text-[clamp(2.1rem,4.8vw,4rem)]">
            {COMO_PEDIR.titulo}
          </Titular>
        </div>
      )}

      {cortoEnCelular && (
        <div className="container-ow md:hidden">
          <Acordeon pasos={pasos} nivelTitulo={conTitulo ? "h3" : "h2"} className="mt-10" />
          <Link
            href="/como-pedir"
            className="mt-8 inline-flex min-h-11 items-center gap-1.5 rounded-sm font-display text-sm font-bold text-white underline decoration-ow-yellow decoration-2 underline-offset-[6px] hover:decoration-white"
          >
            {COMO_PEDIR.linkPagina}
            <Icon name="flecha-derecha" size={18} />
          </Link>
        </div>
      )}

      <LineaDeTiempo
        pasos={pasos}
        etiqueta={COMO_PEDIR.navPasos}
        nivelTitulo={conTitulo ? "h3" : "h2"}
        className={cn(conTitulo && "mt-12 md:mt-16", cortoEnCelular && "hidden md:block")}
      />

      <div className={cn("container-ow flex flex-wrap items-center gap-4 md:mt-8", cortoEnCelular ? "mt-10" : "mt-20")}>
        <Link href="/catalogos" className={btn.yellow}>
          {COMO_PEDIR.botonCatalogos}
          <Icon name="flecha-derecha" size={18} />
        </Link>
        <WhatsAppLink tone="lineLight">{COMO_PEDIR.botonWhatsApp}</WhatsAppLink>
      </div>
    </section>
  );
}
