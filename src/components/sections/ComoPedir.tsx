import Link from "next/link";
import Icon from "@/components/Icon";
import Titular from "@/components/Titular";
import WhatsAppLink from "@/components/WhatsAppLink";
import ComoPedirCorto from "@/components/como-pedir/ComoPedirCorto";
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
 * En el Inicio, en el celular (cortoEnCelular), va la versión corta con el
 * link a /como-pedir: con las cinco maquetas eran más de cinco pantallas
 * (decisión de Nachi, 5/11/2026). En la compu, la línea completa.
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
        <div className="container-ow lg:hidden">
          <ComoPedirCorto tono="oscuro" className="mt-10" />
        </div>
      )}

      <LineaDeTiempo
        pasos={pasos}
        etiqueta={COMO_PEDIR.navPasos}
        nivelTitulo={conTitulo ? "h3" : "h2"}
        className={cn(conTitulo && "mt-12 md:mt-16", cortoEnCelular && "hidden lg:block")}
      />

      <div className={cn("container-ow flex flex-wrap items-center gap-4 lg:mt-8", cortoEnCelular ? "mt-10" : "mt-20")}>
        <Link href="/catalogos" className={btn.yellow}>
          {COMO_PEDIR.botonCatalogos}
          <Icon name="flecha-derecha" size={18} />
        </Link>
        <WhatsAppLink tone="lineLight">{COMO_PEDIR.botonWhatsApp}</WhatsAppLink>
      </div>
    </section>
  );
}
