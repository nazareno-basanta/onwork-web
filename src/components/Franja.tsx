import Link from "next/link";
import { COMO_PEDIR, FRANJA_CATALOGOS } from "@/data/inicio";
import { textoWeb } from "@/lib/utils";
import { Trio } from "./Formas";
import Icon from "./Icon";

const link =
  "inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-sm font-display text-sm font-bold underline decoration-ow-black/30 decoration-2 underline-offset-[6px] hover:decoration-ow-black";

/**
 * Franja de los catálogos (hub, cada catálogo y cada producto): "Consultanos
 * por cantidades, plazos…" y el link a /como-pedir. Sobre crema suave el
 * subrayado va en tinta suave: el amarillo casi no se distingue del fondo.
 */
export default function Franja({ texto = FRANJA_CATALOGOS }: { texto?: string }) {
  return (
    <div className="bg-ow-paper-soft">
      <div className="container-ow flex flex-col gap-5 py-10 sm:flex-row sm:items-center sm:gap-8 md:py-12">
        <Trio className="h-8 w-auto shrink-0" />
        <p className="font-display text-lg font-bold md:text-xl">{textoWeb(texto)}</p>
        <Link href="/como-pedir" className={`${link} sm:ml-auto`}>
          {COMO_PEDIR.linkPagina}
          <Icon name="flecha-derecha" size={18} />
        </Link>
      </div>
    </div>
  );
}
